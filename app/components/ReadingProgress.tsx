"use client"

import { useEffect, useState } from "react"
import { BookOpen, Clock, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0)
  const [remainingTime, setRemainingTime] = useState(0)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    const calculateProgress = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight - windowHeight
      const scrollTop = window.scrollY
      const currentProgress = Math.round((scrollTop / documentHeight) * 100)
      
      setProgress(currentProgress)
      
      // Estimar tempo restante de leitura (200 palavras por minuto é uma média de velocidade de leitura)
      const averageReadingSpeed = 200 // palavras por minuto
      const wordsPerPage = 500 // estimativa grosseira de palavras por tela
      const totalScreens = documentHeight / windowHeight
      const screensRemaining = totalScreens - (scrollTop / windowHeight)
      const wordsRemaining = screensRemaining * wordsPerPage
      const minutesRemaining = Math.round(wordsRemaining / averageReadingSpeed)
      
      setRemainingTime(minutesRemaining > 0 ? minutesRemaining : 1)
    }

    calculateProgress()
    window.addEventListener("scroll", calculateProgress)
    window.addEventListener("resize", calculateProgress)

    return () => {
      window.removeEventListener("scroll", calculateProgress)
      window.removeEventListener("resize", calculateProgress)
    }
  }, [])

  return (
    <div className="fixed bottom-24 left-6 z-50">
      <div className="relative">
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowDetails(!showDetails)}
          className="flex items-center justify-center bg-gradient-to-r from-[#6EC1E4] to-[#4A96D1] text-white shadow-lg rounded-full h-12 w-12 hover:shadow-xl transition-all duration-300"
        >
          <div className="relative h-8 w-8">
            <svg className="transform -rotate-90 h-8 w-8">
              <circle
                cx="16"
                cy="16"
                r="14"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="3"
                fill="transparent"
              />
              <circle
                cx="16"
                cy="16"
                r="14"
                stroke="#ffffff"
                strokeWidth="3"
                strokeDasharray={88}
                strokeDashoffset={88 - (88 * progress) / 100}
                fill="transparent"
              />
            </svg>
            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-medium text-white">
              {progress}%
            </span>
          </div>
        </motion.button>
        
        <AnimatePresence>
        {showDetails && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="absolute bottom-14 left-0 bg-white rounded-xl shadow-lg p-5 w-64 border border-[#E0E0E0]/50"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <div className="p-1.5 bg-[#F0F9FF] rounded-lg mr-2.5">
                    <BookOpen className="h-4 w-4 text-[#6EC1E4]" />
                  </div>
              <h3 className="text-sm font-medium text-[#333333]">Progresso de leitura</h3>
            </div>
                
                <button 
                  onClick={() => setShowDetails(false)}
                  className="p-1 hover:bg-[#F0F9FF] rounded-full transition-colors"
                >
                  <X className="h-4 w-4 text-gray-400" />
                </button>
              </div>
              
              <div className="space-y-4">
              <div>
                  <div className="flex justify-between items-center mb-1.5">
                <p className="text-xs text-gray-500">Progresso</p>
                    <span className="text-xs font-medium text-[#4A96D1]">{progress}%</span>
                  </div>
                  <div className="w-full bg-[#F0F9FF] rounded-full h-2.5">
                  <div 
                      className="bg-gradient-to-r from-[#6EC1E4] to-[#4A96D1] h-2.5 rounded-full relative overflow-hidden"
                    style={{ width: `${progress}%` }}
                    >
                      <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-xs text-gray-600 bg-[#F8FBFF] p-3 rounded-lg">
                  <div className="flex items-center">
                    <Clock className="h-3.5 w-3.5 text-[#6EC1E4] mr-1.5" />
                    <span>Tempo restante</span>
              </div>
                  <span className="font-medium text-[#4A96D1]">{remainingTime} min</span>
              </div>
              </div>
            </motion.div>
        )}
        </AnimatePresence>
      </div>
    </div>
  )
} 