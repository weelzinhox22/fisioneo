'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type Direction = 'horizontal' | 'vertical' | 'left' | 'right' | 'up' | 'down';

type AdvancedParallaxProps = {
  children: React.ReactNode;
  speed?: number;
  direction?: Direction;
  className?: string;
  delay?: number;
  ease?: string;
  threshold?: number;
  triggerOffset?: number; // How far from the edge of the viewport to trigger the animation
  transformOrigin?: string;
  perspective?: number;
  blur?: boolean;
  scale?: boolean;
};

export function AdvancedParallax({
  children,
  speed = 0.5,
  direction = 'vertical',
  className = '',
  delay = 0,
  ease = 'power2.out',
  threshold = 0.2,
  triggerOffset = 100,
  transformOrigin = 'center',
  perspective = 1000,
  blur = false,
  scale = false,
}: AdvancedParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inViewRef, inView] = useInView({
    threshold,
    triggerOnce: false,
  });
  
  const controls = useAnimation();
  
  // Combine refs
  const setRefs = React.useCallback(
    (node: HTMLDivElement | null) => {
      // Ref for framer-motion
      ref.current = node;
      // Ref for intersection observer
      inViewRef(node);
    },
    [inViewRef],
  );
  
  // Map directional aliases to primary directions
  const getNormalizedDirection = (dir: Direction): 'horizontal' | 'vertical' => {
    if (dir === 'left' || dir === 'right') return 'horizontal';
    if (dir === 'up' || dir === 'down') return 'vertical';
    return dir;
  };
  
  // Get movement multiplier based on direction
  const getDirectionMultiplier = (dir: Direction): { x: number, y: number } => {
    switch (dir) {
      case 'left': return { x: -1, y: 0 };
      case 'right': return { x: 1, y: 0 };
      case 'up': return { x: 0, y: -1 };
      case 'down': return { x: 0, y: 1 };
      case 'horizontal': return { x: 1, y: 0 };
      case 'vertical': return { x: 0, y: 1 };
      default: return { x: 0, y: 1 };
    }
  };
  
  // Scroll-based animations
  useEffect(() => {
    if (!ref.current) return;
    
    const element = ref.current;
    const normalizedDirection = getNormalizedDirection(direction);
    const dirMultiplier = getDirectionMultiplier(direction);
    
    // GSAP animation for advanced parallax effect
    const setGsapAnimation = () => {
      const yMovement = 100 * speed * dirMultiplier.y;
      const xMovement = 100 * speed * dirMultiplier.x;
      
      gsap.fromTo(
        element,
        {
          y: yMovement,
          x: xMovement,
          opacity: blur ? 0.8 : 1,
          scale: scale ? 0.95 : 1,
          filter: blur ? 'blur(4px)' : 'none',
          transformOrigin,
        },
        {
          y: -yMovement,
          x: -xMovement,
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          ease,
          scrollTrigger: {
            trigger: element,
            start: `top bottom-=${triggerOffset}px`,
            end: `bottom top+=${triggerOffset}px`,
            scrub: true,
            // markers: process.env.NODE_ENV === 'development',
          },
        }
      );
    };
    
    // Initial entrance animation
    const initialAnimation = () => {
      const initialY = normalizedDirection === 'vertical' ? 50 : 0;
      const initialX = normalizedDirection === 'horizontal' ? 50 * (direction === 'left' ? -1 : 1) : 0;
      
      gsap.fromTo(
        element,
        {
          y: initialY,
          x: initialX,
          opacity: 0,
          scale: scale ? 0.9 : 1,
        },
        {
          y: 0,
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          delay,
          ease,
        }
      );
    };
    
    // Set up both animations
    setGsapAnimation();
    initialAnimation();
    
    // Cleanup
    return () => {
      const triggers = ScrollTrigger.getAll();
      triggers.forEach(trigger => {
        if (trigger.vars.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [speed, direction, delay, ease, threshold, triggerOffset, transformOrigin, scale, blur]);
  
  // Update animation when in view
  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        x: 0,
        transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] }
      });
    }
  }, [controls, inView]);
  
  return (
    <div
      ref={setRefs}
      className={`overflow-hidden ${className}`}
      style={{ perspective: `${perspective}px` }}
    >
      {children}
    </div>
  );
} 