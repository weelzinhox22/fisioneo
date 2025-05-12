"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Check, X, Trophy, ArrowRight, Home } from "lucide-react"
import Link from "next/link"

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
}

export default function QuizPage() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [title, setTitle] = useState<string>("")
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [answers, setAnswers] = useState<(number | null)[]>([])

  useEffect(() => {
    // Carregar as questões do localStorage
    const storedQuestions = localStorage.getItem("quiz_questions")
    const storedTitle = localStorage.getItem("quiz_title")
    
    if (storedQuestions) {
      try {
        const parsedQuestions = JSON.parse(storedQuestions) as Question[]
        
        // Verificar se a primeira pergunta é válida (não é uma introdução)
        let validQuestions = parsedQuestions;
        
        if (parsedQuestions.length > 0) {
          const firstQ = parsedQuestions[0];
          // Verificar se a primeira pergunta parece uma introdução
          if (firstQ.question.toLowerCase().includes("aqui estão") || 
              firstQ.question.toLowerCase().includes("as 10 perguntas") ||
              firstQ.options.some(opt => opt === "Opção A" || opt === "Opção B")) {
            // Remover a primeira pergunta se for uma introdução
            validQuestions = parsedQuestions.slice(1);
          }
        }
        
        // Remapear IDs para garantir sequência correta
        validQuestions = validQuestions.map((q, idx) => ({
          ...q,
          id: idx + 1
        }));
        
        setQuestions(validQuestions)
        setAnswers(new Array(validQuestions.length).fill(null))
      } catch (error) {
        console.error("Erro ao carregar questões:", error)
      }
    }
    
    if (storedTitle) {
      setTitle(storedTitle)
    }
  }, [])

  const handleOptionSelect = (optionIndex: number) => {
    if (isAnswered) return
    
    setSelectedOption(optionIndex)
    setIsAnswered(true)
    
    // Atualizar as respostas
    const newAnswers = [...answers]
    newAnswers[currentQuestionIndex] = optionIndex
    setAnswers(newAnswers)
    
    // Verificar se a resposta está correta
    const currentQuestion = questions[currentQuestionIndex]
    if (optionIndex === currentQuestion.correctAnswer) {
      setScore(score + 1)
    }
  }

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedOption(null)
      setIsAnswered(false)
    } else {
      setShowResults(true)
    }
  }

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
      setSelectedOption(answers[currentQuestionIndex - 1])
      setIsAnswered(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestionIndex(0)
    setSelectedOption(null)
    setIsAnswered(false)
    setScore(0)
    setShowResults(false)
    setAnswers(new Array(questions.length).fill(null))
  }

  if (questions.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[70vh]">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Nenhum questionário disponível</h1>
          <p className="text-lg text-gray-600 mb-8">
            Não encontramos nenhum questionário para exibir. Por favor, gere um questionário a partir de um documento.
          </p>
          <Link 
            href="/documentos" 
            className="inline-flex items-center px-5 py-3 bg-gradient-to-r from-[#6EC1E4] to-[#5BA8CB] text-white rounded-lg hover:shadow-lg transition-all"
          >
            <Home className="mr-2 h-5 w-5" />
            Voltar para Documentos
          </Link>
        </div>
      </div>
    )
  }

  if (showResults) {
    const percentage = Math.round((score / questions.length) * 100)
    
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8">
          <div className="text-center mb-12">
            <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2 text-gray-800">Resultados do Quiz</h1>
            <p className="text-lg text-gray-600 mb-4">{title}</p>
            
            <div className="bg-gray-100 rounded-full h-6 w-full max-w-md mx-auto mb-2">
              <div 
                className={`h-6 rounded-full ${percentage >= 70 ? 'bg-green-500' : percentage >= 40 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
            
            <p className="text-2xl font-bold mb-8">
              {score} de {questions.length} ({percentage}%)
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={resetQuiz}
                className="px-5 py-3 bg-gradient-to-r from-[#B9A9FF] to-[#A091E4] text-white rounded-lg hover:shadow-lg transition-all"
              >
                Tentar novamente
              </button>
              
              <Link 
                href="/documentos" 
                className="inline-flex items-center px-5 py-3 bg-gradient-to-r from-[#6EC1E4] to-[#5BA8CB] text-white rounded-lg hover:shadow-lg transition-all"
              >
                <Home className="mr-2 h-5 w-5" />
                Voltar para Documentos
              </Link>
            </div>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-xl font-bold border-b pb-2">Revisão das respostas</h2>
            
            {questions.map((question, index) => (
              <div key={question.id} className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium mb-2">
                  {index + 1}. {question.question}
                </p>
                
                <div className="ml-4 space-y-1">
                  {question.options.map((option, optIndex) => (
                    <div 
                      key={optIndex} 
                      className={`flex items-center p-2 rounded-md ${
                        answers[index] === optIndex && question.correctAnswer === optIndex
                          ? 'bg-green-100'
                          : answers[index] === optIndex && question.correctAnswer !== optIndex
                          ? 'bg-red-100'
                          : question.correctAnswer === optIndex && answers[index] !== null
                          ? 'bg-green-50'
                          : ''
                      }`}
                    >
                      {answers[index] === optIndex && question.correctAnswer === optIndex && (
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      )}
                      {answers[index] === optIndex && question.correctAnswer !== optIndex && (
                        <X className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
                      )}
                      <span>{option}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Quiz: {title}</h1>
          <div className="text-sm font-medium text-gray-500">
            Questão {currentQuestionIndex + 1} de {questions.length}
          </div>
        </div>
        
        <div className="mb-4 bg-gray-100 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-[#6EC1E4] to-[#5BA8CB] h-2 rounded-full" 
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-6">{currentQuestion.question}</h2>
          
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionSelect(index)}
                disabled={isAnswered}
                className={`w-full text-left p-4 rounded-lg border transition-all ${
                  selectedOption === index && isAnswered
                    ? index === currentQuestion.correctAnswer
                      ? 'bg-green-100 border-green-300'
                      : 'bg-red-100 border-red-300'
                    : selectedOption === index
                    ? 'bg-blue-100 border-blue-300'
                    : 'bg-white hover:bg-gray-50 border-gray-300'
                }`}
              >
                <div className="flex items-center">
                  <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                    selectedOption === index
                      ? index === currentQuestion.correctAnswer && isAnswered
                        ? 'bg-green-500 text-white'
                        : selectedOption === index && isAnswered
                        ? 'bg-red-500 text-white'
                        : 'bg-blue-500 text-white'
                      : 'bg-gray-200'
                  }`}>
                    {isAnswered && selectedOption === index ? (
                      index === currentQuestion.correctAnswer ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <X className="h-4 w-4" />
                      )
                    ) : (
                      <span className="text-sm">{String.fromCharCode(65 + index)}</span>
                    )}
                  </div>
                  <span>{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
        
        {isAnswered && selectedOption !== null && (
          <div className={`p-4 rounded-lg mb-6 ${
            selectedOption === currentQuestion.correctAnswer
              ? 'bg-green-50 border border-green-200'
              : 'bg-red-50 border border-red-200'
          }`}>
            <p className={`font-medium ${
              selectedOption === currentQuestion.correctAnswer
                ? 'text-green-700'
                : 'text-red-700'
            }`}>
              {selectedOption === currentQuestion.correctAnswer 
                ? '✓ Resposta correta!' 
                : `✗ Resposta incorreta. A resposta correta é: ${currentQuestion.options[currentQuestion.correctAnswer]}`
              }
            </p>
          </div>
        )}
        
        <div className="flex justify-between">
          <button
            onClick={goToPreviousQuestion}
            disabled={currentQuestionIndex === 0}
            className="px-4 py-2 flex items-center gap-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="h-5 w-5" />
            Anterior
          </button>
          
          <button
            onClick={goToNextQuestion}
            disabled={!isAnswered}
            className="px-4 py-2 flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#6EC1E4] to-[#5BA8CB] text-white hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentQuestionIndex < questions.length - 1 ? (
              <>
                Próxima
                <ArrowRight className="h-5 w-5" />
              </>
            ) : (
              <>
                Ver Resultados
                <Trophy className="h-5 w-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
} 