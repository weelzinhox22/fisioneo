"use client"

import { useState, useEffect } from "react"
import { Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function DraggableAIButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Delay the appearance of the button for a smoother experience
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 1000)
    
    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
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
              className="bg-gradient-to-r from-[#6EC1E4] to-[#B9A9FF] hover:from-[#5BA8CB] hover:to-[#A090E0] text-white rounded-full p-4 shadow-lg transition-all duration-300 flex items-center gap-2"
              aria-label="Abrir assistente de IA"
              onClick={() => {
                alert('Assistente IA ativado!') // Replace with actual functionality
              }}
            >
              <Sparkles className="h-5 w-5" />
              <span className="font-medium">Assistente IA</span>
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
} 