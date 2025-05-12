"use client"

import { useEffect, useState } from "react"

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
    <div className="bg-white rounded-lg shadow-sm border border-[#E0E0E0] p-4 sticky top-4">
      <h3 className="text-lg font-semibold text-[#4A96D1] mb-3">Conteúdo</h3>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li 
            key={heading.id}
            className={`
              ${heading.level === 3 ? "ml-4" : ""}
              ${activeId === heading.id ? "text-[#6EC1E4] font-medium" : "text-[#666666]"}
            `}
          >
            <a 
              href={`#${heading.id}`}
              className="hover:text-[#4A96D1] transition-colors block py-1"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById(heading.id)?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
} 