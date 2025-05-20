"use client"

import { Baby, Brain, Droplets, HeartPulse, Stethoscope, Search, X } from "lucide-react"
import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FadeIn } from "@/components/animations/fade-in"
import { StaggerContainer } from "@/components/animations/stagger-container"
import { StaggerItem } from "@/components/animations/stagger-item"
import DraggableAIButton from "@/app/components/DraggableAIButton"

export default function TemasPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [focusedSuggestion, setFocusedSuggestion] = useState(-1);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const suggestionContainerRef = useRef<HTMLDivElement>(null);
  
  const topics = [
    {
      id: "reflexos-0-6",
      title: "Reflexos de 0 a 6 meses",
      description: "Estudo dos reflexos primitivos e sua evolução nos primeiros 6 meses de vida.",
      icon: <Baby className="h-10 w-10 text-[#6EC1E4]" />,
      href: "/temas/reflexos-0-6",
      category: "desenvolvimento",
    },
    {
      id: "reflexos-7-15",
      title: "Reflexos de 7 a 15 meses",
      description: "Desenvolvimento dos reflexos em bebês de 7 a 15 meses de idade.",
      icon: <Baby className="h-10 w-10 text-[#B9A9FF]" />,
      href: "/temas/reflexos-7-15",
      category: "desenvolvimento",
    },
    {
      id: "reacoes-0-15",
      title: "Reações de 0 a 15 meses",
      description: "Reações posturais e de equilíbrio durante o primeiro ano de vida.",
      icon: <HeartPulse className="h-10 w-10 text-[#6EC1E4]" />,
      href: "/temas/reacoes-0-15",
      category: "desenvolvimento",
    },
    {
      id: "escala-avaliacao",
      title: "Escala de avaliação neonatal",
      description: "Métodos e escalas para avaliação do desenvolvimento neonatal.",
      icon: <Stethoscope className="h-10 w-10 text-[#A8E6CF]" />,
      href: "/temas/escala-avaliacao",
      category: "avaliação",
    },
    {
      id: "dor-neonatal",
      title: "Dor neonatal",
      description: "Avaliação e manejo da dor em recém-nascidos e prematuros.",
      icon: <HeartPulse className="h-10 w-10 text-[#FF6B6B]" />,
      href: "/temas/dor-neonatal",
      category: "avaliação",
    },
    {
      id: "metodo-canguru",
      title: "Método Canguru",
      description: "Benefícios e aplicação do método canguru em neonatos.",
      icon: <Baby className="h-10 w-10 text-[#A8E6CF]" />,
      href: "/temas/metodo-canguru",
      category: "tratamento",
    },
    {
      id: "hidroterapia",
      title: "Hidroterapia em neonatos",
      description: "Técnicas e benefícios da hidroterapia para bebês prematuros e recém-nascidos.",
      icon: <Droplets className="h-10 w-10 text-[#6EC1E4]" />,
      href: "/temas/hidroterapia",
      category: "tratamento",
    },
    {
      id: "sequelas-neurologicas",
      title: "Sequelas de doenças neurológicas em prematuros",
      description: "Identificação e tratamento de sequelas neurológicas em bebês prematuros.",
      icon: <Brain className="h-10 w-10 text-[#B9A9FF]" />,
      href: "/temas/sequelas-neurologicas",
      category: "condições",
    },
    {
      id: "sequelas-pulmonares",
      title: "Sequelas de doenças pulmonares em prematuros",
      description: "Abordagem fisioterapêutica para sequelas pulmonares em prematuros.",
      icon: <Stethoscope className="h-10 w-10 text-[#6EC1E4]" />,
      href: "/temas/sequelas-pulmonares",
      category: "condições",
    },
  ]

  // Filtrar tópicos com base no termo de pesquisa
  const filteredTopics = topics.filter(topic => 
    topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    topic.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    topic.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filtra sugestões baseadas no que o usuário está digitando
  const suggestions = searchTerm.length > 0 
    ? topics.filter(topic => 
        topic.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        topic.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  // Controla exibição de sugestões
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionContainerRef.current && 
        !suggestionContainerRef.current.contains(event.target as Node) &&
        !searchInputRef.current?.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Lidar com navegação por teclado nas sugestões
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) return;

    // Tecla seta para baixo - mover para próxima sugestão
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedSuggestion(prev => 
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } 
    // Tecla seta para cima - mover para sugestão anterior
    else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedSuggestion(prev => prev > 0 ? prev - 1 : 0);
    } 
    // Tecla Enter - selecionar sugestão atual
    else if (e.key === 'Enter' && focusedSuggestion >= 0) {
      e.preventDefault();
      // Redirecionar para a página do tema quando Enter é pressionado em uma sugestão
      window.location.href = suggestions[focusedSuggestion].href;
    }
    // Tecla Escape - fechar sugestões
    else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setFocusedSuggestion(-1);
    }
  };

  // Lidar com sugestão selecionada
  const handleSuggestionClick = (suggestion: typeof topics[0]) => {
    // Redirecionar para a página do tema quando uma sugestão é clicada
    window.location.href = suggestion.href;
  };

  // Reseta o índice focado quando as sugestões mudam
  useEffect(() => {
    setFocusedSuggestion(-1);
  }, [suggestions]);

  // Obter categorias únicas para filtragem
  const categories = Array.from(new Set(topics.map(topic => topic.category)));

  // Elementos decorativos para animação
  const decorativeElements = [
    { icon: Baby, color: "#6EC1E4", top: "5%", left: "5%", size: 120, opacity: 0.05, delay: 0 },
    { icon: Brain, color: "#B9A9FF", top: "15%", right: "8%", size: 150, opacity: 0.05, delay: 0.2 },
    { icon: HeartPulse, color: "#FF6B6B", bottom: "10%", left: "8%", size: 140, opacity: 0.05, delay: 0.4 },
    { icon: Droplets, color: "#A8E6CF", bottom: "20%", right: "5%", size: 130, opacity: 0.05, delay: 0.6 },
  ];

  // Destaca o texto encontrado nas sugestões
  const highlightText = (text: string, query: string) => {
    if (!query) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <span key={index} className="bg-[#6EC1E4]/20 text-white font-medium">{part}</span>
      ) : (
        <span key={index}>{part}</span>
      )
    );
  };

  return (
    <div className="relative overflow-hidden pb-16">
      <DraggableAIButton />
      
      {/* Elementos decorativos de fundo */}
      {decorativeElements.map((el, index) => {
        const Icon = el.icon;
        return (
          <motion.div
            key={index}
            className="absolute pointer-events-none z-0 hidden md:block"
            style={{ 
              top: el.top || "auto", 
              left: el.left || "auto", 
              right: el.right || "auto", 
              bottom: el.bottom || "auto",
            }}
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: el.opacity, scale: 1, rotate: 0 }}
            transition={{ delay: el.delay, duration: 0.8 }}
          >
            <Icon size={el.size} color={el.color} />
          </motion.div>
        );
      })}
      
      {/* Hero section */}
      <div className="relative text-white">
        {/* Vídeo de fundo */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute w-full h-full object-cover md:object-right object-center"
            style={{ objectFit: "cover" }}
          >
            <source src="/images/feto/hero-bg-vd.mp4" type="video/mp4" />
          </video>
          {/* Overlay para melhorar contraste com o texto */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 py-16 md:py-24 relative">          
          <div className="relative z-10 max-w-3xl md:max-w-none md:w-[60%] md:ml-0 mx-auto md:text-left text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1 mb-6 rounded-full bg-[#6EC1E4]/20 backdrop-blur-md border border-[#6EC1E4]/30 text-sm font-medium text-white">
                Biblioteca de conhecimento
              </span>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
          Temas de Fisioterapia Neonatal e Pediátrica
            </motion.h1>
            
            <motion.p 
              className="text-lg text-gray-100 md:max-w-xl max-w-2xl mx-auto md:mx-0 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Explore nossos conteúdos educacionais sobre fisioterapia neonatal e pediátrica, organizados por temas específicos para facilitar seu aprendizado.
            </motion.p>
            
            {/* Barra de pesquisa com sugestões */}
            <motion.div
              className="relative md:max-w-md max-w-xl mx-auto md:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="relative">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Pesquisar temas..."
                  className="w-full px-5 py-4 pr-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6EC1E4] transition-all duration-300"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setShowSuggestions(e.target.value.length > 0);
                  }}
                  onFocus={() => {
                    if (searchTerm.length > 0) setShowSuggestions(true);
                  }}
                  onKeyDown={handleKeyDown}
                />
                
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex gap-1">
                  {searchTerm && (
                    <button 
                      onClick={() => {
                        setSearchTerm("");
                        setShowSuggestions(false);
                        searchInputRef.current?.focus();
                      }}
                      className="p-1 hover:bg-white/10 rounded-full transition-colors"
                    >
                      <X className="text-gray-400 h-4 w-4" />
                    </button>
                  )}
                  <Search className="text-gray-400" size={20} />
                </div>
                
                {/* Container de sugestões */}
                <AnimatePresence>
                  {showSuggestions && suggestions.length > 0 && (
                    <motion.div
                      ref={suggestionContainerRef}
                      className="absolute top-full left-0 md:w-[120%] w-full mt-2 bg-black/70 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden z-20 shadow-lg"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="max-h-60 overflow-y-auto styled-scrollbar">
                        {suggestions.map((suggestion, index) => (
                          <div
                            key={suggestion.id}
                            className={`px-4 py-3 flex items-center gap-3 cursor-pointer transition-colors hover:bg-[#6EC1E4]/20 ${focusedSuggestion === index ? 'bg-[#6EC1E4]/20' : ''}`}
                            onClick={() => handleSuggestionClick(suggestion)}
                            onMouseEnter={() => setFocusedSuggestion(index)}
                          >
                            <div className="p-2 rounded-full bg-[#F0F9FF]/10">
                              {suggestion.icon}
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-white">
                                {highlightText(suggestion.title, searchTerm)}
                              </div>
                              <div className="text-xs text-gray-300 line-clamp-1">
                                {suggestion.description}
                              </div>
                            </div>
                            <span className="text-xs px-2 py-1 rounded-full bg-[#6EC1E4]/30 text-[#6EC1E4] capitalize">
                              {suggestion.category}
                            </span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Transição sutil entre vídeo e conteúdo */}
        <div className="h-24 mt-8 relative">
          <div className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t from-white via-white/80 to-transparent"></div>
        </div>
      </div>
      
      {/* Conteúdo principal */}
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Filtro de categorias */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category, idx) => (
            <motion.button
              key={category}
              className="px-4 py-2 rounded-full text-sm font-medium bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 capitalize"
              whileHover={{ scale: 1.05, backgroundColor: "#F0F9FF" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + idx * 0.1 }}
              onClick={() => setSearchTerm(category)}
            >
              {category}
            </motion.button>
          ))}
          {searchTerm && (
            <motion.button
              className="px-4 py-2 rounded-full text-sm font-medium bg-[#6EC1E4] text-white shadow-sm hover:shadow-md transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => setSearchTerm("")}
            >
              Limpar filtros
            </motion.button>
          )}
        </div>
        
        {/* Grid de tópicos */}
        <StaggerContainer 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          staggerDelay={0.05}
          staggerType="spring"
          distance={30}
        >
          {filteredTopics.map((topic) => (
          <StaggerItem key={topic.id}>
              <Link href={topic.href} className="block h-full group">
                <div className="bg-white rounded-xl overflow-hidden shadow-sm group-hover:shadow-xl transition-all duration-500 h-full relative">
                  {/* Barra superior colorida */}
                  <div className="h-2 w-full bg-gradient-to-r from-[#6EC1E4] to-[#B9A9FF]"></div>
                  
                  {/* Badge de categoria */}
                  <div className="absolute top-4 right-4">
                    <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-[#F0F9FF] text-[#6EC1E4] capitalize">
                      {topic.category}
                    </span>
                  </div>
                  
                  <div className="p-6 flex flex-col h-[calc(100%-8px)]">
                    <div className="flex items-start mb-4">
                      <div className="mr-4 p-3 rounded-full bg-gradient-to-br from-[#F0F9FF] to-white shadow-sm group-hover:shadow-md group-hover:bg-gradient-to-r group-hover:from-[#F0F9FF] group-hover:to-[#E1F5FE] transition-all duration-500">
                        <div className="transform group-hover:scale-110 transition-all duration-500">
                          {topic.icon}
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-[#333333] pt-2 group-hover:text-[#6EC1E4] transition-colors duration-300">
                        {topic.title}
                      </h3>
                    </div>
                    
                    <p className="text-[#666666] mb-6 flex-grow">
                      {topic.description}
                    </p>
                    
                    <div className="mt-auto border-t border-gray-100 pt-4 flex justify-between items-center">
                      <span className="text-[#6EC1E4] font-medium group-hover:text-[#B9A9FF] transition-colors duration-300">
                        Saiba mais
                      </span>
                      <div className="w-8 h-8 rounded-full bg-[#F0F9FF] flex items-center justify-center group-hover:bg-[#6EC1E4] transition-all duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-[#6EC1E4] group-hover:text-white transform group-hover:translate-x-0.5 transition-all duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
          </StaggerItem>
        ))}
      </StaggerContainer>
        
        {/* Mensagem quando não há resultados */}
        {filteredTopics.length === 0 && (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-[#F0F9FF] rounded-lg p-8 max-w-md mx-auto">
              <Search className="mx-auto mb-4 text-[#6EC1E4]" size={40} />
              <h3 className="text-xl font-semibold text-[#333333] mb-2">Nenhum tema encontrado</h3>
              <p className="text-[#666666]">Tente outro termo de pesquisa ou navegue por todas as categorias disponíveis.</p>
              <button 
                className="mt-4 px-4 py-2 bg-[#6EC1E4] text-white rounded-lg hover:bg-[#5BA8CB] transition-colors"
                onClick={() => setSearchTerm("")}
              >
                Ver todos os temas
              </button>
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Estilos CSS para a scrollbar personalizada */}
      <style jsx global>{`
        .styled-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .styled-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .styled-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
        }
        .styled-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </div>
  )
}
