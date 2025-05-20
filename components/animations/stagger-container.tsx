"use client"

import React from "react"

import { motion } from "framer-motion"
import { useInView } from "@/hooks/use-in-view"
import type { ReactNode } from "react"

interface StaggerContainerProps {
  children: ReactNode
  delay?: number
  staggerDelay?: number
  className?: string
  once?: boolean
  direction?: "up" | "down" | "left" | "right" | "none"
  distance?: number
  duration?: number
  staggerType?: "linear" | "easeIn" | "easeOut" | "spring"
}

export function StaggerContainer({
  children,
  delay = 0,
  staggerDelay = 0.1,
  className = "",
  once = true,
  direction = "up",
  distance = 20,
  duration = 0.5,
  staggerType = "linear",
}: StaggerContainerProps) {
  const { ref, isInView } = useInView({ triggerOnce: once, threshold: 0.1 })

  const directionMap = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  }

  const staggerTransition = {
    linear: { staggerChildren: staggerDelay, delayChildren: delay },
    easeIn: { staggerChildren: staggerDelay, delayChildren: delay, staggerDirection: 1, ease: "easeIn" },
    easeOut: { staggerChildren: staggerDelay, delayChildren: delay, staggerDirection: 1, ease: "easeOut" },
    spring: { staggerChildren: staggerDelay, delayChildren: delay, type: "spring", stiffness: 100, damping: 15 },
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: staggerTransition[staggerType],
    },
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
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      className={className}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return <motion.div variants={item}>{child}</motion.div>
        }
        return child
      })}
    </motion.div>
  )
}
