"use client"

import React, { useEffect, useRef } from "react"
import Link from "next/link"
import { Baby, Brain, Droplets, HeartPulse, Stethoscope, BarChart, ChevronRight } from "lucide-react"
import { motion, useScroll, useTransform, useAnimation } from "framer-motion"
import { FadeIn } from "@/components/animations/fade-in"
import { StaggerContainer } from "@/components/animations/stagger-container"
import { StaggerItem } from "@/components/animations/stagger-item"
import { ThreeDText } from "@/components/ui/3d-text"
import { AdvancedParallax } from "@/components/animations/advanced-parallax"
import { MagneticButton } from "@/components/ui/magnetic-button"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Particles } from "@/components/ui/particles"
import { useMediaQuery } from "@/hooks/use-media-query"

// Register GSAP plugins on client-side only
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function ProvasPage() {
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const controls = useAnimation()

  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start start", "end start"],
  })
  
  const imageParallax = useTransform(scrollYProgress, [0, 1], [0, -100])
  const opacityTransform = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  useEffect(() => {
    // Initialize content animations
    if (contentRef.current) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { 
          duration: 1,
          ease: [0.25, 0.1, 0.25, 1.0],
          staggerChildren: 0.1,
          delayChildren: 0.2
        }
      })
    }

    // Cards reveal animation
    if (cardsRef.current && typeof window !== "undefined") {
      const cards = cardsRef.current.querySelectorAll(".quiz-card")
      
      gsap.fromTo(
        cards, 
        { 
          y: 40,
          opacity: 0,
        },
        {
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
          },
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
        }
      )
    }
  }, [controls])

  const quizzes = [
    {
      id: "reflexos-0-6",
      title: "Reflexos de 0 a 6 meses",
      description: "Avalie seu conhecimento sobre os reflexos primitivos nos primeiros 6 meses de vida.",
      icon: <Baby className="h-8 w-8" />,
      color: "#6EC1E4",
      bgGradient: "from-[#6EC1E4]/10 to-[#6EC1E4]/5",
      href: "/provas/reflexos-0-6",
    },
    {
      id: "reflexos-7-15",
      title: "Reflexos de 7 a 15 meses",
      description: "Teste o que você sabe sobre a evolução dos reflexos após os 6 meses.",
      icon: <Baby className="h-8 w-8" />,
      color: "#B9A9FF",
      bgGradient: "from-[#B9A9FF]/10 to-[#B9A9FF]/5",
      href: "/provas/reflexos-7-15",
    },
    {
      id: "reacoes-0-15",
      title: "Reações de 0 a 15 meses",
      description: "Verifique seu conhecimento sobre as reações normais no desenvolvimento infantil.",
      icon: <HeartPulse className="h-8 w-8" />,
      color: "#6EC1E4",
      bgGradient: "from-[#6EC1E4]/10 to-[#A8E6CF]/10",
      href: "/provas/reacoes-0-15",
    },
    {
      id: "escala-avaliacao",
      title: "Escala de avaliação neonatal",
      description: "Pratique a utilização das escalas de avaliação para recém-nascidos.",
      icon: <Stethoscope className="h-8 w-8" />,
      color: "#A8E6CF",
      bgGradient: "from-[#A8E6CF]/10 to-[#A8E6CF]/5",
      href: "/provas/escala-avaliacao",
    },
    {
      id: "dor-neonatal",
      title: "Dor neonatal",
      description: "Avalie seu conhecimento sobre a avaliação e manejo da dor em recém-nascidos.",
      icon: <HeartPulse className="h-8 w-8" />,
      color: "#FF6B6B",
      bgGradient: "from-[#FF6B6B]/10 to-[#FF6B6B]/5",
      href: "/provas/dor-neonatal",
    },
    {
      id: "metodo-canguru",
      title: "Método Canguru",
      description: "Teste seu conhecimento sobre o método canguru e seus benefícios.",
      icon: <Baby className="h-8 w-8" />,
      color: "#A8E6CF",
      bgGradient: "from-[#A8E6CF]/10 to-[#6EC1E4]/10",
      href: "/provas/metodo-canguru",
    },
    {
      id: "hidroterapia",
      title: "Hidroterapia em neonatos",
      description: "Avalie o que você sabe sobre técnicas de hidroterapia para bebês.",
      icon: <Droplets className="h-8 w-8" />,
      color: "#6EC1E4",
      bgGradient: "from-[#6EC1E4]/10 to-[#6EC1E4]/5",
      href: "/provas/hidroterapia",
    },
    {
      id: "sequelas-neurologicas",
      title: "Sequelas de doenças neurológicas",
      description: "Teste seu conhecimento sobre sequelas neurológicas em prematuros.",
      icon: <Brain className="h-8 w-8" />,
      color: "#B9A9FF",
      bgGradient: "from-[#B9A9FF]/10 to-[#B9A9FF]/5",
      href: "/provas/sequelas-neurologicas",
    },
    {
      id: "sequelas-pulmonares",
      title: "Sequelas de doenças pulmonares",
      description: "Avalie o que você sabe sobre complicações pulmonares em prematuros.",
      icon: <Stethoscope className="h-8 w-8" />,
      color: "#6EC1E4",
      bgGradient: "from-[#6EC1E4]/10 to-[#A8E6CF]/10",
      href: "/provas/sequelas-pulmonares",
    },
  ]

  return (
    <div className="relative min-h-screen pb-20">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[500px] h-[500px] rounded-full bg-[#6EC1E4]/5 blur-3xl -top-64 -left-64" />
        <div className="absolute w-[400px] h-[400px] rounded-full bg-[#B9A9FF]/5 blur-3xl -bottom-32 -right-32" />
        <div className="absolute w-[300px] h-[300px] rounded-full bg-[#A8E6CF]/5 blur-3xl top-1/2 right-1/4" />
      </div>
      
      {/* Header section */}
      <div 
        ref={headerRef}
        className="relative h-screen w-full overflow-hidden"
      >
        {/* Full-page video with parallax effect */}
        <motion.div 
          className="absolute inset-0 w-full h-full"
          style={{ y: imageParallax }}
        >
          <div className="absolute inset-0 w-full h-full">
            {/* Video background */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute w-full h-full object-cover"
                style={{
                  filter: "brightness(0.7) contrast(1.1)",
                }}
              >
                <source src="/images/feto/hero-baby-prova.vd.mp4" type="video/mp4" />
              </video>
            </div>
            
            {/* Advanced gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/60 to-transparent md:to-transparent to-black/40" />
            
            {/* Bottom gradient overlay for smooth transition */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
            
            {/* Animated particle overlay */}
            <Particles count={isMobile ? 30 : 80} />
          </div>
        </motion.div>
        
        {/* Content section with parallax and staggered animations */}
        <motion.div 
          className="relative z-10 h-full max-w-screen-xl mx-auto"
          style={{ opacity: opacityTransform }}
        >
          <div className={`flex flex-col ${isMobile ? 'justify-start pt-16' : 'justify-center'} h-full px-6 lg:px-16`}>
            <motion.div
              ref={contentRef}
              initial={{ opacity: 0, y: 40 }}
              animate={controls}
              className={`${isMobile ? 'mx-auto text-center' : 'md:max-w-[60%] lg:max-w-[55%]'} sm:max-w-[85%] max-w-full`}
            >
              <motion.span 
                className="px-4 py-1.5 bg-gradient-to-r from-[#B9A9FF]/10 to-[#6EC1E4]/10 rounded-full text-sm font-medium text-white inline-block mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Avalie seu conhecimento
              </motion.span>
              
              <ThreeDText
                text="Provas Temáticas"
                gradient={true}
                depth={8}
                fontSize="3.5rem"
                fontWeight="700"
                className="mb-6 text-white"
              />
              
              <motion.p 
                className="text-lg text-white/90 mb-8 max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Teste seus conhecimentos em fisioterapia neonatal e pediátrica com nossas provas especializadas por tema. 
                Cada avaliação foi elaborada para reforçar conceitos específicos e ajudar na sua preparação profissional.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
          <Link
            href="/prova-geral"
                  className="
                    relative overflow-hidden rounded-full transition-all 
                    bg-gradient-to-r from-[#6EC1E4] to-[#B9A9FF] text-white 
                    hover:shadow-lg hover:scale-[1.02]
                    px-8 py-4 font-medium inline-flex items-center
                    cursor-pointer
                  "
                >
                  <span className="flex items-center gap-2">
                    <BarChart className="h-5 w-5" />
                    Fazer Avaliação Completa
                  </span>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 hidden md:block"
          animate={{
            y: [0, 10, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <svg className="w-6 h-6 text-white filter drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </div>
      
      {/* Content section with improved transition */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 -mt-16 pt-16 pb-20 bg-white rounded-t-[3rem] shadow-lg"
      >
        {/* Quiz cards grid */}
        <div className="container mx-auto px-6 mb-8" ref={cardsRef}>
          <motion.h2 
            className="text-2xl font-bold text-[#333333] mb-8 text-center md:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Selecione uma área para testar seus conhecimentos
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {quizzes.map((quiz, index) => (
              <motion.div 
                key={quiz.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="quiz-card group bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-6 border border-[#E0E0E0]/80 hover:border-[#E0E0E0] transform hover:-translate-y-2 hover:scale-[1.02] duration-300 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-white opacity-90 group-hover:opacity-80 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-transparent group-hover:from-[#6EC1E4]/5 group-hover:via-transparent group-hover:to-[#B9A9FF]/5 transition-colors duration-500"></div>
                
                <Link href={quiz.href} className="block h-full relative z-10">
                  <div 
                    className={`p-3 bg-gradient-to-r ${quiz.bgGradient} rounded-lg inline-flex mb-4 group-hover:scale-110 transition-transform duration-300`}
                    style={{ boxShadow: `0 5px 15px -5px ${quiz.color}40` }}
                  >
                    <div style={{ color: quiz.color }}>
                      {quiz.icon}
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-lg text-[#333333] mb-2 group-hover:text-[#222222]">{quiz.title}</h3>
                  <p className="text-[#666666] text-sm mb-6">{quiz.description}</p>
                  
                  <div className="flex justify-end mt-auto">
                    <div 
                      className="inline-flex items-center text-sm font-medium transition-all duration-300 relative"
                      style={{ color: quiz.color }}
                    >
                      <span className="relative group-hover:mr-1">
                        Iniciar prova
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300" style={{ backgroundColor: quiz.color }}></span>
                      </span>
                      <ChevronRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
          </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
      
      {/* Footer CTA */}
      <div className="container mx-auto px-6">
        <motion.div 
          className="bg-gradient-to-r from-[#F5F9FF] to-[#F0F0FF] rounded-xl p-8 text-center mb-16 overflow-hidden relative"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute w-[300px] h-[300px] rounded-full bg-[#6EC1E4]/10 blur-3xl -bottom-32 -right-32" />
            <div className="absolute w-[200px] h-[200px] rounded-full bg-[#B9A9FF]/10 blur-3xl -top-20 -left-20" />
          </div>
          
          <div className="relative z-10">
            <h3 className="text-xl md:text-2xl font-bold text-[#333333] mb-3">Preparado para testar todos os seus conhecimentos?</h3>
            <p className="text-[#666666] mb-6 max-w-xl mx-auto">
              Faça nossa avaliação completa e descubra quais áreas você domina e quais precisam de mais atenção.
            </p>
            
            <Link
              href="/prova-geral"
              className="
                relative overflow-hidden rounded-full transition-all 
                bg-gradient-to-r from-[#6EC1E4] to-[#B9A9FF] text-white 
                hover:shadow-lg hover:scale-[1.02]
                px-6 py-3 font-medium inline-flex items-center
                cursor-pointer
              "
            >
              <span className="flex items-center gap-2">
                <BarChart className="h-5 w-5" />
                Fazer Avaliação Completa
              </span>
              </Link>
            </div>
        </motion.div>
      </div>
    </div>
  )
}
