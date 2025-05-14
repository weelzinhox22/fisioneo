"use client"

import { useState } from "react"
import { Loader2, RefreshCw } from "lucide-react"

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
}

interface QuizGeneratorProps {
  documentText: string
  documentTitle: string
}

export default function QuizGenerator({ documentText, documentTitle }: QuizGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [questions, setQuestions] = useState<Question[]>([])
  const [error, setError] = useState<string | null>(null)
  const [attempts, setAttempts] = useState(0)
  
  const generateQuiz = async () => {
    if (!documentText) return
    
    setIsGenerating(true)
    setError(null)
    setAttempts(prev => prev + 1)
    
    try {
      const response = await fetch("/api/generate-quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: documentText,
          title: documentTitle,
        }),
      })
      
      if (!response.ok) {
        throw new Error(`Erro: ${response.status}`)
      }
      
      const data = await response.json()
      
      if (!data.questions || !Array.isArray(data.questions) || data.questions.length === 0) {
        throw new Error("Formato de resposta inválido")
      }
      
      // Verificar se estamos recebendo as perguntas de fallback (perguntas genéricas)
      const isFallback = data.questions.some((q: Question) => 
        q.question.includes("Qual é o assunto principal abordado no documento") || 
        q.question.includes("Qual conceito está mais diretamente relacionado")
      )
      
      if (isFallback && attempts < 2) {
        // Se recebemos perguntas de fallback na primeira tentativa, tentar novamente
        setError("As perguntas geradas foram muito genéricas. Tentando criar perguntas mais específicas...")
        setTimeout(() => generateQuiz(), 2000)
        return
      }
      
      // Salvar as questões no localStorage para poder acessar na página de quiz
      localStorage.setItem("quiz_questions", JSON.stringify(data.questions))
      localStorage.setItem("quiz_title", documentTitle)
      
      setQuestions(data.questions)
    } catch (error) {
      console.error("Erro ao gerar questionário:", error)
      setError(`Erro ao gerar questionário: ${error instanceof Error ? error.message : "Erro desconhecido"}`)
    } finally {
      setIsGenerating(false)
    }
  }
  
  const resetAndRetry = () => {
    setQuestions([])
    setError(null)
    setAttempts(0)
    generateQuiz()
  }
  
  const openQuiz = () => {
    // Abrir a página de quiz em uma nova aba
    window.open("/quiz", "_blank")
  }
  
  return (
    <div className="relative z-10">
      {!questions.length ? (
        <>
          <button
            onClick={generateQuiz}
            disabled={isGenerating}
            className="w-full py-3 bg-gradient-to-r from-[#B9A9FF] to-[#A091E4] text-white rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2 relative z-20"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Gerando perguntas e respostas{Array(attempts % 3 + 1).fill('.').join('')}</span>
              </>
            ) : (
              <span>Gerar perguntas e respostas</span>
            )}
          </button>
          
          {error && (
            <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm flex justify-between items-center relative z-20">
              <span>{error}</span>
              {!isGenerating && (
                <button 
                  onClick={resetAndRetry}
                  className="ml-2 p-1.5 rounded-full bg-red-100 hover:bg-red-200 transition-colors relative z-30"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="space-y-4 relative z-10">
          <p className="text-sm text-gray-600">
            {questions.length} perguntas geradas sobre este documento
          </p>
          
          <div className="flex flex-col space-y-3">
            <button
              onClick={openQuiz}
              className="w-full py-3 bg-gradient-to-r from-[#B9A9FF] to-[#A091E4] text-white rounded-lg hover:shadow-lg transition-all relative z-20"
            >
              Responder às perguntas
            </button>
            
            <button
              onClick={resetAndRetry}
              className="w-full py-2 border border-[#B9A9FF] text-[#B9A9FF] rounded-lg hover:bg-[#F5F3FF] transition-all text-sm flex items-center justify-center gap-1 relative z-20"
            >
              <RefreshCw className="h-4 w-4" />
              Gerar novas perguntas
            </button>
          </div>
        </div>
      )}
    </div>
  )
} 