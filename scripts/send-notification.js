#!/usr/bin/env node

/**
 * Script para enviar notificações push via linha de comando
 * 
 * Uso:
 * node scripts/send-notification.js --title "Título" --body "Conteúdo" [--url "/caminho"] [--icon "/icon.png"]
 */

const { createClient } = require('@supabase/supabase-js');
const webpush = require('web-push');
const dotenv = require('dotenv');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

// Carregar variáveis de ambiente
dotenv.config({ path: '.env.local' });

// Verificar ambiente
if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.error('⚠️ Configuração Supabase não encontrada. Verifique o arquivo .env.local');
  process.exit(1);
}

if (!process.env.VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY || !process.env.VAPID_SUBJECT) {
  console.error('⚠️ Configuração VAPID não encontrada. Verifique o arquivo .env.local');
  process.exit(1);
}

// Configurar argumentos da linha de comando
const argv = yargs(hideBin(process.argv))
  .option('title', {
    alias: 't',
    description: 'Título da notificação',
    type: 'string',
    demandOption: true
  })
  .option('body', {
    alias: 'b',
    description: 'Conteúdo da notificação',
    type: 'string',
    demandOption: true
  })
  .option('url', {
    alias: 'u',
    description: 'URL de destino ao clicar na notificação',
    type: 'string',
    default: '/prova-geral'
  })
  .option('icon', {
    alias: 'i',
    description: 'Caminho para o ícone da notificação',
    type: 'string',
    default: '/icons/baby-boy.png'
  })
  .option('tag', {
    description: 'Tags para filtrar assinaturas (pode ser repetido)',
    type: 'array',
    default: ['prova', 'fisioterapia-neonatal']
  })
  .option('schedule', {
    alias: 's',
    description: 'Programar para envio (formato ISO ou "agora")',
    type: 'string',
    default: 'agora'
  })
  .help()
  .alias('help', 'h')
  .version(false)
  .argv;

// Inicializar clientes
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Configurar web-push
webpush.setVapidDetails(
  process.env.VAPID_SUBJECT,
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

async function main() {
  console.log('🔔 FisioNeo - Enviador de Notificações Push');
  console.log('----------------------------------------');
  
  try {
    // Preparar o payload da notificação
    const notificationPayload = {
      title: argv.title,
      body: argv.body,
      url: argv.url,
      icon: argv.icon,
      badge: '/icons/baby-icon-192.png',
      vibrate: [100, 50, 100],
      actions: [
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
        url: argv.url,
        dateOfArrival: Date.now(),
        primaryKey: Date.now()
      }
    };
    
    // Registrar a notificação no histórico
    console.log('📝 Registrando notificação no histórico...');
    
    const { data: historyRecord, error: historyError } = await supabase
      .from('push_notification_history')
      .insert([{
        title: argv.title,
        body: argv.body,
        url: argv.url,
        icon: argv.icon,
        metadata: {
          tags: argv.tag,
          actions: notificationPayload.actions
        }
      }])
      .select()
      .single();
    
    if (historyError) {
      console.error('❌ Erro ao registrar histórico:', historyError.message);
    } else {
      console.log('✅ Notificação registrada com ID:', historyRecord.id);
    }
    
    // Buscar todas as assinaturas ativas
    console.log('🔍 Buscando assinaturas ativas...');
    const { data: subscriptions, error: subscriptionError } = await supabase
      .from('push_subscriptions')
      .select('*')
      .eq('is_active', true);
    
    if (subscriptionError) {
      console.error('❌ Erro ao buscar assinaturas:', subscriptionError.message);
      process.exit(1);
    }
    
    if (!subscriptions || subscriptions.length === 0) {
      console.log('⚠️ Nenhuma assinatura ativa encontrada');
      process.exit(0);
    }
    
    console.log(`📱 Encontradas ${subscriptions.length} assinaturas ativas`);
    
    // Verificar se é para agendar
    if (argv.schedule !== 'agora') {
      const scheduleTime = new Date(argv.schedule);
      
      if (isNaN(scheduleTime.getTime())) {
        console.error('❌ Data de agendamento inválida');
        process.exit(1);
      }
      
      // Calcular tempo de espera
      const waitTime = scheduleTime.getTime() - Date.now();
      
      if (waitTime <= 0) {
        console.log('⚠️ A data programada já passou, enviando imediatamente');
      } else {
        console.log(`⏰ Notificação agendada para ${scheduleTime.toLocaleString()}`);
        console.log(`   Aguardando ${Math.round(waitTime/1000)} segundos...`);
        
        // Aguardar até o tempo programado
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
    }
    
    // Contadores para sucesso e falha
    let successCount = 0;
    let failureCount = 0;
    
    // Enviar notificações para cada assinatura
    console.log('📤 Enviando notificações...');
    
    const sendPromises = subscriptions.map(async (subscription, index) => {
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
        await supabase
          .from('push_subscriptions')
          .update({ last_notified: new Date().toISOString() })
          .eq('endpoint', subscription.endpoint);
        
        successCount++;
        
        // Mostrar progresso
        if ((index + 1) % 5 === 0 || index === subscriptions.length - 1) {
          console.log(`   Progresso: ${index + 1}/${subscriptions.length}`);
        }
      } catch (error) {
        console.error(`❌ Erro ao enviar para assinatura #${index + 1}:`, error.message);
        
        failureCount++;
        
        // Se o erro for devido a endpoint expirado, desativar a assinatura
        if (error.statusCode === 410 || error.statusCode === 404) {
          console.log(`   ⚠️ Endpoint expirado, desativando assinatura #${index + 1}`);
          await supabase
            .from('push_subscriptions')
            .update({ is_active: false })
            .eq('endpoint', subscription.endpoint);
        }
      }
    });
    
    // Aguardar o término de todos os envios
    await Promise.all(sendPromises);
    
    // Atualizar as estatísticas de envio
    if (historyRecord?.id) {
      await supabase
        .from('push_notification_history')
        .update({ 
          sent_count: successCount,
          failed_count: failureCount
        })
        .eq('id', historyRecord.id);
    }
    
    console.log('----------------------------------------');
    console.log('📊 Resultado do envio:');
    console.log(`   ✅ Enviadas com sucesso: ${successCount}`);
    console.log(`   ❌ Falhas: ${failureCount}`);
    console.log(`   📱 Total de dispositivos: ${subscriptions.length}`);
    console.log('----------------------------------------');
    
    if (successCount > 0) {
      console.log('🎉 Notificações enviadas com sucesso!');
    } else {
      console.log('⚠️ Nenhuma notificação foi enviada com sucesso.');
    }
    
  } catch (error) {
    console.error('❌ Erro fatal:', error);
    process.exit(1);
  }
}

// Executar o script
main(); 