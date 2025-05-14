"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Sparkles,
  WifiOff,
} from "lucide-react"
import { ZoomIn } from "./animations/zoom-in"
import { getFallbackResponse } from "@/lib/fallback-responses"
import FixedChatModal from "./fixed-chat-modal"

type Message = {
  role: "user" | "assistant" | "system"
  content: string
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Olá! Sou o assistente de Fisioterapia Neonatal. Como posso ajudar você hoje?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isOnline, setIsOnline] = useState(true)
  const [errorCount, setErrorCount] = useState(0)
  const [useLocalMode, setUseLocalMode] = useState(false)

  // Verificar conexão com a internet
  useEffect(() => {
    const handleOnlineStatus = () => setIsOnline(true)
    const handleOfflineStatus = () => setIsOnline(false)

    window.addEventListener("online", handleOnlineStatus)
    window.addEventListener("offline", handleOfflineStatus)

    // Definir status inicial
    setIsOnline(navigator.onLine)

    return () => {
      window.removeEventListener("online", handleOnlineStatus)
      window.removeEventListener("offline", handleOfflineStatus)
    }
  }, [])

  // Resetar contador de erros quando o chat é fechado
  useEffect(() => {
    if (!isOpen) {
      setErrorCount(0)
    }
  }, [isOpen])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput("")

    const newUserMessage: Message = { role: "user", content: userMessage }
    setMessages((prev) => [...prev, newUserMessage])
    setIsLoading(true)

    // Verificar se está offline ou em modo local forçado
    if (!isOnline || useLocalMode) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: getFallbackResponse(userMessage),
          },
        ])
        setIsLoading(false)
      }, 1000)
      return
    }

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages.filter((m) => m.role !== "system"), newUserMessage].map(({ role, content }) => ({
            role,
            content,
          })),
        }),
      })

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status}`)
      }

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      setMessages((prev) => [...prev, { role: "assistant", content: data.response.content }])
      setErrorCount(0) // Resetar contador de erros em caso de sucesso
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error)
      setErrorCount((prev) => prev + 1)

      if (errorCount >= 2) {
        // Após 3 erros, mudar para o modo local
        setUseLocalMode(true)
        const fallbackResponse = getFallbackResponse(userMessage)
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: fallbackResponse,
          },
        ])
      } else {
        // Tentar usar resposta local para esta mensagem
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: getFallbackResponse(userMessage),
          },
        ])
      }
    } finally {
      setIsLoading(false)
    }
  }

  const toggleLocalMode = () => {
    setUseLocalMode(!useLocalMode)
    setMessages((prev) => [
      ...prev,
      {
        role: "system",
        content: !useLocalMode
          ? "Modo local ativado. Usando respostas pré-definidas."
          : "Modo online ativado. Conectando à API.",
      },
    ])
  }

  return (
    <>
      {/* Botão flutuante */}
      <ZoomIn className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-[#6EC1E4] to-[#B9A9FF] hover:from-[#5BA8CB] hover:to-[#A090E0] text-white rounded-full p-4 shadow-lg transition-all duration-300 flex items-center gap-2"
          aria-label="Abrir assistente de IA"
        >
          <Sparkles className="h-5 w-5" />
          <span className="font-medium">Assistente IA</span>
          {!isOnline && <WifiOff className="h-4 w-4 ml-1" />}
        </button>
      </ZoomIn>

      {/* Usando o novo componente de chat modal fixo */}
      <FixedChatModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        messages={messages}
        isLoading={isLoading}
        input={input}
        setInput={setInput}
        handleSendMessage={handleSendMessage}
        useLocalMode={useLocalMode}
        toggleLocalMode={toggleLocalMode}
        isOnline={isOnline}
      />
    </>
  )
}
