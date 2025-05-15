import React from "react"
import DocumentViewer from "@/components/document-viewer"
import { ThreeDText } from "@/components/ui/3d-text"
import { AdvancedParallax } from "@/components/animations/advanced-parallax"
import { FileText, BookOpen } from "lucide-react"

export const metadata = {
  title: "Leitor de PDF - Fisioterapia Neonatal",
  description: "Analise documentos e PDFs de fisioterapia neonatal com inteligência artificial",
}

export default function DocumentosPage() {
  return (
    <div className="relative min-h-screen pb-20" style={{ zIndex: 1 }}>
      {/* Background elements - reduzindo z-index para não interferir com elementos interativos */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
        <div className="absolute w-[500px] h-[500px] rounded-full bg-[#6EC1E4]/5 blur-3xl -top-64 -left-64 pointer-events-none" />
        <div className="absolute w-[400px] h-[400px] rounded-full bg-[#B9A9FF]/5 blur-3xl -bottom-32 -right-32 pointer-events-none" />
      </div>
      
      {/* Header section */}
      <div className="relative py-16 md:py-24 mb-10">
        <AdvancedParallax speed={0.15} direction="vertical" className="absolute inset-0 pointer-events-none z-0">
          <div className="bg-gradient-to-b from-white to-[#F5F9FF] rounded-b-3xl h-full w-full pointer-events-none"></div>
        </AdvancedParallax>
        
        <div className="relative z-10 container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <span className="px-4 py-1.5 bg-gradient-to-r from-[#6EC1E4]/10 to-[#B9A9FF]/10 rounded-full text-sm font-medium text-[#6EC1E4] inline-block mb-4">
              Ferramenta de aprendizado avançado
            </span>
            
            <ThreeDText
              text="Leitor de PDF"
              gradient={true}
              depth={8}
              fontSize="3rem"
              fontWeight="700"
              className="mb-6"
            />
            
            <p className="text-lg text-[#666666] mb-8 max-w-2xl mx-auto leading-relaxed">
              Faça upload de artigos científicos, protocolos ou textos relacionados à fisioterapia neonatal para análise com inteligência artificial. 
              Obtenha resumos, explicações detalhadas e respostas personalizadas sobre o conteúdo.
            </p>
            
            <div className="flex flex-wrap gap-6 justify-center mb-8">
              <div className="flex items-start bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm max-w-xs">
                <div className="flex-shrink-0 p-2 bg-[#F0F9FF] rounded-lg mr-3">
                  <FileText className="h-5 w-5 text-[#6EC1E4]" />
                </div>
                <div className="text-left">
                  <h3 className="font-medium text-[#333333] text-sm">Upload fácil</h3>
                  <p className="text-xs text-[#666666]">Carregue PDFs e arquivos de texto com apenas um clique</p>
                </div>
              </div>
              
              <div className="flex items-start bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm max-w-xs">
                <div className="flex-shrink-0 p-2 bg-[#F8F5FF] rounded-lg mr-3">
                  <BookOpen className="h-5 w-5 text-[#B9A9FF]" />
                </div>
                <div className="text-left">
                  <h3 className="font-medium text-[#333333] text-sm">Análise inteligente</h3>
                  <p className="text-xs text-[#666666]">Obtenha resumos e explicações geradas por IA avançada</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Document viewer component - aumentando z-index para garantir interatividade */}
      <div className="container mx-auto px-6 pb-16 relative z-20" style={{ pointerEvents: "auto" }}>
      <DocumentViewer />
      </div>
    </div>
  )
} 