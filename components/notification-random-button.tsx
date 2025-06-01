"use client"

import { useNotifications } from "@/components/notification-handler"
import { useState } from "react"
import { Bell } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function NotificationRandomButton() {
  const [loading, setLoading] = useState(false)
  const { sendLocalNotification, permission, requestPermission } = useNotifications()

  // Função para enviar uma notificação aleatória
  const sendRandomNotification = async () => {
    setLoading(true)
    
    try {
      // Primeiro, verificar a permissão
      if (permission !== "granted") {
        console.log("Permissão não concedida, solicitando...")
        toast({
          title: "Solicitando permissão",
          description: "Por favor, permita as notificações na janela que vai aparecer",
          variant: "default",
        })
        
        // Solicitar permissão primeiro
        const granted = await requestPermission()
        if (!granted) {
          toast({
            title: "Permissão negada",
            description: "Você precisa permitir notificações para receber alertas",
            variant: "destructive",
          })
          setLoading(false)
          return
        }
      }
      
      // Gerar um texto aleatório para a notificação
      const titleOptions = [
        "Novo conteúdo disponível!",
        "Lembrete de Estudo - FisioNeo",
        "Dica do dia!",
        "Aprenda algo novo hoje!",
        "Notificação Aleatória!"
      ]
      
      const bodyOptions = [
        "Experimente a nova seção de reflexos 0-6 meses com exemplos em vídeo e exercícios práticos.",
        "Não se esqueça de estudar para a prova de Fisioterapia Neonatal! Revise o conteúdo no FisioNeo.",
        "Sabia que os reflexos primitivos são essenciais para o desenvolvimento motor? Estude mais sobre isso na seção de reflexos.",
        "Uma nova prova sobre Método Canguru acaba de ser adicionada. Faça o teste para avaliar seu conhecimento!",
        "Conheça nossa nova interface para estudo de reações posturais em bebês de 0 a 15 meses."
      ]
      
      // Selecionar aleatoriamente um título e um corpo
      const randomTitle = titleOptions[Math.floor(Math.random() * titleOptions.length)]
      const randomBody = bodyOptions[Math.floor(Math.random() * bodyOptions.length)]
      
      // Gerar URLs aleatórias relacionadas ao conteúdo
      const urlOptions = [
        "/temas/reflexos-0-6",
        "/prova-geral",
        "/temas/metodo-canguru",
        "/provas/reacoes-0-15",
        "/temas/dor-neonatal"
      ]
      
      const randomUrl = urlOptions[Math.floor(Math.random() * urlOptions.length)]
      
      console.log("Enviando notificação aleatória:", randomTitle)
      
      // Enviar a notificação local, removendo as propriedades que causam erro no linter
      await sendLocalNotification(randomTitle, {
        body: randomBody,
        icon: "/icons/baby-boy.png",
        badge: "/icons/baby-icon-192.png",
        data: {
          url: randomUrl,
          dateOfArrival: Date.now()
        }
      })
      
      toast({
        title: "Notificação enviada!",
        description: "Uma notificação aleatória foi enviada com sucesso",
        variant: "default",
      })
      
    } catch (error) {
      console.error("Erro ao enviar notificação:", error)
      toast({
        title: "Erro",
        description: "Não foi possível enviar a notificação. Verifique as permissões do navegador.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={sendRandomNotification}
      disabled={loading}
      className="flex items-center justify-center w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
      title="Enviar notificação aleatória"
      aria-label="Enviar notificação aleatória"
    >
      {loading ? (
        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        <Bell className="h-5 w-5" />
      )}
    </button>
  )
} 