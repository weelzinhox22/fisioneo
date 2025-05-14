"use client"

import { useState, useEffect, useRef } from "react"
import { Loader2 } from "lucide-react"
import { getPdfJs } from "@/lib/pdf-config"

interface PDFViewerProps {
  file: File
  onError: (error: string) => void
}

export default function PDFViewer({ file, onError }: PDFViewerProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  
  useEffect(() => {
    const loadPdf = async () => {
      try {
        // Criar uma URL para o arquivo do PDF
        const objectUrl = URL.createObjectURL(file)
        setPdfUrl(objectUrl)
        setIsLoading(false)
        
        // Limpar URL quando o componente desmontar
        return () => {
          URL.revokeObjectURL(objectUrl)
        }
      } catch (error) {
        console.error("Erro ao carregar o PDF:", error)
        onError("Não foi possível carregar o PDF para visualização.")
        setIsLoading(false)
      }
    }
    
    loadPdf()
  }, [file, onError])
  
  return (
    <div className="flex flex-col w-full h-full relative z-10">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center p-12">
          <Loader2 className="h-12 w-12 text-[#6EC1E4] animate-spin mb-4" />
          <p className="text-lg font-medium mb-2">Carregando PDF...</p>
        </div>
      ) : pdfUrl ? (
        <div className="pdf-container w-full relative z-20">
          <iframe
            ref={iframeRef}
            src={`${pdfUrl}#view=FitH`}
            className="w-full h-[600px] sm:h-[700px] md:h-[800px] lg:h-[850px] xl:h-[900px] border-0 rounded-lg"
            title="PDF Viewer"
            style={{ minHeight: "600px", position: "relative", zIndex: 40 }}
          />
        </div>
      ) : (
        <div className="flex items-center justify-center h-40 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700">Não foi possível carregar o PDF.</p>
        </div>
      )}
    </div>
  )
} 