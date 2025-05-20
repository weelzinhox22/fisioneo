"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { useSession } from "next-auth/react"
import React from "react"

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

// Função para checar se o usuário master está autenticado
const checkMasterAuth = (): boolean => {
  try {
    // 1. Verificar cookie de sessão master (mais rápido)
    const sessionCookie = getCookie('fisioneo_master_session');
    if (sessionCookie === 'true') {
      console.log('[AUTH] Usuário autenticado via cookie de sessão master');
      return true;
    }

    // 2. Verificar email e timestamp
    const masterEmail = getCookie('fisioneo_master_user') || localStorage.getItem('fisioneo_master_user');
    const loginTime = getCookie('fisioneo_master_login_time') || localStorage.getItem('fisioneo_master_login_time');
    
    if (masterEmail && loginTime) {
      try {
        // Verificar se o login não expirou (7 dias)
        const loginDate = new Date(loginTime);
        const now = new Date();
        const daysDiff = (now.getTime() - loginDate.getTime()) / (1000 * 60 * 60 * 24);
        
        if (daysDiff < 7) {
          console.log('[AUTH] Usuário master autenticado:', masterEmail);
          return true;
        } else {
          console.log('[AUTH] Login de usuário master expirado');
          return false;
        }
      } catch (e) {
        console.error('[AUTH] Erro ao verificar tempo de login:', e);
      }
    }
    
    return false;
  } catch (e) {
    console.error('[AUTH] Erro ao verificar autenticação master:', e);
    return false;
  }
};

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()
  const { data: session } = useSession()

  useEffect(() => {
    const checkAuth = async () => {
      // 1. Verificar autenticação do Google (NextAuth)
      if (session) {
        console.log('[AUTH] Usuário autenticado via NextAuth');
        setIsAuthenticated(true);
        setLoading(false);
        return;
      }

      // 2. Verificar se é um usuário master
      if (checkMasterAuth()) {
        console.log('[AUTH] Autenticação master confirmada');
        setIsAuthenticated(true);
        setLoading(false);
        return;
      }

      // 3. Se não estiver autenticado ainda, verificar Supabase
      try {
        const { data } = await supabase.auth.getSession();
        
        if (data.session) {
          // Usuário está logado no Supabase
          console.log('[AUTH] Usuário autenticado via Supabase');
          setIsAuthenticated(true);
        } else {
          // Usuário não está logado em nenhum dos métodos, redirecionar para login
          console.log('[AUTH] Nenhuma autenticação encontrada, redirecionando para login');
          router.push('/login');
          setIsAuthenticated(false);
        }
      } catch (e) {
        console.error('[AUTH] Erro ao verificar sessão Supabase:', e);
        router.push('/login');
        setIsAuthenticated(false);
      }
      
      setLoading(false);
    };

    checkAuth();
  }, [router, session]);

  // Mostrar loading enquanto verifica
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#6EC1E4]"></div>
      </div>
    );
  }

  // Só renderizar o conteúdo se estiver autenticado
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // Se não estiver autenticado, mostrar loading enquanto redireciona
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#6EC1E4]"></div>
    </div>
  );
} 