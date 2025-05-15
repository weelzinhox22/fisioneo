"use client"

import React, { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, CheckCircle2, XCircle, BarChart, ChevronRight, AlarmClock } from "lucide-react"
import Link from "next/link"
import { MagneticButton } from "@/components/ui/magnetic-button"

const questions = [
  {
    question: "Qual é a importância das escalas de avaliação no desenvolvimento infantil?",
    options: [
      "Apenas documentação",
      "Somente classificação",
      "Não tem importância",
      "Identificação precoce de atrasos, monitoramento do desenvolvimento e planejamento terapêutico"
    ],
    correctAnswer: 3,
    explanation: "As escalas de avaliação são fundamentais para identificar precocemente atrasos no desenvolvimento, monitorar a evolução da criança e planejar intervenções terapêuticas adequadas."
  },
  {
    question: "Como a escala AIMS (Alberta Infant Motor Scale) avalia o desenvolvimento motor?",
    options: [
      "Não avalia desenvolvimento motor",
      "Apenas postura sentada",
      "Observação de posturas e movimentos em prono, supino, sentado e em pé",
      "Somente reflexos"
    ],
    correctAnswer: 2,
    explanation: "A AIMS avalia o desenvolvimento motor através da observação detalhada das posturas e movimentos em quatro posições: prono, supino, sentado e em pé, considerando a qualidade do movimento."
  },
  {
    question: "Quais são os principais componentes avaliados na escala Bayley III?",
    options: [
      "Somente linguagem",
      "Cognição, linguagem, motor, social-emocional e comportamento adaptativo",
      "Exclusivamente comportamento",
      "Apenas motor"
    ],
    correctAnswer: 1,
    explanation: "A Bayley III é uma avaliação abrangente que inclui cinco domínios principais: cognição, linguagem (receptiva e expressiva), motor (fino e grosso), social-emocional e comportamento adaptativo."
  },
  {
    question: "Como interpretar corretamente os resultados das escalas de avaliação?",
    options: [
      "Não precisa interpretar",
      "Apenas números",
      "Considerando idade corrigida, contexto do desenvolvimento e fatores ambientais",
      "Somente percentis"
    ],
    correctAnswer: 2,
    explanation: "A interpretação adequada deve considerar a idade corrigida (em prematuros), o contexto global do desenvolvimento da criança e os fatores ambientais que podem influenciar seu desempenho."
  },
  {
    question: "Qual a importância do acompanhamento longitudinal com escalas de avaliação?",
    options: [
      "Somente para pesquisa",
      "Não é necessário",
      "Apenas burocracia",
      "Permite monitorar a evolução, ajustar intervenções e identificar novas necessidades"
    ],
    correctAnswer: 3,
    explanation: "O acompanhamento longitudinal é essencial pois permite monitorar a evolução do desenvolvimento ao longo do tempo, ajustar as intervenções conforme necessário e identificar novas demandas terapêuticas."
  }
]

export default function EscalaAvaliacaoPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [feedbackMessage, setFeedbackMessage] = useState("")
  const [timer, setTimer] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(false)

  useEffect(() => {
    setIsTimerRunning(true)
    return () => {
      setIsTimerRunning(false)
    }
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isTimerRunning && !showResults) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, showResults]);

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (index: number) => {
    if (isAnswered) return

    setSelectedAnswer(index)
    setIsAnswered(true)

    if (index === questions[currentQuestion].correctAnswer) {
      setScore(score + 1)
      setFeedbackMessage("Correto! " + questions[currentQuestion].explanation)
    } else {
      setFeedbackMessage(
        "Incorreto. A resposta correta é: " +
          questions[currentQuestion].options[questions[currentQuestion].correctAnswer] +
          ". " +
          questions[currentQuestion].explanation
      )
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setIsAnswered(false)
      setFeedbackMessage("")
    } else {
      setShowResults(true)
      setIsTimerRunning(false)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setIsAnswered(false)
    setScore(0)
    setShowResults(false)
    setFeedbackMessage("")
    setTimer(0)
    setIsTimerRunning(true)
  }

  const calculateFinalGrade = () => {
    const percentage = (score / questions.length) * 100
    return percentage.toFixed(1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pb-20">
      <div className="container mx-auto px-6 py-8">
        <Link href="/provas" className="inline-flex items-center text-blue-500 hover:text-blue-600 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          <span>Voltar para provas</span>
        </Link>

        {!showResults ? (
          <div>
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Escalas de Avaliação do Desenvolvimento</h1>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  Questão {currentQuestion + 1} de {questions.length}
                </span>
                <div className="flex items-center gap-2">
                  <AlarmClock className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-500">{formatTime(timer)}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                {questions[currentQuestion].question}
              </h2>

              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-[1.01] ${
                      selectedAnswer === index
                        ? index === questions[currentQuestion].correctAnswer
                          ? "bg-gradient-to-r from-green-50 to-green-100 border-green-500 shadow-lg"
                          : "bg-gradient-to-r from-red-50 to-red-100 border-red-500 shadow-lg"
                        : "border-gray-200 hover:border-blue-400 hover:bg-blue-50 hover:shadow-md"
                    }`}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={isAnswered}
                  >
                    <div className="flex items-center">
                      <div
                        className={`h-7 w-7 rounded-full flex items-center justify-center mr-3 transition-all duration-300 ${
                          selectedAnswer === index
                            ? index === questions[currentQuestion].correctAnswer
                              ? "bg-green-500 text-white scale-110"
                              : "bg-red-500 text-white scale-110"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {selectedAnswer === index ? (
                          index === questions[currentQuestion].correctAnswer ? (
                            <CheckCircle2 className="h-5 w-5" />
                          ) : (
                            <XCircle className="h-5 w-5" />
                          )
                        ) : (
                          <span className="text-sm font-semibold">{String.fromCharCode(65 + index)}</span>
                        )}
                      </div>
                      <span className="text-gray-700 font-medium">{option}</span>
                    </div>
                  </button>
                ))}
              </div>

              {isAnswered && (
                <div className="mt-6 space-y-4">
                  <div
                    className={`p-4 rounded-lg border ${
                      selectedAnswer === questions[currentQuestion].correctAnswer
                        ? "bg-green-50 border-green-200 text-green-800"
                        : "bg-red-50 border-red-200 text-red-800"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {selectedAnswer === questions[currentQuestion].correctAnswer ? (
                        <>
                          <CheckCircle2 className="h-5 w-5 text-green-600" />
                          <span className="font-medium">Correto!</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="h-5 w-5 text-red-600" />
                          <span className="font-medium">Incorreto</span>
                        </>
                      )}
                    </div>
                    <p className="text-sm">{feedbackMessage}</p>
                  </div>
                  <button
                    onClick={handleNextQuestion}
                    className="w-full px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center justify-center gap-2 group"
                  >
                    {currentQuestion < questions.length - 1 ? (
                      <>
                        <span>Próxima</span>
                        <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </>
                    ) : (
                      <>
                        <span>Finalizar</span>
                        <BarChart className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Resultados do Teste</h2>
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <AlarmClock className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-600">{formatTime(timer)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BarChart className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-600">{calculateFinalGrade()}%</span>
                </div>
              </div>

              <p className="text-gray-600 mb-8">
                Você acertou {score} de {questions.length} questões
              </p>

              <MagneticButton
                onClick={resetQuiz}
                className="bg-blue-500 text-white rounded-lg px-6 py-3 hover:bg-blue-600 transition-colors"
              >
                Tentar Novamente
              </MagneticButton>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 