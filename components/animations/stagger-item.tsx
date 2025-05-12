"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface StaggerItemProps {
  children: ReactNode
  direction?: "up" | "down" | "left" | "right" | "none"
  distance?: number
  duration?: number
  className?: string
}

export function StaggerItem({
  children,
  direction = "up",
  distance = 20,
  duration = 0.5,
  className = "",
}: StaggerItemProps) {
  const directionMap = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  }

  const item = {
    hidden: { opacity: 0, ...directionMap[direction] },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
      },
    },
  }

  return (
    <motion.div variants={item} className={className}>
      {children}
    </motion.div>
  )
}
