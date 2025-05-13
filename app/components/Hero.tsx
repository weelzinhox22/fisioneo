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
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  
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
  }, [controls]);
  
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
            <Image 
              src="/images/feto/hero-bg.webp" 
              alt="Fisioterapia Neonatal"
              fill
              priority
              quality={isMobile ? 80 : 95}
              sizes="100vw"
              style={{ 
                objectFit: 'cover',
                objectPosition: 'center right',
              }}
            />
            
            {/* Imagem hero-baby sobreposta */}
            <motion.div 
              className={`absolute ${isMobile ? 'w-[80%] h-[75%] right-0 bottom-0' : 'w-[70%] h-[95%] right-0 bottom-0'} z-[1]`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ 
                opacity: 1, 
                x: 0,
                y: [0, -10, 0], // Efeito de flutuação suave
              }}
              transition={{ 
                duration: 1.2, 
                delay: 0.5, 
                ease: [0.25, 0.1, 0.25, 1.0],
                y: {
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }
              }}
            >
              <Image 
                src="/images/feto/hero-baby.png" 
                alt="Bebê"
                fill
                priority
                quality={100}
                sizes="(max-width: 1080px) 120vw, 120vw"
                style={{ 
                  objectFit: 'contain',
                  objectPosition: 'top 15% right 5%',
                  filter: 'drop-shadow(0 10px 25px rgba(0,0,0,0.15))'
                }}
              />
            </motion.div>
          </div>
        )}
        
        {/* Advanced gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/60 to-transparent" />
        
        {/* Animated particle overlay */}
        <Particles count={isMobile ? 30 : 80} />
      </motion.div>
      
      {/* Content section with parallax and staggered animations */}
      <motion.div 
        className="relative z-10 h-full max-w-screen-xl mx-auto"
        style={{ opacity: opacityTransform }}
      >
        <div className="flex flex-col justify-center h-full px-8 lg:px-16">
          <motion.div
            ref={contentRef}
            initial={{ opacity: 0, y: 40 }}
            animate={controls}
            variants={containerVariants}
            className="md:max-w-[60%] lg:max-w-[55%]"
          >
            <motion.div 
              variants={itemVariants}
              className="mb-6"
            >
              <AdvancedParallax speed={0.2} direction="horizontal" blur={true}>
                <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/30 to-pink-500/30 backdrop-blur-sm border border-purple-500/40 text-sm font-medium text-white">
                  Fisioterapia avançada para bebês
                </span>
              </AdvancedParallax>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="mb-8"
              style={{ y: titleParallax }}
            >
              <ThreeDText
                text={<>Fisioterapia<br/>Neonatal</>}
                gradient={true}
                depth={3}
                fontSize={isMobile ? '3.5rem' : '5rem'}
                perspective={1200}
                interactive={true}
                className="font-bold"
                reduceLayersForMultiline={true}
              />
            </motion.div>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg text-gray-100 mb-10 font-medium leading-relaxed max-w-xl text-shadow"
            >
              Portal educacional dedicado ao estudo e prática da fisioterapia em recém-nascidos e crianças, com foco em desenvolvimento neuromotor, avaliação e intervenção precoce.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <ScrollTo targetId="leitor-pdf" offset={-100}>
                <MagneticButton
                  backgroundGradient={true}
                  glowOnHover={true}
                  strength={20}
                  className="px-8 py-4 font-medium"
                >
                  <span className="flex items-center">
                    Explorar Recursos
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                </MagneticButton>
              </ScrollTo>
              
              <ScrollTo targetId="sobre" offset={-80}>
                <MagneticButton
                  variant="subtle"
                  className="px-8 py-4 font-medium text-white border-2 border-white/30 hover:bg-white/10"
                >
                  Saiba Mais
                </MagneticButton>
              </ScrollTo>
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
  );
}; 