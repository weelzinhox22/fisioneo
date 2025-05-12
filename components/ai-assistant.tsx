"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Bot,
  Send,
  X,
  Loader2,
  Sparkles,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  AlertTriangle,
  WifiOff,
} from "lucide-react"
import { ZoomIn } from "./animations/zoom-in"
import { getFallbackResponse } from "@/lib/fallback-responses"

type Message = {
  role: "user" | "assistant" | "system"
  content: string
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
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
  const messagesEndRef = useRef<HTMLDivElement>(null)

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

  // Scroll para o final das mensagens quando novas mensagens são adicionadas
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

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

  const toggleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsMinimized(!isMinimized)
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

      {/* Modal do assistente */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 md:p-6"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-xl shadow-xl w-full max-w-md flex flex-col overflow-hidden"
              style={{ height: isMinimized ? "auto" : "600px" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Cabeçalho */}
              <div className="bg-gradient-to-r from-[#6EC1E4] to-[#B9A9FF] text-white p-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Bot className="h-5 w-5" />
                  <h3 className="font-medium">Assistente de Fisioterapia Neonatal</h3>
                  {!isOnline && <WifiOff className="h-4 w-4 ml-1" />}
                  {useLocalMode && <AlertTriangle className="h-4 w-4 ml-1 text-yellow-300" />}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleLocalMode}
                    aria-label="Alternar modo local"
                    className="text-xs px-2 py-1 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                  >
                    {useLocalMode ? "Modo Local" : "Modo Online"}
                  </button>
                  <button onClick={toggleMinimize} aria-label={isMinimized ? "Expandir" : "Minimizar"}>
                    {isMinimized ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </button>
                  <button onClick={() => setIsOpen(false)} aria-label="Fechar assistente">
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Status de conexão */}
              {!isOnline && (
                <div className="bg-yellow-50 border-b border-yellow-100 px-4 py-2 flex items-center gap-2">
                  <WifiOff className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm text-yellow-700">Modo offline - Usando respostas pré-definidas</span>
                </div>
              )}

              {isOnline && useLocalMode && (
                <div className="bg-yellow-50 border-b border-yellow-100 px-4 py-2 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm text-yellow-700">Usando respostas locais (modo forçado)</span>
                </div>
              )}

              {/* Conteúdo (oculto quando minimizado) */}
              {!isMinimized && (
                <>
                  {/* Mensagens */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                    {messages.map(
                      (message, index) =>
                        message.role !== "system" && (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                          >
                            {message.role === "assistant" && (
                              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#6EC1E4] to-[#B9A9FF] flex items-center justify-center mr-2 flex-shrink-0">
                                <Bot className="h-4 w-4 text-white" />
                              </div>
                            )}
                            <div
                              className={`max-w-[80%] rounded-lg p-3 ${
                                message.role === "user"
                                  ? "bg-gradient-to-r from-[#6EC1E4] to-[#B9A9FF] text-white"
                                  : "bg-white text-[#333333] border border-[#E0E0E0] shadow-sm"
                              }`}
                            >
                              {message.content}
                            </div>
                            {message.role === "user" && (
                              <div className="w-8 h-8 rounded-full bg-[#6EC1E4] flex items-center justify-center ml-2 flex-shrink-0">
                                <MessageSquare className="h-4 w-4 text-white" />
                              </div>
                            )}
                          </motion.div>
                        ),
                    )}
                    {isLoading && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-start"
                      >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#6EC1E4] to-[#B9A9FF] flex items-center justify-center mr-2 flex-shrink-0">
                          <Bot className="h-4 w-4 text-white" />
                        </div>
                        <div className="max-w-[80%] rounded-lg p-3 bg-white text-[#333333] border border-[#E0E0E0] shadow-sm flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin text-[#6EC1E4]" />
                          <span>Pensando...</span>
                        </div>
                      </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Formulário de entrada */}
                  <form onSubmit={handleSendMessage} className="border-t border-[#E0E0E0] p-4 flex gap-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Digite sua pergunta sobre fisioterapia neonatal..."
                      className="flex-1 border border-[#E0E0E0] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6EC1E4]"
                      disabled={isLoading}
                    />
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-[#6EC1E4] to-[#B9A9FF] hover:from-[#5BA8CB] hover:to-[#A090E0] text-white rounded-lg px-4 py-2 transition-colors disabled:opacity-50 flex items-center gap-2"
                      disabled={!input.trim() || isLoading}
                    >
                      <Send className="h-4 w-4" />
                      <span className="sr-only">Enviar</span>
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
