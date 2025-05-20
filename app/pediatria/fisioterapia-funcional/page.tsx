"use client"

import { ArrowLeft, BookOpen, Share2, Bookmark, ChevronDown, ChevronUp, Info, ArrowUp, Activity, Clock, Calendar } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import DraggableAIButton from "@/app/components/DraggableAIButton"
import BackToTop from "@/app/components/ui/back-to-top"
import ReadingProgress from "@/app/components/ui/reading-progress"

export default function FisioterapiaFuncionalPage() {
  const [bookmarked, setBookmarked] = useState(false)
  const [showMobileTableOfContents, setShowMobileTableOfContents] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  // Dados da página
  const topic = {
    id: "fisioterapia-funcional",
    title: "Efeito de um programa de fisioterapia funcional em crianças com paralisia cerebral associado a orientações aos cuidadores",
    description: "Análise de um estudo sobre os efeitos de um programa de fisioterapia funcional combinado com orientações para pais e cuidadores de crianças com paralisia cerebral.",
    content: "<h3>Introdução e Conceitos</h3><p>Definição de paralisia cerebral e abordagens terapêuticas.</p><h3>Importância da Orientação aos Cuidadores</h3><p>O papel dos pais e cuidadores no tratamento.</p><h3>Objetivos e Hipótese do Estudo</h3><p>Propósito e expectativas da pesquisa.</p><h3>Metodologia do Estudo</h3><p>Procedimentos e participantes.</p><h3>Procedimentos de Avaliação</h3><p>Instrumentos e métodos utilizados.</p><h3>Resultados e Discussão</h3><p>Achados e interpretações.</p><h3>Conclusão</h3><p>Implicações e limitações.</p>",
    icon: <Activity className="h-12 w-12 text-[#9A86F2]" />
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
          className="h-full bg-gradient-to-r from-[#9A86F2] to-[#B9A9FF] transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
      
      <BackToTop />
      <DraggableAIButton />
      
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <Link
            href="/pediatria"
            className="inline-flex items-center text-[#666666] hover:text-[#9A86F2] transition-colors"
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
              <Share2 className="h-5 w-5 text-[#9A86F2]" />
            </button>
            
            <button 
              className="p-2 rounded-full hover:bg-[#F0F9FF] transition-colors"
              onClick={() => setBookmarked(!bookmarked)}
            >
              <Bookmark 
                className={`h-5 w-5 ${bookmarked ? 'fill-[#9A86F2] text-[#9A86F2]' : 'text-[#9A86F2]'}`} 
              />
            </button>
          </div>
        </div>

        {/* ThemeInfoCard simplificado */}
        <div className="bg-blue-50 rounded-lg p-6 mb-8">
          <div className="flex items-start">
            <div className="mr-2 text-[#9A86F2]">
              <Info className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-medium text-gray-900 mb-2">Sobre este tema</h2>
              <p className="text-gray-600">
                Este material apresenta os resultados de um estudo sobre a eficácia de um programa de fisioterapia funcional 
                para crianças com paralisia cerebral, combinado com orientações específicas aos pais e cuidadores.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm ml-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Informações do material</h3>
              <div className="text-sm text-gray-600">
                <div className="flex items-center mb-1">
                  <Clock className="h-4 w-4 mr-1 text-[#9A86F2]" />
                  Tempo de leitura: 20 minutos
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1 text-[#9A86F2]" />
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
                <span className="font-medium text-[#9A86F2]">Índice do conteúdo</span>
                {showMobileTableOfContents ? (
                  <ChevronUp className="h-5 w-5 text-[#9A86F2]" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-[#9A86F2]" />
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
                            className="block p-2 hover:bg-[#F0F9FF] rounded-lg transition-colors text-[#9A86F2]"
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
                      className="block py-2 px-3 hover:bg-[#F0F9FF] rounded-lg transition-colors text-[#9A86F2]"
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
                  Bom dia! Sejam bem-vindos à nossa aula sobre fisioterapia funcional em crianças com paralisia cerebral, 
                  com foco em um estudo que investigou os efeitos de um programa de fisioterapia funcional associado a 
                  orientações para pais e cuidadores.
                </p>

                <section id="introdução-e-conceitos" className="mb-10">
                  <h2 className="text-2xl font-bold text-[#333333] mb-4">Introdução ao tema e ao estudo</h2>
                  <p className="mb-4">
                    A paralisia cerebral (PC) é definida como um grupo de desordens do desenvolvimento do movimento e da postura, 
                    resultantes de uma lesão não progressiva no encéfalo em desenvolvimento. Essas desordens motoras levam a 
                    limitações nas atividades de vida diária (AVD) e podem ser acompanhadas de distúrbios sensoriais, perceptivos, 
                    cognitivos, de comunicação e comportamento, além de epilepsia e problemas musculoesqueléticos secundários.
                  </p>
                  
                  <div className="bg-[#F0F9FF] p-5 rounded-lg mb-6">
                    <h3 className="text-xl font-medium text-[#9A86F2] mb-3">Classificação da Paralisia Cerebral</h3>
                    <p className="mb-4">
                      A classificação da PC pode ser feita de diversas maneiras, incluindo:
                    </p>
                    <ul className="list-disc pl-6 mb-4">
                      <li className="mb-2">
                        <strong>Distribuição topográfica:</strong> hemiplegia, diplegia e quadriplegia
                      </li>
                      <li className="mb-2">
                        <strong>Nível de funcionalidade:</strong> Sistema de Classificação da Função Motora Ampla (GMFCS)
                      </li>
                      <li className="mb-2">
                        <strong>Tônus muscular:</strong> espástica, discinética, atáxica e mista, sendo a forma espástica a mais comum
                      </li>
                    </ul>
                    <p>
                      O GMFCS possui cinco níveis, que variam de crianças com bom desempenho motor e poucas limitações (nível I) 
                      a crianças com múltiplas desordens e limitações severas no controle voluntário dos movimentos (nível V).
                    </p>
                  </div>
                  
                  <p className="mb-4">
                    A espasticidade pode levar a diversas alterações, como a redução da força muscular e da velocidade do movimento, 
                    além de modificações adaptativas no comprimento muscular e na amplitude do movimento ativo. Esses distúrbios 
                    podem comprometer a aquisição de marcos motores e o desempenho nas AVD. É importante lembrar que o desempenho 
                    funcional não depende apenas das características intrínsecas da criança, mas também da demanda da tarefa, do 
                    ambiente e da dinâmica familiar.
                  </p>
                  
                  <p className="mb-4">
                    A capacidade funcional de um indivíduo é determinada pela sua habilidade em cumprir as demandas da tarefa através 
                    da interação com o ambiente. Portanto, estratégias terapêuticas que auxiliam o paciente a aprender ou reaprender 
                    a executar tarefas funcionais são essenciais para a independência funcional. A intervenção deve minimizar as 
                    dificuldades apresentadas e promover a experiência e a prática dos movimentos a serem incorporados no repertório 
                    motor da criança. Tanto pais quanto profissionais devem estimular o desenvolvimento da capacidade funcional 
                    dessas crianças.
                  </p>
                  
                  <div className="border-l-4 border-[#9A86F2] pl-4 py-2 mb-6">
                    <p className="text-gray-700 italic">
                      A fisioterapia funcional é uma abordagem terapêutica que prioriza o aprendizado de habilidades motoras que sejam 
                      significativas no ambiente da criança, nas quais ela deseje se engajar e que sejam percebidas como problemáticas 
                      pela criança, pais ou cuidadores.
                    </p>
                  </div>
                  
                  <p className="mb-4">
                    A intervenção realça as habilidades da criança no contexto da vida diária, relacionando a limitação motora com a 
                    atividade funcional. A avaliação funcional é essencial para estabelecer um tratamento eficaz, permitindo que os 
                    terapeutas identifiquem o nível funcional atual da criança e documentem as mudanças ao longo do tempo.
                  </p>
                </section>

                <section id="importância-da-orientação-aos-cuidadores" className="mb-10">
                  <h2 className="text-2xl font-bold text-[#333333] mb-4">A importância da orientação aos pais e cuidadores</h2>
                  <div className="bg-purple-50 border border-[#9A86F2] rounded-lg p-6 mb-6">
                    <p className="mb-0">
                      Estudos demonstram a importância de orientar pais e cuidadores de crianças com PC, incentivando-os a 
                      estimular as crianças em diferentes habilidades e a promover sua independência funcional. A participação 
                      dos pais na terapia da criança otimiza o programa de fisioterapia e traz benefícios aos pais, integrando-os 
                      nas atividades funcionais do dia a dia da criança e reduzindo o estresse e a ansiedade.
                    </p>
                  </div>
                </section>

                <section id="objetivos-e-hipótese-do-estudo" className="mb-10">
                  <h2 className="text-2xl font-bold text-[#333333] mb-4">Objetivos e hipótese do estudo</h2>
                  <p className="mb-4">
                    O estudo que estamos analisando teve como objetivo verificar o efeito de um programa de fisioterapia 
                    funcional associado a orientações aos pais e/ou cuidadores nas habilidades funcionais de crianças com 
                    paralisia cerebral, além de verificar a possível correlação entre as habilidades funcionais e a assistência 
                    do cuidador, utilizando o Inventário de Avaliação Pediátrica de Incapacidade (PEDI).
                  </p>
                  
                  <div className="bg-[#F0F9FF] p-5 rounded-lg mb-6">
                    <h3 className="text-xl font-medium text-[#9A86F2] mb-3">Hipótese do Estudo</h3>
                    <p>
                      A hipótese do estudo é que a fisioterapia funcional associada às orientações aos pais e/ou cuidadores 
                      favorecerá positivamente o desempenho funcional da criança com PC. O estudo pretende contribuir para o 
                      embasamento clínico de fisioterapeutas ao estabelecer seus objetivos a médio e longo prazo no desenvolvimento 
                      e aperfeiçoamento do repertório funcional da criança com PC, destacando a importância da participação ativa 
                      dos pais e/ou cuidadores na prática diária dessas crianças.
                    </p>
                  </div>
                </section>

                <section id="metodologia-do-estudo" className="mb-10">
                  <h2 className="text-2xl font-bold text-[#333333] mb-4">Metodologia do estudo</h2>
                  <p className="mb-4">
                    O estudo foi aprovado pelo Comitê de Ética em Pesquisa da Universidade Federal de São Carlos. 
                    Participaram quatro crianças com diagnóstico médico de PC, classificadas como hemiplégicas, 
                    espásticas e nível I no GMFCS, com idade entre 24 e 43 meses. 
                  </p>
                  
                  <div className="bg-[#F0F9FF] p-5 rounded-lg mb-6">
                    <h3 className="text-xl font-medium text-[#9A86F2] mb-3">Critérios de Inclusão e Exclusão</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-2">Critérios de Inclusão:</h4>
                        <ul className="list-disc pl-6">
                          <li>Diagnóstico de PC hemiplégica espástica</li>
                          <li>Nível I no GMFCS</li>
                          <li>Idade entre 24 e 43 meses</li>
                          <li>Em tratamento fisioterapêutico há pelo menos 12 meses</li>
                          <li>Compreensão adequada de comandos</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-2">Critérios de Exclusão:</h4>
                        <ul className="list-disc pl-6">
                          <li>Alterações genéticas associadas</li>
                          <li>Distúrbios comportamentais</li>
                          <li>Deficiência auditiva e/ou visual</li>
                          <li>Malformações no SNC</li>
                          <li>Procedimentos cirúrgicos recentes</li>
                          <li>Aplicação de toxina botulínica nos últimos 6 meses</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>

                <section id="procedimentos-de-avaliação" className="mb-10">
                  <h2 className="text-2xl font-bold text-[#333333] mb-4">Procedimentos de avaliação e intervenção</h2>
                  <p className="mb-4">
                    As crianças foram avaliadas por meio do PEDI, um questionário que avalia o desempenho funcional 
                    de crianças entre 6 meses e 7 anos e meio em atividades relevantes da vida diária. O PEDI é 
                    aplicado em entrevista estruturada com os pais ou responsáveis pela criança, que informam sobre 
                    seu desempenho funcional em atividades da rotina diária.
                  </p>
                  
                  <div className="bg-[#F0F9FF] p-5 rounded-lg mb-6">
                    <h3 className="text-xl font-medium text-[#9A86F2] mb-3">Estrutura do PEDI</h3>
                    <p className="mb-4">
                      O instrumento é dividido em três partes:
                    </p>
                    <ul className="list-disc pl-6 mb-4">
                      <li className="mb-2">
                        <strong>Habilidades funcionais</strong>
                      </li>
                      <li className="mb-2">
                        <strong>Assistência do Cuidador</strong>
                      </li>
                      <li className="mb-2">
                        <strong>Modificação do ambiente</strong>
                      </li>
                    </ul>
                    <p className="mb-4">
                      Estas partes informam sobre as três áreas do desempenho funcional:
                    </p>
                    <ul className="list-disc pl-6">
                      <li className="mb-2">
                        <strong>Autocuidado</strong>
                      </li>
                      <li className="mb-2">
                        <strong>Mobilidade</strong>
                      </li>
                      <li className="mb-2">
                        <strong>Função social</strong>
                      </li>
                    </ul>
                  </div>
                  
                  <p className="mb-4">
                    Neste estudo, foram utilizadas as áreas de autocuidado e mobilidade das partes I e II do instrumento, 
                    utilizando o valor do escore bruto. Quanto maior o escore, melhor o desempenho nas habilidades 
                    funcionais e maior a independência da criança em relação ao cuidador nas AVD. Foram realizadas 
                    quatro avaliações: a primeira antes do início da intervenção fisioterapêutica, a segunda após 30 dias, 
                    a terceira após 60 dias e a quarta após 90 dias da primeira avaliação.
                  </p>
                  
                  <div className="border border-[#9A86F2] rounded-lg p-5 mb-6">
                    <h3 className="text-xl font-medium text-[#9A86F2] mb-3">Protocolo de Intervenção</h3>
                    <p className="mb-4">
                      As crianças foram submetidas à fisioterapia funcional três vezes por semana, com uma hora de duração, 
                      durante três meses:
                    </p>
                    <ul className="list-disc pl-6">
                      <li className="mb-2">
                        <strong>Duas vezes por semana:</strong> Fisioterapia com base no conceito neuroevolutivo Bobath
                      </li>
                      <li className="mb-2">
                        <strong>Uma vez por semana:</strong> Treino das AVD e orientações por escrito aos pais/cuidadores quanto 
                        à assistência prestada à criança
                      </li>
                    </ul>
                    <p>
                      Reuniões com os pais e/ou cuidadores foram realizadas para esclarecer dúvidas e dificuldades 
                      nas orientações dadas.
                    </p>
                  </div>
                  
                  <p className="mb-4">
                    Devido ao pequeno número de participantes, foram utilizadas medidas não paramétricas para a análise 
                    dos dados. Para verificar o efeito do programa fisioterapêutico e das orientações, foram utilizadas 
                    a primeira e a quarta avaliações em cada parte do PEDI, utilizando o teste de Wilcoxon pareado. As 
                    médias dos escores brutos das quatro crianças nas áreas de autocuidado e mobilidade nas partes I e II 
                    foram usadas para calcular o coeficiente de correlação entre ambas, utilizando a correlação de Spearman.
                  </p>
                </section>

                <section id="resultados-e-discussão" className="mb-10">
                  <h2 className="text-2xl font-bold text-[#333333] mb-4">Resultados e Discussão</h2>
                  
                  <div className="bg-[#F0F9FF] p-5 rounded-lg mb-6">
                    <h3 className="text-xl font-medium text-[#9A86F2] mb-3">Principais Resultados</h3>
                    <p className="mb-4">
                      Os resultados do estudo mostraram que, na última avaliação, as crianças obtiveram escores significativamente 
                      maiores que na primeira, indicando uma melhora no desempenho funcional após o programa de intervenção.
                    </p>
                    <p>
                      Além disso, foi constatada uma correlação altamente significativa entre as habilidades funcionais da 
                      criança e a assistência do cuidador, mostrando que, quanto maior o nível de habilidades funcionais da 
                      criança, maior é sua independência em relação ao cuidador nas AVD.
                    </p>
                  </div>
                  
                  <p className="mb-4">
                    Os resultados obtidos neste estudo indicam que o programa de fisioterapia funcional associado às orientações 
                    aos pais e/ou cuidadores favoreceu o desempenho das habilidades funcionais e o aumento do nível de independência 
                    das crianças com PC em relação ao cuidador.
                  </p>
                  
                  <p className="mb-4">
                    A fisioterapia funcional enfatizou técnicas de mobilização articular e ativação de grupos musculares durante o 
                    treino das AVD da criança. O treino baseado nas dificuldades da criança contempla sua capacidade de aprender a 
                    resolver problemas inerentes à tarefa funcional, mais do que praticar repetitivamente padrões de movimentos normais.
                  </p>
                  
                  <div className="border-l-4 border-[#9A86F2] pl-4 py-2 mb-6">
                    <p className="text-gray-700 italic">
                      Acredita-se que esse modelo de fisioterapia proporcionou a aquisição de novas habilidades funcionais e o aumento 
                      das estratégias motoras por meio da prática e da experiência, proporcionando mudanças na capacidade de movimentação. 
                      Isso ocorreu pela melhora do desempenho motor global e pelo desenvolvimento de ações funcionais de movimentos ativos 
                      que requerem que a criança atenda ao objetivo da tarefa e aperfeiçoe suas habilidades.
                    </p>
                  </div>
                  
                  <p className="mb-4">
                    O estudo também destaca o papel dos pais e/ou cuidadores como agentes cooperadores para as modificações do comportamento 
                    motor no desenvolvimento de crianças com incapacidades motoras. As orientações apropriadas, a adesão e a participação 
                    ativa dos pais no programa geraram resultados satisfatórios no desempenho das habilidades funcionais das crianças. 
                    As melhorias obtidas nas habilidades dessas crianças foram devidas ao fato de o programa ser focado nas limitações das 
                    AVD consideradas problemáticas pelos pais e/ou cuidadores, e por contar com a participação ativa destes nas atividades.
                  </p>
                  
                  <p className="mb-4">
                    Um aspecto relevante do estudo foi evidenciar a relação entre habilidades funcionais e assistência do cuidador, 
                    indicando que, quanto maior o nível de habilidades funcionais da criança, maior é a sua independência em relação 
                    ao cuidador nas AVD. A intervenção terapêutica, o treinamento específico e as orientações aos pais e/ou cuidadores 
                    são fatores determinantes, pois encorajam a criança a realizar atividades que melhoram seu desempenho.
                  </p>
                </section>

                <section id="conclusão" className="mb-10">
                  <h2 className="text-2xl font-bold text-[#333333] mb-4">Conclusão</h2>
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                    <div className="flex">
                      <div className="ml-3">
                        <p className="text-yellow-700">
                          Apesar de não apresentar grupo controle, os resultados deste estudo indicaram claramente que o programa 
                          de fisioterapia funcional associado às orientações aos pais e/ou cuidadores foi efetivo em melhorar o 
                          desempenho funcional de crianças nível I com hemiplegia espástica. Com a melhora no desempenho nas 
                          habilidades funcionais, as crianças demonstraram maior independência em relação ao cuidador nas AVD.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <p className="mb-4">
                    É importante ressaltar que o estudo apresenta algumas limitações, como o reduzido número de casos, a não inclusão 
                    de um grupo controle e a não verificação dos efeitos em longo prazo. Portanto, são necessários mais estudos nessa 
                    área para confirmar os resultados e avaliar a eficácia da intervenção em diferentes contextos e populações.
                  </p>
                  
                  <p>
                    Espero que esta aula tenha sido esclarecedora e que vocês possam aplicar esses conhecimentos na prática clínica.
                  </p>
                </section>
                
                <section className="pt-8 border-t border-gray-200">
                  <div className="flex items-start mb-4">
                    <div className="mr-3 text-[#9A86F2]">
                      <BookOpen className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-[#333333] mb-2">Referências Bibliográficas</h3>
                      <ul className="text-gray-600 space-y-2">
                        <li>ROSENBAUM, P. et al. A report: the definition and classification of cerebral palsy. Developmental Medicine & Child Neurology, v. 49, n. 8, p. 8-14, 2007.</li>
                        <li>MANCINI, M. C. et al. Gravidade da paralisia cerebral e desempenho funcional. Revista Brasileira de Fisioterapia, v. 8, n. 3, p. 253-260, 2004.</li>
                        <li>SOCIEDADE BRASILEIRA DE PEDIATRIA. Manual de Orientação: Seguimento da criança com paralisia cerebral. Rio de Janeiro: SBP, 2019.</li>
                        <li>RIBEIRO, J.; MORAES, M. V.; BELTRAME, T. S. Tipo de atividade e relação com o desenvolvimento motor de crianças em idade pré-escolar. Revista Educação Física UEM, v. 23, n. 4, p. 611-620, 2012.</li>
                        <li>MANCINI, M. C. et al. Comparação do desempenho funcional de crianças com paralisia cerebral diparéticas e hemiparéticas. Revista de Fisioterapia da Universidade de São Paulo, v. 9, n. 2, p. 56-71, 2002.</li>
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