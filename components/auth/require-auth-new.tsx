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

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()
  const { data: session } = useSession()

  useEffect(() => {
    const checkAuth = async () => {
      // Verificar autenticação do Google (NextAuth)
      if (session) {
        console.log('[AUTH] Usuário autenticado via NextAuth');
        setIsAuthenticated(true)
        setLoading(false)
        return
      }

      // Verificar se é um usuário master através do localStorage e cookies
      // Tentando várias abordagens para aumentar a chance de sucesso
      let masterUser = null;
      let masterLoginTime = null;
      
      // Tentar via localStorage primeiro
      try {
        masterUser = localStorage.getItem('fisioneo_master_user');
        masterLoginTime = localStorage.getItem('fisioneo_master_login_time');
        
        // Se não encontrou no localStorage, tentar via cookies
        if (!masterUser || !masterLoginTime) {
          console.log('[AUTH] Tentando obter sessão de usuário master via cookies');
          masterUser = getCookie('fisioneo_master_user');
          masterLoginTime = getCookie('fisioneo_master_login_time');
        }
      } catch (e) {
        console.error('[AUTH] Erro ao acessar localStorage:', e);
        // Se ocorrer erro com localStorage, tentar cookies
        masterUser = getCookie('fisioneo_master_user');
        masterLoginTime = getCookie('fisioneo_master_login_time');
      }
      
      if (masterUser && masterLoginTime) {
        console.log('[AUTH] Encontrada sessão de usuário master:', masterUser);
        try {
          const loginTime = new Date(masterLoginTime);
          const now = new Date();
          
          // Verificar se a sessão master não expirou (24 horas)
          const timeDiff = now.getTime() - loginTime.getTime();
          const hoursDiff = timeDiff / (1000 * 60 * 60);
          
          if (hoursDiff < 24) {
            console.log('[AUTH] Usuário master autenticado:', masterUser);
            
            // Atualizar o timestamp de login para estender a sessão
            const newLoginTime = new Date().toString();
            try {
              localStorage.setItem('fisioneo_master_login_time', newLoginTime);
              
              // Atualizar também os cookies
              const expirationDate = new Date();
              expirationDate.setHours(expirationDate.getHours() + 24);
              document.cookie = `fisioneo_master_login_time=${newLoginTime}; path=/; expires=${expirationDate.toUTCString()}; secure; samesite=lax`;
            } catch (e) {
              console.error('[AUTH] Erro ao atualizar timestamp de sessão:', e);
            }
            
            setIsAuthenticated(true);
            setLoading(false);
            return;
          } else {
            // Sessão expirada, limpar dados
            console.log('[AUTH] Sessão master expirada');
            try {
              localStorage.removeItem('fisioneo_master_user');
              localStorage.removeItem('fisioneo_master_login_time');
              
              // Limpar cookies também
              document.cookie = 'fisioneo_master_user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; secure; samesite=lax';
              document.cookie = 'fisioneo_master_login_time=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; secure; samesite=lax';
            } catch (e) {
              console.error('[AUTH] Erro ao limpar dados de sessão expirada:', e);
            }
          }
        } catch (e) {
          console.error('[AUTH] Erro ao verificar tempo de sessão:', e);
        }
      }

      // Se não estiver autenticado com Google ou master, verificar Supabase
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
    }

    checkAuth();
  }, [router, session]) // Adicionar session como dependência

  // Mostrar loading enquanto verifica
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#6EC1E4]"></div>
      </div>
    )
  }

  // Só renderizar o conteúdo se estiver autenticado
  if (isAuthenticated) {
    return <>{children}</>
  }

  // Se não estiver autenticado, mostrar loading enquanto redireciona
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#6EC1E4]"></div>
    </div>
  )
} 