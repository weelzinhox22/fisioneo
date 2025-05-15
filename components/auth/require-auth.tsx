"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { data: nextAuthSession, status: nextAuthStatus } = useSession()
  const [supabaseSession, setSupabaseSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkSupabaseAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setSupabaseSession(session)
      setLoading(false)

      // Subscribe to auth changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setSupabaseSession(session)
      })

      return () => subscription.unsubscribe()
    }

    checkSupabaseAuth()
  }, [])

  useEffect(() => {
    if (loading) return

    // If neither NextAuth nor Supabase session exists, redirect to login
    if (nextAuthStatus !== "loading" && !nextAuthSession && !supabaseSession) {
      router.push('/login')
    }
  }, [nextAuthSession, nextAuthStatus, supabaseSession, loading, router])

  // Show loading state while checking auth
  if (loading || nextAuthStatus === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#6EC1E4]"></div>
      </div>
    )
  }

  // If either auth method is valid, render children
  if (nextAuthSession || supabaseSession) {
    return <>{children}</>
  }

  // If no valid session, render nothing (will redirect)
  return null
} 