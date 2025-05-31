-- Esquema para armazenar assinaturas de notificações push no Supabase
-- Execute este SQL no editor SQL do Supabase

-- Habilitar extensão UUID para IDs únicos
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabela para armazenar assinaturas de push
CREATE TABLE IF NOT EXISTS push_subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  endpoint TEXT NOT NULL UNIQUE,
  p256dh TEXT NOT NULL,
  auth TEXT NOT NULL,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_notified TIMESTAMPTZ,
  
  -- Campos opcionais para segmentação
  tags TEXT[] DEFAULT '{}',
  device_type TEXT,
  is_active BOOLEAN DEFAULT TRUE
);

-- Criar índice para consultas mais rápidas
CREATE INDEX IF NOT EXISTS idx_push_subscriptions_is_active ON push_subscriptions(is_active);

-- Tabela para histórico de notificações enviadas
CREATE TABLE IF NOT EXISTS push_notification_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  url TEXT,
  icon TEXT,
  sent_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  sent_count INTEGER DEFAULT 0,
  failed_count INTEGER DEFAULT 0,
  
  -- Metadados adicionais
  metadata JSONB DEFAULT '{}'
);

-- Políticas de segurança RLS (Row Level Security)
-- Para garantir que apenas funções autorizadas possam manipular esses dados

-- Habilitar RLS
ALTER TABLE push_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE push_notification_history ENABLE ROW LEVEL SECURITY;

-- Criar políticas (vamos usar um perfil de serviço para acesso)
CREATE POLICY "Serviço pode inserir assinaturas" ON push_subscriptions
  FOR INSERT TO authenticated WITH CHECK (true);
  
CREATE POLICY "Serviço pode ler assinaturas" ON push_subscriptions
  FOR SELECT TO authenticated USING (true);
  
CREATE POLICY "Serviço pode atualizar assinaturas" ON push_subscriptions
  FOR UPDATE TO authenticated USING (true);
  
CREATE POLICY "Serviço pode inserir histórico" ON push_notification_history
  FOR INSERT TO authenticated WITH CHECK (true);
  
CREATE POLICY "Serviço pode ler histórico" ON push_notification_history
  FOR SELECT TO authenticated USING (true);

-- Função para limpar assinaturas expiradas (execute periodicamente)
CREATE OR REPLACE FUNCTION clean_expired_subscriptions()
RETURNS INTEGER AS $$
DECLARE
  expired_count INTEGER;
BEGIN
  -- Marcar como inativas assinaturas que não foram notificadas nos últimos 30 dias
  UPDATE push_subscriptions
  SET is_active = FALSE
  WHERE last_notified < NOW() - INTERVAL '30 days'
    AND is_active = TRUE;
    
  GET DIAGNOSTICS expired_count = ROW_COUNT;
  RETURN expired_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER; 