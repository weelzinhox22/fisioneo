"use client"

import React, { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, CheckCircle2, XCircle, BarChart, ChevronRight, AlarmClock } from "lucide-react"
import Link from "next/link"
import { MagneticButton } from "@/components/ui/magnetic-button"

const questions = [
  {
    question: "Quais são os principais indicadores comportamentais de dor em recém-nascidos?",
    options: [
      "Apenas choro",
      "Somente frequência cardíaca",
      "Expressão facial, movimentos corporais e alterações no padrão de sono",
      "Exclusivamente saturação de oxigênio"
    ],
    correctAnswer: 2,
    explanation: "Os principais indicadores comportamentais de dor incluem expressão facial (fronte saliente, olhos espremidos), movimentos corporais (agitação, rigidez) e alterações no padrão de sono, sendo sinais importantes para avaliação da dor neonatal."
  },
  {
    question: "Como a escala NIPS (Neonatal Infant Pain Scale) avalia a dor em recém-nascidos?",
    options: [
      "Expressão facial, choro, padrão respiratório, movimentos de braços/pernas e estado de consciência",
      "Somente frequência cardíaca",
      "Apenas parâmetros fisiológicos",
      "Exclusivamente saturação de oxigênio"
    ],
    correctAnswer: 0,
    explanation: "A escala NIPS avalia a dor através de múltiplos parâmetros comportamentais: expressão facial, choro, padrão respiratório, movimentos de braços e pernas, e estado de consciência, fornecendo uma avaliação mais completa da experiência dolorosa."
  },
  {
    question: "Quais são as medidas não farmacológicas eficazes para o alívio da dor em procedimentos?",
    options: [
      "Somente posicionamento",
      "Exclusivamente musicoterapia",
      "Apenas contenção manual",
      "Sucção não nutritiva, glicose oral, contenção facilitada e contato pele a pele"
    ],
    correctAnswer: 3,
    explanation: "As medidas não farmacológicas eficazes incluem sucção não nutritiva, administração de glicose oral, contenção facilitada e contato pele a pele, que podem ser combinadas para melhor efeito analgésico durante procedimentos."
  },
  {
    question: "Como a escala PIPP (Premature Infant Pain Profile) se diferencia de outras escalas de avaliação da dor?",
    options: [
      "Considera idade gestacional, estado comportamental e indicadores fisiológicos",
      "Foca somente em expressão facial",
      "Não tem diferencial específico",
      "Avalia apenas choro"
    ],
    correctAnswer: 0,
    explanation: "A PIPP se destaca por considerar a idade gestacional do bebê, seu estado comportamental e indicadores fisiológicos na avaliação da dor, tornando-a especialmente adequada para prematuros."
  },
  {
    question: "Qual é a importância do registro sistemático da avaliação da dor em UTI Neonatal?",
    options: [
      "Apenas documentação básica",
      "Permite acompanhamento da evolução, ajuste terapêutico e comunicação efetiva entre a equipe",
      "Somente para pesquisa",
      "Não tem relevância clínica"
    ],
    correctAnswer: 1,
    explanation: "O registro sistemático é fundamental pois permite acompanhar a evolução da dor ao longo do tempo, ajustar as intervenções terapêuticas quando necessário e promover uma comunicação efetiva entre os membros da equipe multidisciplinar."
  }
]

const styles = `
  @keyframes bounceRight {
    0%, 100% {
      transform: translateX(0);
    }
    50% {
      transform: translateX(3px);
    }
  }
`;

export default function DorNeonatalPage() {
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
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Avaliação da Dor Neonatal</h1>
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
      <style jsx>{styles}</style>
    </div>
  )
} 