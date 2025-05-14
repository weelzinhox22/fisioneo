"use client"

import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"
import { getPdfJs } from "@/lib/pdf-config"

interface PDFExtractorProps {
  file: File
  onTextExtracted: (text: string) => void
  onError: (error: string) => void
}

export default function PDFExtractor({ file, onTextExtracted, onError }: PDFExtractorProps) {
  const [progress, setProgress] = useState(0)
  
  useEffect(() => {
    const extractText = async () => {
      try {
        // Carregar o PDF.js dinamicamente
        const pdfjs = await getPdfJs();
        
        // Converter o arquivo para ArrayBuffer
        const arrayBuffer = await file.arrayBuffer();
        
        // Carregar o documento PDF
        const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
        const pdf = await loadingTask.promise;
        
        // Total de páginas
        const numPages = pdf.numPages;
        let extractedText = "";
        
        // Extrair texto de cada página
        for (let i = 1; i <= numPages; i++) {
          try {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            
            // Concatenar o texto de todos os itens da página
            const pageText = textContent.items
              .map((item: any) => item.str)
              .join(" ");
            
            extractedText += `\n--- Página ${i} ---\n\n${pageText}\n`;
            
            // Atualizar o progresso
            setProgress(Math.round((i / numPages) * 100));
          } catch (pageError) {
            console.error(`Erro ao extrair texto da página ${i}:`, pageError);
            extractedText += `\n--- Página ${i} (erro na extração) ---\n\n`;
          }
        }
        
        // Chamar o callback com o texto extraído
        if (extractedText.trim()) {
          onTextExtracted(extractedText);
        } else {
          onError("Não foi possível extrair texto deste PDF. O arquivo pode estar protegido ou conter apenas imagens.");
        }
      } catch (error) {
        console.error("Erro ao extrair texto do PDF:", error);
        onError("Não foi possível processar o PDF. O arquivo pode estar corrompido ou protegido.");
      }
    };
    
    extractText();
  }, [file, onTextExtracted, onError]);
  
  return (
    <div className="flex flex-col items-center justify-center p-12 relative z-20">
      <Loader2 className="h-12 w-12 text-[#6EC1E4] animate-spin mb-4" />
      <p className="text-lg font-medium mb-2">Extraindo texto do PDF...</p>
      <div className="w-full max-w-md bg-gray-200 rounded-full h-2.5 mb-2 relative">
        <div 
          className="bg-[#6EC1E4] h-2.5 rounded-full" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-500">{progress}% concluído</p>
      <p className="text-xs text-gray-400 mt-2">Isso pode levar alguns instantes para PDFs grandes</p>
    </div>
  )
} 