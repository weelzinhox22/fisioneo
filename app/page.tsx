"use client"

import { useEffect, useRef, useState, useCallback, useLayoutEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bell, X, ArrowRight, BookOpen, FileText, Star, Users, CheckCircle, Calendar, Sparkles, FilePlus, LayoutDashboard } from "lucide-react"
import { Hero } from "@/app/components/Hero"
import { useSession } from "next-auth/react"
import { supabase } from "@/lib/supabase"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)

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
  const bgShapeRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)

  // Parallax shapes extras
  const parallaxRef1 = useRef<HTMLDivElement>(null)
  const parallaxRef2 = useRef<HTMLDivElement>(null)

  // Contadores animados
  const stats = [18, 90, 4.9]
  const [statValues, setStatValues] = useState([0, 0, 0])

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

  // Animação de background com GSAP
  useEffect(() => {
    if (!bgShapeRef.current) return;
    gsap.to(bgShapeRef.current, {
      y: 30,
      scale: 1.05,
      repeat: -1,
      yoyo: true,
      duration: 4,
      ease: "power1.inOut"
    });
  }, []);

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

  // Scroll automático da timeline em telas pequenas
  useEffect(() => {
    const el = timelineRef.current;
    if (!el) return;
    if (window.innerWidth >= 768) return; // só mobile/tablet

    let scrollAmount = 0;
    const maxScroll = el.scrollWidth - el.clientWidth;
    let direction = 1;
    const interval = setInterval(() => {
      if (!el) return;
      if (el.scrollLeft >= maxScroll) direction = -1;
      if (el.scrollLeft <= 0) direction = 1;
      el.scrollTo({ left: el.scrollLeft + direction * 1.2, behavior: "smooth" });
    }, 16);
    return () => clearInterval(interval);
  }, []);

  // Scroll Reveal GSAP
  useLayoutEffect(() => {
    const revealEls = gsap.utils.toArray<HTMLElement>(".gsap-reveal")
    revealEls.forEach((el, i) => {
      gsap.fromTo(el, { opacity: 0, y: 60 }, {
        opacity: 1, y: 0, duration: 0.8, delay: 0.1 * i,
        scrollTrigger: { trigger: el, start: "top 85%" }
      })
    })
  }, [])

  // Parallax shapes
  useLayoutEffect(() => {
    if (parallaxRef1.current && parallaxRef2.current) {
      gsap.to(parallaxRef1.current, {
        y: 60, scale: 1.08, repeat: -1, yoyo: true, duration: 7, ease: "power1.inOut"
      })
      gsap.to(parallaxRef2.current, {
        y: -40, scale: 1.04, repeat: -1, yoyo: true, duration: 6, ease: "power1.inOut"
      })
    }
  }, [])

  // Linha do tempo animada
  useLayoutEffect(() => {
    if (!timelineRef.current) return
    const line = timelineRef.current.querySelector('.timeline-line') as HTMLElement
    if (!line) return
    gsap.fromTo(line, { scaleX: 0 }, {
      scaleX: 1, transformOrigin: "left center", duration: 1.2,
      scrollTrigger: { trigger: timelineRef.current, start: "top 80%", end: "bottom 60%", scrub: 1 }
    })
  }, [])

  // Sticky animado estatísticas
  useLayoutEffect(() => {
    const el = document.querySelector('.stats-sticky')
    if (!el) return
    gsap.fromTo(el, { y: 40, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.7,
      scrollTrigger: { trigger: el, start: "top 90%" }
    })
  }, [])

  // Texto com máscara
  useLayoutEffect(() => {
    const el = document.querySelector('.mask-title')
    if (!el) return
    gsap.fromTo(el, { clipPath: 'inset(0 100% 0 0)' }, {
      clipPath: 'inset(0 0% 0 0)', duration: 1,
      scrollTrigger: { trigger: el, start: "top 85%" }
    })
  }, [])

  // Contadores animados
  useEffect(() => {
    let frame: number
    let start = [0, 0, 0]
    let end = stats
    let duration = 1200
    let startTime: number | null = null
    function animateCount(ts: number) {
      if (!startTime) startTime = ts
      const progress = Math.min((ts - startTime) / duration, 1)
      setStatValues([
        Math.floor(progress * end[0]),
        Math.floor(progress * end[1]),
        Math.round(progress * end[2] * 10) / 10
      ])
      if (progress < 1) frame = requestAnimationFrame(animateCount)
      else setStatValues(end)
    }
    requestAnimationFrame(animateCount)
    return () => cancelAnimationFrame(frame)
  }, [])

  // Cards 3D/flip
  useLayoutEffect(() => {
    cardRefs.current.forEach((card) => {
      if (card) {
        card.addEventListener("mousemove", (e) => {
          const rect = card.getBoundingClientRect()
          const x = e.clientX - rect.left
          const y = e.clientY - rect.top
          const rotateY = ((x / rect.width) - 0.5) * 12
          const rotateX = ((y / rect.height) - 0.5) * -12
          gsap.to(card, { rotateY, rotateX, duration: 0.3, ease: "power2.out" })
        })
        card.addEventListener("mouseleave", () => {
          gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.4, ease: "power2.out" })
        })
      }
    })
  }, [])

  // Scroll horizontal controlado na timeline (desktop)
  useLayoutEffect(() => {
    if (!timelineRef.current) return
    if (window.innerWidth < 768) return
    const el = timelineRef.current
    const onScroll = () => {
      const section = el.getBoundingClientRect()
      if (section.top < 120 && section.bottom > 200) {
        el.scrollLeft = ((window.scrollY - el.offsetTop) * 0.7)
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Don't render while checking auth status
  if (nextAuthStatus === "loading") {
    return null
  }

  // Variantes para stagger dos cards
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.2
      }
    }
  }
  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.97, rotate: -2 },
    show: { opacity: 1, y: 0, scale: 1, rotate: 0, transition: { type: "spring", stiffness: 60, damping: 12 } }
  }
  const titleVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    show: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 120, delay: 0.1 } }
  }

  // Variantes para timeline
  const timelineVariants = {
    hidden: { opacity: 0, y: 40 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.2 + i * 0.18, duration: 0.7, type: "spring", stiffness: 60 }
    })
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
      {/* BG animado sutil */}
      <div ref={bgShapeRef} className="absolute left-1/2 top-[60%] -translate-x-1/2 -z-10 w-[600px] h-[300px] bg-gradient-to-r from-[#B9A9FF]/30 to-[#6EC1E4]/30 blur-3xl rounded-full opacity-60" />
      {/* Seção de Introdução - Melhorada */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50 bg-[length:100%_200%] bg-no-repeat">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div initial="hidden" animate="show" variants={titleVariants}>
              <h2 className="mask-title text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800 overflow-hidden">
                Fisioterapia Neonatal
              </h2>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
              <p className="text-lg text-gray-600 mb-8 text-center leading-relaxed">
                A Fisioneo é uma plataforma educacional dedicada à fisioterapia neonatal e pediátrica, reunindo recursos essenciais para o aprendizado e aprimoramento profissional. Aqui você encontra avaliações interativas, materiais atualizados, trilhas de estudo e conteúdos baseados em evidências.
              </p>
            </motion.div>
            {/* Estatísticas rápidas */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }} className="stats-sticky flex flex-wrap justify-center gap-6 mb-12 sticky top-20 z-10">
              <div className="flex flex-col items-center bg-white/80 rounded-xl px-6 py-4 shadow border border-gray-100 min-w-[120px]">
                <BookOpen className="h-7 w-7 text-[#B9A9FF] mb-1" />
                <span className="text-2xl font-bold text-[#B9A9FF]">+{statValues[0]}</span>
                <span className="text-xs text-gray-500">Materiais</span>
              </div>
              <div className="flex flex-col items-center bg-white/80 rounded-xl px-6 py-4 shadow border border-gray-100 min-w-[120px]">
                <FileText className="h-7 w-7 text-[#FFB347] mb-1" />
                <span className="text-2xl font-bold text-[#FFB347]">+{statValues[1]}</span>
                <span className="text-xs text-gray-500">Questões</span>
              </div>
              <div className="flex flex-col items-center bg-white/80 rounded-xl px-6 py-4 shadow border border-gray-100 min-w-[120px]">
                <Star className="h-7 w-7 text-[#FFD700] mb-1" />
                <span className="text-2xl font-bold text-[#FFD700]">{statValues[2]}</span>
                <span className="text-xs text-gray-500">Avaliação média</span>
              </div>
            </motion.div>
            {/* Timeline horizontal de atualizações */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full max-w-5xl mx-auto mb-20"
            >
              <h3 className="text-xl font-bold text-center mb-8 text-gray-700">Linha do Tempo de Atualizações</h3>
              <div ref={timelineRef} className="relative overflow-x-auto scrollbar-none md:overflow-x-visible py-8">
                {/* Linha central */}
                <div className="timeline-line absolute left-0 right-0 top-1/2 md:top-[60px] h-1 bg-gradient-to-r from-[#6EC1E4]/30 to-[#B9A9FF]/30 rounded-full z-0 mx-8 md:mx-16 scale-x-0" style={{minWidth: '600px'}} />
                <div className="relative flex md:flex-wrap gap-12 px-8 md:px-16 items-end min-w-[600px] md:min-w-0 justify-center z-10">
                  {[
                    {
                      icon: <FilePlus className="h-6 w-6 text-[#6EC1E4]" />, date: "22/05/2025", title: "+10 materiais adicionados", desc: "Novos PDFs e resumos de Neonatologia e Pediatria." },
                    {
                      icon: <Sparkles className="h-6 w-6 text-[#FFD700]" />, date: "30/05/2025", title: "Nova prova de Neonatologia", desc: "Simulado completo com gabarito comentado." },
                    {
                      icon: <LayoutDashboard className="h-6 w-6 text-[#B9A9FF]" />, date: "10/05/2025", title: "Atualização de interface", desc: "Visual mais moderno, responsivo e animado." },
                    {
                      icon: <Calendar className="h-6 w-6 text-[#FFB347]" />, date: "30/05/2025", title: "Lançamento do Simulado Pediátrico", desc: "Questões inéditas para prática clínica." },
                  ].map((event, i, arr) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.95, y: 30 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.6, delay: 0.1 * i }}
                      className="relative flex flex-col items-center group min-w-[180px] max-w-[220px]"
                    >
                      {/* Ícone sem círculo de fundo */}
                      <div className="z-10 mb-2 flex items-center justify-center">{event.icon}</div>
                      {/* Card */}
                      <div className={`relative bg-white/95 rounded-xl shadow-lg border-2 ${i===0? 'border-[#6EC1E4]/30': i===1? 'border-[#FFD700]/30': i===2? 'border-[#B9A9FF]/30':'border-[#FFB347]/30'} px-5 py-4 w-full mt-2 group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-300`}
                      >
                        <div className="text-xs font-semibold text-gray-500 mb-1 text-center tracking-wide">{event.date}</div>
                        <div className="font-bold text-gray-800 text-center mb-1 text-base">{event.title}</div>
                        <div className="text-gray-500 text-sm text-center">{event.desc}</div>
                      </div>
                      {/* Linha de conexão (mobile: oculta, desktop: visível) */}
                      {i < arr.length - 1 && (
                        <div className="hidden md:block absolute right-0 top-5 w-12 h-1 bg-gradient-to-r from-[#6EC1E4]/30 to-[#B9A9FF]/30 rounded-full z-0" />
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
            {/* Cards principais */}
            <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8 gsap-reveal" variants={containerVariants} initial="hidden" animate="show">
              <motion.div ref={el => { cardRefs.current[0] = el; return undefined; }} variants={cardVariants} className="relative bg-gradient-to-br from-[#e0f2fe] to-[#f3e8ff] p-6 rounded-2xl border border-gray-100 shadow-md transition-all duration-300 group hover:shadow-xl hover:-translate-y-1 overflow-hidden">
                <div className="absolute -top-4 -right-4 opacity-20 text-[#6EC1E4] rotate-12"><CheckCircle className="h-16 w-16" /></div>
                <motion.h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2" variants={titleVariants}><FileText className="h-5 w-5 text-[#6EC1E4]" /> Avaliações</motion.h3>
                <p className="text-gray-600 mb-2">Teste seus conhecimentos com questões especializadas em fisioterapia neonatal e pediátrica.</p>
                <span className="inline-block text-xs bg-[#6EC1E4]/10 text-[#6EC1E4] px-2 py-1 rounded-full font-medium">Simulados & Gabaritos</span>
              </motion.div>
              <motion.div ref={el => { cardRefs.current[1] = el; return undefined; }} variants={cardVariants} className="relative bg-gradient-to-br from-[#ede9fe] to-[#e0f2fe] p-6 rounded-2xl border border-gray-100 shadow-md transition-all duration-300 group hover:shadow-xl hover:-translate-y-1 overflow-hidden">
                <div className="absolute -top-4 -right-4 opacity-20 text-[#B9A9FF] rotate-12"><BookOpen className="h-16 w-16" /></div>
                <motion.h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2" variants={titleVariants}><BookOpen className="h-5 w-5 text-[#B9A9FF]" /> Materiais</motion.h3>
                <p className="text-gray-600 mb-2">Acesse conteúdos sobre desenvolvimento neuromotor, método canguru e hidroterapia neonatal.</p>
                <span className="inline-block text-xs bg-[#B9A9FF]/10 text-[#B9A9FF] px-2 py-1 rounded-full font-medium">PDFs & Resumos</span>
              </motion.div>
              <motion.div ref={el => { cardRefs.current[2] = el; return undefined; }} variants={cardVariants} className="relative bg-gradient-to-br from-[#fffbe6] to-[#e0f2fe] p-6 rounded-2xl border border-gray-100 shadow-md transition-all duration-300 group hover:shadow-xl hover:-translate-y-1 overflow-hidden">
                <div className="absolute -top-4 -right-4 opacity-20 text-[#FFD700] rotate-12"><Star className="h-16 w-16" /></div>
                <motion.h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2" variants={titleVariants}><Star className="h-5 w-5 text-[#FFD700]" /> Evidências</motion.h3>
                <p className="text-gray-600 mb-2">Conteúdo baseado em pesquisas científicas atualizadas para sua formação acadêmica.</p>
                <span className="inline-block text-xs bg-[#FFD700]/10 text-[#FFD700] px-2 py-1 rounded-full font-medium">Atualização científica</span>
              </motion.div>
            </motion.div>
            {/* Timeline animada: Como funciona */}
            <div className="max-w-2xl mx-auto mt-16">
              <h3 className="text-xl font-bold text-center mb-8 text-gray-700">Como funciona a Fisioneo?</h3>
              <div className="flex flex-col gap-8">
                {[
                  { icon: <CheckCircle className="h-6 w-6 text-[#6EC1E4]" />, title: "Escolha seu tema", desc: "Selecione entre diversos módulos de fisioterapia neonatal e pediátrica." },
                  { icon: <FileText className="h-6 w-6 text-[#B9A9FF]" />, title: "Estude com materiais exclusivos", desc: "Acesse resumos, PDFs e artigos científicos." },
                  { icon: <Star className="h-6 w-6 text-[#FFD700]" />, title: "Teste seus conhecimentos", desc: "Realize avaliações interativas e veja seu desempenho na hora." },
                ].map((step, i) => (
                  <motion.div
                    key={i}
                    custom={i}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.6 }}
                    variants={timelineVariants}
                    className="flex items-start gap-4 bg-white/80 rounded-lg shadow border border-gray-100 px-4 py-3"
                  >
                    <div className="flex-shrink-0 mt-1">{step.icon}</div>
                    <div>
                      <div className="font-semibold text-gray-800">{step.title}</div>
                      <div className="text-gray-500 text-sm">{step.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            {/* Depoimento de aluno */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-2xl mx-auto mt-16 bg-white/90 rounded-2xl shadow-lg border border-gray-100 p-8 text-center gsap-reveal"
            >
              <div className="flex justify-center mb-3">
                <Star className="h-6 w-6 text-[#FFD700]" />
                <Star className="h-6 w-6 text-[#FFD700]" />
                <Star className="h-6 w-6 text-[#FFD700]" />
                <Star className="h-6 w-6 text-[#FFD700]" />
                <Star className="h-6 w-6 text-[#FFD700]" />
              </div>
              <p className="text-gray-700 text-lg mb-2">“A Fisioneo me ajudou a entender de verdade o raciocínio clínico neonatal. Os simulados e materiais são muito didáticos e práticos!”</p>
              <div className="text-sm text-gray-500">— Depoimento de um estudante de Fisioterapia</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 1 }}
              className="flex justify-center mt-10"
            >
              <a href="/pediatria" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#6EC1E4] to-[#B9A9FF] text-white rounded-lg font-semibold text-lg shadow-md hover:scale-105 hover:shadow-lg transition-all">
                Explorar conteúdos
                <ArrowRight className="h-5 w-5" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Shapes de parallax extra */}
      <div ref={parallaxRef1} className="absolute left-0 top-[30%] w-[300px] h-[180px] bg-[#B9A9FF]/20 blur-2xl rounded-full -z-20" />
      <div ref={parallaxRef2} className="absolute right-0 top-[70%] w-[220px] h-[120px] bg-[#6EC1E4]/20 blur-2xl rounded-full -z-20" />
    </motion.div>
  )
}
