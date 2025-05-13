'use client';

import { useEffect, useState, createContext, useContext } from 'react';
import Lenis from '@studio-freight/lenis';

// Create context for Lenis instance
type SmoothScrollContextType = {
  lenis: Lenis | null;
  isReady: boolean;
};

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  lenis: null,
  isReady: false,
});

// Hook to use the Lenis instance
export const useSmoothScroll = () => useContext(SmoothScrollContext);

interface SmoothScrollProviderProps {
  children: React.ReactNode;
  options?: {
    lerp?: number;
    duration?: number;
    smoothWheel?: boolean;
    smoothTouch?: boolean;
    wheelMultiplier?: number;
    touchMultiplier?: number;
    infinite?: boolean;
    orientation?: 'vertical' | 'horizontal';
  };
}

export function SmoothScrollProvider({
  children,
  options = {},
}: SmoothScrollProviderProps) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const [isReady, setIsReady] = useState(false);
  
  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return;
    
    // Default options for professional scrolling
    const lenisOptions = {
      lerp: 0.1, // Lower values create smoother animation
      duration: 1.2,
      smoothWheel: true,
      smoothTouch: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
      orientation: 'vertical' as const,
      ...options,
    };
    
    // Create Lenis instance
    const lenisInstance = new Lenis(lenisOptions);
    
    // Set up RAF for smooth animations
    const raf = (time: number) => {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    };
    
    // Start animation loop
    requestAnimationFrame(raf);
    
    // Set context values
    setLenis(lenisInstance);
    setIsReady(true);
    
    // Cleanup
    return () => {
      lenisInstance.destroy();
      setIsReady(false);
    };
  }, [options]);
  
  return (
    <SmoothScrollContext.Provider value={{ lenis, isReady }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}

// Utility component to scroll to specific elements
interface ScrollToProps {
  targetId: string;
  children: React.ReactNode;
  offset?: number;
  duration?: number;
}

export function ScrollTo({ targetId, children, offset = 0, duration }: ScrollToProps) {
  const { lenis } = useSmoothScroll();
  
  const handleClick = () => {
    if (!lenis) return;
    
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      lenis.scrollTo(targetElement, { offset, duration });
    }
  };
  
  return (
    <div onClick={handleClick} style={{ cursor: 'pointer' }}>
      {children}
    </div>
  );
} 