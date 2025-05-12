"use client"

import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function BackToTop() {
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const checkScrollPosition = () => {
      // Mostrar o botão quando a rolagem ultrapassar 500px
      setShowButton(window.scrollY > 500)
    }

    // Detectar a posição de rolagem
    window.addEventListener("scroll", checkScrollPosition)
    
    // Verificar posição inicial
    checkScrollPosition()

    // Limpar o evento quando o componente for desmontado
    return () => window.removeEventListener("scroll", checkScrollPosition)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  return (
    <AnimatePresence>
      {showButton && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
          className="fixed bottom-4 left-4 z-50 bg-white shadow-lg hover:shadow-xl p-3 rounded-full transform hover:scale-110 transition-all duration-300"
          aria-label="Voltar ao topo"
        >
          <ArrowUp className="h-6 w-6 text-[#6EC1E4]" />
          <span className="absolute -top-1 -right-1 bg-[#4A96D1] text-white text-xs h-5 w-5 flex items-center justify-center rounded-full">
            ↑
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  )
} 