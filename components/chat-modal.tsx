"use client"

import React, { useState, useRef, useEffect } from "react"
import { Bot, X, ChevronDown, MessageSquare } from "lucide-react"
import { motion } from "framer-motion"

interface Message {
  role: "user" | "assistant"
  content: string
}

interface ChatModalProps {
  onClose?: () => void
}

export default function ChatModal({ onClose }: ChatModalProps) {
  const [isMinimized, setIsMinimized] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messageContainerRef = useRef<HTMLDivElement>(null)
  
  // Example messages
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Olá! Sou o assistente de Fisioterapia Neonatal. Como posso ajudar você hoje?"
    },
    {
      role: "user",
      content: "Pode me explicar como avaliar os reflexos primitivos em bebês prematuros"
    },
    {
      role: "assistant",
      content: `Olá! É um prazer ajudar com essa questão tão importante. A avaliação dos reflexos primitivos em bebês prematuros é crucial para identificar possíveis atrasos no desenvolvimento neurológico e implementar intervenções precoces. No entanto, é importante lembrar que a interpretação dos reflexos em prematuros requer um cuidado especial, pois o desenvolvimento neurológico deles ainda está em curso e pode apresentar variações significativas.

**Considerações Gerais na Avaliação:**

*   **Idade Corrigida:** Sempre utilize a idade corrigida do bebê para avaliar o desenvolvimento. A idade corrigida é calculada a partir da data prevista para o parto, e não da data real do nascimento. Isso é fundamental para uma comparação justa com os marcos do desenvolvimento.
*   **Ambiente:** Garanta um ambiente calmo, aquecido e com iluminação adequada para a avaliação.
*   **Observação Inicial:** Observe o bebê em repouso antes de iniciar os testes. Avalie o tônus muscular, a postura espontânea e a presença de movimentos anormais.
*   **Sequência de Avaliação:** Siga uma sequência lógica para não sobrecarregar o bebê. Comece com reflexos mais simples e menos invasivos.
*   **Documentação:** Registre detalhadamente os resultados da avaliação, incluindo a presença, ausência, simetria e intensidade de cada reflexo. A documentação permite o acompanhamento da evolução do bebê ao longo do tempo.
*   **Variações:** Esteja ciente de que a resposta aos reflexos pode variar dependendo do estado de alerta do bebê (sono, vigília, choro).

**Reflexos Primitivos Importantes (0-6 meses) e Como Avaliá-los:**

Aqui estão alguns reflexos importantes e como avaliá-los, com foco em prematuros:

1.  **Reflexo de Moro:**
    *   **Idade Esperada:** Presente desde o nascimento até cerca de 3-6 meses.
    *   **Avaliação:**
        *   **Técnica:** Segure o bebê semi-sentado, apoiando a cabeça e as costas. Simule uma queda repentina, soltando ligeiramente o apoio da cabeça.
        *   **Resposta Esperada:** Abdução e extensão dos braços, seguidas de adução e choro (nem sempre presente).
        *   **Interpretação em Prematuros:** A resposta pode ser incompleta ou exagerada devido à imaturidade do sistema nervoso. A ausência ou persistência anormal (além dos 6 meses) pode indicar problemas neurológicos.
2.  **Reflexo de Preensão Palmar:**
    *   **Idade Esperada:** Presente desde o nascimento até cerca de 4-6 meses.
    *   **Avaliação:**
        *   **Técnica:** Coloque um dedo ou objeto na palma da mão do bebê.
        *   **Resposta Esperada:** O bebê irá agarrar o dedo ou objeto com força.
        *   **Interpretação em Prematuros:** A força da preensão pode ser menor em prematuros, mas deve estar presente. A ausência ou persistência prolongada pode ser um sinal de alerta.
3.  **Reflexo de Preensão Plantar:**
    *   **Idade Esperada:** Presente desde o nascimento até cerca de 9-12 meses.
    *   **Avaliação:**
        *   **Técnica:** Aplique pressão na planta do pé do bebê, logo abaixo dos dedos.
        *   **Resposta Esperada:** Flexão dos dedos (agarramento plantar).
        *   **Interpretação em Prematuros:** Semelhante à preensão palmar, a força pode ser menor.
4.  **Reflexo de Sucção e Procura (Rooting):**
    *   **Idade Esperada:** Presente desde o nascimento até cerca de 3-4 meses (sucção) e 3 meses (procura).
    *   **Avaliação:**
        *   **Sucção:** Ofereça um dedo ou chupeta ao bebê.
        *   **Resposta Esperada:** Sucção rítmica.
        *   **Procura (Rooting):** Toque suavemente a bochecha do bebê próximo ao canto da boca.
        *   **Resposta Esperada:** O bebê vira a cabeça na direção do estímulo, abrindo a boca como se procurasse o mamilo.
        *   **Interpretação em Prematuros:** Essencial para a alimentação. A ausência ou dificuldade em coordenar a sucção e deglutição pode ser um problema significativo.
5.  **Reflexo Tônico do Pescoço Assimétrico (ATNR):**
    *   **Idade Esperada:** Presente desde o nascimento até cerca de 4-6 meses.
    *   **Avaliação:**
        *   **Técnica:** Gire a cabeça do bebê para um lado enquanto ele está deitado de costas.
        *   **Resposta Esperada:** Extensão do braço e da perna no lado para o qual a cabeça está virada, e flexão dos membros do lado oposto (posição de esgrimista).
        *   **Interpretação em Prematuros:** A resposta pode ser fraca ou inconsistente. A persistência além dos 6 meses ou a obrigatoriedade da postura (sempre na mesma direção) pode indicar problemas de desenvolvimento.
6.  **Reflexo de Galant:**
    *   **Idade Esperada:** Presente desde o nascimento até cerca de 3-4 meses.
    *   **Avaliação:**
        *   **Técnica:** Segure o bebê de bruços e passe um dedo ao longo da coluna vertebral, de cima para baixo, de um lado.
        *   **Resposta Esperada:** O bebê curva o corpo para o lado estimulado.
        *   **Interpretação em Prematuros:** A ausência ou persistência prolongada pode estar associada a alterações no desenvolvimento.

**Interpretação dos Resultados em Prematuros:**

*   **Atraso:** A ausência de um reflexo na idade corrigida em que ele normalmente estaria presente pode indicar um atraso no desenvolvimento neurológico.
*   **Persistência:** A persistência de um reflexo além da idade esperada pode interferir no desenvolvimento de habilidades motoras mais complexas.
*   **Assimetria:** A diferença significativa na resposta entre os lados do corpo pode indicar uma lesão neurológica unilateral.
*   **Intensidade:** Reflexos muito fracos ou muito fortes podem ser indicativos de problemas no sistema nervoso.

**O que fazer com os resultados da avaliação?**

Após a avaliação, discuta os resultados com a equipe multidisciplinar (médico, enfermeiro, terapeuta ocupacional, fonoaudiólogo) para planejar a intervenção mais adequada. A fisioterapia neonatal pode incluir:

*   **Estimulação Sensorial e Motora:** Para promover o desenvolvimento neurológico e motor.
*   **Posicionamento Terapêutico:** Para prevenir deformidades e promover o alinhamento postural.
*   **Manuseio Adequado:** Para evitar posturas anormais e facilitar o movimento.
*   **Exercícios:** Para fortalecer os músculos e melhorar a coordenação.
*   **Orientação aos Pais:** Para que eles possam participar ativamente do desenvolvimento do bebê em casa.

**Importante:**

A avaliação dos reflexos primitivos é apenas uma parte da avaliação global do desenvolvimento do bebê prematuro. É essencial considerar outros aspectos, como o tônus muscular, a postura, os movimentos espontâneos e o desempenho em outras áreas do desenvolvimento (cognitivo, social, emocional).

Lembre-se sempre de que o desenvolvimento de cada bebê é único, e que a avaliação e a intervenção devem ser individualizadas. Caso tenha alguma dúvida específica sobre um bebê em particular, entre em contato com a equipe médica responsável pelo acompanhamento dele.

Espero que esta explicação detalhada seja útil. Se tiver mais perguntas, estou à disposição!`
    }
  ])
  const [input, setInput] = useState("")

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      setMessages([...messages, { role: "user", content: input.trim() }])
      setInput("")
    }
  }

  // Handle close button click
  const handleClose = () => {
    if (onClose) {
      onClose()
    }
  }

  // Handle clicks within the modal without closing it
  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }
  
  // Prevent wheel events from propagating to the background
  const handleWheel = (e: React.WheelEvent) => {
    e.stopPropagation()
  }

  return (
    <div 
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={handleClose}
      onWheel={handleWheel}
    >
      <motion.div 
        className="bg-white rounded-xl shadow-xl w-full max-w-md flex flex-col"
        style={{ height: '600px' }}
        onClick={handleContentClick}
        onWheel={handleWheel}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#6EC1E4] to-[#B9A9FF] text-white p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            <h3 className="font-medium">Assistente de Fisioterapia Neonatal</h3>
          </div>
          <div className="flex items-center gap-2">
            <button 
              aria-label="Alternar modo local"
              className="text-xs px-2 py-1 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
            >
              Modo Online
            </button>
            <button 
              aria-label="Minimizar"
              onClick={() => setIsMinimized(!isMinimized)}
            >
              <ChevronDown className="h-5 w-5" />
            </button>
            <button 
              aria-label="Fechar assistente"
              onClick={handleClose}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        {/* Message area - with fixed height and scrollable */}
        <div 
          ref={messageContainerRef}
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
          <div className="flex flex-col space-y-4 min-h-min">
            {messages.map((message, index) => (
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
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        {/* Input form */}
        <form 
          className="border-t border-[#E0E0E0] p-4 flex gap-2"
          onSubmit={handleSubmit}
        >
          <input
            placeholder="Digite sua pergunta sobre fisioterapia neonatal..."
            className="flex-1 border border-[#E0E0E0] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6EC1E4]"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-[#6EC1E4] to-[#B9A9FF] hover:from-[#5BA8CB] hover:to-[#A090E0] text-white rounded-lg px-4 py-2 transition-colors flex items-center gap-2"
            disabled={!input.trim()}
          >
            <span className="sr-only">Enviar</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-send h-4 w-4"
            >
              <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
              <path d="m21.854 2.147-10.94 10.939" />
            </svg>
          </button>
        </form>
      </motion.div>
    </div>
  )
} 