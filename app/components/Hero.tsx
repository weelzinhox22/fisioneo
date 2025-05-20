'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AdvancedParallax } from '@/components/animations/advanced-parallax';
import { ThreeDText } from '@/components/ui/3d-text';
import { MagneticButton } from '@/components/ui/magnetic-button';
import { ScrollTo } from '@/components/animations/smooth-scroll';
import { Monitor, X } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

// Register GSAP plugins on client-side only
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Custom hook for responsive viewport
function useViewport() {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Safety check for SSR
    if (typeof window === 'undefined') return;
    
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
      setIsMobile(window.innerWidth < 768);
    };
    
    // Set initial values
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return { width, height, isMobile };
}

// Particle effect animation
const Particles = ({ count = 50 }) => {
  const particles = Array.from({ length: count }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    opacity: Math.random() * 0.5 + 0.1,
  }));
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
};

// Main Hero component
export const Hero = () => {
  const { isMobile } = useViewport();
  const [isClient, setIsClient] = useState(false);
  const [showDesktopHint, setShowDesktopHint] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  
  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
    };
    checkAuth();
  }, []);
  
  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  
  const imageParallax = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const titleParallax = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  
  // Initialize content on client side
  useEffect(() => {
    setIsClient(true);
    
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
      });
    }
    
    // GSAP animation for advanced image reveal
    if (imageRef.current && typeof window !== 'undefined') {
      gsap.fromTo(
        imageRef.current,
        { 
          clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
          opacity: 0.7
        },
        { 
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          opacity: 1,
          duration: 1.5,
          ease: 'power3.out',
          delay: 0.2
        }
      );
    }
    
    // Auto-hide desktop hint after 10 seconds
    if (isMobile) {
      const timer = setTimeout(() => {
        setShowDesktopHint(false);
      }, 10000);
      
      return () => clearTimeout(timer);
    }
  }, [controls, isMobile]);
  
  // Função para determinar a posição vertical do bebê com base na altura da tela
  const getBabyBottomPosition = () => {
    if (typeof window === 'undefined') return 'bottom-20';
    const screenHeight = window.innerHeight;
    if (screenHeight < 700) return 'bottom-16';
    if (screenHeight < 800) return 'bottom-20';
    return 'bottom-24';
  };
  
  // Staggered animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <div 
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Full-page image with parallax effect */}
      <motion.div 
        ref={imageRef}
        className="absolute inset-0 w-full h-full"
        style={{ y: imageParallax }}
      >
        {isClient && (
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
                <source src="/images/feto/hero-baby-vd.mp4" type="video/mp4" />
              </video>
            </div>
            
            {/* Advanced gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/60 to-transparent md:to-transparent to-black/40" />
            
            {/* Animated particle overlay */}
            <Particles count={isMobile ? 30 : 80} />
          </div>
        )}
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
            variants={containerVariants}
            className={`${isMobile ? 'mx-auto text-center' : 'md:max-w-[60%] lg:max-w-[55%]'} sm:max-w-[85%] max-w-full`}
          >
            <motion.div 
              variants={itemVariants}
              className="mb-2 md:mb-6"
            >
              <AdvancedParallax speed={0.2} direction="horizontal" blur={true}>
                <span className="inline-block px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-gradient-to-r from-purple-500/30 to-pink-500/30 backdrop-blur-sm border border-purple-500/40 text-xs md:text-sm font-medium text-white">
                  Fisioterapia avançada para bebês
                </span>
              </AdvancedParallax>
              
              {/* Texto adicional apenas em mobile - área que estava marcada em verde no print */}
              {isMobile && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="mt-2 mb-3 text-center px-1"
                >
                  <p className="text-xs text-white leading-relaxed">
                    <span className="font-semibold">Aprenda tudo sobre fisioterapia neonatal</span>: métodos, técnicas e avaliações em um único portal educacional focado em desenvolvimento infantil.
                  </p>
                </motion.div>
              )}
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="mb-6 md:mb-8"
              style={{ y: titleParallax }}
            >
              <ThreeDText
                text={<>Fisioterapia<br/>Neonatal</>}
                gradient={true}
                depth={3}
                fontSize={isMobile ? '2.7rem' : '5rem'}
                perspective={1200}
                interactive={true}
                className="font-bold"
                reduceLayersForMultiline={true}
              />
            </motion.div>
            
            <motion.p 
              variants={itemVariants}
              className="text-sm md:text-lg text-gray-100 mb-4 md:mb-10 font-medium leading-relaxed max-w-xl text-shadow"
            >
              {isMobile ? 
                "Portal educacional sobre fisioterapia em recém-nascidos e crianças, focado em desenvolvimento neuromotor." :
                "Portal educacional dedicado ao estudo e prática da fisioterapia em recém-nascidos e crianças, com foco em desenvolvimento neuromotor, avaliação e intervenção precoce."
              }
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-3 md:gap-4">
              {isMobile ? (
                <>
                  {/* Versão mobile com botões centralizados sem a imagem */}
                  <div className="w-full flex flex-col items-center">
                    <div className="flex flex-col gap-3 items-center">
                      {!isLoggedIn && (
                        <Link href="/login" className="w-full">
                          <button className="w-full text-sm text-white font-medium px-5 py-2 bg-gradient-to-r from-[#6EC1E4] to-[#B9A9FF] hover:from-[#5DAAD1] hover:to-[#A090E0] rounded-md transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]">
                            Entrar na Plataforma
                          </button>
                        </Link>
                      )}
                      
                      <ScrollTo targetId="leitor-pdf" offset={-100}>
                        <button className="text-sm text-white font-medium px-5 py-1.5 bg-[#6EC1E4]/70 hover:bg-[#6EC1E4]/90 rounded-md transition-colors">
                          Explorar Recursos
                        </button>
                      </ScrollTo>
                      
                      <ScrollTo targetId="sobre" offset={-80}>
                        <button className="text-xs text-white font-medium px-4 py-1.5 bg-white/20 hover:bg-white/30 rounded-md transition-colors">
                          Saiba Mais
                        </button>
                      </ScrollTo>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Versão desktop original */}
                  {!isLoggedIn && (
                    <Link href="/login">
                      <MagneticButton
                        backgroundGradient={true}
                        glowOnHover={true}
                        strength={20}
                        className="px-6 py-4 text-base font-medium group relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#6EC1E4] to-[#B9A9FF] hover:from-[#5DAAD1] hover:to-[#A090E0] transition-all duration-500 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                      >
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span className="flex items-center gap-2">
                          Entrar na Plataforma
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </span>
                      </MagneticButton>
                    </Link>
                  )}
                  
                  <ScrollTo targetId="leitor-pdf" offset={-100}>
                    <MagneticButton
                      backgroundGradient={true}
                      glowOnHover={true}
                      strength={20}
                      className="px-5 py-3 md:px-8 md:py-4 text-sm md:text-base font-medium"
                    >
                      <span className="flex items-center">
                        Explorar Recursos
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                    </MagneticButton>
                  </ScrollTo>
                  
                  <ScrollTo targetId="sobre" offset={-80}>
                    <MagneticButton
                      variant="subtle"
                      className="px-5 py-3 md:px-8 md:py-4 text-sm md:text-base font-medium text-white border-2 border-white/30 hover:bg-white/10"
                    >
                      Saiba Mais
                    </MagneticButton>
                  </ScrollTo>
                </>
              )}
            </motion.div>
          </motion.div>
        </div>

        {/* Hero baby centralizado abaixo da div principal - apenas no mobile */}
        {/* Removing mobile video since we're using fullscreen approach */}

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
      
      {/* Desktop Experience Hint - Only shows on mobile */}
      {isMobile && showDesktopHint && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ 
            duration: 0.5, 
            delay: 0.5,  // Reduzir o delay para 0.5 segundos
            ease: "easeOut" 
          }}
          className="fixed bottom-20 inset-x-0 mx-auto z-50 w-[90%] max-w-xs px-4"
        >
          <div className="relative bg-gradient-to-r from-[#6EC1E4]/90 to-[#B9A9FF]/90 backdrop-blur-md rounded-lg p-4 shadow-xl border border-white/20">
            <button 
              className="absolute top-2 right-2 text-white/80 hover:text-white" 
              onClick={() => setShowDesktopHint(false)}
              aria-label="Fechar aviso"
            >
              <X size={18} />
            </button>
            
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full">
                <motion.div
                  animate={{ 
                    scale: [1, 1.15, 1],
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut" 
                  }}
                >
                  <Monitor className="h-5 w-5 text-white" />
                </motion.div>
              </div>
              <div>
                <h4 className="text-white font-medium text-sm">Experiência Aprimorada</h4>
                <p className="text-white/80 text-xs mt-1 leading-relaxed">
                  Para uma melhor visualização, acesse também pelo computador ou notebook. A experiência mobile está otimizada, mas o desktop oferece recursos visuais adicionais.
                </p>
              </div>
        </div>

            <div className="mt-3 flex justify-end">
              <button 
                onClick={() => setShowDesktopHint(false)}
                className="text-xs bg-white/20 hover:bg-white/30 text-white font-medium py-1.5 px-3 rounded-md transition-colors"
              >
                Entendi
              </button>
            </div>
      </div>
        </motion.div>
      )}
    </div>
  );
}; 