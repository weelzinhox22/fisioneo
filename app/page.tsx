"use client"

import Link from "next/link"
import { Baby, Brain, Droplets, HeartPulse, Stethoscope } from "lucide-react"
import { FadeIn } from "@/components/animations/fade-in"
import { StaggerContainer } from "@/components/animations/stagger-container"
import { ParallaxElement } from "@/components/animations/parallax-element"
import { TransformEffect } from "@/components/animations/transform-effect"
import { Transmorph } from "@/components/animations/transmorph"
import { ZoomIn } from "@/components/animations/zoom-in"
import { Hero } from "@/app/components/Hero"

export default function Home() {
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
    <div className="relative">
      <Hero />
      
      {/* Extremely subtle gradient transition with precise control */}
      <div 
        className="h-80 w-full relative"
        style={{
          background: 'linear-gradient(to bottom, rgba(26,0,0,1) 0%, rgba(26,0,0,0.95) 5%, rgba(26,0,0,0.9) 10%, rgba(26,0,0,0.8) 15%, rgba(25,2,2,0.7) 20%, rgba(20,5,5,0.6) 25%, rgba(16,8,8,0.5) 30%, rgba(10,10,10,0.4) 40%, rgba(51,51,51,0.3) 50%, rgba(102,102,102,0.2) 60%, rgba(153,153,153,0.15) 70%, rgba(204,204,204,0.1) 80%, rgba(238,238,238,0.05) 90%, rgba(255,255,255,0) 100%)'
        }}
      />
      
      <div className="container mx-auto px-4" style={{marginTop: "-40px"}}>
        <section className="py-12 relative overflow-hidden mb-20">
          <ParallaxElement speed={0.1} direction="left" className="absolute -left-20 top-10 opacity-10">
            <Baby className="h-64 w-64 text-[#6EC1E4]" />
          </ParallaxElement>

          <ParallaxElement speed={0.15} direction="right" className="absolute -right-20 bottom-10 opacity-10">
            <Stethoscope className="h-64 w-64 text-[#B9A9FF]" />
          </ParallaxElement>

          <FadeIn direction="up" distance={30}>
            <h2 className="text-3xl md:text-4xl font-bold text-center text-[#333333] mb-12">Temas Principais</h2>
          </FadeIn>

          <StaggerContainer
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            staggerDelay={0.1}
            staggerType="spring"
          >
            {topics.map((topic, index) => (
              <div 
                key={topic.id}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-[#F0F9FF] p-3 rounded-full mr-4">
                    {topic.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-[#333333]">{topic.title}</h3>
                </div>
                <p className="text-[#666666] mb-4">{topic.description}</p>
                <Link
                  href={topic.href}
                  className="text-[#6EC1E4] hover:text-[#5BA8CB] font-medium flex items-center"
                >
                  Saiba mais
                </Link>
              </div>
            ))}
          </StaggerContainer>
        </section>

        <TransformEffect type="morph" intensity={1} className="py-12 bg-[#F0F9FF] rounded-2xl my-20 p-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-[#333333] mb-6">Avalie Seus Conhecimentos</h2>
            <p className="text-lg text-[#666666] mb-8">
              Teste o que você aprendeu com nossas provas temáticas individuais ou desafie-se com nossa prova geral
              abrangente.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/provas"
                className="px-6 py-3 bg-gradient-to-r from-[#B9A9FF] to-[#A090E0] text-white rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                Provas Temáticas
              </Link>
              <Link
                href="/prova-geral"
                className="px-6 py-3 bg-white border border-[#B9A9FF] text-[#B9A9FF] rounded-lg hover:bg-[#F8F5FF] hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                Prova Geral
              </Link>
            </div>
          </div>
        </TransformEffect>

        <section className="py-12 md:py-20 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <ParallaxElement speed={0.2} direction="left">
              <div className="rounded-lg overflow-hidden shadow-lg transform transition-all duration-500 hover:scale-105 bg-gradient-to-br from-[#F0F9FF] to-[#E1F5FE] h-64 flex items-center justify-center">
                <Baby className="h-24 w-24 text-[#6EC1E4]" />
              </div>
            </ParallaxElement>

            <div>
              <FadeIn direction="right" distance={50}>
                <h2 className="text-3xl font-bold text-[#333333] mb-4">Fisioterapia Neonatal</h2>
                <p className="text-lg text-[#666666] mb-4">
                  A fisioterapia neonatal é uma especialidade que atua na prevenção, avaliação e tratamento de alterações
                  no desenvolvimento neuropsicomotor de recém-nascidos.
                </p>
                <p className="text-lg text-[#666666] mb-6">
                  Nosso portal oferece recursos educacionais para profissionais e estudantes interessados nesta área
                  fundamental para o desenvolvimento saudável de bebês.
                </p>
                <Link
                  href="/temas"
                  className="px-6 py-3 bg-gradient-to-r from-[#6EC1E4] to-[#B9A9FF] text-white rounded-lg hover:opacity-90 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 inline-block"
                >
                  Saiba Mais
                </Link>
              </FadeIn>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-20 bg-[#F0F9FF] rounded-2xl mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <FadeIn direction="left" distance={50}>
                <h2 className="text-3xl font-bold text-[#333333] mb-4">Desenvolvimento Infantil</h2>
                <p className="text-lg text-[#666666] mb-4">
                  O acompanhamento do desenvolvimento infantil é essencial para identificar precocemente alterações e
                  intervir de forma adequada.
                </p>
                <p className="text-lg text-[#666666] mb-6">
                  Conheça os principais marcos do desenvolvimento motor, cognitivo e social, e aprenda a estimular cada
                  etapa de forma adequada.
                </p>
                <Link
                  href="/documentos"
                  className="px-6 py-3 bg-gradient-to-r from-[#A8E6CF] to-[#7DCFB6] text-white rounded-lg hover:opacity-90 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 inline-block"
                >
                  Acessar Documentos
                </Link>
              </FadeIn>
            </div>

            <div className="order-1 md:order-2">
              <ParallaxElement speed={0.2} direction="right">
                <div className="rounded-lg overflow-hidden shadow-lg transform transition-all duration-500 hover:scale-105 bg-gradient-to-br from-[#F0FFF4] to-[#D7F9E9] h-64 flex items-center justify-center">
                  <Brain className="h-24 w-24 text-[#A8E6CF]" />
                </div>
              </ParallaxElement>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
