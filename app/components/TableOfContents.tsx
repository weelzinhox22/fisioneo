"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { BookOpen, ChevronRight } from "lucide-react"

interface Heading {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  content: string
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>("")

  // Extrai os cabeçalhos do conteúdo HTML
  useEffect(() => {
    // Cria um elemento temporário para analisar o HTML
    const tempDiv = document.createElement("div")
    tempDiv.innerHTML = content
    
    // Encontra todos os cabeçalhos h2 e h3
    const headingElements = tempDiv.querySelectorAll("h2, h3")
    
    const extractedHeadings: Heading[] = []
    
    headingElements.forEach((heading, index) => {
      // Cria um ID baseado no texto do cabeçalho
      const text = heading.textContent || ""
      const id = `heading-${index}-${text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "")}`
      
      // Adiciona o ID ao elemento original
      heading.id = id
      
      extractedHeadings.push({
        id,
        text,
        level: heading.tagName === "H2" ? 2 : 3
      })
    })
    
    setHeadings(extractedHeadings)
    
    // Atualiza os IDs no conteúdo real da página
    const contentElements = document.querySelectorAll(".prose h2, .prose h3")
    contentElements.forEach((element, index) => {
      if (index < extractedHeadings.length) {
        element.id = extractedHeadings[index].id
      }
    })
  }, [content])

  // Detecta qual cabeçalho está ativo com base na rolagem
  useEffect(() => {
    const handleScroll = () => {
      const headingElements = headings.map(heading => 
        document.getElementById(heading.id)
      ).filter(Boolean) as HTMLElement[]
      
      // Encontra o cabeçalho mais próximo do topo da janela
      let current = ""
      
      for (const element of headingElements) {
        const top = element.getBoundingClientRect().top
        
        // Adiciona uma margem para considerar o cabeçalho ativo um pouco antes
        if (top < 100) {
          current = element.id
        } else {
          break
        }
      }
      
      setActiveId(current || (headingElements[0]?.id || ""))
    }
    
    window.addEventListener("scroll", handleScroll)
    handleScroll() // Inicializa
    
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [headings])

  if (headings.length === 0) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-white to-[#F8FBFF] rounded-xl shadow-md border border-[#E0E0E0]/50 p-5 sticky top-4"
    >
      <div className="flex items-center mb-4">
        <div className="p-2 bg-[#F0F9FF] rounded-lg mr-3">
          <BookOpen className="h-5 w-5 text-[#6EC1E4]" />
        </div>
        <h3 className="text-lg font-semibold text-[#4A96D1]">Conteúdo</h3>
      </div>
      
      <div className="space-y-1 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
        {headings.map((heading, index) => (
          <motion.div
            key={heading.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className={`
              ${heading.level === 3 ? "ml-4" : ""}
            `}
          >
            <a 
              href={`#${heading.id}`}
              className={`
                flex items-center py-2 px-3 rounded-lg transition-all duration-300
                ${activeId === heading.id 
                  ? "bg-gradient-to-r from-[#E6F3FF] to-[#F0F9FF] text-[#4A96D1] font-medium shadow-sm" 
                  : "text-[#666666] hover:bg-[#F0F9FF] hover:text-[#4A96D1]"}
              `}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById(heading.id)?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              <span className="flex-1">{heading.text}</span>
              {activeId === heading.id && (
                <ChevronRight className="h-4 w-4 text-[#6EC1E4]" />
              )}
            </a>
          </motion.div>
        ))}
      </div>
      
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(110, 193, 228, 0.3);
          border-radius: 20px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: rgba(110, 193, 228, 0.5);
        }
      `}</style>
    </motion.div>
  )
} 