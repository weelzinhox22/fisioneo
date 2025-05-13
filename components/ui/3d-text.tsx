'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface ThreeDTextProps {
  text: string | React.ReactNode;
  className?: string;
  color?: string;
  depth?: number;
  perspective?: number;
  fontSize?: string;
  fontWeight?: string;
  gradient?: boolean;
  interactive?: boolean;
  animateOnScroll?: boolean;
  reduceLayersForMultiline?: boolean;
}

// Define an interface for the React element props we expect
interface ReactElementWithChildren {
  props: {
    children?: React.ReactNode;
    [key: string]: any;
  };
}

export function ThreeDText({
  text,
  className = '',
  color = '#ffffff',
  depth = 20,
  perspective = 1000,
  fontSize = '4rem',
  fontWeight = '700',
  gradient = false,
  interactive = true,
  animateOnScroll = false,
  reduceLayersForMultiline = true,
}: ThreeDTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isMultiline, setIsMultiline] = useState(false);
  
  // Motion values for mouse interaction
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Apply spring physics for smooth movement
  const springX = useSpring(mouseX, { damping: 20, stiffness: 400 });
  const springY = useSpring(mouseY, { damping: 20, stiffness: 400 });
  
  // Transform the motion values for the 3D effect
  const rotateX = useTransform(springY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-15, 15]);
  
  // Detect if text has multiple lines
  useEffect(() => {
    // Check if text contains <br/> or is a React element with multiple children
    if (typeof text === 'string' && text.includes('<br')) {
      setIsMultiline(true);
    } else if (React.isValidElement(text)) {
      // Cast to our interface that includes children prop
      const element = text as ReactElementWithChildren;
      const childrenArray = React.Children.toArray(element.props.children || []);
      if (childrenArray.length > 1) {
        setIsMultiline(true);
      }
    }
  }, [text]);
  
  // Handle mouse movement
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    
    // Normalize mouse position from -0.5 to 0.5
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    mouseX.set(x);
    mouseY.set(y);
  };
  
  // Reset on mouse leave
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };
  
  // Set up intersection observer for scroll animation
  useEffect(() => {
    if (!animateOnScroll || !containerRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
          }
        });
      },
      { threshold: 0.2 }
    );
    
    observer.observe(containerRef.current);
    
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [animateOnScroll]);
  
  // Generate 3D layers
  const createTextLayers = () => {
    // Retornar array vazio para eliminar todas as camadas extras
    return [];
  };
  
  return (
    <motion.div
      ref={containerRef}
      className={`relative inline-block transform-gpu ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        perspective,
        fontSize,
        fontWeight,
        lineHeight: 1,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={
        animateOnScroll && isInView
          ? { opacity: 1, y: 0 }
          : animateOnScroll
          ? { opacity: 0, y: 40 }
          : {}
      }
      initial={animateOnScroll ? { opacity: 0, y: 40 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="relative transform-gpu"
        style={{
          transformStyle: 'preserve-3d',
          rotateX,
          rotateY,
        }}
      >
        {createTextLayers()}
        
        {/* Main visible text layer - único elemento */}
        <div
          className="relative text-center"
          style={{
            color: gradient ? 'transparent' : color,
            backgroundClip: gradient ? 'text' : 'initial',
            backgroundImage: gradient 
              ? 'linear-gradient(to right, #6EC1E4, #B9A9FF)' 
              : 'none',
            WebkitBackgroundClip: gradient ? 'text' : 'initial',
            filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.1))',
          }}
        >
          {text}
        </div>
      </motion.div>
    </motion.div>
  );
} 