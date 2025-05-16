"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { 
  FileText, 
  Sparkles,
  PenTool,
  BookMarked
} from "lucide-react"
import { AdvancedParallax } from "@/components/animations/advanced-parallax"
import { ThreeDText } from "@/components/ui/3d-text"
import { MagneticButton } from "@/components/ui/magnetic-button"
import Link from "next/link"

interface MainFeaturesProps {
  onAIAssistantClick: () => void;
  isAuthenticated: boolean;
}

export function MainFeatures({ onAIAssistantClick, isAuthenticated }: MainFeaturesProps) {
  const pdfSectionRef = useRef<HTMLElement>(null);
  const assessSectionRef = useRef<HTMLElement>(null);
  const aiAssistantSectionRef = useRef<HTMLElement>(null);
  const articlesSectionRef = useRef<HTMLElement>(null);

  return (
    <div className="container mx-auto px-4 relative z-10">
      {/* AI Assistant Section */}
      <section 
        ref={aiAssistantSectionRef}
        id="assistente-ia" 
        className="py-24 relative overflow-hidden"
      >
        <AdvancedParallax speed={0.08} direction="left">
          <div className="bg-parallax absolute -left-20 top-10 opacity-5">
            <Sparkles className="h-96 w-96 text-[#6EC1E4]" />
          </div>
        </AdvancedParallax>

        <div className="text-center mb-16">
          <span className="px-4 py-1.5 bg-gradient-to-r from-[#6EC1E4]/10 to-[#B9A9FF]/10 rounded-full text-sm font-medium text-[#6EC1E4] inline-block mb-4">
            Assistente Inteligente
          </span>
          
          <ThreeDText
            text="Assistente IA Especializado"
            gradient={true}
            depth={8}
            fontSize="2.5rem"
            fontWeight="700"
            className="mb-6"
          />
          
          <p className="text-lg text-[#666666] max-w-2xl mx-auto">
            Tire suas dúvidas e aprenda com um assistente IA especializado em fisioterapia neonatal
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-8 shadow-lg border border-[#E0E0E0]/50"
          >
            <h3 className="text-2xl font-bold text-[#333333] mb-6">Como funciona</h3>
            <p className="text-lg text-[#666666] mb-6">
              Nosso assistente IA está disponível 24/7 para ajudar você a:
            </p>
            <ul className="space-y-4">
              <li className="flex items-center text-[#666666]">
                <Sparkles className="h-5 w-5 text-[#6EC1E4] mr-3" />
                Tirar dúvidas sobre conceitos
              </li>
              <li className="flex items-center text-[#666666]">
                <Sparkles className="h-5 w-5 text-[#6EC1E4] mr-3" />
                Explicar técnicas e procedimentos
              </li>
              <li className="flex items-center text-[#666666]">
                <Sparkles className="h-5 w-5 text-[#6EC1E4] mr-3" />
                Fornecer resumos personalizados
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <MagneticButton
              backgroundGradient={true}
              glowOnHover={true}
              className={`w-full px-8 py-6 font-medium text-lg ${!isAuthenticated ? 'opacity-50' : ''}`}
              onClick={onAIAssistantClick}
            >
              <span className="flex items-center justify-center gap-3">
                <Sparkles className="h-6 w-6" />
                Experimentar Assistente IA
              </span>
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      {/* Exams Section */}
      <section 
        ref={assessSectionRef}
        id="provas" 
        className="py-24 relative overflow-hidden"
      >
        <AdvancedParallax speed={0.08} direction="right">
          <div className="bg-parallax absolute -right-20 top-10 opacity-5">
            <PenTool className="h-96 w-96 text-[#B9A9FF]" />
          </div>
        </AdvancedParallax>

        <div className="text-center mb-16">
          <span className="px-4 py-1.5 bg-gradient-to-r from-[#6EC1E4]/10 to-[#B9A9FF]/10 rounded-full text-sm font-medium text-[#6EC1E4] inline-block mb-4">
            Avaliação de Conhecimento
          </span>
          
          <ThreeDText
            text="Provas e Avaliações"
            gradient={true}
            depth={8}
            fontSize="2.5rem"
            fontWeight="700"
            className="mb-6"
          />
          
          <p className="text-lg text-[#666666] max-w-2xl mx-auto">
            Teste seus conhecimentos e identifique áreas para aprofundamento
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl p-6 shadow-md border border-[#E0E0E0]/50"
          >
            <Link href="/provas" className="block h-full">
              <div className="p-3 bg-[#F0F9FF] rounded-lg inline-block mb-4">
                <PenTool className="h-6 w-6 text-[#6EC1E4]" />
              </div>
              <h3 className="text-xl font-semibold text-[#333333] mb-2">Provas Temáticas</h3>
              <p className="text-[#666666] text-sm">
                Avaliações específicas por tema para um estudo direcionado e aprofundado.
              </p>
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl p-6 shadow-md border border-[#E0E0E0]/50"
          >
            <Link href="/prova-geral" className="block h-full">
              <div className="p-3 bg-[#F0F9FF] rounded-lg inline-block mb-4">
                <PenTool className="h-6 w-6 text-[#6EC1E4]" />
              </div>
              <h3 className="text-xl font-semibold text-[#333333] mb-2">Prova Geral</h3>
              <p className="text-[#666666] text-sm">
                Avaliação completa abrangendo todos os aspectos da fisioterapia neonatal.
              </p>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Articles Section */}
      <section 
        ref={articlesSectionRef}
        id="artigos" 
        className="py-24 relative overflow-hidden"
      >
        <AdvancedParallax speed={0.08} direction="left">
          <div className="bg-parallax absolute -left-20 top-10 opacity-5">
            <BookMarked className="h-96 w-96 text-[#6EC1E4]" />
          </div>
        </AdvancedParallax>

        <div className="text-center mb-16">
          <span className="px-4 py-1.5 bg-gradient-to-r from-[#6EC1E4]/10 to-[#B9A9FF]/10 rounded-full text-sm font-medium text-[#6EC1E4] inline-block mb-4">
            Biblioteca de Conhecimento
          </span>
          
          <ThreeDText
            text="Artigos e Conteúdo Especializado"
            gradient={true}
            depth={8}
            fontSize="2.5rem"
            fontWeight="700"
            className="mb-6"
          />
          
          <p className="text-lg text-[#666666] max-w-2xl mx-auto">
            Explore nossa biblioteca de artigos e conteúdo especializado em fisioterapia neonatal
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl p-6 shadow-md border border-[#E0E0E0]/50"
          >
            <Link href="/temas/reflexos-primitivos" className="block h-full">
              <div className="p-3 bg-[#F0F9FF] rounded-lg inline-block mb-4">
                <BookMarked className="h-6 w-6 text-[#6EC1E4]" />
              </div>
              <h3 className="text-xl font-semibold text-[#333333] mb-2">Reflexos Primitivos</h3>
              <p className="text-[#666666] text-sm">
                Aprenda sobre avaliação e desenvolvimento dos reflexos em recém-nascidos.
              </p>
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl p-6 shadow-md border border-[#E0E0E0]/50"
          >
            <Link href="/temas/metodo-canguru" className="block h-full">
              <div className="p-3 bg-[#F0F9FF] rounded-lg inline-block mb-4">
                <BookMarked className="h-6 w-6 text-[#6EC1E4]" />
              </div>
              <h3 className="text-xl font-semibold text-[#333333] mb-2">Método Canguru</h3>
              <p className="text-[#666666] text-sm">
                Conheça os benefícios e técnicas do cuidado humanizado com prematuros.
              </p>
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl p-6 shadow-md border border-[#E0E0E0]/50"
          >
            <Link href="/temas" className="block h-full">
              <div className="p-3 bg-[#F0F9FF] rounded-lg inline-block mb-4">
                <BookMarked className="h-6 w-6 text-[#6EC1E4]" />
              </div>
              <h3 className="text-xl font-semibold text-[#333333] mb-2">Ver Todos</h3>
              <p className="text-[#666666] text-sm">
                Explore nossa biblioteca completa de temas e artigos especializados.
              </p>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* PDF Reader Section */}
      <section 
        ref={pdfSectionRef}
        id="leitor-pdf" 
        className="py-24 relative overflow-hidden"
      >
        <AdvancedParallax speed={0.08} direction="right">
          <div className="bg-parallax absolute -right-20 top-10 opacity-5">
            <FileText className="h-96 w-96 text-[#B9A9FF]" />
          </div>
        </AdvancedParallax>

        <div className="text-center mb-16">
          <span className="px-4 py-1.5 bg-gradient-to-r from-[#6EC1E4]/10 to-[#B9A9FF]/10 rounded-full text-sm font-medium text-[#6EC1E4] inline-block mb-4">
            Ferramenta Exclusiva
          </span>
          
          <ThreeDText
            text="Leitor de PDF Inteligente"
            gradient={true}
            depth={8}
            fontSize="2.5rem"
            fontWeight="700"
            className="mb-6"
          />
          
          <p className="text-lg text-[#666666] max-w-2xl mx-auto">
            Revolucione sua forma de estudar com nossa ferramenta de análise de documentos com IA
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl p-6 shadow-md border border-[#E0E0E0]/50"
          >
            <Link href="/documentos" className="block h-full">
              <div className="p-3 bg-[#F0F9FF] rounded-lg inline-block mb-4">
                <FileText className="h-6 w-6 text-[#6EC1E4]" />
              </div>
              <h3 className="text-xl font-semibold text-[#333333] mb-2">Ler Documentos</h3>
              <p className="text-[#666666] text-sm">
                Carregue seus PDFs e use a IA para analisar e compreender melhor o conteúdo.
              </p>
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl p-6 shadow-md border border-[#E0E0E0]/50"
          >
            <Link href="/biblioteca" className="block h-full">
              <div className="p-3 bg-[#F0F9FF] rounded-lg inline-block mb-4">
                <FileText className="h-6 w-6 text-[#6EC1E4]" />
              </div>
              <h3 className="text-xl font-semibold text-[#333333] mb-2">Biblioteca PDF</h3>
              <p className="text-[#666666] text-sm">
                Acesse nossa coleção de artigos e documentos científicos selecionados.
              </p>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
} 