"use client"

import { motion } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { useInView } from "@/hooks/use-in-view"
import type { ReactNode } from "react"

interface TransformEffectProps {
  children: ReactNode
  type?: "rotate" | "scale" | "skew" | "morph"
  intensity?: number
  delay?: number
  duration?: number
  className?: string
  once?: boolean
}

export function TransformEffect({
  children,
  type = "rotate",
  intensity = 1,
  delay = 0,
  duration = 0.7,
  className = "",
  once = true,
}: TransformEffectProps) {
  const { ref, isInView } = useInView({ triggerOnce: once })
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight

      // Calcular progresso do scroll (0 quando o elemento está no topo da viewport, 1 quando está no fundo)
      const progress = 1 - (rect.top + rect.height / 2) / (windowHeight + rect.height)
      setScrollProgress(Math.max(0, Math.min(1, progress)))
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Inicializar

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Calcular transformações baseadas no tipo
  const getTransformValues = () => {
    switch (type) {
      case "rotate":
        return { rotate: intensity * 10 * (1 - scrollProgress) }
      case "scale":
        return { scale: 0.8 + 0.2 * scrollProgress }
      case "skew":
        return { skewX: intensity * 10 * (1 - scrollProgress) }
      case "morph":
        return { borderRadius: `${intensity * 25 * Math.sin(scrollProgress * Math.PI)}%` }
      default:
        return {}
    }
  }

  const transformValues = getTransformValues()

  return (
    <motion.div
      ref={(node) => {
        // @ts-ignore - Combining refs
        ref.current = node
        // @ts-ignore - Combining refs
        containerRef.current = node
      }}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1, ...transformValues } : { opacity: 0 }}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
