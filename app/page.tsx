"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { 
  Baby, 
  Brain, 
  Droplets, 
  HeartPulse, 
  Stethoscope, 
  FileText, 
  FileType, 
  FileUp, 
  Search, 
  MessageSquare, 
  BookOpen, 
  RefreshCw, 
  Sparkles 
} from "lucide-react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Hero } from "@/app/components/Hero"
import { AboutSection } from "@/app/components/AboutSection"
import { AdvancedParallax } from "@/components/animations/advanced-parallax"
import { MagneticButton } from "@/components/ui/magnetic-button"
import { ThreeDText } from "@/components/ui/3d-text"
import { AlertDialog } from "@/components/ui/alert-dialog"
import { useSession } from "next-auth/react"
import { supabase } from "@/lib/supabase"

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const pdfSectionRef = useRef(null);
  const assessSectionRef = useRef(null);
  const finalSectionRef = useRef(null);
  const aiAssistantSectionRef = useRef(null);
  
  const [showLoginAlert, setShowLoginAlert] = useState(false)
  const { data: nextAuthSession, status: nextAuthStatus } = useSession()
  const [supabaseSession, setSupabaseSession] = useState<any>(null)

  // Set up advanced scroll animations with GSAP
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const sections = [pdfSectionRef, assessSectionRef, finalSectionRef, aiAssistantSectionRef];
    
    sections.forEach((sectionRef) => {
      if (!sectionRef.current) return;
      
      // Create animation for each section
      gsap.fromTo(
        sectionRef.current.querySelectorAll('.animate-on-scroll'),
        {
          y: 60,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
      
      // Create parallax effect for background elements
      gsap.fromTo(
        sectionRef.current.querySelectorAll('.bg-parallax'),
        {
          y: 0,
        },
        {
          y: -50,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );
    });
    
    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Check for Supabase session and subscribe to auth changes
  useEffect(() => {
    const checkSupabaseAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setSupabaseSession(session)

      // Subscribe to auth changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setSupabaseSession(session)
      })

      return () => subscription.unsubscribe()
    }

    checkSupabaseAuth()
  }, [])

  // Combined session check that updates with auth state changes
  const isAuthenticated = Boolean(nextAuthSession || supabaseSession)

  // Don't render while checking auth status
  if (nextAuthStatus === "loading") {
    return null
  }

  const handleAIAssistantClick = () => {
    if (!isAuthenticated) {
      setShowLoginAlert(true)
      return
    }
    alert('Assistente IA ativado!') // Replace with actual functionality
  }

  return (
    <motion.div 
      className="relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      
      <AboutSection />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Fundo decorativo */}
        <div className="absolute top-40 left-0 w-full h-[800px] bg-gradient-to-r from-[#6EC1E4]/5 via-transparent to-[#B9A9FF]/5 rounded-full blur-3xl -z-10 transform -rotate-12 opacity-70"></div>
        
        <section 
          ref={pdfSectionRef}
          id="leitor-pdf" 
          className="py-24 relative overflow-hidden mb-32"
        >
          <AdvancedParallax speed={0.08} direction="left">
            <div className="bg-parallax absolute -left-20 top-10 opacity-5">
              <FileText className="h-96 w-96 text-[#6EC1E4]" />
            </div>
          </AdvancedParallax>

          <AdvancedParallax speed={0.12} direction="right">
            <div className="bg-parallax absolute -right-20 bottom-10 opacity-5">
              <FileType className="h-96 w-96 text-[#B9A9FF]" />
            </div>
          </AdvancedParallax>

          <div className="animate-on-scroll text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <span className="px-4 py-1.5 bg-gradient-to-r from-[#6EC1E4]/10 to-[#B9A9FF]/10 rounded-full text-sm font-medium text-[#6EC1E4] inline-block mb-4">
                Ferramenta Exclusiva
              </span>
              
              <ThreeDText
                text="Leitor de PDF Inteligente"
                gradient={true}
                depth={10}
                perspective={1000}
                fontSize="3rem"
                className="mb-4"
              />
              
              <p className="text-[#666666] max-w-2xl mx-auto">
                Revolucione sua forma de estudar com nossa ferramenta de análise de documentos com IA
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <motion.div 
              className="animate-on-scroll bg-white rounded-xl p-8 shadow-xl border border-gray-100 relative overflow-hidden"
              whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
              transition={{ duration: 0.4 }}
            >
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#6EC1E4] to-[#B9A9FF]"></div>
              
              <h3 className="text-2xl font-bold text-[#333333] mb-6">Como Funciona</h3>
              
              <div className="space-y-6">
                <motion.div 
                  className="flex items-start"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="flex-shrink-0 bg-[#F0F9FF] p-4 rounded-xl mr-5">
                    <FileUp className="h-7 w-7 text-[#6EC1E4]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#333333] mb-1">1. Carregue seu PDF</h4>
                    <p className="text-[#666666]">Faça upload de qualquer documento PDF relacionado à fisioterapia neonatal</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-start"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="flex-shrink-0 bg-[#F0F9FF] p-4 rounded-xl mr-5">
                    <Search className="h-7 w-7 text-[#6EC1E4]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#333333] mb-1">2. Analise o conteúdo</h4>
                    <p className="text-[#666666]">Nossa IA extrai automaticamente o texto do documento para análise</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-start"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="flex-shrink-0 bg-[#F0F9FF] p-4 rounded-xl mr-5">
                    <MessageSquare className="h-7 w-7 text-[#6EC1E4]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#333333] mb-1">3. Faça perguntas</h4>
                    <p className="text-[#666666]">Interaja com o documento através de perguntas ou solicite resumos</p>
                </div>
                </motion.div>
              </div>
            </motion.div>
            
            <motion.div 
              className="animate-on-scroll bg-white rounded-xl p-8 shadow-xl border border-gray-100 relative overflow-hidden"
              whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
              transition={{ duration: 0.4 }}
            >
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#B9A9FF] to-[#6EC1E4]"></div>
              
              <h3 className="text-2xl font-bold text-[#333333] mb-6">Por Que Usar</h3>
              
              <div className="space-y-6">
                <motion.div 
                  className="flex items-start"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="flex-shrink-0 bg-[#F8F5FF] p-4 rounded-xl mr-5">
                    <BookOpen className="h-7 w-7 text-[#B9A9FF]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#333333] mb-1">Estudo Otimizado</h4>
                    <p className="text-[#666666]">Extraia informações chave de artigos científicos e materiais de estudo rapidamente</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-start"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="flex-shrink-0 bg-[#F8F5FF] p-4 rounded-xl mr-5">
                    <RefreshCw className="h-7 w-7 text-[#B9A9FF]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#333333] mb-1">Menos tempo, mais aprendizado</h4>
                    <p className="text-[#666666]">Reduza o tempo de leitura obtendo resumos e explicações personalizadas</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-start"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="flex-shrink-0 bg-[#F8F5FF] p-4 rounded-xl mr-5">
                    <Brain className="h-7 w-7 text-[#B9A9FF]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#333333] mb-1">Compreensão aprofundada</h4>
                    <p className="text-[#666666]">Tire dúvidas específicas sobre o conteúdo diretamente com nossa IA</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
            </div>
          
          <div className="animate-on-scroll flex flex-wrap justify-center items-center gap-4">
            <MagneticButton
              backgroundGradient={true}
              glowOnHover={true}
              className="px-8 py-4 font-medium"
              href="/documentos"
            >
              <span className="flex items-center">
                Experimentar Leitor de PDF
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
            </MagneticButton>
            
            <MagneticButton
              variant="subtle"
              className="px-8 py-4 font-medium border-2 border-[#6EC1E4] text-[#6EC1E4]"
              href="/temas"
            >
              <span className="flex items-center">
                Explorar Temas
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
            </MagneticButton>
          </div>
        </section>

        {/* Nova seção - Tutorial do Assistente IA */}
        <section 
          id="assistente-ia"
          className="py-24 my-32 relative"
          ref={aiAssistantSectionRef}
        >
          <AlertDialog
            isOpen={showLoginAlert}
            onClose={() => setShowLoginAlert(false)}
            title="Login Necessário"
            message="Para acessar o Assistente IA, faça login na plataforma."
            type="success"
          />
          <AdvancedParallax speed={0.12} direction="diagonal" className="absolute inset-0">
            <div className="bg-gradient-to-br from-[#6EC1E4]/10 to-[#B9A9FF]/10 rounded-3xl h-full w-full"></div>
          </AdvancedParallax>
          
          <motion.div 
            className="absolute inset-0 bg-white/90 backdrop-blur-md rounded-3xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true, amount: 0.3 }}
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, amount: 0.3 }}
                className="animate-on-scroll"
              >
                <span className="px-4 py-1.5 bg-gradient-to-r from-[#6EC1E4]/10 to-[#B9A9FF]/10 rounded-full text-sm font-medium text-[#6EC1E4] inline-block mb-4">
                  Assistente inteligente
                </span>
                
                <ThreeDText
                  text="Seu Assistente IA Pessoal"
                  gradient={true}
                  depth={8}
                  fontSize="2.5rem"
                  fontWeight="700"
                  className="mb-6"
                />
                
                <p className="text-lg text-[#666666] mb-4 leading-relaxed">
                  Explore todo o potencial do FisioNeo com nosso Assistente IA, projetado para enriquecer sua experiência de aprendizado e tornar o estudo da fisioterapia neonatal mais eficiente e personalizado.
                </p>
                
                <p className="text-lg text-[#666666] mb-6 leading-relaxed">
                  Nosso assistente inteligente está disponível em todas as páginas do site, pronto para ajudar você a compreender conceitos complexos, oferecer explicações detalhadas e guiar seu aprendizado.
                </p>
                
                <div className="space-y-6 mb-8">
                  <motion.div 
                    className="flex items-start"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="flex-shrink-0 bg-[#F0F9FF] p-4 rounded-xl mr-5">
                      <MessageSquare className="h-7 w-7 text-[#6EC1E4]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#333333] mb-1">Faça perguntas sobre o conteúdo</h4>
                      <p className="text-[#666666]">Tire suas dúvidas sobre qualquer tópico de fisioterapia neonatal com respostas precisas e atualizadas</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-start"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="flex-shrink-0 bg-[#F0F9FF] p-4 rounded-xl mr-5">
                      <BookOpen className="h-7 w-7 text-[#6EC1E4]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#333333] mb-1">Solicite explicações detalhadas</h4>
                      <p className="text-[#666666]">Peça para o assistente explicar conceitos complexos de forma simples e adaptada ao seu nível de conhecimento</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-start"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="flex-shrink-0 bg-[#F0F9FF] p-4 rounded-xl mr-5">
                      <Sparkles className="h-7 w-7 text-[#6EC1E4]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#333333] mb-1">Obtenha resumos personalizados</h4>
                      <p className="text-[#666666]">Receba resumos dos tópicos de estudo adaptados às suas necessidades de aprendizado</p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true, amount: 0.3 }}
                className="animate-on-scroll"
              >
                <div className="bg-white rounded-xl p-8 shadow-xl border border-gray-100 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#6EC1E4] to-[#B9A9FF]"></div>
                  
                  <h3 className="text-2xl font-bold text-[#333333] mb-6">Como utilizar o Assistente IA</h3>
                  
                  <div className="space-y-8">
                    <div className="relative pl-10">
                      <div className="absolute left-0 top-0 flex items-center justify-center w-7 h-7 rounded-full bg-[#F0F9FF] text-[#6EC1E4] font-semibold">1</div>
                      <h4 className="font-semibold text-[#333333] mb-2">Encontre o botão do assistente</h4>
                      <p className="text-[#666666] mb-3">Localize o botão do Assistente IA no canto inferior direito da tela em qualquer página do site.</p>
                      <div className="p-3 bg-[#F8F9FA] rounded-lg flex items-center gap-3">
                        <Sparkles className="h-5 w-5 text-[#6EC1E4]" />
                        <span className="text-[#333333] font-medium">Assistente IA</span>
                      </div>
                    </div>
                    
                    <div className="relative pl-10">
                      <div className="absolute left-0 top-0 flex items-center justify-center w-7 h-7 rounded-full bg-[#F0F9FF] text-[#6EC1E4] font-semibold">2</div>
                      <h4 className="font-semibold text-[#333333] mb-2">Clique para ativar</h4>
                      <p className="text-[#666666] mb-3">Clique no botão para abrir o painel de conversa do assistente e iniciar a interação.</p>
                    </div>
                    
                    <div className="relative pl-10">
                      <div className="absolute left-0 top-0 flex items-center justify-center w-7 h-7 rounded-full bg-[#F0F9FF] text-[#6EC1E4] font-semibold">3</div>
                      <h4 className="font-semibold text-[#333333] mb-2">Faça suas perguntas</h4>
                      <p className="text-[#666666] mb-3">Digite suas dúvidas, peça explicações ou solicite ajuda sobre qualquer tópico de fisioterapia neonatal.</p>
                      <div className="p-3 bg-[#F8F9FA] rounded-lg text-[#666666] italic">
                        "Pode me explicar como avaliar os reflexos primitivos em bebês prematuros?"
          </div>
        </div>
                    
                    <div className="relative pl-10">
                      <div className="absolute left-0 top-0 flex items-center justify-center w-7 h-7 rounded-full bg-[#F0F9FF] text-[#6EC1E4] font-semibold">4</div>
                      <h4 className="font-semibold text-[#333333] mb-2">Interaja e aprofunde</h4>
                      <p className="text-[#666666]">Continue a conversa, peça mais detalhes ou mude de tópico conforme sua necessidade de aprendizado.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true, amount: 0.3 }}
              className="mt-12 text-center"
            >
              <MagneticButton
                backgroundGradient={true}
                glowOnHover={true}
                strength={15}
                className={`px-8 py-4 font-medium ${
                  !isAuthenticated ? 'opacity-50' : ''
                }`}
                onClick={handleAIAssistantClick}
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Experimentar Assistente IA
                </span>
              </MagneticButton>
            </motion.div>
          </div>
        </section>

        <section 
          ref={assessSectionRef}
          className="py-24 my-32 relative"
        >
          <AdvancedParallax speed={0.15} direction="vertical" className="absolute inset-0">
            <div className="bg-gradient-to-r from-[#6EC1E4]/20 to-[#B9A9FF]/20 rounded-3xl h-full w-full"></div>
          </AdvancedParallax>
          
          <motion.div 
            className="absolute inset-0 bg-white/90 backdrop-blur-md rounded-3xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true, amount: 0.3 }}
          />
          
          <div className="relative z-10 text-center max-w-3xl mx-auto px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.3 }}
              className="animate-on-scroll"
            >
              <span className="px-4 py-1.5 bg-gradient-to-r from-[#B9A9FF]/10 to-[#A090E0]/10 rounded-full text-sm font-medium text-[#A090E0] inline-block mb-4">
                Teste seus conhecimentos
              </span>
              
              <ThreeDText
                text="Avalie Seus Conhecimentos"
                gradient={true}
                depth={8}
                fontSize="2.5rem"
                fontWeight="700"
                className="mb-6"
              />
              
              <p className="text-lg text-[#666666] mb-10 leading-relaxed">
                Consolide seu aprendizado através de nossas avaliações interativas. Escolha entre provas específicas 
                por tema ou desafie-se com nossa avaliação completa que abrange todos os aspectos da fisioterapia neonatal.
              </p>
            </motion.div>
            
            <div className="animate-on-scroll flex flex-wrap justify-center gap-6">
              <MagneticButton
                backgroundGradient={true}
                glowOnHover={true}
                className="px-8 py-4 font-medium"
                href="/provas"
              >
                Iniciar Avaliação Temática
              </MagneticButton>
              
              <MagneticButton
                variant="subtle"
                className="px-8 py-4 font-medium border-2 border-[#B9A9FF] text-[#B9A9FF]"
                href="/prova-geral"
              >
                Fazer Avaliação Completa
              </MagneticButton>
          </div>
        </div>
      </section>

        <section 
          ref={finalSectionRef}
          className="py-24 md:py-32 mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <AdvancedParallax speed={0.15} direction="horizontal" scale={true}>
              <motion.div 
                className="animate-on-scroll rounded-2xl overflow-hidden shadow-xl h-[400px] flex items-center justify-center relative"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#F0F9FF] to-[#E1F5FE] rounded-2xl backdrop-blur-sm"></div>
                <div className="absolute w-full h-full flex items-center justify-center">
                  <motion.div 
                    className="relative w-40 h-40 rounded-full bg-gradient-to-r from-[#6EC1E4]/30 to-[#B9A9FF]/30 flex items-center justify-center"
                    animate={{ 
                      scale: [1, 1.05, 1],
                      opacity: [0.8, 1, 0.8],
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut" 
                    }}
                  >
                    <Baby className="h-24 w-24 text-[#6EC1E4]" />
                  </motion.div>
          </div>

                {/* Elementos decorativos */}
                <motion.div 
                  className="absolute top-10 left-10 w-16 h-16 rounded-full bg-[#6EC1E4]/10"
                  animate={{ 
                    y: [0, -10, 0],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{ 
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div 
                  className="absolute bottom-10 right-10 w-20 h-20 rounded-full bg-[#B9A9FF]/10"
                  animate={{ 
                    y: [0, 10, 0],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{ 
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div 
                  className="absolute top-1/2 right-16 w-8 h-8 rounded-full bg-[#A8E6CF]/20"
                  animate={{ 
                    x: [0, 5, 0],
                    opacity: [0.6, 0.9, 0.6]
                  }}
                  transition={{ 
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            </AdvancedParallax>

            <div className="animate-on-scroll">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <span className="px-4 py-1.5 bg-gradient-to-r from-[#6EC1E4]/10 to-[#6EC1E4]/5 rounded-full text-sm font-medium text-[#6EC1E4] inline-block mb-4">
                  Especialidade em crescimento
                </span>
                
                <ThreeDText
                  text="Fisioterapia Neonatal"
                  gradient={true}
                  depth={8}
                  fontSize="2.5rem"
                  className="mb-6"
                />
                
                <p className="text-lg text-[#666666] mb-4 leading-relaxed">
                  A fisioterapia neonatal é uma especialidade que atua na prevenção, avaliação e tratamento de alterações
                  no desenvolvimento neuropsicomotor de recém-nascidos.
                </p>
                <p className="text-lg text-[#666666] mb-8 leading-relaxed">
                  Nosso portal oferece recursos educacionais para profissionais e estudantes interessados nesta área
                  fundamental para o desenvolvimento saudável de bebês.
                </p>
                
                <MagneticButton
                  backgroundGradient={true}
                  glowOnHover={true}
                  strength={15}
                  className="px-8 py-4 font-medium inline-flex items-center"
                  href="/temas"
                >
                  Saiba Mais
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </MagneticButton>
              </motion.div>
          </div>
        </div>
      </section>
      </div>
    </motion.div>
  )
}
