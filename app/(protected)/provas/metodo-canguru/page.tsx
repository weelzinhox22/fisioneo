"use client"

import React, { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, CheckCircle2, XCircle, BarChart, ChevronRight, AlarmClock } from "lucide-react"
import Link from "next/link"
import { MagneticButton } from "@/components/ui/magnetic-button"

export default function MetodoCanguruPage() {
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
      question: "Quais são os critérios clínicos essenciais para um recém-nascido iniciar a primeira etapa do Método Canguru na UTI Neonatal?",
      options: [
        "Peso acima de 2000g e ausência de suporte ventilatório",
        "Estabilidade clínica, peso mínimo de 1250g e nutrição enteral plena",
        "Estabilidade clínica independente do peso e adaptação à ventilação mecânica",
        "Apenas estabilidade respiratória e hemodinâmica, sem outros critérios"
      ],
      correctAnswer: 2,
      explanation: "A primeira etapa do Método Canguru pode ser iniciada assim que o recém-nascido apresente estabilidade clínica, independentemente do peso ou necessidade de suporte ventilatório. O importante é que a equipe avalie a segurança para realizar o posicionamento canguru, mesmo em bebês em ventilação mecânica, desde que estejam clinicamente estáveis."
    },
    {
      question: "Quais são os benefícios comprovados do Método Canguru para o desenvolvimento neurológico do recém-nascido prematuro?",
      options: [
        "Apenas regulação térmica e ganho de peso",
        "Melhora do sono e redução do estresse, sem impacto no desenvolvimento",
        "Organização comportamental, maturação do sistema nervoso autônomo e melhor desenvolvimento neuropsicomotor",
        "Somente benefícios relacionados ao vínculo mãe-bebê"
      ],
      correctAnswer: 2,
      explanation: "O Método Canguru promove benefícios neurológicos significativos, incluindo melhor organização comportamental, maturação do sistema nervoso autônomo e desenvolvimento neuropsicomotor. O contato pele a pele estimula a liberação de hormônios e neurotransmissores que favorecem a neuroplasticidade, além de proporcionar estímulos sensoriais adequados ao desenvolvimento cerebral."
    },
    {
      question: "Na segunda etapa do Método Canguru, qual é a recomendação quanto ao tempo mínimo diário de posição canguru?",
      options: [
        "30 minutos, duas vezes ao dia",
        "1 hora contínua, três vezes ao dia",
        "Posição canguru intermitente, sem tempo mínimo estabelecido",
        "Permanência contínua na posição canguru por pelo menos 4 horas ininterruptas"
      ],
      correctAnswer: 1,
      explanation: "Na segunda etapa do Método Canguru, recomenda-se que o bebê permaneça em posição canguru por pelo menos 1 hora contínua, três vezes ao dia. Este tempo é considerado o mínimo necessário para garantir os benefícios fisiológicos e comportamentais do método, permitindo ciclos completos de sono e regulação dos sistemas corporais."
    },
    {
      question: "Quais são os critérios de alta hospitalar para a terceira etapa do Método Canguru?",
      options: [
        "Peso mínimo de 2500g, independente de outros fatores",
        "Peso mínimo de 1600g, ganho de peso adequado, mãe segura e vínculo estabelecido",
        "Apenas amamentação exclusiva e ganho de peso adequado",
        "Somente estabilidade clínica e ausência de complicações"
      ],
      correctAnswer: 1,
      explanation: "Os critérios de alta para a terceira etapa incluem: peso mínimo de 1600g, ganho de peso adequado nos últimos dias, amamentação bem estabelecida, mãe segura e motivada para dar continuidade aos cuidados em casa, e vínculo família-bebê estabelecido. Além disso, a família deve ter condições de comparecer ao follow-up e acesso ao serviço de saúde caso necessário."
    },
    {
      question: "Qual é o impacto do Método Canguru na amamentação e no ganho de peso do recém-nascido prematuro?",
      options: [
        "Não influencia a amamentação ou o ganho de peso",
        "Aumenta apenas a produção de leite materno, sem impacto no ganho de peso",
        "Favorece a amamentação exclusiva e promove melhor ganho de peso através da regulação térmica e metabólica",
        "Melhora apenas o ganho de peso, sem efeito na amamentação"
      ],
      correctAnswer: 2,
      explanation: "O Método Canguru tem impacto positivo tanto na amamentação quanto no ganho de peso. O contato pele a pele estimula a produção de leite materno, favorece o estabelecimento da amamentação exclusiva e promove melhor ganho de peso através da regulação térmica e metabólica. A proximidade constante facilita a amamentação sob livre demanda e o contato precoce estimula reflexos de sucção e deglutição."
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
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Avaliação sobre Método Canguru</h1>
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