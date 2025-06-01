"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bell, X, Check, Info, AlertTriangle } from "lucide-react"
import { useNotifications } from "./notification-handler"

export default function NotificationModal() {
  const [isOpen, setIsOpen] = useState(false)
  const { permission, requestPermission } = useNotifications()

  useEffect(() => {
    // Não mostrar o modal se as notificações já estão permitidas
    if (permission === "granted") return
    
    // Verificar se o modal já foi mostrado/fechado antes
    const hasClosedModal = localStorage.getItem("fisioneo_notification_modal_closed")
    
    // Mostrar o modal apenas se não foi fechado antes e a permissão está no estado padrão (não decidida)
    if (!hasClosedModal && permission === "default") {
      // Mostrar o modal após um delay para dar tempo do usuário interagir com o site primeiro
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, 10000) // 10 segundos
      
      return () => clearTimeout(timer)
    }
  }, [permission])

  const handleRequestPermission = async () => {
    const granted = await requestPermission()
    
    if (granted) {
      setIsOpen(false)
    }
  }

  const handleClose = () => {
    setIsOpen(false)
    // Armazenar que o usuário fechou o modal para não mostrar novamente
    localStorage.setItem("fisioneo_notification_modal_closed", "true")
  }

  // Modal para notificações bloqueadas
  const renderBlockedModal = () => {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm"
          onClick={handleClose}
        />
        
        <motion.div 
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="relative bg-white rounded-xl shadow-xl max-w-md w-full p-6 md:p-8 z-50"
        >
          <button 
            onClick={handleClose}
            className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
          
          <div className="text-center mb-6">
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Notificações Bloqueadas</h2>
            <p className="text-sm text-gray-600 mt-2">
              Você bloqueou as notificações do FisioNeo no seu navegador. Para reativar, siga estas instruções:
            </p>
          </div>
          
          <div className="space-y-4 mb-6 bg-gray-50 p-4 rounded-lg">
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-0.5 text-blue-500 font-bold">
                1.
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-700">Clique no ícone de cadeado na barra de endereço do navegador</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-0.5 text-blue-500 font-bold">
                2.
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-700">Procure por "Notificações" nas configurações do site</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-0.5 text-blue-500 font-bold">
                3.
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-700">Altere a configuração de "Bloqueado" para "Permitir"</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-0.5 text-blue-500 font-bold">
                4.
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-700">Recarregue a página para aplicar as mudanças</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-3">
            <button
              onClick={handleClose}
              className="w-full py-2.5 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              Entendi
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  // Modal para solicitar permissão pela primeira vez
  const renderRequestModal = () => {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm"
          onClick={handleClose}
        />
        
        <motion.div 
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="relative bg-white rounded-xl shadow-xl max-w-md w-full p-6 md:p-8 z-50"
        >
          <button 
            onClick={handleClose}
            className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
          
          <div className="text-center mb-6">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Bell className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Site Atualizado!</h2>
            <p className="text-sm text-gray-600 mt-2">
              O FisioNeo foi atualizado com novos conteúdos e melhorias. Ative as notificações para ser informado sobre:
            </p>
          </div>
          
          <div className="space-y-3 mb-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <Check className="h-5 w-5 text-green-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-700">Novas provas e simulados</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <Check className="h-5 w-5 text-green-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-700">Dicas de estudo e materiais</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <Check className="h-5 w-5 text-green-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-700">Atualizações importantes do site</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-3">
            <button
              onClick={handleRequestPermission}
              className="w-full py-2.5 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              Ativar notificações
            </button>
            
            <button
              onClick={handleClose}
              className="w-full py-2.5 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors"
            >
              Agora não
            </button>
          </div>
          
          <div className="mt-4 flex items-start">
            <div className="flex-shrink-0">
              <Info className="h-4 w-4 text-gray-400" />
            </div>
            <p className="ml-2 text-xs text-gray-500">
              Você pode ativar ou desativar as notificações a qualquer momento nas configurações do seu navegador.
            </p>
          </div>
        </motion.div>
      </div>
    )
  }

  // Se o modal não deve ser mostrado, não renderiza nada
  if (!isOpen && permission !== "denied") return null;

  return (
    <AnimatePresence>
      {permission === "denied" ? renderBlockedModal() : isOpen && renderRequestModal()}
    </AnimatePresence>
  )
} 