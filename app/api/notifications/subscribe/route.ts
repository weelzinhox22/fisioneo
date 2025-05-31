import { NextResponse } from 'next/server';
import { pushNotificationService, type PushSubscription } from '@/lib/supabase';

// API para salvar uma assinatura de notificação push
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validação dos dados necessários
    if (!body.subscription || !body.subscription.endpoint || !body.subscription.keys) {
      return NextResponse.json(
        { success: false, error: 'Dados de assinatura inválidos' },
        { status: 400 }
      );
    }
    
    // Converter do formato do navegador para o formato do banco de dados
    const subscriptionData: PushSubscription = {
      endpoint: body.subscription.endpoint,
      p256dh: body.subscription.keys.p256dh,
      auth: body.subscription.keys.auth,
    };
    
    // Opcionalmente adicionar tags se fornecidas
    if (body.tags && Array.isArray(body.tags)) {
      subscriptionData.tags = body.tags;
    }
    
    // Salvar a assinatura no Supabase
    const result = await pushNotificationService.saveSubscription(subscriptionData);
    
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || 'Erro ao salvar assinatura' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao processar solicitação de assinatura:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Erro interno do servidor' 
      },
      { status: 500 }
    );
  }
} 