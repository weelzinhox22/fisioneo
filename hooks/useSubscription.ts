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
  },
  {
    email: 'professor@fisioneo.com',
    password: 'Professor@2024',
  },
  {
    email: 'diretor@fisioneo.com',
    password: 'Diretor@2024',
  },
  {
    email: 'convidado@fisioneo.com',
    password: 'Convidado@2024',
  }
];

// Função auxiliar para obter cookies
const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null;
  
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + '=')) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
};

// Verificar se o usuário master está autenticado
const isMasterUser = (): {authenticated: boolean, email: string | null} => {
  try {
    // 1. Verificar cookie de sessão
    if (getCookie('fisioneo_master_session') === 'true') {
      const email = getCookie('fisioneo_master_user') || localStorage.getItem('fisioneo_master_user');
      if (email) {
        return { authenticated: true, email };
      }
    }
    
    // 2. Verificar por email e timestamp
    const masterEmail = getCookie('fisioneo_master_user') || localStorage.getItem('fisioneo_master_user');
    const loginTime = getCookie('fisioneo_master_login_time') || localStorage.getItem('fisioneo_master_login_time');
    
    if (masterEmail && loginTime) {
      try {
        const loginDate = new Date(loginTime);
        const now = new Date();
        const daysDiff = (now.getTime() - loginDate.getTime()) / (1000 * 60 * 60 * 24);
        
        if (daysDiff < 7) { // 7 dias de validade
          return { authenticated: true, email: masterEmail };
        }
      } catch (e) {
        console.error('[SUBSCRIPTION] Erro ao verificar tempo de login:', e);
      }
    }
    
    return { authenticated: false, email: null };
  } catch (e) {
    console.error('[SUBSCRIPTION] Erro ao verificar autenticação master:', e);
    return { authenticated: false, email: null };
  }
};

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
        // 1. Verificar primeiro se é um usuário master
        const { authenticated, email: masterEmail } = isMasterUser();
        
        if (authenticated && masterEmail) {
          console.log('[SUBSCRIPTION] Usuário master autenticado:', masterEmail);
          setHasSubscription(true);
          setSubscriptionData({ 
            type: 'master',
            plan_type: 'lifetime',
            created_at: new Date().toISOString()
          });
          setLoading(false);
          return;
        }
        
        // 2. Se não é usuário master, verificar o email por outros meios
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
        
        // 3. Verificar se o usuário possui assinatura ativa no Supabase
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