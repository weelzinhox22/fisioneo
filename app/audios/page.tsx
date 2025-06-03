"use client"

import React, { useState, useEffect, useRef } from "react"
import { Headphones, Volume2, VolumeX, Play, Pause, SkipBack, Heart, Share2, Download, Music, Baby, X, List, ChevronRight, SkipForward, ArrowLeft } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Head from "next/head"

interface AudioPlayerProps {
  audioSrc: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  playlist?: AudioInfo[];
  currentIndex?: number;
  onPlayNext?: () => void;
  onPlayPrevious?: () => void;
  onTogglePlaylist?: () => void;
  isPlaylistOpen?: boolean;
  isPlaying?: boolean;
  onTogglePlay?: () => void;
  spotifyMode?: boolean;
}

interface AudioInfo {
  src: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

// Criando um objeto global para armazenar instâncias de áudio
const globalAudioInstances: Record<string, HTMLAudioElement> = {};

// Componente do Modal/Popup com estilo Spotify
function InfoModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [step, setStep] = useState(1);
  const totalSteps = 2;
  
  if (!isOpen) return null;
  
  const handleWhatsAppRedirect = () => {
    const message = encodeURIComponent("Olá! Gostaria de solicitar um tema para os áudios educacionais da FisioNeo.");
    window.open(`https://wa.me/5571991373142?text=${message}`, "_blank");
    onClose();
  };
  
  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onClose();
    }
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative bg-gradient-to-br from-[#282828] to-[#181818] rounded-xl shadow-2xl w-full max-w-4xl animate-fadeIn overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-blue-500"></div>
        
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-white flex items-center">
              <Music className="h-5 w-5 mr-2 text-green-500" />
              Informação sobre os Áudios
            </h3>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-[#333333] rounded-full"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {/* Conteúdo do modal - versão desktop */}
          <div className="hidden md:grid grid-cols-2 gap-6">
            <div className="text-gray-300 space-y-3">
              <p className="border-l-4 border-green-500 pl-3 py-1">
                Devido à complexidade e ao tempo necessário para a edição e preparação de conteúdo em formato de áudio, 
                estamos disponibilizando os materiais gradativamente.
              </p>
              
              <p>
                Caso tenha interesse em algum conteúdo específico que ainda não está disponível em nossa biblioteca, 
                entre em contato diretamente com a administração do site.
              </p>
            </div>
            
            <div className="bg-[#3D3D3D] p-4 rounded-lg border-l-4 border-amber-500">
              <p className="font-medium text-amber-400 mb-1 flex items-center">
                <span className="mr-2">⚠️</span>
                Aviso importante sobre provas
              </p>
              <p className="text-gray-300">
                Infelizmente, talvez não seja possível adicionar áudios sobre todos os conteúdos a tempo para as 
                provas oficiais da sua faculdade. Estamos priorizando os temas mais solicitados, mas o processo 
                de produção demanda tempo para garantir a qualidade do material.
              </p>
            </div>
          </div>
          
          {/* Conteúdo do modal - versão mobile (passos) */}
          <div className="md:hidden">
            {step === 1 && (
              <div className="text-gray-300 space-y-3 animate-fadeInRight">
                <p className="border-l-4 border-green-500 pl-3 py-1">
                  Devido à complexidade e ao tempo necessário para a edição e preparação de conteúdo em formato de áudio, 
                  estamos disponibilizando os materiais gradativamente.
                </p>
                
                <p>
                  Caso tenha interesse em algum conteúdo específico que ainda não está disponível em nossa biblioteca, 
                  entre em contato diretamente com a administração do site.
                </p>
              </div>
            )}
            
            {step === 2 && (
              <div className="bg-[#3D3D3D] p-4 rounded-lg border-l-4 border-amber-500 animate-fadeInRight">
                <p className="font-medium text-amber-400 mb-1 flex items-center">
                  <span className="mr-2">⚠️</span>
                  Aviso importante sobre provas
                </p>
                <p className="text-gray-300">
                  Infelizmente, talvez não seja possível adicionar áudios sobre todos os conteúdos a tempo para as 
                  provas oficiais da sua faculdade. Estamos priorizando os temas mais solicitados, mas o processo 
                  de produção demanda tempo para garantir a qualidade do material.
                </p>
              </div>
            )}
            
            {/* Indicador de passos */}
            <div className="flex justify-center mt-4 space-x-1">
              {Array.from({ length: totalSteps }).map((_, index) => (
                <div 
                  key={index}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index + 1 === step ? "w-6 bg-green-500" : "w-2 bg-[#535353]"
                  }`}
                />
              ))}
            </div>
          </div>
          
          <div className="flex justify-end items-center mt-6 pt-4 border-t border-[#3D3D3D]">
            <div className="mr-auto flex items-center text-sm text-gray-300">
              <Baby className="h-4 w-4 mr-2 text-blue-400" />
              <span><span className="font-medium text-white">FisioNeo</span> - Conteúdo especializado</span>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={handleWhatsAppRedirect}
                className="px-5 py-2 border border-[#535353] text-white rounded-full hover:border-green-500 hover:bg-[#333333] transition-colors font-medium"
              >
                Solicitar tema
              </button>
              
              <button
                onClick={step < totalSteps ? nextStep : onClose}
                className="px-5 py-2 bg-green-500 hover:bg-green-400 text-black rounded-full transition-colors shadow-md font-medium"
              >
                {step < totalSteps ? "Avançar" : "Entendi"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente de Tela de Carregamento estilo Spotify
function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#121212]"
    >
      {/* Logo FisioNeo minimalista */}
      <div className="mb-8">
        <div className="text-[#1ED760] font-bold text-2xl">FisioNeo</div>
      </div>
      
      {/* Spinner simples estilo Spotify */}
      <div className="relative">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ 
            duration: 1,
            ease: "linear",
            repeat: Infinity
          }}
          className="w-8 h-8 border-t-2 border-[#1ED760] border-solid rounded-full"
        />
      </div>
    </motion.div>
  );
}

function AudioPlayer({ 
  audioSrc, 
  title, 
  description, 
  icon, 
  playlist, 
  currentIndex, 
  onPlayNext, 
  onPlayPrevious,
  onTogglePlaylist,
  isPlaylistOpen,
  isPlaying,
  onTogglePlay,
  spotifyMode
}: AudioPlayerProps) {
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [isMuted, setIsMuted] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const volumeBarRef = useRef<HTMLDivElement>(null)
  const previousVolume = useRef(volume)
  
  // Para modo interno (sem controle externo)
  const [internalIsPlaying, setInternalIsPlaying] = useState(false)

  const hasPlaylist = playlist && playlist.length > 0;
  
  // Determina qual estado de reprodução usar
  const effectiveIsPlaying = isPlaying !== undefined ? isPlaying : internalIsPlaying;

  useEffect(() => {
    // Verifica se já existe uma instância global para este áudio
    let audio: HTMLAudioElement;
    
    if (globalAudioInstances[audioSrc]) {
      audio = globalAudioInstances[audioSrc];
    } else {
      // Criar nova instância de áudio e armazená-la globalmente
      audio = new Audio(audioSrc);
      audio.volume = volume;
      globalAudioInstances[audioSrc] = audio;
    }
    
    setAudioElement(audio);

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };
    
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };
    
    const handleEnded = () => {
      if (onTogglePlay) {
        onTogglePlay(); // Notifica o componente pai que o áudio acabou
      } else {
        setInternalIsPlaying(false);
      }
      setCurrentTime(0);
      
      // Quando o áudio terminar, reproduz o próximo se estiver em uma playlist
      if (hasPlaylist && onPlayNext) {
        onPlayNext();
      }
    };

    // Adiciona event listeners
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    // Se o áudio já estiver carregado, definir a duração
    if (audio.readyState >= 2) {
      setDuration(audio.duration);
    }

    return () => {
      // Remove event listeners
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      
      // Não destruímos a instância do áudio para manter a reprodução entre navegações
    }
  }, [audioSrc, volume, hasPlaylist, onPlayNext, onTogglePlay])
  
  // Efeito para controlar a reprodução quando o estado externo ou interno muda
  useEffect(() => {
    if (!audioElement) return;
    
    // Pausar todos os outros áudios primeiro quando começar a tocar
    if (effectiveIsPlaying) {
      Object.entries(globalAudioInstances).forEach(([src, audio]) => {
        if (src !== audioSrc && !audio.paused) {
          audio.pause();
        }
      });
      
      audioElement.play().catch(error => {
        console.error("Erro ao reproduzir áudio:", error);
        // Reverter o estado em caso de erro
        if (onTogglePlay) {
          onTogglePlay();
        } else {
          setInternalIsPlaying(false);
        }
      });
    } else {
      audioElement.pause();
    }
  }, [effectiveIsPlaying, audioElement, audioSrc, onTogglePlay]);

  const togglePlay = () => {
    if (onTogglePlay) {
      // Modo controlado externamente (Spotify)
      onTogglePlay();
    } else {
      // Modo interno
      setInternalIsPlaying(!internalIsPlaying);
    }
  }

  const toggleMute = () => {
    if (!audioElement) return

    if (isMuted) {
      audioElement.volume = previousVolume.current
      setVolume(previousVolume.current)
    } else {
      previousVolume.current = volume
      audioElement.volume = 0
      setVolume(0)
    }
    
    setIsMuted(!isMuted)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
    
    if (audioElement) {
      audioElement.volume = newVolume
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value)
    setCurrentTime(time)
    
    if (audioElement) {
      audioElement.currentTime = time
    }
  }

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current || !audioElement) return
    
    const rect = progressBarRef.current.getBoundingClientRect()
    const pos = (e.clientX - rect.left) / rect.width
    const newTime = pos * duration
    
    setCurrentTime(newTime)
    audioElement.currentTime = newTime
  }

  const handleVolumeBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!volumeBarRef.current || !audioElement) return
    
    const rect = volumeBarRef.current.getBoundingClientRect()
    const pos = (e.clientX - rect.left) / rect.width
    const newVolume = Math.max(0, Math.min(1, pos))
    
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
    audioElement.volume = newVolume
  }

  const restart = () => {
    if (audioElement) {
      audioElement.currentTime = 0
      setCurrentTime(0)
    }
  }

  const toggleLike = () => {
    setIsLiked(!isLiked)
  }

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00"
    
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }
  
  // Se estiver no modo Spotify, renderiza apenas os controles de áudio
  if (spotifyMode) {
    return (
      <div className="mt-4">
        {/* Barra de progresso */}
        <div 
          ref={progressBarRef}
          onClick={handleProgressBarClick}
          className="relative h-1.5 bg-[#535353] rounded-full mb-2 cursor-pointer group"
        >
          <div 
            className="absolute top-0 left-0 h-full bg-green-500 rounded-full"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 h-3 w-3 bg-white rounded-full scale-0 group-hover:scale-100 transition-transform" />
          </div>
        </div>
        
        {/* Tempo */}
        <div className="flex justify-between text-xs text-gray-400 mb-4">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="bg-white rounded-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Capa do áudio e informações */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="w-48 h-48 bg-gradient-to-tr from-blue-200 to-blue-400 rounded-xl shadow-md flex items-center justify-center flex-shrink-0">
            {icon}
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className="text-sm font-medium text-blue-600 mb-2 flex items-center gap-2 flex-wrap">
              <span>ÁUDIO EDUCACIONAL</span>
              {hasPlaylist && (
                <div className="flex items-center text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                  <Music className="h-3 w-3 mr-1" />
                  <span>Playlist: Neonatal</span>
                  <span className="ml-1">{currentIndex !== undefined ? `${currentIndex + 1}/${playlist.length}` : ""}</span>
                </div>
              )}
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-3">
              {title}
            </h3>
            <p className="text-gray-600 mb-6">
              {description}
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              <button
                onClick={togglePlay}
                className={`px-6 py-3 rounded-full font-medium flex items-center gap-2 transition-colors ${
                  effectiveIsPlaying
                    ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {effectiveIsPlaying ? (
                  <>
                    <Pause className="h-5 w-5" />
                    <span>Pausar</span>
                  </>
                ) : (
                  <>
                    <Play className="h-5 w-5" />
                    <span>Reproduzir</span>
                  </>
                )}
              </button>
              
              {hasPlaylist && onTogglePlaylist && (
                <button
                  onClick={onTogglePlaylist}
                  className={`px-6 py-3 rounded-full font-medium flex items-center gap-2 transition-colors ${
                    isPlaylistOpen 
                      ? "bg-indigo-200 text-indigo-800"
                      : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                  }`}
                >
                  <List className="h-5 w-5" />
                  <span>{isPlaylistOpen ? "Fechar Playlist" : "Ver Playlist"}</span>
                </button>
              )}
              
              <button
                onClick={toggleLike}
                className={`p-3 rounded-full transition-colors ${
                  isLiked
                    ? "bg-pink-100 text-pink-600 hover:bg-pink-200"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Heart className={`h-5 w-5 ${isLiked ? "fill-pink-600" : ""}`} />
              </button>
              
              <button 
                className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
              >
                <Share2 className="h-5 w-5" />
              </button>
              
              <button 
                className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
              >
                <Download className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Controles do player */}
      <div className="p-6 bg-white border-t border-gray-100">
        {/* Barra de progresso */}
        <div 
          ref={progressBarRef}
          onClick={handleProgressBarClick}
          className="relative h-1.5 bg-gray-200 rounded-full mb-2 cursor-pointer group"
        >
          <div 
            className="absolute top-0 left-0 h-full bg-blue-600 rounded-full"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 h-3 w-3 bg-blue-600 rounded-full scale-0 group-hover:scale-100 transition-transform" />
          </div>
        </div>
        
        {/* Tempo */}
        <div className="flex justify-between text-sm text-gray-500 mb-4">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
        
        {/* Controles */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {hasPlaylist && onPlayPrevious ? (
              <button 
                onClick={onPlayPrevious}
                className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                title="Áudio anterior"
              >
                <SkipBack className="h-5 w-5" />
              </button>
            ) : (
              <button 
                onClick={restart}
                className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                title="Reiniciar áudio"
              >
                <SkipBack className="h-5 w-5" />
              </button>
            )}
          </div>
          
          <button 
            onClick={togglePlay}
            className="p-4 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-md"
          >
            {effectiveIsPlaying ? (
              <Pause className="h-6 w-6" />
            ) : (
              <Play className="h-6 w-6" />
            )}
          </button>
          
          <div className="flex items-center gap-2">
            {hasPlaylist && onPlayNext && (
              <button 
                onClick={onPlayNext}
                className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                title="Próximo áudio"
              >
                <SkipForward className="h-5 w-5" />
              </button>
            )}
            
            <button
              onClick={toggleMute}
              className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="h-5 w-5" />
              ) : (
                <Volume2 className="h-5 w-5" />
              )}
            </button>
            
            <div 
              ref={volumeBarRef}
              onClick={handleVolumeBarClick}
              className="relative w-24 h-1.5 bg-gray-200 rounded-full cursor-pointer"
            >
              <div 
                className="absolute top-0 left-0 h-full bg-blue-600 rounded-full"
                style={{ width: `${volume * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Componente de playlist inspirado no Spotify
function PlaylistPlayer({ playlist }: { playlist: AudioInfo[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(true); // Começar com a playlist aberta
  const [isPlaying, setIsPlaying] = useState(false);
  
  const currentAudio = playlist[currentIndex];
  
  const handlePlayNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % playlist.length);
    // Força o play do próximo áudio quando clica em próximo
    setIsPlaying(true);
  };
  
  const handlePlayPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + playlist.length) % playlist.length);
    // Força o play do áudio anterior quando clica em anterior
    setIsPlaying(true);
  };
  
  const handleSelectTrack = (index: number) => {
    setCurrentIndex(index);
    // Começa a tocar o áudio selecionado automaticamente
    setIsPlaying(true);
  };
  
  const togglePlaylist = () => {
    setIsPlaylistOpen(!isPlaylistOpen);
  };
  
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  
  return (
    <div className="rounded-2xl shadow-lg overflow-hidden mb-8 bg-gradient-to-b from-[#121212] to-[#181818] text-white w-full max-w-full">
      <div className="flex flex-col md:flex-row overflow-hidden">
        {/* Lista de músicas (sidebar à esquerda) - visível em telas médias e grandes */}
        <div className={`md:w-72 lg:w-80 md:block ${isPlaylistOpen ? 'block' : 'hidden'} bg-[#121212] border-r border-[#282828] overflow-hidden`}>
          {/* Header fixo da sidebar */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xl font-bold flex items-center">
                <Music className="h-5 w-5 mr-2 text-[#1ED760]" />
                Playlist Neonatal
              </h4>
              <button 
                onClick={togglePlaylist}
                className="md:hidden p-2 text-gray-400 hover:text-white rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="text-sm text-gray-400 mb-6">9 áudios • Desenvolvimento infantil</p>
          </div>
          {/* Lista de faixas sem altura fixa e sem overflow */}
          <div className="px-6 pb-6 overflow-y-auto">
            {playlist.map((item, index) => (
              <button
                key={index}
                onClick={() => handleSelectTrack(index)}
                className={`w-full p-3 rounded flex items-center gap-3 text-left transition-all ${
                  index === currentIndex
                    ? "bg-[#282828]"
                    : "hover:bg-[#282828]/50"
                }`}
              >
                <div className="flex-shrink-0 w-10 h-10 rounded bg-[#282828] flex items-center justify-center relative group">
                  {index === currentIndex && isPlaying ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded">
                      <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>
                    </div>
                  ) : (
                    <span className="text-gray-400 group-hover:hidden">{index + 1}</span>
                  )}
                  {index !== currentIndex && (
                    <Play className="h-5 w-5 text-white hidden group-hover:block absolute inset-0 m-auto" />
                  )}
                  {index === currentIndex && !isPlaying && (
                    <Play className="h-5 w-5 text-white hidden group-hover:block absolute inset-0 m-auto" />
                  )}
                  {index === currentIndex && isPlaying && (
                    <Pause className="h-5 w-5 text-white hidden group-hover:block absolute inset-0 m-auto" />
                  )}
                </div>
                <div className="flex-1 min-w-0 overflow-hidden">
                  <p className={`font-medium truncate ${
                    index === currentIndex ? "text-[#1ED760]" : "text-white"
                  }`}>
                    {item.title}
                  </p>
                  <p className="text-sm text-gray-400 truncate">{item.description.substring(0, 40)}...</p>
                </div>
              </button>
            ))}
          </div>
        </div>
        
        {/* Player e detalhes do áudio atual (conteúdo principal) */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Barra superior com toggle da playlist em mobile */}
          <div className="bg-[#181818] p-4 flex items-center md:hidden">
            <button 
              onClick={togglePlaylist}
              className="p-2 text-gray-400 hover:text-white rounded-full transition-colors"
            >
              <List className="h-5 w-5" />
            </button>
            <div className="ml-3 overflow-hidden">
              <p className="font-medium text-sm truncate">Playlist: Neonatal</p>
              <p className="text-xs text-gray-400">{currentIndex + 1} de {playlist.length}</p>
            </div>
          </div>
          
          {/* Capa e detalhes do áudio atual */}
          <div className="p-6 flex flex-col items-center md:items-start md:flex-row md:gap-8 overflow-hidden">
            <div className="w-40 h-40 md:w-48 md:h-48 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-lg shadow-lg flex items-center justify-center flex-shrink-0 mb-6 md:mb-0">
              {currentAudio.icon}
            </div>
            
            <div className="flex-1 text-center md:text-left overflow-hidden">
              <h3 className="text-xl md:text-2xl font-bold mb-2 truncate">
                {currentAudio.title}
              </h3>
              <p className="text-gray-400 mb-4 line-clamp-2">
                {currentAudio.description}
              </p>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                <button
                  onClick={togglePlayPause}
                  className="p-4 rounded-full bg-[#1ED760] text-black hover:bg-[#1DB954] transition-colors shadow-md"
                >
                  {isPlaying ? (
                    <Pause className="h-6 w-6" />
                  ) : (
                    <Play className="h-6 w-6" />
                  )}
                </button>
                
                <div className="flex items-center">
                  <button 
                    onClick={handlePlayPrevious}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <SkipBack className="h-5 w-5" />
                  </button>
                  
                  <button 
                    onClick={handlePlayNext}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <SkipForward className="h-5 w-5" />
                  </button>
                </div>
                
                <button className="p-2 text-gray-400 hover:text-white transition-colors">
                  <Heart className="h-5 w-5" />
                </button>
                
                <button className="p-2 text-gray-400 hover:text-white transition-colors">
                  <Download className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Player de áudio real (invisível mas funcional) */}
          <div className="px-6 pb-6 overflow-hidden">
            <AudioPlayer 
              audioSrc={currentAudio.src}
              title={currentAudio.title}
              description={currentAudio.description}
              icon={currentAudio.icon}
              playlist={playlist}
              currentIndex={currentIndex}
              onPlayNext={handlePlayNext}
              onPlayPrevious={handlePlayPrevious}
              isPlaying={isPlaying}
              onTogglePlay={togglePlayPause}
              spotifyMode={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AudiosPage() {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Apenas simular carregamento e remover a tela de loading após 2.5 segundos
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    
    return () => {
      clearTimeout(loadingTimer);
    };
  }, []);
  
  // Definindo a playlist neonatal
  const neonatalPlaylist: AudioInfo[] = [
    {
      src: "/audio/0-6-meses.mp3",
      title: "Desenvolvimento Infantil: 0-6 meses",
      description: "Guia completo sobre o desenvolvimento neuromotor do bebê durante os primeiros 6 meses de vida.",
      icon: <Baby className="h-24 w-24 text-white" />
    },
    {
      src: "/audio/7-15-meses.mp3",
      title: "Desenvolvimento Infantil: 7-15 meses",
      description: "Explicação detalhada das habilidades motoras e marcos de desenvolvimento esperados entre 7 e 15 meses de idade.",
      icon: <Baby className="h-24 w-24 text-white" />
    },
    {
      src: "/audio/padroes-motores.mp3",
      title: "Padrões Motores do Bebê",
      description: "Explicação sobre as etapas cruciais do desenvolvimento motor grosso nos primeiros anos de vida.",
      icon: <Music className="h-24 w-24 text-white" />
    },
    {
      src: "/audio/Reações de 0 a 15 meses.mp3",
      title: "Reações de 0 a 15 meses",
      description: "Informações sobre reações posturais e de equilíbrio durante o primeiro ano de vida do bebê.",
      icon: <Baby className="h-24 w-24 text-white" />
    },
    {
      src: "/audio/Escala de avaliação neonatal.mp3",
      title: "Escala de Avaliação Neonatal",
      description: "Guia detalhado sobre as principais escalas de avaliação utilizadas para recém-nascidos na prática fisioterapêutica.",
      icon: <Headphones className="h-24 w-24 text-white" />
    },
    {
      src: "/audio/metodo canguru.mp3",
      title: "Método Canguru",
      description: "Abordagem detalhada sobre o Método Canguru e seus benefícios para bebês prematuros e de baixo peso.",
      icon: <Baby className="h-24 w-24 text-white" />
    },
    {
      src: "/audio/Dor Neonatal.mp3",
      title: "Dor Neonatal",
      description: "Estratégias para avaliação e manejo da dor em recém-nascidos durante procedimentos na UTI Neonatal.",
      icon: <Headphones className="h-24 w-24 text-white" />
    },
    {
      src: "/audio/Sequela Neurologica em Prematuros.mp3",
      title: "Sequela Neurológica em Prematuros",
      description: "Análise das principais sequelas neurológicas em bebês prematuros, fatores de risco e abordagens terapêuticas.",
      icon: <Headphones className="h-24 w-24 text-white" />
    },
    {
      src: "/audio/Sequelas de doenças pulmonares em prematuros.mp3",
      title: "Sequelas de Doenças Pulmonares em Prematuros",
      description: "Estudo sobre as complicações respiratórias crônicas da prematuridade e intervenções fisioterapêuticas.",
      icon: <Headphones className="h-24 w-24 text-white" />
    }
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#121212] to-[#181818] text-white overflow-x-hidden">
      <Head>
        <title>Áudios | FisioNeo</title>
      </Head>
      
      {/* Tela de carregamento */}
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen />}
      </AnimatePresence>
      
      {/* Navbar personalizado estilo Spotify */}
      <div className="bg-[#0A0A0A] border-b border-[#282828] sticky top-0 z-30" data-custom="audio-header">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <a href="/" className="flex items-center">
                <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1DB954] to-[#1ED760]">FisioNeo</span>
              </a>
              <nav className="hidden md:ml-10 md:flex space-x-8">
                <a href="/temas" className="text-gray-300 hover:text-white transition-colors">
                  Temas
                </a>
                <a href="/prova-pediatrica" className="text-gray-300 hover:text-white transition-colors">
                  Prova pediátrica
                </a>
                <a href="/audios" className="text-white border-b-2 border-[#1DB954] pb-1 font-medium">
                  Áudios
                </a>
                <a href="/prova-geral" className="text-gray-300 hover:text-white transition-colors">
                  Prova neonatal
                </a>
              </nav>
            </div>
            <div className="flex items-center">
              <a 
                href="/"
                className="p-2 rounded-full hover:bg-[#282828] transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-300" />
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <main className="pb-20 overflow-x-hidden max-w-full">
        {/* Header com gradiente e título - ajustado para mobile */}
        <div className="bg-gradient-to-b from-[#3D3D3D] to-transparent relative px-4 pt-16 pb-32 md:pb-16 md:pt-12 md:h-64">
          <div className="container mx-auto max-w-5xl">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 flex items-start md:items-center">
              <Headphones className="h-7 w-7 md:h-8 md:w-8 mr-3 text-[#1ED760] mt-1 md:mt-0 flex-shrink-0" />
              <span>Biblioteca de Áudios</span>
            </h1>
            <p className="text-gray-300 text-base md:text-lg max-w-2xl">
              Material educacional em áudio sobre fisioterapia neonatal e pediátrica para otimizar seus estudos.
            </p>
          </div>
        </div>
        
        {/* Conteúdo principal - ajustado offset para mobile */}
        <div className="container mx-auto max-w-5xl px-4 -mt-20 md:-mt-16">
          {/* Seção da Playlist */}
          <div className="mb-16 overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-white flex items-center">
                <Music className="h-5 w-5 mr-2 text-[#1ED760]" />
                <span>Playlist Recomendada</span>
              </h2>
            </div>
            
            {/* Card da Playlist em destaque */}
            <div className="bg-gradient-to-r from-[#303030] to-[#1c1c1c] rounded-lg p-5 md:p-6 shadow-lg mb-8 overflow-hidden w-full">
              <div className="flex flex-col md:flex-row gap-5 md:gap-6 items-center">
                <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-[#1DB954] via-[#1DB954]/80 to-[#1c1c1c] rounded-lg flex items-center justify-center shadow-xl flex-shrink-0">
                  <Music className="h-16 w-16 md:h-20 md:w-20 text-white/90" />
                </div>
                <div className="flex-1 text-center md:text-left overflow-hidden">
                  <div className="text-sm font-medium text-gray-300 mb-1">PLAYLIST</div>
                  <h3 className="text-3xl md:text-4xl font-bold mb-2 truncate">Fisioterapia Neonatal</h3>
                  <p className="text-gray-300 mb-3 md:mb-4 text-sm md:text-base line-clamp-2">
                    Coleção completa com 9 áudios sobre desenvolvimento infantil e avaliação neonatal.
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    <div className="bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full text-xs md:text-sm">
                      9 áudios
                    </div>
                    <div className="bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full text-xs md:text-sm">
                      Desenvolvimento infantil
                    </div>
                    <div className="bg-[#1DB954]/30 backdrop-blur-sm px-3 py-1 rounded-full text-xs md:text-sm text-[#1DB954]">
                      FisioNeo
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Player da playlist */}
            <div className="w-full overflow-hidden">
              <PlaylistPlayer playlist={neonatalPlaylist} />
            </div>
          </div>
          
          {/* Informações adicionais em cards modernos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-12 md:mb-16">
            <div className="bg-[#232323] rounded-lg p-5 md:p-6 hover:bg-[#282828] transition-colors">
              <div className="flex items-start">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#1DB954]/10 flex items-center justify-center mr-4 flex-shrink-0">
                  <Baby className="h-5 w-5 md:h-6 md:w-6 text-[#1DB954]" />
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-bold text-white mb-1">Conteúdo especializado</h3>
                  <p className="text-gray-400 text-xs md:text-sm">
                    Áudios criados com base em artigos científicos e conteúdo educacional validado.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-[#232323] rounded-lg p-5 md:p-6 hover:bg-[#282828] transition-colors">
              <div className="flex items-start">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#1DB954]/10 flex items-center justify-center mr-4 flex-shrink-0">
                  <Download className="h-5 w-5 md:h-6 md:w-6 text-[#1DB954]" />
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-bold text-white mb-1">Material para estudo</h3>
                  <p className="text-gray-400 text-xs md:text-sm">
                    Ouça durante atividades ou baixe para estudo offline (funcionalidade em breve).
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Rodapé com chamada para ação */}
          <div className="bg-gradient-to-r from-[#1e3264] to-[#2d46b9] rounded-lg p-6 md:p-8 shadow-lg">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 text-center md:text-left">
                <h3 className="text-lg md:text-xl font-bold text-white mb-2">Quer mais conteúdo em áudio?</h3>
                <p className="text-gray-300 text-sm md:text-base">
                  Nos envie sugestões de temas para expandir nossa biblioteca de áudios.
                </p>
              </div>
              <a 
                href="https://wa.me/5571991373142"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 md:px-6 md:py-3 bg-white text-[#2d46b9] rounded-full font-medium hover:bg-gray-100 transition-colors text-sm md:text-base"
              >
                Enviar sugestão
              </a>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer personalizado estilo Spotify */}
      <div className="bg-[#121212] border-t border-[#282828] py-8 mt-8" data-custom="audio-footer">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1DB954] to-[#1ED760] mb-2">FisioNeo</div>
              <p className="text-gray-400 text-sm">© 2025 Todos os direitos reservados</p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8 md:items-center">
              <div>
                <h4 className="text-white font-medium mb-3">Links rápidos</h4>
                <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                  <a href="/temas" className="text-gray-400 hover:text-[#1DB954] transition-colors text-sm">Temas</a>
                  <a href="/provas" className="text-gray-400 hover:text-[#1DB954] transition-colors text-sm">Provas</a>
                  <a href="/audios" className="text-[#1DB954] font-medium text-sm">Áudios</a>
                  <a href="/revisao" className="text-gray-400 hover:text-[#1DB954] transition-colors text-sm">Revisão</a>
                </div>
              </div>
              
              <a 
                href="https://wa.me/5571991373142"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-[#1DB954] hover:bg-[#1ED760] text-black rounded-full font-medium text-sm transition-colors"
              >
                Contato
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modal de informações - só será exibido se o usuário clicar em algum botão que ative showModal */}
      {showModal && <InfoModal isOpen={showModal} onClose={() => setShowModal(false)} />}
      
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fadeInRight {
          animation: fadeInRight 0.3s ease-out forwards;
        }
        
        /* Estilos básicos de scrollbar para WebKit */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #181818;
        }
        ::-webkit-scrollbar-thumb {
          background: #4d4d4d;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #5a5a5a;
        }
        
        /* Estilos para Firefox */
        * {
          scrollbar-width: thin;
          scrollbar-color: #4d4d4d #181818;
        }
        
        /* Prevenir scroll horizontal em toda a aplicação */
        html, body {
          overflow-x: hidden;
          max-width: 100%;
        }
        
        /* Garantir que todos os textos quebrem */
        p, h1, h2, h3, h4, h5, h6, span, div {
          overflow-wrap: break-word;
          word-wrap: break-word;
          -ms-word-break: break-all;
          word-break: break-word;
        }
        
        /* Esconder elementos específicos apenas nesta página */
        nav[data-component="navbar"],
        footer[data-component="footer"],
        div.absolute.inset-0.bg-gradient-to-r.from-\[#6EC1E4\]\/5.to-\[#B9A9FF\]\/5,
        footer.relative.bg-gradient-to-b.from-white.to-\[#F8FBFD\],
        header.sticky.top-0.z-50.w-full.transition-all.duration-300.bg-transparent {
          display: none !important;
        }
        
        /* Esconder qualquer navbar padrão por seletor mais genérico também */
        header:not([data-custom="audio-header"]) {
          display: none !important;
        }
        
        /* Esconder qualquer footer padrão, mas não o footer personalizado da página de áudios */
        footer:not([data-custom="audio-footer"]) {
          display: none !important;
        }
        
        /* Garantir que o body tenha o fundo correto e sem gradientes indesejados */
        body {
          background: linear-gradient(to bottom, #121212, #181818) !important;
        }
      `}</style>
    </div>
  )
} 