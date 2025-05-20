"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const calculateProgress = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight - windowHeight
      const scrollTop = window.scrollY
      const progress = (scrollTop / documentHeight) * 100
      setProgress(progress)
    }

    window.addEventListener("scroll", calculateProgress)
    return () => window.removeEventListener("scroll", calculateProgress)
  }, [])

  return (
    <motion.div
      className="fixed left-0 top-1/2 transform -translate-y-1/2 z-50 hidden md:block"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="h-[200px] w-1 bg-gray-200 rounded-full relative">
        <motion.div
          className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#6EC1E4] to-[#4A96D1] rounded-full"
          style={{ height: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>
    </motion.div>
  )
} 