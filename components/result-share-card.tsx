"use client"

import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { toPng } from 'html-to-image'
import { Share2, Download, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

type CategoryResult = {
  category: string
  correct: number
  total: number
  percentage: number
}

type ResultShareCardProps = {
  userName: string
  score: number
  totalQuestions: number
  percentage: number
  timeSpent: string
  categoryResults: CategoryResult[]
}

export default function ResultShareCard({ 
  userName, 
  score, 
  totalQuestions, 
  percentage, 
  timeSpent,
  categoryResults 
}: ResultShareCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isDownloaded, setIsDownloaded] = useState(false)
  
  const getCategoryColor = (percentage: number) => {
    if (percentage >= 80) return '#22C55E' // verde
    if (percentage >= 60) return '#3B82F6' // azul
    if (percentage >= 40) return '#F59E0B' // amarelo
    return '#EF4444' // vermelho
  }
  
  const getOverallColor = (percentage: number) => {
    if (percentage >= 80) return 'from-green-500 to-emerald-600'
    if (percentage >= 60) return 'from-blue-500 to-indigo-600'
    if (percentage >= 40) return 'from-amber-500 to-orange-600'
    return 'from-red-500 to-rose-600'
  }

  const handleShare = async () => {
    if (!cardRef.current) return
    
    try {
      setIsGenerating(true)
      
      const dataUrl = await toPng(cardRef.current, {
        quality: 0.95,
        backgroundColor: 'white',
        pixelRatio: 2,
        style: {
          margin: '0',
          borderRadius: '12px',
        }
      })
      
      // Para dispositivos móveis, usamos a Web Share API
      if (navigator.share) {
        // Converter a string base64 para um arquivo
        const blob = await fetch(dataUrl).then(res => res.blob())
        const file = new File([blob], 'resultado-fisioneo.png', { type: 'image/png' })
        
        await navigator.share({
          title: 'Meu resultado na FisioNeo',
          text: `Completei a avaliação de Fisioterapia Neonatal com ${percentage}% de acertos!`,
          files: [file]
        })
      } else {
        // Fallback para download direto
        downloadImage(dataUrl)
      }
    } catch (error) {
      console.error('Erro ao compartilhar:', error)
      // Fallback para download se compartilhamento falhar
      if (cardRef.current) {
        const dataUrl = await toPng(cardRef.current)
        downloadImage(dataUrl)
      }
    } finally {
      setIsGenerating(false)
    }
  }
  
  const downloadImage = (dataUrl: string) => {
    const link = document.createElement('a')
    link.download = 'resultado-fisioneo.png'
    link.href = dataUrl
    link.click()
    setIsDownloaded(true)
    setTimeout(() => setIsDownloaded(false), 3000)
  }
  
  return (
    <div className="flex flex-col items-center w-full">
      {/* Botão de compartilhamento no topo */}
      <div className="w-full mb-4 flex justify-center">
        <Button
          onClick={handleShare}
          disabled={isGenerating}
          size="lg"
          className="bg-gradient-to-r from-[#6EC1E4] to-[#B9A9FF] text-white hover:shadow-md transition-shadow px-6"
        >
          {isGenerating ? (
            <span className="flex items-center gap-2">
              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Gerando...
            </span>
          ) : isDownloaded ? (
            <span className="flex items-center gap-2">
              <Check className="h-4 w-4" />
              Baixado!
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              Compartilhar Resultado
            </span>
          )}
        </Button>
      </div>
      
      {/* Card que será convertido em imagem */}
      <div 
        ref={cardRef} 
        className="w-full max-w-lg mx-auto bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200"
      >
        {/* Cabeçalho */}
        <div className={`bg-gradient-to-r ${getOverallColor(percentage)} p-4 text-white`}>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-bold mb-1">Avaliação FisioNeo</h3>
              <p className="text-white/80 text-sm">Fisioterapia Neonatal</p>
            </div>
            <div className="flex flex-col items-end">
              <div className="text-3xl font-bold">{percentage}%</div>
              <div className="text-xs text-white/80">Nota final</div>
            </div>
          </div>
        </div>
        
        {/* Conteúdo */}
        <div className="p-4">
          <div className="mb-3">
            <h4 className="font-medium text-gray-700 text-sm">{userName || 'Aluno'}</h4>
            <p className="text-xs text-gray-500">Tempo: {timeSpent}</p>
          </div>
          
          <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-100">
            <div className="text-center">
              <div className="text-lg font-bold text-[#6EC1E4]">{score}</div>
              <div className="text-xs text-gray-500">Acertos</div>
            </div>
            <div className="h-8 w-px bg-gray-200"></div>
            <div className="text-center">
              <div className="text-lg font-bold text-[#B9A9FF]">{totalQuestions}</div>
              <div className="text-xs text-gray-500">Questões</div>
            </div>
          </div>
          
          <h5 className="text-xs font-medium text-gray-700 mb-2">Desempenho por Categoria</h5>
          <div className="space-y-2 pr-1 max-h-52 overflow-y-auto custom-scrollbar smooth-scroll" style={{ scrollbarWidth: 'thin', WebkitOverflowScrolling: 'touch' }}>
            {categoryResults.map((result, index) => (
              <div key={index} className="flex flex-col mb-2">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-medium text-gray-600 truncate max-w-[70%]">
                    {result.category}
                  </span>
                  <span className="text-xs text-gray-500">
                    {result.correct}/{result.total}
                  </span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className="h-full" 
                    style={{ 
                      backgroundColor: getCategoryColor(result.percentage),
                      width: `${result.percentage}%` 
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Rodapé */}
        <div className="px-4 py-2 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
          <div className="text-xs text-gray-500">fisioneo.com.br</div>
          <div className="flex items-center">
            <img 
              src="/images/logo-fisioneo-small.svg" 
              alt="FisioNeo" 
              className="h-5 w-auto"
              onError={(e) => {
                // Fallback se a imagem não existir
                e.currentTarget.style.display = 'none'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
} 