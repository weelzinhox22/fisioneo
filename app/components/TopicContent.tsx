import Image from "next/image";
import { Topic } from "../data/topics";
import { useState, useEffect, useRef } from "react";
import { ChevronRight, ChevronLeft, Maximize2, Download, ExternalLink, X } from "lucide-react";

interface TopicContentProps {
  topic: Topic;
}

export default function TopicContent({ topic }: TopicContentProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  const [allImages, setAllImages] = useState<{src: string, alt: string, caption?: string}[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);

  // Função para extrair os títulos dos meses a partir do conteúdo HTML
  const extractMonthTitles = (): string[] => {
    const regex = /<h3 id="(.*?)">(.*?)<\/h3>/g;
    const content = topic.content || "";
    const matches = [...content.matchAll(regex)];
    return matches.map(match => match[2]);
  };

  // Extrair todas as imagens do conteúdo para o lightbox e ajustar grids
  useEffect(() => {
    if (contentRef.current) {
      const imgElements = contentRef.current.querySelectorAll('img');
      const extractedImages = Array.from(imgElements).map(img => ({
        src: img.getAttribute('src') || '',
        alt: img.getAttribute('alt') || '',
        caption: img.closest('div')?.nextElementSibling?.textContent || ''
      }));
      
      setAllImages(extractedImages);
      
      // Adicionar evento de clique nas imagens para abrir o lightbox
      imgElements.forEach((img, index) => {
        img.style.cursor = 'zoom-in';
        img.onclick = (e) => {
          e.preventDefault();
          e.stopPropagation();
          openLightbox(index);
        };
      });
      
      // Padronizar o container das imagens
      const imageContainers = contentRef.current.querySelectorAll('.prose .bg-white');
      imageContainers.forEach(container => {
        container.classList.add('max-w-xs', 'mx-auto');
      });
      
      // Forçar duas colunas em todos os grids
      const gridElements = contentRef.current.querySelectorAll('.grid');
      gridElements.forEach(grid => {
        grid.classList.remove('md:grid-cols-3');
        grid.classList.add('md:grid-cols-2');
      });
    }
  }, [topic.content]);

  const monthTitles = extractMonthTitles();

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setShowLightbox(true);
    // Bloquear o scroll da página quando o lightbox estiver aberto
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setShowLightbox(false);
    // Restaurar o scroll da página
    document.body.style.overflow = 'auto';
  };

  const nextImage = () => {
    if (allImages.length === 0) return;
    setCurrentImageIndex((prevIndex) => 
      prevIndex === allImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    if (allImages.length === 0) return;
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? allImages.length - 1 : prevIndex - 1
    );
  };

  // Lidar com teclas do teclado para navegar no lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!showLightbox) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          prevImage();
          break;
        case 'ArrowRight':
          nextImage();
          break;
        case 'Escape':
          closeLightbox();
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      // Garantir que o overflow volta ao normal quando o componente é desmontado
      document.body.style.overflow = 'auto';
    };
  }, [showLightbox]);

  // Função para normalizar o HTML e aplicar estilos consistentes às imagens
  const normalizeHtmlContent = (htmlContent: string): string => {
    // Substituir divs de imagens para padronizar o tamanho
    let processedHtml = htmlContent;
    
    // Garantir que todos os grids usem apenas 2 colunas
    processedHtml = processedHtml.replace(/md:grid-cols-3/g, 'md:grid-cols-2');
    
    return processedHtml;
  };

  const processedContent = normalizeHtmlContent(topic.content);

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg border border-[#E0E0E0] overflow-hidden">
        {/* Quick navigation - mês a mês */}
        {monthTitles.length > 0 && (
          <div className="px-4 py-3 bg-[#F0F9FF] border-b border-[#E0E0E0] overflow-x-auto">
            <div className="flex items-center space-x-4 min-w-max">
              {monthTitles.map((title, index) => (
                <a 
                  key={index} 
                  href={`#${title.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-sm font-medium px-3 py-1.5 rounded-full bg-white text-[#4A96D1] hover:bg-[#4A96D1] hover:text-white transition-colors shadow-sm whitespace-nowrap"
                >
                  {title}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Conteúdo principal */}
        <div className="p-6 md:p-8">
          <div 
            ref={contentRef}
            className="prose prose-lg max-w-none prose-headings:text-primary prose-h2:text-3xl prose-h2:font-bold prose-h2:text-[#4A96D1] prose-h2:mb-6 prose-h3:text-2xl prose-h3:text-[#6EC1E4] prose-h3:mt-10 prose-h3:mb-4 prose-h3:font-semibold prose-p:text-gray-700 prose-strong:text-[#333333] prose-li:text-gray-700 prose-li:my-1.5 prose-img:rounded-lg prose-ul:mt-4 prose-ul:mb-6"
            dangerouslySetInnerHTML={{ __html: processedContent }}
          />

          {/* Navegação entre seções */}
          <div className="mt-10 pt-6 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-r from-[#F0F9FF] to-white p-5 rounded-lg hover:shadow-md transition-all duration-300 cursor-pointer">
              <h3 className="text-lg font-medium text-[#4A96D1]">Próximo tema</h3>
              <p className="text-sm text-gray-600 mt-1">Reflexos de 7 a 15 meses</p>
              <div className="flex justify-end mt-2">
                <ChevronRight className="h-5 w-5 text-[#6EC1E4]" />
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-[#F0F9FF] to-white p-5 rounded-lg hover:shadow-md transition-all duration-300 cursor-pointer">
              <h3 className="text-lg font-medium text-[#4A96D1]">Tema relacionado</h3>
              <p className="text-sm text-gray-600 mt-1">Reações de 0 a 15 meses</p>
              <div className="flex justify-end mt-2">
                <ChevronRight className="h-5 w-5 text-[#6EC1E4]" />
              </div>
            </div>
          </div>

          {/* Seção de recursos e materiais */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-xl font-semibold text-[#4A96D1] mb-4">Materiais complementares</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#F8FBFF] p-5 rounded-lg border border-[#E0E0E0] hover:shadow-md transition-all duration-300">
                <div className="flex items-start">
                  <div className="p-2 bg-[#E6F3FF] rounded-lg mr-3">
                    <Download className="h-5 w-5 text-[#4A96D1]" />
                  </div>
                  <div>
                    <h4 className="text-base font-medium text-[#333333]">Guia Completo de Desenvolvimento</h4>
                    <p className="text-sm text-gray-600 mt-1">PDF com tabelas de avaliação e marcos do desenvolvimento</p>
                    <a href="#" className="text-[#4A96D1] text-sm font-medium mt-2 inline-flex items-center hover:underline">
                      Baixar PDF <ChevronRight className="h-4 w-4 ml-1" />
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#F8FBFF] p-5 rounded-lg border border-[#E0E0E0] hover:shadow-md transition-all duration-300">
                <div className="flex items-start">
                  <div className="p-2 bg-[#E6F3FF] rounded-lg mr-3">
                    <ExternalLink className="h-5 w-5 text-[#4A96D1]" />
                  </div>
                  <div>
                    <h4 className="text-base font-medium text-[#333333]">Vídeo: Avaliação de Reflexos</h4>
                    <p className="text-sm text-gray-600 mt-1">Tutorial prático sobre avaliação dos reflexos primitivos</p>
                    <a href="#" className="text-[#4A96D1] text-sm font-medium mt-2 inline-flex items-center hover:underline">
                      Assistir vídeo <ChevronRight className="h-4 w-4 ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox para visualização de imagens */}
      {showLightbox && allImages.length > 0 && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-[100] flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div className="relative max-w-4xl w-full h-[80vh] flex items-center justify-center">
            <button 
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 rounded-full p-2 m-2 z-10"
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </button>
            
            <div className="relative w-full h-full">
              <div className="w-full h-full flex items-center justify-center">
                <img
                  src={allImages[currentImageIndex].src}
                  alt={allImages[currentImageIndex].alt || ''}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              {allImages[currentImageIndex].caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/40 text-white p-4 text-center">
                  <p>{allImages[currentImageIndex].caption}</p>
                  <p className="text-sm opacity-70 mt-1">
                    {currentImageIndex + 1} de {allImages.length}
                  </p>
                </div>
              )}
            </div>
            
            <button 
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 rounded-full p-2 m-2 z-10"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </button>
            
            <button 
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 rounded-full p-2"
              onClick={closeLightbox}
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
        </div>
      )}

      {/* Estilos adicionais para melhorar a exibição de grades no conteúdo */}
      <style jsx global>{`
        .prose .grid {
          display: grid;
          gap: 1.25rem;
          margin: 1.5rem 0;
        }
        
        .prose .grid-cols-1 {
          grid-template-columns: 1fr;
        }
        
        @media (min-width: 768px) {
          .prose .md\\:grid-cols-2 {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .prose .md\\:grid-cols-3 {
            grid-template-columns: repeat(2, 1fr); /* Forçar 2 colunas mesmo quando o HTML especifica 3 */
          }
        }
        
        .prose .gap-4 {
          gap: 1rem;
        }
        
        .prose .gap-6 {
          gap: 1.5rem;
        }
        
        .prose img {
          border-radius: 0.5rem;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          cursor: zoom-in;
          object-fit: cover;
          width: 100%;
          height: 100%;
        }
        
        .prose img:hover {
          transform: scale(1.02);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
        }
        
        .prose h3 {
          scroll-margin-top: 80px;
        }
        
        .prose .bg-white {
          background-color: white;
          border-radius: 0.5rem;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          overflow: hidden;
          padding: 0.75rem;
          margin: 1rem auto;
          max-width: 20rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }
        
        .prose .bg-white:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
        }
        
        .prose .bg-white .relative {
          height: 11rem;
          width: 100%;
          border-radius: 0.5rem;
          overflow: hidden;
          margin-bottom: 0.75rem;
        }
        
        .prose ul {
          list-style-type: none;
          padding-left: 1.5rem;
        }
        
        .prose ul li {
          position: relative;
          padding-left: 1.5rem;
          margin-bottom: 0.75rem;
        }
        
        .prose ul li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.5rem;
          height: 0.5rem;
          width: 0.5rem;
          border-radius: 50%;
          background-color: #6EC1E4;
        }
        
        .prose strong {
          color: #4A96D1;
          font-weight: 600;
        }
        
        .prose em {
          color: #4A96D1;
          font-style: normal;
          font-weight: 500;
        }
        
        /* Padronizar o tamanho dos containers de imagem */
        .prose .my-8 .grid .bg-white,
        .prose .my-6 .bg-white,
        .prose .my-8 .bg-white {
          max-width: 20rem;
          margin: 0 auto;
        }
        
        .prose .text-sm.text-center.text-gray-600.italic {
          font-size: 0.875rem;
          text-align: center;
          color: #4b5563;
          font-style: italic;
          margin-top: 0.5rem;
        }
      `}</style>
    </>
  );
} 