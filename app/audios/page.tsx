"use client"

import React, { useState, useEffect, useRef } from "react"
import { Headphones, Volume2, VolumeX, Play, Pause, SkipBack, Heart, Share2, Download, Music, Baby, X } from "lucide-react"
import { motion } from "framer-motion"
import Head from "next/head"

interface AudioPlayerProps {
  audioSrc: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

// Criando um objeto global para armazenar instâncias de áudio
const globalAudioInstances: Record<string, HTMLAudioElement> = {};

// Componente de popup modal
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-2xl w-full max-w-4xl animate-fadeIn overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-500"></div>
        
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-blue-800 flex items-center">
              <Music className="h-5 w-5 mr-2 text-blue-600" />
              Informação sobre os Áudios
            </h3>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {/* Conteúdo do modal - versão desktop */}
          <div className="hidden md:grid grid-cols-2 gap-6">
            <div className="text-gray-700 space-y-3">
              <p className="border-l-4 border-blue-400 pl-3 py-1">
                Devido à complexidade e ao tempo necessário para a edição e preparação de conteúdo em formato de áudio, 
                estamos disponibilizando os materiais gradativamente.
              </p>
              
              <p>
                Caso tenha interesse em algum conteúdo específico que ainda não está disponível em nossa biblioteca, 
                entre em contato diretamente com a administração do site.
              </p>
            </div>
            
            <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-400">
              <p className="font-medium text-amber-800 mb-1">⚠️ Aviso importante sobre provas</p>
              <p className="text-amber-700">
                Infelizmente, talvez não seja possível adicionar áudios sobre todos os conteúdos a tempo para as 
                provas oficiais da sua faculdade. Estamos priorizando os temas mais solicitados, mas o processo 
                de produção demanda tempo para garantir a qualidade do material.
              </p>
            </div>
          </div>
          
          {/* Conteúdo do modal - versão mobile (passos) */}
          <div className="md:hidden">
            {step === 1 && (
              <div className="text-gray-700 space-y-3 animate-fadeInRight">
                <p className="border-l-4 border-blue-400 pl-3 py-1">
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
              <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-400 animate-fadeInRight">
                <p className="font-medium text-amber-800 mb-1">⚠️ Aviso importante sobre provas</p>
                <p className="text-amber-700">
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
                    index + 1 === step ? "w-6 bg-blue-500" : "w-2 bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
          
          <div className="flex justify-end items-center mt-6 pt-4 border-t border-gray-100">
            <div className="mr-auto flex items-center text-sm text-blue-800">
              <Baby className="h-4 w-4 mr-2 text-blue-600" />
              <span><span className="font-medium">FisioNeo</span> - Conteúdo especializado</span>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={handleWhatsAppRedirect}
                className="px-5 py-2 border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors font-medium"
              >
                Solicitar tema
              </button>
              
              <button
                onClick={step < totalSteps ? nextStep : onClose}
                className="px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-colors shadow-md font-medium"
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

function AudioPlayer({ audioSrc, title, description, icon }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [isMuted, setIsMuted] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const volumeBarRef = useRef<HTMLDivElement>(null)
  const previousVolume = useRef(volume)

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
      setIsPlaying(false);
      setCurrentTime(0);
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
  }, [audioSrc, volume])

  const togglePlay = () => {
    if (!audioElement) return;

    // Pausar todos os outros áudios primeiro
    Object.entries(globalAudioInstances).forEach(([src, audio]) => {
      if (src !== audioSrc && !audio.paused) {
        audio.pause();
      }
    });

    if (isPlaying) {
      audioElement.pause();
    } else {
      // Tenta reproduzir e lida com possíveis erros
      const playPromise = audioElement.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error("Erro ao reproduzir áudio:", error);
        });
      }
    }
    
    setIsPlaying(!isPlaying);
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

  return (
    <motion.div 
      className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8"
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
            <div className="text-sm font-medium text-blue-600 mb-2">
              ÁUDIO EDUCACIONAL
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
                  isPlaying
                    ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {isPlaying ? (
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
            <button 
              onClick={restart}
              className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <SkipBack className="h-5 w-5" />
            </button>
          </div>
          
          <button 
            onClick={togglePlay}
            className="p-4 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-md"
          >
            {isPlaying ? (
              <Pause className="h-6 w-6" />
            ) : (
              <Play className="h-6 w-6" />
            )}
          </button>
          
          <div className="flex items-center gap-2">
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

export default function AudiosPage() {
  const [showModal, setShowModal] = useState(false);
  
  useEffect(() => {
    // Mostrar o modal automaticamente quando a página carrega
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Head>
        <title>Áudios - FisioNeo</title>
      </Head>
      
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
          Biblioteca de Áudios
        </h1>
        
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Materiais em Áudio
            </h2>
            <p className="text-gray-600 mb-6">
              Bem-vindo à nossa biblioteca de áudios! Aqui você encontrará materiais educacionais 
              sobre fisioterapia neonatal e pediátrica em formato de áudio, perfeitos para estudar 
              durante deslocamentos ou enquanto realiza outras atividades.
              <br />
              <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r mb-8">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  Informação importante
                </h4>
                <p className="text-gray-700 mb-2">
                  O download dos áudios está temporariamente desabilitado.
                </p>
              </div>
            </p>
          </div>
          
          {/* Lista de áudios */}
          <AudioPlayer 
            audioSrc="/audio/0-6-meses.mp3"
            title="Desenvolvimento Infantil: 0-6 meses"
            description="Guia completo sobre o desenvolvimento neuromotor do bebê durante os primeiros 6 meses de vida."
            icon={<Baby className="h-24 w-24 text-white" />}
          />
          
          <AudioPlayer 
            audioSrc="/audio/7-15-meses.mp3"
            title="Desenvolvimento Infantil: 7-15 meses"
            description="Explicação detalhada das habilidades motoras e marcos de desenvolvimento esperados entre 7 e 15 meses de idade."
            icon={<Baby className="h-24 w-24 text-white" />}
          />
          
          <AudioPlayer 
            audioSrc="/audio/padroes-motores.mp3"
            title="Padrões Motores do Bebê"
            description="Explicação sobre as etapas cruciais do desenvolvimento motor grosso nos primeiros anos de vida."
            icon={<Music className="h-24 w-24 text-white" />}
          />
          
          {/* Informações adicionais */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r mb-8">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">
              Sobre os áudios
            </h3>
            <p className="text-gray-700 mb-4">
              Nossos áudios educacionais são gerados com IA, utilizando o conteúdo neonatal e pediátrico do site Fisioneo.vercel.app,
              oferecendo explicações detalhadas sobre conceitos importantes do desenvolvimento infantil.
            </p>
            <p className="text-gray-700">
              Ideal para estudantes de fisioterapia e profissionais que trabalham com desenvolvimento infantil.
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">
              Sugestões de uso:
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Ouça enquanto está ocupado com outras atividades</li>
              <li>Use como material complementar de estudo</li>
              <li>Baixe para ouvir offline quando necessário</li>
              <li>Compartilhe com colegas que também estão estudando fisioterapia neonatal</li>
            </ul>
          </div>
        </div>
      </main>
      
      {/* Modal de informações */}
      <InfoModal isOpen={showModal} onClose={() => setShowModal(false)} />
      
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
      `}</style>
    </div>
  )
} 