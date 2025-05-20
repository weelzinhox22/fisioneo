'use client';

import React from 'react';
import { BookOpen, Calendar, Clock, Info } from 'lucide-react';
import { motion } from 'framer-motion';

interface ThemeInfoCardProps {
  topicId?: string;
  readTime?: number;
}

export function ThemeInfoCard({ topicId = "reflexos-0-6", readTime = 24 }: ThemeInfoCardProps) {
  // Generate a brief summary based on topic ID
  const getSummary = () => {
    switch (topicId) {
      case "reflexos-0-6":
        return "Este conteúdo educativo aborda os reflexos primitivos presentes em recém-nascidos e bebês até 6 meses, explicando sua importância para o desenvolvimento neurológico e motor.";
      case "reflexos-7-15":
        return "Este material apresenta as principais aquisições motoras e o desenvolvimento dos reflexos em bebês de 7 a 15 meses, destacando marcos importantes nesta fase.";
      case "reacoes-0-15":
        return "Este conteúdo explora as reações posturais e de equilíbrio durante o primeiro ano de vida do bebê, fundamentais para o desenvolvimento motor adequado.";
      case "escala-avaliacao":
        return "Este material detalha as principais escalas e métodos de avaliação do desenvolvimento neonatal, essenciais para o acompanhamento clínico adequado.";
      case "dor-neonatal":
        return "Este conteúdo aborda técnicas de avaliação e manejo da dor em recém-nascidos e prematuros, com foco nas abordagens fisioterapêuticas.";
      case "metodo-canguru":
        return "Este material explora os benefícios e a aplicação do método canguru em neonatos, destacando seu impacto no desenvolvimento e na saúde do recém-nascido.";
      case "hidroterapia":
        return "Este conteúdo apresenta técnicas e benefícios da hidroterapia para bebês prematuros e recém-nascidos, com foco na prática fisioterapêutica.";
      case "sequelas-neurologicas":
        return "Este material aborda a identificação e tratamento de sequelas neurológicas em bebês prematuros, com foco na intervenção fisioterapêutica precoce.";
      case "sequelas-pulmonares":
        return "Este conteúdo explora a abordagem fisioterapêutica para sequelas pulmonares em prematuros, detalhando técnicas e cuidados específicos.";
      default:
        return "Este conteúdo educativo foi desenvolvido para ajudar profissionais e estudantes a compreender melhor o desenvolvimento neuropsicomotor de bebês.";
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-white to-[#F8FBFF] p-6 rounded-xl border border-[#E0E0E0]/50 mb-8 overflow-hidden shadow-md"
    >
      <div className="flex flex-col md:flex-row md:items-start gap-5">
        <div className="md:w-8/12">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-[#F0F9FF] rounded-lg mr-3 shadow-sm">
              <Info className="h-5 w-5 text-[#6EC1E4]" />
            </div>
            <h3 className="text-xl font-semibold bg-gradient-to-r from-[#333333] to-[#4A96D1] bg-clip-text text-transparent">Sobre este tema</h3>
          </div>
          
          <p className="text-gray-700 mb-6 leading-relaxed">{getSummary()}</p>
        </div>
        
        <div className="md:w-4/12 bg-[#F0F9FF] p-5 rounded-xl shadow-sm border border-[#E0E0E0]/30">
          <h4 className="text-[#4A96D1] font-medium mb-4 flex items-center">
            <BookOpen className="h-4 w-4 mr-2" />
            Informações do material
          </h4>
          
          <div className="space-y-3">
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="h-4 w-4 text-[#6EC1E4] mr-2.5" />
              <span>Tempo de leitura: <span className="font-medium text-gray-700">{readTime} minutos</span></span>
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="h-4 w-4 text-[#6EC1E4] mr-2.5" />
              <span>Última atualização: <span className="inline-block bg-gradient-to-r from-[#6EC1E4] to-[#4A96D1] text-white px-2.5 py-1 rounded-full text-xs font-medium ml-1">Maio 2025</span></span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 