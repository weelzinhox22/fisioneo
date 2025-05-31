"use client"

import { useEffect } from "react"
import { useNotifications } from "./notification-handler"

export default function Notification() {
  const { permission, requestPermission, sendStudyReminder } = useNotifications()

  useEffect(() => {
    // Verifica se é a primeira visita
    const hasVisited = localStorage.getItem("hasVisitedFisioneo")
    
    const sendNotification = async () => {
      // Se for a primeira visita e as notificações estiverem permitidas, envie um lembrete
      if (!hasVisited && permission === "granted") {
        await sendStudyReminder()
        localStorage.setItem("hasVisitedFisioneo", "true")
      }
    }
    
    // Se já tiver visitado, marque como visitado
    if (!hasVisited) {
      localStorage.setItem("hasVisitedFisioneo", "true")
    }
    
    sendNotification()
  }, [permission, sendStudyReminder])

  return null
} 