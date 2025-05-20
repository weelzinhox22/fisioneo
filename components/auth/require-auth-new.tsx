"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { useSession } from "next-auth/react"
import React from "react"

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()
  const { data: session } = useSession()

  useEffect(() => {
    const checkAuth = async () => {
      // Verificar autenticação do Google (NextAuth)
      if (session) {
        setIsAuthenticated(true)
        setLoading(false)
        return
      }

      // Verificar se é um usuário master através do localStorage
      const masterUser = localStorage.getItem('fisioneo_master_user')
      const masterLoginTime = localStorage.getItem('fisioneo_master_login_time')
      
      if (masterUser && masterLoginTime) {
        const loginTime = new Date(masterLoginTime)
        const now = new Date()
        
        // Verificar se a sessão master não expirou (24 horas)
        const timeDiff = now.getTime() - loginTime.getTime()
        const hoursDiff = timeDiff / (1000 * 60 * 60)
        
        if (hoursDiff < 24) {
          console.log('Usuário master autenticado:', masterUser)
          setIsAuthenticated(true)
          setLoading(false)
          return
        } else {
          // Sessão expirada, limpar dados
          console.log('Sessão master expirada')
          localStorage.removeItem('fisioneo_master_user')
          localStorage.removeItem('fisioneo_master_login_time')
        }
      }

      // Se não estiver autenticado com Google ou master, verificar Supabase
      const { data } = await supabase.auth.getSession()
      
      if (!data.session) {
        // Usuário não está logado em nenhum dos métodos, redirecionar para login
        router.push('/login')
        setIsAuthenticated(false)
      } else {
        // Usuário está logado no Supabase
        console.log('Usuário autenticado via Supabase:', !!data.session)
        setIsAuthenticated(true)
      }
      
      setLoading(false)
    }

    checkAuth()
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