import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { supabase } from '@/lib/supabase';

interface UseSubscriptionResult {
  loading: boolean;
  hasSubscription: boolean;
  subscriptionData: any | null;
  error: string | null;
}

// Lista de usuários master com acesso ilimitado
const masterUsers = [
  {
    email: 'admin@fisioneo.com',
    password: 'Fisioneo@2023',
    deviceId: '', // Será preenchido ao entrar
  },
  {
    email: 'professor@fisioneo.com',
    password: 'Professor@2024',
    deviceId: '',
  },
  {
    email: 'diretor@fisioneo.com',
    password: 'Diretor@2024',
    deviceId: '',
  },
  {
    email: 'convidado@fisioneo.com',
    password: 'Convidado@2024',
    deviceId: '',
  }
];

// Função para obter um identificador único do dispositivo
const getDeviceFingerprint = async (): Promise<string> => {
  try {
    // Tentando obter o endereço MAC ou algum identificador único
    const storedDeviceId = localStorage.getItem('fisioneo_device_id');
    
    if (storedDeviceId) {
      return storedDeviceId;
    }
    
    // Se não tiver um ID armazenado, criar um novo baseado em características do navegador
    const fingerprint = [
      navigator.userAgent,
      navigator.language,
      screen.colorDepth,
      screen.width + "x" + screen.height,
      new Date().getTimezoneOffset(),
      !!window.sessionStorage,
      !!window.localStorage,
      !!window.indexedDB,
    ].join('•');
    
    // Criar um hash simples a partir do fingerprint
    let hash = 0;
    for (let i = 0; i < fingerprint.length; i++) {
      const char = fingerprint.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    
    const deviceId = 'dev_' + Math.abs(hash).toString(16);
    
    // Salvar o ID no localStorage
    localStorage.setItem('fisioneo_device_id', deviceId);
    
    return deviceId;
  } catch (error) {
    console.error("Erro ao gerar identificador de dispositivo:", error);
    return 'unknown_device';
  }
};

export function useSubscription(): UseSubscriptionResult {
  const [loading, setLoading] = useState(true);
  const [hasSubscription, setHasSubscription] = useState(false);
  const [subscriptionData, setSubscriptionData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const { data: session } = useSession();
  
  useEffect(() => {
    const checkSubscription = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Tentar obter o email do usuário
        let userEmail = null;
        
        // Verificar se o usuário está logado via NextAuth
        if (session?.user?.email) {
          userEmail = session.user.email;
          console.log('[SUBSCRIPTION] Verificando assinatura para:', userEmail);
        } else {
          // Verificar autenticação do Supabase
          const { data } = await supabase.auth.getSession();
          
          if (data.session?.user?.email) {
            userEmail = data.session.user.email;
            console.log('[SUBSCRIPTION] Verificando assinatura para:', userEmail);
          } else {
            // Usuário não está logado
            setLoading(false);
            setHasSubscription(false);
            return;
          }
        }
        
        if (!userEmail) {
          setLoading(false);
          setHasSubscription(false);
          return;
        }

        // Verificar se o usuário é um usuário master
        const isMasterUser = masterUsers.some(user => user.email.toLowerCase() === userEmail?.toLowerCase());
        
        if (isMasterUser) {
          console.log('[SUBSCRIPTION] Usuário master detectado:', userEmail);
          
          // Para usuários master, verificar se o dispositivo já está associado a este usuário
          const deviceId = await getDeviceFingerprint();
          
          // Encontrar o usuário master na lista
          const masterUserIndex = masterUsers.findIndex(user => 
            user.email.toLowerCase() === userEmail?.toLowerCase()
          );
          
          if (masterUserIndex !== -1) {
            // Verifica se algum outro usuário já está usando este dispositivo
            const deviceInUseByOther = masterUsers.some((user, index) => 
              index !== masterUserIndex && 
              user.deviceId === deviceId && 
              user.deviceId !== ''
            );
            
            if (deviceInUseByOther) {
              console.log('[SUBSCRIPTION] Dispositivo já associado a outro usuário master.');
              setHasSubscription(false);
            } else {
              // Atribuir este dispositivo ao usuário master se ainda não estiver atribuído
              if (masterUsers[masterUserIndex].deviceId === '' || 
                  masterUsers[masterUserIndex].deviceId === deviceId) {
                masterUsers[masterUserIndex].deviceId = deviceId;
                console.log('[SUBSCRIPTION] Dispositivo associado ao usuário master:', deviceId);
                setHasSubscription(true);
                setSubscriptionData({ 
                  type: 'master',
                  plan_type: 'lifetime',
                  created_at: new Date().toISOString()
                });
                setLoading(false);
                return;
              }
              
              // Se o usuário já tem um dispositivo diferente associado
              console.log('[SUBSCRIPTION] Usuário master tentando acessar de outro dispositivo.');
              setHasSubscription(false);
            }
          }
        }
        
        // Verificar se o usuário possui assinatura ativa no Supabase
        const { data, error } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('email', userEmail)
          .eq('is_active', true)
          .order('created_at', { ascending: false })
          .limit(1);
        
        if (error) {
          console.error('[SUBSCRIPTION] Erro ao verificar assinatura:', error);
          setError('Erro ao verificar assinatura');
          setHasSubscription(false);
        } else {
          const hasActiveSubscription = data && data.length > 0;
          setHasSubscription(hasActiveSubscription);
          setSubscriptionData(hasActiveSubscription ? data[0] : null);
          console.log('[SUBSCRIPTION] Status de assinatura:', hasActiveSubscription);
        }
      } catch (err) {
        console.error('[SUBSCRIPTION] Erro ao verificar assinatura:', err);
        setError('Erro ao verificar assinatura');
        setHasSubscription(false);
      } finally {
        setLoading(false);
      }
    };
    
    checkSubscription();
  }, [session]);
  
  return {
    loading,
    hasSubscription,
    subscriptionData,
    error
  };
} 