"use client"

import { ArrowLeft, BookOpen, Share2, Bookmark, ChevronDown, ChevronUp, Info, ArrowUp, Activity, Clock, Calendar } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import DraggableAIButton from "@/app/components/DraggableAIButton"
import BackToTop from "@/app/components/ui/back-to-top"
import ReadingProgress from "@/app/components/ui/reading-progress"

export default function TEAPage() {
  const [bookmarked, setBookmarked] = useState(false)
  const [showMobileTableOfContents, setShowMobileTableOfContents] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  // Dados da página
  const topic = {
    id: "tea",
    title: "Fisioterapia no Transtorno do Espectro Autista",
    description: "Abordagens fisioterapêuticas para crianças com Transtorno do Espectro Autista (TEA), incluindo conceitos, avaliação e métodos de intervenção.",
    content: "<h3>Conceitos Básicos e Diagnóstico</h3><p>Definição do TEA e importância do diagnóstico precoce.</p><h3>Características e Manifestações Clínicas</h3><p>Principais características e níveis de comprometimento no TEA.</p><h3>Alterações Sensório-Motoras</h3><p>Impactos no desenvolvimento motor e sensorial.</p><h3>Papel da Fisioterapia</h3><p>Benefícios e objetivos da fisioterapia para crianças com TEA.</p><h3>Abordagens Terapêuticas</h3><p>Técnicas e métodos como hidroterapia, equoterapia e musicoterapia.</p><h3>Integração Multidisciplinar</h3><p>Importância da abordagem integrada e participação familiar.</p>",
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
                Este conteúdo educativo aborda as abordagens fisioterapêuticas para crianças com Transtorno do Espectro Autista (TEA), 
                incluindo conceitos fundamentais, avaliação, técnicas terapêuticas e a importância da intervenção precoce para o desenvolvimento motor e sensorial.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm ml-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Informações do material</h3>
              <div className="text-sm text-gray-600">
                <div className="flex items-center mb-1">
                  <Clock className="h-4 w-4 mr-1 text-[#6EC1E4]" />
                  Tempo de leitura: 22 minutos
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1 text-[#6EC1E4]" />
                  Última atualização: <span className="ml-1 bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded">Maio 2025</span>
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
                  Bom dia! Vamos iniciar nossa aula sobre a atuação da fisioterapia em crianças com Transtorno do Espectro Autista (TEA), abordando desde os conceitos básicos até as intervenções terapêuticas.
                </p>

                <section id="conceitos-básicos-e-diagnóstico" className="mb-10">
                  <h2 className="text-2xl font-bold text-[#333333] mb-4">Conceitos Básicos e Diagnóstico</h2>
                  <p className="mb-4">
                    O Transtorno do Espectro Autista (TEA) é um distúrbio do neurodesenvolvimento que se manifesta nos primeiros meses de vida, impactando áreas cruciais como a comunicação, cognição, interação social, comportamento e, notavelmente, as habilidades motoras e sensoriais. A literatura científica demonstra que intervenções fisioterapêuticas podem promover uma melhor qualidade de vida e socialização para crianças com TEA.
                  </p>
                  
                  <p className="mb-4">
                    O diagnóstico precoce é fundamental, pois, embora o TEA não tenha cura, a intervenção temprana minimiza os sintomas e proporciona maior bem-estar às crianças e seus cuidadores. O tratamento geralmente envolve uma combinação de intervenções psicossociais, educacionais e terapias complementares como fisioterapia aquática, equoterapia e musicoterapia. O fisioterapeuta desempenha um papel crucial na minimização dos comprometimentos e no desenvolvimento motor dessas crianças.
                  </p>
                  
                  <div className="bg-[#F0F9FF] p-5 rounded-lg mb-6">
                    <h3 className="text-xl font-medium text-[#4A96D1] mb-3">Importância da Intervenção Precoce</h3>
                    <p className="mb-3">A identificação de atrasos no desenvolvimento e o diagnóstico oportuno de TEA são essenciais por permitirem:</p>
                    <ul className="list-disc pl-6">
                      <li className="mb-2">Encaminhamento para intervenções comportamentais o mais cedo possível</li>
                      <li className="mb-2">Aproveitamento máximo da neuroplasticidade cerebral</li>
                      <li className="mb-2">Implementação de estimulação precoce em qualquer suspeita de TEA</li>
                      <li className="mb-2">Minimização do impacto das manifestações clínicas</li>
                      <li>Melhor prognóstico e qualidade de vida</li>
                    </ul>
                  </div>
                  
                  <p className="mb-4">
                    Qualidade de vida, neste contexto, significa valorizar o bem-estar físico e emocional, as relações interpessoais, o desenvolvimento pessoal, a autodeterminação, a inclusão social e os direitos da criança. É importante proporcionar oportunidades de lazer e recreação, como a utilização da água como elemento terapêutico e lúdico, que auxilia no reconhecimento do esquema corporal, na resposta motora e sensorial, e na construção de relações seguras e de confiança.
                  </p>
                </section>

                <section id="características-e-manifestações-clínicas" className="mb-10">
                  <h2 className="text-2xl font-bold text-[#333333] mb-4">Características e Manifestações Clínicas</h2>
                  <p className="mb-6">
                    O TEA é um transtorno invasivo do desenvolvimento que compromete a interação social, a comunicação verbal e não verbal, e pode incluir movimentos repetitivos e estereotipados. A etiologia do autismo é complexa, com causas multifatoriais que envolvem tanto fatores genéticos quanto ambientais.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-[#F0F9FF] p-5 rounded-lg">
                      <h3 className="text-xl font-medium text-[#4A96D1] mb-3">Fatores Etiológicos</h3>
                      <p>
                        Fatores ambientais como idade avançada dos pais, uso de medicação pela mãe durante a gravidez, diabetes gestacional e infecções virais no período neonatal podem influenciar no desenvolvimento do TEA. Existe também uma forte base genética, com estudos apontando para variações específicas em genes relacionados ao neurodesenvolvimento.
                      </p>
                    </div>
                    
                    <div className="bg-[#F0F9FF] p-5 rounded-lg">
                      <h3 className="text-xl font-medium text-[#4A96D1] mb-3">Epidemiologia</h3>
                      <p>
                        Dados epidemiológicos indicam uma prevalência de 1 em cada 68 nascimentos, com um aumento nas últimas décadas devido à expansão dos critérios diagnósticos e ao incremento dos serviços de saúde. O diagnóstico geralmente ocorre entre 3 e 4 anos de idade, quando as manifestações comportamentais alteradas podem ser classificadas por grau de comprometimento.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-[#F0F9FF] p-5 rounded-lg mb-6">
                    <h3 className="text-xl font-medium text-[#4A96D1] mb-3">Níveis de Autismo</h3>
                    <p className="mb-3">Os níveis variam de acordo com o grau de funcionalidade e dependência:</p>
                    <ul className="list-disc pl-6">
                      <li className="mb-2"><strong>Nível 1:</strong> TEA clássico - exige apoio (menor comprometimento)</li>
                      <li className="mb-2"><strong>Nível 2:</strong> TEA de alto desempenho (Síndrome de Asperger) - exige apoio substancial</li>
                      <li><strong>Nível 3:</strong> Nível mais grave - exige muito apoio substancial (maior comprometimento)</li>
                    </ul>
                  </div>
                  
                  <p className="mb-4">
                    Déficits na comunicação são frequentemente observados antes dos dois anos de idade, sendo a ausência de primeiras palavras e frases um dos principais sinais de alerta. Estima-se que entre 25% e 50% dos indivíduos com TEA não adquirem linguagem funcional ao longo da vida.
                  </p>
                  
                  <p className="mb-4">
                    Comportamentos repetitivos e restritos podem se manifestar através de repetições nos movimentos motores, no uso de objetos e na fala, adesão excessiva a rotinas e hipo ou hipersensibilidade a integrações sensoriais.
                  </p>
                </section>

                <section id="alterações-sensório-motoras" className="mb-10">
                  <h2 className="text-2xl font-bold text-[#333333] mb-4">Alterações Sensório-Motoras</h2>
                  <p className="mb-4">
                    Crianças autistas podem apresentar dificuldades em se relacionar com outras pessoas, compartilhar desejos e sentimentos, fixar o olhar espontaneamente e realizar atividades em grupo. Alterações de tônus muscular, como hipotonia, podem levar a problemas na coluna vertebral e dificuldades no controle postural.
                  </p>
                  
                  <div className="border-l-4 border-[#6EC1E4] pl-4 py-2 mb-6">
                    <p className="text-gray-700">
                      Alterações sensório-motoras comumente observadas em crianças com TEA:
                    </p>
                  </div>
                  
                  <ul className="list-disc pl-6 mb-6">
                    <li className="mb-3">
                      Hipotonia ou hipertonia muscular
                    </li>
                    <li className="mb-3">
                      Disfunções na postura e controle postural
                    </li>
                    <li className="mb-3">
                      Atraso no desenvolvimento motor
                    </li>
                    <li className="mb-3">
                      Alterações de marcha
                    </li>
                    <li className="mb-3">
                      Prejuízos na coordenação motora fina e grossa
                    </li>
                    <li className="mb-3">
                      Déficits na integração sensorial
                    </li>
                    <li className="mb-3">
                      Hipo ou hipersensibilidade a estímulos táteis, auditivos ou visuais
                    </li>
                    <li className="mb-3">
                      Dificuldades de equilíbrio
                    </li>
                    <li>
                      Aquisição tardia de habilidades motoras fundamentais
                    </li>
                  </ul>
                  
                  <p className="mb-4">
                    A capacidade funcional da criança com TEA é influenciada diretamente pelo seu grau de gravidade, com casos mais graves apresentando maior dependência dos cuidadores. A fisioterapia contribui para a conquista da independência e a evolução do desenvolvimento motor, auxiliando nas atividades cotidianas e na interação com o meio.
                  </p>
                </section>

                <section id="papel-da-fisioterapia" className="mb-10">
                  <h2 className="text-2xl font-bold text-[#333333] mb-4">Papel da Fisioterapia</h2>
                  <p className="mb-6">
                    A atuação da fisioterapia pode aprimorar a concentração, a clareza de raciocínio e as habilidades sociais, além de contribuir para o desenvolvimento da coordenação, equilíbrio, habilidades motoras e autocontrole corporal, diminuindo movimentos atípicos.
                  </p>
                  
                  <div className="space-y-6 mb-6">
                    <div className="bg-[#F0F9FF] p-5 rounded-lg">
                      <h3 className="text-xl font-medium text-[#4A96D1] mb-3">Objetivos da Fisioterapia no TEA</h3>
                      <ul className="list-disc pl-6">
                        <li className="mb-2">Desenvolver coordenação motora grossa e fina</li>
                        <li className="mb-2">Melhorar equilíbrio e controle postural</li>
                        <li className="mb-2">Estimular a integração sensorial</li>
                        <li className="mb-2">Inibir movimentos estereotipados e inadequados</li>
                        <li className="mb-2">Promover maior independência nas atividades diárias</li>
                        <li className="mb-2">Facilitar interação social e comunicação</li>
                        <li>Melhorar a qualidade de vida geral da criança</li>
                      </ul>
                    </div>
                    
                    <div className="bg-[#F0F9FF] p-5 rounded-lg">
                      <h3 className="text-xl font-medium text-[#4A96D1] mb-3">Intervenções Específicas</h3>
                      <p className="mb-3">As intervenções fisioterapêuticas podem incluir:</p>
                      <ul className="list-disc pl-6">
                        <li className="mb-2">Atividades lúdicas com brinquedos coloridos, bolas, rodas de danças</li>
                        <li className="mb-2">Movimentos corporais e dinâmicas de integração</li>
                        <li className="mb-2">Exercícios de relaxamento com música</li>
                        <li className="mb-2">Brincadeiras que trabalham o equilíbrio e o contato tátil</li>
                        <li>Atividades de motricidade fina</li>
                      </ul>
                    </div>
                    
                    <div className="bg-[#F0F9FF] p-5 rounded-lg">
                      <h3 className="text-xl font-medium text-[#4A96D1] mb-3">Estratégias de Abordagem</h3>
                      <p>
                        A fisioterapia utiliza a criatividade e a comunicação para obter resultados benéficos, buscando inserir as crianças autistas nas práticas comuns do dia a dia. O estímulo, a motivação e a alegria são usados como técnicas lúdicas, incentivando a criança a aprender e sentir prazer no aprendizado.
                      </p>
                    </div>
                    
                    <div className="bg-[#F0F9FF] p-5 rounded-lg">
                      <h3 className="text-xl font-medium text-[#4A96D1] mb-3">Avaliação Fisioterapêutica</h3>
                      <p>
                        A avaliação da criança pode ser feita através da Medida de Independência Funcional (MIF), que analisa aspectos cognitivos e motores, como memória, força muscular, comunicação, autocuidado, comportamento, interação social, mudança de postura, marcha e atividades de vida diária.
                      </p>
                    </div>
                  </div>
                </section>

                <section id="abordagens-terapêuticas" className="mb-10">
                  <h2 className="text-2xl font-bold text-[#333333] mb-4">Abordagens Terapêuticas</h2>
                  <p className="mb-6">
                    A fisioterapia também atua na inibição de movimentos anormais, melhorando o autoajuste corporal e proporcionando o treino de habilidades motoras e equilíbrio. Em casos de dificuldades na coordenação motora grossa, o fisioterapeuta ajusta exercícios de maneira funcional, auxiliando a criança a aprender movimentos dos membros para contribuir com o equilíbrio e a coordenação.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-[#F0F9FF] p-5 rounded-lg">
                      <h3 className="text-xl font-medium text-[#4A96D1] mb-3">Hidroterapia</h3>
                      <p>
                        A hidroterapia auxilia na estimulação sensorial, diminuição do estresse, liberação de energia e relaxamento, além de melhorar a coordenação motora, tônus muscular, controle de tronco, equilíbrio e habilidades motoras. As estimulações no meio aquático, por intermédio de suas propriedades físicas e térmicas, favorecem a realização de atividades e movimentos, e podem propiciar a facilitação na realização no ambiente terrestre.
                      </p>
                    </div>
                    
                    <div className="bg-[#F0F9FF] p-5 rounded-lg">
                      <h3 className="text-xl font-medium text-[#4A96D1] mb-3">Musicoterapia</h3>
                      <p>
                        A musicoterapia utiliza a interação musical como meio de expressão e comunicação, auxiliando no desenvolvimento de relacionamentos e no enfrentamento de questões emocionais, além de atuar na cognição, memória, concentração e movimentos corporais. Atua positivamente no progresso do contato visual, da concentração, sobre lidar com as mudanças, a comunicação verbal e atenção conjunta.
                      </p>
                    </div>
                    
                    <div className="bg-[#F0F9FF] p-5 rounded-lg">
                      <h3 className="text-xl font-medium text-[#4A96D1] mb-3">Equoterapia</h3>
                      <p>
                        A equoterapia reúne um grupo de habilidades reeducativas que atuam para superar danos sensoriais, comportamentais e motores, utilizando o cavalo como principal ferramenta terapêutica. O cavalo proporciona movimentos tridimensionais e multidirecionais, gerando estímulos corporais capazes de promover a ativação e modulação nervosa.
                      </p>
                    </div>
                  </div>
                  
                  <div className="border border-[#6EC1E4] rounded-lg p-5 mb-6">
                    <h3 className="text-xl font-medium text-[#4A96D1] mb-3">Benefícios da Equoterapia</h3>
                    <p className="mb-3">A equoterapia pode proporcionar diversos benefícios:</p>
                    <ul className="list-disc pl-6">
                      <li className="mb-2">
                        <strong>Físicos:</strong> Estimulação corpórea, equilíbrio, postura e coordenação motora.
                      </li>
                      <li className="mb-2">
                        <strong>Psicológicos:</strong> Diminuição da agressividade e agitação, aumento da autoconfiança.
                      </li>
                      <li className="mb-2">
                        <strong>Sociais:</strong> Socialização e formação de vínculos, os equinos atuam como facilitadores sociais.
                      </li>
                      <li>
                        <strong>Cognitivos:</strong> Desenvolvimento do raciocínio, linguagem, atenção e orientação espaço-temporal.
                      </li>
                    </ul>
                  </div>
                  
                  <p>
                    É essencial elaborar um programa de alongamento e fortalecimento, além de planejar estratégias de controle motor com a participação dos pais. A fisioterapia deve atuar por meio de atividades motoras brutas que ativam os sistemas vestibulares e somatossensoriais, visando melhorar a capacidade de integrar informações sensoriais, levando a criança a adotar comportamentos mais organizados e adaptativos.
                  </p>
                </section>

                <section id="integração-multidisciplinar" className="mb-10">
                  <h2 className="text-2xl font-bold text-[#333333] mb-4">Integração Multidisciplinar</h2>
                  <p className="mb-4">
                    O tratamento deve ser individualizado, com sessões estruturadas e um trabalho intensivo e extensivo a todas as dimensões da pessoa, com a participação ativa dos pais. A intervenção precoce do fisioterapeuta afeta positivamente o desenvolvimento, a qualidade de vida e a integração social de pessoas com TEA.
                  </p>
                  
                  <div className="bg-[#F0F9FF] p-5 rounded-lg mb-6">
                    <h3 className="text-xl font-medium text-[#4A96D1] mb-3">Abordagem Multidisciplinar</h3>
                    <p className="mb-3">O trabalho multidisciplinar é fundamental e pode envolver:</p>
                    <ul className="list-disc pl-6">
                      <li className="mb-2">Psicólogos</li>
                      <li className="mb-2">Fonoaudiólogos</li>
                      <li className="mb-2">Terapeutas ocupacionais</li>
                      <li className="mb-2">Fisioterapeutas</li>
                      <li className="mb-2">Neurologistas</li>
                      <li className="mb-2">Psiquiatras</li>
                      <li className="mb-2">Pedagogos</li>
                      <li>Educadores físicos</li>
                    </ul>
                  </div>
                  
                  <p className="mb-4">
                    A soma das técnicas de fisioterapia e psicomotricidade permite uma melhor integração das funções motoras e mentais, melhorando a integridade física, cognitiva e emocional da pessoa. A psicomotricidade fortalece a interiorização da criança ao se movimentar em torno de si mesma e facilita a relação com o mundo, melhorando o padrão motor, a marcha e o equilíbrio.
                  </p>
                  
                  <p className="mb-4">
                    A presença da família é imprescindível na inclusão social da criança, em união com os profissionais envolvidos. Os tratamentos realizados por um fisioterapeuta previnem diversas doenças crônicas, já que crianças com TEA são mais susceptíveis a adquirirem, além de promover melhora na forma de caminhar e interagir e correção postural.
                  </p>
                  
                  <p>
                    Em conclusão, a intervenção fisioterapêutica precoce é essencial para que crianças com autismo alcancem maiores benefícios em seu desenvolvimento, proporcionando uma melhora na forma de interagirem socialmente e de sua qualidade de vida como um todo. A fisioterapia contribui no processo do desenvolvimento de crianças autistas, atuando na intervenção precoce do TEA, principalmente na estimulação sensorial e motora, permitindo ao indivíduo melhores respostas adaptativas ao seu ambiente.
                  </p>
                </section>
                
                <p className="mb-6">
                  Portanto, a fisioterapia possui influência positiva no acompanhamento e tratamento da criança com autismo, ressaltando a importância de discutir trabalhos referentes ao tema abordado.
                </p>
                
                <section className="pt-8 border-t border-gray-200">
                  <div className="flex items-start mb-4">
                    <div className="mr-3 text-[#6EC1E4]">
                      <BookOpen className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-[#333333] mb-2">Referências Bibliográficas</h3>
                      <ul className="text-gray-600 space-y-2">
                        <li>AMERICAN PSYCHIATRIC ASSOCIATION. Manual Diagnóstico e Estatístico de Transtornos Mentais - DSM-5. Porto Alegre: Artmed, 2014.</li>
                        <li>BAIO, J. et al. Prevalence of Autism Spectrum Disorder Among Children Aged 8 Years. MMWR Surveillance Summaries, v. 67, n. 6, p. 1-23, 2018.</li>
                        <li>CASE-SMITH, J.; ARBESMAN, M. Evidence-based review of interventions for autism used in or of relevance to occupational therapy. American Journal of Occupational Therapy, v. 62, n. 4, p. 416-429, 2008.</li>
                        <li>FERREIRA, I. M.; ALMEIDA, L. A. C. O papel da fisioterapia em pacientes com Transtorno do Espectro Autista: uma revisão de literatura. Revista Interdisciplinar Pensamento Científico, v. 6, n. 5, p. 85-101, 2020.</li>
                        <li>TEIXEIRA-MACHADO, L. Dançaterapia no autismo: um estudo de caso. Fisioterapia e Pesquisa, v. 22, n. 2, p. 205-211, 2015.</li>
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