"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Cookie, X } from "lucide-react"

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false)

  useEffect(() => {
    // Verificar se o usuário já aceitou os cookies
    const hasAccepted = localStorage.getItem("cookieConsent")
    if (!hasAccepted) {
      setShowConsent(true)
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
          className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-r from-gray-900 to-gray-800 border-t border-gray-700"
        >
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <Cookie className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">Nós usamos cookies! 🍪</h3>
                  <p className="text-gray-300 text-sm">
                    Utilizamos cookies para melhorar sua experiência. Eles são necessários para:
                  </p>
                  <ul className="text-gray-400 text-sm mt-2 list-disc list-inside">
                    <li>Manter você conectado de forma segura</li>
                    <li>Lembrar suas preferências</li>
                    <li>Melhorar o desempenho do site</li>
                    <li>Análise de uso para melhorias</li>
                  </ul>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={declineCookies}
                  className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors"
                >
                  Recusar
                </button>
                <button
                  onClick={acceptCookies}
                  className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Aceitar Cookies
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 