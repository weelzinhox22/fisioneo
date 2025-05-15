"use client"

import { useSession } from "next-auth/react"
import { useRouter, usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()
  const [supabaseSession, setSupabaseSession] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [authError, setAuthError] = useState<string | null>(null)

  // Verifica e mantém a sessão do Supabase atualizada
  useEffect(() => {
    const checkSupabaseSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        console.log('Supabase session check:', session ? 'Presente' : 'Ausente')
        if (session) {
          console.log('Supabase user:', session.user.email)
        }
        setSupabaseSession(!!session)
      } catch (error) {
        console.error('Erro ao verificar sessão Supabase:', error)
        setAuthError('Erro ao verificar sessão Supabase')
        setSupabaseSession(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkSupabaseSession()

    // Inscreve-se para mudanças na sessão do Supabase
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('Supabase auth state change:', _event)
      console.log('New session:', session ? 'Presente' : 'Ausente')
      setSupabaseSession(!!session)
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (status === "loading" || isLoading) return

    const hasNextAuthSession = status === "authenticated"
    console.log('=== Estado das Sessões em RequireAuth ===')
    console.log('NextAuth status:', status)
    console.log('NextAuth session:', hasNextAuthSession ? 'Presente' : 'Ausente')
    if (session?.user) {
      console.log('NextAuth user:', session.user.email)
    }
    console.log('Supabase session:', supabaseSession ? 'Presente' : 'Ausente')

    // Verifica se tem pelo menos uma sessão válida
    const hasValidSession = hasNextAuthSession || supabaseSession

    if (!hasValidSession) {
      console.log('Nenhuma sessão válida encontrada em RequireAuth')
      console.log('Redirecionando para:', `/login?callbackUrl=${encodeURIComponent(pathname)}`)
      router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`)
    } else {
      console.log('Sessão válida encontrada:', hasNextAuthSession ? 'NextAuth' : 'Supabase')
    }
  }, [session, status, supabaseSession, isLoading, router, pathname])

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#6EC1E4]"></div>
      </div>
    )
  }

  if (authError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">
          Erro de autenticação: {authError}
        </div>
      </div>
    )
  }

  // Permite o acesso se tiver qualquer sessão válida
  if (!session && !supabaseSession) {
    return null
  }

  return <>{children}</>
} 