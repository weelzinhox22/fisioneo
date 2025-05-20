"use client"

import { ArrowLeft, BookOpen, Share2, Bookmark, ChevronDown, ChevronUp, Info, ArrowUp, UserRound, Clock, Calendar } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import DraggableAIButton from "@/app/components/DraggableAIButton"
import BackToTop from "@/app/components/ui/back-to-top"
import ReadingProgress from "@/app/components/ui/reading-progress"

export default function ParalisiaBraquialPage() {
  const [bookmarked, setBookmarked] = useState(false)
  const [showMobileTableOfContents, setShowMobileTableOfContents] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  // Dados da página
  const topic = {
    id: "paralisia-braquial",
    title: "Paralisia Braquial Obstétrica",
    description: "Abordagens fisioterapêuticas para paralisia braquial obstétrica, incluindo definição, classificação, avaliação e métodos de tratamento.",
    content: "<h3>Definição e Conceitos Básicos</h3><p>O que é a Paralisia Braquial Obstétrica e como ocorre.</p><h3>Classificação e Tipos de Lesão</h3><p>Tipos de lesão no plexo braquial e classificação de Narakas.</p><h3>Fatores de Risco e Incidência</h3><p>Condições associadas e prevalência da condição.</p><h3>Avaliação Fisioterapêutica</h3><p>Métodos e escalas para avaliação da PBO.</p><h3>Abordagens de Tratamento</h3><p>Fisioterapia convencional e métodos alternativos.</p><h3>Prognóstico e Desafios</h3><p>Perspectivas de recuperação e desafios do tratamento.</p>",
    icon: <UserRound className="h-12 w-12 text-[#6EC1E4]" />
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
                Este conteúdo educativo aborda as abordagens fisioterapêuticas para Paralisia Braquial Obstétrica (PBO), 
                incluindo definição, avaliação, tratamento e prognóstico, visando proporcionar uma 
                compreensão completa dessa condição neurológica com enfoque na reabilitação.
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
                  Bom dia! Vamos iniciar nossa aula sobre abordagens fisioterapêuticas para paralisia braquial obstétrica, utilizando como base esta revisão integrativa da literatura.
                </p>

                <section id="definição-e-conceitos-básicos" className="mb-10">
                  <h2 className="text-2xl font-bold text-[#333333] mb-4">Definição e Conceitos Básicos</h2>
                  <p className="mb-4">
                    Primeiramente, é fundamental entendermos o que é a Paralisia Braquial Obstétrica (PBO), também conhecida como Paralisia Braquial Perinatal (PBP). Trata-se de uma paralisia flácida que pode ser parcial ou total, afetando o membro superior do recém-nascido devido a uma lesão no plexo braquial. Essa lesão, geralmente uma distensão ou ruptura, ocorre durante as manobras do parto vaginal, especialmente em casos de distocia de ombro (DO). Embora mais rara, também pode acontecer em partos cesarianos. As raízes nervosas mais comumente afetadas são as cervicais C5 a C8 e a torácica T1.
                  </p>
                  
                  <p className="mb-4">
                    A distocia de ombro, como mencionado, é uma complicação importante associada à PBO. Ela ocorre quando, após a saída da cabeça do bebê, os ombros não conseguem se desprender, ou quando há um intervalo maior que 60 segundos entre a saída da cabeça e dos ombros. A DO pode levar a lacerações do canal de parto, atonia uterina com hemorragia, disjunção da sínfise púbica e, em casos mais raros, rotura uterina na mãe.
                  </p>
                  
                  <div className="bg-[#F0F9FF] p-5 rounded-lg mb-6">
                    <h3 className="text-xl font-medium text-[#4A96D1] mb-3">Anatomia do Plexo Braquial</h3>
                    <p className="mb-3">O plexo braquial é formado pelos ramos anteriores das raízes nervosas de:</p>
                    <ul className="list-disc pl-6">
                      <li className="mb-2">C5 (quinta raiz cervical)</li>
                      <li className="mb-2">C6 (sexta raiz cervical)</li>
                      <li className="mb-2">C7 (sétima raiz cervical)</li>
                      <li className="mb-2">C8 (oitava raiz cervical)</li>
                      <li>T1 (primeira raiz torácica)</li>
                    </ul>
                  </div>
                </section>

                <section id="classificação-e-tipos-de-lesão" className="mb-10">
                  <h2 className="text-2xl font-bold text-[#333333] mb-4">Classificação e Tipos de Lesão</h2>
                  <p className="mb-6">
                    A lesão do plexo braquial pode afetar diferentes partes e apresentar diferentes manifestações clínicas:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-[#F0F9FF] p-5 rounded-lg">
                      <h3 className="text-xl font-medium text-[#4A96D1] mb-3">Paralisia de Erb-Duchenne</h3>
                      <p>
                        Lesão do tronco superior do plexo, envolvendo C5 e C6. O membro apresenta a postura típica de "gorjeta do garçom": o braço aduzido e rodado internamente, o cotovelo estendido e o pulso flexionado. A sensibilidade à dor geralmente é preservada. É o tipo mais comum de PBO e geralmente apresenta o melhor prognóstico.
                      </p>
                    </div>
                    
                    <div className="bg-[#F0F9FF] p-5 rounded-lg">
                      <h3 className="text-xl font-medium text-[#4A96D1] mb-3">Lesão C5-C7</h3>
                      <p>
                        Afeta tanto o tronco superior quanto o médio. Além das dificuldades motoras da paralisia de Erb-Duchenne, observa-se também comprometimento da extensão do cotovelo e do punho. A flexão dos dedos pode estar presente, mas geralmente é mais fraca do que no lado não afetado. Os reflexos tendinosos estão ausentes no membro afetado e pode haver perda de sensibilidade à dor no polegar ou dedo médio.
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-[#F0F9FF] p-5 rounded-lg">
                      <h3 className="text-xl font-medium text-[#4A96D1] mb-3">Paralisia de Klumpke</h3>
                      <p>
                        Lesões isoladas do tronco inferior, são extremamente raras. Observa-se uma postura tardia de flexão do cotovelo, extensão do punho e supinação, resultando na chamada "mão de mendigo".
                      </p>
                    </div>
                    
                    <div className="bg-[#F0F9FF] p-5 rounded-lg">
                      <h3 className="text-xl font-medium text-[#4A96D1] mb-3">Lesão Completa do Plexo</h3>
                      <p>
                        Quando a lesão atinge todo o plexo braquial (C5-T1), o paciente pode apresentar apenas movimentos menores dos dedos, com sensibilidade anormal e possível envolvimento ocular simpático, caracterizando a síndrome de Claude-Bernard-Horner.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-[#F0F9FF] p-5 rounded-lg mb-6">
                    <h3 className="text-xl font-medium text-[#4A96D1] mb-3">Classificação de Narakas</h3>
                    <p className="mb-3">Relaciona o tipo de lesão com a história natural da PBO:</p>
                    <ul className="list-disc pl-6">
                      <li className="mb-2"><strong>Tipo I:</strong> Lesão das raízes de C5-C6.</li>
                      <li className="mb-2"><strong>Tipo II:</strong> Lesão das raízes de C5-C6-C7 (paralisia de Erb).</li>
                      <li className="mb-2"><strong>Tipo III:</strong> Lesão completa de todo o plexo braquial, sem Síndrome de Horner.</li>
                      <li><strong>Tipo IV:</strong> Lesão completa de todo o plexo braquial com Síndrome de Horner associada.</li>
                    </ul>
                  </div>
                </section>

                <section id="fatores-de-risco-e-incidência" className="mb-10">
                  <h2 className="text-2xl font-bold text-[#333333] mb-4">Fatores de Risco e Incidência</h2>
                  <p className="mb-4">
                    É importante também estarmos cientes dos fatores de risco associados à PBO. O peso ao nascer superior a 4,5 kg é o fator mais importante, estando fortemente relacionado à distocia de ombro. Outros fatores incluem diabetes mellitus materno, baixa estatura materna e extração com fórceps.
                  </p>
                  
                  <div className="border-l-4 border-[#6EC1E4] pl-4 py-2 mb-6">
                    <p className="text-gray-700">
                      Fatores de risco adicionais incluem:
                    </p>
                  </div>
                  
                  <ul className="list-disc pl-6 mb-6">
                    <li className="mb-3">
                      Trabalho de parto prolongado
                    </li>
                    <li className="mb-3">
                      Multiparidade
                    </li>
                    <li className="mb-3">
                      Apresentação pélvica
                    </li>
                    <li className="mb-3">
                      Apresentação cefálica durante cesariana
                    </li>
                    <li className="mb-3">
                      Obesidade materna
                    </li>
                    <li className="mb-3">
                      Pós-datismo
                    </li>
                    <li className="mb-3">
                      Desproporção entre o feto e a pelve materna
                    </li>
                    <li>
                      Asfixia perinatal
                    </li>
                  </ul>
                  
                  <p className="mb-4">
                    A incidência de PBO varia, sendo de 0,5 a 3 por 1.000 nascidos vivos em países industrializados. Nos Estados Unidos, a incidência é de cerca de 1,5 por 1.000 nascimentos. A taxa de recuperação é de aproximadamente 84%, com dano permanente ocorrendo em 0,5 a 25% dos casos.
                  </p>
                </section>

                <section id="avaliação-fisioterapêutica" className="mb-10">
                  <h2 className="text-2xl font-bold text-[#333333] mb-4">Avaliação Fisioterapêutica</h2>
                  <p className="mb-6">
                    A avaliação fisioterapêutica é fundamental para classificar a PBO e orientar o tratamento. É importante avaliar as amplitudes de movimento (ADM), especialmente pronação e supinação, tanto do lado afetado quanto do lado não afetado.
                  </p>
                  
                  <div className="space-y-6 mb-6">
                    <div className="bg-[#F0F9FF] p-5 rounded-lg">
                      <h3 className="text-xl font-medium text-[#4A96D1] mb-3">Escala de Mallet</h3>
                      <p>
                        Amplamente utilizada para avaliar a PBO. Avalia a função global do membro superior afetado através de movimentos funcionais como levar a mão à nuca, levar a mão à boca, levar a mão às costas, entre outros.
                      </p>
                    </div>
                    
                    <div className="bg-[#F0F9FF] p-5 rounded-lg">
                      <h3 className="text-xl font-medium text-[#4A96D1] mb-3">Classificação Internacional de Funcionalidade (CIF)</h3>
                      <p>
                        Ferramenta útil para auxiliar na escolha das melhores abordagens de avaliação e tratamento, considerando não apenas os aspectos físicos mas também os funcionais e participativos.
                      </p>
                    </div>
                    
                    <div className="bg-[#F0F9FF] p-5 rounded-lg">
                      <h3 className="text-xl font-medium text-[#4A96D1] mb-3">Instrumentos de Avaliação Específicos</h3>
                      <p>
                        Outros aspectos importantes da avaliação incluem a coleta da história clínica, instrumentos de atividade e participação, Teste of Infant Motor Performance (TIMP), Alberta Infant Motor Scale (AIMS), Brachial Plexus Outcome Mesure (BPOM), Active Movement Scale e instrumentos que avaliam a qualidade de vida, como o Pediatric Outcome Data Collection Instrument e o Child Health Questionnaire.
                      </p>
                    </div>
                    
                    <div className="bg-[#F0F9FF] p-5 rounded-lg">
                      <h3 className="text-xl font-medium text-[#4A96D1] mb-3">Estudos de Condução Nervosa</h3>
                      <p>
                        Podem ser úteis para avaliação prognóstica, mas o comprometimento neurológico e a taxa de recuperação continuam sendo os melhores indicadores de prognóstico.
                      </p>
                    </div>
                  </div>
                </section>

                <section id="abordagens-de-tratamento" className="mb-10">
                  <h2 className="text-2xl font-bold text-[#333333] mb-4">Abordagens de Tratamento</h2>
                  <p className="mb-6">
                    O tratamento fisioterapêutico desempenha um papel crucial na reabilitação do paciente com PBO. O objetivo é promover a funcionalidade do membro afetado, prevenindo contraturas musculares, estimulando a sensibilidade e a motricidade, mantendo uma boa amplitude de movimento e prevenindo outros problemas futuros.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-[#F0F9FF] p-5 rounded-lg">
                      <h3 className="text-xl font-medium text-[#4A96D1] mb-3">Fisioterapia Convencional</h3>
                      <p>
                        A mais comum. Pode envolver mobilizações passivas para prevenir encurtamento e contraturas musculares, exercícios de força e mobilizações ativas, cinesiotaping e eletroestimulação. A intervenção precoce é essencial para otimizar a recuperação do movimento e da sensibilidade.
                      </p>
                    </div>
                    
                    <div className="bg-[#F0F9FF] p-5 rounded-lg">
                      <h3 className="text-xl font-medium text-[#4A96D1] mb-3">Terapia de Movimento Induzido por Restrição (TMIR)</h3>
                      <p>
                        Técnica que consiste na contenção do membro superior saudável para estimular o uso do membro afetado em atividades da vida diária. Um estudo de caso demonstrou a viabilidade da TMIR para encorajar o uso do braço afetado em crianças com PBO, com resultados indicando que a TMIR tem potencial para promover ganhos funcionais. A duração ideal pode variar, mas geralmente dura ao menos 2 semanas.
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-[#F0F9FF] p-5 rounded-lg">
                      <h3 className="text-xl font-medium text-[#4A96D1] mb-3">Terapia de Espelho</h3>
                      <p>
                        Incluindo a Terapia de Espelho Convencional (TE convencional) e a Terapia de Espelho de Realidade Virtual (TE de Realidade Virtual), que visam melhorar a funcionalidade do membro superior afetado e a qualidade de vida. Ambas as técnicas podem ser realizadas em casa. Estudos têm demonstrado que a TE de realidade virtual pode ser um complemento terapêutico domiciliar para aumentar as tarefas bimanuais independentes e melhorar a qualidade de vida em crianças com PBO superior na faixa etária de 6 a 12 anos.
                      </p>
                    </div>
                    
                    <div className="bg-[#F0F9FF] p-5 rounded-lg">
                      <h3 className="text-xl font-medium text-[#4A96D1] mb-3">Realidade Virtual</h3>
                      <p>
                        Tem se mostrado promissora no tratamento da PBO. Um estudo comparou a realidade virtual com a fisioterapia convencional e observou que as crianças que realizaram uma prática em um ambiente virtual apresentaram melhora distinta na função do ombro quando comparadas com as crianças do grupo de fisioterapia convencional. Outro estudo investigou a eficácia potencial de um programa de sensor de movimentos (Leap Motion Controller-based training – LMCBT), que utiliza videogames para reabilitação da extremidade superior, e demonstrou ser uma alternativa eficaz como opção de tratamento em pacientes com deficiência física.
                      </p>
                    </div>
                  </div>
                  
                  <div className="border border-[#6EC1E4] rounded-lg p-5 mb-6">
                    <h3 className="text-xl font-medium text-[#4A96D1] mb-3">Técnicas Complementares</h3>
                    <ul className="list-disc pl-6">
                      <li className="mb-2">
                        <strong>Estimulação Sensorial:</strong> Importante para a integração do membro afetado, utilizando estímulos táteis e proprioceptivos.
                      </li>
                      <li className="mb-2">
                        <strong>Botox:</strong> Pode ser utilizado para relaxamento muscular e alívio da dor, especialmente em casos de co-contração bíceps-tríceps.
                      </li>
                      <li className="mb-2">
                        <strong>Reabilitação do Equilíbrio:</strong> Crianças com lesão do plexo braquial relacionada ao nascimento podem apresentar déficits na coordenação corporal e equilíbrio, sugerindo que a reabilitação do equilíbrio pode ser um valioso tratamento adjunto.
                      </li>
                      <li>
                        <strong>Fisioterapia Pós-operatória:</strong> Em casos de tratamento cirúrgico, a fisioterapia pós-operatória também desempenha um papel fundamental na melhoria do ombro e funções do braço em crianças com PBO.
                      </li>
                    </ul>
                  </div>
                  
                  <p>
                    Quanto à frequência e efetividade dos exercícios físicos, um estudo não encontrou diferença significativa na taxa de recuperação entre um grupo que realizava exercícios intensos três vezes ao dia e outro grupo que realizava um programa de exercícios padrão uma vez ao dia. Ambos os protocolos se mostraram satisfatórios.
                  </p>
                </section>

                <section id="prognóstico-e-desafios" className="mb-10">
                  <h2 className="text-2xl font-bold text-[#333333] mb-4">Prognóstico e Desafios</h2>
                  <p className="mb-4">
                    Os dados sobre o prognóstico da PBO podem ser variáveis. Estudos indicam que a recuperação completa varia de 7% a 97% dos pacientes. Uma perspectiva mais equilibrada sugere que cerca de 50% dos pacientes se recuperam completamente, 15% apresentam deficiências severas e 35% têm um resultado satisfatório, mas com alguma limitação na função do ombro. A rotação externa é geralmente o principal problema nesses casos.
                  </p>
                  
                  <div className="bg-[#F0F9FF] p-5 rounded-lg mb-6">
                    <h3 className="text-xl font-medium text-[#4A96D1] mb-3">Fatores que Influenciam o Prognóstico</h3>
                    <ul className="list-disc pl-6">
                      <li className="mb-2">Gravidade da lesão inicial</li>
                      <li className="mb-2">Tempo decorrido até o início do tratamento</li>
                      <li className="mb-2">Resposta individual à intervenção</li>
                      <li className="mb-2">Presença de síndrome de Horner</li>
                      <li>Envolvimento de raízes nervosas inferiores</li>
                    </ul>
                  </div>
                  
                  <p className="mb-4">
                    A imobilização do membro não é geralmente recomendada, exceto em casos de fraturas ósseas associadas. A fisioterapia e a terapia ocupacional para as mãos são importantes, e o envolvimento dos pais no programa de reabilitação é essencial. É importante estimular o uso do membro afetado assim que a criança apresentar controle voluntário intencional, incentivando atividades bimanuais para evitar a apraxia do desenvolvimento.
                  </p>
                  
                  <p>
                    Em conclusão, a fisioterapia é essencial na reabilitação da PBO na infância. A fisioterapia convencional é fundamental para a recuperação adequada dos pacientes, e métodos alternativos, como a realidade virtual, podem ser eficazes como complemento. A intervenção fisioterapêutica precoce é crucial para prevenir complicações neurofuncionais, e o fisioterapeuta desempenha um papel fundamental na promoção do melhor desenvolvimento sensório-motor possível em crianças com PBO.
                  </p>
                </section>
                
                <p className="mb-6">
                  Espero que esta aula tenha sido esclarecedora! Se tiverem alguma dúvida, podem perguntar.
                </p>
                
                <section className="pt-8 border-t border-gray-200">
                  <div className="flex items-start mb-4">
                    <div className="mr-3 text-[#6EC1E4]">
                      <BookOpen className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-[#333333] mb-2">Referências Bibliográficas</h3>
                      <ul className="text-gray-600 space-y-2">
                        <li>DUNHAM, E. A. Obstetrical brachial plexus palsy. Orthopaedic Nursing, v. 22, n. 2, p. 106-116, 2003.</li>
                        <li>ABID, A. Brachial plexus birth palsy: Management during the first year of life. Orthopaedics & Traumatology: Surgery & Research, v. 102, n. 1, p. S125-S132, 2016.</li>
                        <li>SMITH, B. W.; DAUNTER, A. K.; YANG, L. J-S.; WILSON, T. J. An update on the management of neonatal brachial plexus palsy. Pediatric Neurology, v. 88, p. 19-27, 2018.</li>
                        <li>VAQUERO, G. et al. Actualización del tratamiento rehabilitador de la parálisis braquial obstétrica. Rehabilitación, v. 50, n. 1, p. 30-36, 2016.</li>
                        <li>SMITH, N. C.; ROWAN, P.; BENSON, L. J.; EZAKI, M.; CARTER, P. R. Neonatal brachial plexus palsy. Outcome of absent biceps function at three months of age. The Journal of Bone and Joint Surgery (American), v. 86, n. 10, p. 2163-2170, 2004.</li>
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