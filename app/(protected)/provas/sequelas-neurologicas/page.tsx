"use client"

import React, { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, CheckCircle2, XCircle, BarChart, ChevronRight, AlarmClock } from "lucide-react"
import Link from "next/link"
import { MagneticButton } from "@/components/ui/magnetic-button"

const questions = [
  {
    question: "Quais são as principais sequelas neurológicas observadas em prematuros?",
    options: [
      "Somente problemas de fala",
      "Não apresentam sequelas",
      "Apenas atraso motor",
      "Paralisia cerebral, déficits cognitivos, alterações sensoriais e distúrbios comportamentais"
    ],
    correctAnswer: 3,
    explanation: "As principais sequelas neurológicas em prematuros incluem paralisia cerebral, déficits cognitivos, alterações sensoriais (visão e audição) e distúrbios comportamentais/atencionais."
  },
  {
    question: "Como identificar precocemente sinais de comprometimento neurológico em prematuros?",
    options: [
      "Apenas através de exames de imagem",
      "Avaliação do desenvolvimento motor, reflexos, tônus muscular e marcos do desenvolvimento",
      "Somente após 1 ano de idade",
      "Não é possível identificar precocemente"
    ],
    correctAnswer: 1,
    explanation: "A identificação precoce envolve avaliação sistemática do desenvolvimento motor, reflexos primitivos, tônus muscular e acompanhamento dos marcos do desenvolvimento esperados para a idade corrigida."
  },
  {
    question: "Quais são os fatores de risco para o desenvolvimento de sequelas neurológicas em prematuros?",
    options: [
      "Apenas baixo peso",
      "Prematuridade extrema, hemorragia intracraniana, infecções e hipóxia",
      "Somente fatores genéticos",
      "Não existem fatores de risco"
    ],
    correctAnswer: 1,
    explanation: "Os principais fatores de risco incluem prematuridade extrema, ocorrência de hemorragia intracraniana, infecções do sistema nervoso central e episódios de hipóxia durante o período neonatal."
  },
  {
    question: "Como deve ser o acompanhamento multidisciplinar de prematuros com risco neurológico?",
    options: [
      "Não precisa de acompanhamento",
      "Apenas consultas médicas",
      "Integração entre neuropediatra, fisioterapeuta, fonoaudiólogo e terapeuta ocupacional",
      "Somente fisioterapia"
    ],
    correctAnswer: 2,
    explanation: "O acompanhamento deve ser integrado, envolvendo neuropediatra, fisioterapeuta, fonoaudiólogo e terapeuta ocupacional, para garantir intervenção precoce e adequada em todas as áreas do desenvolvimento."
  },
  {
    question: "Qual a importância da intervenção precoce em prematuros com sequelas neurológicas?",
    options: [
      "Maximiza o potencial de desenvolvimento e minimiza o impacto das sequelas",
      "Só importante após 2 anos",
      "Não tem importância",
      "Apenas para tranquilizar os pais"
    ],
    correctAnswer: 0,
    explanation: "A intervenção precoce é fundamental pois aproveita a plasticidade cerebral do período inicial do desenvolvimento, maximizando o potencial de recuperação e minimizando o impacto das sequelas a longo prazo."
  }
]

export default function SequelasNeurologicasPage() {
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
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Sequelas Neurológicas em Prematuros</h1>
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