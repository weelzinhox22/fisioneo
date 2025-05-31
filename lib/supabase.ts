import { createClient } from '@supabase/supabase-js'

// Estas variáveis de ambiente devem ser definidas no seu .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Criando um cliente Supabase para o front-end
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Interface para a tabela de assinaturas push
export interface PushSubscription {
  id?: string
  endpoint: string
  p256dh: string
  auth: string
  user_agent?: string
  created_at?: string
  last_notified?: string
  tags?: string[]
  device_type?: string
  is_active?: boolean
}

// Interface para o histórico de notificações
export interface PushNotificationHistory {
  id?: string
  title: string
  body: string
  url?: string
  icon?: string
  sent_at?: string
  sent_count?: number
  failed_count?: number
  metadata?: Record<string, any>
}

// Funções para gerenciar assinaturas de push
export const pushNotificationService = {
  // Salvar uma nova assinatura
  async saveSubscription(subscription: PushSubscription): Promise<{ success: boolean, error?: string }> {
    try {
      const { data, error } = await supabase
        .from('push_subscriptions')
        .upsert({
          endpoint: subscription.endpoint,
          p256dh: subscription.p256dh,
          auth: subscription.auth,
          user_agent: typeof window !== 'undefined' ? window.navigator.userAgent : undefined,
          device_type: typeof window !== 'undefined' ? (window.innerWidth <= 768 ? 'mobile' : 'desktop') : undefined,
          is_active: true
        }, {
          onConflict: 'endpoint',
          ignoreDuplicates: false
        });
      
      if (error) throw error;
      
      return { success: true };
    } catch (error) {
      console.error('Erro ao salvar assinatura push:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Erro desconhecido' 
      };
    }
  },
  
  // Atualizar o timestamp de última notificação
  async updateLastNotified(endpoint: string): Promise<void> {
    try {
      await supabase
        .from('push_subscriptions')
        .update({ last_notified: new Date().toISOString() })
        .eq('endpoint', endpoint);
    } catch (error) {
      console.error('Erro ao atualizar timestamp de notificação:', error);
    }
  },
  
  // Buscar todas as assinaturas ativas
  async getActiveSubscriptions(): Promise<PushSubscription[]> {
    try {
      const { data, error } = await supabase
        .from('push_subscriptions')
        .select('*')
        .eq('is_active', true);
      
      if (error) throw error;
      
      return data || [];
    } catch (error) {
      console.error('Erro ao buscar assinaturas ativas:', error);
      return [];
    }
  },
  
  // Desativar uma assinatura
  async deactivateSubscription(endpoint: string): Promise<void> {
    try {
      await supabase
        .from('push_subscriptions')
        .update({ is_active: false })
        .eq('endpoint', endpoint);
    } catch (error) {
      console.error('Erro ao desativar assinatura:', error);
    }
  },
  
  // Registrar histórico de notificação enviada
  async logNotificationSent(notification: PushNotificationHistory): Promise<void> {
    try {
      await supabase
        .from('push_notification_history')
        .insert([notification]);
    } catch (error) {
      console.error('Erro ao registrar histórico de notificação:', error);
    }
  },
  
  // Atualizar contadores de envio
  async updateSendCounts(notificationId: string, sentCount: number, failedCount: number): Promise<void> {
    try {
      await supabase
        .from('push_notification_history')
        .update({ 
          sent_count: sentCount,
          failed_count: failedCount
        })
        .eq('id', notificationId);
    } catch (error) {
      console.error('Erro ao atualizar contadores de envio:', error);
    }
  }
}; 