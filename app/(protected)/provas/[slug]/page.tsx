"use client"

import React, { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, CheckCircle2, XCircle, BarChart, ChevronRight, AlarmClock } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { MagneticButton } from "@/components/ui/magnetic-button"

const questionsData = {
  "reflexos-0-6": [
    {
      question: "Qual é a importância do reflexo de Moro na avaliação neurológica do recém-nascido de 0-6 meses?",
      options: [
        "Apenas indica maturidade pulmonar",
        "Avalia integridade do sistema nervoso e desenvolvimento neuromotor",
        "Não tem relevância clínica",
        "Só avalia força muscular"
      ],
      correctAnswer: 1,
      explanation: "O reflexo de Moro é um importante indicador da integridade do sistema nervoso central e do desenvolvimento neuromotor adequado. Sua ausência ou assimetria pode indicar problemas neurológicos significativos."
    },
    {
      question: "Como deve ser realizada a avaliação do reflexo de preensão palmar?",
      options: [
        "Estimulando a planta do pé",
        "Pressionando a palma da mão com um objeto",
        "Batendo no joelho",
        "Girando a cabeça do bebê"
      ],
      correctAnswer: 1,
      explanation: "O reflexo de preensão palmar é avaliado através do estímulo da palma da mão do bebê com um objeto ou dedo do examinador, provocando o fechamento dos dedos. Este reflexo é importante para o desenvolvimento da manipulação de objetos."
    }
  ],
  "reflexos-7-15": [
    {
      question: "Como se caracteriza a evolução normal do reflexo tônico cervical assimétrico entre 7-15 meses?",
      options: [
        "Deve permanecer forte e presente",
        "Deve desaparecer gradualmente",
        "Não tem importância nessa idade",
        "Deve aumentar de intensidade"
      ],
      correctAnswer: 1,
      explanation: "O reflexo tônico cervical assimétrico deve diminuir gradualmente e desaparecer nesta faixa etária, dando lugar a movimentos voluntários mais maduros. Sua persistência pode indicar problemas no desenvolvimento neuromotor."
    },
    {
      question: "Qual é a importância da avaliação do reflexo de proteção (paraquedas) nesta faixa etária?",
      options: [
        "Não é relevante nessa idade",
        "Indica maturidade do controle postural e proteção",
        "Só avalia força muscular",
        "É um reflexo primitivo que deve desaparecer"
      ],
      correctAnswer: 1,
      explanation: "O reflexo de proteção é crucial nesta idade pois indica a maturidade do controle postural e mecanismos de proteção. Sua presença adequada é importante para a segurança durante a exploração do ambiente."
    }
  ],
  "reacoes-0-15": [
    {
      question: "Como se desenvolve a reação de retificação labiríntica de 0-15 meses?",
      options: [
        "Não se modifica durante este período",
        "Evolui progressivamente com o desenvolvimento do controle cervical",
        "Deve estar ausente nesta idade",
        "Só aparece após os 2 anos"
      ],
      correctAnswer: 1,
      explanation: "A reação de retificação labiríntica evolui progressivamente com o desenvolvimento do controle cervical, sendo fundamental para o alinhamento da cabeça no espaço e desenvolvimento do controle postural."
    },
    {
      question: "Qual é a importância da reação de equilíbrio em prono?",
      options: [
        "Não tem relevância funcional",
        "Fundamental para o desenvolvimento do controle postural e mobilidade",
        "Só importante após 2 anos",
        "Deve ser inibida"
      ],
      correctAnswer: 1,
      explanation: "A reação de equilíbrio em prono é fundamental para o desenvolvimento do controle postural e mobilidade, permitindo ao bebê manter e recuperar o equilíbrio durante a exploração do ambiente."
    }
  ]
}

export default function TestePage() {
  const { slug } = useParams()
  const questions = questionsData[slug as keyof typeof questionsData] || []
  
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

  const getTestTitle = () => {
    switch(slug) {
      case 'reflexos-0-6':
        return 'Reflexos Primitivos (0-6 meses)'
      case 'reflexos-7-15':
        return 'Reflexos Primitivos (7-15 meses)'
      case 'reacoes-0-15':
        return 'Reações Posturais (0-15 meses)'
      default:
        return 'Teste'
    }
  }

  if (!questions.length) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pb-20">
        <div className="container mx-auto px-6 py-8">
          <Link href="/provas" className="inline-flex items-center text-blue-500 hover:text-blue-600 mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span>Voltar para provas</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">Teste não encontrado</h1>
        </div>
      </div>
    )
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
              <h1 className="text-2xl font-bold text-gray-800 mb-2">{getTestTitle()}</h1>
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
                      <span className="text-gray-700">{option}</span>
                    </div>
                  </button>
                ))}
              </div>

              {isAnswered && (
                <div className="mt-6">
                  <div
                    className={`p-4 rounded-lg ${
                      selectedAnswer === questions[currentQuestion].correctAnswer
                        ? "bg-green-50 text-green-800"
                        : "bg-red-50 text-red-800"
                    }`}
                  >
                    {feedbackMessage}
                  </div>
                  <MagneticButton
                    onClick={handleNextQuestion}
                    className="mt-4 w-full bg-blue-500 text-white rounded-lg p-4 flex items-center justify-center hover:bg-blue-600 transition-colors"
                  >
                    {currentQuestion < questions.length - 1 ? (
                      <>
                        <span>Próxima Questão</span>
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </>
                    ) : (
                      "Ver Resultados"
                    )}
                  </MagneticButton>
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