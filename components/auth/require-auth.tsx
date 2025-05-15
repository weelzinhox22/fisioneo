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

  useEffect(() => {
    const checkSupabaseSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        setSupabaseSession(!!session)
      } catch (error) {
        console.error('Erro ao verificar sessão Supabase:', error)
        setSupabaseSession(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkSupabaseSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSupabaseSession(!!session)
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (status === "loading" || isLoading) return

    const hasNextAuthSession = status === "authenticated"
    console.log('Estado da sessão NextAuth:', hasNextAuthSession ? 'Autenticado' : 'Não autenticado')
    console.log('Estado da sessão Supabase:', supabaseSession ? 'Autenticado' : 'Não autenticado')

    const hasValidSession = hasNextAuthSession || supabaseSession

    if (!hasValidSession) {
      console.log('Nenhuma sessão válida encontrada em RequireAuth')
      const callbackUrl = pathname
      router.push(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`)
    }
  }, [session, status, supabaseSession, isLoading, router, pathname])

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#6EC1E4]"></div>
      </div>
    )
  }

  if (!session && !supabaseSession) {
    return null
  }

  return <>{children}</>
} 