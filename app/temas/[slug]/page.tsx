"use client"

import { notFound } from "next/navigation"
import { ArrowLeft, BookOpen, Share2, Bookmark, ChevronDown, ChevronUp, Info, ArrowUp } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { topics } from "@/app/data/topics"
import TopicContent from "@/app/components/TopicContent"
import RelatedTopics from "@/app/components/RelatedTopics"
import ReadingProgress from "@/app/components/ReadingProgress"
import TableOfContents from "@/app/components/TableOfContents"
import BackToTop from "@/app/components/BackToTop"

interface TopicPageProps {
  params: {
    slug: string
  }
}

export default function TopicPage({ params }: TopicPageProps) {
  const { slug } = params
  const [bookmarked, setBookmarked] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [showMobileTableOfContents, setShowMobileTableOfContents] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  const topic = topics.find((t) => t.id === slug)

  if (!topic) {
    notFound()
  }

  // Função para extrair os títulos dos meses a partir do conteúdo HTML
  const extractMonthTitles = (): string[] => {
    const regex = /<h3 id="(.*?)">(.*?)<\/h3>/g;
    const content = topic.content || "";
    const matches = [...content.matchAll(regex)];
    return matches.map(match => match[2]);
  };

  const monthTitles = extractMonthTitles();

  // Efeito para monitorar o progresso de rolagem da página
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const childVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  const infoVariant = {
    hidden: { opacity: 0, height: 0 },
    visible: { 
      opacity: 1, 
      height: "auto", 
      transition: { duration: 0.3 } 
    },
    exit: { 
      opacity: 0, 
      height: 0, 
      transition: { duration: 0.2 } 
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F0F9FF]">
      {/* Barra de progresso fixa no topo da página */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-gradient-to-r from-[#6EC1E4] to-[#4A96D1] transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
      
      <BackToTop />
      
    <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
      <Link
        href="/temas"
            className="inline-flex items-center text-[#666666] hover:text-[#6EC1E4] transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Voltar para Temas
      </Link>

          <div className="flex items-center space-x-3">
            <button 
              className="p-2 rounded-full hover:bg-[#F0F9FF] transition-colors flex items-center text-sm"
              onClick={() => setShowInfo(!showInfo)}
            >
              <Info className="h-5 w-5 text-[#6EC1E4] mr-1" />
              <span className="hidden sm:inline text-gray-600">Sobre</span>
            </button>
            
            <button 
              className="p-2 rounded-full hover:bg-[#F0F9FF] transition-colors"
              onClick={() => window.navigator.share && window.navigator.share({
                title: topic.title,
                text: topic.description,
                url: window.location.href
              })}
            >
              <Share2 className="h-5 w-5 text-[#6EC1E4]" />
            </button>
            
            <button 
              className="p-2 rounded-full hover:bg-[#F0F9FF] transition-colors"
              onClick={() => setBookmarked(!bookmarked)}
            >
              <Bookmark 
                className={`h-5 w-5 ${bookmarked ? 'fill-[#6EC1E4] text-[#6EC1E4]' : 'text-[#6EC1E4]'}`} 
              />
            </button>
          </div>
        </div>

        <motion.div 
          initial="hidden" 
          animate="visible" 
          variants={staggerChildren} 
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={childVariant} className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
              <div className="p-4 bg-white rounded-xl shadow-md border border-[#E0E0E0]">
                {topic.icon}
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-[#333333] mb-2">{topic.title}</h1>
                <p className="text-lg text-[#666666]">{topic.description}</p>
              </div>
            </div>
            
            <AnimatePresence>
              {showInfo && (
                <motion.div 
                  variants={infoVariant}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="bg-white/70 backdrop-blur-sm p-6 rounded-xl border border-[#E0E0E0] mb-8 overflow-hidden"
                >
                  <h3 className="text-xl font-semibold text-[#4A96D1] mb-4">Sobre este tema</h3>
                  <p className="text-gray-700 mb-4">
                    {topic.id === "reflexos-0-6" ? 
                      "Este conteúdo educativo foi desenvolvido para ajudar profissionais e estudantes a compreender melhor o desenvolvimento neuropsicomotor de bebês de 0 a 6 meses, com foco especial nos reflexos primitivos." :
                      topic.id === "reflexos-7-15" ?
                      "Este conteúdo educativo foi desenvolvido para ajudar profissionais e estudantes a compreender melhor o desenvolvimento neuropsicomotor de bebês de 7 a 15 meses, com foco especial nas aquisições motoras." :
                      "Este conteúdo educativo foi desenvolvido para ajudar profissionais e estudantes a compreender melhor o desenvolvimento neuropsicomotor de bebês."
                    }
                  </p>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#F0F9FF] p-4 rounded-lg">
                    <div className="flex items-center">
                      <BookOpen className="h-5 w-5 text-[#6EC1E4] mr-3" />
                      <p className="text-sm text-[#666666]">
                        Tempo estimado de leitura: {Math.ceil(topic.content.length / 1000)} minutos
                      </p>
                    </div>
                    
                    <div className="text-sm text-[#666666] flex items-center">
                      <span className="mr-2">Última atualização:</span>
                      <span className="bg-[#6EC1E4] text-white px-2 py-1 rounded-full text-xs">
                        Maio 2025
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navegação rápida para dispositivos móveis */}
            <div className="block lg:hidden mb-8">
              <button 
                onClick={() => setShowMobileTableOfContents(!showMobileTableOfContents)}
                className="w-full py-3 px-4 bg-white rounded-lg shadow-sm border border-[#E0E0E0] flex items-center justify-between"
              >
                <span className="font-medium text-[#4A96D1]">Índice do conteúdo</span>
                {showMobileTableOfContents ? (
                  <ChevronUp className="h-5 w-5 text-[#6EC1E4]" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-[#6EC1E4]" />
                )}
              </button>
              
              <AnimatePresence>
                {showMobileTableOfContents && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-2 bg-white rounded-lg shadow-sm border border-[#E0E0E0] p-4">
                      <h3 className="font-medium text-gray-700 mb-3">Navegue por mês:</h3>
                      <div className="space-y-2">
                        {monthTitles.map((title, index) => (
                          <a
                            key={index}
                            href={`#${title.toLowerCase().replace(/\s+/g, '-')}`}
                            className="block p-2 hover:bg-[#F0F9FF] rounded-lg transition-colors text-[#4A96D1]"
                            onClick={() => setShowMobileTableOfContents(false)}
                          >
                            {title}
                          </a>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Tabela de conteúdo - apenas visível em telas grandes */}
            <motion.div variants={childVariant} className="hidden lg:block">
              <div className="sticky top-20">
                <TableOfContents content={topic.content} />
                
                <div className="mt-6 bg-[#F0F9FF] p-4 rounded-lg border border-[#E0E0E0]">
                  <div className="flex items-center mb-3">
                    <Info className="h-5 w-5 text-[#6EC1E4] mr-2" />
                    <h3 className="text-sm font-medium text-gray-700">Dica de estudo</h3>
                  </div>
                  <p className="text-xs text-gray-600">
                    Para melhor compreensão, estude o desenvolvimento mês a mês, observe as imagens e relacione com os conceitos teóricos.
            </p>
          </div>
        </div>
            </motion.div>
            
            {/* Conteúdo principal */}
            <motion.div variants={childVariant} className="lg:col-span-3">
              <TopicContent topic={topic} />
              
              <RelatedTopics currentTopic={topic} allTopics={topics} />

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/provas"
                  className="px-6 py-4 bg-gradient-to-r from-[#6EC1E4] to-[#4A96D1] text-white rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center transform hover:-translate-y-1"
          >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
            Testar Conhecimentos
          </Link>

          <Link
            href="/temas"
                  className="px-6 py-4 bg-white border border-[#6EC1E4] text-[#6EC1E4] rounded-lg hover:bg-[#F0F9FF] transition-colors flex items-center justify-center transform hover:-translate-y-1 hover:shadow-md"
          >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                  </svg>
            Explorar Outros Temas
          </Link>
        </div>
      </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
