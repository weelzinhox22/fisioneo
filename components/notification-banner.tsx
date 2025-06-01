"use client"

import { useState, useEffect } from "react"
import { Bell, X, AlertTriangle } from "lucide-react"
import { useNotifications } from "./notification-handler"
import { toast } from "@/hooks/use-toast"

export default function NotificationBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const { permission, requestPermission } = useNotifications()

  // Verificar se o banner já foi mostrado/fechado antes
  useEffect(() => {
    // Não mostrar o banner se as notificações já estão permitidas
    if (permission === "granted") return
    
    // Verificar se o usuário já fechou o banner anteriormente
    const hasClosedBanner = localStorage.getItem("fisioneo_notification_banner_closed")
    
    // Mostrar o banner apenas se não foi fechado antes e a permissão não está garantida
    if (!hasClosedBanner && permission === "default") {
      // Mostrar o banner após um pequeno delay para não bombardear o usuário imediatamente
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 2000)
      
      return () => clearTimeout(timer)
    }
  }, [permission])

  // Função para solicitar permissão
  const handleRequestPermission = async () => {
    const granted = await requestPermission()
    
    if (granted) {
      toast({
        title: "Notificações ativadas!",
        description: "Você receberá atualizações sobre novos conteúdos do FisioNeo.",
        variant: "default",
      })
      setIsVisible(false)
    }
  }

  // Função para fechar o banner
  const handleClose = () => {
    setIsVisible(false)
    // Armazenar que o usuário fechou o banner para não mostrar novamente
    localStorage.setItem("fisioneo_notification_banner_closed", "true")
  }

  // Se as notificações estão bloqueadas, mostrar um banner diferente
  if (permission === "denied") {
    return (
      <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 w-full max-w-md z-50 px-4">
        <div className="bg-white rounded-lg shadow-lg border border-red-200 p-4 animate-in slide-in-from-bottom duration-500">
          <div className="flex items-start">
            <div className="flex-shrink-0 bg-red-100 rounded-full p-2 mr-3">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Notificações bloqueadas</h3>
              <p className="mt-1 text-sm text-gray-500">
                Você bloqueou as notificações para este site. Para receber atualizações, você precisa alterar as configurações do seu navegador.
              </p>
              <div className="mt-3">
                <button
                  onClick={() => {
                    const instructions = "Para permitir notificações:\n1. Clique no ícone de cadeado na barra de endereço\n2. Encontre 'Notificações' nas configurações do site\n3. Altere de 'Bloquear' para 'Permitir'\n4. Recarregue a página"
                    toast({
                      title: "Como reativar notificações",
                      description: instructions,
                      variant: "default",
                      duration: 10000,
                    })
                  }}
                  className="inline-flex items-center px-3 py-1.5 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <Bell className="h-4 w-4 mr-1.5" />
                  Ver instruções
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 w-full max-w-md z-50 px-4">
      <div className="bg-white rounded-lg shadow-lg border border-blue-100 p-4 animate-in slide-in-from-bottom duration-500">
        <button 
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          aria-label="Fechar"
        >
          <X className="h-5 w-5" />
        </button>
        
        <div className="flex items-start">
          <div className="flex-shrink-0 bg-blue-100 rounded-full p-2 mr-3">
            <Bell className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Receba atualizações do FisioNeo</h3>
            <p className="mt-1 text-sm text-gray-500">
              O site foi atualizado com novos conteúdos! Ative as notificações para receber novidades sobre atualizações, novos materiais e dicas de estudo.
            </p>
            <div className="mt-3">
              <button
                onClick={handleRequestPermission}
                className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Bell className="h-4 w-4 mr-1.5" />
                Permitir notificações
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 