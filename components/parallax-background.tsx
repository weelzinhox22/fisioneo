"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface ParallaxBackgroundProps {
  children: ReactNode
  speed?: number
  direction?: "up" | "down" | "left" | "right"
  className?: string
}

export default function ParallaxBackground({
  children,
  speed = 0.5,
  direction = "up",
  className = "",
}: ParallaxBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)
  const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 })

  // Atualizar posição de scroll e dimensões da janela
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    // Definir dimensões iniciais
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

  // Calcular transformações com base na direção
  const getTransform = () => {
    const yOffset = direction === "up" ? -scrollY * speed : direction === "down" ? scrollY * speed : 0

    const xOffset = direction === "left" ? -scrollY * speed : direction === "right" ? scrollY * speed : 0

    return {
      x: xOffset,
      y: yOffset,
    }
  }

  const transform = getTransform()

  return (
    <div ref={ref} className={`fixed inset-0 z-[-1] overflow-hidden ${className}`}>
      <motion.div
        style={{
          x: transform.x,
          y: transform.y,
        }}
        className="w-full h-[120%] absolute top-0 left-0"
      >
        {children}
      </motion.div>
    </div>
  )
}
