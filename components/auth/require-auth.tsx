"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import React from "react"

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Verificar se o usuário está logado apenas uma vez na montagem do componente
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession()
      
      if (!data.session) {
        // Usuário não está logado, redirecionar para login
        router.push('/login')
      } else {
        // Usuário está logado, mostrar conteúdo
        console.log('Usuário autenticado:', !!data.session)
      }
      
      setLoading(false)
    }

    checkAuth()
  }, [router])

  // Mostrar loading enquanto verifica
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#6EC1E4]"></div>
      </div>
    )
  }

  // Conteúdo é renderizado mesmo durante o redirecionamento
  return <>{children}</>
} 