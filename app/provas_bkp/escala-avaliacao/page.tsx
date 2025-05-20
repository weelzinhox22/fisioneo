"use client"

import React, { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, CheckCircle2, XCircle, BarChart, ChevronRight, AlarmClock } from "lucide-react"
import Link from "next/link"
import { MagneticButton } from "@/components/ui/magnetic-button"

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

  const questions = [
    {
      question: "Na avaliação do desenvolvimento neuromotor através da escala AIMS (Alberta Infant Motor Scale), qual é a importância da observação da qualidade do movimento em diferentes posturas?",
      options: [
        "Avaliar apenas a quantidade de posturas alcançadas",
        "Identificar padrões de movimento, alinhamento postural e distribuição de peso em cada postura",
        "Verificar somente o tempo de permanência em cada postura",
        "Medir exclusivamente a força muscular"
      ],
      correctAnswer: 1,
      explanation: "A escala AIMS valoriza a observação da qualidade do movimento, incluindo padrões de movimento, alinhamento postural e distribuição de peso em diferentes posturas (prono, supino, sentado e em pé). Esta análise qualitativa é fundamental para identificar desvios sutis do desenvolvimento e planejar intervenções precoces."
    },
    {
      question: "Como a escala Bayley III se diferencia da TIMP (Test of Infant Motor Performance) na avaliação de prematuros?",
      options: [
        "A Bayley III avalia apenas aspectos motores grosseiros",
        "O TIMP é específico para avaliação após 12 meses",
        "A Bayley III fornece uma avaliação mais abrangente, incluindo cognição, linguagem e desenvolvimento socioemocional",
        "O TIMP não considera a idade corrigida"
      ],
      correctAnswer: 2,
      explanation: "A Bayley III é mais abrangente, avaliando múltiplos domínios do desenvolvimento (motor, cognitivo, linguagem e socioemocional), enquanto o TIMP é específico para avaliação da qualidade do movimento e controle postural em bebês prematuros até 4 meses de idade corrigida."
    },
    {
      question: "Na avaliação da dor através da escala NIPS (Neonatal Infant Pain Scale), quais parâmetros são considerados mais sensíveis para detectar dor aguda em prematuros?",
      options: [
        "Expressão facial e padrão respiratório",
        "Apenas choro e movimentação dos membros",
        "Somente frequência cardíaca",
        "Estado de consciência isoladamente"
      ],
      correctAnswer: 0,
      explanation: "Na escala NIPS, a expressão facial e o padrão respiratório são considerados os parâmetros mais sensíveis para detectar dor aguda em prematuros, pois são respostas mais consistentes e menos influenciadas por outros fatores como fadiga ou estado comportamental."
    },
    {
      question: "Qual é a principal vantagem da escala PIPP-R (Premature Infant Pain Profile-Revised) em relação a outras escalas de avaliação da dor?",
      options: [
        "Avalia apenas parâmetros fisiológicos",
        "Não considera a idade gestacional",
        "Considera o estado comportamental e idade gestacional como fatores de ajuste na pontuação",
        "É aplicável apenas em recém-nascidos a termo"
      ],
      correctAnswer: 2,
      explanation: "A principal vantagem da PIPP-R é considerar o estado comportamental e a idade gestacional como fatores de ajuste na pontuação final, permitindo uma avaliação mais precisa da dor em prematuros de diferentes idades gestacionais e estados comportamentais."
    },
    {
      question: "Na avaliação dos Movimentos Generalizados de Prechtl, qual é o significado prognóstico da ausência de Fidgety Movements aos 3 meses de idade corrigida?",
      options: [
        "Desenvolvimento normal garantido",
        "Alto valor preditivo para paralisia cerebral",
        "Indicativo de atraso motor transitório",
        "Sem significado clínico relevante"
      ],
      correctAnswer: 1,
      explanation: "A ausência de Fidgety Movements aos 3 meses de idade corrigida tem alto valor preditivo para paralisia cerebral. Esta avaliação é considerada uma das ferramentas mais precisas para identificação precoce de alterações neurológicas em bebês de risco."
    }
  ]

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
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Avaliação de Escalas de Avaliação Neonatal</h1>
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
                    className={`w-full text-left p-4 rounded-lg border transition-all ${
                      selectedAnswer === index
                        ? index === questions[currentQuestion].correctAnswer
                          ? "bg-green-50 border-green-200"
                          : "bg-red-50 border-red-200"
                        : "border-gray-200 hover:border-blue-200 hover:bg-blue-50"
                    }`}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={isAnswered}
                  >
                    <div className="flex items-center">
                      <div
                        className={`h-6 w-6 rounded-full flex items-center justify-center mr-3 ${
                          selectedAnswer === index
                            ? index === questions[currentQuestion].correctAnswer
                              ? "bg-green-100 text-green-600"
                              : "bg-red-100 text-red-600"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {selectedAnswer === index ? (
                          index === questions[currentQuestion].correctAnswer ? (
                            <CheckCircle2 className="h-4 w-4" />
                          ) : (
                            <XCircle className="h-4 w-4" />
                          )
                        ) : (
                          <span className="text-sm">{String.fromCharCode(65 + index)}</span>
                        )}
                      </div>
                      {option}
                    </div>
                  </button>
                ))}
              </div>

              {isAnswered && (
                <div
                  className={`mt-4 p-4 rounded-lg ${
                    selectedAnswer === questions[currentQuestion].correctAnswer
                      ? "bg-green-50 border border-green-100"
                      : "bg-red-50 border border-red-100"
                  }`}
                >
                  <p className="text-sm">{feedbackMessage}</p>
                </div>
              )}

              {isAnswered && (
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={handleNextQuestion}
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors"
                  >
                    {currentQuestion < questions.length - 1 ? (
                      <span className="flex items-center">
                        Próxima questão
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </span>
                    ) : (
                      "Ver resultados"
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart className="h-8 w-8 text-blue-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Resultados da Avaliação</h2>
              <p className="text-gray-600">Você completou a avaliação em {formatTime(timer)}</p>
            </div>

            <div className="flex justify-center items-center gap-8 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-500">{score}</div>
                <div className="text-sm text-gray-500">Acertos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-500">{questions.length}</div>
                <div className="text-sm text-gray-500">Questões</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-800">{calculateFinalGrade()}%</div>
                <div className="text-sm text-gray-500">Nota final</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <MagneticButton onClick={resetQuiz}>
                Refazer Avaliação
              </MagneticButton>
              <MagneticButton href="/provas">
                Voltar para Provas
              </MagneticButton>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 