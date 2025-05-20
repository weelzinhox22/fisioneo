"use client"

import React, { useState, useRef, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  Bot,
  Send,
  X,
  Loader2,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  AlertTriangle,
  WifiOff,
} from "lucide-react"

type Message = {
  role: "user" | "assistant" | "system"
  content: string
}

interface FixedChatModalProps {
  isOpen: boolean
  onClose: () => void
  messages: Message[]
  isLoading: boolean
  input: string
  setInput: (input: string) => void
  handleSendMessage: (e: React.FormEvent) => void
  useLocalMode: boolean
  toggleLocalMode: () => void
  isOnline: boolean
}

export default function FixedChatModal({
  isOpen,
  onClose,
  messages,
  isLoading,
  input,
  setInput,
  handleSendMessage,
  useLocalMode,
  toggleLocalMode,
  isOnline,
}: FixedChatModalProps) {
  const [isMinimized, setIsMinimized] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  // Scroll to the end when new messages are added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  // Handle clicks within the modal without closing it
  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  // Prevent wheel events from propagating to the background
  const handleWheel = (e: React.WheelEvent) => {
    e.stopPropagation()
  }

  const toggleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsMinimized(!isMinimized)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 md:p-6"
          onClick={onClose}
          onWheel={handleWheel}
        >
          <motion.div
            className="bg-white rounded-xl shadow-xl w-full max-w-md flex flex-col"
            style={{ height: isMinimized ? 'auto' : '600px' }}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            onClick={handleContentClick}
            onWheel={handleWheel}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#6EC1E4] to-[#B9A9FF] text-white p-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                <h3 className="font-medium">Assistente de Fisioterapia Neonatal</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  aria-label="Alternar modo local/online"
                  onClick={toggleLocalMode}
                  className="text-xs px-2 py-1 bg-white/20 rounded-full hover:bg-white/30 transition-colors flex items-center gap-1"
                >
                  {useLocalMode ? "Modo Local" : "Modo Online"}
                  {!isOnline && <WifiOff className="h-3 w-3 ml-1" />}
                </button>
                <button aria-label="Minimizar" onClick={toggleMinimize}>
                  {isMinimized ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
                <button aria-label="Fechar assistente" onClick={onClose}>
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Message area */}
            {!isMinimized && (
              <div 
                ref={messagesContainerRef}
                className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
                style={{ 
                  overflowY: 'auto',
                  height: 'calc(100% - 136px)', /* 136px accounts for header + input */
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  WebkitOverflowScrolling: 'touch' // Enable momentum scrolling on iOS
                }}
                onWheel={handleWheel}
              >
                <div className="flex flex-col space-y-4 min-h-min w-full">
                  {messages.map((message, index) => 
                    message.role !== "system" && (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
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
                    )
                  )}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#6EC1E4] to-[#B9A9FF] flex items-center justify-center mr-2 flex-shrink-0">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                      <div className="max-w-[80%] rounded-lg p-3 bg-white text-[#333333] border border-[#E0E0E0] shadow-sm flex items-center">
                        <Loader2 className="h-4 w-4 mr-2 animate-spin text-[#6EC1E4]" />
                        <span className="text-sm text-gray-500">Pensando...</span>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>
            )}

            {/* Input form */}
            {!isMinimized && (
              <form 
                className="border-t border-[#E0E0E0] p-4 flex gap-2"
                onSubmit={handleSendMessage}
              >
                <input
                  placeholder="Digite sua pergunta sobre fisioterapia neonatal..."
                  className="flex-1 border border-[#E0E0E0] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6EC1E4]"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#6EC1E4] to-[#B9A9FF] hover:from-[#5BA8CB] hover:to-[#A090E0] text-white rounded-lg px-4 py-2 transition-colors flex items-center gap-2 disabled:opacity-50"
                  disabled={!input.trim() || isLoading}
                >
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Enviar</span>
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 