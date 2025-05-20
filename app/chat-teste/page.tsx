"use client"

import React from "react"
import ChatModal from "@/components/chat-modal"
import FixedChatModal from "@/components/fixed-chat-modal"
import { Button } from "@/components/ui/button"
import { useState } from "react"

type Message = {
  role: "user" | "assistant" | "system"
  content: string
}

export default function ChatTestPage() {
  const [showOriginalChat, setShowOriginalChat] = useState(false)
  const [showFixedChat, setShowFixedChat] = useState(false)
  
  // Test messages for fixed chat
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Olá! Sou o assistente de Fisioterapia Neonatal. Como posso ajudar você hoje?"
    }
  ])
  const [input, setInput] = useState("")
  
  const handleCloseOriginalChat = () => {
    setShowOriginalChat(false)
  }
  
  const handleCloseFixedChat = () => {
    setShowFixedChat(false)
  }
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      setMessages([...messages, { role: "user", content: input.trim() }])
      
      // Simulate assistant response
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          role: "assistant", 
          content: "Esta é uma resposta de teste para demonstrar o comportamento de scroll do chat modal."
        }])
      }, 500)
      
      setInput("")
    }
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F5F9FF] p-4">
      <h1 className="text-3xl font-bold mb-8 text-center pt-8">Chat Modal Test Page</h1>
      
      <div className="flex flex-col md:flex-row gap-6 justify-center items-center max-w-4xl mx-auto mb-12">
        <div className="w-full md:w-1/2 flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4">Original Chat Modal</h2>
          <Button 
            onClick={() => setShowOriginalChat(true)}
            className="bg-gradient-to-r from-[#6EC1E4] to-[#B9A9FF] hover:from-[#5BA8CB] hover:to-[#A090E0] text-white"
          >
            Open Original Chat
          </Button>
          
          {showOriginalChat && <ChatModal onClose={handleCloseOriginalChat} />}
        </div>
        
        <div className="w-full md:w-1/2 flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4">Fixed Chat Modal</h2>
          <Button 
            onClick={() => setShowFixedChat(true)}
            className="bg-gradient-to-r from-[#6EC1E4] to-[#B9A9FF] hover:from-[#5BA8CB] hover:to-[#A090E0] text-white"
          >
            Open Fixed Chat
          </Button>
          
          {showFixedChat && (
            <FixedChatModal
              isOpen={showFixedChat}
              onClose={handleCloseFixedChat}
              messages={messages}
              isLoading={false}
              input={input}
              setInput={setInput}
              handleSendMessage={handleSendMessage}
              useLocalMode={false}
              toggleLocalMode={() => {}}
              isOnline={true}
            />
          )}
        </div>
      </div>
      
      <div className="max-w-2xl mx-auto text-center text-gray-600 bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Fixed Scrolling Issues</h2>
        <p className="mb-4">
          This page demonstrates both chat modals with fixed scrolling behavior. 
          The improvements include:
        </p>
        <ul className="text-left list-disc list-inside mb-4 space-y-2">
          <li>Added wheel event handlers to prevent scrolling propagation</li>
          <li>Added proper container references for scroll management</li>
          <li>Fixed height calculations (calc(100% - 136px))</li>
          <li>Added WebkitOverflowScrolling for smooth mobile scrolling</li>
          <li>Used min-h-min to properly contain messages</li>
        </ul>
        <p>
          Try scrolling in both modals to see the difference in behavior.
        </p>
      </div>
    </div>
  )
} 