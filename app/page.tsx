"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bell, X } from "lucide-react"
import { Hero } from "@/app/components/Hero"
import { useSession } from "next-auth/react"
import { supabase } from "@/lib/supabase"
import gsap from "gsap"

// Componente do Modal/Popup
interface AnnouncementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AnnouncementModal: React.FC<AnnouncementModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm" 
        onClick={onClose}
      />
      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="relative bg-white rounded-xl shadow-xl max-w-md w-full p-6 md:p-8 z-50"
      >
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>
        
        <div className="flex items-start mb-4">
          <div className="bg-blue-50 p-2 rounded-full mr-4">
            <Bell className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Comunicado Importante</h3>
            <p className="text-sm text-gray-500">29 de maio de 2024</p>
          </div>
        </div>
        
        <div className="space-y-3 text-gray-700">
          <p>
            Pensando em proporcionar uma experiência mais fluida e acessível, e por dificuldades por parte dos usuários, decidimos remover a necessidade de cadastro para acesso aos conteúdos da plataforma Fisioneo.
          </p>
          <p>
            Esta mudança foi implementada após análise cuidadosa do feedback dos usuários, tornando a plataforma mais acessível para os estudantes.
          </p>
          <p className="font-medium text-blue-600">
            Atualização de conteúdo: As questões do módulo de Fisioterapia Neonatal foram revisadas e atualizadas em 29/05/2024, com distribuição otimizada das alternativas corretas e enunciados mais elaborados.
          </p>
        </div>
        
        <div className="mt-6">
          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 bg-gradient-to-r from-[#6EC1E4] to-[#B9A9FF] text-white rounded-lg font-medium hover:shadow-md transition-all"
          >
            Entendido, obrigado!
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(true)
  const { data: nextAuthSession, status: nextAuthStatus } = useSession()
  const [supabaseSession, setSupabaseSession] = useState<any>(null)

  // Refs para animações
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  // Função para fechar o modal e salvar no localStorage
  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem('hasSeenAnnouncement-May2024', 'true');
    }
  }

  // Verificar se o usuário já viu o popup
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const hasSeenAnnouncement = localStorage.getItem('hasSeenAnnouncement-May2024');
    if (hasSeenAnnouncement) {
      setIsModalOpen(false);
    }
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

  // Configurar efeitos de hover
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Adicionar efeitos de hover aos cards
    cardRefs.current.forEach((card) => {
      if (card) {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -5,
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            duration: 0.3,
            ease: "power2.out"
          });
        });
        
        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
            duration: 0.3,
            ease: "power2.out"
          });
        });
      }
    });
    
    // Não é necessário limpar os event listeners pois o componente será desmontado
  }, []);

  // Don't render while checking auth status
  if (nextAuthStatus === "loading") {
    return null
  }

  return (
    <motion.div 
      className="relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <AnimatePresence>
        {isModalOpen && (
          <AnnouncementModal 
            isOpen={isModalOpen} 
            onClose={handleCloseModal} 
          />
        )}
      </AnimatePresence>
      
      <Hero />
      
      {/* Seção de Introdução - Simplificada */}
        <section 
        className="py-20 bg-gradient-to-b from-white to-gray-50 bg-[length:100%_200%] bg-no-repeat"
      >
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">
                Fisioterapia Neonatal
              </h2>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="text-lg text-gray-600 mb-12 text-center leading-relaxed">
                A Fisioneo é uma plataforma educacional dedicada à fisioterapia neonatal e pediátrica, 
                reunindo recursos essenciais para o aprendizado e aprimoramento profissional.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
                ref={el => {
                  cardRefs.current[0] = el;
                  return undefined;
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Avaliações</h3>
                <p className="text-gray-600">
                  Teste seus conhecimentos com questões especializadas em fisioterapia neonatal e pediátrica.
                </p>
                  </motion.div>
                  
                  <motion.div 
                ref={el => {
                  cardRefs.current[1] = el;
                  return undefined;
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Materiais</h3>
                <p className="text-gray-600">
                  Acesse conteúdos sobre desenvolvimento neuromotor, método canguru e hidroterapia neonatal.
                </p>
              </motion.div>
              
              <motion.div
                ref={el => {
                  cardRefs.current[2] = el;
                  return undefined;
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Evidências</h3>
                <p className="text-gray-600">
                  Conteúdo baseado em pesquisas científicas atualizadas para sua formação profissional.
                </p>
              </motion.div>
            </div>
            
            <motion.div
            initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="mt-16 text-center"
            >
              <p className="text-gray-500 italic max-w-2xl mx-auto">
                "A Fisioneo nasceu da necessidade de democratizar o acesso ao conhecimento especializado em fisioterapia neonatal, 
                área em crescente expansão que demanda profissionais cada vez mais capacitados."
              </p>
              </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  )
}
