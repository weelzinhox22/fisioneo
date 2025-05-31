"use client"

import { useState } from "react"
import { useNotifications } from "./notification-handler"
import { Bell } from "lucide-react"
import { cn } from "@/lib/utils"

interface RandomNotificationButtonProps {
  className?: string
}

export default function RandomNotificationButton({ className }: RandomNotificationButtonProps) {
  const { permission, requestPermission, sendStudyReminder } = useNotifications()
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    setLoading(true)
    
    try {
      // Se ainda não tiver permissão, solicitar
      if (permission !== "granted") {
        await requestPermission()
      }
      
      // Enviar notificação aleatória
      await sendStudyReminder()
    } catch (error) {
      console.error("Erro ao enviar notificação:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={cn(
        "flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors",
        "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600",
        "disabled:opacity-70 disabled:cursor-not-allowed",
        className
      )}
    >
      {loading ? (
        <>
          <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Enviando...</span>
        </>
      ) : (
        <>
          <Bell className="h-4 w-4" />
          <span>Enviar notificação aleatória</span>
        </>
      )}
    </button>
  )
} 