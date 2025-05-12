"use client"

import { useState } from "react"
import { notFound } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, CheckCircle2, XCircle } from "lucide-react"
import Link from "next/link"
import { Baby, Brain, Droplets, HeartPulse, Stethoscope } from "lucide-react"

interface QuizPageProps {
  params: {
    slug: string
  }
}

export default function QuizPage({ params }: QuizPageProps) {
  const { slug } = params

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [feedbackMessage, setFeedbackMessage] = useState("")

  const quizzes = [
    {
      id: "reflexos-0-6",
      title: "Reflexos de 0 a 6 meses",
      icon: <Baby className="h-10 w-10 text-[#6EC1E4]" />,
      questions: [
        {
          question: "Qual reflexo primitivo normalmente desaparece por volta dos 3 meses de idade?",
          options: ["Reflexo de Moro", "Reflexo de Preensão Palmar", "Reflexo de Sucção", "Reflexo de Galant"],
          correctAnswer: 0,
          explanation: "O Reflexo de Moro (reflexo de susto) normalmente desaparece por volta dos 3 meses de idade.",
        },
        {
          question: "O reflexo tônico cervical assimétrico (RTCA) é normalmente observado até qual idade?",
          options: ["1 mês", "3 meses", "6 meses", "9 meses"],
          correctAnswer: 2,
          explanation: "O reflexo tônico cervical assimétrico (RTCA) geralmente persiste até os 6 meses de idade.",
        },
        {
          question:
            "Qual reflexo está relacionado à resposta de proteção quando o bebê é movido rapidamente para baixo?",
          options: ["Reflexo de Landau", "Reflexo de Moro", "Reflexo de Galant", "Reflexo de Babinski"],
          correctAnswer: 1,
          explanation:
            "O Reflexo de Moro é uma resposta de proteção quando o bebê é movido rapidamente para baixo, caracterizado pela extensão e abdução dos braços seguida de flexão.",
        },
        {
          question: "O reflexo de preensão plantar normalmente persiste até qual idade?",
          options: ["3 meses", "6 meses", "9 meses", "12 meses"],
          correctAnswer: 3,
          explanation: "O reflexo de preensão plantar normalmente persiste até aproximadamente 12 meses de idade.",
        },
        {
          question: "Qual reflexo é testado ao estimular a lateral da coluna do bebê, causando flexão do tronco?",
          options: ["Reflexo de Galant", "Reflexo de Landau", "Reflexo de Babinski", "Reflexo de Moro"],
          correctAnswer: 0,
          explanation:
            "O Reflexo de Galant é testado estimulando a lateral da coluna do bebê, o que causa flexão do tronco para o lado estimulado.",
        },
      ],
    },
    // Outros quizzes seriam definidos aqui
    {
      id: "reflexos-7-15",
      title: "Reflexos de 7 a 15 meses",
      icon: <Baby className="h-10 w-10 text-[#B9A9FF]" />,
      questions: [
        {
          question: "Pergunta exemplo sobre reflexos de 7 a 15 meses",
          options: ["Opção 1", "Opção 2", "Opção 3", "Opção 4"],
          correctAnswer: 0,
          explanation: "Explicação da resposta correta.",
        },
      ],
    },
    {
      id: "reacoes-0-15",
      title: "Reações de 0 a 15 meses",
      icon: <HeartPulse className="h-10 w-10 text-[#6EC1E4]" />,
      questions: [
        {
          question: "Pergunta exemplo sobre reações de 0 a 15 meses",
          options: ["Opção 1", "Opção 2", "Opção 3", "Opção 4"],
          correctAnswer: 0,
          explanation: "Explicação da resposta correta.",
        },
      ],
    },
    {
      id: "escala-avaliacao",
      title: "Escala de avaliação neonatal",
      icon: <Stethoscope className="h-10 w-10 text-[#A8E6CF]" />,
      questions: [
        {
          question: "Pergunta exemplo sobre escala de avaliação neonatal",
          options: ["Opção 1", "Opção 2", "Opção 3", "Opção 4"],
          correctAnswer: 0,
          explanation: "Explicação da resposta correta.",
        },
      ],
    },
    {
      id: "dor-neonatal",
      title: "Dor neonatal",
      icon: <HeartPulse className="h-10 w-10 text-[#FF6B6B]" />,
      questions: [
        {
          question: "Pergunta exemplo sobre dor neonatal",
          options: ["Opção 1", "Opção 2", "Opção 3", "Opção 4"],
          correctAnswer: 0,
          explanation: "Explicação da resposta correta.",
        },
      ],
    },
    {
      id: "metodo-canguru",
      title: "Método Canguru",
      icon: <Baby className="h-10 w-10 text-[#A8E6CF]" />,
      questions: [
        {
          question: "Pergunta exemplo sobre método canguru",
          options: ["Opção 1", "Opção 2", "Opção 3", "Opção 4"],
          correctAnswer: 0,
          explanation: "Explicação da resposta correta.",
        },
      ],
    },
    {
      id: "hidroterapia",
      title: "Hidroterapia em neonatos",
      icon: <Droplets className="h-10 w-10 text-[#6EC1E4]" />,
      questions: [
        {
          question: "Pergunta exemplo sobre hidroterapia em neonatos",
          options: ["Opção 1", "Opção 2", "Opção 3", "Opção 4"],
          correctAnswer: 0,
          explanation: "Explicação da resposta correta.",
        },
      ],
    },
    {
      id: "sequelas-neurologicas",
      title: "Sequelas de doenças neurológicas em prematuros",
      icon: <Brain className="h-10 w-10 text-[#B9A9FF]" />,
      questions: [
        {
          question: "Pergunta exemplo sobre sequelas neurológicas",
          options: ["Opção 1", "Opção 2", "Opção 3", "Opção 4"],
          correctAnswer: 0,
          explanation: "Explicação da resposta correta.",
        },
      ],
    },
    {
      id: "sequelas-pulmonares",
      title: "Sequelas de doenças pulmonares em prematuros",
      icon: <Stethoscope className="h-10 w-10 text-[#6EC1E4]" />,
      questions: [
        {
          question: "Pergunta exemplo sobre sequelas pulmonares",
          options: ["Opção 1", "Opção 2", "Opção 3", "Opção 4"],
          correctAnswer: 0,
          explanation: "Explicação da resposta correta.",
        },
      ],
    },
  ]

  const quiz = quizzes.find((q) => q.id === slug)

  if (!quiz) {
    notFound()
  }

  const handleAnswerSelect = (index: number) => {
    if (isAnswered) return

    setSelectedAnswer(index)
    setIsAnswered(true)

    if (index === quiz.questions[currentQuestion].correctAnswer) {
      setScore(score + 1)
      setFeedbackMessage("Correto! " + quiz.questions[currentQuestion].explanation)
    } else {
      setFeedbackMessage(
        "Incorreto. A resposta correta é: " +
          quiz.questions[currentQuestion].options[quiz.questions[currentQuestion].correctAnswer] +
          ". " +
          quiz.questions[currentQuestion].explanation,
      )
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setIsAnswered(false)
      setFeedbackMessage("")
    } else {
      setShowResults(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setIsAnswered(false)
    setScore(0)
    setShowResults(false)
    setFeedbackMessage("")
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  const slideIn = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 },
    },
    exit: {
      opacity: 0,
      x: -50,
      transition: { duration: 0.3 },
    },
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Link
        href="/provas"
        className="inline-flex items-center text-[#666666] hover:text-[#6EC1E4] mb-8 transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Voltar para Provas
      </Link>

      <motion.div initial="hidden" animate="visible" variants={fadeIn} className="max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-[#F0F9FF] rounded-lg">{quiz.icon}</div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#333333]">Prova: {quiz.title}</h1>
        </div>

        {!showResults ? (
          <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 border border-[#E0E0E0]">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-[#666666]">
                  Questão {currentQuestion + 1} de {quiz.questions.length}
                </span>
                <span className="text-sm font-medium text-[#6EC1E4]">Pontuação: {score}</span>
              </div>
              <div className="w-full bg-[#E0E0E0] rounded-full h-2">
                <div
                  className="bg-[#6EC1E4] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={currentQuestion} initial="hidden" animate="visible" exit="exit" variants={slideIn}>
                <h2 className="text-xl font-medium text-[#333333] mb-6">{quiz.questions[currentQuestion].question}</h2>

                <div className="space-y-3">
                  {quiz.questions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                        selectedAnswer === index
                          ? index === quiz.questions[currentQuestion].correctAnswer
                            ? "border-[#4CAF50] bg-[#F0FFF0]"
                            : "border-[#FF6B6B] bg-[#FFF0F0]"
                          : "border-[#E0E0E0] hover:border-[#6EC1E4] hover:bg-[#F0F9FF]"
                      }`}
                      disabled={isAnswered}
                    >
                      <div className="flex items-center justify-between">
                        <span>{option}</span>
                        {isAnswered &&
                          (index === quiz.questions[currentQuestion].correctAnswer ? (
                            <CheckCircle2 className="h-5 w-5 text-[#4CAF50]" />
                          ) : selectedAnswer === index ? (
                            <XCircle className="h-5 w-5 text-[#FF6B6B]" />
                          ) : null)}
                      </div>
                    </button>
                  ))}
                </div>

                {isAnswered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 rounded-lg border border-[#E0E0E0] bg-[#F9F9F9]"
                  >
                    <p
                      className={
                        selectedAnswer === quiz.questions[currentQuestion].correctAnswer
                          ? "text-[#4CAF50]"
                          : "text-[#FF6B6B]"
                      }
                    >
                      {feedbackMessage}
                    </p>
                  </motion.div>
                )}

                {isAnswered && (
                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={handleNextQuestion}
                      className="px-6 py-3 bg-gradient-to-r from-[#6EC1E4] to-[#B9A9FF] hover:from-[#5BA8CB] hover:to-[#A090E0] text-white rounded-lg transition-colors"
                    >
                      {currentQuestion < quiz.questions.length - 1 ? "Próxima Questão" : "Ver Resultados"}
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="bg-white rounded-xl shadow-sm p-6 md:p-8 border border-[#E0E0E0] text-center"
          >
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-[#333333] mb-2">Resultados da Prova</h2>
              <p className="text-[#666666]">
                Você acertou {score} de {quiz.questions.length} questões
              </p>
            </div>

            <div className="mb-8">
              <div className="w-full bg-[#E0E0E0] rounded-full h-4 mb-2">
                <div
                  className={`h-4 rounded-full transition-all duration-1000 ${
                    score / quiz.questions.length >= 0.7
                      ? "bg-[#4CAF50]"
                      : score / quiz.questions.length >= 0.4
                        ? "bg-[#FFC107]"
                        : "bg-[#FF6B6B]"
                  }`}
                  style={{ width: `${(score / quiz.questions.length) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-[#666666]">
                {score / quiz.questions.length >= 0.7
                  ? "Excelente! Você domina bem este tema."
                  : score / quiz.questions.length >= 0.4
                    ? "Bom trabalho! Mas ainda há espaço para melhorar."
                    : "Continue estudando este tema para melhorar seu conhecimento."}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={resetQuiz}
                className="px-6 py-3 bg-gradient-to-r from-[#6EC1E4] to-[#B9A9FF] hover:from-[#5BA8CB] hover:to-[#A090E0] text-white rounded-lg transition-colors"
              >
                Tentar Novamente
              </button>
              <Link
                href={`/temas/${slug}`}
                className="px-6 py-3 bg-white border border-[#6EC1E4] text-[#6EC1E4] rounded-lg hover:bg-[#F0F9FF] transition-colors"
              >
                Revisar Conteúdo
              </Link>
              <Link
                href="/provas"
                className="px-6 py-3 bg-white border border-[#E0E0E0] text-[#666666] rounded-lg hover:bg-[#F5F5F5] transition-colors"
              >
                Outras Provas
              </Link>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
