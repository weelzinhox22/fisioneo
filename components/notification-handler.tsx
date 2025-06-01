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
      console.log("Status atual da permissão:", Notification.permission)
    } else {
      console.log("Notificações não suportadas neste navegador")
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
          console.log("Service Worker pronto:", registration)

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
      } else {
        console.log("Service Worker ou PushManager não suportados neste navegador")
      }
    }

    setupPushNotifications()
  }, [])

  // Função para solicitar permissão de notificação
  const requestNotificationPermission = async () => {
    console.log("Solicitando permissão de notificação...")
    
    if (!("Notification" in window)) {
      console.error("Notificações não suportadas neste navegador")
      toast({
        title: "Notificações não suportadas",
        description: "Seu navegador não suporta notificações push",
        variant: "destructive",
      })
      return false
    }

    try {
      console.log("Estado atual antes de solicitar:", Notification.permission)
      
      // Verifica se as notificações estão bloqueadas
      if (Notification.permission === "denied") {
        console.log("Permissões de notificação bloqueadas pelo navegador")
        showPermissionBlockedInstructions()
        return false
      }
      
      // Verifica se já tem permissão
      if (Notification.permission === "granted") {
        console.log("Permissão já concedida anteriormente")
        setPermission("granted")
        
        // Tentar criar assinatura push se ainda não existir
        if (!subscription) {
          console.log("Criando assinatura push...")
          await subscribeToPushNotifications()
        }
        
        return true
      }
      
      // Solicita permissão
      console.log("Solicitando permissão do usuário...")
      const permission = await Notification.requestPermission()
      console.log("Permissão obtida:", permission)
      
      setPermission(permission)
      
      if (permission === "granted") {
        console.log("Permissão concedida, criando assinatura push...")
        await subscribeToPushNotifications()
        
        // Envia uma notificação de teste para confirmar que está funcionando
        await showTestNotification()
        
        return true
      } else {
        console.log("Permissão negada pelo usuário")
        toast({
          title: "Permissão negada",
          description: "Você precisa permitir notificações para receber lembretes",
          variant: "destructive",
        })
        return false
      }
    } catch (error) {
      console.error("Erro ao solicitar permissão:", error)
      toast({
        title: "Erro ao solicitar permissão",
        description: "Ocorreu um erro ao solicitar permissão para notificações",
        variant: "destructive",
      })
      return false
    }
  }

  // Função para mostrar uma notificação de teste
  const showTestNotification = async () => {
    if (!serviceWorkerRegistration) {
      console.error("Service worker não registrado para teste")
      return
    }
    
    try {
      console.log("Enviando notificação de teste...")
      await serviceWorkerRegistration.showNotification("Notificações ativadas! ✅", {
        body: "Esta é uma notificação de teste para confirmar que as notificações estão funcionando corretamente.",
        icon: "/icons/baby-boy.png"
      })
      console.log("Notificação de teste enviada com sucesso")
    } catch (error) {
      console.error("Erro ao enviar notificação de teste:", error)
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
      
      console.log("Iniciando assinatura push com a chave pública")
      const subscription = await serviceWorkerRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey),
      })
      
      console.log("Assinatura push criada:", subscription)
      setSubscription(subscription)
      
      // Enviar a assinatura para o servidor
      try {
        console.log("Enviando assinatura para o servidor...")
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
      
      // Verificar o tipo específico de erro para fornecer informações mais detalhadas
      if (error instanceof DOMException) {
        console.log("DOMException:", error.name, error.message)
        
        if (error.name === 'NotAllowedError') {
          toast({
            title: "Permissão negada",
            description: "O navegador negou a permissão para notificações push",
            variant: "destructive",
          })
        } else if (error.name === 'AbortError') {
          toast({
            title: "Operação cancelada",
            description: "A operação de assinatura foi cancelada",
            variant: "destructive",
          })
        }
      }
    }
  }

  // Função para enviar uma notificação local (sem servidor)
  const sendLocalNotification = async (title: string, options: NotificationOptions) => {
    console.log("Tentando enviar notificação local:", title, options)
    
    if (permission !== "granted") {
      console.log("Permissão não concedida, solicitando...")
      const permissionGranted = await requestNotificationPermission()
      if (!permissionGranted) {
        console.log("Não foi possível obter permissão")
        return
      }
    }
    
    if (!serviceWorkerRegistration) {
      console.error("Service worker não registrado")
      return
    }
    
    try {
      console.log("Enviando notificação via Service Worker...")
      await serviceWorkerRegistration.showNotification(title, options)
      console.log("Notificação enviada com sucesso")
    } catch (error) {
      console.error("Erro ao enviar notificação:", error)
      
      // Tentar enviar notificação diretamente se o service worker falhar
      try {
        console.log("Tentando enviar notificação diretamente via API Notification...")
        // Remover propriedades não suportadas pela API Notification direta
        const { actions, ...simpleOptions } = options as any
        new Notification(title, simpleOptions)
        console.log("Notificação enviada com sucesso via API direta")
      } catch (directError) {
        console.error("Erro ao enviar notificação diretamente:", directError)
      }
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
      data: {
        url: randomUrl,
        dateOfArrival: Date.now()
      }
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

  // Função para mostrar instruções quando as permissões estão bloqueadas
  const showPermissionBlockedInstructions = () => {
    const isChromeOrEdge = navigator.userAgent.indexOf("Chrome") > -1 || navigator.userAgent.indexOf("Edg") > -1
    const isFirefox = navigator.userAgent.indexOf("Firefox") > -1
    const isSafari = navigator.userAgent.indexOf("Safari") > -1 && navigator.userAgent.indexOf("Chrome") === -1
    
    let instructions = "Para reativar notificações, você precisa alterar as configurações do seu navegador:"
    
    if (isChromeOrEdge) {
      instructions += "\n\n1. Clique no ícone de cadeado na barra de endereço\n2. Encontre 'Notificações' nas configurações do site\n3. Altere de 'Bloquear' para 'Permitir'"
    } else if (isFirefox) {
      instructions += "\n\n1. Clique no ícone de informações na barra de endereço\n2. Vá em 'Permissões'\n3. Encontre 'Enviar Notificações' e altere a configuração"
    } else if (isSafari) {
      instructions += "\n\n1. Acesse Preferências do Safari\n2. Vá para a aba 'Websites'\n3. Selecione 'Notificações' e altere as permissões"
    } else {
      instructions += "\n\nProcure nas configurações do seu navegador por 'Permissões de site' ou 'Notificações'"
    }
    
    toast({
      title: "Notificações bloqueadas",
      description: instructions,
      variant: "destructive",
      duration: 10000, // 10 segundos para dar tempo de ler
    })
  }

  return {
    permission,
    subscription,
    requestPermission: requestNotificationPermission,
    sendStudyReminder,
    simulatePushNotification,
    sendLocalNotification
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