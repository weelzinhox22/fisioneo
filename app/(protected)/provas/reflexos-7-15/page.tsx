"use client"

import React, { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, CheckCircle2, XCircle, BarChart, ChevronRight, AlarmClock } from "lucide-react"
import Link from "next/link"
import { MagneticButton } from "@/components/ui/magnetic-button"

const questions = [
  {
    question: "Como os reflexos primitivos evoluem entre 7-15 meses?",
    options: [
      "Integram-se aos movimentos voluntários e são substituídos por reações posturais",
      "Permanecem iguais",
      "Desaparecem totalmente",
      "Não têm relação com desenvolvimento"
    ],
    correctAnswer: 0,
    explanation: "Os reflexos primitivos se integram gradualmente aos movimentos voluntários e são substituídos por reações posturais mais maduras, permitindo o desenvolvimento de habilidades motoras complexas."
  },
  {
    question: "Qual a importância das reações de proteção nesta faixa etária?",
    options: [
      "Não são importantes",
      "Apenas atrapalham",
      "Fundamentais para segurança durante exploração e desenvolvimento da mobilidade",
      "Surgem depois dos 2 anos"
    ],
    correctAnswer: 2,
    explanation: "As reações de proteção são fundamentais para garantir a segurança da criança durante a exploração do ambiente e o desenvolvimento da mobilidade independente."
  },
  {
    question: "Como se desenvolve o controle postural entre 7-15 meses?",
    options: [
      "Não se desenvolve",
      "Apenas melhora o engatinhar",
      "Desenvolvimento aleatório",
      "Progressão do sentar para ficar em pé e andar, com refinamento do equilíbrio"
    ],
    correctAnswer: 3,
    explanation: "O controle postural se desenvolve progressivamente, permitindo a transição do sentar para ficar em pé e andar, com refinamento constante do equilíbrio e coordenação."
  },
  {
    question: "Qual a importância das reações de equilíbrio neste período?",
    options: [
      "Essenciais para manutenção da postura e desenvolvimento da marcha independente",
      "Nenhuma importância",
      "Só para sentar",
      "Aparecem após 2 anos"
    ],
    correctAnswer: 0,
    explanation: "As reações de equilíbrio são essenciais para manter a postura em diferentes posições e desenvolver a marcha independente, permitindo ajustes posturais automáticos."
  },
  {
    question: "Como avaliar o desenvolvimento motor nesta fase?",
    options: [
      "Não precisa avaliar",
      "Apenas peso e altura",
      "Observar marcos motores, qualidade do movimento e reações posturais",
      "Somente após 2 anos"
    ],
    correctAnswer: 2,
    explanation: "A avaliação deve incluir a observação dos marcos motores esperados, a qualidade dos movimentos realizados e a presença adequada das reações posturais para a idade."
  }
]

export default function Reflexos715Page() {
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
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Reflexos de 7-15 Meses</h1>
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
                    className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                      selectedAnswer === questions[currentQuestion].correctAnswer
                        ? "bg-gradient-to-r from-green-50 to-green-100 border-green-500 text-green-800"
                        : "bg-gradient-to-r from-red-50 to-red-100 border-red-500 text-red-800"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      {selectedAnswer === questions[currentQuestion].correctAnswer ? (
                        <>
                          <CheckCircle2 className="h-6 w-6 text-green-600" />
                          <span className="font-semibold text-green-800">Correto!</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="h-6 w-6 text-red-600" />
                          <span className="font-semibold text-red-800">Incorreto</span>
                        </>
                      )}
                    </div>
                    <p className="text-sm leading-relaxed">{feedbackMessage}</p>
                  </div>
                  <button
                    onClick={handleNextQuestion}
                    className={`w-full rounded-xl p-4 flex items-center justify-center transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 ${
                      currentQuestion < questions.length - 1
                        ? "bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 hover:from-blue-500 hover:via-blue-400 hover:to-blue-500"
                        : "bg-gradient-to-r from-green-600 via-green-500 to-green-600 hover:from-green-500 hover:via-green-400 hover:to-green-500"
                    } text-white font-semibold shadow-[0_4px_20px_-4px_rgba(0,118,255,0.3)] hover:shadow-[0_8px_25px_-5px_rgba(0,118,255,0.4)]`}
                  >
                    <div className="flex items-center gap-2">
                      {currentQuestion < questions.length - 1 ? (
                        <>
                          <span>Próxima Questão</span>
                          <ChevronRight className="h-5 w-5 animate-[bounceRight_1s_infinite]" />
                        </>
                      ) : (
                        <>
                          <span>Ver Resultados</span>
                          <BarChart className="h-5 w-5" />
                        </>
                      )}
                    </div>
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