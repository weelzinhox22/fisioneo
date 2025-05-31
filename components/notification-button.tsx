"use client"

import { useState } from "react"
import { Bell } from "lucide-react"
import { useNotifications } from "./notification-handler"
import { toast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

interface NotificationButtonProps {
  className?: string
}

export default function NotificationButton({ className }: NotificationButtonProps) {
  const { permission, requestPermission, sendStudyReminder } = useNotifications()
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    setLoading(true)

    try {
      if (permission !== "granted") {
        const granted = await requestPermission()
        if (!granted) {
          toast({
            title: "Permissão necessária",
            description: "Para receber lembretes de estudo, você precisa permitir notificações.",
            variant: "default",
          })
          setLoading(false)
          return
        }
      }

      await sendStudyReminder()

      toast({
        title: "Lembrete enviado!",
        description: "Você receberá notificações para estudar para a prova.",
        variant: "default",
      })
    } catch (error) {
      console.error("Erro ao configurar notificação:", error)
      toast({
        title: "Erro",
        description: "Não foi possível configurar o lembrete. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={cn(
        "inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors",
        "bg-gradient-to-r from-[#6EC1E4] to-[#B9A9FF] text-white hover:shadow-md",
        loading && "opacity-70 cursor-not-allowed",
        className
      )}
    >
      <Bell className="h-4 w-4" />
      <span>{loading ? "Enviando..." : "Receber lembrete para estudar"}</span>
    </button>
  )
} 