"use client"

import { ArrowLeft, BookOpen, Share2, Bookmark, ChevronDown, ChevronUp, Info, ArrowUp, Activity, Clock, Calendar } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import DraggableAIButton from "@/app/components/DraggableAIButton"
import BackToTop from "@/app/components/ui/back-to-top"
import ReadingProgress from "@/app/components/ui/reading-progress"

export default function DuchennePage() {
  const [bookmarked, setBookmarked] = useState(false)
  const [showMobileTableOfContents, setShowMobileTableOfContents] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  // Dados da página
  const topic = {
    id: "duchenne",
    title: "Intervenções fisioterapêuticas na distrofia muscular de duchenne",
    description: "Abordagem fisioterapêutica para pacientes com Distrofia Muscular de Duchenne (DMD), incluindo estratégias de tratamento, tecnologias assistivas e princípios de reabilitação.",
    content: "<h3>O que é Distrofia Muscular de Duchenne</h3><p>Definição, características e manifestações clínicas da DMD.</p><h3>Diagnóstico e Incidência</h3><p>Formas de diagnóstico e prevalência da doença.</p><h3>Papel do Fisioterapeuta</h3><p>A importância da fisioterapia no tratamento da DMD.</p><h3>Princípios de Reabilitação</h3><p>Abordagens terapêuticas para manter a função muscular.</p><h3>Intervenções Específicas</h3><p>Técnicas e recursos terapêuticos para DMD.</p><h3>Hidroterapia e DMD</h3><p>Benefícios da terapia aquática no tratamento.</p><h3>Tecnologia Assistiva</h3><p>Uso de recursos tecnológicos no tratamento.</p><h3>Adequação Postural</h3><p>Estratégias para manutenção da postura adequada.</p>",
    icon: <Activity className="h-12 w-12 text-[#6EC1E4]" />
  }

  // Função para extrair os títulos dos meses a partir do conteúdo HTML
  const extractHeadings = (): string[] => {
    const regex = /<h3[^>]*>(.*?)<\/h3>/g;
    const content = topic.content || "";
    const matches = [...content.matchAll(regex)];
    return matches.map(match => match[1]);
  };

  const headings = extractHeadings();

  // Efeito para monitorar o progresso de rolagem da página
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const childVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F0F9FF]">
      {/* Barra de progresso fixa no topo da página */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-gradient-to-r from-[#6EC1E4] to-[#4A96D1] transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
      
      <BackToTop />
      <DraggableAIButton />
      
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <Link
            href="/pediatria"
            className="inline-flex items-center text-[#666666] hover:text-[#6EC1E4] transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para Pediatria
          </Link>
          
          <div className="flex items-center space-x-3">
            <button 
              className="p-2 rounded-full hover:bg-[#F0F9FF] transition-colors"
              onClick={() => window.navigator.share && window.navigator.share({
                title: topic.title,
                text: topic.description,
                url: window.location.href
              })}
            >
              <Share2 className="h-5 w-5 text-[#6EC1E4]" />
            </button>
            
            <button 
              className="p-2 rounded-full hover:bg-[#F0F9FF] transition-colors"
              onClick={() => setBookmarked(!bookmarked)}
            >
              <Bookmark 
                className={`h-5 w-5 ${bookmarked ? 'fill-[#6EC1E4] text-[#6EC1E4]' : 'text-[#6EC1E4]'}`} 
              />
            </button>
          </div>
        </div>

        {/* ThemeInfoCard simplificado */}
        <div className="bg-blue-50 rounded-lg p-6 mb-8">
          <div className="flex items-start">
            <div className="mr-2 text-[#6EC1E4]">
              <Info className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-medium text-gray-900 mb-2">Sobre este tema</h2>
              <p className="text-gray-600">
                Este conteúdo educativo aborda as intervenções fisioterapêuticas na Distrofia Muscular de Duchenne (DMD),
                destacando técnicas e recursos que podem retardar a progressão da doença e melhorar a qualidade de vida dos pacientes.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm ml-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Informações do material</h3>
              <div className="text-sm text-gray-600">
                <div className="flex items-center mb-1">
                  <Clock className="h-4 w-4 mr-1 text-[#6EC1E4]" />
                  Tempo de leitura: 15 minutos
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1 text-[#6EC1E4]" />
                  Última atualização: <span className="ml-1 bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded">Junho 2025</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <motion.div 
          initial="hidden" 
          animate="visible" 
          variants={staggerChildren} 
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={childVariant} className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
              <div className="p-4 bg-white rounded-xl shadow-md border border-[#E0E0E0]">
                {topic.icon}
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-[#333333] mb-2">{topic.title}</h1>
                <p className="text-lg text-[#666666]">{topic.description}</p>
              </div>
            </div>
            
            {/* Navegação rápida para dispositivos móveis */}
            <div className="block lg:hidden mb-8">
              <button 
                onClick={() => setShowMobileTableOfContents(!showMobileTableOfContents)}
                className="w-full py-3 px-4 bg-white rounded-lg shadow-sm border border-[#E0E0E0] flex items-center justify-between"
              >
                <span className="font-medium text-[#4A96D1]">Índice do conteúdo</span>
                {showMobileTableOfContents ? (
                  <ChevronUp className="h-5 w-5 text-[#6EC1E4]" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-[#6EC1E4]" />
                )}
              </button>
              
              <AnimatePresence>
                {showMobileTableOfContents && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-2 bg-white rounded-lg shadow-sm border border-[#E0E0E0] p-4">
                      <h3 className="font-medium text-gray-700 mb-3">Navegue por seção:</h3>
                      <div className="space-y-2">
                        {headings.map((title, index) => (
                          <a
                            key={index}
                            href={`#${title.toLowerCase().replace(/\s+/g, '-')}`}
                            className="block p-2 hover:bg-[#F0F9FF] rounded-lg transition-colors text-[#4A96D1]"
                            onClick={() => setShowMobileTableOfContents(false)}
                          >
                            {title}
                          </a>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Índice para desktop (coluna lateral) */}
            <div className="hidden lg:block">
              <div className="sticky top-24 bg-white rounded-xl shadow-md border border-[#E0E0E0] p-6">
                <h2 className="text-xl font-bold text-[#333333] mb-4">Neste artigo</h2>
                <div className="space-y-3">
                  {headings.map((title, index) => (
                    <a
                      key={index}
                      href={`#${title.toLowerCase().replace(/\s+/g, '-')}`}
                      className="block py-2 px-3 hover:bg-[#F0F9FF] rounded-lg transition-colors text-[#4A96D1]"
                    >
                      {title}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Conteúdo principal */}
            <motion.div 
              variants={childVariant} 
              className="lg:col-span-3 bg-white rounded-xl shadow-md border border-[#E0E0E0] p-6 lg:p-8"
            >
              <div className="prose prose-lg max-w-none">
                <p className="mb-6">
                  Bom dia a todos! Hoje, vamos abordar um tema de grande relevância dentro da fisioterapia pediátrica: as intervenções fisioterapêuticas na Distrofia Muscular de Duchenne (DMD), com base em uma revisão de literatura que realizei.
                </p>

                <section id="o-que-é-distrofia-muscular-de-duchenne" className="mb-10">
                  <h2 className="text-2xl font-bold text-[#333333] mb-4">O que é Distrofia Muscular de Duchenne</h2>
                  <p className="mb-4">
                    Primeiramente, é crucial entendermos o que é a DMD. Trata-se de uma doença genética que se manifesta através da fraqueza muscular progressiva, levando à paralisia e, infelizmente, em muitos casos, à morte precoce, geralmente no final da adolescência ou no início da vida adulta. Um dos sinais clínicos mais característicos é a manobra de Gowers, que indica fraqueza nos músculos proximais dos membros inferiores devido à atrofia muscular.
                  </p>
                  
                  <p className="mb-4">
                    É importante ressaltar que a DMD é caracterizada por um padrão de degeneração e fraqueza muscular progressivas, compensações posturais e risco de contraturas e deformidades. Essa condição é causada por um defeito bioquímico intrínseco da célula muscular, relacionado à ausência ou deficiência da proteína distrofina.
                  </p>
                  
                  <p className="mb-4">
                    Clinicamente, a DMD se manifesta inicialmente como fraqueza nos músculos esqueléticos maiores ao redor dos ombros e quadris, progredindo para todos os músculos esqueléticos nos membros e tronco. Isso leva a uma perda progressiva de habilidades funcionais, como subir escadas, caminhar, ficar em pé, sentar e realizar atividades da vida diária.
                  </p>
                  
                  <div className="bg-[#F0F9FF] p-5 rounded-lg mb-6">
                    <h3 className="text-xl font-medium text-[#4A96D1] mb-3">Características Clínicas da DMD</h3>
                    <ul className="list-disc pl-6">
                      <li className="mb-2">Fraqueza muscular progressiva</li>
                      <li className="mb-2">Manobra de Gowers (sinal característico)</li>
                      <li className="mb-2">Pseudo-hipertrofia dos músculos da panturrilha</li>
                      <li className="mb-2">Alterações posturais compensatórias</li>
                      <li className="mb-2">Desenvolvimento de contraturas e deformidades</li>
                      <li>Comprometimento cardiorrespiratório nas fases avançadas</li>
                    </ul>
                  </div>
                </section>

                <section id="diagnóstico-e-incidência" className="mb-10">
                  <h2 className="text-2xl font-bold text-[#333333] mb-4">Diagnóstico e Incidência</h2>
                  <p className="mb-4">
                    A incidência da DMD é de aproximadamente um em cada 3.500 meninos nascidos vivos. O diagnóstico pode ser estabelecido por meio do histórico familiar, achados clínicos, laboratoriais e genéticos. Embora o tratamento seja limitado e não exista uma terapia que reverta o processo da distrofina muscular, a avaliação multidisciplinar e a assistência continuada são importantes para orientar as intervenções de reabilitação.
                  </p>
                  
                  <p className="mb-4">
                    O Instituto Nacional do Câncer (INCA) estimou um número significativo de novos casos de câncer no Brasil em um determinado ano, com uma variação de 1% a 4,6% desses casos ocorrendo na população infantil. As causas do câncer infantil ainda são amplamente desconhecidas, mas fatores genéticos e ambientais podem aumentar o risco. A exposição à radiação ionizante e a agentes químicos e quimioterápicos são exemplos de fatores ambientais a serem considerados.
                  </p>
                  
                  <div className="border-l-4 border-[#6EC1E4] pl-4 py-2 mb-6">
                    <p className="text-gray-700">
                      O diagnóstico precoce da DMD é fundamental para iniciar intervenções que possam retardar a progressão da doença e prevenir complicações secundárias, melhorando significativamente a qualidade de vida dos pacientes.
                    </p>
                  </div>
                </section>

                <section id="papel-do-fisioterapeuta" className="mb-10">
                  <h2 className="text-2xl font-bold text-[#333333] mb-4">Papel do Fisioterapeuta</h2>
                  <p className="mb-4">
                    A pesquisa que desenvolvemos teve como objetivo principal verificar o papel do fisioterapeuta no tratamento de pacientes com DMD, analisando criticamente os protocolos de tratamento com embasamento científico. Para isso, realizamos um levantamento bibliográfico nas bases de dados Scielo e Pubmed, selecionando 11 artigos que apresentavam amostragens significativas.
                  </p>
                  
                  <p className="mb-4">
                    Nossos resultados apontaram que a fisioterapia desempenha um papel fundamental no retardo da progressão da doença e na prevenção de complicações secundárias. Em outras palavras, as intervenções fisioterapêuticas podem melhorar significativamente a qualidade de vida desses pacientes.
                  </p>
                  
                  <div className="bg-[#F0F9FF] p-5 rounded-lg mb-6">
                    <h3 className="text-xl font-medium text-[#4A96D1] mb-3">Principais Objetivos da Fisioterapia na DMD</h3>
                    <ul className="list-disc pl-6">
                      <li className="mb-2">Retardar a progressão da doença</li>
                      <li className="mb-2">Prevenir complicações secundárias</li>
                      <li className="mb-2">Manter a função muscular pelo maior tempo possível</li>
                      <li className="mb-2">Melhorar a qualidade de vida do paciente</li>
                      <li className="mb-2">Orientar familiares quanto aos cuidados necessários</li>
                      <li>Facilitar a adaptação do paciente às suas limitações</li>
                    </ul>
                  </div>
                </section>

                <section id="princípios-de-reabilitação" className="mb-10">
                  <h2 className="text-2xl font-bold text-[#333333] mb-4">Princípios de Reabilitação</h2>
                  <p className="mb-4">
                    Dentro dos princípios de reabilitação, o tratamento deve incluir opções para manter o comprimento e a extensibilidade dos grupos musculares afetados. Embora faltem evidências robustas, alongamentos regulares e o uso de órteses são recomendados para atrasar ou impedir o desenvolvimento de contraturas.
                  </p>
                  
                  <p className="mb-4">
                    Adicionalmente, os corticosteroides podem ser prescritos para prolongar a deambulação, mas seus efeitos na saúde óssea devem ser considerados. O exercício submáximo regular é recomendado para evitar a atrofia muscular por desuso e outras complicações da inatividade.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-[#F0F9FF] p-5 rounded-lg">
                      <h3 className="text-xl font-medium text-[#4A96D1] mb-3">Estratégias para Manutenção Muscular</h3>
                      <ul className="list-disc pl-6">
                        <li className="mb-1">Alongamentos regulares</li>
                        <li className="mb-1">Exercícios submáximos</li>
                        <li className="mb-1">Uso de órteses</li>
                        <li>Posicionamento adequado</li>
                      </ul>
                    </div>
                    
                    <div className="bg-[#F0F9FF] p-5 rounded-lg">
                      <h3 className="text-xl font-medium text-[#4A96D1] mb-3">Tratamento Farmacológico Complementar</h3>
                      <ul className="list-disc pl-6">
                        <li className="mb-1">Corticosteroides para prolongar deambulação</li>
                        <li className="mb-1">Monitoramento da saúde óssea</li>
                        <li className="mb-1">Cuidados com efeitos colaterais</li>
                        <li>Suplementação nutricional quando necessária</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section id="intervenções-específicas" className="mb-10">
                  <h2 className="text-2xl font-bold text-[#333333] mb-4">Intervenções Específicas</h2>
                  <p className="mb-4">
                    Em relação às intervenções fisioterapêuticas específicas, o estudo de Case Laura et al. (2018) destaca que o alongamento, o uso de órteses e os ajustes posturais reduzem a dor, a tensão muscular e melhoram a flexibilidade, além de aumentar a circulação. Isso resulta na prevenção de contraturas e deformidades progressivas, redução do gasto energético e maior independência funcional e conforto para o paciente.
                  </p>
                  
                  <p className="mb-4">
                    Por fim, é importante ressaltar que o uso precoce de órteses, especialmente as AFOs articuladas, pode promover mudanças positivas nos parâmetros da marcha, desde que utilizadas antes que o déficit funcional esteja avançado.
                  </p>
                  
                  <div className="bg-[#F0F9FF] p-5 rounded-lg mb-6">
                    <h3 className="text-xl font-medium text-[#4A96D1] mb-3">Técnicas de Intervenção na DMD</h3>
                    <ul className="list-disc pl-6">
                      <li className="mb-2">Alongamentos para prevenção de contraturas</li>
                      <li className="mb-2">Exercícios de fortalecimento submáximos</li>
                      <li className="mb-2">Técnicas respiratórias para manutenção da função pulmonar</li>
                      <li className="mb-2">Exercícios de equilíbrio e coordenação</li>
                      <li className="mb-2">Técnica de vibração do corpo inteiro para força muscular</li>
                      <li>Treino de atividades funcionais e transferências</li>
                    </ul>
                  </div>
                </section>

                <section id="hidroterapia-e-dmd" className="mb-10">
                  <h2 className="text-2xl font-bold text-[#333333] mb-4">Hidroterapia e DMD</h2>
                  <p className="mb-4">
                    Outro ponto relevante é a hidroterapia, que tem se mostrado eficaz no tratamento da DMD. As propriedades físicas da água facilitam a movimentação, o fortalecimento dos músculos atrofiados, a redução da dor e o relaxamento muscular. Além disso, a hidroterapia permite a aplicação de exercícios respiratórios, o treino de marcha e atividades lúdicas, melhorando o equilíbrio e reduzindo o risco de quedas.
                  </p>
                  
                  <div className="bg-[#F0F9FF] p-5 rounded-lg mb-6">
                    <h3 className="text-xl font-medium text-[#4A96D1] mb-3">Benefícios da Hidroterapia na DMD</h3>
                    <ul className="list-disc pl-6">
                      <li className="mb-2">Flutuabilidade facilita movimentos ativos</li>
                      <li className="mb-2">Resistência da água proporciona fortalecimento gradual</li>
                      <li className="mb-2">Propriedades térmicas auxiliam no relaxamento muscular</li>
                      <li className="mb-2">Ambiente lúdico aumenta adesão ao tratamento</li>
                      <li className="mb-2">Permite exercícios respiratórios e de equilíbrio</li>
                      <li>Reduz o impacto nas articulações durante atividades</li>
                    </ul>
                  </div>
                </section>

                <section id="tecnologia-assistiva" className="mb-10">
                  <h2 className="text-2xl font-bold text-[#333333] mb-4">Tecnologia Assistiva</h2>
                  <p className="mb-4">
                    Não podemos deixar de mencionar o uso de tecnologia assistiva, como a realidade virtual, para melhorar a condição física e funcional de pacientes com DMD. Estudos têm demonstrado que o uso de jogos de computador com interfaces específicas pode proporcionar um melhor desempenho, ativando a função muscular distal e facilitando os ajustes por meio de interfaces virtuais.
                  </p>
                  
                  <div className="border-l-4 border-[#6EC1E4] pl-4 py-2 mb-6">
                    <p className="text-gray-700">
                      As diversas especialidades da fisioterapia, como a aquática e o uso de equipamentos de auxílio à marcha, juntamente com novas técnicas que utilizam games, têm se mostrado promissoras no tratamento da DMD, proporcionando uma abordagem mais lúdica e motivadora para os pacientes.
                    </p>
                  </div>
                </section>

                <section id="adequação-postural" className="mb-10">
                  <h2 className="text-2xl font-bold text-[#333333] mb-4">Adequação Postural</h2>
                  <p className="mb-4">
                    Ainda, a adequação postural em cadeiras de rodas é fundamental para diminuir o desconforto respiratório, uma vez que a postura inadequada pode levar à escoliose e comprometer a eficácia da respiração. O alinhamento postural adequado evita compensações na coluna vertebral, beneficiando a função respiratória.
                  </p>
                  
                  <p className="mb-4">
                    A atuação da fisioterapia é importante no ambiente escolar, auxiliando na adaptação de mobiliários e na prescrição de adaptações para melhorar a função e o rendimento escolar de discentes com deficiência motora.
                  </p>
                  
                  <p className="mb-4">
                    Em suma, a fisioterapia desempenha um papel crucial no tratamento da DMD, retardando a progressão da doença e proporcionando uma melhor qualidade de vida para os pacientes. As diversas especialidades da fisioterapia, como a aquática e o uso de equipamentos de auxílio à marcha, juntamente com novas técnicas que utilizam games, têm se mostrado promissoras nesse contexto. Além disso, os exercícios fisioterápicos e as técnicas respiratórias são fundamentais para o bom funcionamento do sistema cardiorrespiratório, que é frequentemente afetado pela doença. A técnica de vibração do corpo inteiro também se mostrou eficaz no quesito força muscular.
                  </p>
                  
                  <p>
                    Espero que esta aula tenha sido esclarecedora e que vocês possam aplicar esses conhecimentos em suas práticas clínicas.
                  </p>
                </section>
                
                <section className="pt-8 border-t border-gray-200">
                  <div className="flex items-start mb-4">
                    <div className="mr-3 text-[#6EC1E4]">
                      <BookOpen className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-[#333333] mb-2">Referências Bibliográficas</h3>
                      <ul className="text-gray-600 space-y-2">
                        <li>CASE LAURA, E. et al. Single Arm Clinical Trial of a Therapeutic Exercise Program for Duchenne Muscular Dystrophy. Journal of Child Neurology, v. 33, n. 8, p. 523-531, 2018.</li>
                        <li>BUSHBY K, FINKEL R, BIRNKRANT DJ, et al. Diagnosis and management of Duchenne muscular dystrophy, part 1: diagnosis, and pharmacological and psychosocial management. Lancet Neurol. 2010;9(1):77-93.</li>
                        <li>EAGLE M, BOURKE J, BULLOCK R, et al. Managing Duchenne muscular dystrophy--the additive effect of spinal surgery and home nocturnal ventilation in improving survival. Neuromuscul Disord. 2007;17(6):470-475.</li>
                        <li>JANSEN M, VAN ALFEN N, GEURTS AC, DE GROOT IJ. Assisted bicycle training delays functional deterioration in boys with Duchenne muscular dystrophy: the randomized controlled trial "no use is disuse". Neurorehabil Neural Repair. 2013;27(9):816-827.</li>
                        <li>SILVA TD, MASSETTI T, CROCETTA TB, et al. The effect of virtual reality motor games on motor and cognitive abilities of children with Duchenne muscular dystrophy. Neuromuscul Disord. 2018;28(9):797-803.</li>
                      </ul>
                    </div>
                  </div>
                </section>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 