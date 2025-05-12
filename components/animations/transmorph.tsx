"use client"

import { motion } from "framer-motion"
import { useInView } from "@/hooks/use-in-view"
import type { ReactNode } from "react"

interface TransmorphProps {
  children: ReactNode
  from?: "circle" | "square" | "diamond" | "none"
  to?: "circle" | "square" | "diamond" | "none"
  delay?: number
  duration?: number
  className?: string
  once?: boolean
}

export function Transmorph({
  children,
  from = "none",
  to = "none",
  delay = 0,
  duration = 0.7,
  className = "",
  once = true,
}: TransmorphProps) {
  const { ref, isInView } = useInView({ triggerOnce: once })

  const shapeMap = {
    circle: "50%",
    square: "0%",
    diamond: "0%",
    none: "0%",
  }

  const transformMap = {
    diamond: "rotate(45deg)",
    circle: "rotate(0deg)",
    square: "rotate(0deg)",
    none: "rotate(0deg)",
  }

  const initial = {
    borderRadius: shapeMap[from],
    transform: transformMap[from],
  }

  const animate = {
    borderRadius: shapeMap[to],
    transform: transformMap[to],
  }

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={isInView ? animate : initial}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
