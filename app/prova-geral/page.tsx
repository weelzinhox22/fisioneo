"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, CheckCircle2, XCircle } from "lucide-react"
import Link from "next/link"

export default function ProvaGeralPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [feedbackMessage, setFeedbackMessage] = useState("")

  // Exemplo de perguntas para a prova geral
  const questions = [
    {
      question: "Qual reflexo primitivo normalmente desaparece por volta dos 3 meses de idade?",
      options: ["Reflexo de Moro", "Reflexo de Preensão Palmar", "Reflexo de Sucção", "Reflexo de Galant"],
      correctAnswer: 0,
      category: "Reflexos de 0 a 6 meses",
      explanation: "O Reflexo de Moro (reflexo de susto) normalmente desaparece por volta dos 3 meses de idade.",
    },
    {
      question: "Qual é a principal característica do Método Canguru?",
      options: [
        "Uso de incubadoras especiais",
        "Contato pele a pele entre o bebê e os pais",
        "Administração de medicamentos específicos",
        "Uso de equipamentos de monitoramento avançados",
      ],
      correctAnswer: 1,
      category: "Método Canguru",
      explanation:
        "O Método Canguru é caracterizado principalmente pelo contato pele a pele entre o bebê e os pais, o que promove vínculo, regulação térmica e outros benefícios fisiológicos.",
    },
    {
      question: "Qual escala é comumente usada para avaliar a dor em recém-nascidos?",
      options: ["Escala de Apgar", "Escala de Glasgow", "Escala NIPS (Neonatal Infant Pain Scale)", "Escala de Braden"],
      correctAnswer: 2,
      category: "Dor neonatal",
      explanation:
        "A Escala NIPS (Neonatal Infant Pain Scale) é especificamente desenvolvida para avaliar a dor em recém-nascidos, considerando expressão facial, choro, padrão respiratório e outros indicadores.",
    },
    {
      question: "Qual é um benefício da hidroterapia para bebês prematuros?",
      options: [
        "Aumento da rigidez muscular",
        "Diminuição da frequência cardíaca",
        "Redução da interação sensorial",
        "Promoção do relaxamento e redução do estresse",
      ],
      correctAnswer: 3,
      category: "Hidroterapia em neonatos",
      explanation:
        "A hidroterapia promove relaxamento e redução do estresse em bebês prematuros, além de oferecer estimulação sensorial e facilitar o movimento.",
    },
    {
      question: "Qual reflexo está relacionado à resposta de proteção quando o bebê é movido rapidamente para baixo?",
      options: ["Reflexo de Landau", "Reflexo de Moro", "Reflexo de Galant", "Reflexo de Babinski"],
      correctAnswer: 1,
      category: "Reflexos de 0 a 6 meses",
      explanation:
        "O Reflexo de Moro é uma resposta de proteção quando o bebê é movido rapidamente para baixo, caracterizado pela extensão e abdução dos braços seguida de flexão.",
    },
    {
      question: "Qual é uma sequela comum de doenças neurológicas em prematuros?",
      options: ["Hipertensão arterial", "Paralisia cerebral", "Diabetes tipo 1", "Hipertireoidismo"],
      correctAnswer: 1,
      category: "Sequelas de doenças neurológicas em prematuros",
      explanation:
        "A paralisia cerebral é uma sequela neurológica comum em bebês prematuros, especialmente aqueles que sofreram hemorragia intraventricular ou leucomalácia periventricular.",
    },
    {
      question: "Qual reação postural geralmente se desenvolve por volta dos 6 meses de idade?",
      options: [
        "Reação de proteção para frente",
        "Reação de Moro",
        "Reflexo tônico cervical assimétrico",
        "Reflexo de preensão palmar",
      ],
      correctAnswer: 0,
      category: "Reações de 0 a 15 meses",
      explanation:
        "A reação de proteção para frente geralmente se desenvolve por volta dos 6 meses de idade, quando o bebê começa a estender os braços para se proteger durante quedas para frente.",
    },
    {
      question: "Qual é uma sequela respiratória comum em bebês prematuros?",
      options: ["Displasia broncopulmonar", "Tuberculose", "Pneumonia lobar", "Bronquite aguda"],
      correctAnswer: 0,
      category: "Sequelas de doenças pulmonares em prematuros",
      explanation:
        "A displasia broncopulmonar é uma sequela respiratória comum em bebês prematuros, especialmente aqueles que necessitaram de ventilação mecânica prolongada e oxigenoterapia.",
    },
    {
      question: "Qual item NÃO faz parte da escala de Apgar?",
      options: ["Frequência cardíaca", "Esforço respiratório", "Reflexos", "Temperatura corporal"],
      correctAnswer: 3,
      category: "Escala de avaliação neonatal",
      explanation:
        "A temperatura corporal não faz parte da escala de Apgar. Os cinco componentes são: frequência cardíaca, esforço respiratório, tônus muscular, irritabilidade reflexa e cor da pele.",
    },
    {
      question: "Qual reflexo normalmente persiste até os 12 meses de idade?",
      options: [
        "Reflexo de Moro",
        "Reflexo de Galant",
        "Reflexo de preensão plantar",
        "Reflexo tônico cervical assimétrico",
      ],
      correctAnswer: 2,
      category: "Reflexos de 7 a 15 meses",
      explanation:
        "O reflexo de preensão plantar normalmente persiste até aproximadamente 12 meses de idade, diferente de outros reflexos primitivos que desaparecem mais cedo.",
    },
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
          questions[currentQuestion].explanation,
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

  // Análise de resultados por categoria
  const getResultsByCategory = () => {
    const categories: Record<string, { total: number; correct: number }> = {}

    questions.forEach((question, index) => {
      const category = question.category

      if (!categories[category]) {
        categories[category] = { total: 0, correct: 0 }
      }

      categories[category].total += 1

      // Verifica se a pergunta foi respondida corretamente
      if (index < currentQuestion && questions[index].correctAnswer === selectedAnswer) {
        categories[category].correct += 1
      }
    })

    return categories
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
        <h1 className="text-3xl md:text-4xl font-bold text-[#333333] mb-8 text-center">
          Prova Geral de Fisioterapia Neonatal e Pediátrica
        </h1>

        {!showResults ? (
          <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 border border-[#E0E0E0]">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-[#666666]">
                  Questão {currentQuestion + 1} de {questions.length}
                </span>
                <span className="text-sm font-medium text-[#6EC1E4]">Pontuação: {score}</span>
              </div>
              <div className="w-full bg-[#E0E0E0] rounded-full h-2">
                <div
                  className="bg-[#6EC1E4] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={currentQuestion} initial="hidden" animate="visible" exit="exit" variants={slideIn}>
                <div className="mb-2">
                  <span className="inline-block px-3 py-1 bg-[#F0F9FF] text-[#6EC1E4] text-xs font-medium rounded-full">
                    {questions[currentQuestion].category}
                  </span>
                </div>

                <h2 className="text-xl font-medium text-[#333333] mb-6">{questions[currentQuestion].question}</h2>

                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                        selectedAnswer === index
                          ? index === questions[currentQuestion].correctAnswer
                            ? "border-[#4CAF50] bg-[#F0FFF0]"
                            : "border-[#FF6B6B] bg-[#FFF0F0]"
                          : "border-[#E0E0E0] hover:border-[#6EC1E4] hover:bg-[#F0F9FF]"
                      }`}
                      disabled={isAnswered}
                    >
                      <div className="flex items-center justify-between">
                        <span>{option}</span>
                        {isAnswered &&
                          (index === questions[currentQuestion].correctAnswer ? (
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
                        selectedAnswer === questions[currentQuestion].correctAnswer
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
                      {currentQuestion < questions.length - 1 ? "Próxima Questão" : "Ver Resultados"}
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
            className="bg-white rounded-xl shadow-sm p-6 md:p-8 border border-[#E0E0E0]"
          >
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-[#333333] mb-2">Resultados da Prova Geral</h2>
              <p className="text-[#666666]">
                Você acertou {score} de {questions.length} questões
              </p>
            </div>

            <div className="mb-8">
              <div className="w-full bg-[#E0E0E0] rounded-full h-4 mb-2">
                <div
                  className={`h-4 rounded-full transition-all duration-1000 ${
                    score / questions.length >= 0.7
                      ? "bg-[#4CAF50]"
                      : score / questions.length >= 0.4
                        ? "bg-[#FFC107]"
                        : "bg-[#FF6B6B]"
                  }`}
                  style={{ width: `${(score / questions.length) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-[#666666] text-center">
                {score / questions.length >= 0.7
                  ? "Excelente! Você tem um ótimo conhecimento em Fisioterapia Neonatal e Pediátrica."
                  : score / questions.length >= 0.4
                    ? "Bom trabalho! Mas ainda há espaço para melhorar em alguns temas."
                    : "Continue estudando para aprimorar seus conhecimentos em Fisioterapia Neonatal e Pediátrica."}
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-medium text-[#333333] mb-4">Desempenho por Categoria</h3>
              <div className="space-y-3">
                {Object.entries(getResultsByCategory()).map(([category, data]) => (
                  <div key={category} className="p-4 border border-[#E0E0E0] rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-[#333333]">{category}</span>
                      <span className="text-sm text-[#666666]">
                        {data.correct} de {data.total} ({Math.round((data.correct / data.total) * 100)}%)
                      </span>
                    </div>
                    <div className="w-full bg-[#E0E0E0] rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${
                          data.correct / data.total >= 0.7
                            ? "bg-[#4CAF50]"
                            : data.correct / data.total >= 0.4
                              ? "bg-[#FFC107]"
                              : "bg-[#FF6B6B]"
                        }`}
                        style={{ width: `${(data.correct / data.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={resetQuiz}
                className="px-6 py-3 bg-gradient-to-r from-[#6EC1E4] to-[#B9A9FF] hover:from-[#5BA8CB] hover:to-[#A090E0] text-white rounded-lg transition-colors"
              >
                Tentar Novamente
              </button>
              <Link
                href="/temas"
                className="px-6 py-3 bg-white border border-[#6EC1E4] text-[#6EC1E4] rounded-lg hover:bg-[#F0F9FF] transition-colors"
              >
                Revisar Conteúdos
              </Link>
              <Link
                href="/provas"
                className="px-6 py-3 bg-white border border-[#E0E0E0] text-[#666666] rounded-lg hover:bg-[#F5F5F5] transition-colors"
              >
                Provas Temáticas
              </Link>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
