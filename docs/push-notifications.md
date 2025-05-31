# Configurando Notificações Push no FisioNeo

Este documento explica como configurar e usar as notificações push no site FisioNeo.

## Pré-requisitos

- Supabase configurado com as tabelas necessárias
- Node.js 18+ instalado
- HTTPS habilitado (obrigatório para notificações push, mesmo em desenvolvimento)

## Configuração Inicial

### 1. Configurar as tabelas no Supabase

Execute o script SQL em `supabase/schema.sql` no editor SQL do Supabase para criar as tabelas necessárias:

- `push_subscriptions`: armazena as assinaturas dos usuários
- `push_notification_history`: registra o histórico de notificações enviadas

### 2. Gerar chaves VAPID

As chaves VAPID são necessárias para identificar o remetente das notificações push. Para gerar:

```bash
npx web-push generate-vapid-keys
```

### 3. Configurar variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```
# Configurações do Supabase
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon-aqui

# Configurações para notificações push
VAPID_PUBLIC_KEY=sua-chave-publica-gerada
VAPID_PRIVATE_KEY=sua-chave-privada-gerada
VAPID_SUBJECT=mailto:seu-email@exemplo.com
```

## Como funciona

### Fluxo de assinatura

1. O usuário clica no botão "Receber lembrete para estudar" na página da prova
2. O navegador solicita permissão para notificações
3. Se aprovado, uma assinatura é gerada e enviada para o servidor
4. A assinatura é armazenada no Supabase

### Fluxo de envio

1. Um administrador acessa `/admin/notificacoes`
2. Preenche o formulário com título, conteúdo e outros detalhes
3. Ao enviar, a API busca todas as assinaturas ativas
4. Envia a notificação para cada dispositivo inscrito
5. Registra estatísticas de sucesso/falha

## Envio de notificações

### Via painel administrativo

1. Acesse `/admin/notificacoes`
2. Preencha o formulário
3. Clique em "Enviar Notificação"

### Via API

Para enviar via API:

```bash
curl -X POST https://seu-site.com/api/notifications/send \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Lembrete de Estudo",
    "body": "Não se esqueça de estudar para a prova!",
    "url": "/prova-geral",
    "icon": "/icons/baby-boy.png",
    "tags": ["prova", "fisioterapia-neonatal"]
  }'
```

## Estrutura de Arquivos

- `components/notification-handler.tsx`: Hook para gerenciar notificações
- `components/notification-button.tsx`: Botão para solicitar permissão
- `components/notification.tsx`: Componente para enviar notificação inicial
- `public/service-worker.js`: Service worker que recebe e processa notificações
- `lib/supabase.ts`: Cliente Supabase e funções para gerenciar assinaturas
- `app/api/notifications/subscribe/route.ts`: API para salvar assinaturas
- `app/api/notifications/send/route.ts`: API para enviar notificações
- `app/admin/notificacoes/page.tsx`: Painel administrativo

## Resolução de Problemas

### Notificações não aparecem

1. Verifique se as permissões foram concedidas no navegador
2. Confirme que o service worker está registrado
3. Verifique os logs no console para erros
4. Certifique-se de que o site está sendo acessado via HTTPS

### Erros no console

- "DOMException: Registration failed - push service error": Servidor push indisponível ou chaves VAPID inválidas
- "Failed to fetch": Problemas de conectividade com o servidor
- "NotAllowedError": Usuário negou permissão para notificações

### Notificações não persistem

Se as notificações só funcionam quando o site está aberto:

1. Verifique se o service worker está corretamente registrado
2. Confirme que as chaves VAPID estão configuradas corretamente
3. Verifique se as assinaturas estão sendo salvas no Supabase

## Considerações de Segurança

- As chaves VAPID devem ser mantidas em segredo
- Implemente autenticação adequada para o endpoint de envio em produção
- Considere limitar a frequência de envio para evitar spam

## Recursos Adicionais

- [Documentação da Web Push API](https://developer.mozilla.org/en-US/docs/Web/API/Push_API)
- [Biblioteca web-push](https://github.com/web-push-libs/web-push)
- [Documentação do Supabase](https://supabase.com/docs) 