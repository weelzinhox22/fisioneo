"use client"

import { useEffect } from "react"
import { useNotifications } from "./notification-handler"

export default function WelcomeNotification() {
  const { permission, sendLocalNotification } = useNotifications()

  useEffect(() => {
    // Verificar se é a primeira vez que o usuário concedeu permissão
    const hasWelcomeNotification = localStorage.getItem("fisioneo_welcome_notification_sent")
    
    const sendWelcome = async () => {
      if (permission === "granted" && !hasWelcomeNotification) {
        // Enviar notificação de boas-vindas
        await sendLocalNotification(
          "Bem-vindo ao FisioNeo! 🎉",
          {
            body: "Obrigado por ativar as notificações! Agora você receberá atualizações sobre novos conteúdos, dicas de estudo e materiais.",
            icon: "/icons/baby-boy.png",
            badge: "/icons/baby-icon-192.png",
            data: {
              url: "/",
              dateOfArrival: Date.now()
            }
          }
        )
        
        // Registrar que a notificação de boas-vindas foi enviada
        localStorage.setItem("fisioneo_welcome_notification_sent", "true")
      }
    }
    
    // Pequeno delay para não enviar imediatamente após a permissão
    const timer = setTimeout(() => {
      sendWelcome()
    }, 2000)
    
    return () => clearTimeout(timer)
  }, [permission, sendLocalNotification])

  // Componente não renderiza nada visível
  return null
} 