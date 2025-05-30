"use client"

import React, { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, CheckCircle2, XCircle, BarChart, TrendingUp, ChevronRight, AlarmClock, ChevronLeft, X, Bell, FileDown } from "lucide-react"
import Link from "next/link"
import { ThreeDText } from "@/components/ui/3d-text"
import { AdvancedParallax } from "@/components/animations/advanced-parallax"
import { MagneticButton } from "@/components/ui/magnetic-button"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Particles } from "@/components/ui/particles"

// Register GSAP plugins on client-side only
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Types
interface Question {
  question: string
  options: string[]
  correctAnswer: number
  category: string
  explanation: string
}

// Componente do Modal/Popup
interface AnnouncementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AnnouncementModal: React.FC<AnnouncementModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm" 
        onClick={onClose}
      />
      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="relative bg-white rounded-xl shadow-xl max-w-md w-full p-6 md:p-8 z-50"
      >
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>
        
        <div className="flex items-start mb-4">
          <div className="bg-blue-50 p-2 rounded-full mr-4">
            <Bell className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Informação Importante</h3>
            <p className="text-sm text-gray-500">29 de maio de 2024</p>
          </div>
        </div>
        
        <div className="space-y-3 text-gray-700">
          <p>
            Todas as questões desta avaliação foram elaboradas com base nos artigos científicos disponibilizados pela professora Leandra Oliva, garantindo alinhamento com o conteúdo programático e as evidências científicas mais atuais na área de fisioterapia neonatal.
          </p>
          <p>
            As alternativas corretas foram distribuídas de forma equilibrada entre as opções A, B, C, D e E, e os enunciados foram revisados para proporcionar uma avaliação justa e abrangente do conhecimento.
          </p>
          <p className="font-medium text-blue-600">
            Em caso de divergências ou dúvidas sobre qualquer resposta, entre em contato diretamente através do WhatsApp para esclarecimentos adicionais.
          </p>
        </div>
        
        <div className="mt-6 flex flex-col gap-3">
          <a 
            href="https://wa.me/5571991373142"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium hover:shadow-md transition-all flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Contato via WhatsApp
          </a>
          
          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 bg-gradient-to-r from-[#6EC1E4] to-[#B9A9FF] text-white rounded-lg font-medium hover:shadow-md transition-all"
          >
            Entendido, prosseguir para a avaliação
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// Fisher-Yates shuffle algorithm
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export default function ProvaGeralPage() {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [feedbackMessage, setFeedbackMessage] = useState("")
  const [timer, setTimer] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [questions, setQuestions] = useState<Question[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasStarted, setHasStarted] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(true)
  
  const headerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    // Header animation on scroll
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { y: 0 },
        {
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
          y: 100,
          opacity: 0.8,
          ease: "power2.out",
        }
      )
    }
    
    // Start timer when component mounts
    setIsTimerRunning(true)
    
    return () => {
      setIsTimerRunning(false)
    }
  }, [])
  
  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isTimerRunning && !showResults) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, showResults]);
  
  // Format timer to MM:SS
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Questions array
  const originalQuestions: Question[] = [
    // REFLEXOS DE 0 A 6 MESES (5 questões)
    {
      question: "RN prematuro de 32 semanas, atualmente com 35 semanas de idade corrigida, apresenta aumento do tônus extensor em membros inferiores, ausência de flexão fisiológica e reflexo de Moro exacerbado. Analisando estes achados, qual é a interpretação neurofisiológica correta?",
      options: [
        "Trata-se de um desenvolvimento neuromotor absolutamente normal para a idade gestacional corrigida, sem quaisquer alterações significativas que justifiquem intervenção precoce ou investigação adicional",
        "Indica possível lesão em nível cortical com consequente liberação de padrões subcorticais primitivos, sugerindo a necessidade de investigação neurológica detalhada e acompanhamento rigoroso",
        "Representa o processo esperado de maturação céfalo-caudal do sistema nervoso central, embora a exacerbação do reflexo de Moro possa ser considerada atípica para a idade corrigida atual",
        "Indica maturação acelerada do sistema piramidal em comparação ao sistema extrapiramidal, fenômeno frequentemente observado em prematuros como mecanismo compensatório de adaptação extrauterina",
        "Evidencia alteração transitória decorrente exclusivamente da prematuridade, sem valor prognóstico significativo para o desenvolvimento neuromotor futuro ou indicação de intervenção"
      ],
      correctAnswer: 1,
      category: "Reflexos de 0 a 6 meses",
      explanation: "O aumento do tônus extensor em membros inferiores associado à ausência de flexão fisiológica e reflexo de Moro exacerbado pode indicar uma possível lesão cortical com liberação de padrões subcorticais. Este quadro clínico sugere hipertonia extensora patológica por possível comprometimento dos sistemas descendentes inibitórios, necessitando de investigação neurológica detalhada."
    },
    {
      question: "Durante avaliação neurológica seriada de um recém-nascido a termo com 30 dias de vida, observa-se persistência acentuada do reflexo tônico cervical assimétrico (RTCA), que se mantém por mais de 30 segundos após estímulo e dificulta o retorno à linha média. Este achado, isoladamente, pode sugerir:",
      options: [
        "Atraso transitório no processo de integração sensório-motora primitiva, sem significado clínico relevante que justifique preocupação ou intervenção específica neste momento do desenvolvimento",
        "Provável lesão localizada na região cerebelar, afetando principalmente os mecanismos de controle do tônus axial e da coordenação dos movimentos corporais na linha média",
        "Possível comprometimento funcional ou estrutural dos gânglios da base ou núcleos vestibulares, afetando a modulação do tônus postural e o processamento proprioceptivo",
        "Desenvolvimento absolutamente normal para esta faixa etária, considerando que o RTCA deve estar presente de forma robusta até aproximadamente o terceiro mês de vida pós-natal",
        "Manifestação inicial de uma lesão periférica do plexo braquial, que frequentemente se apresenta clinicamente como assimetria reflexa antes de evidenciar déficits motores mais óbvios"
      ],
      correctAnswer: 0,
      category: "Reflexos de 0 a 6 meses",
      explanation: "A persistência acentuada do RTCA por mais de 30 segundos com dificuldade de retorno à linha média aos 30 dias sugere possível comprometimento dos gânglios da base ou núcleos vestibulares. O RTCA, embora presente nesta idade, não deve ser tão intenso nem duradouro, e sua persistência exacerbada pode indicar alterações nos circuitos subcorticais responsáveis pelo controle do tônus e postura."
    },
    {
      question: "Um lactente de 4 meses apresenta controle cefálico parcial em supino, ausência de apoio de antebraço em prono, mãos predominantemente fechadas e persistência do reflexo de preensão palmar bilateral. Ao ser posicionado em pé, observa-se hipertonia extensora de membros inferiores com padrão em tesoura. Este quadro clínico sugere:",
      options: [
        "Desenvolvimento motor perfeitamente normal e esperado para a idade cronológica do bebê, sem qualquer indicativo de alteração neurológica que justifique intervenção ou acompanhamento especializado",
        "Paralisia cerebral do tipo espástica, com predomínio de acometimento em membros inferiores, compatível com lesão periventricular que afetou principalmente as fibras descendentes para os membros inferiores",
        "Atraso motor transitório de caráter benigno e autolimitado, sem evidências consistentes de alterações neurológicas específicas que justifiquem diagnóstico definitivo nesta idade",
        "Quadro sugestivo de mielopatia não-progressiva com acometimento preferencial da medula espinhal em nível torácico, preservando relativamente as funções cervicais superiores",
        "Manifestação típica da Síndrome de Down, caracterizada principalmente pela hipotonia axial central e atraso no desenvolvimento do controle cefálico, com hipertonia adaptativa de membros"
      ],
      correctAnswer: 4,
      category: "Reflexos de 0 a 6 meses",
      explanation: "O quadro descrito apresenta múltiplos sinais de alerta para paralisia cerebral espástica: persistência do reflexo de preensão palmar aos 4 meses, controle cefálico parcial, ausência de apoio em antebraço, mãos predominantemente fechadas e, principalmente, a hipertonia extensora de membros inferiores com padrão em tesoura. Este último sinal é altamente sugestivo de diplegia espástica, forma comum de paralisia cerebral."
    },
    {
      question: "Durante avaliação seriada da motricidade espontânea de um RN prematuro de 34 semanas, agora com 2 meses de idade corrigida, o fisioterapeuta observa ausência de 'fidgety movements' (movimentos irregulares, pequenos e circulares de baixa amplitude em todas as direções) que normalmente surgem nesta fase. Qual a interpretação correta deste achado segundo a Avaliação dos Movimentos Generalizados de Prechtl?",
      options: [
        "Trata-se de uma variação absolutamente normal do desenvolvimento neuromotor típico para esta idade corrigida, sem qualquer relevância clínica que justifique preocupação ou acompanhamento específico",
        "Constitui um forte preditor de desenvolvimento motor normal, particularmente em prematuros, indicando maturação adequada das vias neuromotoras responsáveis pelos movimentos finos e coordenados",
        "Representa apenas um atraso transitório na maturação dos circuitos do sistema extrapiramidal, sem valor prognóstico significativo para o desenvolvimento neuropsicomotor futuro da criança",
        "Configura um forte preditor de disfunção neurológica futura, particularmente associado ao desenvolvimento de paralisia cerebral, com valor preditivo de aproximadamente 95% segundo estudos longitudinais",
        "Indica possíveis alterações na formação e funcionamento das estruturas cerebelares, porém sem correlação direta com déficits motores futuros que possam comprometer o desenvolvimento funcional"
      ],
      correctAnswer: 3,
      category: "Reflexos de 0 a 6 meses",
      explanation: "A ausência dos 'fidgety movements', que normalmente surgem entre 6-20 semanas de idade corrigida, é considerada um forte preditor de disfunção neurológica, particularmente paralisia cerebral, com alto valor preditivo (cerca de 95%). Segundo a Avaliação dos Movimentos Generalizados de Prechtl, esta alteração reflete comprometimento dos circuitos neuronais responsáveis pelo controle motor fino e é considerada um biomarcador precoce de lesão cerebral."
    },
    {
      question: "Recém-nascido de 15 dias apresenta reflexo de Moro completo, simétrico, porém com ausência da fase de abdução do membro superior esquerdo. Durante a avaliação, observa-se também ausência de movimentação ativa do ombro e cotovelo esquerdos, com preservação dos movimentos de punho e dedos. Este quadro clínico é mais sugestivo de:",
      options: [
        "Lesão traumática do nervo radial esquerdo causada por compressão durante o parto, comprometendo principalmente a inervação dos músculos extensores do antebraço, porém preservando os movimentos de pronação e supinação",
        "Paralisia braquial obstétrica do tipo Duchenne-Erb, decorrente de lesão das raízes nervosas C5-C6 do plexo braquial, afetando predominantemente os movimentos de abdução e rotação externa do ombro e flexão do cotovelo",
        "Paralisia braquial obstétrica do tipo Klumpke, caracterizada por lesão das raízes nervosas C8-T1, resultando em comprometimento da musculatura intrínseca da mão e flexores profundos dos dedos, com preservação parcial da função proximal",
        "Manifestação precoce de hemiparesia de origem central, decorrente de lesão cerebral perinatal, potencialmente associada a eventos hipóxico-isquêmicos ocorridos durante o trabalho de parto ou no período neonatal imediato",
        "Limitação funcional temporária secundária a fratura de clavícula em processo de consolidação, gerando dor à movimentação do membro superior e consequente imobilização protetora dos grupos musculares proximais"
      ],
      correctAnswer: 1,
      category: "Reflexos de 0 a 6 meses",
      explanation: "O quadro descrito é altamente sugestivo de paralisia braquial obstétrica do tipo Duchenne-Erb, que afeta as raízes nervosas C5-C6 do plexo braquial. Esta lesão compromete os movimentos do ombro e cotovelo (abdução, rotação externa do ombro e flexão do cotovelo), preservando os movimentos de punho e dedos, controlados por raízes inferiores. A assimetria do reflexo de Moro é um sinal clássico desta condição, pois sua execução completa depende da integridade das raízes superiores do plexo braquial."
    },

    // REFLEXOS DE 7 A 15 MESES (5 questões)
    {
      question: "Lactente de 10 meses, nascido a termo, sem intercorrências perinatais, apresenta atraso na aquisição de marcos motores, não conseguindo manter-se sentado sem apoio e demonstrando transferência de peso lateral limitada. Durante avaliação fisioterapêutica, observa-se aumento de tônus em membros inferiores, persistência do reflexo tônico cervical assimétrico e ausência das reações de proteção lateral. Qual hipótese diagnóstica é mais provável?",
      options: [
        "Atraso motor simples de causa idiopática, sem evidências concretas de comprometimento neurológico estrutural, possivelmente relacionado a fatores ambientais ou estimulação insuficiente no ambiente domiciliar",
        "Diplegia espástica de intensidade leve a moderada, caracterizada pelo acometimento predominante dos membros inferiores, com envolvimento parcial da funcionalidade de tronco e presença de reflexos primitivos persistentes",
        "Ataxia cerebelar congênita de manifestação precoce, evidenciada pela instabilidade postural, dificuldade na transferência de peso e incoordenação dos movimentos direcionados, afetando principalmente o controle axial",
        "Forma congênita de distrofia muscular com manifestação progressiva e comprometimento predominante da musculatura proximal, causando fraqueza significativa e limitação na aquisição dos marcos motores antigravitacionais",
        "Síndrome de hipermobilidade articular generalizada associada a déficit proprioceptivo significativo, resultando em atraso na estabilização postural e dificuldades no desenvolvimento das reações de equilíbrio"
      ],
      correctAnswer: 1,
      category: "Reflexos de 7 a 15 meses",
      explanation: "O quadro descrito sugere diplegia espástica leve a moderada, evidenciada pelo atraso na aquisição de marcos motores (não senta sem apoio aos 10 meses), aumento de tônus em membros inferiores, persistência patológica de reflexos primitivos (RTCA) e ausência de reações posturais adequadas para a idade (proteção lateral). Este conjunto de sinais é altamente sugestivo de paralisia cerebral do tipo diplégica, frequentemente associada a lesões periventriculares em prematuros, embora neste caso tenha ocorrido em um bebê a termo."
    },
    {
      question: "Um bebê de 8 meses consegue sentar-se sem apoio, mas não realiza rotação de tronco durante o alcance lateral de objetos e apresenta transferência de peso anterior limitada. Não realiza mudanças posturais ativas como passar de sentado para quatro apoios. A avaliação revela hipotonia axial com hipertonia de membros inferiores e reações de equilíbrio sentado deficitárias. Qual seria a melhor conduta fisioterapêutica para este caso?",
      options: [
        "Facilitação sistemática das rotações de tronco em múltiplas posturas e treinamento intensivo de transferências posturais com descarga de peso adequada em membros superiores, focando na dissociação entre cinturas escapular e pélvica",
        "Implementação de protocolo de posicionamento exclusivamente em decúbito dorsal para estimular ativamente os padrões de flexão e cruzamento da linha média, evitando posturas que favoreçam padrões extensores patológicos",
        "Aplicação de programa intensivo de treino de marcha com suporte parcial de peso corporal, visando normalizar o tônus muscular dos membros inferiores através da ativação dos geradores centrais de padrão",
        "Prescrição de protocolo específico de fortalecimento isolado da musculatura abdominal profunda, objetivando melhorar primariamente o controle de tronco antes de qualquer intervenção em outros segmentos corporais",
        "Utilização contínua de órteses rígidas de posicionamento em membros inferiores como intervenção primária, visando controlar a hipertonia antes de qualquer abordagem funcional de tronco e membros superiores"
      ],
      correctAnswer: 0,
      category: "Reflexos de 7 a 15 meses",
      explanation: "A melhor conduta envolve a facilitação das rotações de tronco em diferentes posturas e treino de transferências posturais com descarga de peso em membros superiores. Esta abordagem visa melhorar a dissociação entre cinturas escapular e pélvica, promover ajustes posturais antecipatórios, facilitar as transferências de peso e estimular as reações de equilíbrio, abordando diretamente os déficits identificados (ausência de rotação de tronco, limitação na transferência de peso e dificuldade nas mudanças posturais ativas)."
    },
    {
      question: "Bebê de 12 meses nascido prematuro (32 semanas) apresenta dificuldade para ficar em pé sem apoio e iniciou recentemente o engatinhar com padrão assimétrico (arrastar-se com predomínio de um lado do corpo). Observa-se persistência do reflexo de Galant à esquerda, reação de proteção lateral incompleta bilateralmente e reações de equilíbrio em pé deficitárias. A avaliação da motricidade espontânea revela movimentos estereotipados dos membros superiores durante a excitação. Qual a hipótese diagnóstica mais provável?",
      options: [
        "Manifestação inicial de paralisia cerebral do tipo hemiplégico com predomínio de comprometimento do hemicorpo direito, decorrente de provável lesão no hemisfério cerebral esquerdo associada à prematuridade",
        "Alterações neuromotoras e comportamentais características do transtorno do espectro autista de alto funcionamento, com comprometimento motor associado às manifestações sociocomunicativas atípicas",
        "Quadro neurogenético compatível com Síndrome de Angelman, caracterizada por atraso motor, movimentos atáxicos, comportamento feliz e alterações eletroencefalográficas específicas",
        "Atraso motor transitório diretamente relacionado à prematuridade, sem significado patológico específico, com expectativa de normalização espontânea até os 18-24 meses de idade corrigida",
        "Comprometimento funcional primário do sistema vestibular periférico e central, resultando em insegurança gravitacional, atraso nas reações de equilíbrio e assimetria motora compensatória"
      ],
      correctAnswer: 0,
      category: "Reflexos de 7 a 15 meses",
      explanation: "Os achados sugerem paralisia cerebral hemiplégica leve à direita. O engatinhar assimétrico (arrastando-se com predomínio de um lado) é um sinal clássico de hemiparesia. A persistência unilateral do reflexo de Galant, a assimetria nas reações posturais e os movimentos estereotipados dos membros superiores durante a excitação também são consistentes com esta hipótese. Embora a prematuridade seja um fator de risco, o padrão de déficit motor assimétrico é mais indicativo de hemiparesia do que um atraso global."
    },
    {
      question: "Um lactente de 14 meses, com desenvolvimento prévio normal, apresenta subitamente perda da capacidade de ficar em pé sem apoio e regressão das habilidades manuais, com surgimento de movimentos estereotipados de 'lavar as mãos'. Mantém contato visual, mas demonstra irritabilidade e choro inconsolável durante a noite. A avaliação fisioterapêutica revela hipertonia de membros inferiores com manutenção dos reflexos posturais previamente adquiridos. Qual a hipótese diagnóstica mais provável?",
      options: [
        "Paralisia cerebral discinética de início tardio",
        "Síndrome de Rett",
        "Autismo regressivo",
        "Encefalopatia epiléptica",
        "Doença de Tay-Sachs"
      ],
      correctAnswer: 1,
      category: "Reflexos de 7 a 15 meses",
      explanation: "O quadro descrito é altamente sugestivo de Síndrome de Rett, especialmente pelos sinais característicos: regressão do desenvolvimento após período normal, perda de habilidades manuais adquiridas, movimentos estereotipados de 'lavar as mãos' (marca registrada desta síndrome), preservação relativa do contato visual, irritabilidade e distúrbios do sono. A hipertonia de membros inferiores com preservação dos reflexos posturais também é consistente com esta condição, que afeta predominantemente meninas e se manifesta tipicamente entre 6-18 meses após desenvolvimento inicial normal."
    },
    {
      question: "Bebê de 9 meses apresenta dificuldade para manter-se sentado sem apoio por períodos prolongados, demonstrando oscilações de tronco e quedas frequentes para os lados. Consegue rolar em bloco, mas não apresenta rotações segmentares de tronco. Ao ser colocado em pé, observa-se hipotonia axial com transferência excessiva de peso sobre os membros inferiores, que apresentam base alargada. Qual alteração no desenvolvimento dos reflexos posturais melhor explica este quadro clínico?",
      options: [
        "Hipersensibilidade do sistema vestibular periférico, causando interpretação errônea dos estímulos de movimento e posição da cabeça no espaço, gerando insegurança postural e respostas adaptativas inadequadas",
        "Hipoatividade crônica do sistema proprioceptivo muscular e articular, resultando em feedback deficiente sobre a posição dos segmentos corporais e limitando a capacidade de ajustes posturais antecipatórios",
        "Persistência anormal do reflexo tônico labiríntico além do período esperado de integração, interferindo na capacidade de dissociação entre os segmentos corporais e na transferência de peso durante movimentos ativos",
        "Atraso significativo no desenvolvimento das conexões cerebelares responsáveis pela coordenação dos movimentos voluntários e pelo controle fino da ativação muscular durante tarefas que exigem equilíbrio dinâmico",
        "Desenvolvimento inadequado das reações de equilíbrio axial, fundamentais para manutenção da postura contra a gravidade e para realização de ajustes posturais automáticos durante movimentos ou perturbações externas"
      ],
      correctAnswer: 4,
      category: "Reflexos de 7 a 15 meses",
      explanation: "O quadro descrito evidencia principalmente um déficit no desenvolvimento das reações de equilíbrio axial, que são fundamentais para a manutenção da postura sentada e em pé. As oscilações de tronco, quedas frequentes para os lados, ausência de rotações segmentares, hipotonia axial e base alargada em pé são sinais clássicos de comprometimento das reações de equilíbrio, que dependem da integração dos sistemas vestibular, proprioceptivo e visual, além da integridade cerebelar."
    },

    // REAÇÕES DE 0 A 15 MESES (5 questões)
    {
      question: "Bebê de 3 meses nascido a termo apresenta alteração na qualidade dos movimentos generalizados, com repertório limitado, amplitude reduzida e ausência de variabilidade. Durante a avaliação em supino, observa-se dificuldade de alinhamento da cabeça na linha média, assimetria postural com preferência por rotação cefálica para a direita e retração escapular ipsilateral. Qual intervenção precoce seria mais adequada neste caso?",
      options: [
        "Estimulação sensorial multimodal com reorganização postural, favorecendo alinhamento médio e experiências simétricas",
        "Mobilização passiva articular global três vezes ao dia",
        "Fortalecimento muscular específico dos rotadores cervicais esquerdos",
        "Estímulos vestibulares intensos para normalização do tônus postural",
        "Posicionamento contínuo em decúbito ventral para fortalecimento extensor"
      ],
      correctAnswer: 0,
      category: "Reações de 0 a 15 meses",
      explanation: "A intervenção mais adequada para este caso é a estimulação sensorial multimodal com reorganização postural. Esta abordagem visa enriquecer o repertório motor do bebê através de experiências sensoriais variadas (táteis, proprioceptivas, vestibulares e visuais), favorecendo o alinhamento na linha média e experiências posturais simétricas. A alteração na qualidade dos movimentos generalizados e a assimetria postural são sinais de alerta que requerem intervenção precoce focada na neuroplasticidade e prevenção de deformidades posicionais."
    },
    {
      question: "Durante avaliação de um lactente de 6 meses com atraso no desenvolvimento motor, o fisioterapeuta testa a reação de proteção anterior (para frente). Ao inclinar o bebê para frente na posição sentada, observa-se que ele não estende os braços para se proteger da queda. A ausência desta reação nesta idade indica:",
      options: [
        "Atraso significativo no desenvolvimento motor com possível comprometimento neurológico subjacente, considerando que esta reação protetora normalmente está presente entre 4-6 meses e é fundamental para segurança durante transições posturais",
        "Padrão completamente normal de desenvolvimento, uma vez que esta reação protetora tipicamente só emerge após os 8 meses de idade, quando o controle postural sentado está plenamente estabelecido",
        "Evidência sugestiva de comprometimento bilateral do sistema vestibular, responsável pela detecção de mudanças posicionais da cabeça no espaço e ativação reflexa das respostas protetoras apropriadas",
        "Alteração sugestiva de déficit proprioceptivo periférico isolado, sem relação com o controle motor central ou com o desenvolvimento global do sistema nervoso da criança",
        "Manifestação comum em quadros de hipermobilidade articular generalizada, onde a hiperlassidão ligamentar compromete o feedback proprioceptivo necessário para desencadear respostas protetoras adequadas"
      ],
      correctAnswer: 0,
      category: "Reações de 0 a 15 meses",
      explanation: "A ausência da reação de proteção anterior aos 6 meses indica atraso significativo no desenvolvimento motor com possível comprometimento neurológico. Esta reação normalmente surge entre 4-6 meses e é fundamental para a segurança do bebê durante a transição para a postura sentada. Sua ausência nesta idade sugere déficit no controle postural e nas reações adaptativas, podendo estar associada a comprometimento das vias sensório-motoras ou atraso global no desenvolvimento neuropsicomotor."
    },
    {
      question: "Lactente de 7 meses apresenta persistência da reação tônica cervical assimétrica (RTCA) e ausência das reações de proteção laterais. Durante a avaliação em prono, observa-se incapacidade de transferir peso para um dos membros superiores para alcançar objetos. Em supino, o bebê não realiza rolamentos para prono, mesmo com facilitação. Estes achados sugerem principalmente um déficit no desenvolvimento de qual componente do controle motor?",
      options: [
        "Força muscular global",
        "Coordenação olho-mão",
        "Integração bilateral e rotação axial",
        "Controle antigravitacional de cabeça",
        "Ajustes posturais nos membros inferiores"
      ],
      correctAnswer: 2,
      category: "Reações de 0 a 15 meses",
      explanation: "Os achados sugerem principalmente déficit no desenvolvimento da integração bilateral e rotação axial. A persistência do RTCA impede a integração dos hemicorpos e a capacidade de cruzar a linha média. A ausência das reações de proteção laterais e a dificuldade na transferência de peso unilateral em prono indicam comprometimento na coordenação entre os dois lados do corpo. A incapacidade de realizar rolamentos para prono, mesmo com facilitação, confirma a dificuldade nas rotações axiais, componente fundamental para a transição entre posturas e desenvolvimento da mobilidade."
    },
    {
      question: "Um bebê de 10 meses com paralisia cerebral diparetica é submetido a uma avaliação da função manual. Ele consegue realizar preensão palmar bilateral, mas demonstra dificuldade na preensão de pinça e na transferência de objetos entre as mãos. Durante a manipulação de objetos, observa-se aumento do tônus extensor em membros inferiores. Qual abordagem terapêutica focada nas reações posturais seria mais adequada neste caso?",
      options: [
        "Inibição dos padrões extensores através de posicionamento exclusivo em flexão",
        "Mobilização passiva intensa das articulações dos membros inferiores",
        "Facilitação das reações de equilíbrio em sedestação com dissociação entre cinturas escapular e pélvica",
        "Treino repetitivo de preensão de pinça em mesa, com membro superior apoiado",
        "Estabilização dos membros inferiores em abdução e rotação externa através de órteses rígidas"
      ],
      correctAnswer: 2,
      category: "Reações de 0 a 15 meses",
      explanation: "A facilitação das reações de equilíbrio em sedestação com dissociação entre cinturas escapular e pélvica é a abordagem mais adequada. Em casos de paralisia cerebral diparética, a função manual frequentemente é prejudicada pelo aumento do tônus em membros inferiores durante atividades que exigem controle postural. Ao trabalhar as reações de equilíbrio em sedestação e promover a dissociação entre tronco superior e inferior, o fisioterapeuta facilita o controle postural independente da cintura escapular, permitindo maior liberdade de movimentos dos membros superiores sem ativação excessiva do padrão extensor em membros inferiores."
    },
    {
      question: "Bebê de 11 meses, nascido prematuro (34 semanas), apresenta atraso no desenvolvimento da marcha independente. Durante avaliação neuromotora, observa-se presença adequada das reações de proteção anterior e lateral, bom controle de tronco sentado, mas ausência das reações de equilíbrio em pé e resposta extensora excessiva quando colocado em ortostase. O tônus muscular é normotônico em repouso, com leve hipertonia distal em membros inferiores durante atividades. Qual seria o diagnóstico funcional mais apropriado?",
      options: [
        "Atraso motor simples relacionado à prematuridade tardia",
        "Diplegia espástica leve",
        "Síndrome de hipermobilidade articular",
        "Ataxia cerebelar congênita",
        "Distúrbio de integração sensorial com hipersensibilidade tátil distal"
      ],
      correctAnswer: 1,
      category: "Reações de 0 a 15 meses",
      explanation: "O diagnóstico funcional mais apropriado é diplegia espástica leve. O quadro apresenta sinais típicos desta condição: prematuridade como fator de risco, atraso na marcha independente com preservação do controle de tronco (característica da diplegia), ausência específica das reações de equilíbrio em pé, resposta extensora excessiva em ortostase e hipertonia distal em membros inferiores durante atividades. A apresentação é leve, pois o tônus em repouso é normal e as reações de proteção estão preservadas, mas os sinais de comprometimento específico dos membros inferiores são consistentes com diplegia espástica."
    },

    // DOR NEONATAL (5 questões)
    {
      question: "Recém-nascido prematuro de 32 semanas, atualmente com 35 semanas de idade corrigida, está na UTIN e será submetido a diversos procedimentos dolorosos em um mesmo dia (punção de calcâneo, aspiração traqueal e troca de curativo de cateter central). Baseando-se nas evidências científicas atuais sobre o manejo da dor neonatal, qual seria a abordagem mais adequada?",
      options: [
        "Administração profilática de analgésicos opioides por via intravenosa antes de cada procedimento, independentemente da intensidade do estímulo doloroso, para garantir completa analgesia durante todas as intervenções",
        "Utilização exclusiva de anestésicos tópicos aplicados nos locais de punção ou manipulação como medida analgésica principal, evitando completamente medicações sistêmicas devido ao risco de efeitos adversos em prematuros",
        "Implementação de protocolos de sedação leve contínua durante todo o período dos procedimentos, mantendo o neonato em estado de sonolência para minimizar a percepção e memorização da experiência dolorosa",
        "Ausência de intervenções específicas para manejo da dor, considerando que recém-nascidos prematuros desta idade gestacional possuem limiar de dor naturalmente elevado e sistema nervoso imaturo para processamento completo da experiência dolorosa",
        "Combinação estratégica de métodos não-farmacológicos (como sucção não-nutritiva com solução adocicada, contenção facilitada, enrolamento) e intervenções farmacológicas escalonadas conforme a intensidade e invasividade de cada procedimento específico"
      ],
      correctAnswer: 4,
      category: "Dor Neonatal",
      explanation: "A abordagem mais adequada é a combinação de métodos não-farmacológicos e farmacológicos conforme a intensidade de cada procedimento. Para procedimentos leves a moderados, a combinação de solução adocicada (glicose 25% ou sacarose), sucção não-nutritiva e técnicas de contenção facilitada oferece efeito sinérgico. Para procedimentos mais invasivos, pode-se adicionar analgesia farmacológica. O manejo multimodal da dor é recomendado pelas diretrizes atuais, evitando tanto a subdose quanto a exposição desnecessária a medicamentos."
    },
    {
      question: "Um neonato de 28 semanas de idade gestacional está em ventilação mecânica e necessita de um procedimento doloroso. Durante o procedimento, você observa os seguintes sinais: sobrancelhas salientes, olhos espremidos firmemente fechados, sulco nasolabial aprofundado, boca aberta e estirada, tremor de queixo e língua tensa. De acordo com a escala NFCS (Neonatal Facial Coding System), como você interpretaria estes achados?",
      options: [
        "Resposta comportamental normal em prematuros, sem indicativo de dor",
        "Reação exagerada, sugerindo hipersensibilidade ao toque",
        "Comportamento de estresse não específico, sem relação com dor",
        "Manifestação típica de dor aguda, evidenciada pelos movimentos faciais característicos",
        "Sinais de sedação inadequada, não relacionados à percepção dolorosa"
      ],
      correctAnswer: 3,
      category: "Dor Neonatal",
      explanation: "Os sinais faciais descritos (sobrancelhas salientes, olhos espremidos, sulco nasolabial aprofundado, boca aberta e estirada, tremor de queixo e língua tensa) são exatamente os componentes da escala NFCS, que avalia especificamente as expressões faciais durante eventos dolorosos. Estes movimentos faciais são altamente específicos para dor aguda em neonatos, mesmo em prematuros, e representam uma resposta comportamental consistente e validada para avaliação da dor neonatal."
    },
    {
      question: "Um recém-nascido a termo de 3 dias de vida será submetido a um procedimento de punção lombar diagnóstica. A equipe médica questiona qual estratégia não-farmacológica baseada em evidências seria mais eficaz para reduzir a dor durante este procedimento. Qual das seguintes opções você recomendaria?",
      options: [
        "Aplicação localizada de compressa fria no local da punção por aproximadamente 30 segundos imediatamente antes do procedimento, visando anestesia por diminuição da condução nervosa local",
        "Oferta de solução concentrada de sacarose (24%) por via oral, aproximadamente 2 minutos antes do procedimento, combinada com posicionamento adequado e contenção facilitada durante a intervenção",
        "Implementação de protocolo intensivo de musicoterapia com volume sonoro moderadamente elevado, utilizando melodias rítmicas para mascarar estímulos ambientais adversos e promover distração sensorial",
        "Aplicação de técnicas de contenção física com imobilização completa dos quatro membros, garantindo estabilidade absoluta durante o procedimento e minimizando o risco de movimentação e lesão iatrogenica",
        "Amamentação iniciada entre 2-5 minutos antes do procedimento e mantida continuamente durante toda a intervenção, combinando os efeitos analgésicos do contato materno, sucção nutritiva e propriedades do leite materno"
      ],
      correctAnswer: 4,
      category: "Dor Neonatal",
      explanation: "A amamentação iniciada 2-5 minutos antes e mantida durante o procedimento é a estratégia não-farmacológica com maior evidência científica para redução da dor durante procedimentos como punção lombar em recém-nascidos a termo. A amamentação combina múltiplos elementos analgésicos: contato pele a pele, sucção, sabor adocicado do leite materno e contenção leve. Estudos demonstram que esta abordagem reduz significativamente os escores de dor, o tempo de choro e as alterações fisiológicas durante procedimentos dolorosos."
    },
    {
      question: "Um recém-nascido prematuro de 30 semanas, atualmente com 33 semanas de idade corrigida, demonstra os seguintes sinais durante um procedimento doloroso: saturação de O₂ de 88% (queda de 5% em relação à linha de base), frequência cardíaca de 175 bpm (aumento de 20 bpm), expressão facial de dor (sobrancelhas franzidas, olhos espremidos), extensão de membros com hipertonia e choro. Após o procedimento, ele permanece agitado por mais de 10 minutos. Como você classificaria esta resposta à dor?",
      options: [
        "Resposta exagerada, indicando possível hipersensibilidade patológica",
        "Resposta atenuada típica de prematuros, que têm menor capacidade de expressar dor",
        "Resposta adequada à dor aguda, compatível com a idade gestacional",
        "Sinais de estresse não específico, sem relação com experiência dolorosa",
        "Resposta prolongada, sugerindo dor persistente que necessita intervenção farmacológica"
      ],
      correctAnswer: 4,
      category: "Dor Neonatal",
      explanation: "A resposta descrita indica dor persistente que necessita intervenção farmacológica. Embora os sinais durante o procedimento sejam esperados (alterações fisiológicas e comportamentais), a persistência da agitação por mais de 10 minutos após o término do estímulo doloroso sugere que a dor não foi adequadamente manejada. Prematuros podem ter maior sensibilidade e respostas prolongadas à dor, sendo importante não apenas a prevenção/tratamento durante o procedimento, mas também a observação e intervenção no período posterior."
    },
    {
      question: "Um estudo clínico está avaliando a eficácia de diferentes intervenções para manejo da dor durante a inserção de PICC (Cateter Central de Inserção Periférica) em prematuros. Os pesquisadores utilizaram a escala PIPP-R (Premature Infant Pain Profile-Revised) para mensurar a resposta à dor. Por que esta escala é considerada mais apropriada para prematuros em comparação com outras escalas de dor neonatal?",
      options: [
        "Por basear-se exclusivamente na avaliação de parâmetros comportamentais observáveis, excluindo completamente indicadores fisiológicos que apresentam alta variabilidade e instabilidade em recém-nascidos prematuros",
        "Por ser a única escala validada internacionalmente para utilização específica em ambiente de Unidade de Terapia Intensiva Neonatal, tendo sido testada em diferentes populações e contextos clínicos",
        "Por apresentar a vantagem significativa de não requerer qualquer tipo de equipamento específico ou monitorização especial para sua aplicação, facilitando o uso rotineiro mesmo em unidades com recursos limitados",
        "Por incorporar metodologicamente ajustes específicos para a idade gestacional e estado comportamental prévio ao procedimento doloroso, reconhecendo as particularidades da expressão da dor em diferentes estágios de maturidade neurológica",
        "Por ser comprovadamente a escala mais rápida e simples de aplicar em ambiente crítico, exigindo menos de 30 segundos para avaliação completa, o que garante sua viabilidade durante procedimentos de emergência"
      ],
      correctAnswer: 3,
      category: "Dor Neonatal",
      explanation: "A escala PIPP-R é considerada mais apropriada para prematuros porque inclui ajustes para a idade gestacional e estado comportamental prévio ao procedimento doloroso. Esta característica é essencial, pois reconhece que prematuros em diferentes idades gestacionais podem apresentar respostas comportamentais e fisiológicas distintas à dor. A escala considera que prematuros mais jovens possuem menor capacidade de manifestar respostas comportamentais robustas, fornecendo pontuação ajustada que evita a subestimação da dor nesta população vulnerável."
    },

    // MÉTODO CANGURU (5 questões)
    {
      question: "Uma mãe de gêmeos prematuros (32 semanas), atualmente com 34 semanas de idade corrigida e peso de 1.600g cada, manifesta ansiedade sobre como poderá realizar o Método Canguru com ambos os bebês. Qual orientação baseada em evidências seria mais apropriada por parte do fisioterapeuta?",
      options: [
        "Desaconselhar o Método Canguru com gêmeos, pois aumenta o risco de intercorrências respiratórias",
        "Recomendar que o Método Canguru seja realizado alternadamente com cada bebê, nunca simultaneamente",
        "Orientar técnicas de posicionamento seguro para realizar o Método Canguru simultaneamente com ambos os bebês, incluindo suporte adequado para cabeças e vias aéreas",
        "Sugerir que apenas o pai realize o Método Canguru, já que a mãe não conseguirá executá-lo adequadamente com gêmeos",
        "Adiar o início do Método Canguru até que os bebês atinjam 2.000g cada, quando terão maior estabilidade"
      ],
      correctAnswer: 2,
      category: "Método Canguru",
      explanation: "A orientação mais apropriada é ensinar técnicas de posicionamento seguro para realizar o Método Canguru simultaneamente com ambos os bebês. Estudos demonstram que o Método Canguru pode ser realizado com segurança e eficácia em gêmeos simultaneamente, desde que sejam respeitados princípios de posicionamento que garantam estabilidade respiratória e térmica. O fisioterapeuta deve ensinar técnicas específicas, incluindo suporte adequado para cabeça e vias aéreas, garantindo semiflexão e leve lateralização da cabeça, evitando obstrução das vias aéreas e permitindo contato visual entre mãe e bebês."
    },
    {
      question: "Um recém-nascido prematuro de 28 semanas, atualmente com 32 semanas de idade corrigida, peso de 1.400g, está em ar ambiente com estabilidade clínica e iniciará o Método Canguru. Durante a primeira sessão, apresenta queda na saturação de oxigênio (88-90%) e aumento da frequência respiratória. A mãe demonstra insegurança e questiona se o método está prejudicando seu filho. Qual conduta o fisioterapeuta deve adotar?",
      options: [
        "Interromper definitivamente o Método Canguru, pois este prematuro não apresenta estabilidade clínica suficiente",
        "Avaliar o posicionamento, realizar ajustes na postura (especialmente alinhamento e inclinação da cabeça) e monitorar parâmetros vitais por 15-20 minutos antes de decidir pela continuidade",
        "Manter o posicionamento inalterado por pelo menos 60 minutos, pois as alterações são transitórias e tendem a estabilizar espontaneamente",
        "Solicitar prescrição de oxigenoterapia suplementar durante as sessões de Método Canguru",
        "Adiar o Método Canguru até que o bebê atinja 1.800g, quando terá maior estabilidade respiratória"
      ],
      correctAnswer: 1,
      category: "Método Canguru",
      explanation: "A conduta mais adequada é avaliar o posicionamento, realizar ajustes na postura e monitorar os parâmetros vitais. Alterações como queda na saturação e taquipneia durante o Método Canguru frequentemente estão relacionadas a posicionamento inadequado, especialmente flexão excessiva do pescoço ou compressão torácica. O fisioterapeuta deve verificar a posição da cabeça (leve extensão, evitando flexão excessiva), inclinação do tronco (semi-reclinado entre 30-45°) e livre expansão torácica. Após os ajustes, é fundamental monitorar os parâmetros por 15-20 minutos, pois a maioria dos bebês apresenta estabilização ou melhora dos sinais vitais."
    },
    {
      question: "Um prematuro de 34 semanas, atualmente com 15 dias de vida (36 semanas de idade corrigida), peso de 1.950g, está na segunda fase do Método Canguru. Durante avaliação fisioterapêutica, são observadas retrações intercostais leves e uso de musculatura acessória quando posicionado em decúbito dorsal no berço, que melhoram significativamente durante o contato pele a pele. Os pais questionam sobre o impacto do Método Canguru na função respiratória. Qual seria a explicação fisiopatológica mais adequada para este achado?",
      options: [
        "O contato pele a pele diminui o consumo de oxigênio pela melhora da termorregulação, reduzindo a demanda metabólica",
        "A posição vertical favorece a sincronia toracoabdominal e melhora a mecânica diafragmática, otimizando a ventilação",
        "O Método Canguru induz broncodilatação mediada por ocitocina durante o contato materno",
        "O calor materno fluidifica secreções e facilita a depuração mucociliar",
        "A respiração materna induz um padrão de acoplamento respiratório no bebê, atuando como um metrônomo externo"
      ],
      correctAnswer: 1,
      category: "Método Canguru",
      explanation: "A explicação fisiopatológica mais adequada é que a posição vertical durante o Método Canguru favorece a sincronia toracoabdominal e melhora a mecânica diafragmática. Em prematuros, que frequentemente apresentam imaturidade da musculatura respiratória e maior complacência da caixa torácica, a posição vertical com leve inclinação proporciona melhor relação comprimento-tensão do diafragma, reduz o efeito da pressão abdominal sobre este músculo e diminui o trabalho respiratório. Estudos demonstram que esta posição melhora parâmetros ventilatórios como volume corrente e capacidade residual funcional, além de reduzir assincronia toracoabdominal frequentemente observada em prematuros."
    },
    {
      question: "Um prematuro de 32 semanas, atualmente com 38 semanas de idade corrigida, está na terceira fase do Método Canguru e comparece para acompanhamento ambulatorial. Durante a avaliação fisioterapêutica, observam-se atrasos em alguns marcos motores: controle cefálico incompleto, dificuldade para manter-se em prono com apoio de antebraços e ausência de direcionamento das mãos à linha média. Os pais relatam que fazem o Método Canguru apenas uma vez ao dia, por 20 minutos, pois acreditam que o bebê precisa 'treinar' ficar em supino no berço para se desenvolver melhor. Qual orientação o fisioterapeuta deve fornecer?",
      options: [
        "Suspender o Método Canguru e iniciar fisioterapia motora convencional três vezes por semana",
        "Manter o tempo atual de Método Canguru, complementado com posicionamento exclusivo em supino no berço",
        "Aumentar a duração e frequência do Método Canguru, orientar períodos supervisionados em prono quando acordado, e ensinar técnicas de facilitação do desenvolvimento neuropsicomotor durante as atividades diárias",
        "Substituir o Método Canguru por alongamentos passivos diários realizados pelos pais",
        "Prescrever órteses de posicionamento para uso durante o sono"
      ],
      correctAnswer: 2,
      category: "Método Canguru",
      explanation: "A orientação mais adequada é aumentar a duração e frequência do Método Canguru, orientar períodos supervisionados em prono quando acordado ('tummy time'), e ensinar técnicas de facilitação do desenvolvimento neuropsicomotor durante as atividades diárias. O contato pele a pele prolongado proporciona estímulos proprioceptivos, vestibulares e táteis que favorecem o desenvolvimento neuromotor. A posição prona supervisionada, quando o bebê está acordado, estimula o controle cefálico, fortalece a musculatura extensora e facilita a organização da linha média. As técnicas de facilitação integradas às atividades diárias (troca de fraldas, banho, alimentação) potencializam o desenvolvimento através da repetição e variabilidade de experiências sensório-motoras."
    },
    {
      question: "Uma mãe de um prematuro tardio (36 semanas) com 20 dias de vida, em aleitamento materno exclusivo, relata dificuldades na amamentação durante as sessões de Método Canguru. O bebê apresenta tosse, engasgos frequentes e períodos de dessaturação (quedas até 89-90%) durante a mamada na posição canguru. Na avaliação, observa-se hipotonia leve generalizada, reflexo de procura presente mas débil, e coordenação sucção-deglutição-respiração ainda imatura. Qual seria a intervenção mais apropriada do fisioterapeuta?",
      options: [
        "Contraindicar o aleitamento materno durante o Método Canguru, orientando que sejam momentos separados",
        "Recomendar transição para aleitamento artificial com fórmula espessada",
        "Orientar técnicas de posicionamento específicas durante o Método Canguru para facilitar o aleitamento seguro, incluindo elevação mais vertical, suporte adequado de cabeça e pausas frequentes",
        "Suspender temporariamente o Método Canguru até que o bebê apresente coordenação sucção-deglutição-respiração madura",
        "Indicar uso de sonda nasogástrica para alimentação durante as sessões de Método Canguru"
      ],
      correctAnswer: 2,
      category: "Método Canguru",
      explanation: "A intervenção mais apropriada é orientar técnicas de posicionamento específicas durante o Método Canguru para facilitar o aleitamento seguro. Em prematuros tardios com imaturidade na coordenação sucção-deglutição-respiração, o posicionamento adequado pode minimizar significativamente o risco de engasgos e dessaturação. O fisioterapeuta deve ensinar: posição mais verticalizada (60-80° de inclinação), suporte adequado da cabeça em leve extensão para manter vias aéreas alinhadas, técnicas de compressão mamária para facilitar o fluxo de leite, e orientação para pausas frequentes durante a mamada, permitindo períodos de recuperação respiratória. Esta abordagem preserva os benefícios combinados do Método Canguru e aleitamento materno, fundamentais para o desenvolvimento do prematuro."
    },

    // HIDROTERAPIA EM NEONATOS (5 questões)
    {
      question: "Um recém-nascido prematuro de 34 semanas, atualmente com 38 semanas de idade corrigida e peso de 2.100g, apresenta hipertonia extensora de membros inferiores e hiperextensão cervical. A equipe médica solicita avaliação para possível indicação de hidroterapia. Durante sua avaliação, você observa: controle cefálico incompleto, retração escapular, reações posturais deficientes e irritabilidade ao manuseio. Quais parâmetros específicos você deve monitorar durante a primeira sessão de hidroterapia?",
      options: [
        "Apenas os parâmetros básicos de frequência cardíaca e saturação de oxigênio, uma vez que outros sinais vitais tendem a permanecer estáveis durante a imersão aquática em temperatura adequada",
        "Exclusivamente as respostas comportamentais como expressão facial, padrão de choro e estado de alerta, pois são os indicadores mais sensíveis de conforto e adaptação ao meio aquático",
        "Apenas a temperatura axilar do bebê, mantendo-a rigorosamente entre 36,5°C e 37,0°C, ignorando outros parâmetros fisiológicos que apresentam maior variabilidade natural",
        "Somente os parâmetros respiratórios, incluindo frequência respiratória e presença de retrações, já que são os primeiros a se alterarem em caso de intolerância à terapia",
        "Múltiplos parâmetros de forma simultânea e contínua: temperatura axilar, saturação de oxigênio, frequência cardíaca, estado comportamental, resposta à manipulação e alterações nas respostas posturais durante a intervenção"
      ],
      correctAnswer: 4,
      category: "Hidroterapia em Neonatos",
      explanation: "Durante a primeira sessão de hidroterapia neonatal, é fundamental monitorar: temperatura axilar (para detectar hipotermia, contraindicação absoluta para continuidade), saturação de oxigênio (detectar alterações respiratórias), frequência cardíaca (taquicardia ou bradicardia indicam intolerância), estado comportamental (irritabilidade ou sonolência excessiva são sinais de estresse) e respostas posturais (hipertonia persistente ou hipotonia súbita são sinais de alerta). Este monitoramento multiparamétrico permite avaliação contínua da tolerância fisiológica e comportamental, fundamentais para segurança e eficácia da intervenção em neonatos vulneráveis."
    },
    {
      question: "Um prematuro de 32 semanas, atualmente com 37 semanas de idade corrigida e 2.050g, diagnosticado com displasia broncopulmonar leve, iniciará hidroterapia. Nas primeiras sessões na piscina aquecida (36,8°C), apresentou melhora significativa dos parâmetros respiratórios, com redução da frequência respiratória de 65 para 48 rpm, diminuição das retrações intercostais e melhora da ausculta pulmonar. Qual mecanismo fisiológico melhor explica estes benefícios respiratórios?",
      options: [
        "Broncodilatação induzida pelo calor da água",
        "Efeito da pressão hidrostática sobre a caixa torácica, favorecendo maior eficiência ventilatória",
        "Diminuição da viscosidade do muco pela umidade do ambiente",
        "Aumento da perfusão pulmonar por vasodilatação periférica",
        "Indução de tosse produtiva pela imersão"
      ],
      correctAnswer: 1,
      category: "Hidroterapia em Neonatos",
      explanation: "O mecanismo fisiológico que melhor explica os benefícios respiratórios observados é o efeito da pressão hidrostática sobre a caixa torácica. A imersão em água aquecida até o nível do tórax cria uma pressão hidrostática gradiente que: (1) oferece resistência à inspiração, fortalecendo a musculatura inspiratória; (2) facilita a expiração por compressão torácica, auxiliando a eliminação de ar retido em pacientes com obstrução como na displasia broncopulmonar; (3) aumenta a pressão transmural nas vias aéreas, reduzindo a tendência ao colapso; e (4) melhora a relação ventilação-perfusão. Estes efeitos resultam em padrão respiratório mais eficiente, com redução da frequência respiratória e melhora da mecânica ventilatória."
    },
    {
      question: "Na avaliação para hidroterapia de um recém-nascido a termo de 10 dias com diagnóstico de hipertonia congênita a esclarecer, você identifica os seguintes sinais: abertura limitada das mãos, polegar aduzido e em flexão, dificuldade de abdução dos quadris, hiperreflexia patelar bilateral e clônus aquileu esgotável. A mãe questiona se a hidroterapia pode auxiliar no manejo da hipertonia. Com base nas evidências científicas, qual seria sua resposta?",
      options: [
        "A hidroterapia é contraindicada para hipertonia de origem central, pois pode aumentar o tônus pela estimulação sensorial excessiva",
        "A hidroterapia tem benefícios limitados, sendo indicada apenas após 3 meses de idade",
        "A hidroterapia é potencialmente benéfica por combinar efeitos térmicos, mecânicos e sensoriais que favorecem a redução temporária do tônus, facilitando a aquisição de padrões motores mais funcionais",
        "A hidroterapia deve ser evitada em casos de hipertonia congênita até a conclusão da investigação diagnóstica",
        "A hidroterapia tem eficácia comprovada apenas para hipertonias de origem periférica, não para casos de origem central"
      ],
      correctAnswer: 2,
      category: "Hidroterapia em Neonatos",
      explanation: "A hidroterapia é potencialmente benéfica para recém-nascidos com hipertonia por combinar múltiplos efeitos terapêuticos: (1) o efeito térmico da água aquecida (36,5-37°C) promove relaxamento muscular por redução da atividade fusimotora; (2) a flutuabilidade diminui os efeitos da gravidade, facilitando movimentos que seriam difíceis em terra; (3) a pressão hidrostática proporciona input proprioceptivo constante, que pode modular o tônus; e (4) o ambiente aquático oferece estimulação sensorial multimodal que favorece a neuroplasticidade. Estudos mostram que estes efeitos combinados podem reduzir temporariamente a hipertonia, criando uma 'janela terapêutica' para trabalhar padrões motores mais funcionais e experiências sensório-motoras variadas."
    },
    {
      question: "Durante uma sessão de hidroterapia, um neonato de 39 semanas com 15 dias de vida, previamente diagnosticado com encefalopatia hipóxico-isquêmica moderada, apresenta súbita deterioração do estado comportamental, com diminuição do nível de consciência, extremidades moteadas e bradicardia leve (FC=90 bpm). Qual deve ser a conduta imediata do fisioterapeuta?",
      options: [
        "Intensificar a estimulação sensorial para reverter o quadro",
        "Mudar a posição do bebê na água, mas continuar a terapia para avaliar se há melhora",
        "Administrar oxigênio suplementar e manter a sessão por mais 5 minutos",
        "Remover imediatamente o bebê da água, secar e aquecer rapidamente, monitorar sinais vitais e acionar equipe médica",
        "Reduzir a temperatura da água para estimular resposta adrenérgica"
      ],
      correctAnswer: 3,
      category: "Hidroterapia em Neonatos",
      explanation: "A conduta imediata deve ser remover o bebê da água, secá-lo e aquecê-lo rapidamente, monitorar continuamente os sinais vitais e acionar a equipe médica. Os sinais apresentados (deterioração do nível de consciência, extremidades moteadas e bradicardia) sugerem instabilidade hemodinâmica aguda, possivelmente desencadeada por hipotermia, alteração cardiovascular ou neurológica. Em bebês com histórico de encefalopatia hipóxico-isquêmica, estas alterações podem indicar comprometimento da autorregulação cerebral ou cardiovascular. A prioridade é estabilizar o paciente, prevenir perda adicional de calor e permitir avaliação médica imediata para determinar a causa e tratamento específico."
    },
    {
      question: "Um recém-nascido a termo de 25 dias, com diagnóstico de Síndrome de Down e hipotonia generalizada, iniciará um programa de hidroterapia. Durante a avaliação pré-intervenção, você observa: dificuldade de controle cefálico, hipermobilidade articular, ligamentos frouxos e episódios de apneia leve durante a alimentação. A mãe questiona qual a melhor abordagem para a primeira sessão de hidroterapia. Qual seria sua recomendação baseada em evidências?",
      options: [
        "Contraindicar a hidroterapia até os 3 meses, devido aos episódios de apneia",
        "Iniciar com imersão total, incluindo face, para estimular o reflexo de mergulho",
        "Começar com sessão curta (5-10 minutos), imersão até o nível do tórax, com ênfase em estabilização cervical e tronco, monitorando continuamente os sinais vitais e comportamentais",
        "Utilizar técnicas de turbulência e correntes fortes para estimulação proprioceptiva intensa",
        "Iniciar com temperatura da água mais baixa (33-34°C) para estimular tônus muscular"
      ],
      correctAnswer: 2,
      category: "Hidroterapia em Neonatos",
      explanation: "A abordagem mais adequada é iniciar com sessão curta (5-10 minutos), imersão até o nível do tórax, com ênfase em estabilização cervical e tronco, monitorando continuamente os sinais vitais e comportamentais. Esta abordagem considera as particularidades da Síndrome de Down: a hipotonia generalizada e frouxidão ligamentar exigem cuidado especial com a estabilização cervical para evitar sobrecarga nas estruturas atlanto-axiais (instabilidade comum nesta síndrome). Os episódios de apneia durante alimentação sugerem imaturidade no controle respiratório, sendo prudente evitar imersão facial inicialmente. Sessões curtas permitem avaliar a tolerância fisiológica e comportamental, fundamentais para segurança e progressão do tratamento."
    },

    // SEQUELAS NEUROLÓGICAS EM PREMATUROS (5 questões)
    {
      question: "Recém-nascido prematuro de 28 semanas apresentou hemorragia peri-intraventricular grau III à direita na primeira semana de vida. Atualmente com 6 meses de idade corrigida, demonstra assimetria postural com preferência por rotação cefálica para a esquerda, membro superior direito com padrão flexor persistente e membro inferior direito com rigidez à mobilização passiva. Qual alteração do neurodesenvolvimento é mais provável neste caso?",
      options: [
        "Paralisia cerebral discinética",
        "Paralisia cerebral hemiplégica à direita",
        "Ataxia cerebelar congênita",
        "Transtorno de coordenação motora leve",
        "Hemiparesia flácida transitória"
      ],
      correctAnswer: 1,
      category: "Sequelas Neurológicas em Prematuros",
      explanation: "A hemorragia peri-intraventricular grau III à direita frequentemente lesa estruturas periventriculares do hemisfério cerebral direito, resultando em sequelas motoras contralaterais (lado esquerdo do corpo). No entanto, o quadro descrito apresenta sinais clássicos de hemiparesia espástica à direita (membro superior com padrão flexor persistente e membro inferior com rigidez à mobilização), o que sugere que a lesão principal afetou o hemisfério esquerdo, provavelmente por lesão isquêmica associada ou leucomalácia periventricular, frequentemente concomitante à HPIV em prematuros extremos."
    },
    {
      question: "Um prematuro de 30 semanas, atualmente com 18 meses de idade corrigida, apresenta atraso no desenvolvimento da linguagem expressiva (apenas 2-3 palavras com significado), mas desenvolvimento motor grosseiro aparentemente normal. Na avaliação neurológica, observam-se alterações sutis da coordenação, dificuldade na preensão fina e déficit de atenção compartilhada. Ressonância magnética prévia havia identificado lesão difusa da substância branca periventricular. Qual perfil cognitivo-comportamental este paciente provavelmente desenvolverá em idade escolar?",
      options: [
        "Quadro global de deficiência intelectual severa e progressiva, comprometendo todos os domínios cognitivos e necessitando suporte educacional especializado contínuo com adaptações curriculares significativas",
        "Alterações exclusivamente relacionadas ao domínio da linguagem expressiva e receptiva, sem qualquer impacto em outras funções cognitivas, executivas ou de interação social durante o desenvolvimento escolar",
        "Padrão característico de comprometimento específico das funções executivas (planejamento, memória operacional, controle inibitório) e habilidades visuoespaciais, frequentemente manifestando-se como transtorno de aprendizagem não-verbal",
        "Manifestações compatíveis com transtorno do espectro autista clássico, caracterizado por interesses restritos, comportamentos estereotipados, alterações sensoperceptivas significativas e comprometimento grave da reciprocidade socioemocional",
        "Desenvolvimento cognitivo-comportamental completamente normal a partir dos 24 meses, com recuperação espontânea das funções neurológicas comprometidas devido à neuroplasticidade intensificada nos primeiros anos de vida"
      ],
      correctAnswer: 2,
      category: "Sequelas Neurológicas em Prematuros",
      explanation: "Prematuros com lesão difusa da substância branca periventricular frequentemente desenvolvem um perfil neuropsicológico caracterizado por déficits específicos nas funções executivas (atenção, memória operacional, controle inibitório, flexibilidade cognitiva) e habilidades visuoespaciais, mesmo com QI global normal ou limítrofe. Estas alterações se manifestam clinicamente como transtorno de aprendizagem não-verbal, dificuldades na matemática, compreensão de leitura, integração visuomotora e habilidades sociais pragmáticas. As conexões de substância branca afetadas na prematuridade são particularmente importantes para redes neurais envolvidas nestas funções."
    },
    {
      question: "Um prematuro extremo (26 semanas), atualmente com 4 meses de idade corrigida, passou por ultrassonografia transfontanelar seriada que identificou leucomalácia periventricular cística bilateral extensa. Na avaliação atual, observa-se controle cefálico parcial, hipertonia de membros inferiores com padrão extensor e cruzamento adutório, reflexos tendíneos exaltados e clônus aquileu bilateral. Qual intervenção fisioterapêutica precoce seria mais indicada neste caso?",
      options: [
        "Apenas observação clínica trimestral, sem intervenção específica até os 12 meses",
        "Programa intensivo de fortalecimento muscular com resistência progressiva",
        "Órteses rígidas de posicionamento em membros inferiores",
        "Intervenção baseada em neurodesenvolvimento com controle de tônus, facilitação de padrões posturais adequados e orientação familiar para estimulação sensório-motora em ambiente natural",
        "Bloqueio neuroquímico com toxina botulínica em adutores e flexores plantares"
      ],
      correctAnswer: 3,
      category: "Sequelas Neurológicas em Prematuros",
      explanation: "A leucomalácia periventricular cística bilateral extensa é um forte preditor de paralisia cerebral espástica, já evidenciada pelos sinais neurológicos descritos (hipertonia de membros inferiores com padrão extensor e cruzamento adutório, hiperreflexia e clônus). A intervenção fisioterapêutica precoce mais indicada é baseada nos princípios do neurodesenvolvimento, incluindo técnicas de modulação do tônus, facilitação de alinhamento e movimentos mais funcionais, e orientação familiar para atividades em ambiente natural. Esta abordagem aproveita a neuroplasticidade desta fase crítica do desenvolvimento, buscando prevenir deformidades secundárias e favorecer a aquisição de padrões motores mais adequados."
    },
    {
      question: "Durante avaliação do neurodesenvolvimento de um prematuro de 32 semanas, atualmente com 8 meses de idade corrigida, são observados os seguintes achados: dificuldade de manutenção da atenção, resposta exagerada a estímulos sensoriais, irritabilidade frequente, padrão de sono irregular e dificuldade para autorregulação durante transições de atividades. Exames de neuroimagem não evidenciaram lesões estruturais significativas. Qual hipótese diagnóstica melhor explica estes achados?",
      options: [
        "Transtorno do espectro autista precoce",
        "Transtorno de déficit de atenção e hiperatividade",
        "Distúrbio regulatório do processamento sensorial associado à prematuridade",
        "Transtorno de ansiedade generalizada infantil",
        "Manifestações comportamentais normais para a idade corrigida"
      ],
      correctAnswer: 2,
      category: "Sequelas Neurológicas em Prematuros",
      explanation: "Os achados descritos são característicos do distúrbio regulatório do processamento sensorial associado à prematuridade. Prematuros frequentemente apresentam dificuldades na modulação sensorial (hiper ou hiporresponsividade a estímulos), problemas de autorregulação e organização comportamental. Estas alterações decorrem do desenvolvimento neurológico atípico em ambiente extrauterino, exposição a estímulos sensoriais inapropriados durante período crítico de desenvolvimento cerebral, estresse neonatal e possíveis micro-lesões não detectáveis em exames convencionais. Este distúrbio pode persistir até a idade escolar, manifestando-se como dificuldades atencionais, comportamentais e de aprendizagem."
    },
    {
      question: "Um prematuro de 29 semanas, atualmente com 12 meses de idade corrigida, apresenta atraso significativo na aquisição da marcha independente. Na avaliação fisioterapêutica, observa-se diparesia espástica leve, com maior comprometimento distal dos membros inferiores. Ressonância magnética realizada aos 6 meses identificou leucomalácia periventricular bilateral simétrica, predominante em regiões posteriores. A mãe questiona sobre o prognóstico funcional da marcha. Qual resposta seria mais apropriada?",
      options: [
        "A criança não desenvolverá marcha funcional devido à extensão da lesão cerebral",
        "A marcha será adquirida normalmente até os 18 meses de idade corrigida, sem sequelas",
        "Há alta probabilidade de aquisição de marcha independente, possivelmente entre 18-24 meses, com padrão equinovaro e possível necessidade de órteses suropodálicas",
        "A criança necessitará de dispositivos auxiliares permanentes como andadores ou muletas",
        "O desenvolvimento motor será normalizado completamente com fisioterapia intensiva três vezes por semana"
      ],
      correctAnswer: 2,
      category: "Sequelas Neurológicas em Prematuros",
      explanation: "O prognóstico mais provável para este caso é a aquisição de marcha independente entre 18-24 meses, com padrão equinovaro e possível necessidade de órteses suropodálicas. A leucomalácia periventricular bilateral simétrica, predominante em regiões posteriores, afeta principalmente as fibras descendentes que controlam os membros inferiores (diparesia espástica). Quando a manifestação clínica é leve a moderada aos 12 meses, e a lesão é predominantemente posterior, o prognóstico para marcha independente é geralmente favorável, embora com atraso na aquisição e alterações qualitativas do padrão (típico equinovaro). A maioria destas crianças se beneficia de órteses suropodálicas para otimizar o alinhamento e eficiência da marcha."
    },

    // SEQUELAS PULMONARES EM PREMATUROS (5 questões)
    {
      question: "Um prematuro extremo (26 semanas) com história de síndrome do desconforto respiratório grave e ventilação mecânica prolongada (45 dias) desenvolveu displasia broncopulmonar (DBP). Atualmente com 18 meses de idade corrigida, apresenta episódios recorrentes de sibilância desencadeados por infecções virais, com necessidade frequente de broncodilatadores. Na avaliação fisioterapêutica, observa-se aumento do diâmetro ântero-posterior do tórax, uso de musculatura acessória em repouso e ausculta com sibilos expiratórios difusos. Qual alteração fisiopatológica melhor explica este quadro clínico?",
      options: [
        "Aumento da complacência pulmonar com colapso expiratório das vias aéreas",
        "Redução da capacidade residual funcional com aumento do trabalho respiratório",
        "Diminuição do calibre das vias aéreas periféricas com aumento da resistência ao fluxo expiratório",
        "Aumento da produção de muco sem alteração da mecânica ventilatória",
        "Comprometimento exclusivo da força muscular inspiratória"
      ],
      correctAnswer: 2,
      category: "Sequelas Pulmonares em Prematuros",
      explanation: "A displasia broncopulmonar em prematuros extremos resulta em sequelas anatômicas e funcionais persistentes, incluindo diminuição do calibre das vias aéreas periféricas, aumento da reatividade brônquica e remodelamento da árvore brônquica. Estas alterações aumentam a resistência ao fluxo expiratório, manifestando-se clinicamente como sibilância recorrente, especialmente durante infecções virais que provocam inflamação adicional. O aumento do diâmetro ântero-posterior do tórax (tórax em barril) e o uso de musculatura acessória são adaptações à hiperinsuflação secundária, resultante da limitação ao fluxo expiratório."
    },
    {
      question: "Um lactente de 8 meses (idade cronológica), nascido com 30 semanas de idade gestacional, tem diagnóstico de displasia broncopulmonar moderada. Durante episódio de bronquiolite viral aguda, apresenta insuficiência respiratória com necessidade de internação. Os seguintes parâmetros são observados: FR=68 ipm, uso intenso de musculatura acessória, retração intercostal e subcostal, SpO₂=88% em ar ambiente. Ausculta pulmonar com sibilos expiratórios difusos e crepitações basais bilaterais. Qual estratégia fisioterapêutica seria mais adequada na fase aguda?",
      options: [
        "Técnicas de aceleração de fluxo expiratório forçado (AFE rápida) seguidas de aspiração nasotraqueal",
        "Manobras de compressão torácica vigorosa para mobilização de secreções",
        "Vibração torácica prolongada em todos os campos pulmonares",
        "Posicionamento otimizado, técnicas de desobstrução brônquica suaves com modulação de fluxo e estabilização torácica durante a tosse",
        "Apenas oxigenoterapia e hidratação, sem intervenção fisioterapêutica na fase aguda"
      ],
      correctAnswer: 3,
      category: "Sequelas Pulmonares em Prematuros",
      explanation: "Na fase aguda de uma bronquiolite em paciente com displasia broncopulmonar, a estratégia fisioterapêutica mais adequada consiste em posicionamento otimizado (elevação de tronco, leve extensão cervical), técnicas de desobstrução brônquica suaves com modulação de fluxo (evitando manobras forçadas que podem provocar broncoespasmo e colapso de vias aéreas instáveis) e estabilização torácica durante a tosse (para compensar a fraqueza muscular e aumentar a eficácia da eliminação de secreções). Esta abordagem considera as peculiaridades fisiopatológicas do ex-prematuro com DBP: vias aéreas colapsáveis, hiperreatividade brônquica, alteração da mecânica respiratória e diminuição da reserva funcional."
    },
    {
      question: "Um prematuro de 28 semanas com displasia broncopulmonar grave está em programação de alta hospitalar após 4 meses de internação. Mantém necessidade de oxigênio suplementar contínuo (0,5L/min em cânula nasal) e apresenta episódios frequentes de dessaturação durante a alimentação. A equipe multidisciplinar solicita avaliação fisioterapêutica para orientações domiciliares. Qual recomendação seria mais importante para prevenir complicações respiratórias após a alta?",
      options: [
        "Manter o bebê exclusivamente em posição de decúbito dorsal durante os períodos de sono, conforme recomendações internacionais para prevenção da síndrome da morte súbita infantil, independentemente das considerações respiratórias",
        "Implementar protocolo domiciliar intensivo de fisioterapia respiratória com técnicas de percussão torácica manual três vezes ao dia, independentemente da presença de secreções ou sinais de desconforto respiratório",
        "Orientar cuidadosamente os cuidadores sobre posicionamentos que otimizem a relação ventilação-perfusão, cuidados especiais durante a alimentação e reconhecimento precoce dos sinais de desconforto respiratório",
        "Instituir rotina profilática de nebulizações diárias com solução salina hipertônica (3%), associada ou não a broncodilatadores, independentemente da presença de sintomas ou ausculta pulmonar alterada",
        "Restringir rigorosamente o contato do bebê com outras crianças e ambientes externos por período mínimo de 12 meses, implementando isolamento social completo para evitar exposição a patógenos respiratórios"
      ],
      correctAnswer: 2,
      category: "Sequelas Pulmonares em Prematuros",
      explanation: "Para pacientes com displasia broncopulmonar grave em alta hospitalar, as recomendações mais importantes incluem orientações sobre posicionamentos que otimizem a relação ventilação-perfusão (elevação de tronco, alternância de decúbitos, evitando flexão cervical excessiva), cuidados durante a alimentação (pausas frequentes, posicionamento semi-vertical) e capacitação dos cuidadores para reconhecimento precoce de sinais de desconforto respiratório ou infecções. Esta abordagem preventiva é fundamental, pois estes pacientes têm reserva funcional reduzida e são extremamente vulneráveis a descompensações durante intercorrências comuns como infecções virais, aspiração durante alimentação ou posicionamentos inadequados."
    },
    {
      question: "Uma lactente de 15 meses de idade (12 meses corrigida), nascida com 29 semanas de idade gestacional, tem diagnóstico de displasia broncopulmonar. Apresenta atraso nas aquisições motoras: ainda não engatinha e tem dificuldade para manter-se sentada por períodos prolongados. Durante atividades como manipulação de brinquedos, observa-se aumento do trabalho respiratório. A avaliação respiratória revela padrão ventilatório predominantemente torácico, com limitada expansibilidade basal e uso de musculatura acessória durante esforços. Qual relação existe entre o quadro respiratório e o atraso motor?",
      options: [
        "Não há relação direta; o atraso motor decorre exclusivamente de lesão neurológica associada à prematuridade",
        "O atraso motor é secundário à oxigenoterapia prolongada, que causa fraqueza muscular generalizada",
        "O aumento do trabalho respiratório requer maior gasto energético, limitando a energia disponível para o desenvolvimento motor; além disso, a instabilidade do tronco prejudica o controle postural necessário para as aquisições motoras",
        "Medicações broncodilatadoras causam atraso no desenvolvimento neuropsicomotor como efeito colateral",
        "A relação é apenas temporal, sem nexo causal entre os problemas respiratórios e o desenvolvimento motor"
      ],
      correctAnswer: 2,
      category: "Sequelas Pulmonares em Prematuros",
      explanation: "Existe uma relação bidirecional entre a função respiratória comprometida e o atraso no desenvolvimento motor em prematuros com displasia broncopulmonar. O aumento do trabalho respiratório exige maior gasto energético, reduzindo a energia disponível para atividades motoras e exploração do ambiente. Além disso, o uso constante de musculatura acessória e o padrão ventilatório predominantemente torácico comprometem a estabilidade do tronco, prejudicando o desenvolvimento do controle postural, essencial para aquisições como sentar e engatinhar. As limitações na mobilidade torácica e função diafragmática também afetam a capacidade de gerar pressão intra-abdominal adequada, componente importante para estabilização central durante atividades motoras."
    },
    {
      question: "Um prematuro de 26 semanas com histórico de displasia broncopulmonar grave foi acompanhado longitudinalmente até os 7 anos de idade. Atualmente apresenta função pulmonar com padrão obstrutivo moderado, capacidade de exercício reduzida no teste de caminhada de 6 minutos (73% do previsto) e múltiplas hospitalizações por exacerbações respiratórias. Seus pais questionam sobre o prognóstico respiratório a longo prazo. Com base nas evidências científicas atuais, qual informação seria mais precisa?",
      options: [
        "A função pulmonar normalizará completamente na adolescência, sem sequelas na vida adulta",
        "O comprometimento é permanente e progressivo, com declínio contínuo da função pulmonar até a vida adulta",
        "A função pulmonar tende a melhorar gradualmente até a adolescência, mas permanecerá abaixo do normal, com risco aumentado para doença pulmonar obstrutiva crônica precoce na vida adulta",
        "Não há correlação entre a gravidade da displasia broncopulmonar na infância e o prognóstico pulmonar a longo prazo",
        "O prognóstico depende exclusivamente da adesão ao tratamento medicamentoso"
      ],
      correctAnswer: 2,
      category: "Sequelas Pulmonares em Prematuros",
      explanation: "Estudos longitudinais mostram que a função pulmonar em prematuros com displasia broncopulmonar grave tende a melhorar gradualmente até a adolescência, devido ao crescimento pulmonar e desenvolvimento de novas unidades alveolares (que continua até aproximadamente 8 anos de idade). No entanto, a função pulmonar geralmente permanece abaixo do normal, com padrão obstrutivo residual e hiperreatividade brônquica. Estes indivíduos apresentam risco aumentado para o desenvolvimento de doença pulmonar obstrutiva crônica precoce na vida adulta, especialmente se expostos a fatores adicionais como tabagismo, poluição ou infecções respiratórias recorrentes. O declínio fisiológico da função pulmonar com o envelhecimento começa a partir de um patamar inferior, podendo atingir níveis clinicamente significativos mais precocemente."
    },

    // ESCALAS DE AVALIAÇÃO EM NEONATOS (5 questões)
    {
      question: "Um fisioterapeuta avalia um recém-nascido prematuro de 32 semanas, atualmente com 36 semanas de idade corrigida, utilizando a escala TIMP (Test of Infant Motor Performance). Durante a avaliação, observa que o bebê apresenta pontuação significativamente abaixo do esperado para a idade corrigida, principalmente nos itens relacionados ao controle cefálico e reações posturais contra a gravidade. Os pais questionam sobre a confiabilidade deste resultado para predizer o desenvolvimento futuro. Qual seria a resposta mais apropriada?",
      options: [
        "A escala TIMP não é validada para prematuros, tornando o resultado irrelevante",
        "Pontuações baixas na TIMP entre 34-36 semanas têm valor preditivo significativo para atraso motor aos 12 meses, justificando intervenção precoce",
        "A avaliação só tem valor diagnóstico após os 6 meses de idade corrigida",
        "O resultado atual garante diagnóstico de paralisia cerebral futura",
        "A escala avalia apenas aspectos cognitivos, não permitindo conclusões sobre o desenvolvimento motor"
      ],
      correctAnswer: 1,
      category: "Escalas de Avaliação em Neonatos",
      explanation: "A escala TIMP (Test of Infant Motor Performance) é especificamente validada para avaliação de prematuros a partir de 34 semanas de idade gestacional até 4 meses de idade corrigida. Estudos longitudinais demonstram que pontuações significativamente abaixo do esperado entre 34-36 semanas têm valor preditivo significativo para atraso motor aos 12 meses. Esta escala avalia controle postural, alinhamento e movimentos seletivos contra a gravidade, sendo particularmente sensível para identificar alterações sutis no desenvolvimento motor precoce. Resultados abaixo do esperado justificam intervenção fisioterapêutica precoce para potencializar o desenvolvimento neuromotor, aproveitando a neuroplasticidade nesta fase crítica."
    },
    {
      question: "Durante avaliação de um recém-nascido a termo de 5 dias de vida com suspeita de encefalopatia hipóxico-isquêmica leve, o neurologista solicita aplicação da escala de Dubowitz/Ballard. Quais aspectos do neurodesenvolvimento são avaliados por esta escala?",
      options: [
        "Exclusivamente tônus muscular em diferentes segmentos corporais",
        "Apenas reflexos primitivos e sua intensidade",
        "Movimentos generalizados e qualidade dos movimentos espontâneos",
        "Múltiplos parâmetros neurológicos incluindo postura, tônus, reflexos primitivos, movimentos e comportamento",
        "Somente estados comportamentais e reatividade a estímulos"
      ],
      correctAnswer: 3,
      category: "Escalas de Avaliação em Neonatos",
      explanation: "A escala de Dubowitz/Ballard (Avaliação Neurológica do Recém-Nascido) é uma avaliação abrangente que inclui múltiplos parâmetros neurológicos: postura (observação do padrão postural em repouso), tônus muscular (avaliado em diferentes segmentos e em diferentes manobras passivas), reflexos primitivos (qualidade e intensidade), movimentos (quantidade, qualidade e simetria) e comportamento (estados de consciência, consolabilidade, irritabilidade). Esta escala é particularmente útil para detectar alterações neurológicas sutis em recém-nascidos com suspeita de encefalopatia hipóxico-isquêmica leve, fornecendo uma avaliação padronizada que pode ser repetida para monitoramento da evolução neurológica."
    },
    {
      question: "Um lactente nascido prematuro (30 semanas) será avaliado aos 4 meses de idade corrigida com a Alberta Infant Motor Scale (AIMS). A mãe pergunta quais aspectos específicos do desenvolvimento motor serão observados. Qual seria a resposta correta?",
      options: [
        "A escala avalia primariamente os reflexos primitivos e sua integração",
        "O teste mensura a força muscular em diferentes grupos musculares",
        "A avaliação foca na qualidade dos movimentos espontâneos e controle postural em quatro posições: prono, supino, sentado e em pé",
        "A AIMS examina principalmente a função cognitiva e sua relação com o movimento",
        "O teste avalia exclusivamente o controle cefálico e tronco em posição sentada"
      ],
      correctAnswer: 2,
      category: "Escalas de Avaliação em Neonatos",
      explanation: "A Alberta Infant Motor Scale (AIMS) é uma escala observacional que avalia a qualidade dos movimentos espontâneos e o controle postural em quatro posições distintas: prono, supino, sentado e em pé. Para cada posição, são observados aspectos específicos como alinhamento postural, transferência de peso, movimentos antigravitacionais e controle motor. A escala não utiliza manuseio ou facilitação, baseando-se na observação do comportamento motor espontâneo. É particularmente útil para prematuros por ser sensível a alterações sutis na qualidade do movimento e permitir acompanhamento longitudinal do desenvolvimento motor, com boa validade preditiva para desfechos motores futuros."
    },
    {
      question: "Na avaliação de um prematuro de 32 semanas, atualmente com 39 semanas de idade corrigida, o fisioterapeuta utiliza a Avaliação dos Movimentos Generalizados de Prechtl. O bebê apresenta 'writhing movements' (padrão de contorção) durante a avaliação. Como este achado deve ser interpretado?",
      options: [
        "Trata-se de um sinal patológico indicativo de lesão cerebral grave",
        "É um padrão normal esperado para esta idade, que precede o surgimento dos 'fidgety movements'",
        "Indica atraso no desenvolvimento motor, mas sem correlação com prognóstico neurológico",
        "Sugere distúrbio metabólico agudo requerendo investigação imediata",
        "É um achado não específico, sem valor diagnóstico ou prognóstico"
      ],
      correctAnswer: 1,
      category: "Escalas de Avaliação em Neonatos",
      explanation: "Na Avaliação dos Movimentos Generalizados de Prechtl, os 'writhing movements' (movimentos de contorção) são considerados um padrão normal esperado entre 36-46 semanas de idade gestacional. Caracterizam-se por movimentos de pequena a moderada amplitude, velocidade lenta a moderada, com sequência variável de flexão/extensão/rotação dos membros. Estes movimentos normalmente precedem o surgimento dos 'fidgety movements', que aparecem entre 6-20 semanas pós-termo. A presença de 'writhing movements' com qualidade normal (variáveis, fluentes, complexos) em um prematuro de 39 semanas de idade corrigida é, portanto, um achado favorável, sugerindo integridade dos sistemas neurais responsáveis pelo controle motor espontâneo."
    },
    {
      question: "Durante a aplicação da escala Bayley III em um lactente de 9 meses (6 meses de idade corrigida) nascido prematuro (32 semanas), são observadas dificuldades específicas nas tarefas que envolvem coordenação olho-mão e manipulação de objetos pequenos. O desenvolvimento cognitivo e de linguagem está dentro dos parâmetros esperados. Qual abordagem de intervenção precoce seria mais adequada com base nestes achados?",
      options: [
        "Encaminhamento para terapia de integração sensorial intensiva em ambiente clínico",
        "Estimulação exclusiva da função cognitiva para compensar o déficit motor",
        "Programa domiciliar focado em atividades funcionais que promovam experiências de coordenação bimanual, preensão e manipulação, integradas às rotinas diárias",
        "Abordagem 'wait and see', sem intervenção específica até a reavaliação aos 12 meses",
        "Treinamento de habilidades motoras grosseiras para posterior desenvolvimento da motricidade fina"
      ],
      correctAnswer: 2,
      category: "Escalas de Avaliação em Neonatos",
      explanation: "A abordagem mais adequada para um lactente com dificuldades específicas na coordenação olho-mão e manipulação é um programa domiciliar focado em atividades funcionais que promovam experiências de coordenação bimanual, preensão e manipulação, integradas às rotinas diárias. Esta abordagem se baseia nos princípios de aprendizagem motora, que enfatizam a prática repetitiva, variada e contextualizada de habilidades específicas. A integração às rotinas diárias (alimentação, banho, troca, brincadeiras) aumenta a frequência das experiências motoras e facilita a adesão familiar. Intervenções precoces baseadas em atividades funcionais têm demonstrado maior eficácia para prematuros com alterações específicas do desenvolvimento, especialmente quando envolvem ativamente os cuidadores e ocorrem em ambientes naturais."
    }
  ]

  useEffect(() => {
    // Randomize questions on component mount
    setQuestions(shuffleArray(originalQuestions))
    setIsLoading(false)
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isTimerRunning])

  const startQuiz = () => {
    setHasStarted(true)
    setIsTimerRunning(true)
  }

  const handleAnswerSelect = (index: number) => {
    if (isAnswered) return

    setSelectedAnswer(index)
    setIsAnswered(true)

    if (index === questions[currentQuestion].correctAnswer) {
      setScore(score + 1)
      setFeedbackMessage("Correto! " + questions[currentQuestion].explanation)
    } else {
      setFeedbackMessage(
        "Incorreto. A resposta correta é: " +
          questions[currentQuestion].options[questions[currentQuestion].correctAnswer] +
          ". " +
          questions[currentQuestion].explanation,
      )
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setIsAnswered(false)
      setFeedbackMessage("")
    } else {
      setShowResults(true)
      setIsTimerRunning(false)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setIsAnswered(false)
    setScore(0)
    setShowResults(false)
    setFeedbackMessage("")
    setTimer(0)
    setIsTimerRunning(true)
  }

  // Análise de resultados por categoria
  const getResultsByCategory = () => {
    const categories: Record<string, { total: number; correct: number }> = {}

    questions.forEach((question, index) => {
      const category = question.category

      if (!categories[category]) {
        categories[category] = { total: 0, correct: 0 }
      }

      categories[category].total += 1

      // Verifica se a pergunta foi respondida corretamente
      if (index < currentQuestion && questions[index].correctAnswer === selectedAnswer) {
        categories[category].correct += 1
      }
    })

    return categories
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  const slideIn = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 },
    },
    exit: {
      opacity: 0,
      x: -50,
      transition: { duration: 0.3 },
    },
  }

  // Cores para as categorias
  const getCategoryColor = (category: string) => {
    const colorMap: Record<string, string> = {
      "Reflexos de 0 a 6 meses": "#6EC1E4",
      "Reflexos de 7 a 15 meses": "#B9A9FF",
      "Reações de 0 a 15 meses": "#A8E6CF",
      "Escala de avaliação neonatal": "#A8E6CF",
      "Dor neonatal": "#FF6B6B",
      "Método Canguru": "#A8E6CF",
      "Hidroterapia em neonatos": "#6EC1E4",
      "Sequelas de doenças neurológicas em prematuros": "#B9A9FF",
      "Sequelas de doenças pulmonares em prematuros": "#6EC1E4",
    }
    
    return colorMap[category] || "#6EC1E4"
  }

  // Retorna progresso em porcentagem
  const getProgress = () => {
    return ((currentQuestion + 1) / questions.length) * 100
  }

  // Cálculo da nota final
  const calculateFinalGrade = () => {
    const percentage = (score / questions.length) * 100
    return percentage.toFixed(1)
  }

  // Função para gerar e baixar PDF com as questões e respostas
  const generatePDF = () => {
    import('jspdf').then(({ default: jsPDF }) => {
      const doc = new jsPDF();
      
      // Configurações do documento
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 20;
      const lineHeight = 7;
      let yPosition = 20;
      
      // Título
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("Prova de Fisioterapia Neonatal - Questões e Gabarito", pageWidth / 2, yPosition, { align: "center" });
      yPosition += lineHeight * 2;
      
      // Data
      const today = new Date();
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(`Gerado em: ${today.toLocaleDateString()}`, pageWidth / 2, yPosition, { align: "center" });
      yPosition += lineHeight * 2;
      
      // Informações adicionais
      doc.setFontSize(10);
      doc.text("Baseado nos artigos disponibilizados pela professora Leandra Oliva", pageWidth / 2, yPosition, { align: "center" });
      yPosition += lineHeight * 2;
      
      // Questões
      doc.setFontSize(12);
      originalQuestions.forEach((question, index) => {
        // Adicionar nova página se necessário
        if (yPosition > doc.internal.pageSize.getHeight() - 40) {
          doc.addPage();
          yPosition = 20;
        }
        
        // Número e texto da questão
        doc.setFont("helvetica", "bold");
        doc.text(`Questão ${index + 1}: ${question.category}`, margin, yPosition);
        yPosition += lineHeight;
        
        // Texto da questão (com quebra de linha se necessário)
        doc.setFont("helvetica", "normal");
        const questionLines = doc.splitTextToSize(question.question, pageWidth - (margin * 2));
        doc.text(questionLines, margin, yPosition);
        yPosition += lineHeight * questionLines.length;
        
        // Alternativas
        question.options.forEach((option, optionIndex) => {
          // Adicionar nova página se necessário
          if (yPosition > doc.internal.pageSize.getHeight() - 40) {
            doc.addPage();
            yPosition = 20;
          }
          
          const letter = String.fromCharCode(65 + optionIndex); // A, B, C, D, E
          const isCorrect = optionIndex === question.correctAnswer;
          
          // Destacar resposta correta
          if (isCorrect) {
            doc.setFont("helvetica", "bold");
          } else {
            doc.setFont("helvetica", "normal");
          }
          
          // Adicionar letra da alternativa
          doc.text(`${letter}. `, margin, yPosition);
          
          // Adicionar texto da alternativa com quebra de linha
          const optionLines = doc.splitTextToSize(option, pageWidth - (margin * 2) - 10);
          doc.text(optionLines, margin + 10, yPosition);
          yPosition += lineHeight * optionLines.length + 2;
        });
        
        // Adicionar nova página se necessário
        if (yPosition > doc.internal.pageSize.getHeight() - 60) {
          doc.addPage();
          yPosition = 20;
        }
        
        // Explicação
        doc.setFont("helvetica", "bold");
        doc.text("Explicação:", margin, yPosition);
        yPosition += lineHeight;
        
        doc.setFont("helvetica", "normal");
        const explanationLines = doc.splitTextToSize(question.explanation, pageWidth - (margin * 2));
        doc.text(explanationLines, margin, yPosition);
        yPosition += lineHeight * explanationLines.length + 10;
      });
      
      // Salvar o PDF
      doc.save("prova-fisioterapia-neonatal.pdf");
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6EC1E4]"></div>
      </div>
    )
  }

  if (!hasStarted) {
  return (
      <div className="relative min-h-screen bg-gradient-to-b from-white to-[#F8FAFF]">
        {/* Modal de anúncio */}
        <AnimatePresence>
          {isModalOpen && (
            <AnnouncementModal 
              isOpen={isModalOpen} 
              onClose={() => setIsModalOpen(false)} 
            />
          )}
        </AnimatePresence>
        
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-[800px] h-[800px] rounded-full bg-[#6EC1E4]/5 blur-[120px] -top-[400px] -left-[300px]" />
          <div className="absolute w-[600px] h-[600px] rounded-full bg-[#B9A9FF]/5 blur-[100px] -bottom-[200px] -right-[200px]" />
          <div className="absolute inset-0">
            <Particles count={15} />
          </div>
        </div>

        {/* Start screen content */}
        <div className="container mx-auto px-6 py-16 relative z-10">
      <Link
        href="/provas"
            className="inline-flex items-center text-[#666666] hover:text-[#333333] transition-colors mb-12 group"
          >
            <ChevronLeft className="h-5 w-5 mr-1 transition-transform group-hover:-translate-x-1" />
            Voltar para Provas
          </Link>

          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h1 className="relative">
                <span className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#2C3E50] to-[#3498DB] drop-shadow-sm">
                  Avaliação Geral
                </span>
                <div className="absolute -z-10 blur-3xl opacity-20 bg-gradient-to-r from-[#6EC1E4] to-[#B9A9FF] w-full h-full top-0" />
              </h1>
              <p className="text-[#666666] text-xl leading-relaxed mb-4 max-w-2xl mx-auto mt-8">
                Esta avaliação contém {questions.length} questões sobre diversos temas da fisioterapia neonatal.
              </p>
              <p className="text-[#888888] text-lg mb-12">
                Você poderá ver a explicação detalhada após responder cada questão.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-sm"
              >
                <div className="w-12 h-12 rounded-full bg-[#6EC1E4]/10 flex items-center justify-center mb-4">
                  <AlarmClock className="h-6 w-6 text-[#6EC1E4]" />
                </div>
                <h3 className="text-lg font-semibold text-[#333333] mb-2">Tempo Flexível</h3>
                <p className="text-[#666666]">Faça a prova no seu ritmo, com tempo para analisar cada questão.</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-sm"
              >
                <div className="w-12 h-12 rounded-full bg-[#B9A9FF]/10 flex items-center justify-center mb-4">
                  <BarChart className="h-6 w-6 text-[#B9A9FF]" />
                </div>
                <h3 className="text-lg font-semibold text-[#333333] mb-2">Feedback Detalhado</h3>
                <p className="text-[#666666]">Receba explicações completas após cada resposta.</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-sm"
              >
                <div className="w-12 h-12 rounded-full bg-[#6EC1E4]/10 flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-[#6EC1E4]" />
                </div>
                <h3 className="text-lg font-semibold text-[#333333] mb-2">Análise por Categoria</h3>
                <p className="text-[#666666]">Acompanhe seu desempenho em cada área do conhecimento.</p>
              </motion.div>
            </div>

            <div className="text-center">
              <MagneticButton
                onClick={startQuiz}
                backgroundGradient={true}
                glowOnHover={true}
                strength={20}
                className="px-10 py-5 text-lg font-medium inline-flex items-center"
              >
                <span className="mr-2">Começar Avaliação</span>
                <ChevronRight className="h-5 w-5" />
              </MagneticButton>
              
              <div className="mt-6">
                <button
                  onClick={generatePDF}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
                >
                  <FileDown className="h-5 w-5" />
                  Baixar PDF com questões e gabarito
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen pb-20">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[500px] h-[500px] rounded-full bg-[#6EC1E4]/5 blur-3xl -top-64 -left-64 pointer-events-none" />
        <div className="absolute w-[400px] h-[400px] rounded-full bg-[#B9A9FF]/5 blur-3xl -bottom-32 -right-32 pointer-events-none" />
      </div>
      
      {!showResults && (
        <div 
          ref={headerRef}
          className="relative mb-10"
        >
          <AdvancedParallax speed={0.15} direction="vertical" className="absolute inset-0 pointer-events-none">
            <div className="bg-gradient-to-b from-white to-[#F5F9FF] rounded-b-3xl h-full w-full"></div>
          </AdvancedParallax>
          
          <div className="relative z-10 container mx-auto px-6 py-10">
            <Link href="/provas" className="inline-flex items-center text-[#6EC1E4] mb-8 hover:text-[#6EC1E4]/80 transition-colors">
        <ArrowLeft className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">Voltar para provas temáticas</span>
      </Link>

            <div className="flex justify-between items-center mb-4">
              <div>
                <span className="px-4 py-1.5 bg-gradient-to-r from-[#B9A9FF]/10 to-[#6EC1E4]/10 rounded-full text-sm font-medium text-[#B9A9FF] inline-block mb-2">
                  Avaliação completa
                </span>
                <h1 className="text-2xl md:text-3xl font-bold text-[#333333]">Prova Geral de Fisioterapia Neonatal</h1>
              </div>
              
              <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-lg py-2 px-4 shadow-sm">
                <AlarmClock className="h-4 w-4 text-[#6EC1E4]" />
                <span className="text-sm font-medium">{formatTime(timer)}</span>
              </div>
            </div>

            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mb-4">
              <motion.div 
                className="h-full bg-gradient-to-r from-[#6EC1E4] to-[#B9A9FF]" 
                style={{ width: `${getProgress()}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${getProgress()}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            
            <div className="flex justify-between items-center text-sm text-[#666666]">
              <span>Questão {currentQuestion + 1} de {questions.length}</span>
              <span>Pontuação: {score}/{currentQuestion}</span>
            </div>
          </div>
        </div>
      )}
      
      <div className="container mx-auto px-6" ref={contentRef} style={{ position: "relative", zIndex: 20, pointerEvents: "auto" }}>
        {!showResults ? (
            <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={slideIn}
              className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-100"
              style={{ position: "relative", zIndex: 30, pointerEvents: "auto" }}
            >
              <span 
                className="inline-block px-3 py-1 rounded-md text-xs font-medium mb-4" 
                style={{ 
                  backgroundColor: `${getCategoryColor(questions[currentQuestion].category)}20`,
                  color: getCategoryColor(questions[currentQuestion].category)
                }}
              >
                    {questions[currentQuestion].category}
                  </span>

              <h2 className="text-xl md:text-2xl font-semibold text-[#333333] mb-6">
                {questions[currentQuestion].question}
              </h2>

              <div className="space-y-3 mb-6" style={{ position: "relative", zIndex: 50, pointerEvents: "auto" }}>
                  {questions[currentQuestion].options.map((option, index) => (
                  <motion.button
                      key={index}
                    className={`w-full text-left p-4 rounded-lg border transition-all ${
                        selectedAnswer === index
                          ? index === questions[currentQuestion].correctAnswer
                          ? "bg-green-50 border-green-200 text-green-800"
                          : "bg-red-50 border-red-200 text-red-800"
                        : "border-gray-200 hover:border-[#6EC1E4]/30 hover:bg-[#6EC1E4]/5"
                    }`}
                    onClick={() => handleAnswerSelect(index)}
                      disabled={isAnswered}
                    whileHover={!isAnswered ? { scale: 1.01 } : {}}
                    whileTap={!isAnswered ? { scale: 0.99 } : {}}
                    style={{ position: "relative", zIndex: 50, pointerEvents: "auto" }}
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-3">
                        <div className={`h-6 w-6 rounded-full flex items-center justify-center ${
                          selectedAnswer === index
                            ? index === questions[currentQuestion].correctAnswer
                              ? "bg-green-100 text-green-600"
                              : "bg-red-100 text-red-600"
                            : "bg-gray-100 text-gray-400"
                        }`}>
                          {selectedAnswer === index ? (
                            index === questions[currentQuestion].correctAnswer ? (
                              <CheckCircle2 className="h-4 w-4" />
                            ) : (
                              <XCircle className="h-4 w-4" />
                            )
                          ) : (
                            <span className="text-xs font-medium">{String.fromCharCode(65 + index)}</span>
                          )}
                        </div>
                      </div>
                      <span className="text-md md:text-base">{option}</span>
                    </div>
                  </motion.button>
                  ))}
                </div>

                {isAnswered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  className={`p-4 mb-6 rounded-lg ${
                    selectedAnswer === questions[currentQuestion].correctAnswer
                      ? "bg-green-50 border border-green-100"
                      : "bg-red-50 border border-red-100"
                  }`}
                >
                  <p className={`text-sm ${
                        selectedAnswer === questions[currentQuestion].correctAnswer
                      ? "text-green-700"
                      : "text-red-700"
                  }`}>
                      {feedbackMessage}
                    </p>
                  </motion.div>
                )}

                {isAnswered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex justify-end"
                >
                    <button
                      onClick={handleNextQuestion}
                    className="bg-gradient-to-r from-[#6EC1E4] to-[#B9A9FF] text-white px-6 py-3 rounded-lg font-medium inline-flex items-center hover:shadow-md transition-shadow"
                    >
                    {currentQuestion < questions.length - 1 ? "Próxima questão" : "Ver resultados"}
                    <ChevronRight className="h-4 w-4 ml-2" />
                    </button>
                </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-100"
          >
            <div className="text-center mb-8">
              <AdvancedParallax speed={0.1} direction="vertical">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#6EC1E4]/20 to-[#B9A9FF]/20 flex items-center justify-center mx-auto mb-4">
                  <BarChart className="h-10 w-10 text-[#6EC1E4]" />
            </div>
              </AdvancedParallax>
              
              <h2 className="text-2xl md:text-3xl font-bold text-[#333333] mb-2">Resultados da Avaliação</h2>
              <p className="text-gray-600 mb-2">Você completou a avaliação em {formatTime(timer)}</p>
              
              <div className="flex justify-center items-center gap-4 mt-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#6EC1E4]">{score}</div>
                  <div className="text-xs text-gray-500">Acertos</div>
                </div>
                <div className="h-10 w-px bg-gray-200"></div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#B9A9FF]">{questions.length}</div>
                  <div className="text-xs text-gray-500">Questões</div>
                </div>
                <div className="h-10 w-px bg-gray-200"></div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#333333]">{calculateFinalGrade()}%</div>
                  <div className="text-xs text-gray-500">Nota final</div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-[#333333] mb-4">Desempenho por Categoria</h3>
              
              <div className="space-y-4">
                {Object.entries(getResultsByCategory()).map(([category, data]) => (
                  <div key={category} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span 
                        className="text-sm font-medium" 
                        style={{ color: getCategoryColor(category) }}
                      >
                        {category}
                      </span>
                      <span className="text-sm text-gray-600">
                        {data.correct}/{data.total} ({Math.round((data.correct / data.total) * 100)}%)
                      </span>
                    </div>
                    
                    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full" 
                        initial={{ width: 0 }}
                        animate={{ width: `${(data.correct / data.total) * 100}%` }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        style={{ 
                          backgroundColor: getCategoryColor(category),
                          width: `${(data.correct / data.total) * 100}%` 
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-8">
              <MagneticButton
                backgroundGradient={true}
                glowOnHover={true}
                strength={15}
                className="px-6 py-3 font-medium inline-flex items-center"
                onClick={resetQuiz}
              >
                <span className="flex items-center gap-2">
                  Refazer Avaliação
                </span>
              </MagneticButton>
              
              <MagneticButton
                variant="subtle"
                className="px-6 py-3 font-medium border-2 border-[#6EC1E4] text-[#6EC1E4] inline-flex items-center"
                href="/provas"
              >
                <span className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Voltar para Provas Temáticas
                </span>
              </MagneticButton>
            </div>
            
            <div className="mt-6 text-center">
              <button
                onClick={generatePDF}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
              >
                <FileDown className="h-5 w-5" />
                Baixar PDF com questões e gabarito
              </button>
              <p className="text-xs text-gray-500 mt-2">
                Todas as questões foram elaboradas com base nos artigos disponibilizados pela professora Leandra Oliva
              </p>
            </div>
          </motion.div>
        )}
      </div>

    </div>
  )
}
