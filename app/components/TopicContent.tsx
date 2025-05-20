import Image from "next/image";
import { Topic } from "../data/topics";
import { useState, useEffect, useRef } from "react";
import { ChevronRight, ChevronLeft, Maximize2, Download, ExternalLink, X, ZoomIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
        
        // Adicionar efeito de hover nas imagens
        img.onmouseenter = () => {
          img.style.transform = 'scale(1.02)';
          img.style.transition = 'transform 0.3s ease';
          
          // Adicionar ícone de zoom
          const zoomIcon = document.createElement('div');
          zoomIcon.className = 'absolute top-2 right-2 bg-white/80 p-1.5 rounded-full shadow-md';
          zoomIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-500"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>';
          
          const parent = img.parentElement;
          if (parent && !parent.querySelector('.zoom-icon')) {
            zoomIcon.classList.add('zoom-icon');
            parent.style.position = 'relative';
            parent.appendChild(zoomIcon);
          }
        };
        
        img.onmouseleave = () => {
          img.style.transform = 'scale(1)';
          
          // Remover ícone de zoom
          const parent = img.parentElement;
          if (parent) {
            const zoomIcon = parent.querySelector('.zoom-icon');
            if (zoomIcon) {
              parent.removeChild(zoomIcon);
            }
          }
        };
      });
      
      // Padronizar o container das imagens
      const imageContainers = contentRef.current.querySelectorAll('.prose .bg-white');
      imageContainers.forEach(container => {
        container.classList.add('max-w-xs', 'mx-auto', 'transition-all', 'duration-300', 'hover:shadow-lg');
      });
      
      // Forçar duas colunas em todos os grids
      const gridElements = contentRef.current.querySelectorAll('.grid');
      gridElements.forEach(grid => {
        grid.classList.remove('md:grid-cols-3');
        grid.classList.add('md:grid-cols-2', 'gap-6');
      });
      
      // Melhorar o estilo das tabelas
      const tables = contentRef.current.querySelectorAll('table');
      tables.forEach(table => {
        table.classList.add('w-full', 'border-collapse', 'overflow-hidden', 'rounded-lg', 'shadow-md');
        
        // Estilizar o cabeçalho da tabela
        const thead = table.querySelector('thead');
        if (thead) {
          thead.classList.add('bg-gradient-to-r', 'from-[#6EC1E4]', 'to-[#4A96D1]', 'text-white');
          
          const headerCells = thead.querySelectorAll('th');
          headerCells.forEach(cell => {
            cell.classList.add('px-4', 'py-3', 'text-left', 'font-medium');
          });
        }
        
        // Estilizar o corpo da tabela
        const tbody = table.querySelector('tbody');
        if (tbody) {
          const rows = tbody.querySelectorAll('tr');
          rows.forEach((row, index) => {
            row.classList.add(index % 2 === 0 ? 'bg-white' : 'bg-[#F8FBFF]');
            
            const cells = row.querySelectorAll('td');
            cells.forEach(cell => {
              cell.classList.add('px-4', 'py-3', 'border-t', 'border-[#E0E0E0]');
            });
          });
        }
      });
      
      // Melhorar o estilo das listas
      const lists = contentRef.current.querySelectorAll('ul, ol');
      lists.forEach(list => {
        list.classList.add('my-4', 'space-y-2');
        
        const items = list.querySelectorAll('li');
        items.forEach(item => {
          item.classList.add('pl-2');
        });
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
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-lg border border-[#E0E0E0]/50 overflow-hidden"
      >
        {/* Quick navigation - mês a mês */}
        {monthTitles.length > 0 && (
          <div className="px-5 py-4 bg-gradient-to-r from-[#F0F9FF] to-white border-b border-[#E0E0E0]/50 overflow-x-auto">
            <div className="flex items-center space-x-3 min-w-max">
              {monthTitles.map((title, index) => (
                <motion.a 
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={`#${title.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-sm font-medium px-4 py-2 rounded-full bg-white text-[#4A96D1] hover:bg-gradient-to-r hover:from-[#6EC1E4] hover:to-[#4A96D1] hover:text-white transition-all duration-300 shadow-sm whitespace-nowrap border border-[#E0E0E0]/30"
                >
                  {title}
                </motion.a>
              ))}
            </div>
          </div>
        )}

        {/* Conteúdo principal */}
        <div className="p-6 md:p-8">
          <div 
            ref={contentRef}
            className="prose prose-lg max-w-none prose-headings:text-primary prose-h2:text-3xl prose-h2:font-bold prose-h2:text-[#4A96D1] prose-h2:mb-6 prose-h2:pb-3 prose-h2:border-b prose-h2:border-[#E0E0E0]/50 prose-h3:text-2xl prose-h3:text-[#6EC1E4] prose-h3:mt-12 prose-h3:mb-5 prose-h3:font-semibold prose-p:text-gray-700 prose-p:leading-relaxed prose-strong:text-[#333333] prose-li:text-gray-700 prose-li:my-1.5 prose-img:rounded-lg prose-img:shadow-md prose-ul:mt-4 prose-ul:mb-6"
            dangerouslySetInnerHTML={{ __html: processedContent }}
          />

          {/* Navegação entre seções */}
          <div className="mt-12 pt-8 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-5">
            <motion.div 
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-gradient-to-r from-[#F0F9FF] to-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group"
            >
              <h3 className="text-lg font-medium text-[#4A96D1] mb-1">Próximo tema</h3>
              <p className="text-sm text-gray-600 mt-1">Reflexos de 7 a 15 meses</p>
              <div className="flex justify-end mt-2">
                <div className="p-1.5 bg-white rounded-full shadow-sm group-hover:bg-[#E6F3FF] transition-colors">
                  <ChevronRight className="h-5 w-5 text-[#6EC1E4]" />
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-gradient-to-r from-[#F0F9FF] to-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group"
            >
              <h3 className="text-lg font-medium text-[#4A96D1] mb-1">Tema relacionado</h3>
              <p className="text-sm text-gray-600 mt-1">Reações de 0 a 15 meses</p>
              <div className="flex justify-end mt-2">
                <div className="p-1.5 bg-white rounded-full shadow-sm group-hover:bg-[#E6F3FF] transition-colors">
                  <ChevronRight className="h-5 w-5 text-[#6EC1E4]" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Seção de recursos e materiais */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-xl font-semibold text-[#4A96D1] mb-6">Materiais complementares</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <motion.div 
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-gradient-to-br from-white to-[#F8FBFF] p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-[#E0E0E0]/50 group"
              >
                <div className="flex items-start">
                  <div className="p-3 bg-[#E6F3FF] rounded-xl mr-4 group-hover:bg-[#D0EBFF] transition-colors">
                    <Download className="h-6 w-6 text-[#4A96D1]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-[#333333] mb-2">Guia Completo de Desenvolvimento</h4>
                    <p className="text-sm text-gray-600 mb-3">PDF com tabelas de avaliação e marcos do desenvolvimento</p>
                    <a href="#" className="text-[#4A96D1] text-sm font-medium inline-flex items-center hover:underline">
                      Baixar PDF <ChevronRight className="h-4 w-4 ml-1" />
                    </a>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-gradient-to-br from-white to-[#F8FBFF] p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-[#E0E0E0]/50 group"
              >
                <div className="flex items-start">
                  <div className="p-3 bg-[#E6F3FF] rounded-xl mr-4 group-hover:bg-[#D0EBFF] transition-colors">
                    <ExternalLink className="h-6 w-6 text-[#4A96D1]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-[#333333] mb-2">Vídeo: Avaliação de Reflexos</h4>
                    <p className="text-sm text-gray-600 mb-3">Tutorial prático sobre avaliação dos reflexos primitivos</p>
                    <a href="#" className="text-[#4A96D1] text-sm font-medium inline-flex items-center hover:underline">
                      Assistir vídeo <ChevronRight className="h-4 w-4 ml-1" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Lightbox para visualização de imagens */}
      <AnimatePresence>
        {showLightbox && allImages.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-95 z-[100] flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={closeLightbox}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative max-w-5xl w-full h-[85vh] flex items-center justify-center"
            >
              <button 
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 rounded-full p-3 z-10 backdrop-blur-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
              >
                <ChevronLeft className="h-6 w-6 text-white" />
              </button>
              
              <div className="relative w-full h-full flex flex-col">
                <div className="absolute top-4 right-4 flex space-x-3 z-20">
                  <button 
                    className="bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full p-2 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(allImages[currentImageIndex].src, '_blank');
                    }}
                  >
                    <ExternalLink className="h-5 w-5 text-white" />
                  </button>
                  
                  <button 
                    className="bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full p-2 transition-colors"
                    onClick={closeLightbox}
                  >
                    <X className="h-5 w-5 text-white" />
                  </button>
                </div>
                
                <div className="flex-1 flex items-center justify-center">
                  <img
                    src={allImages[currentImageIndex].src}
                    alt={allImages[currentImageIndex].alt || ''}
                    className="max-h-full max-w-full object-contain rounded-lg shadow-2xl"
                  />
                </div>
                
                {allImages[currentImageIndex].caption && (
                  <div className="bg-black/60 backdrop-blur-sm text-white p-4 rounded-b-lg mt-2">
                    <p className="text-center">{allImages[currentImageIndex].caption}</p>
                    <p className="text-sm opacity-70 mt-1 text-center">
                      {currentImageIndex + 1} de {allImages.length}
                    </p>
                  </div>
                )}
              </div>
              
              <button 
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 rounded-full p-3 z-10 backdrop-blur-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
              >
                <ChevronRight className="h-6 w-6 text-white" />
              </button>
              
              {/* Miniaturas na parte inferior */}
              {allImages.length > 1 && (
                <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                  <div className="bg-black/40 backdrop-blur-sm rounded-full px-4 py-2 flex space-x-2">
                    {allImages.map((_, index) => (
                      <button
                        key={index}
                        className={`w-2.5 h-2.5 rounded-full transition-colors ${
                          currentImageIndex === index ? 'bg-white' : 'bg-white/40 hover:bg-white/70'
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIndex(index);
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
} 