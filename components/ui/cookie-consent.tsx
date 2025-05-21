"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Cookie, X, Check } from "lucide-react"

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    // Verificar se o usuário já aceitou os cookies
    const hasAccepted = localStorage.getItem("cookieConsent")
    if (!hasAccepted) {
      // Pequeno atraso para não mostrar imediatamente ao carregar a página
      const timer = setTimeout(() => {
        setShowConsent(true)
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [])

  const acceptCookies = () => {
    // Salvar a preferência do usuário
    localStorage.setItem("cookieConsent", "true")
    // Configurar cookies essenciais
    document.cookie = "essential=true; path=/; max-age=31536000; secure; samesite=lax" // 1 ano
    setShowConsent(false)
  }

  const declineCookies = () => {
    // Salvar a preferência do usuário
    localStorage.setItem("cookieConsent", "false")
    setShowConsent(false)
  }

  return (
    <AnimatePresence>
      {showConsent && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 backdrop-blur-md bg-gradient-to-b from-gray-900/95 to-gray-800/95 border-t border-gray-700 shadow-[0_-4px_20px_rgba(0,0,0,0.2)]"
        >
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col md:flex-row items-start gap-4">
                <div className="flex w-full md:w-auto items-center justify-between md:justify-start gap-3 md:gap-4">
                  <div className="flex items-center gap-2">
                    <Cookie className="w-5 h-5 md:w-6 md:h-6 text-blue-400 flex-shrink-0" />
                    <h3 className="text-base md:text-lg font-semibold text-white">Nós usamos cookies</h3>
                  </div>
                  <button 
                    onClick={() => setShowDetails(!showDetails)} 
                    className="text-xs text-blue-400 hover:text-blue-300 md:hidden underline"
                  >
                    {showDetails ? "Ocultar detalhes" : "Ver detalhes"}
                  </button>
                </div>
                
                <div className={`flex-1 ${showDetails ? 'block' : 'hidden'} md:block`}>
                  <p className="text-gray-300 text-xs md:text-sm">
                    Utilizamos cookies para melhorar sua experiência. Eles são necessários para:
                  </p>
                  <ul className="text-gray-400 text-xs md:text-sm mt-2 grid grid-cols-2 gap-x-2 gap-y-1">
                    <li className="flex items-center gap-1">
                      <Check className="w-3 h-3 text-blue-400" />
                      <span>Manter você conectado</span>
                    </li>
                    <li className="flex items-center gap-1">
                      <Check className="w-3 h-3 text-blue-400" />
                      <span>Lembrar preferências</span>
                    </li>
                    <li className="flex items-center gap-1">
                      <Check className="w-3 h-3 text-blue-400" />
                      <span>Melhorar desempenho</span>
                    </li>
                    <li className="flex items-center gap-1">
                      <Check className="w-3 h-3 text-blue-400" />
                      <span>Análise de uso</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="flex items-center justify-between md:justify-end gap-3 mt-2 pt-3 border-t border-gray-700/50">
                <div className="flex-1 md:flex-none">
                  <button
                    onClick={declineCookies}
                    className="w-full md:w-auto px-4 py-2.5 text-xs md:text-sm border border-gray-600 hover:border-gray-500 rounded-lg text-gray-300 hover:text-white transition-colors"
                  >
                    Recusar
                  </button>
                </div>
                <div className="flex-1 md:flex-none">
                  <button
                    onClick={acceptCookies}
                    className="w-full md:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs md:text-sm font-medium transition-colors"
                  >
                    Aceitar Cookies
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 