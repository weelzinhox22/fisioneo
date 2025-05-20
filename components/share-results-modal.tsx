"use client"

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import ResultShareCard from './result-share-card'

type CategoryData = {
  correct: number
  total: number
}

type CategoryResults = Record<string, CategoryData>

type ShareResultsModalProps = {
  isOpen: boolean
  onClose: () => void
  score: number
  totalQuestions: number
  timeSpent: string
  categoryResults: CategoryResults
}

export default function ShareResultsModal({ 
  isOpen, 
  onClose, 
  score, 
  totalQuestions, 
  timeSpent,
  categoryResults
}: ShareResultsModalProps) {
  const [userName, setUserName] = useState('')
  const [step, setStep] = useState<'name' | 'card'>('name')
  
  const percentage = parseFloat(((score / totalQuestions) * 100).toFixed(1))
  
  const formattedCategoryResults = Object.entries(categoryResults).map(([category, data]) => ({
    category,
    correct: data.correct,
    total: data.total,
    percentage: Math.round((data.correct / data.total) * 100)
  }))
  
  // Enable smooth scrolling for the modal content
  useEffect(() => {
    if (isOpen && step === 'card') {
      const handleWheel = (e: WheelEvent) => {
        const dialogContent = document.querySelector('[role="dialog"] > div');
        if (dialogContent) {
          // Check if we're hovering over the categories section
          const categoriesSection = document.querySelector('.custom-scrollbar');
          if (categoriesSection) {
            const rect = categoriesSection.getBoundingClientRect();
            const isOverCategories = 
              e.clientX >= rect.left && 
              e.clientX <= rect.right && 
              e.clientY >= rect.top && 
              e.clientY <= rect.bottom;
            
            // If not over categories section, scroll the main dialog
            if (!isOverCategories) {
              dialogContent.scrollTop += e.deltaY;
            }
          }
        }
      };
      
      window.addEventListener('wheel', handleWheel, { passive: false });
      return () => {
        window.removeEventListener('wheel', handleWheel);
      };
    }
  }, [isOpen, step]);
  
  const handleContinue = () => {
    setStep('card')
  }
  
  const handleBack = () => {
    setStep('name')
  }
  
  const handleClose = () => {
    setStep('name')
    onClose()
  }
  
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-xl lg:max-w-3xl max-h-[95vh] overflow-y-auto custom-scrollbar smooth-scroll p-4 md:p-6">
        {step === 'name' ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-center text-2xl font-bold bg-gradient-to-r from-[#6EC1E4] to-[#B9A9FF] bg-clip-text text-transparent">
                Compartilhar Resultado
              </DialogTitle>
              <DialogDescription className="text-center pt-2">
                Adicione seu nome para personalizar o card de compartilhamento
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4">
              <Label htmlFor="userName" className="text-sm font-medium text-gray-700">
                Seu nome
              </Label>
              <Input
                id="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Digite seu nome"
                className="mt-1"
                autoFocus
              />
            </div>
            
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={handleClose}>
                Cancelar
              </Button>
              <Button 
                onClick={handleContinue}
                className="bg-gradient-to-r from-[#6EC1E4] to-[#B9A9FF] text-white"
              >
                Continuar
              </Button>
            </div>
          </>
        ) : (
          <>
            <DialogHeader className="mb-4">
              <DialogTitle className="text-center text-xl font-bold bg-gradient-to-r from-[#6EC1E4] to-[#B9A9FF] bg-clip-text text-transparent">
                Seu Resultado
              </DialogTitle>
              <DialogDescription className="text-center pt-1 text-sm">
                Compartilhe seu desempenho na avaliação
              </DialogDescription>
            </DialogHeader>
            
            <div className="flex-grow overflow-visible">
              <ResultShareCard
                userName={userName || 'Aluno FisioNeo'}
                score={score}
                totalQuestions={totalQuestions}
                percentage={percentage}
                timeSpent={timeSpent}
                categoryResults={formattedCategoryResults}
              />
            </div>
            
            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={handleBack} size="sm">
                Voltar
              </Button>
              <Button variant="outline" onClick={handleClose} size="sm">
                Fechar
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
} 