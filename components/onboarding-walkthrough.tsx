"use client"

import React, { useState, useEffect } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  BookOpen, 
  FileText, 
  PenTool, 
  Sparkles, 
  BookMarked,
  Brain,
  Baby,
  Stethoscope,
  GraduationCap,
  RefreshCw,
  ExternalLink
} from "lucide-react"
import Link from "next/link"

type FeatureStep = {
  title: string
  description: string
  icon: React.ReactNode
  imageUrl: string
  highlight: string
  color: string
  link?: string // Link to the feature page
}

export default function OnboardingWalkthrough() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false)
  const [showReopenButton, setShowReopenButton] = useState(false)

  useEffect(() => {
    // Check if user has seen the onboarding before
    const onboardingSeen = localStorage.getItem("onboardingSeen")
    if (!onboardingSeen) {
      // Wait a moment before showing the walkthrough
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, 1500)
      return () => clearTimeout(timer)
    } else {
      setHasSeenOnboarding(true)
      // Show reopen button after a delay
      setTimeout(() => {
        setShowReopenButton(true)
      }, 10000)
    }
  }, [])

  const handleComplete = () => {
    // Mark as seen in localStorage
    localStorage.setItem("onboardingSeen", "true")
    setHasSeenOnboarding(true)
    setIsOpen(false)
    
    // Show reopen button after a delay
    setTimeout(() => {
      setShowReopenButton(true)
    }, 10000)
  }

  const handleSkip = () => {
    handleComplete()
  }

  const handleNext = () => {
    if (currentStep < features.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleComplete()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleReopenWalkthrough = () => {
    setCurrentStep(0)
    setIsOpen(true)
    setShowReopenButton(false)
    
    // Hide reopen button for a while after closing
    setTimeout(() => {
      setShowReopenButton(true)
    }, 60000) // Show again after 1 minute
  }

  const features: FeatureStep[] = [
    {
      title: "Bem-vindo à FisioNeo",
      description: "Sua plataforma completa sobre fisioterapia neonatal. Projeto desenvolvido para apoiar estudantes, profissionais e interessados na área, reunindo conteúdo especializado, ferramentas interativas e recursos de estudo em um só lugar.",
      icon: <BookOpen className="h-6 w-6" />,
      imageUrl: "https://images.unsplash.com/photo-1556740758-90de374c12ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      highlight: "Plataforma educacional especializada",
      color: "blue",
      link: "/"
    },
    {
      title: "Assistente IA Interativo",
      description: "Tire dúvidas sobre fisioterapia neonatal a qualquer momento com nosso assistente de IA especializado. Ele pode explicar conceitos, técnicas, protocolos e ajudar em seus estudos com respostas rápidas e baseadas em evidências científicas.",
      icon: <Sparkles className="h-6 w-6" />,
      imageUrl: "https://images.unsplash.com/photo-1677442135148-1776d208998d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      highlight: "Tire dúvidas em tempo real",
      color: "purple",
      link: "/#assistente-ia"
    },
    {
      title: "Leitor de PDF Integrado",
      description: "Acesse e estude artigos científicos, diretrizes e documentos importantes diretamente na plataforma. Nosso leitor de PDF integrado permite fazer anotações, destacar trechos importantes e salvar referências para consulta futura.",
      icon: <FileText className="h-6 w-6" />,
      imageUrl: "https://images.unsplash.com/photo-1633613286991-611fe299c4be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      highlight: "Estude documentos sem sair da plataforma",
      color: "red",
      link: "/documentos"
    },
    {
      title: "Provas Gerais",
      description: "Teste seus conhecimentos com avaliações abrangentes que cobrem os principais tópicos da fisioterapia neonatal e pediátrica. Receba feedback instantâneo sobre seu desempenho e identifique áreas para aprofundamento.",
      icon: <PenTool className="h-6 w-6" />,
      imageUrl: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      highlight: "Avalie seu conhecimento geral",
      color: "green",
      link: "/prova-geral"
    },
    {
      title: "Provas Temáticas",
      description: "Aprofunde-se em temas específicos como reflexos primitivos, método canguru, avaliação neurológica e desenvolvimento motor. Nossas provas temáticas permitem um estudo direcionado e especializado para cada área de interesse.",
      icon: <BookMarked className="h-6 w-6" />,
      imageUrl: "https://images.unsplash.com/photo-1554475901-4538ddfbccc2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      highlight: "Estude tópicos específicos em profundidade",
      color: "amber",
      link: "/provas"
    },
    {
      title: "Método Canguru",
      description: "Conheça em detalhes o Método Canguru, uma abordagem fundamental para o cuidado de bebês prematuros. Aprenda sobre seus benefícios, técnicas de aplicação, evidências científicas e como orientar famílias sobre sua prática.",
      icon: <Baby className="h-6 w-6" />,
      imageUrl: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      highlight: "Aprofunde-se no cuidado humanizado",
      color: "pink",
      link: "/temas/metodo-canguru"
    },
    {
      title: "Avaliação Neurológica",
      description: "Estude os principais aspectos da avaliação neurológica em recém-nascidos, incluindo reflexos primitivos, tônus muscular, postura e desenvolvimento sensorial. Conteúdo essencial para diagnóstico e intervenção precoce.",
      icon: <Brain className="h-6 w-6" />,
      imageUrl: "https://images.unsplash.com/photo-1559757175-7cb036e010ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      highlight: "Avaliação e diagnóstico precoce",
      color: "indigo",
      link: "/temas/avaliacao-neurologica"
    },
    {
      title: "Recursos Educacionais",
      description: "Acesse uma biblioteca completa de recursos educacionais, incluindo vídeos, infográficos, resumos, fluxogramas e estudos de caso. Material organizado para facilitar o aprendizado e a revisão de conteúdos essenciais.",
      icon: <GraduationCap className="h-6 w-6" />,
      imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      highlight: "Materiais de estudo diversificados",
      color: "cyan",
      link: "/temas"
    }
  ]

  // If user has completely dismissed the walkthrough, don't render anything
  if (hasSeenOnboarding && !isOpen && !showReopenButton) return null

  const getIconBackgroundColor = (color: string) => {
    const colors: Record<string, string> = {
      blue: "bg-blue-50 text-blue-500",
      purple: "bg-purple-50 text-purple-500",
      red: "bg-red-50 text-red-500",
      green: "bg-green-50 text-green-500",
      amber: "bg-amber-50 text-amber-500",
      pink: "bg-pink-50 text-pink-500",
      indigo: "bg-indigo-50 text-indigo-500",
      cyan: "bg-cyan-50 text-cyan-500"
    }
    
    return colors[color] || "bg-blue-50 text-blue-500"
  }

  return (
    <>
      {/* Reopen button that appears after completing the walkthrough */}
      <AnimatePresence>
        {showReopenButton && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 z-40"
          >
            <Button
              onClick={handleReopenWalkthrough}
              className="bg-gradient-to-r from-[#6EC1E4] to-[#B9A9FF] hover:from-[#5BA8CB] hover:to-[#A090E0] text-white rounded-full shadow-lg flex items-center gap-2 pl-3 pr-4 py-5"
            >
              <RefreshCw className="h-4 w-4" />
              <span className="font-medium">Tour do Site</span>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md md:max-w-2xl p-0 gap-0 overflow-hidden rounded-xl border-0 shadow-xl">
          <div className="relative w-full">
            {/* Header with step indicator */}
            <div className="bg-gradient-to-r from-[#6EC1E4] to-[#B9A9FF] p-4 text-white flex justify-between items-center">
              <h2 className="font-bold text-lg md:text-xl">
                {features[currentStep].title}
              </h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1 hover:bg-white/20 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-gray-200 h-1">
              <div 
                className="bg-gradient-to-r from-[#6EC1E4] to-[#B9A9FF] h-1 transition-all duration-300" 
                style={{ width: `${((currentStep + 1) / features.length) * 100}%` }}
              />
            </div>

            {/* Feature content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="p-4 md:p-6"
              >
                <div className="flex flex-col md:flex-row md:gap-6 mb-6">
                  {/* Feature description (left side on desktop) */}
                  <div className="flex flex-col items-center md:items-start text-center md:text-left mb-6 md:mb-0 md:w-1/2">
                    <div className={`w-16 h-16 flex items-center justify-center rounded-full mb-4 ${getIconBackgroundColor(features[currentStep].color)}`}>
                      {features[currentStep].icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{features[currentStep].title}</h3>
                    <p className="text-gray-600">{features[currentStep].description}</p>
                    
                    {/* Link to feature page */}
                    {features[currentStep].link && (
                      <Link 
                        href={features[currentStep].link}
                        className="mt-4 inline-flex items-center text-sm font-medium text-[#6EC1E4] hover:text-[#5BA8CB] transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        <span>Ir para {features[currentStep].title}</span>
                        <ExternalLink className="ml-1 h-3.5 w-3.5" />
                      </Link>
                    )}
                  </div>

                  {/* Feature image (right side on desktop) */}
                  <div className="md:w-1/2">
                    <div className="relative rounded-lg overflow-hidden bg-gray-100 shadow-md">
                      <div 
                        className="aspect-video bg-cover bg-center"
                        style={{ 
                          backgroundImage: `url(${features[currentStep].imageUrl})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                      >
                        {/* Overlay gradient for better text readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      </div>
                      <div className="absolute bottom-3 left-3 bg-gradient-to-r from-[#6EC1E4]/90 to-[#B9A9FF]/90 text-white text-xs md:text-sm px-3 py-1 rounded-full backdrop-blur-sm">
                        {features[currentStep].highlight}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step indicator dots */}
                <div className="flex justify-center gap-1 mt-4 mb-2">
                  {features.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentStep(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentStep 
                          ? "bg-gradient-to-r from-[#6EC1E4] to-[#B9A9FF] w-4" 
                          : "bg-gray-300 hover:bg-gray-400"
                      }`}
                      aria-label={`Ir para o passo ${index + 1}`}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation buttons */}
            <div className="p-4 border-t border-gray-200 flex justify-between">
              <div>
                {currentStep > 0 ? (
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    className="flex items-center gap-1"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Anterior
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    onClick={handleSkip}
                  >
                    Pular Tour
                  </Button>
                )}
              </div>
              
              <div className="flex gap-2">
                {features[currentStep].link && (
                  <Link 
                    href={features[currentStep].link}
                    onClick={() => setIsOpen(false)}
                  >
                    <Button
                      variant="outline"
                      className="border-[#6EC1E4] text-[#6EC1E4] hover:bg-[#F0F7FF] hover:border-[#5BA8CB] hover:text-[#5BA8CB] flex items-center gap-1"
                    >
                      Acessar
                      <ExternalLink className="h-3.5 w-3.5 ml-1" />
                    </Button>
                  </Link>
                )}
                
                <Button
                  onClick={handleNext}
                  className="bg-gradient-to-r from-[#6EC1E4] to-[#B9A9FF] hover:from-[#5BA8CB] hover:to-[#A090E0] text-white flex items-center gap-1"
                >
                  {currentStep < features.length - 1 ? (
                    <>
                      Próximo
                      <ChevronRight className="h-4 w-4" />
                    </>
                  ) : (
                    "Finalizar"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
} 