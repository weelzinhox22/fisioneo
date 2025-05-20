'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  strength?: number;
  radius?: number;
  backgroundGradient?: boolean;
  glowOnHover?: boolean;
  scale?: number;
  as?: React.ElementType;
  href?: string;
  target?: string;
  variant?: 'default' | 'subtle' | 'strong';
  disabled?: boolean;
  damping?: number;
  stiffness?: number;
}

export const MagneticButton = React.forwardRef<HTMLDivElement, MagneticButtonProps>(
  (
    {
      children,
      className = '',
      onClick,
      strength = 30,
      radius = 600,
      backgroundGradient = false,
      glowOnHover = false,
      scale = 1.05,
      as: Component = 'button',
      href,
      target,
      variant = 'default',
      disabled = false,
      damping = 15,
      stiffness = 150,
      ...props
    },
    ref
  ) => {
    const buttonRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    
    // Motion values for positioning
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    
    // Apply spring physics for smooth movement
    const springX = useSpring(mouseX, { damping, stiffness });
    const springY = useSpring(mouseY, { damping, stiffness });
    
    // Map the motion values to create smooth animations
    const rotateX = useTransform(springY, [strength * -1, strength], [12, -12]);
    const rotateY = useTransform(springX, [strength * -1, strength], [-12, 12]);
    
    // Handle mouse position
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!buttonRef.current || disabled) return;
      
      const rect = buttonRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Distance between mouse and center
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      
      // Pythagoras to calculate distance
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
      
      // Only apply effect within specified radius
      if (distance < radius) {
        // Normalize movement based on distance from center
        const factorX = distanceX / (radius / strength);
        const factorY = distanceY / (radius / strength);
        
        mouseX.set(factorX);
        mouseY.set(factorY);
      } else {
        // Reset if outside radius
        mouseX.set(0);
        mouseY.set(0);
      }
    };
    
    // Reset position when mouse leaves
    const handleMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
      setIsHovered(false);
    };
    
    // Variants for different button styles
    const buttonVariants = {
      default: 'relative overflow-hidden rounded-full transition-all',
      subtle: 'relative overflow-hidden rounded-lg transition-all',
      strong: 'relative overflow-hidden rounded-xl transition-all font-bold',
    };
    
    // Dynamic gradient background
    const gradientClasses = backgroundGradient
      ? 'bg-gradient-to-r from-[#6EC1E4] to-[#B9A9FF] text-white'
      : '';
    
    // Dynamic glow effect
    const glowClasses = glowOnHover && isHovered
      ? 'shadow-lg shadow-[#6EC1E4]/20'
      : '';
    
    const ComponentToRender = href ? 'a' : Component;
    const linkProps = href ? { href, target } : {};
    
    return (
      <motion.div
        ref={buttonRef}
        className={`
          ${buttonVariants[variant]} 
          ${gradientClasses} 
          ${glowClasses} 
          ${className}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={!disabled ? onClick : undefined}
        style={
          !disabled
            ? {
                rotateX,
                rotateY,
                transformPerspective: 1000,
              }
            : {}
        }
        whileHover={!disabled ? { scale } : {}}
        {...linkProps}
        {...props}
      >
        <div className="relative z-10">
          {children}
        </div>
        
        {/* Interactive background gradient */}
        {backgroundGradient && isHovered && !disabled && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[#6EC1E4] to-[#B9A9FF] opacity-90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
        
        {/* Interactive glow effect */}
        {glowOnHover && isHovered && !disabled && (
          <motion.div
            className="absolute inset-0 bg-white rounded-full opacity-20 blur-xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 0.2 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.4 }}
          />
        )}
      </motion.div>
    );
  }
);

MagneticButton.displayName = 'MagneticButton'; 