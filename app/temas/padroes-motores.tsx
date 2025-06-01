"use client"

import { ArrowLeft, BookOpen, Share2, Bookmark, ChevronDown, ChevronUp, Info, ArrowUp, Baby, Clock, Calendar } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import DraggableAIButton from "@/app/components/DraggableAIButton"
import BackToTop from "@/app/components/ui/back-to-top"
import ReadingProgress from "@/app/components/ui/reading-progress"

export default function PadroesMotoresPage() {
  const [bookmarked, setBookmarked] = useState(false)
  const [showMobileTableOfContents, setShowMobileTableOfContents] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState({ q1: '', q2: '' })
  const [quizResults, setQuizResults] = useState<null | { correct: boolean, message: string }[]>(null)

  // Dados da página
  const topic = {
    id: "padroes-motores",
    title: "Padrões Motores do Bebê: Da Posição Supina aos Primeiros Passos",
    description: "Compreenda as etapas cruciais do desenvolvimento motor grosso nos primeiros anos de vida.",
    category: "desenvolvimento",
    readingTime: 10, // minutos
    publishDate: "2025-05-30",
    lastUpdated: "2025-05-31",
  }

  // Seções para a tabela de conteúdo
  const tableOfContents = [
    { id: "introducao", title: "Introdução", level: 1 },
    { id: "decubito-dorsal", title: "Do Decúbito Dorsal à Rotação Corporal (0-6 meses)", level: 1 },
    { id: "decubito-ventral", title: "Exploração em Decúbito Ventral (4-9 meses)", level: 1 },
    { id: "engatinhar-sedestar", title: "Do Engatinhar ao Sedestar (6-10 meses)", level: 1 },
    { id: "ortostase-primeiros-passos", title: "Da Ortostase aos Primeiros Passos (8-15 meses)", level: 1 },
    { id: "marcha-independente", title: "Desenvolvimento da Marcha Independente (12-18 meses)", level: 1 },
    { id: "consideracoes", title: "Considerações Finais", level: 1 }
  ]

  // Scroll para seção específica
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      const yOffset = -80
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: "smooth" })
    }
    setShowMobileTableOfContents(false)
  }

  // Acompanhar progresso de leitura
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const fullHeight = document.body.scrollHeight - windowHeight
      const scrollPosition = window.scrollY
      
      if (fullHeight > 0) {
        setScrollProgress((scrollPosition / fullHeight) * 100)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Alternar bookmark
  const toggleBookmark = () => {
    setBookmarked(!bookmarked)
  }

  // Função para lidar com as respostas do quiz
  const handleQuizChange = (question: string, answer: string) => {
    setQuizAnswers(prev => ({ ...prev, [question]: answer }))
  }

  // Função para verificar as respostas do quiz
  const checkQuizAnswers = () => {
    const results = [
      {
        correct: quizAnswers.q1 === 'c',
        message: quizAnswers.q1 === 'c' 
          ? 'Correto! O engatinhar tipicamente se desenvolve entre 6-9 meses.' 
          : 'Incorreto. O engatinhar tipicamente se desenvolve entre 6-9 meses.'
      },
      {
        correct: quizAnswers.q2 === 'b',
        message: quizAnswers.q2 === 'b' 
          ? 'Correto! O princípio cefalocaudal explica o desenvolvimento no sentido da cabeça para os pés.' 
          : 'Incorreto. O princípio cefalocaudal explica o desenvolvimento no sentido da cabeça para os pés.'
      }
    ]
    setQuizResults(results)
  }

  return (
    <div className="min-h-screen bg-white">
      <ReadingProgress />
      <BackToTop />
      <DraggableAIButton />
      
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
        <div className="container mx-auto py-6 px-4">
          <div className="flex justify-between items-center mb-2">
            <Link href="/temas" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">Voltar para Temas</span>
            </Link>
            
            <div className="flex items-center space-x-3">
              <button 
                className="p-2 rounded-full hover:bg-blue-100 transition-colors"
                onClick={() => window.navigator.share?.({
                  title: topic.title,
                  text: topic.description,
                  url: window.location.href
                }).catch(() => {})}
              >
                <Share2 className="h-5 w-5 text-blue-600" />
              </button>
              
              <button 
                className="p-2 rounded-full hover:bg-blue-100 transition-colors"
                onClick={toggleBookmark}
              >
                <Bookmark 
                  className={`h-5 w-5 ${bookmarked ? 'fill-yellow-400 text-yellow-400' : 'text-blue-600'}`} 
                />
              </button>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{topic.title}</h1>
          
          <div className="flex flex-wrap items-center text-sm text-gray-600 gap-4">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{topic.readingTime} min de leitura</span>
            </div>
            
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>Atualizado em: {topic.lastUpdated}</span>
            </div>
            
            <div className="px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">
              {topic.category}
            </div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar com tabela de conteúdo (desktop) */}
          <div className="hidden md:block w-64 shrink-0">
            <div className="sticky top-24">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                <h3 className="font-medium text-gray-800 mb-3 flex items-center">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Tabela de Conteúdo
                </h3>
                
                <nav>
                  <ul className="space-y-2">
                    {tableOfContents.map((section) => (
                      <li key={section.id}>
                        <button
                          onClick={() => scrollToSection(section.id)}
                          className={`text-left w-full px-2 py-1 rounded text-sm hover:bg-blue-50 hover:text-blue-700 transition-colors
                            ${section.level === 1 ? 'font-medium' : 'pl-4 text-gray-600'}`}
                        >
                          {section.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
          
          {/* Tabela de conteúdo para mobile */}
          <div className="md:hidden mb-6">
            <button
              onClick={() => setShowMobileTableOfContents(!showMobileTableOfContents)}
              className="w-full flex items-center justify-between bg-gray-50 rounded-lg p-4 border border-gray-100"
            >
              <div className="flex items-center">
                <BookOpen className="h-4 w-4 mr-2" />
                <span className="font-medium text-gray-800">Tabela de Conteúdo</span>
              </div>
              {showMobileTableOfContents ? 
                <ChevronUp className="h-5 w-5 text-gray-600" /> : 
                <ChevronDown className="h-5 w-5 text-gray-600" />
              }
            </button>
            
            <AnimatePresence>
              {showMobileTableOfContents && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden bg-gray-50 rounded-b-lg border-x border-b border-gray-100"
                >
                  <nav className="p-4">
                    <ul className="space-y-3">
                      {tableOfContents.map((section) => (
                        <li key={section.id}>
                          <button
                            onClick={() => scrollToSection(section.id)}
                            className={`text-left w-full px-2 py-1 rounded text-sm hover:bg-blue-50 hover:text-blue-700 transition-colors
                              ${section.level === 1 ? 'font-medium' : 'pl-4 text-gray-600'}`}
                          >
                            {section.title}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Conteúdo principal */}
          <div className="flex-1 max-w-3xl">
            <article className="prose prose-blue prose-lg max-w-none">
              {/* Introdução */}
              <section id="introducao" className="mb-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Introdução</h2>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r mb-6">
                  <p className="mb-4">
                    O desenvolvimento motor nos primeiros anos de vida é um processo complexo e sequencial, fundamental para a autonomia e interação da criança com o mundo. Cada nova habilidade motora adquirida representa um avanço significativo na maturação neurológica e no controle corporal. Compreender as fases dessa progressão permite que pais e cuidadores ofereçam o suporte adequado e identifiquem o desenvolvimento saudável.
                  </p>
                  <p>
                    Apresentamos uma descrição das etapas cruciais do desenvolvimento motor grosso, ressaltando que o ritmo de aquisição pode variar individualmente entre os bebês.
                  </p>
                </div>

                {/* Quadro didático com timeline visual */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                  <h3 className="text-xl font-semibold text-blue-700 mb-4">Linha do Tempo do Desenvolvimento Motor</h3>
                  <div className="relative">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-200 ml-3"></div>
                    
                    <div className="grid grid-cols-[24px_1fr] gap-4 mb-6">
                      <div className="relative">
                        <div className="absolute top-1 w-7 h-7 bg-blue-500 rounded-full -left-3 flex items-center justify-center">
                          <span className="text-white text-xs font-bold">0m</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-gray-800">Recém-nascido</h4>
                        <p className="text-gray-600">Predominância de reflexos primitivos e padrão flexor</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-[24px_1fr] gap-4 mb-6">
                      <div className="relative">
                        <div className="absolute top-1 w-7 h-7 bg-blue-500 rounded-full -left-3 flex items-center justify-center">
                          <span className="text-white text-xs font-bold">3m</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-gray-800">Controle cefálico</h4>
                        <p className="text-gray-600">Sustentação da cabeça e início da elevação do tronco em prono</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-[24px_1fr] gap-4 mb-6">
                      <div className="relative">
                        <div className="absolute top-1 w-7 h-7 bg-blue-500 rounded-full -left-3 flex items-center justify-center">
                          <span className="text-white text-xs font-bold">6m</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-gray-800">Rotação e sedestação</h4>
                        <p className="text-gray-600">Capacidade de rolar e início do sentar com apoio</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-[24px_1fr] gap-4 mb-6">
                      <div className="relative">
                        <div className="absolute top-1 w-7 h-7 bg-blue-500 rounded-full -left-3 flex items-center justify-center">
                          <span className="text-white text-xs font-bold">9m</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-gray-800">Quatro apoios e engatinhar</h4>
                        <p className="text-gray-600">Posição quadrúpede e início da locomoção</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-[24px_1fr] gap-4 mb-6">
                      <div className="relative">
                        <div className="absolute top-1 w-7 h-7 bg-blue-500 rounded-full -left-3 flex items-center justify-center">
                          <span className="text-white text-xs font-bold">12m</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-gray-800">Ortostase e primeiros passos</h4>
                        <p className="text-gray-600">Ficar em pé com apoio e iniciar a marcha lateral</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-[24px_1fr] gap-4">
                      <div className="relative">
                        <div className="absolute top-1 w-7 h-7 bg-blue-500 rounded-full -left-3 flex items-center justify-center">
                          <span className="text-white text-xs font-bold">18m</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-gray-800">Marcha independente</h4>
                        <p className="text-gray-600">Consolidação da caminhada sem apoio</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              
              {/* Seção 1 */}
              <section id="decubito-dorsal" className="mb-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Do Decúbito Dorsal à Conquista da Rotação Corporal (Aproximadamente 0-6 meses)</h2>
                
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-blue-700 mb-3">Postura Inicial</h3>
                  <p className="mb-4">
                    Nos meses iniciais, o bebê permanece predominantemente em decúbito dorsal (deitado de costas), frequentemente com os membros em um padrão de flexão residual da vida intrauterina.
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Postura assimétrica devido ao reflexo tônico cervical assimétrico</li>
                    <li>Predomínio de flexão dos membros superiores e inferiores</li>
                    <li>Movimentos aleatórios e não coordenados</li>
                    <li>Limitada capacidade de sustentação contra a gravidade</li>
                  </ul>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-blue-700 mb-3">Aquisição do Rolar</h3>
                  <p className="mb-4">
                    Com o progressivo fortalecimento muscular e o desenvolvimento do sistema nervoso central, o bebê adquire a capacidade de rolar. Este movimento envolve a rotação do corpo, permitindo a transição do decúbito dorsal para o ventral (deitado de bruços) e vice-versa.
                  </p>
                  <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r mb-4">
                    <h4 className="font-medium text-yellow-800 mb-2">Dica para pais e cuidadores:</h4>
                    <p className="text-gray-700">
                      Incentive o bebê a rolar oferecendo estímulos visuais (brinquedos coloridos) no lado para o qual deseja que ele role. Sempre supervisione esta atividade e proporcione uma superfície segura e confortável.
                    </p>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-5 rounded-lg mb-6">
                  <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center">
                    <Info className="h-5 w-5 mr-2" />
                    Marcos importantes nesta fase:
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-md shadow-sm">
                      <h4 className="font-medium text-blue-700 mb-2">2-3 meses</h4>
                      <p className="text-sm text-gray-700">Início do controle cefálico em supino, com capacidade de manter a cabeça na linha média</p>
                    </div>
                    <div className="bg-white p-4 rounded-md shadow-sm">
                      <h4 className="font-medium text-blue-700 mb-2">4-5 meses</h4>
                      <p className="text-sm text-gray-700">Rolamento de supino para lateral, com maior controle e coordenação de tronco</p>
                    </div>
                    <div className="bg-white p-4 rounded-md shadow-sm">
                      <h4 className="font-medium text-blue-700 mb-2">5-6 meses</h4>
                      <p className="text-sm text-gray-700">Rolamento completo de supino para prono, indicando desenvolvimento da rotação segmentar</p>
                    </div>
                  </div>
                </div>
              </section>
              
              {/* Seção 2 */}
              <section id="decubito-ventral" className="mb-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Exploração em Decúbito Ventral: Fundamentos para a Locomoção (Aproximadamente 4-9 meses)</h2>
                
                <div className="mb-8">
                  <p className="mb-4">
                    Uma vez que o bebê se estabiliza confortavelmente em decúbito ventral, observa-se uma progressão de habilidades motoras essenciais. Esta posição é fundamental para o desenvolvimento da força e controle postural necessários para futuras habilidades como engatinhar, sentar e ficar em pé.
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-lg shadow-sm p-4">
                      <h3 className="text-lg font-semibold text-blue-700 mb-3">Fase 1: Elevação Cefálica</h3>
                      <p className="text-sm text-gray-700">
                        Inicialmente, o bebê desenvolve a capacidade de elevar a cabeça e, posteriormente, o tórax, fortalecendo a musculatura cervical e dorsal.
                      </p>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-sm p-4">
                      <h3 className="text-lg font-semibold text-blue-700 mb-3">Fase 2: Apoio em Antebraços</h3>
                      <p className="text-sm text-gray-700">
                        A primeira etapa é o apoio sobre os antebraços, permitindo a elevação do tórax e a exploração visual do ambiente.
                      </p>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-sm p-4">
                      <h3 className="text-lg font-semibold text-blue-700 mb-3">Fase 3: Apoio nas Mãos</h3>
                      <p className="text-sm text-gray-700">
                        Com o aumento da força, o bebê progride para o apoio sobre as mãos com os cotovelos estendidos (posição de esfinge modificada).
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-blue-700 mb-4">Posição de Quatro Apoios e Preparação para o Engatinhar</h3>
                  <p className="mb-4">
                    O bebê evolui para a posição de quatro apoios (mãos e joelhos). Nesta fase, é comum observar movimentos de balanço anteroposterior, que antecedem a coordenação necessária para o deslocamento através do engatinhar.
                  </p>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">Importância para o desenvolvimento:</h4>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                      <li>Fortalecimento dos músculos do tronco, ombros e quadris</li>
                      <li>Desenvolvimento da coordenação bilateral</li>
                      <li>Preparação para a postura sentada e em pé</li>
                      <li>Estimulação vestibular e proprioceptiva</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r">
                  <h4 className="font-medium text-yellow-800 mb-2">Dicas para estimulação:</h4>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Proporcione tempo adequado em decúbito ventral ("tummy time") desde os primeiros meses, sempre com supervisão</li>
                    <li>Utilize brinquedos coloridos e sonoros para motivar a elevação da cabeça e tronco</li>
                    <li>Coloque um rolo pequeno sob o peito do bebê para facilitar o apoio nos antebraços</li>
                    <li>Evite superfícies muito macias que dificultam o movimento</li>
                    <li>Respeite o ritmo individual de cada bebê, sem forçar posturas para as quais ainda não está preparado</li>
                  </ul>
                </div>
              </section>
              
              {/* Seção 3 */}
              <section id="engatinhar-sedestar" className="mb-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Do Engatinhar ao Sedestar: Novas Perspectivas e Manipulação (Aproximadamente 6-10 meses)</h2>
                <p className="mb-4">
                  <strong>Locomoção Quadrúpede (Engatinhar):</strong> O engatinhar representa uma forma eficiente de locomoção independente, promovendo o desenvolvimento da coordenação bilateral, força muscular e planejamento motor.
                </p>
                <p className="mb-4">
                  <strong>Transição para a Posição Sentada:</strong> Frequentemente, a partir da posição de quatro apoios, o bebê desenvolve a habilidade de transitar para a posição sentada, muitas vezes passando por uma fase em que se senta sobre os calcanhares. A consolidação do controle postural sentado oferece ao bebê uma nova perspectiva do ambiente e libera as mãos para manipulação de objetos e exploração tátil mais sofisticada.
                </p>
              </section>
              
              {/* Seção 4 */}
              <section id="ortostase-primeiros-passos" className="mb-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Da Ortostase aos Primeiros Passos: A Conquista da Verticalidade (Aproximadamente 8-15 meses)</h2>
                <p className="mb-4">
                  <strong>Alcançando a Posição de Pé (Ortostase):</strong> Inicialmente com apoio, o bebê começa a explorar a posição de pé, utilizando móveis e outros suportes para a transferência de peso e o treinamento do equilíbrio. Esta fase caracteriza-se pelo refinamento do controle postural e pela adaptação às novas demandas gravitacionais da postura ereta.
                </p>
                <p className="mb-4">
                  <strong>Marcha Lateral com Apoio:</strong> Muitos bebês desenvolvem a habilidade de deslocamento lateral enquanto seguram em superfícies estáveis, como móveis. Este padrão de movimento, conhecido como "cruising", fortalece a musculatura dos membros inferiores e aprimora o controle de equilíbrio dinâmico necessário para a marcha independente.
                </p>
                <p className="mb-4">
                  <strong>Primeiros Passos Independentes:</strong> A transição para os primeiros passos sem apoio representa um marco significativo, geralmente ocorrendo entre 12 e 15 meses, embora a variabilidade individual seja substancial. Este estágio é caracterizado por uma base de sustentação ampla, passos curtos e irregulares, e frequentes perdas de equilíbrio.
                </p>
              </section>
              
              {/* Seção 5 */}
              <section id="marcha-independente" className="mb-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Desenvolvimento da Marcha Independente: Refinamento e Automatização (Aproximadamente 12-18 meses)</h2>
                <p className="mb-4">
                  <strong>Consolidação da Marcha:</strong> Após os primeiros passos, observa-se uma rápida evolução no padrão de marcha, com aumento progressivo da estabilidade, cadência e distância percorrida.
                </p>
                <p className="mb-4">
                  <strong>Características da Marcha Inicial:</strong> O padrão imaturo inicial apresenta características distintas:
                </p>
                <ul className="mb-4">
                  <li className="mb-2">Base de sustentação ampla para maior estabilidade</li>
                  <li className="mb-2">Braços elevados e abduzidos como "guardas de equilíbrio"</li>
                  <li className="mb-2">Ausência de dissociação de cinturas</li>
                  <li className="mb-2">Contato inicial com o pé completo (sem a progressão calcanhar-ponta)</li>
                  <li>Passos curtos e irregulares</li>
                </ul>
                <p>
                  <strong>Evolução da Marcha:</strong> Com a prática e o desenvolvimento neuromotor, observa-se a evolução para um padrão mais maduro, com base de sustentação mais estreita, balanço recíproco dos braços, aumento da dissociação de cinturas e estabelecimento gradual do padrão calcanhar-ponta.
                </p>
              </section>
              
              {/* Considerações Finais - com melhorias */}
              <section id="consideracoes" className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Considerações Finais</h2>
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r mb-8">
                  <p className="mb-4">
                    O desenvolvimento motor do bebê representa uma intrincada coreografia neurológica, muscular e sensorial, fundamentada tanto em fatores genéticos quanto ambientais. A aquisição sequencial destas habilidades demonstra o princípio cefalocaudal e próximo-distal do desenvolvimento, com progressão do controle da cabeça aos pés e do centro para as extremidades.
                  </p>
                  <p className="mb-4">
                    É importante ressaltar que cada bebê possui seu próprio ritmo de desenvolvimento. Enquanto alguns podem apresentar aquisições motoras precoces, outros podem seguir um ritmo mais lento, sem necessariamente indicar atrasos ou disfunções. A variabilidade é esperada e deve ser respeitada dentro de parâmetros razoáveis.
                  </p>
                  <p>
                    Para profissionais e cuidadores, o conhecimento dessas etapas proporciona um referencial para identificação de possíveis desvios significativos que possam requerer atenção especializada. Além disso, compreender esta progressão permite a criação de ambientes enriquecidos e seguros que facilitem a exploração motora e o desenvolvimento pleno do potencial da criança.
                  </p>
                </div>

                {/* Quiz interativo */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                  <h3 className="text-xl font-semibold text-blue-700 mb-4">Teste seus conhecimentos</h3>
                  <div className="space-y-6">
                    <div>
                      <p className="font-medium text-gray-800 mb-2">1. Em qual faixa etária ocorre tipicamente o início do engatinhar?</p>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input 
                            type="radio" 
                            id="q1-a" 
                            name="q1" 
                            value="a"
                            checked={quizAnswers.q1 === 'a'}
                            onChange={() => handleQuizChange('q1', 'a')}
                            className="mr-2" 
                          />
                          <label htmlFor="q1-a" className="text-gray-700">2-3 meses</label>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="radio" 
                            id="q1-b" 
                            name="q1" 
                            value="b"
                            checked={quizAnswers.q1 === 'b'}
                            onChange={() => handleQuizChange('q1', 'b')}
                            className="mr-2" 
                          />
                          <label htmlFor="q1-b" className="text-gray-700">4-5 meses</label>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="radio" 
                            id="q1-c" 
                            name="q1" 
                            value="c"
                            checked={quizAnswers.q1 === 'c'}
                            onChange={() => handleQuizChange('q1', 'c')}
                            className="mr-2" 
                          />
                          <label htmlFor="q1-c" className="text-gray-700">6-9 meses</label>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="radio" 
                            id="q1-d" 
                            name="q1" 
                            value="d"
                            checked={quizAnswers.q1 === 'd'}
                            onChange={() => handleQuizChange('q1', 'd')}
                            className="mr-2" 
                          />
                          <label htmlFor="q1-d" className="text-gray-700">10-12 meses</label>
                        </div>
                        {quizResults && (
                          <div className={`mt-2 p-2 rounded text-sm ${quizResults[0].correct ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                            {quizResults[0].message}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <p className="font-medium text-gray-800 mb-2">2. Qual princípio de desenvolvimento explica por que o bebê adquire controle da cabeça antes das pernas?</p>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input 
                            type="radio" 
                            id="q2-a" 
                            name="q2" 
                            value="a"
                            checked={quizAnswers.q2 === 'a'}
                            onChange={() => handleQuizChange('q2', 'a')}
                            className="mr-2" 
                          />
                          <label htmlFor="q2-a" className="text-gray-700">Princípio proximal-distal</label>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="radio" 
                            id="q2-b" 
                            name="q2" 
                            value="b"
                            checked={quizAnswers.q2 === 'b'}
                            onChange={() => handleQuizChange('q2', 'b')}
                            className="mr-2" 
                          />
                          <label htmlFor="q2-b" className="text-gray-700">Princípio cefalocaudal</label>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="radio" 
                            id="q2-c" 
                            name="q2" 
                            value="c"
                            checked={quizAnswers.q2 === 'c'}
                            onChange={() => handleQuizChange('q2', 'c')}
                            className="mr-2" 
                          />
                          <label htmlFor="q2-c" className="text-gray-700">Princípio global-específico</label>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="radio" 
                            id="q2-d" 
                            name="q2" 
                            value="d"
                            checked={quizAnswers.q2 === 'd'}
                            onChange={() => handleQuizChange('q2', 'd')}
                            className="mr-2" 
                          />
                          <label htmlFor="q2-d" className="text-gray-700">Princípio da sequência variável</label>
                        </div>
                        {quizResults && (
                          <div className={`mt-2 p-2 rounded text-sm ${quizResults[1].correct ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                            {quizResults[1].message}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={checkQuizAnswers}
                    className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Verificar respostas
                  </button>
                </div>
              </section>
            </article>
          </div>
        </div>
      </main>
    </div>
  )
} 