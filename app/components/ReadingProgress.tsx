"use client"

import { useEffect, useState } from "react"
import { BookOpen } from "lucide-react"

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
    <div className="fixed bottom-4 right-4 z-50">
      <div className="relative">
        <button 
          onClick={() => setShowDetails(!showDetails)}
          className="flex items-center justify-center bg-white shadow-lg rounded-full h-12 w-12 hover:bg-[#F0F9FF] transition-colors"
        >
          <div className="relative h-8 w-8">
            <svg className="transform -rotate-90 h-8 w-8">
              <circle
                cx="16"
                cy="16"
                r="14"
                stroke="#E0E0E0"
                strokeWidth="3"
                fill="transparent"
              />
              <circle
                cx="16"
                cy="16"
                r="14"
                stroke="#6EC1E4"
                strokeWidth="3"
                strokeDasharray={88}
                strokeDashoffset={88 - (88 * progress) / 100}
                fill="transparent"
              />
            </svg>
            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-medium text-[#333333]">
              {progress}%
            </span>
          </div>
        </button>
        
        {showDetails && (
          <div className="absolute bottom-14 right-0 bg-white rounded-lg shadow-lg p-4 w-56">
            <div className="flex items-center mb-3">
              <BookOpen className="h-4 w-4 text-[#6EC1E4] mr-2" />
              <h3 className="text-sm font-medium text-[#333333]">Progresso de leitura</h3>
            </div>
            <div className="space-y-2">
              <div>
                <p className="text-xs text-gray-500">Progresso</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div 
                    className="bg-gradient-to-r from-[#6EC1E4] to-[#4A96D1] h-2 rounded-full" 
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-600">
                <span>Lido: {progress}%</span>
                <span>Faltam: {remainingTime} min</span>
              </div>
              <div className="text-xs text-center mt-2 text-gray-500">
                Clique em qualquer lugar para fechar
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 