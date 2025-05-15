"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { Check, X } from 'lucide-react'

interface AlertDialogProps {
  isOpen: boolean
  onClose: () => void
  title: string
  message: string
  type?: 'success' | 'error' | 'info'
}

export function AlertDialog({ isOpen, onClose, title, message, type = 'success' }: AlertDialogProps) {
  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return {
          bgGradient: 'from-emerald-500/90 to-teal-500/90',
          icon: <Check className="h-6 w-6 text-white" />,
          iconBg: 'bg-emerald-400/30'
        }
      case 'error':
        return {
          bgGradient: 'from-red-500/90 to-rose-500/90',
          icon: <X className="h-6 w-6 text-white" />,
          iconBg: 'bg-red-400/30'
        }
      case 'info':
      default:
        return {
          bgGradient: 'from-[#6EC1E4]/90 to-[#B9A9FF]/90',
          icon: <Check className="h-6 w-6 text-white" />,
          iconBg: 'bg-blue-400/30'
        }
    }
  }

  const styles = getTypeStyles()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-md"
          >
            <div className={`relative bg-gradient-to-r ${styles.bgGradient} backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/20`}>
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Content */}
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-full ${styles.iconBg}`}>
                  {styles.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {title}
                  </h3>
                  <p className="text-white/90">
                    {message}
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-white bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                >
                  Entendi
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
