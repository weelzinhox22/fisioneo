"use client"

import { motion } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import type { ReactNode } from "react"

interface ParallaxElementProps {
  children: ReactNode
  speed?: number
  direction?: "up" | "down" | "left" | "right"
  className?: string
}

export function ParallaxElement({ children, speed = 0.2, direction = "up", className = "" }: ParallaxElementProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [elementTop, setElementTop] = useState(0)
  const [scrollY, setScrollY] = useState(0)
  const [windowHeight, setWindowHeight] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    const handleResize = () => {
      setWindowHeight(window.innerHeight)
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect()
        setElementTop(rect.top + window.scrollY)
      }
    }

    // Inicializar valores
    handleResize()

    // Adicionar event listeners
    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", handleResize)

    // Limpar event listeners
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Calcular o progresso do scroll (0 quando o elemento entra na viewport, 1 quando sai)
  const calculateScrollProgress = () => {
    if (windowHeight === 0) return 0

    const viewportBottom = scrollY + windowHeight
    const viewportTop = scrollY

    // Quando o elemento está entrando na viewport pela parte inferior
    if (elementTop > viewportBottom) return 0

    // Quando o elemento já passou completamente pela viewport
    if (elementTop < viewportTop - 300) return 1

    // Progresso do scroll enquanto o elemento está visível
    return (viewportBottom - elementTop) / (windowHeight + 300)
  }

  const scrollProgress = calculateScrollProgress()
  const distance = 100 * speed * scrollProgress

  // Calcular transformação com base na direção
  const getTransform = () => {
    switch (direction) {
      case "up":
        return { y: -distance }
      case "down":
        return { y: distance }
      case "left":
        return { x: -distance }
      case "right":
        return { x: distance }
      default:
        return { y: -distance }
    }
  }

  const transform = getTransform()

  return (
    <motion.div ref={ref} style={transform} className={className}>
      {children}
    </motion.div>
  )
}
