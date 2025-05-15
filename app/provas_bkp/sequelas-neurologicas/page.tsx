"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"

export default function SequelasNeurologicasPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [feedbackMessage, setFeedbackMessage] = useState("")
  const [timer, setTimer] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(true)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isTimerRunning])

  const questions = [
    {
      question: "Quais são os principais fatores de risco perinatais associados ao desenvolvimento de paralisia cerebral em recém-nascidos prematuros?",
      options: [
        "Apenas baixo peso ao nascer e idade gestacional",
        "Somente infecções maternas durante a gestação",
        "Hemorragia peri-intraventricular grau III/IV, leucomalácia periventricular, asfixia grave e infecções do SNC",
        "Exclusivamente fatores genéticos e malformações congênitas"
      ],
      correctAnswer: 2,
      explanation: "Os principais fatores de risco perinatais para paralisia cerebral em prematuros incluem hemorragia peri-intraventricular graus III/IV, leucomalácia periventricular, asfixia grave e infecções do SNC. Estas condições podem causar lesões significativas no sistema nervoso central em desenvolvimento, levando a déficits motores permanentes."
    },
    {
      question: "Como se caracteriza o padrão típico de desenvolvimento motor em um prematuro com diplegia espástica nos primeiros 18 meses de vida?",
      options: [
        "Desenvolvimento motor normal até 6 meses, seguido de regressão",
        "Atraso motor global desde o nascimento, sem padrão específico",
        "Atraso predominante em membros superiores com desenvolvimento normal de membros inferiores",
        "Atraso mais acentuado em membros inferiores, com hipertonia progressiva e padrão em tesoura"
      ],
      correctAnswer: 3,
      explanation: "Na diplegia espástica, observa-se um atraso mais acentuado no desenvolvimento motor dos membros inferiores, com hipertonia progressiva e tendência ao padrão em tesoura. Os marcos motores são atingidos com atraso, especialmente aqueles que dependem do controle dos membros inferiores, como sentar sem apoio, engatinhar e andar."
    },
    {
      question: "Quais são os sinais precoces de alteração do desenvolvimento visual que devem ser investigados em prematuros com leucomalácia periventricular?",
      options: [
        "Apenas estrabismo após 6 meses",
        "Alterações do comportamento visual, dificuldade de fixação e seguimento, nistagmo e estrabismo precoce",
        "Somente alterações de refração",
        "Exclusivamente alterações de campo visual após 1 ano"
      ],
      correctAnswer: 1,
      explanation: "Em prematuros com leucomalácia periventricular, deve-se investigar precocemente alterações do comportamento visual, dificuldade de fixação e seguimento visual, presença de nistagmo e estrabismo precoce. Estas alterações podem indicar comprometimento das vias visuais posteriores e necessitam de intervenção precoce."
    },
    {
      question: "Qual é a abordagem terapêutica mais adequada para um prematuro com sinais de hemiparesia espástica identificada aos 6 meses de idade corrigida?",
      options: [
        "Apenas orientações aos pais sobre posicionamento",
        "Esperar até 1 ano para iniciar qualquer intervenção",
        "Intervenção precoce com abordagem multidisciplinar, incluindo fisioterapia, terapia ocupacional e orientação familiar",
        "Somente medicações para controle do tônus muscular"
      ],
      correctAnswer: 2,
      explanation: "A abordagem mais adequada é a intervenção precoce multidisciplinar, incluindo fisioterapia, terapia ocupacional e orientação familiar. O tratamento deve focar na prevenção de deformidades, estimulação do desenvolvimento neuropsicomotor, facilitação do uso do lado afetado e orientação aos pais sobre manejo e estimulação adequada."
    },
    {
      question: "Quais são os critérios para indicação de toxina botulínica em prematuros com espasticidade e qual a idade mínima recomendada para a primeira aplicação?",
      options: [
        "Qualquer grau de espasticidade, independente da idade",
        "Espasticidade moderada a grave, interferindo na funcionalidade, após 18-24 meses",
        "Somente após 5 anos de idade, independente do grau de espasticidade",
        "Apenas em casos de deformidades já estabelecidas"
      ],
      correctAnswer: 1,
      explanation: "A toxina botulínica é indicada em casos de espasticidade moderada a grave que interfere na funcionalidade, sendo recomendada após 18-24 meses de idade. Os critérios incluem: espasticidade focal ou multifocal que limita a função, ausência de contraturas fixas, bom controle de tronco, e capacidade de participar do programa de reabilitação pós-aplicação."
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

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
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

        <div className="max-w-3xl mx-auto">
          {!showResults ? (
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                  <h1 className="text-2xl font-bold text-gray-800">Sequelas Neurológicas</h1>
                  <div className="text-sm font-medium text-gray-500">
                    Tempo: {formatTime(timer)}
                  </div>
                </div>

                <div className="mb-4 bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-[#6EC1E4] to-[#5BA8CB] h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  ></div>
                </div>

                <div className="mb-4">
                  <span className="text-sm font-medium text-gray-500">
                    Questão {currentQuestion + 1} de {questions.length}
                  </span>
                </div>

                <div className="space-y-6">
                  <h2 className="text-lg font-medium text-gray-900">
                    {questions[currentQuestion].question}
                  </h2>

                  <div className="space-y-3">
                    {questions[currentQuestion].options.map((option, index) => (
                      <motion.button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={isAnswered}
                        className={`w-full text-left p-4 rounded-lg border transition-all ${
                          selectedAnswer === index
                            ? index === questions[currentQuestion].correctAnswer
                              ? "bg-green-50 border-green-200 text-green-800"
                              : "bg-red-50 border-red-200 text-red-800"
                            : "border-gray-200 hover:border-[#6EC1E4]/30 hover:bg-[#6EC1E4]/5"
                        }`}
                        whileHover={!isAnswered ? { scale: 1.01 } : {}}
                        whileTap={!isAnswered ? { scale: 0.99 } : {}}
                      >
                        {option}
                      </motion.button>
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

                      <button
                        onClick={handleNextQuestion}
                        className="mt-4 w-full bg-[#6EC1E4] text-white py-3 px-6 rounded-lg hover:bg-[#5BA8CB] transition-colors"
                      >
                        {currentQuestion === questions.length - 1
                          ? "Ver resultados"
                          : "Próxima questão"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Resultados</h2>
                <div className="space-y-4">
                  <p className="text-lg">
                    Pontuação: {score} de {questions.length} ({calculateFinalGrade()}%)
                  </p>
                  <p className="text-lg">Tempo total: {formatTime(timer)}</p>
                  <button
                    onClick={resetQuiz}
                    className="w-full bg-[#6EC1E4] text-white py-3 px-6 rounded-lg hover:bg-[#5BA8CB] transition-colors"
                  >
                    Tentar novamente
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 