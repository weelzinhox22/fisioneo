"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Hero } from "@/app/components/Hero"
import { AboutSection } from "@/app/components/AboutSection"
import { RegistrationTutorial } from "@/app/components/RegistrationTutorial"
import { MainFeatures } from "@/app/components/MainFeatures"
import { AlertDialog } from "@/components/ui/alert-dialog"
import { useSession } from "next-auth/react"
import { supabase } from "@/lib/supabase"

export default function Home() {
  const [showLoginAlert, setShowLoginAlert] = useState(false)
  const { data: nextAuthSession, status: nextAuthStatus } = useSession()
  const [supabaseSession, setSupabaseSession] = useState<any>(null)

  // Check for Supabase session and subscribe to auth changes
  useEffect(() => {
    const checkSupabaseAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setSupabaseSession(session)

      // Subscribe to auth changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setSupabaseSession(session)
      })

      return () => subscription.unsubscribe()
    }

    checkSupabaseAuth()
  }, [])

  // Combined session check that updates with auth state changes
  const isAuthenticated = Boolean(nextAuthSession || supabaseSession)

  // Don't render while checking auth status
  if (nextAuthStatus === "loading") {
    return null
  }

  const handleAIAssistantClick = () => {
    if (!isAuthenticated) {
      setShowLoginAlert(true)
      return
    }
    alert('Assistente IA ativado!') // Replace with actual functionality
  }

  return (
    <motion.div 
      className="relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      
      <AboutSection />

      <RegistrationTutorial />

      <MainFeatures 
        onAIAssistantClick={handleAIAssistantClick}
        isAuthenticated={isAuthenticated}
      />

      {/* Login Alert Dialog */}
      <AlertDialog
        isOpen={showLoginAlert}
        onClose={() => setShowLoginAlert(false)}
        title="Faça login para continuar"
        message="Para acessar o Assistente IA, você precisa estar logado em sua conta."
        type="info"
      />
    </motion.div>
  );
}
