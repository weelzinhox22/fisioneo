"use client"

import { ArrowLeft, BookOpen, Share2, Bookmark, ChevronDown, ChevronUp, Info, ArrowUp, Heart, Clock, Calendar } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import DraggableAIButton from "@/app/components/DraggableAIButton"
import BackToTop from "@/app/components/ui/back-to-top"
import ReadingProgress from "@/app/components/ui/reading-progress"

export default function CuidadosPaliativosPage() {
  const [bookmarked, setBookmarked] = useState(false)
  const [showMobileTableOfContents, setShowMobileTableOfContents] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  // Dados da página
  const topic = {
    id: "cuidados-paliativos",
    title: "Atuação da Fisioterapia nos Cuidados Paliativos da Criança com Câncer",
    description: "Abordagem fisioterapêutica para crianças com câncer em cuidados paliativos, incluindo avaliação, objetivos, técnicas e humanização do atendimento.",
    content: "<h3>Introdução aos Cuidados Paliativos Pediátricos</h3><p>Conceitos fundamentais sobre o câncer infantil e a abordagem paliativa.</p><h3>Bioética e Ortotanásia</h3><p>Aspectos éticos no cuidado de crianças em fase terminal.</p><h3>A Criança com Câncer</h3><p>Panorama geral do câncer infantil e suas implicações.</p><h3>Cuidados Paliativos: Uma Abordagem Humanizada</h3><p>Princípios e filosofia dos cuidados paliativos pediátricos.</p><h3>Atuação Fisioterapêutica</h3><p>Avaliação e objetivos da fisioterapia em cuidados paliativos.</p><h3>Condutas Fisioterapêuticas Específicas</h3><p>Intervenções para diferentes sintomas e complicações.</p>",
    icon: <Heart className="h-12 w-12 text-[#6EC1E4]" />
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
                Este conteúdo educativo aborda a atuação da fisioterapia nos cuidados paliativos da criança com câncer, 
                focando na abordagem multidisciplinar, técnicas terapêuticas e humanização do atendimento para melhorar 
                a qualidade de vida desses pacientes.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm ml-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Informações do material</h3>
              <div className="text-sm text-gray-600">
                <div className="flex items-center mb-1">
                  <Clock className="h-4 w-4 mr-1 text-[#6EC1E4]" />
                  Tempo de leitura: 18 minutos
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1 text-[#6EC1E4]" />
                  Última atualização: <span className="ml-1 bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded">Abril 2025</span>
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
                  Bom dia! Vamos iniciar nossa aula sobre a atuação da fisioterapia nos cuidados paliativos de crianças com câncer, explorando o conteúdo do artigo que você me forneceu.
                </p>

                <section id="introdução-aos-cuidados-paliativos-pediátricos" className="mb-10">
                  <h2 className="text-2xl font-bold text-[#333333] mb-4">Introdução aos Cuidados Paliativos Pediátricos e o Papel da Fisioterapia</h2>
                  <p className="mb-4">
                    Primeiramente, é fundamental entendermos que a faixa etária pediátrica se divide em três períodos principais: pós-natal/neonatal (do nascimento até 28 dias de vida), infância (de 29 dias até 10 anos) e adolescência (dos 10 aos 18 ou 20 anos). O câncer (CA) se configura como um grupo de doenças caracterizadas pela proliferação celular anormal. Infelizmente, o câncer é uma das principais causas de morte por doença em crianças de 1 a 14 anos.
                  </p>
                  
                  <p className="mb-4">
                    O câncer, nos dias de hoje, é um problema de saúde pública global. Estima-se que seja responsável por uma parcela significativa de todas as mortes no mundo. Os tipos mais comuns de câncer em crianças incluem leucemia, tumores do Sistema Nervoso Central (SNC), linfomas, neuroblastomas, tumor de Wilms, câncer ósseo, rabdomiossarcoma e retinoblastoma.
                  </p>
                  
                  <div className="bg-[#F0F9FF] p-5 rounded-lg mb-6">
                    <h3 className="text-xl font-medium text-[#4A96D1] mb-3">Tipos de Câncer Infantil Mais Comuns</h3>
                    <ul className="list-disc pl-6">
                      <li className="mb-2">Leucemias (cânceres do sangue)</li>
                      <li className="mb-2">Tumores do Sistema Nervoso Central (SNC)</li>
                      <li className="mb-2">Linfomas (cânceres do sistema linfático)</li>
                      <li className="mb-2">Neuroblastomas (tumor de células nervosas)</li>
                      <li className="mb-2">Tumor de Wilms (tumor renal)</li>
                      <li className="mb-2">Tumores ósseos (osteossarcoma e sarcoma de Ewing)</li>
                      <li className="mb-2">Rabdomiossarcoma (tumor de tecido muscular)</li>
                      <li>Retinoblastoma (tumor ocular)</li>
                    </ul>
                  </div>
                  
                  <p className="mb-4">
                    O impacto do câncer em pacientes e suas famílias é enorme, sendo crucial compreender essas dimensões para definir as estratégias de cuidado mais adequadas. Em muitos casos, o suporte de terapia intensiva pediátrica é indispensável para ajudar as crianças a superarem a fase aguda da doença. No entanto, devido ao diagnóstico tardio, o tratamento muitas vezes se concentra em cuidados paliativos, quando a cura não é mais possível.
                  </p>
                  
                  <div className="border-l-4 border-[#6EC1E4] pl-4 py-2 mb-6">
                    <p className="text-gray-700">
                      A Organização Mundial da Saúde (OMS) define cuidados paliativos como o cuidado ativo e integral de pacientes cuja doença não responde mais ao tratamento curativo. O foco principal é o controle da dor e dos sintomas físicos, psicológicos, sociais e espirituais, visando melhorar a qualidade de vida dos pacientes terminais e de seus familiares.
                    </p>
                  </div>
                </section>

                <section id="bioética-e-ortotanásia" className="mb-10">
                  <h2 className="text-2xl font-bold text-[#333333] mb-4">Bioética e Ortotanásia</h2>
                  <p className="mb-4">
                    Dentro do contexto dos cuidados paliativos, a bioética assume um papel de grande importância, abordando temas como eutanásia, distanásia e ortotanásia. A ortotanásia, em particular, busca proporcionar ao paciente as condições necessárias para compreender sua mortalidade e prepará-lo para uma morte digna, sem intervenção no processo natural.
                  </p>
                  
                  <div className="bg-[#F0F9FF] p-5 rounded-lg mb-6">
                    <h3 className="text-xl font-medium text-[#4A96D1] mb-3">Conceitos Fundamentais em Bioética</h3>
                    <ul className="list-disc pl-6">
                      <li className="mb-3">
                        <strong>Eutanásia:</strong> Prática pela qual se abrevia a vida de um enfermo incurável de maneira deliberada.
                      </li>
                      <li className="mb-3">
                        <strong>Distanásia:</strong> Prolongamento artificial do processo de morte, sem perspectiva de cura ou melhora.
                      </li>
                      <li>
                        <strong>Ortotanásia:</strong> Permite que a morte ocorra no tempo certo, sem abreviação ou prolongamento artificial, com foco no alívio da dor e sofrimento.
                      </li>
                    </ul>
                  </div>
                  
                  <p className="mb-4">
                    A equipe de cuidados paliativos deve ser multiprofissional, e o fisioterapeuta é um membro essencial dessa equipe. No entanto, a formação em fisioterapia muitas vezes aborda superficialmente as necessidades dos pacientes terminais e o tema da morte. Portanto, é crucial investir em pesquisas e trabalhos científicos para aprofundar o conhecimento dos profissionais que atuam nessa área, otimizando e humanizando o atendimento.
                  </p>
                  
                  <p className="mb-4">
                    O objetivo central da fisioterapia nos cuidados paliativos de crianças com câncer em estágio terminal é investigar as disfunções decorrentes da doença ou dos efeitos colaterais do tratamento. Além disso, busca diferenciar os cuidados paliativos de outras formas de cuidado e analisar os objetivos e condutas da fisioterapia nessas situações.
                  </p>
                </section>

                <section id="a-criança-com-câncer" className="mb-10">
                  <h2 className="text-2xl font-bold text-[#333333] mb-4">A Criança com Câncer: Panorama Geral</h2>
                  <p className="mb-4">
                    O Instituto Nacional do Câncer (INCA) estimou um número significativo de novos casos de câncer no Brasil em um determinado ano, com uma variação de 1% a 4,6% desses casos ocorrendo na população infantil. As causas do câncer infantil ainda são amplamente desconhecidas, mas fatores genéticos e ambientais podem aumentar o risco. A exposição à radiação ionizante e a agentes químicos e quimioterápicos são exemplos de fatores ambientais a serem considerados.
                  </p>
                  
                  <p className="mb-4">
                    Alguns tipos de câncer infantil, como o retinoblastoma, podem ter formas hereditárias e não hereditárias. Doenças hereditárias ou genéticas, como a Síndrome de Down, também podem predispor a criança ao câncer.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-[#F0F9FF] p-5 rounded-lg">
                      <h3 className="text-xl font-medium text-[#4A96D1] mb-3">Sinais e Sintomas Comuns</h3>
                      <ul className="list-disc pl-6">
                        <li className="mb-1">Febre persistente</li>
                        <li className="mb-1">Dor não justificada</li>
                        <li className="mb-1">Edemas</li>
                        <li className="mb-1">Equimoses (manchas roxas)</li>
                        <li className="mb-1">Palidez</li>
                        <li className="mb-1">Cefaleias (dores de cabeça)</li>
                        <li className="mb-1">Alterações neurológicas</li>
                        <li>Distúrbios visuais</li>
                      </ul>
                    </div>
                    
                    <div className="bg-[#F0F9FF] p-5 rounded-lg">
                      <h3 className="text-xl font-medium text-[#4A96D1] mb-3">Tratamentos</h3>
                      <ul className="list-disc pl-6">
                        <li className="mb-1">Cirurgia</li>
                        <li className="mb-1">Quimioterapia</li>
                        <li className="mb-1">Radioterapia</li>
                        <li className="mb-1">Imunoterapia</li>
                        <li className="mb-1">Terapia genética</li>
                        <li>Transplante de medula óssea</li>
                      </ul>
                    </div>
                  </div>
                  
                  <p className="mb-4">
                    No entanto, como os sintomas comuns do câncer infantil são frequentemente observados em outras doenças comuns na infância, o diagnóstico correto pode ser atrasado. Uma parcela considerável dos pacientes em estágio avançado apresenta dor, que pode ser aguda ou crônica, com diferentes características e causas. A dor muitas vezes está relacionada aos procedimentos diagnósticos e ao tratamento do câncer.
                  </p>
                  
                  <p className="mb-4">
                    A doença e o tratamento podem levar a complicações como feridas neoplásicas, alopecia, náuseas, vômitos, mielossupressão, sequelas musculoesqueléticas e neurotoxidade. A compreensão do impacto do câncer no indivíduo é essencial para que o fisioterapeuta possa definir as melhores estratégias de cuidado.
                  </p>
                </section>

                <section id="cuidados-paliativos:-uma-abordagem-humanizada" className="mb-10">
                  <h2 className="text-2xl font-bold text-[#333333] mb-4">Cuidados Paliativos: Uma Abordagem Humanizada</h2>
                  <p className="mb-4">
                    O termo "paliativo" tem origem no latim "pallium", que significa "manta" ou "coberta". A ideia é fornecer um "manto" para aquecer aqueles que não podem mais ser curados pela medicina. Em inglês, "palliare" significa aliviar, mitigar ou suavizar, e "care" significa cuidado.
                  </p>
                  
                  <p className="mb-4">
                    Os cuidados paliativos visam promover a humanização no fim da vida, proporcionando uma morte com dignidade e seguindo os princípios éticos de respeito à vida humana. Embora existam serviços de cuidados paliativos em diversos países, ainda há uma carência de estrutura pública ou privada adequada à demanda existente, tanto quantitativa quanto qualitativamente.
                  </p>
                  
                  <div className="bg-[#F0F9FF] p-5 rounded-lg mb-6">
                    <h3 className="text-xl font-medium text-[#4A96D1] mb-3">Filosofia dos Cuidados Paliativos</h3>
                    <ul className="list-disc pl-6">
                      <li className="mb-2">Afirmar a morte como um processo natural da vida</li>
                      <li className="mb-2">Não apressar nem adiar a morte</li>
                      <li className="mb-2">Aliviar a dor e outros sintomas angustiantes</li>
                      <li className="mb-2">Integrar os aspectos psicológicos, sociais e espirituais no cuidado do paciente</li>
                      <li>Disponibilizar um sistema de apoio para o paciente e seus familiares</li>
                    </ul>
                  </div>
                  
                  <p className="mb-4">
                    Cinco princípios éticos fundamentam os cuidados paliativos: veracidade, proporcionalidade terapêutica, duplo efeito, prevenção e não abandono.
                  </p>
                  
                  <p className="mb-4">
                    Os pacientes terminais podem passar por cinco estágios do processo de morrer: negação, raiva, barganha, depressão e aceitação. Compreender esse processo é crucial para ajudá-los a aceitar sua condição com menos sofrimento.
                  </p>
                  
                  <div className="border-l-4 border-[#6EC1E4] pl-4 py-2 mb-6">
                    <p className="text-gray-700">
                      As três principais possibilidades de intervenção para pacientes terminais são eutanásia, distanásia e ortotanásia. A ortotanásia é considerada a abordagem correta, pois não acelera nem retarda o processo de morrer, proporcionando qualidade de vida e alívio do sofrimento.
                    </p>
                  </div>
                </section>

                <section id="atuação-fisioterapêutica" className="mb-10">
                  <h2 className="text-2xl font-bold text-[#333333] mb-4">Atuação Fisioterapêutica Detalhada</h2>
                  <p className="mb-4">
                    Para uma intervenção eficaz, o fisioterapeuta deve realizar uma avaliação completa para identificar as disfunções apresentadas pela criança e aquelas que podem surgir. É importante priorizar os elementos da avaliação de acordo com a tolerância de cada paciente.
                  </p>
                  
                  <div className="bg-[#F0F9FF] p-5 rounded-lg mb-6">
                    <h3 className="text-xl font-medium text-[#4A96D1] mb-3">Componentes da Avaliação Fisioterapêutica</h3>
                    <ul className="list-disc pl-6">
                      <li className="mb-2">História do paciente/pais</li>
                      <li className="mb-2">Observação clínica</li>
                      <li className="mb-2">Avaliação da amplitude de movimento</li>
                      <li className="mb-2">Força muscular (com cuidado em pacientes plaquetopênicos)</li>
                      <li className="mb-2">Avaliação postural</li>
                      <li className="mb-2">Avaliação da dor</li>
                      <li className="mb-2">Tônus muscular e sistemas sensoriais</li>
                      <li className="mb-2">Estado respiratório e resistência cardiovascular</li>
                      <li>Avaliação funcional (transferência, marcha, mobilidade)</li>
                    </ul>
                  </div>
                  
                  <p className="mb-4">
                    O objetivo da fisioterapia nos cuidados paliativos é aumentar ou manter o conforto e a independência, reduzindo o tempo de hospitalização e aumentando o tempo com familiares e amigos. Esses objetivos devem ser comunicados à equipe de cuidados paliativos, ao paciente e seus familiares. A fisioterapia também desempenha um papel preventivo, antecipando possíveis complicações e implementando medidas preventivas.
                  </p>
                </section>

                <section id="condutas-fisioterapêuticas-específicas" className="mb-10">
                  <h2 className="text-2xl font-bold text-[#333333] mb-4">Condutas Fisioterapêuticas Específicas</h2>
                  <p className="mb-6">
                    As condutas fisioterapêuticas variam de acordo com as disfunções apresentadas pela criança:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-[#F0F9FF] p-5 rounded-lg">
                      <h3 className="text-xl font-medium text-[#4A96D1] mb-3">Manejo da Dor</h3>
                      <ul className="list-disc pl-6">
                        <li className="mb-1">Eletroterapia</li>
                        <li className="mb-1">Terapia manual</li>
                        <li className="mb-1">Cinesioterapia</li>
                        <li className="mb-1">Crioterapia</li>
                        <li>Termoterapia</li>
                      </ul>
                    </div>
                    
                    <div className="bg-[#F0F9FF] p-5 rounded-lg">
                      <h3 className="text-xl font-medium text-[#4A96D1] mb-3">Alívio do Estresse</h3>
                      <ul className="list-disc pl-6">
                        <li className="mb-1">Terapia manual</li>
                        <li className="mb-1">Hidroterapia (Watsu)</li>
                        <li className="mb-1">Consciência corporal</li>
                        <li>Técnicas de relaxamento</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-[#F0F9FF] p-5 rounded-lg">
                      <h3 className="text-xl font-medium text-[#4A96D1] mb-3">Manejo da Síndrome de Desuso</h3>
                      <ul className="list-disc pl-6">
                        <li className="mb-1">Alongamentos</li>
                        <li className="mb-1">Atividade física adaptada</li>
                        <li className="mb-1">Exercícios ativos com peso leve a moderado</li>
                        <li>Atividades funcionais</li>
                      </ul>
                    </div>
                    
                    <div className="bg-[#F0F9FF] p-5 rounded-lg">
                      <h3 className="text-xl font-medium text-[#4A96D1] mb-3">Intervenções Respiratórias</h3>
                      <ul className="list-disc pl-6">
                        <li className="mb-1">Mudanças de decúbito</li>
                        <li className="mb-1">Manobras de reexpansão pulmonar</li>
                        <li className="mb-1">Incentivadores de fluxo</li>
                        <li className="mb-1">Exercícios respiratórios</li>
                        <li>Manobras de higiene brônquica</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-[#F0F9FF] p-5 rounded-lg mb-6">
                    <h3 className="text-xl font-medium text-[#4A96D1] mb-3">Terapia para Alívio da Dor</h3>
                    <p className="mb-3">
                      O tratamento da dor deve ser multidisciplinar, considerando os fatores neurofisiológicos, emocionais e comportamentais que influenciam a percepção da dor. As intervenções incluem medidas farmacológicas, físicas e cognitivo-comportamentais. Os principais recursos fisioterapêuticos analgésicos são eletroterapia, termoterapia, massoterapia e exercícios.
                    </p>
                  </div>
                  
                  <div className="bg-[#F0F9FF] p-5 rounded-lg mb-6">
                    <h3 className="text-xl font-medium text-[#4A96D1] mb-3">Atividades Lúdicas</h3>
                    <p className="mb-3">
                      As atividades lúdicas são importantes no tratamento de crianças com câncer, proporcionando um ambiente menos traumatizante e mais humanizado. Materiais e equipamentos como bolas, rolos, bancos e esteiras podem ser utilizados.
                    </p>
                    <p>
                      Os recursos lúdicos incluem brincadeiras, jogos, livros e brinquedos. A música também pode ser utilizada para promover conforto e qualidade de vida.
                    </p>
                  </div>
                  
                  <p className="mb-4">
                    A fadiga é um sintoma comum em pacientes oncológicos terminais e compromete a qualidade de vida. O controle da fadiga visa manter a capacidade funcional do paciente e minimizar as perdas.
                  </p>
                  
                  <p className="mb-4">
                    Pacientes em estágio terminal também podem desenvolver úlceras de decúbito, que devem ser prevenidas com mudanças de decúbito.
                  </p>
                  
                  <p>
                    A fisioterapia desempenha um papel crucial nos cuidados paliativos de crianças com câncer, melhorando a qualidade de vida, aliviando sintomas e auxiliando na independência funcional. É fundamental que o fisioterapeuta associe recursos lúdicos ao tratamento para proporcionar um ambiente menos traumatizante e aumentar a adesão ao tratamento.
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
                        <li>ORGANIZAÇÃO MUNDIAL DA SAÚDE. WHO Definition of Palliative Care. Genebra: OMS, 2020.</li>
                        <li>INSTITUTO NACIONAL DO CÂNCER (INCA). Estimativa de Incidência e Mortalidade por Câncer no Brasil. Rio de Janeiro: INCA, 2020.</li>
                        <li>AMERICAN CANCER SOCIETY. Cancer Facts and Figures. Atlanta: American Cancer Society, 2021.</li>
                        <li>MARCUCCI, F. C. I. O papel da fisioterapia nos cuidados paliativos a pacientes com câncer. Revista Brasileira de Cancerologia, v. 51, n. 1, p. 67-77, 2005.</li>
                        <li>PESSINI, L. Distanásia: até quando investir sem agredir? Revista Bioética, v. 4, n. 1, p. 31-43, 1996.</li>
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