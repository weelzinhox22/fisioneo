"use client"

import { useState, useEffect } from "react"
import { Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useSession } from "next-auth/react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { AlertDialog } from "@/components/ui/alert-dialog"

export default function DraggableAIButton() {
  const [isVisible, setIsVisible] = useState(false)
  const [supabaseSession, setSupabaseSession] = useState<any>(null)
  const [showLoginAlert, setShowLoginAlert] = useState(false)
  const { data: nextAuthSession } = useSession()
  const router = useRouter()

  useEffect(() => {
    // Check for Supabase session
    const checkSupabaseAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setSupabaseSession(session)
    }
    checkSupabaseAuth()

    // Delay the appearance of the button
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 1000)
    
    return () => {
      clearTimeout(timer)
    }
  }, [])

  // Combined session check
  const isAuthenticated = nextAuthSession || supabaseSession

  const handleClick = () => {
    if (!isAuthenticated) {
      setShowLoginAlert(true)
      return
    }
    alert('Assistente IA ativado!') // Replace with actual functionality
  }

  return (
    <>
      <AlertDialog
        isOpen={showLoginAlert}
        onClose={() => setShowLoginAlert(false)}
        title="Login Necessário"
        message="Para acessar o Assistente IA, faça login na plataforma."
        type="success"
      />

      <AnimatePresence>
        {isVisible && (
          <div className="fixed bottom-6 right-6 z-50">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <button
                className={`bg-gradient-to-r ${
                  isAuthenticated 
                    ? "from-[#6EC1E4] to-[#B9A9FF] hover:from-[#5BA8CB] hover:to-[#A090E0]" 
                    : "from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600"
                } text-white rounded-full p-4 shadow-lg transition-all duration-300 flex items-center gap-2`}
                aria-label="Abrir assistente de IA"
                onClick={handleClick}
              >
                <Sparkles className="h-5 w-5" />
                <span className="font-medium">Assistente IA</span>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
} 