"use client"

import { Baby, Brain, Droplets, HeartPulse, Stethoscope } from "lucide-react"
import Link from "next/link"
import { FadeIn } from "@/components/animations/fade-in"
import { StaggerContainer } from "@/components/animations/stagger-container"
import { StaggerItem } from "@/components/animations/stagger-item"

export default function TemasPage() {
  const topics = [
    {
      id: "reflexos-0-6",
      title: "Reflexos de 0 a 6 meses",
      description: "Estudo dos reflexos primitivos e sua evolução nos primeiros 6 meses de vida.",
      icon: <Baby className="h-10 w-10 text-[#6EC1E4]" />,
      href: "/temas/reflexos-0-6",
    },
    {
      id: "reflexos-7-15",
      title: "Reflexos de 7 a 15 meses",
      description: "Desenvolvimento dos reflexos em bebês de 7 a 15 meses de idade.",
      icon: <Baby className="h-10 w-10 text-[#B9A9FF]" />,
      href: "/temas/reflexos-7-15",
    },
    {
      id: "reacoes-0-15",
      title: "Reações de 0 a 15 meses",
      description: "Reações posturais e de equilíbrio durante o primeiro ano de vida.",
      icon: <HeartPulse className="h-10 w-10 text-[#6EC1E4]" />,
      href: "/temas/reacoes-0-15",
    },
    {
      id: "escala-avaliacao",
      title: "Escala de avaliação neonatal",
      description: "Métodos e escalas para avaliação do desenvolvimento neonatal.",
      icon: <Stethoscope className="h-10 w-10 text-[#A8E6CF]" />,
      href: "/temas/escala-avaliacao",
    },
    {
      id: "dor-neonatal",
      title: "Dor neonatal",
      description: "Avaliação e manejo da dor em recém-nascidos e prematuros.",
      icon: <HeartPulse className="h-10 w-10 text-[#FF6B6B]" />,
      href: "/temas/dor-neonatal",
    },
    {
      id: "metodo-canguru",
      title: "Método Canguru",
      description: "Benefícios e aplicação do método canguru em neonatos.",
      icon: <Baby className="h-10 w-10 text-[#A8E6CF]" />,
      href: "/temas/metodo-canguru",
    },
    {
      id: "hidroterapia",
      title: "Hidroterapia em neonatos",
      description: "Técnicas e benefícios da hidroterapia para bebês prematuros e recém-nascidos.",
      icon: <Droplets className="h-10 w-10 text-[#6EC1E4]" />,
      href: "/temas/hidroterapia",
    },
    {
      id: "sequelas-neurologicas",
      title: "Sequelas de doenças neurológicas em prematuros",
      description: "Identificação e tratamento de sequelas neurológicas em bebês prematuros.",
      icon: <Brain className="h-10 w-10 text-[#B9A9FF]" />,
      href: "/temas/sequelas-neurologicas",
    },
    {
      id: "sequelas-pulmonares",
      title: "Sequelas de doenças pulmonares em prematuros",
      description: "Abordagem fisioterapêutica para sequelas pulmonares em prematuros.",
      icon: <Stethoscope className="h-10 w-10 text-[#6EC1E4]" />,
      href: "/temas/sequelas-pulmonares",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <FadeIn className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-[#333333] mb-4">
          Temas de Fisioterapia Neonatal e Pediátrica
        </h1>
        <p className="text-lg text-[#666666]">
          Explore nossos conteúdos educacionais sobre fisioterapia neonatal e pediátrica, organizados por temas
          específicos.
        </p>
      </FadeIn>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic, index) => (
          <StaggerItem key={topic.id}>
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 border border-[#E0E0E0] h-full transform hover:-translate-y-1">
              <Link href={topic.href} className="block h-full">
                <div className="flex flex-col h-full">
                  <div className="flex items-center mb-3">
                    <div className="p-2 bg-[#F0F9FF] rounded-lg mr-3">{topic.icon}</div>
                    <h3 className="text-xl font-semibold text-[#333333]">{topic.title}</h3>
                  </div>
                  <p className="text-sm text-[#666666] flex-grow">{topic.description}</p>
                  <div className="mt-4 text-[#6EC1E4] text-sm font-medium flex items-center group">
                    <span>Saiba mais</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  )
}
