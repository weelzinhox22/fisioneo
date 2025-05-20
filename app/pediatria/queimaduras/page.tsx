"use client"

import { ArrowLeft, BookOpen, Share2, Bookmark, ChevronDown, ChevronUp, Info, ArrowUp, Activity, Clock, Calendar } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import DraggableAIButton from "@/app/components/DraggableAIButton"
import BackToTop from "@/app/components/ui/back-to-top"
import ReadingProgress from "@/app/components/ui/reading-progress"

export default function QueimadurasPediatricasPage() {
  const [bookmarked, setBookmarked] = useState(false)
  const [showMobileTableOfContents, setShowMobileTableOfContents] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  // Dados da página
  const topic = {
    id: "queimaduras",
    title: "Atuação da Fisioterapia em Pacientes Pediátricos Vítimas de Queimaduras",
    description: "Tratamento fisioterapêutico em crianças com queimaduras, incluindo classificação das lesões, fisiopatologia, avaliação e métodos de intervenção.",
    content: "<h3>Classificação e Quantificação das Queimaduras</h3><p>Características e classificação das queimaduras de acordo com a profundidade e extensão.</p><h3>A Magnitude do Problema</h3><p>Dados epidemiológicos sobre queimaduras em crianças no Brasil.</p><h3>Fisiopatologia e Complicações</h3><p>Alterações funcionais e complicações sistêmicas pós-queimadura.</p><h3>Atuação da Fisioterapia</h3><p>Papel do fisioterapeuta na reabilitação e prevenção de sequelas.</p><h3>Intervenções e Resultados</h3><p>Evidências científicas sobre as principais intervenções fisioterapêuticas.</p>",
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
                Este conteúdo educativo aborda a atuação da fisioterapia em pacientes pediátricos vítimas de queimaduras, 
                um problema de saúde pública significativo, sendo a quarta causa de morte em crianças. São apresentadas 
                as classificações, fisiopatologia, abordagens terapêuticas e evidências científicas recentes.
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
                  Bom dia! Hoje, vamos abordar um tema de grande relevância dentro da fisioterapia pediátrica: a atuação da fisioterapia em pacientes pediátricos vítimas de queimaduras. Este é um problema de saúde pública significativo, sendo a quarta causa de morte em crianças. As queimaduras, como sabemos, são lesões cutâneas causadas pela ação direta ou indireta do calor.
                </p>

                <section id="classificação-e-quantificação-das-queimaduras" className="mb-10">
                  <h2 className="text-2xl font-bold text-[#333333] mb-4">Classificação e Quantificação das Queimaduras</h2>
                  <p className="mb-4">
                    As queimaduras são classificadas de acordo com a profundidade do dano tecidual:
                  </p>
                  
                  <div className="bg-[#F0F9FF] p-5 rounded-lg mb-6">
                    <h3 className="text-xl font-medium text-[#4A96D1] mb-3">Classificação por Profundidade</h3>
                    <ul className="list-disc pl-6">
                      <li className="mb-2"><strong>Primeiro grau:</strong> Atinge apenas a epiderme, apresentando eritema (vermelhidão) e dor.</li>
                      <li className="mb-2"><strong>Segundo grau:</strong> Atinge a epiderme e parte da derme, provocando a formação de flictenas (bolhas).</li>
                      <li><strong>Terceiro grau:</strong> Envolve todas as estruturas da pele, apresentando-se esbranquiçada ou negra, pouco dolorosa e seca.</li>
                    </ul>
                  </div>
                  
                  <p className="mb-4">
                    Para quantificar a superfície corporal queimada, utilizamos duas formas principais:
                  </p>
                  
                  <div className="bg-[#F0F9FF] p-5 rounded-lg mb-6">
                    <h3 className="text-xl font-medium text-[#4A96D1] mb-3">Métodos de Quantificação</h3>
                    <ol className="list-decimal pl-6">
                      <li className="mb-3">
                        <strong>Regra dos nove:</strong> Divide a superfície corporal em múltiplos de nove. Em adultos, cabeça, pescoço e membros superiores valem 9% cada um, tórax anterior e posterior e cada membro inferior equivalem a 18%, e a região do períneo 1%. Em crianças de até um ano, a cabeça equivale a 21% e cada membro inferior representa 12% da área queimada.
                      </li>
                      <li>
                        <strong>Esquema de Lound Browder:</strong> Avalia a superfície corporal de acordo com a idade, sendo um exame mais preciso.
                      </li>
                    </ol>
                  </div>
                  
                  <p className="mb-4">
                    Quanto à complexidade, o paciente queimado pode ser classificado em pequeno, médio e grande queimado. Essa classificação é importante para determinar o nível de cuidado e intervenção necessários.
                  </p>
                </section>

                <section id="a-magnitude-do-problema" className="mb-10">
                  <h2 className="text-2xl font-bold text-[#333333] mb-4">A Magnitude do Problema</h2>
                  <p className="mb-4">
                    No Brasil, ocorrem cerca de 1.000.000 de casos de queimaduras por ano, com 100.000 pacientes buscando atendimento hospitalar, dos quais dois terços são crianças e adolescentes. As queimaduras são a quarta causa de morte em crianças. Apesar da diminuição da morbidade e mortalidade nos últimos anos, a epidemiologia das queimaduras permanece basicamente a mesma, com um pico de incidência em crianças de 1 a 5 anos, principalmente por escaldamento com líquidos quentes.
                  </p>
                  
                  <div className="border-l-4 border-[#6EC1E4] pl-4 py-2 mb-6">
                    <p className="text-gray-700">
                      As queimaduras representam um importante problema de saúde pública, sendo responsáveis por alta morbimortalidade, especialmente na população pediátrica.
                    </p>
                  </div>
                </section>

                <section id="fisiopatologia-e-complicações" className="mb-10">
                  <h2 className="text-2xl font-bold text-[#333333] mb-4">Fisiopatologia e Complicações</h2>
                  <p className="mb-4">
                    Nos primeiros sete dias após a queimadura, o organismo pode sofrer alterações funcionais em múltiplos órgãos vitais, conhecida como Disfunção de Múltiplos Órgãos e Sistemas (DMOS) primária. Após esse período, ocorre uma resposta inflamatória sistêmica, que pode levar a infecções, conhecida como DMOS secundária. Lesões por inalação podem causar complicações pulmonares graves, como pneumonia, edema pulmonar e obstrução de vias aéreas superiores.
                  </p>
                  
                  <div className="bg-[#F0F9FF] p-5 rounded-lg mb-6">
                    <h3 className="text-xl font-medium text-[#4A96D1] mb-3">Complicações Comuns</h3>
                    <ul className="list-disc pl-6">
                      <li className="mb-2">Disfunção de Múltiplos Órgãos e Sistemas (DMOS)</li>
                      <li className="mb-2">Infecções secundárias</li>
                      <li className="mb-2">Complicações pulmonares por lesões de inalação</li>
                      <li className="mb-2">Desnutrição e catabolismo proteico</li>
                      <li>Cicatrizes hipertróficas e retrações</li>
                    </ul>
                  </div>
                </section>

                <section id="atuação-da-fisioterapia" className="mb-10">
                  <h2 className="text-2xl font-bold text-[#333333] mb-4">Atuação da Fisioterapia</h2>
                  <p className="mb-6">
                    A intervenção fisioterapêutica é de extrema importância para diminuir as sequelas, melhorar a qualidade de vida e promover a integração do indivíduo na sociedade. O tratamento do paciente queimado envolve uma equipe multiprofissional, com a fisioterapia atuando de forma complementar às cirurgias, principalmente as enxertias. As ações do fisioterapeuta são amplas, desde a internação até o acompanhamento ambulatorial, visando uma cicatrização correta e evitando complicações futuras.
                  </p>
                  
                  <p className="mb-4">
                    Durante a hospitalização, o paciente começa a perceber a extensão do problema e a pensar nas possíveis sequelas, que podem comprometer a estrutura e função do corpo, limitando suas atividades de vida diária. A fisioterapia representa um componente importante na reabilitação, redução das sequelas, retorno da funcionalidade, melhora da qualidade de vida e reinserção social desses pacientes.
                  </p>
                  
                  <div className="bg-[#F0F9FF] p-5 rounded-lg mb-6">
                    <h3 className="text-xl font-medium text-[#4A96D1] mb-3">Revisão Sistemática da Literatura</h3>
                    <p className="mb-3">
                      Uma revisão sistemática da literatura nas bases de dados BIREME, PEDro e PubMed revelou a atuação da fisioterapia em pacientes pediátricos vítimas de queimaduras. Os critérios de inclusão foram estudos sobre avaliação, diagnóstico, tratamento e/ou prognóstico fisioterapêutico em crianças com queimaduras, publicados em português, espanhol ou inglês, com textos completos disponíveis online e datados entre 2000 e 2013.
                    </p>
                    <p>
                      A busca resultou em sete artigos que foram analisados. Os estudos selecionados foram publicados entre 2001 e 2011, utilizando amostras de crianças vítimas de queimaduras.
                    </p>
                  </div>
                </section>

                <section id="intervenções-e-resultados" className="mb-10">
                  <h2 className="text-2xl font-bold text-[#333333] mb-4">Intervenções e Resultados</h2>
                  <p className="mb-6">
                    Alguns estudos se destacaram:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-[#F0F9FF] p-5 rounded-lg">
                      <h3 className="text-xl font-medium text-[#4A96D1] mb-3">Exercícios de Resistência</h3>
                      <p>
                        Um programa de reabilitação de doze semanas com exercícios de resistência apresentou melhora significativa na força muscular, potência e massa magra em crianças vítimas de queimaduras.
                      </p>
                    </div>
                    
                    <div className="bg-[#F0F9FF] p-5 rounded-lg">
                      <h3 className="text-xl font-medium text-[#4A96D1] mb-3">Cinesioterapia</h3>
                      <p>
                        A cinesioterapia, associada ou não a mecanismos de analgesia, mostrou-se eficaz no tratamento de crianças vítimas de queimaduras.
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-[#F0F9FF] p-5 rounded-lg">
                      <h3 className="text-xl font-medium text-[#4A96D1] mb-3">Realidade Virtual</h3>
                      <p>
                        A realidade virtual imersiva mostrou-se uma técnica adjuvante eficaz na redução da dor em crianças durante a fisioterapia.
                      </p>
                    </div>
                    
                    <div className="bg-[#F0F9FF] p-5 rounded-lg">
                      <h3 className="text-xl font-medium text-[#4A96D1] mb-3">Humanização do Atendimento</h3>
                      <p>
                        A humanização do atendimento à criança queimada e a atenção às suas necessidades são cruciais para o sucesso do tratamento.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-[#F0F9FF] p-5 rounded-lg mb-6">
                    <h3 className="text-xl font-medium text-[#4A96D1] mb-3">Discussão Detalhada dos Estudos</h3>
                    <ul className="list-disc pl-6">
                      <li className="mb-3">
                        <strong>Fabiana et al.:</strong> Analisou os comportamentos de crianças vítimas de queimaduras durante procedimentos de curativo sem sedação. Observou-se que procedimentos médicos invasivos necessitam de intervenções que visem à diminuição do sofrimento comportamental da criança.
                      </li>
                      <li className="mb-3">
                        <strong>Yuko et al.:</strong> Verificaram a eficácia da realidade virtual tridimensional como recurso analgésico durante sessões de fisioterapia. A realidade virtual demonstrou ser um complemento útil para analgesia farmacológica, ajudando a controlar a dor aguda.
                      </li>
                      <li className="mb-3">
                        <strong>Samuel et al.:</strong> Mostraram a necessidade de melhorias simples no tratamento imediato de queimaduras, como fisioterapia e tratamento de feridas, para prevenir sequelas a longo prazo.
                      </li>
                      <li className="mb-3">
                        <strong>Oludiran e Umebese:</strong> Encontraram influência positiva da fisioterapia em crianças internadas por queimaduras, destacando a importância da reabilitação para uma boa recuperação do tecido lesado.
                      </li>
                      <li className="mb-3">
                        <strong>Oscar et al.:</strong> Concluíram que a participação em um programa de exercícios de resistência resulta em melhora significativa na força muscular, potência e massa magra. A administração do hormônio de crescimento recombinante humana (rhGH) e exercícios podem aumentar a massa corporal magra e força muscular em crianças queimadas.
                      </li>
                      <li>
                        <strong>Rene et al.:</strong> Concluíram que o hormônio oxandrolona em combinação com o exercício físico foi benéfico para a reabilitação de crianças com queimaduras graves.
                      </li>
                    </ul>
                  </div>
                  
                  <p className="mb-4">
                    A revisão sistemática evidenciou que os artigos não descrevem detalhadamente os protocolos de reabilitação utilizados no tratamento de crianças vítimas de queimaduras. A atuação da fisioterapia nesses casos ainda não está bem descrita na literatura, sendo necessário o incentivo a maiores averiguações e publicações sobre o assunto. A produção e prática de protocolos de tratamento para pacientes pediátricos vítimas de queimaduras devem ser publicadas no meio científico para servir como guia de reabilitação.
                  </p>
                  
                  <p>
                    Espero que esta aula detalhada tenha sido esclarecedora e útil para a sua prática profissional.
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
                        <li>BRASILEIRO, J. L. et al. Pé diabético: aspectos clínicos. Jornal Vascular Brasileiro, v. 4, n. 1, p. 11-21, 2005.</li>
                        <li>SILVA, R. M. et al. Atuação da fisioterapia em pacientes pediátricos vítimas de queimaduras: uma revisão sistemática. Revista Brasileira de Queimaduras, v. 12, n. 2, p. 95-104, 2013.</li>
                        <li>VALE, E. C. S. Primeiro atendimento em queimaduras: a abordagem do dermatologista. Anais Brasileiros de Dermatologia, v. 80, n. 1, p. 9-19, 2005.</li>
                        <li>LIMA, R. S. B. Fisiopatologia e métodos de reabilitação em pacientes pediátricos queimados: revisão de literatura. Revista Brasileira de Queimaduras, v. 16, n. 3, p. 199-203, 2017.</li>
                        <li>OLIVEIRA, D. S. et al. Tratamento fisioterapêutico em queimados: revisão de literatura. Revista da Faculdade de Ciências Médicas de Sorocaba, v. 17, n. 3, p. 118-122, 2015.</li>
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