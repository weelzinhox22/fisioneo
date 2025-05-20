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
import { ThemeInfoCard } from "@/app/components/ThemeInfoCard"
import DraggableAIButton from "@/app/components/DraggableAIButton"

interface TopicPageProps {
  params: {
    slug: string
  }
}

export default function TopicPage({ params }: TopicPageProps) {
  const { slug } = params
  const [bookmarked, setBookmarked] = useState(false)
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#F8FBFF] to-[#F0F9FF]">
      {/* Barra de progresso fixa no topo da página */}
      <div className="fixed top-0 left-0 right-0 h-1.5 bg-gray-200 z-50">
        <div 
          className="h-full bg-gradient-to-r from-[#6EC1E4] via-[#5AADD0] to-[#4A96D1] transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
      
      <BackToTop />
      <ReadingProgress />
      <DraggableAIButton />
      
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-8"
        >
          <Link
            href="/temas"
            className="inline-flex items-center text-[#666666] hover:text-[#6EC1E4] transition-colors bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm hover:shadow-md transform hover:-translate-y-1 transition-all duration-300"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para Temas
          </Link>

          <div className="flex items-center space-x-3">
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2.5 rounded-full bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300"
              onClick={() => window.navigator.share && window.navigator.share({
                title: topic.title,
                text: topic.description,
                url: window.location.href
              })}
            >
              <Share2 className="h-5 w-5 text-[#6EC1E4]" />
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2.5 rounded-full bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300"
              onClick={() => setBookmarked(!bookmarked)}
            >
              <Bookmark 
                className={`h-5 w-5 ${bookmarked ? 'fill-[#6EC1E4] text-[#6EC1E4]' : 'text-[#6EC1E4]'}`} 
              />
            </motion.button>
          </div>
        </motion.div>

        {/* ThemeInfoCard component always visible */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
        <ThemeInfoCard 
          topicId={topic.id}
          readTime={Math.ceil(topic.content.length / 1000)}
        />
        </motion.div>

        {/* Add a debug indicator to show that TopicContent component is being used in this page */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-4 p-2 bg-yellow-100 text-xs text-gray-700 rounded">
            Page ID: {topic.id} | Content Length: {topic.content.length}
          </div>
        )}

        <motion.div 
          initial="hidden" 
          animate="visible" 
          variants={staggerChildren} 
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={childVariant} className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center gap-6 mb-6">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-gradient-to-br from-white to-[#F0F9FF] rounded-2xl shadow-lg border border-[#E0E0E0]/50"
              >
                <div className="text-4xl">{topic.icon}</div>
              </motion.div>
              <div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#333333] to-[#4A96D1] bg-clip-text text-transparent mb-3">{topic.title}</h1>
                <p className="text-lg text-[#666666] max-w-3xl">{topic.description}</p>
              </div>
            </div>

            {/* Navegação rápida para dispositivos móveis */}
            <div className="block lg:hidden mb-8">
              <motion.button 
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowMobileTableOfContents(!showMobileTableOfContents)}
                className="w-full py-3.5 px-5 bg-gradient-to-r from-white to-[#F8FBFF] rounded-xl shadow-md border border-[#E0E0E0]/50 flex items-center justify-between"
              >
                <span className="font-medium text-[#4A96D1] flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-[#6EC1E4]" />
                  Índice do conteúdo
                </span>
                {showMobileTableOfContents ? (
                  <ChevronUp className="h-5 w-5 text-[#6EC1E4]" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-[#6EC1E4]" />
                )}
              </motion.button>
              
              <AnimatePresence>
                {showMobileTableOfContents && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-[#E0E0E0]/50 p-5">
                      <h3 className="font-medium text-[#4A96D1] mb-4 flex items-center">
                        <Info className="h-4 w-4 mr-2 text-[#6EC1E4]" />
                        Navegue por mês:
                      </h3>
                      <div className="space-y-2.5">
                        {monthTitles.map((title, index) => (
                          <motion.a
                            key={index}
                            whileHover={{ x: 5 }}
                            href={`#${title.toLowerCase().replace(/\s+/g, '-')}`}
                            className="block p-2.5 bg-[#F8FBFF] hover:bg-[#E6F3FF] rounded-lg transition-colors text-[#4A96D1] border border-[#E0E0E0]/30 hover:border-[#6EC1E4]/30 shadow-sm"
                            onClick={() => setShowMobileTableOfContents(false)}
                          >
                            {title}
                          </motion.a>
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
                
                <motion.div 
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="mt-6 bg-gradient-to-br from-[#F0F9FF] to-[#E6F3FF] p-5 rounded-xl shadow-md border border-[#E0E0E0]/50"
                >
                  <div className="flex items-center mb-3">
                    <div className="p-1.5 bg-white rounded-full mr-2.5 shadow-sm">
                      <Info className="h-4 w-4 text-[#6EC1E4]" />
                    </div>
                    <h3 className="text-sm font-medium text-[#4A96D1]">Dica de estudo</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    Para melhor compreensão, estude o desenvolvimento mês a mês, observe as imagens e relacione com os conceitos teóricos.
                  </p>
                </motion.div>
              </div>
            </motion.div>
            
            {/* Conteúdo principal */}
            <motion.div variants={childVariant} className="lg:col-span-3">
              <TopicContent topic={topic} />

              <RelatedTopics currentTopic={topic} allTopics={topics} />

              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5">
                <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                <Link
                  href="/provas"
                    className="px-6 py-4 bg-gradient-to-r from-[#6EC1E4] via-[#5AADD0] to-[#4A96D1] text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center transform hover:-translate-y-1 group"
                >
                    <div className="p-2 bg-white/20 rounded-full mr-3 group-hover:bg-white/30 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                    </div>
                    <span className="font-medium">Testar Conhecimentos</span>
                </Link>
                </motion.div>

                <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                <Link
                  href="/temas"
                    className="px-6 py-4 bg-white border border-[#6EC1E4] text-[#4A96D1] rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center transform hover:-translate-y-1 group"
                >
                    <div className="p-2 bg-[#F0F9FF] rounded-full mr-3 group-hover:bg-[#E6F3FF] transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                  </svg>
                    </div>
                    <span className="font-medium">Explorar Outros Temas</span>
                </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
