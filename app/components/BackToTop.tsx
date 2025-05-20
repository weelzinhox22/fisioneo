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
          className="fixed bottom-6 left-6 z-50 bg-gradient-to-r from-[#6EC1E4] to-[#4A96D1] text-white shadow-lg hover:shadow-xl p-3.5 rounded-full transform hover:scale-110 transition-all duration-300 group"
          aria-label="Voltar ao topo"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <div className="relative">
            <ArrowUp className="h-5 w-5 text-white group-hover:translate-y-[-2px] transition-transform duration-300" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-white rounded-full flex items-center justify-center">
              <span className="h-2 w-2 bg-[#4A96D1] rounded-full animate-ping absolute"></span>
              <span className="h-2 w-2 bg-[#4A96D1] rounded-full relative"></span>
          </span>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  )
} 