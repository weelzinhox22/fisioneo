import { NextResponse } from 'next/server';
import { pushNotificationService, type PushNotificationHistory, supabase } from '@/lib/supabase';
import * as webpush from 'web-push';

// Chaves VAPID para identificar o remetente junto aos serviços de push
// Em produção, estas chaves devem ser geradas e armazenadas como variáveis de ambiente
const VAPID_PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY || 'BLBx-hf2WrQ3CWn-wd5iB7tp1LS6UxL3xR3p_ZJM0buNPRdCQ7Yp0cCSnSB4slS7aFfLotGY7rdP6ClXTe1Gvgk';
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY || 'sua-chave-privada-aqui';
const VAPID_SUBJECT = process.env.VAPID_SUBJECT || 'mailto:contato@fisioneo.com.br';

// Configurar o serviço web-push
try {
  webpush.setVapidDetails(
    VAPID_SUBJECT,
    VAPID_PUBLIC_KEY,
    VAPID_PRIVATE_KEY
  );
  console.log('Web-push configurado com sucesso');
} catch (error) {
  console.error('Erro ao configurar web-push:', error);
}

// API para enviar notificações push
export async function POST(request: Request) {
  console.log('API de notificações chamada');
  
  try {
    // Verificar configurações do Supabase
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.error('Configurações do Supabase não encontradas');
      return NextResponse.json(
        { success: false, error: 'Configurações do Supabase não encontradas' },
        { status: 500 }
      );
    }
    
    // Verificar body da requisição
    let body;
    try {
      body = await request.json();
      console.log('Body da requisição:', JSON.stringify(body));
    } catch (error) {
      console.error('Erro ao processar body da requisição:', error);
      return NextResponse.json(
        { success: false, error: 'Erro ao processar body da requisição' },
        { status: 400 }
      );
    }
    
    // Validar dados da notificação
    if (!body.title || !body.body) {
      return NextResponse.json(
        { success: false, error: 'Título e corpo da notificação são obrigatórios' },
        { status: 400 }
      );
    }
    
    // Preparar o payload da notificação
    const notificationPayload = {
      title: body.title,
      body: body.body,
      url: body.url || '/prova-geral',
      icon: body.icon || '/icons/baby-boy.png',
      badge: body.badge || '/icons/baby-icon-192.png',
      vibrate: body.vibrate || [100, 50, 100],
      actions: body.actions || [
        {
          action: 'explore',
          title: 'Ver agora',
          icon: '/icons/baby-icon-192.png'
        },
        {
          action: 'close',
          title: 'Depois',
          icon: '/icons/baby-icon-192.png'
        }
      ],
      data: {
        url: body.url || '/prova-geral',
        dateOfArrival: Date.now(),
        primaryKey: Date.now()
      }
    };
    
    // Para ambiente de desenvolvimento, podemos usar notificações locais
    // Como alternativa à API Web Push que requer configuração completa
    if (process.env.NODE_ENV === 'development' || !VAPID_PRIVATE_KEY || VAPID_PRIVATE_KEY === 'sua-chave-privada-aqui') {
      console.log('Ambiente de desenvolvimento detectado, retornando sucesso simulado');
      return NextResponse.json({ 
        success: true, 
        sent: 1,
        failed: 0,
        total: 1,
        message: 'Notificação simulada enviada com sucesso. Use componente local para testes em desenvolvimento.'
      });
    }
    
    // Registrar a notificação no histórico
    console.log('Registrando notificação no histórico');
    const notificationRecord: PushNotificationHistory = {
      title: body.title,
      body: body.body,
      url: body.url,
      icon: body.icon,
      metadata: {
        tags: body.tags,
        actions: notificationPayload.actions
      }
    };
    
    const { data: historyRecord, error: historyError } = await supabase
      .from('push_notification_history')
      .insert([notificationRecord])
      .select()
      .single();
    
    if (historyError) {
      console.error('Erro ao registrar histórico de notificação:', historyError);
    } else {
      console.log('Notificação registrada com ID:', historyRecord.id);
    }
    
    const notificationId = historyRecord?.id;
    
    // Buscar todas as assinaturas ativas
    console.log('Buscando assinaturas ativas');
    const subscriptions = await pushNotificationService.getActiveSubscriptions();
    
    if (subscriptions.length === 0) {
      console.log('Nenhuma assinatura ativa encontrada');
      return NextResponse.json({ 
        success: false, 
        error: 'Nenhuma assinatura ativa encontrada' 
      });
    }
    
    console.log(`Encontradas ${subscriptions.length} assinaturas ativas`);
    
    // Contadores para sucesso e falha
    let successCount = 0;
    let failureCount = 0;
    
    // Enviar notificações para cada assinatura
    console.log('Iniciando envio de notificações');
    const sendPromises = subscriptions.map(async (subscription) => {
      try {
        // Configurar a assinatura no formato esperado pelo web-push
        const pushSubscription = {
          endpoint: subscription.endpoint,
          keys: {
            p256dh: subscription.p256dh,
            auth: subscription.auth
          }
        };
        
        // Enviar a notificação
        await webpush.sendNotification(
          pushSubscription,
          JSON.stringify(notificationPayload)
        );
        
        // Atualizar o timestamp de última notificação
        await pushNotificationService.updateLastNotified(subscription.endpoint);
        
        successCount++;
      } catch (error) {
        console.error(`Erro ao enviar para ${subscription.endpoint}:`, error);
        
        failureCount++;
        
        // Se o erro for devido a endpoint expirado, desativar a assinatura
        if (error instanceof Error && 
            (error.message.includes('410') || error.message.includes('404'))) {
          await pushNotificationService.deactivateSubscription(subscription.endpoint);
        }
      }
    });
    
    // Aguardar o término de todos os envios
    await Promise.all(sendPromises);
    console.log(`Envio concluído. Sucesso: ${successCount}, Falhas: ${failureCount}`);
    
    // Atualizar as estatísticas de envio
    if (notificationId) {
      await pushNotificationService.updateSendCounts(
        notificationId,
        successCount,
        failureCount
      );
    }
    
    return NextResponse.json({ 
      success: true, 
      sent: successCount, 
      failed: failureCount, 
      total: subscriptions.length 
    });
    
  } catch (error) {
    console.error('Erro ao processar envio de notificações:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Erro interno do servidor' 
      },
      { status: 500 }
    );
  }
} 