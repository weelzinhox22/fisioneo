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

      // Se não estiver autenticado com Google, verificar Supabase
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