"use client"

import { useEffect, useState } from "react"
import { toast } from "@/hooks/use-toast"

interface SubscriptionDetails {
  endpoint: string
  keys: {
    p256dh: string
    auth: string
  }
}

// Hook para gerenciar notificações
export function useNotifications() {
  const [permission, setPermission] = useState<NotificationPermission | null>(null)
  const [subscription, setSubscription] = useState<PushSubscription | null>(null)
  const [serviceWorkerRegistration, setServiceWorkerRegistration] = useState<ServiceWorkerRegistration | null>(null)

  // Verifica o status da permissão atual
  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      setPermission(Notification.permission)
    }
  }, [])

  // Registra o service worker e configura a assinatura push
  useEffect(() => {
    async function setupPushNotifications() {
      if (
        typeof window !== "undefined" &&
        "serviceWorker" in navigator &&
        "PushManager" in window
      ) {
        try {
          // Obtém o registro do service worker
          const registration = await navigator.serviceWorker.ready
          setServiceWorkerRegistration(registration)

          // Verifica se já existe uma assinatura
          const existingSubscription = await registration.pushManager.getSubscription()
          
          if (existingSubscription) {
            setSubscription(existingSubscription)
            console.log("Assinatura de notificações já existe")
          } else {
            console.log("Assinatura de notificações ainda não configurada")
          }
        } catch (error) {
          console.error("Erro ao configurar notificações push:", error)
        }
      }
    }

    setupPushNotifications()
  }, [])

  // Função para solicitar permissão de notificação
  const requestNotificationPermission = async () => {
    if (!("Notification" in window)) {
      toast({
        title: "Notificações não suportadas",
        description: "Seu navegador não suporta notificações push",
        variant: "destructive",
      })
      return false
    }

    try {
      const permission = await Notification.requestPermission()
      setPermission(permission)
      
      if (permission === "granted") {
        await subscribeToPushNotifications()
        return true
      } else {
        toast({
          title: "Permissão negada",
          description: "Você precisa permitir notificações para receber lembretes",
          variant: "destructive",
        })
        return false
      }
    } catch (error) {
      console.error("Erro ao solicitar permissão:", error)
      return false
    }
  }

  // Função para assinar notificações push
  const subscribeToPushNotifications = async () => {
    if (!serviceWorkerRegistration) {
      console.error("Service worker não registrado")
      return
    }

    try {
      // Esta chave pública deve corresponder à chave usada no servidor
      const publicKey = "BLBx-hf2WrQ3CWn-wd5iB7tp1LS6UxL3xR3p_ZJM0buNPRdCQ7Yp0cCSnSB4slS7aFfLotGY7rdP6ClXTe1Gvgk"
      
      const subscription = await serviceWorkerRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey),
      })
      
      setSubscription(subscription)
      
      // Enviar a assinatura para o servidor
      try {
        const response = await fetch('/api/notifications/subscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            subscription,
            tags: ['prova', 'fisioterapia-neonatal'] // Tags para segmentação
          }),
        })
        
        const data = await response.json()
        
        if (!data.success) {
          console.error('Erro ao salvar assinatura no servidor:', data.error)
        } else {
          console.log('Assinatura salva com sucesso no servidor')
        }
      } catch (error) {
        console.error('Erro ao enviar assinatura para o servidor:', error)
      }
      
      return subscription
    } catch (error) {
      console.error("Erro ao assinar notificações push:", error)
    }
  }

  // Função para enviar uma notificação local (sem servidor)
  const sendLocalNotification = async (title: string, options: NotificationOptions) => {
    if (permission !== "granted") {
      const permissionGranted = await requestNotificationPermission()
      if (!permissionGranted) return
    }
    
    if (!serviceWorkerRegistration) {
      console.error("Service worker não registrado")
      return
    }
    
    try {
      await serviceWorkerRegistration.showNotification(title, options)
    } catch (error) {
      console.error("Erro ao enviar notificação:", error)
    }
  }

  // Função para enviar notificação de lembrete de estudo
  const sendStudyReminder = async () => {
    // Gerar um texto aleatório para a notificação
    const titleOptions = [
      "Novo conteúdo disponível!",
      "Lembrete de Estudo - FisioNeo",
      "Dica do dia!",
      "Aprenda algo novo hoje!",
      "Notificação Aleatória!"
    ];
    
    const bodyOptions = [
      "Experimente a nova seção de reflexos 0-6 meses com exemplos em vídeo e exercícios práticos.",
      "Não se esqueça de estudar para a prova de Fisioterapia Neonatal! Revise o conteúdo no FisioNeo.",
      "Sabia que os reflexos primitivos são essenciais para o desenvolvimento motor? Estude mais sobre isso na seção de reflexos.",
      "Uma nova prova sobre Método Canguru acaba de ser adicionada. Faça o teste para avaliar seu conhecimento!",
      "Conheça nossa nova interface para estudo de reações posturais em bebês de 0 a 15 meses."
    ];
    
    // Selecionar aleatoriamente um título e um corpo
    const randomTitle = titleOptions[Math.floor(Math.random() * titleOptions.length)];
    const randomBody = bodyOptions[Math.floor(Math.random() * bodyOptions.length)];
    
    // Gerar URLs aleatórias relacionadas ao conteúdo
    const urlOptions = [
      "/temas/reflexos-0-6",
      "/prova-geral",
      "/temas/metodo-canguru",
      "/provas/reacoes-0-15",
      "/temas/dor-neonatal"
    ];
    
    const randomUrl = urlOptions[Math.floor(Math.random() * urlOptions.length)];
    
    // Enviar a notificação local diretamente
    await sendLocalNotification(randomTitle, {
      body: randomBody,
      icon: "/icons/baby-boy.png",
      badge: "/icons/baby-icon-192.png",
      vibrate: [100, 50, 100],
      data: {
        url: randomUrl,
        dateOfArrival: Date.now()
      },
      actions: [
        {
          action: "explore",
          title: "Ver agora",
          icon: "/icons/baby-icon-192.png"
        },
        {
          action: "close",
          title: "Depois",
          icon: "/icons/baby-icon-192.png"
        }
      ]
    });
    
    toast({
      title: "Notificação enviada!",
      description: "Uma notificação aleatória foi enviada com sucesso",
      variant: "default",
    });
  };

  // Função para simular o envio de uma notificação push
  const simulatePushNotification = async () => {
    if (!serviceWorkerRegistration) {
      console.error("Service worker não registrado")
      return
    }

    // Em uma implementação real, esta mensagem viria do servidor
    const data = {
      title: "Lembrete de Estudo",
      body: "Não se esqueça de estudar para a prova de Fisioterapia Neonatal! Revise o conteúdo no FisioNeo.",
      url: "/prova-geral"
    }

    // Simula o evento push
    const channel = new MessageChannel()
    serviceWorkerRegistration.active?.postMessage({
      type: "PUSH_SIMULATION",
      data: data
    }, [channel.port2])

    toast({
      title: "Notificação enviada",
      description: "Lembrete para estudar enviado com sucesso",
      variant: "default",
    })
  }

  // Função auxiliar para converter a chave pública para o formato correto
  function urlBase64ToUint8Array(base64String: string) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4)
    const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/")
    
    const rawData = window.atob(base64)
    const outputArray = new Uint8Array(rawData.length)
    
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i)
    }
    
    return outputArray
  }

  return {
    permission,
    subscription,
    requestPermission: requestNotificationPermission,
    sendStudyReminder,
    simulatePushNotification
  }
}

// Componente de notificação para uso em páginas
export default function NotificationHandler() {
  const { permission, requestPermission, sendStudyReminder } = useNotifications()
  const [loading, setLoading] = useState(false)

  const handleSendNotification = async () => {
    setLoading(true)
    try {
      await sendStudyReminder()
    } catch (error) {
      console.error("Erro ao enviar notificação:", error)
      toast({
        title: "Erro",
        description: "Não foi possível enviar o lembrete. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return null
} 