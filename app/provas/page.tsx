"use client"

import Link from "next/link"
import { Baby, Brain, Droplets, HeartPulse, Stethoscope } from "lucide-react"
import { FadeIn } from "@/components/animations/fade-in"
import { StaggerContainer } from "@/components/animations/stagger-container"
import { StaggerItem } from "@/components/animations/stagger-item"

export default function ProvasPage() {
  const quizzes = [
    {
      id: "reflexos-0-6",
      title: "Reflexos de 0 a 6 meses",
      icon: <Baby className="h-8 w-8 text-[#6EC1E4]" />,
      href: "/provas/reflexos-0-6",
    },
    {
      id: "reflexos-7-15",
      title: "Reflexos de 7 a 15 meses",
      icon: <Baby className="h-8 w-8 text-[#B9A9FF]" />,
      href: "/provas/reflexos-7-15",
    },
    {
      id: "reacoes-0-15",
      title: "Reações de 0 a 15 meses",
      icon: <HeartPulse className="h-8 w-8 text-[#6EC1E4]" />,
      href: "/provas/reacoes-0-15",
    },
    {
      id: "escala-avaliacao",
      title: "Escala de avaliação neonatal",
      icon: <Stethoscope className="h-8 w-8 text-[#A8E6CF]" />,
      href: "/provas/escala-avaliacao",
    },
    {
      id: "dor-neonatal",
      title: "Dor neonatal",
      icon: <HeartPulse className="h-8 w-8 text-[#FF6B6B]" />,
      href: "/provas/dor-neonatal",
    },
    {
      id: "metodo-canguru",
      title: "Método Canguru",
      icon: <Baby className="h-8 w-8 text-[#A8E6CF]" />,
      href: "/provas/metodo-canguru",
    },
    {
      id: "hidroterapia",
      title: "Hidroterapia em neonatos",
      icon: <Droplets className="h-8 w-8 text-[#6EC1E4]" />,
      href: "/provas/hidroterapia",
    },
    {
      id: "sequelas-neurologicas",
      title: "Sequelas de doenças neurológicas em prematuros",
      icon: <Brain className="h-8 w-8 text-[#B9A9FF]" />,
      href: "/provas/sequelas-neurologicas",
    },
    {
      id: "sequelas-pulmonares",
      title: "Sequelas de doenças pulmonares em prematuros",
      icon: <Stethoscope className="h-8 w-8 text-[#6EC1E4]" />,
      href: "/provas/sequelas-pulmonares",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <FadeIn className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-[#333333] mb-4">Provas Temáticas</h1>
        <p className="text-lg text-[#666666]">
          Teste seus conhecimentos em fisioterapia neonatal e pediátrica com nossas provas temáticas.
        </p>
        <div className="mt-6">
          <Link
            href="/prova-geral"
            className="px-6 py-3 bg-[#B9A9FF] text-white rounded-lg hover:bg-[#A090E0] transition-colors inline-block"
          >
            Ir para Prova Geral
          </Link>
        </div>
      </FadeIn>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quizzes.map((quiz, index) => (
          <StaggerItem key={quiz.id}>
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-4 border border-[#E0E0E0]">
              <Link href={quiz.href} className="flex items-center gap-4">
                <div className="p-2 bg-[#F0F9FF] rounded-lg">{quiz.icon}</div>
                <h3 className="font-medium text-[#333333]">{quiz.title}</h3>
              </Link>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  )
}
