"use client"

import { motion } from "framer-motion"
import { useInView } from "@/hooks/use-in-view"
import type { ReactNode } from "react"

interface ZoomInProps {
  children: ReactNode
  delay?: number
  duration?: number
  scale?: number
  className?: string
  once?: boolean
}

export function ZoomIn({ children, delay = 0, duration = 0.5, scale = 0.9, className = "", once = true }: ZoomInProps) {
  const { ref, isInView } = useInView({ triggerOnce: once })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale }}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
