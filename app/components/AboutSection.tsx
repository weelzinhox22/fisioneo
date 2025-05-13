'use client';

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { Baby, Brain, HeartPulse } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from '@/components/animations/split-text';
import { AdvancedParallax } from '@/components/animations/advanced-parallax';
import { MagneticButton } from '@/components/ui/magnetic-button';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Interactive 3D Card component with tilt effect
const InteractiveCard = ({ 
  icon, 
  title, 
  description, 
  color = '#6EC1E4',
  delay = 0 
}) => {
  const cardRef = useRef(null);
  const inView = useInView(cardRef, { once: false, threshold: 0.3 });
  
  useEffect(() => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    
    // Tilt animation on mouse move
    function handleMouseMove(e) {
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Get mouse position relative to card center
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;
      
      // Rotate based on mouse position
      const rotateX = (mouseY / (rect.height / 2)) * -5; // -5 to 5 degrees
      const rotateY = (mouseX / (rect.width / 2)) * 5; // -5 to 5 degrees
      
      gsap.to(card, {
        rotateX,
        rotateY,
        duration: 0.5,
        ease: 'power2.out',
        transformPerspective: 1000,
      });
    }
    
    // Reset on mouse leave
    function handleMouseLeave() {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.7,
        ease: 'elastic.out(1, 0.7)',
      });
    }
    
    // Add and remove event listeners
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  return (
    <motion.div
      ref={cardRef}
      className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 h-full transform-gpu"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ 
        duration: 0.8, 
        ease: [0.22, 1, 0.36, 1],
        delay: delay * 0.2 + 0.1
      }}
      style={{ transformStyle: 'preserve-3d' }}
      whileHover={{ y: -10 }}
    >
      <div 
        className="p-4 rounded-xl mb-4 w-16 h-16 flex items-center justify-center"
        style={{ backgroundColor: `${color}20` }}
      >
        {icon}
      </div>
      
      <h3 
        className="text-xl font-bold mb-3"
        style={{ color }}
      >
        {title}
      </h3>
      
      <p className="text-gray-600 leading-relaxed">
        {description}
      </p>
      
      {/* 3D shadow effect */}
      <div 
        className="absolute inset-0 rounded-2xl -z-10 opacity-20 blur-lg transform-gpu"
        style={{ 
          backgroundColor: color,
          transform: 'translateZ(-10px) scale(0.95)',
          transformStyle: 'preserve-3d'
        }}
      />
    </motion.div>
  );
};

// Main About section component
export function AboutSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const inView = useInView(sectionRef, { once: false, amount: 0.2 });
  
  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  
  const translateY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
  
  // Apply spring physics for smoother motion
  const smoothY = useSpring(translateY, { damping: 20, stiffness: 100 });
  
  // Text animation using our custom SplitText
  useEffect(() => {
    if (!headingRef.current || !descriptionRef.current || typeof window === 'undefined') return;
    
    // Split heading and description
    const headingSplit = new SplitText({
      element: headingRef.current,
      type: 'chars,words'
    });
    
    const descriptionSplit = new SplitText({
      element: descriptionRef.current,
      type: 'lines'
    });
    
    // Animate heading characters
    gsap.from(headingSplit.chars, {
      opacity: 0,
      y: 20,
      rotateX: -30,
      stagger: 0.02,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });
    
    // Animate description lines
    gsap.from(descriptionSplit.lines, {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.8,
      ease: "power3.out",
      delay: 0.3,
      scrollTrigger: {
        trigger: descriptionRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });
    
    // Cleanup
    return () => {
      headingSplit.revert();
      descriptionSplit.revert();
      
      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === headingRef.current || 
            trigger.vars.trigger === descriptionRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);
  
  // Features data
  const features = [
    {
      icon: <Baby className="h-8 w-8 text-[#6EC1E4]" />,
      title: "Desenvolvimento Neuromotor",
      description: "Acompanhamento e avaliação do desenvolvimento neuropsicomotor de recém-nascidos e bebês.",
      color: "#6EC1E4",
      delay: 0
    },
    {
      icon: <Brain className="h-8 w-8 text-[#B9A9FF]" />,
      title: "Intervenção Precoce",
      description: "Técnicas e abordagens para intervenção precoce em alterações do desenvolvimento infantil.",
      color: "#B9A9FF",
      delay: 1
    },
    {
      icon: <HeartPulse className="h-8 w-8 text-[#FF6B6B]" />,
      title: "Avaliação Especializada",
      description: "Métodos e escalas para avaliação específica de neonatos e prematuros.",
      color: "#FF6B6B",
      delay: 2
    }
  ];
  
  return (
    <section 
      id="sobre" 
      ref={sectionRef}
      className="py-20 md:py-28 relative overflow-hidden"
    >
      {/* Dynamic background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-[#F0F9FF] to-[#F7FAFC] -z-10"
        style={{
          y: smoothY,
          opacity,
          scale
        }}
      />
      
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-5">
        <div className="absolute top-10 right-[10%] w-64 h-64 rounded-full bg-gradient-to-r from-[#6EC1E4]/5 to-[#B9A9FF]/5 blur-3xl transform -rotate-12"></div>
        <div className="absolute bottom-10 left-[5%] w-96 h-96 rounded-full bg-gradient-to-r from-[#B9A9FF]/5 to-[#6EC1E4]/5 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <AdvancedParallax speed={0.5} direction="vertical" className="mb-16 text-center">
          <span className="px-4 py-1.5 bg-gradient-to-r from-[#6EC1E4]/10 to-[#B9A9FF]/10 rounded-full text-sm font-medium text-[#6EC1E4] inline-block mb-4">
            Sobre FisioNeo
          </span>
          
          <h2 
            ref={headingRef}
            className="text-4xl md:text-5xl font-bold text-[#333333] mb-6 leading-tight"
          >
            Fisioterapia Neonatal e Pediátrica
          </h2>
          
          <p 
            ref={descriptionRef}
            className="text-lg text-[#666666] max-w-3xl mx-auto leading-relaxed"
          >
            Somos um portal educacional dedicado à promoção do conhecimento em fisioterapia neonatal 
            e pediátrica, oferecendo recursos de alta qualidade para profissionais e estudantes da área.
          </p>
        </AdvancedParallax>
        
        {/* Interactive cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <InteractiveCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              color={feature.color}
              delay={feature.delay}
            />
          ))}
        </div>
        
        {/* Call to action */}
        <div className="text-center">
          <AdvancedParallax 
            direction="vertical" 
            speed={0.4}
            scale={true}
          >
            <MagneticButton
              backgroundGradient={true}
              glowOnHover={true}
              className="px-8 py-4 font-medium inline-flex items-center"
              href="/temas"
            >
              Explorar Temas
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 ml-2" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                  clipRule="evenodd" 
                />
              </svg>
            </MagneticButton>
          </AdvancedParallax>
        </div>
      </div>
    </section>
  );
} 