"use client"

import React, { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, CheckCircle2, XCircle, BarChart, TrendingUp, ChevronRight, AlarmClock, ChevronLeft } from "lucide-react"
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
    {
      question: "Em relação à avaliação da dor em neonatos prematuros, qual escala é mais apropriada para avaliar a dor aguda durante procedimentos invasivos, considerando a idade gestacional como fator de correção?",
      options: [
        "Escala PIPP-R (Premature Infant Pain Profile – Revised)",
        "Escala NIPS (Neonatal Infant Pain Scale)",
        "Escala EDIN (Échelle Douleur Inconfort Nouveau-Né)",
        "Escala N-PASS (Neonatal Pain Agitation and Sedation Scale)"
      ],
      correctAnswer: 0,
      category: "Dor Neonatal",
      explanation: "A escala PIPP-R é especificamente adaptada para prematuros e considera a idade gestacional como fator de correção na avaliação da dor."
    },
    {
      question: "Durante a hidroterapia neonatal, quais são os parâmetros fisiológicos que devem ser monitorados continuamente para garantir a segurança do procedimento?",
      options: [
        "Apenas temperatura corporal e saturação de oxigênio",
        "Frequência cardíaca, frequência respiratória, saturação de oxigênio e temperatura corporal",
        "Pressão arterial e temperatura da água",
        "Temperatura da água e umidade do ambiente"
      ],
      correctAnswer: 1,
      category: "Hidroterapia em Neonatos",
      explanation: "O monitoramento contínuo deve incluir frequência cardíaca, frequência respiratória, saturação de oxigênio e temperatura corporal."
    },
    {
      question: "Na avaliação do desenvolvimento motor de um prematuro de 4 meses de idade corrigida, qual instrumento oferece maior sensibilidade para detectar alterações sutis na qualidade do movimento?",
      options: [
        "Escala de Denver II",
        "Escala de Desenvolvimento de Gesell",
        "TIMP (Test of Infant Motor Performance)",
        "Escala Motora de Alberta (AIMS)"
      ],
      correctAnswer: 2,
      category: "Avaliação Neonatal",
      explanation: "O TIMP é o instrumento mais sensível para detectar alterações sutis na qualidade do movimento em bebês prematuros até 4 meses de idade corrigida."
    },
    {
      question: "Qual é o mecanismo neurofisiológico pelo qual a hidroterapia em água aquecida (36,5-37°C) promove redução do tônus muscular em neonatos com padrão extensor aumentado?",
      options: [
        "Aumento da atividade reflexa medular",
        "Redução do fluxo sanguíneo muscular",
        "Estimulação do sistema nervoso simpático",
        "Ativação dos receptores de pressão profunda e temperatura"
      ],
      correctAnswer: 3,
      category: "Hidroterapia em Neonatos",
      explanation: "A hidroterapia em água aquecida reduz o tônus muscular através da ativação dos receptores de pressão profunda e temperatura."
    },
    {
      question: "Em um recém-nascido prematuro com 32 semanas de idade gestacional, qual sequência de reflexos primitivos deve estar presente e qual sua importância para o desenvolvimento neuromotor?",
      options: [
        "Reflexo de marcha e preensão plantar, indicativos de desenvolvimento motor normal",
        "Reflexos de sucção, Moro, preensão palmar e tônico cervical assimétrico, fundamentais para sobrevivência e desenvolvimento",
        "Apenas reflexo de Moro e preensão palmar, essenciais para proteção",
        "Reflexo tônico cervical assimétrico e Moro, indicativos de maturação do tronco cerebral"
      ],
      correctAnswer: 1,
      category: "Reflexos de 0 a 6 meses",
      explanation: "Com 32 semanas, devem estar presentes os reflexos de sucção, Moro, preensão palmar e tônico cervical assimétrico."
    },
    {
      question: "Na avaliação da dor em recém-nascidos prematuros, por que é importante utilizar escalas multidimensionais que consideram parâmetros fisiológicos e comportamentais?",
      options: [
        "Porque os parâmetros fisiológicos são mais importantes que os comportamentais para detectar dor em prematuros",
        "Porque prematuros não demonstram respostas comportamentais à dor devido à imaturidade neurológica",
        "Porque a resposta à dor em prematuros pode ser atenuada ou desorganizada, necessitando avaliação ampla",
        "Porque apenas os parâmetros fisiológicos permitem quantificar a intensidade da dor neonatal"
      ],
      correctAnswer: 2,
      category: "Dor Neonatal",
      explanation: "É importante utilizar escalas multidimensionais porque a resposta à dor em prematuros pode ser atenuada ou desorganizada devido à imaturidade do sistema nervoso. Prematuros podem apresentar menor capacidade de sustentação da resposta comportamental à dor e maior variabilidade nas respostas fisiológicas."
    },
    {
      question: "Durante uma sessão de hidroterapia com um recém-nascido prematuro de 35 semanas, o bebê apresenta diminuição súbita da temperatura corporal e palidez. Qual deve ser a conduta imediata do fisioterapeuta?",
      options: [
        "Continuar o procedimento, pois a queda de temperatura é uma resposta normal à imersão",
        "Aumentar a temperatura da água para compensar a perda de calor corporal",
        "Finalizar a sessão, retirar o bebê da água, secá-lo e aquecê-lo, e monitorar sinais vitais",
        "Reduzir o tempo da sessão, mas manter o bebê na água para adaptação gradual"
      ],
      correctAnswer: 2,
      category: "Hidroterapia em Neonatos",
      explanation: "A conduta imediata deve ser finalizar a sessão, retirar o bebê da água, secá-lo e aquecê-lo, além de monitorar seus sinais vitais. A diminuição súbita da temperatura corporal e palidez são sinais de estresse térmico que podem levar à hipotermia."
    },
    {
      question: "No desenvolvimento motor normal de um bebê no primeiro ano de vida, qual é a sequência correta de aquisição das reações posturais?",
      options: [
        "Reação de proteção para frente, reação de proteção lateral, reação de proteção para trás",
        "Reação de proteção lateral, reação de proteção para trás, reação de proteção para frente",
        "Reação de proteção para trás, reação de proteção para frente, reação de proteção lateral",
        "Reação de proteção para frente, reação de proteção para trás, reação de proteção lateral"
      ],
      correctAnswer: 0,
      category: "Reações de 0 a 15 meses",
      explanation: "A sequência correta de aquisição das reações posturais é: reação de proteção para frente (surge por volta dos 6 meses), reação de proteção lateral (surge por volta dos 7-8 meses) e reação de proteção para trás (surge por volta dos 9-10 meses)."
    },
    {
      question: "Na terceira fase do Método Canguru, qual é o papel do fisioterapeuta no acompanhamento ambulatorial do recém-nascido e sua família?",
      options: [
        "Supervisionar exclusivamente a posição canguru no ambiente domiciliar",
        "Realizar apenas procedimentos respiratórios para prevenir complicações pulmonares",
        "Avaliar o desenvolvimento neuropsicomotor, orientar posicionamento e estimulação em domicílio",
        "Interromper a intervenção fisioterapêutica, pois nesta fase só é necessário acompanhamento médico"
      ],
      correctAnswer: 2,
      category: "Método Canguru",
      explanation: "Na terceira fase do Método Canguru, que ocorre após a alta hospitalar, o papel do fisioterapeuta inclui avaliar periodicamente o desenvolvimento neuropsicomotor do bebê, orientar os pais quanto ao posicionamento adequado e atividades de estimulação em domicílio."
    },
    {
      question: "Bebê prematuro de 28 semanas, atualmente com 34 semanas de idade corrigida, está internado na UTI Neonatal e será submetido a múltiplos procedimentos dolorosos em um mesmo dia. Qual estratégia não-farmacológica combinada oferece maior efeito analgésico nesta situação?",
      options: [
        "Apenas sucção não-nutritiva com chupeta ou dedo enluvado",
        "Contenção facilitada com envolvimento em ninho ou rolos",
        "Combinação de glicose oral, contato pele a pele e sucção não-nutritiva",
        "Musicoterapia com redução da luminosidade ambiental"
      ],
      correctAnswer: 2,
      category: "Dor Neonatal",
      explanation: "A combinação de glicose oral, contato pele a pele e sucção não-nutritiva oferece maior efeito analgésico por atuar em diferentes mecanismos. A glicose ativa receptores gustativos e libera endorfinas endógenas; o contato pele a pele promove liberação de ocitocina e reduz o estresse."
    },
    {
      question: "Um fisioterapeuta planeja realizar ofuroterapia em um recém-nascido prematuro de 36 semanas que apresenta irritabilidade após procedimentos dolorosos. Quais cuidados são essenciais para a aplicação segura desta técnica?",
      options: [
        "Utilizar água morna (35°C) e procedimento por 20 minutos sem monitoramento contínuo",
        "Manter água aquecida (38-40°C) e bebê totalmente imerso para maior relaxamento",
        "Água entre 36,5-37°C, monitoramento contínuo de sinais vitais e duração de 5-10 minutos",
        "Adicionar óleos essenciais à água para potencializar o efeito relaxante da terapia"
      ],
      correctAnswer: 2,
      category: "Hidroterapia em Neonatos",
      explanation: "Para a aplicação segura da ofuroterapia, a água deve estar entre 36,5°C e 37°C (similar à temperatura corporal), com monitoramento contínuo dos sinais vitais durante toda a sessão, que deve durar entre 5-10 minutos para evitar estresse térmico."
    },
    {
      question: "Uma criança nascida prematura com 30 semanas, agora com 4 anos, apresenta dificuldades de aprendizagem, especialmente em matemática e habilidades visuoespaciais, apesar de ter QI na faixa normal. Qual é a explicação neurofisiológica mais provável para este quadro?",
      options: [
        "Lesão focal do córtex motor primário com preservação das áreas de associação",
        "Comprometimento da mielinização e conectividade entre diferentes regiões cerebrais",
        "Atrofia cortical progressiva secundária à epilepsia não tratada",
        "Sequela de acidente vascular cerebral neonatal em território da artéria cerebral média"
      ],
      correctAnswer: 1,
      category: "Sequelas Neurológicas em Prematuros",
      explanation: "A explicação neurofisiológica mais provável é o comprometimento da mielinização e conectividade entre diferentes regiões cerebrais. A lesão difusa da substância branca, comum em prematuros, resulta em perda de oligodendrócitos e prejuízo na mielinização."
    },
    {
      question: "Na aplicação do Método Canguru para um recém-nascido prematuro de 1500g, que recentemente saiu da ventilação mecânica e está em ar ambiente, qual posicionamento o fisioterapeuta deve orientar aos pais para otimizar a função respiratória durante o contato pele a pele?",
      options: [
        "Posição supina com cabeça lateralizada sobre o tórax do cuidador",
        "Posição pronada com cabeça em flexão encostada no pescoço do cuidador",
        "Posição vertical, levemente reclinada, com cabeça lateralizada e vias aéreas livres",
        "Posição látero-lateral com membros em extensão para facilitar a expansão torácica"
      ],
      correctAnswer: 2,
      category: "Método Canguru",
      explanation: "O fisioterapeuta deve orientar a posição vertical, levemente reclinada, com cabeça lateralizada e vias aéreas livres. Esta posição otimiza a função respiratória ao promover melhor expansão diafragmática e reduzir o trabalho respiratório."
    },
    {
      question: "Durante a avaliação fisioterapêutica de um recém-nascido a termo com 2 dias de vida, é observada assimetria nos movimentos espontâneos dos membros superiores, com mão direita predominantemente fechada. O que estes achados sugerem?",
      options: [
        "Características normais do desenvolvimento neuromotor neonatal",
        "Reflexo tônico cervical assimétrico fisiológico para a idade",
        "Possível lesão do plexo braquial tipo Erb-Duchenne",
        "Imaturidade transitória do controle motor fino"
      ],
      correctAnswer: 2,
      category: "Avaliação Neonatal",
      explanation: "Os achados de assimetria nos movimentos espontâneos com mão predominantemente fechada e restrição na abertura dos dedos unilateralmente sugerem possível lesão do plexo braquial tipo Erb-Duchenne."
    },
    {
      question: "Bebê de 4 meses, nascido a termo, apresenta persistência do Reflexo Tônico Cervical Assimétrico (RTCA) além do tempo esperado. Como este reflexo influencia o desenvolvimento motor?",
      options: [
        "Facilita o desenvolvimento do controle cefálico e não causa prejuízos significativos",
        "Dificulta o alcance de marcos como rolar e sentar, prejudicando a simetria e orientação na linha média",
        "Acelera o processo de controle de tronco, mas prejudica a coordenação entre membros superiores e inferiores",
        "Não interfere no desenvolvimento motor típico, sendo uma variação normal do desenvolvimento"
      ],
      correctAnswer: 1,
      category: "Desenvolvimento Motor",
      explanation: "A persistência do RTCA dificulta a aquisição de marcos motores como rolar e sentar, pois impede que o bebê explore a linha média, desenvolvendo padrões de movimento assimétricos."
    },
    {
      question: "Recém-nascido prematuro de 34 semanas apresenta hipertonia em membros inferiores e hipotonia axial. Durante a avaliação fisioterapêutica, observa-se persistência do reflexo tônico cervical assimétrico e ausência de reação de proteção lateral. Qual a conduta fisioterapêutica mais adequada para este caso?",
      options: [
        "Realizar apenas alongamentos passivos dos membros inferiores",
        "Estimulação sensorial multimodal com posicionamento em flexão e contenção facilitada",
        "Aplicar padrões de facilitação neuromuscular proprioceptiva em diagonal",
        "Iniciar treino de marcha com suporte parcial de peso imediatamente"
      ],
      correctAnswer: 1,
      category: "Intervenção Neurológica em Prematuros",
      explanation: "A estimulação sensorial multimodal com posicionamento em flexão e contenção facilitada é a conduta mais adequada, pois respeita o desenvolvimento neurológico do prematuro e promove organização postural."
    },
    {
      question: "Entre as evidências científicas que comprovam os benefícios da hidroterapia em neonatos, qual resultado está diretamente relacionado à imersão em água aquecida?",
      options: [
        "Aumento da frequência cardíaca e frequência respiratória",
        "Diminuição da saturação de oxigênio",
        "Aumento dos níveis de cortisol salivar",
        "Redução do estresse e estabilização dos sinais vitais"
      ],
      correctAnswer: 3,
      category: "Hidroterapia em Neonatos",
      explanation: "A imersão em água aquecida durante a hidroterapia neonatal promove a redução do estresse e estabilização dos sinais vitais, com diminuição da frequência cardíaca e respiratória."
    },
    {
      question: "Qual é a principal função do posicionamento terapêutico em prematuros na UTI Neonatal?",
      options: [
        "Facilitar procedimentos de enfermagem",
        "Prevenir lesões de pele",
        "Melhorar padrão respiratório",
        "Promover organização neuromotora e desenvolvimento simétrico"
      ],
      correctAnswer: 3,
      category: "Intervenção em UTI Neonatal",
      explanation: "O posicionamento terapêutico tem como principal função promover a organização neuromotora e o desenvolvimento simétrico do prematuro."
    },
    {
      question: "Quais são os sinais de estresse durante a manipulação do recém-nascido prematuro que indicam necessidade de pausa na intervenção?",
      options: [
        "Alteração de frequência cardíaca, dessaturação e mudança de coloração",
        "Apenas choro e agitação motora",
        "Somente alterações respiratórias",
        "Exclusivamente alterações de temperatura"
      ],
      correctAnswer: 0,
      category: "Avaliação Neonatal",
      explanation: "Os principais sinais de estresse são alterações de frequência cardíaca, dessaturação e mudança de coloração da pele."
    },
    {
      question: "Em relação ao desenvolvimento motor típico, qual é a idade esperada para o surgimento do controle cervical completo em um bebê nascido a termo?",
      options: [
        "2 meses",
        "3-4 meses",
        "5-6 meses",
        "7-8 meses"
      ],
      correctAnswer: 1,
      category: "Desenvolvimento Motor",
      explanation: "O controle cervical completo é tipicamente alcançado entre 3-4 meses em bebês nascidos a termo."
    },
    {
      question: "Qual é a temperatura ideal da água para a realização de hidroterapia em recém-nascidos prematuros estáveis?",
      options: [
        "34-35°C",
        "35-36°C",
        "36,5-37°C",
        "38-39°C"
      ],
      correctAnswer: 2,
      category: "Hidroterapia em Neonatos",
      explanation: "A temperatura ideal é entre 36,5-37°C, similar à temperatura corporal do bebê."
    },
    {
      question: "Qual é o principal objetivo da estimulação tátil-cinestésica em prematuros?",
      options: [
        "Promover ganho de peso e desenvolvimento neuromotor",
        "Apenas melhorar o vínculo mãe-bebê",
        "Reduzir o tempo de internação",
        "Prevenir infecções hospitalares"
      ],
      correctAnswer: 0,
      category: "Intervenção em UTI Neonatal",
      explanation: "O principal objetivo é promover o ganho de peso e o desenvolvimento neuromotor do prematuro."
    },
    {
      question: "Em que idade gestacional o reflexo de sucção-deglutição está completamente desenvolvido?",
      options: [
        "28-30 semanas",
        "32-34 semanas",
        "34-36 semanas",
        "36-38 semanas"
      ],
      correctAnswer: 3,
      category: "Desenvolvimento Motor",
      explanation: "O reflexo de sucção-deglutição está completamente desenvolvido entre 36-38 semanas de idade gestacional."
    },
    {
      question: "Qual é a frequência recomendada de mudança de decúbito em prematuros estáveis na UTI Neonatal?",
      options: [
        "A cada 8 horas",
        "A cada 3-4 horas",
        "A cada 12 horas",
        "A cada 6 horas"
      ],
      correctAnswer: 1,
      category: "Intervenção em UTI Neonatal",
      explanation: "A mudança de decúbito deve ser realizada a cada 3-4 horas em prematuros estáveis."
    },
    {
      question: "Qual é o principal benefício da posição canguru para o desenvolvimento neuromotor do prematuro?",
      options: [
        "Melhora do padrão respiratório",
        "Redução do estresse",
        "Promoção da autorregulação e organização comportamental",
        "Prevenção de refluxo gastroesofágico"
      ],
      correctAnswer: 2,
      category: "Método Canguru",
      explanation: "O principal benefício neuromotor é a promoção da autorregulação e organização comportamental."
    },
    {
      question: "Qual é o principal objetivo da contenção facilitada durante procedimentos dolorosos?",
      options: [
        "Reduzir o estresse e promover autorregulação",
        "Imobilizar o bebê",
        "Facilitar o procedimento",
        "Prevenir lesões"
      ],
      correctAnswer: 0,
      category: "Dor Neonatal",
      explanation: "A contenção facilitada visa reduzir o estresse e promover a autorregulação do bebê durante procedimentos dolorosos."
    },
    {
      question: "Qual é a idade gestacional mínima recomendada para início da hidroterapia em prematuros estáveis?",
      options: [
        "30 semanas",
        "34 semanas",
        "32 semanas",
        "36 semanas"
      ],
      correctAnswer: 3,
      category: "Hidroterapia em Neonatos",
      explanation: "A hidroterapia é recomendada a partir de 36 semanas de idade gestacional em prematuros estáveis."
    },
    {
      question: "Qual é a duração recomendada para uma sessão de fisioterapia respiratória em um recém-nascido prematuro estável?",
      options: [
        "30-40 minutos",
        "15-20 minutos",
        "45-60 minutos",
        "5-10 minutos"
      ],
      correctAnswer: 1,
      category: "Fisioterapia Respiratória",
      explanation: "A duração recomendada é de 15-20 minutos, respeitando os sinais de estresse do bebê."
    },
    {
      question: "Qual é o momento mais adequado para realizar a avaliação do desenvolvimento motor em prematuros?",
      options: [
        "Sempre pela idade cronológica",
        "Apenas após termo",
        "Utilizando a idade corrigida até 2 anos",
        "Sem necessidade de correção da idade"
      ],
      correctAnswer: 2,
      category: "Avaliação Neonatal",
      explanation: "A avaliação deve ser realizada utilizando a idade corrigida até 2 anos de idade."
    },
    {
      question: "Qual é a principal contraindicação para a realização de hidroterapia em neonatos?",
      options: [
        "Peso inferior a 2500g",
        "Idade gestacional menor que 40 semanas",
        "Uso de antibióticos",
        "Instabilidade clínica e sinais vitais alterados"
      ],
      correctAnswer: 3,
      category: "Hidroterapia em Neonatos",
      explanation: "A principal contraindicação é a instabilidade clínica com alteração dos sinais vitais."
    },
    {
      question: "Qual é o padrão respiratório típico de um recém-nascido saudável?",
      options: [
        "Respiração predominantemente abdominal",
        "Respiração predominantemente torácica",
        "Respiração paradoxal",
        "Respiração exclusivamente nasal"
      ],
      correctAnswer: 0,
      category: "Fisioterapia Respiratória",
      explanation: "O padrão respiratório típico do recém-nascido é predominantemente abdominal."
    },
    {
      question: "Um recém-nascido prematuro extremo (24 semanas) com 80 dias de vida apresenta piora da função respiratória após tentativa de extubação. O exame de imagem revela áreas de enfisema intersticial pulmonar difuso. Com base na fisiopatologia da displasia broncopulmonar e mecanotransdução celular em pulmões imaturos, qual a estratégia ventilatória que minimizaria o dano induzido pela ventilação mecânica neste caso específico?",
      options: [
        "Ventilação oscilatória de alta frequência com volume garantido, visando reduzir o barotrauma e o volutrauma simultaneamente",
        "Ventilação convencional com pressões inspiratórias elevadas para recrutar alvéolos colapsados e reduzir o enfisema",
        "Estratégia permissiva de hipercapnia com volumes correntes ultrabaixos (3-4ml/kg) e PEEP otimizada para evitar lesão por estiramento celular",
        "CPAP nasal com pressões progressivamente crescentes para facilitar o recrutamento alveolar gradual"
      ],
      correctAnswer: 2,
      category: "Fisioterapia Respiratória Avançada",
      explanation: "A estratégia permissiva de hipercapnia com volumes correntes ultrabaixos minimiza o dano induzido pela ventilação ao reduzir significativamente o estiramento celular, que é o principal gatilho para cascatas inflamatórias e fibrogênicas. A mecanotransdução celular em pulmões imaturos é especialmente sensível ao estresse mecânico, e volumes menores reduzem a ativação de vias de sinalização pró-inflamatórias. A PEEP otimizada previne o colapso cíclico evitando atelectrauma, enquanto tolerar níveis mais elevados de CO2 (hipercapnia permissiva) permite redução do volume minuto, protegendo de lesão adicional um pulmão já enfisematoso."
    },
    {
      question: "Em um estudo de análise tridimensional de movimento em bebês de 4 meses nascidos prematuros extremos, foi identificada alteração na variabilidade de movimento e na riqueza do repertório motor. Qual mecanismo neurofisiológico explica melhor esta alteração, considerando os atuais conhecimentos sobre organização cortical, plasticidade atividade-dependente e especificidade sináptica?",
      options: [
        "Redução do volume cerebelar resultando em déficit no refinamento dos padrões motores",
        "Limitação da formação de conexões tálamo-corticais devido à privação sensório-motora durante período crítico de desenvolvimento",
        "Interrupção das trajetórias desenvolvimentais dos sistemas propriospinal e corticospinal, combinada com atividade neural aberrante durante períodos sensíveis de organização cortical",
        "Deficiência de mielinização dos tratos corticospinais laterais causada por risco metabólico aumentado"
      ],
      correctAnswer: 2,
      category: "Neurociência do Desenvolvimento",
      explanation: "A interrupção das trajetórias desenvolvimentais dos sistemas propriospinal e corticospinal, combinada com atividade neural aberrante durante períodos sensíveis, explica melhor as alterações observadas. A prematuridade extrema interrompe a formação normal dos circuitos sensório-motores em um período crítico de desenvolvimento das conexões tálamo-corticais e corticospinais. A plasticidade atividade-dependente fica comprometida devido à atividade neural insuficiente ou aberrante, prejudicando a especificidade sináptica necessária para a formação de mapas somatotópicos precisos, resultando em redução da variabilidade e riqueza do repertório motor. O timing da conectividade neuronal é crítico, e problemas nesta fase podem levar a redes neurais subótimas, mesmo com intervenção posterior."
    },
    {
      question: "Uma recém-nascida de 36 semanas apresenta assimetria no padrão de movimentos espontâneos e irritabilidade extrema ao manuseio do membro superior direito. A ressonância magnética revela lesão parcial do plexo braquial direito (C5-C6). Considerando os princípios de recuperação neural, plasticidade cruzada inter-hemisférica e neuroproteção, qual abordagem terapêutica teria maior potencial para otimizar a reorganização dos mapas corticais e prevenir distorções somatotópicas?",
      options: [
        "Restrição do membro não afetado com terapia intensiva do lado afetado para evitar dominância do hemisfério não afetado",
        "Estimulação elétrica funcional de baixa intensidade combinada com treino bimanual respeitando períodos de recuperação neural",
        "Terapia por restrição induzida por três horas diárias em regime domiciliar",
        "Abordagem integrada com feedback sensorial enriquecido, estimulação tátil-proprioceptiva refinada das aferências lesadas, combinada com treinamento motor bilateral para modular a competição inter-hemisférica durante a reorganização cortical"
      ],
      correctAnswer: 3,
      category: "Neuroplasticidade e Reabilitação",
      explanation: "A abordagem integrada representa a escolha ideal baseada nos princípios atuais de neuroplasticidade. Em uma lesão parcial do plexo braquial em desenvolvimento, a competição entre hemisférios pode levar à supressão do hemisfério afetado pelas projeções do hemisfério não afetado. O feedback sensorial enriquecido estimula a reorganização adaptativa dos mapas somatossensoriais, enquanto a estimulação tátil-proprioceptiva refinada preserva as aferências parcialmente intactas. O treinamento bilateral modula a competição inter-hemisférica durante um período crítico de formação de conexões corticais, evitando o fenômeno de 'learned non-use' (não-uso aprendido) sem os efeitos potencialmente negativos da restrição excessiva em um sistema nervoso em desenvolvimento."
    },
    {
      question: "Um neonato a termo com encefalopatia hipóxico-isquêmica moderada será submetido a hipotermia terapêutica. Considerando os mecanismos celulares e moleculares de neuroproteção, em qual janela temporal e por quais mecanismos específicos a abordagem fisioterapêutica poderia potencializar os efeitos neuroprotetores da hipotermia?",
      options: [
        "Nas primeiras 12 horas pós-insulto, através de mobilização ativa para aumentar o fluxo sanguíneo cerebral e oxigenação",
        "Entre 24-48 horas após o início da hipotermia, através de posicionamento terapêutico e mínima estimulação para reduzir a demanda metabólica neuronal durante inibição da excitotoxicidade glutamatérgica",
        "Após 72 horas, com estimulação sensorial intensiva para acelerar a reorganização sináptica",
        "Durante as primeiras 6 horas, com manobras vestibulares para estimular a neuroplasticidade precoce"
      ],
      correctAnswer: 1,
      category: "Neuroproteção Avançada",
      explanation: "Durante a fase de 24-48 horas após o início da hipotermia terapêutica, ocorrem processos-chave de inibição da excitotoxicidade glutamatérgica e redução da cascata inflamatória neurotóxica. O posicionamento terapêutico e a mínima estimulação nesta fase são sinérgicos aos mecanismos de ação da hipotermia, pois reduzem a demanda metabólica neuronal, potencializando a supressão de radicais livres e preservando a integridade mitocondrial. A estimulação excessiva neste período poderia aumentar o metabolismo neuronal, antagonizando os efeitos da hipotermia e potencialmente exacerbando o dano celular durante a fase de lesão secundária."
    },
    {
      question: "Em um estudo randomizado controlado sobre desenvolvimento motor em prematuros, observou-se que bebês submetidos a um programa específico de fisioterapia apresentaram melhores escores no General Movements Assessment (GMA) aos 3 meses de idade corrigida, porém sem diferença significativa no TIMP. Como você interpretaria estes achados considerando as bases neurofisiológicas avaliadas por cada instrumento e o impacto prognóstico para paralisia cerebral?",
      options: [
        "O resultado indica que a intervenção foi ineficaz, pois o TIMP é mais sensível que o GMA para detectar alterações motoras sutis",
        "A intervenção afetou positivamente a função dos centros geradores de padrões centrais e a integridade das redes subcorticais que regulam os movimentos generalizados, sem impacto significativo nas habilidades motoras específicas de caráter mais cortical avaliadas pelo TIMP",
        "Os resultados são inconsistentes e metodologicamente questionáveis, já que ambos os instrumentos deveriam mostrar resultados similares",
        "O GMA é exclusivamente influenciado por fatores ambientais, enquanto o TIMP reflete apenas o desenvolvimento neurológico inato"
      ],
      correctAnswer: 1,
      category: "Avaliação Neurológica Avançada",
      explanation: "Esta discrepância nos resultados reflete a diferença fundamental entre os construtos neurológicos avaliados por cada instrumento. O GMA avalia primariamente a função dos centros geradores de padrões centrais e a integridade das redes neurais subcorticais que regulam os movimentos generalizados, sendo altamente preditivo para paralisia cerebral. O TIMP avalia habilidades motoras mais específicas e funcionais que dependem de maior controle cortical. A melhora no GMA sem alteração significativa no TIMP sugere que a intervenção foi eficaz em modular os circuitos neurais responsáveis pela qualidade dos movimentos espontâneos, mas essa modulação ainda não se traduziu em ganhos funcionais específicos mensuráveis pelo TIMP. Este é um achado importante, pois a qualidade dos movimentos generalizados é um preditor mais forte para paralisia cerebral do que as habilidades funcionais específicas em estágios muito precoces."
    },
    {
      question: "Na avaliação seriada de um neonato com hemorragia periventricular grau III, você observa desenvolvimento de hidrocefalia pós-hemorrágica e sinais de leucomalácia periventricular. Integrando os conhecimentos sobre vias motoras descendentes, desenvolvimento dos tratos corticoespinhais e neuroplasticidade do SNC imaturo, qual seria o padrão esperado de comprometimento motor e sua justificativa neurofisiológica?",
      options: [
        "Diplegia espástica leve, pois a substância branca periventricular contém principalmente fibras motoras para membros inferiores, com preservação relativa dos membros superiores",
        "Hemiparesia espástica severa contralateral à lesão, devido ao comprometimento unilateral das fibras que cruzam na decussação das pirâmides",
        "Quadriplegia espástica com maior acometimento de membros inferiores, devido à distribuição periventricular das fibras descendentes e ao comprometimento da organização somatotópica do trato corticoespinhal",
        "Déficit motor mínimo devido à extensa neuroplasticidade e reorganização cortical nesta idade"
      ],
      correctAnswer: 2,
      category: "Neurologia Neonatal Avançada",
      explanation: "O padrão de quadriplegia espástica com maior comprometimento de membros inferiores ocorre porque a hemorragia periventricular grau III associada à leucomalácia periventricular afeta a substância branca periventricular bilateralmente. As fibras do trato corticoespinhal para os membros inferiores passam mais medialmente na coroa radiada e são mais vulneráveis à lesão periventricular do que as fibras destinadas aos membros superiores, que passam mais lateralmente. Além disso, a hidrocefalia pós-hemorrágica causa pressão adicional sobre essas vias, exacerbando o dano às fibras descendentes. Em um SNC imaturo, embora exista potencial para reorganização cortical, lesões extensas bilaterais como esta comprometem significativamente esse potencial plástico, resultando em déficits motores permanentes com padrão espástico característico devido à liberação do controle inibitório supraespinal sobre os reflexos espinais."
    },
    {
      question: "Um prematuro de 26 semanas com 45 dias de vida desenvolveu displasia broncopulmonar grave e permanece em ventilação mecânica. Os parâmetros ventilatórios atuais incluem: PIP 24 cmH2O, PEEP 6 cmH2O, FR 45 ipm, Tempo inspiratório 0,35s e FiO2 45%. Gasometria arterial: pH 7,29, PaCO2 58 mmHg, PaO2 62 mmHg, HCO3 26 mEq/L, BE -2. Considerando os princípios de proteção pulmonar, mecânica respiratória neonatal e prevenção de lesão induzida pela ventilação, qual seria a melhor estratégia de ajuste ventilatório?",
      options: [
        "Aumentar PIP para 26 cmH2O e reduzir FR para 40 ipm, visando melhorar a ventilação alveolar",
        "Manter parâmetros atuais, pois a hipercapnia permissiva é aceitável na displasia broncopulmonar",
        "Implementar volume garantido com volume corrente de 4-5ml/kg, reduzir o tempo inspiratório para 0,30s e aumentar PEEP para 7-8 cmH2O, objetivando homogeneização da distribuição ventilatória e redução do espaço morto",
        "Aumentar FiO2 para 60% e FR para 60 ipm para normalizar os valores gasométricos"
      ],
      correctAnswer: 2,
      category: "Ventilação Mecânica Avançada",
      explanation: "A implementação de volume garantido com volume corrente baixo (4-5ml/kg) é a estratégia mais adequada para proteção pulmonar em um prematuro com displasia broncopulmonar grave. O volume garantido proporciona ventilação mais homogênea e reduz o risco de volutrauma e barotrauma por ajustar automaticamente a pressão inspiratória à complacência pulmonar variável. A redução do tempo inspiratório para 0,30s é benéfica pois diminui o risco de air trapping em pulmões com constante de tempo aumentada devido à obstrução de vias aéreas característica da DBP. O aumento da PEEP para 7-8 cmH2O otimiza o recrutamento alveolar nas áreas colapsadas, melhorando a relação ventilação-perfusão e reduzindo o shunt intrapulmonar. Esta abordagem equilibra a necessidade de adequada troca gasosa com a proteção contra lesão pulmonar adicional, aceitando uma hipercapnia leve a moderada (hipercapnia permissiva) como trade-off para uma ventilação mais protetora."
    },
    {
      question: "Qual é o principal papel da fisioterapia em pacientes com Distrofia Muscular de Duchenne (DMD)?",
      options: [
        "Reverter o processo de degeneração muscular",
        "Realizar apenas alongamentos passivos para evitar atrofia",
        "Retardar a progressão da doença e prevenir complicações secundárias",
        "Iniciar precocemente o uso de cadeira de rodas para preservar energia"
      ],
      correctAnswer: 2,
      category: "Distrofia Muscular de Duchenne",
      explanation: "A fisioterapia desempenha um papel fundamental no retardo da progressão da doença e na prevenção de complicações secundárias. Embora não possa reverter o processo degenerativo, intervenções fisioterapêuticas adequadas podem melhorar significativamente a qualidade de vida dos pacientes com DMD."
    },
    {
      question: "Na Distrofia Muscular de Duchenne, o que caracteriza a manobra de Gowers?",
      options: [
        "Capacidade de elevar os braços acima da cabeça",
        "Uso sequencial dos membros e tronco para levantar-se do chão, indicando fraqueza dos músculos proximais dos membros inferiores",
        "Padrão respiratório com predominância torácica",
        "Contração involuntária dos músculos faciais durante o esforço"
      ],
      correctAnswer: 1,
      category: "Distrofia Muscular de Duchenne",
      explanation: "A manobra de Gowers é um sinal clínico característico da DMD que indica fraqueza nos músculos proximais dos membros inferiores devido à atrofia muscular. O paciente utiliza as mãos para 'escalar' o próprio corpo ao se levantar do chão, apoiando-se sequencialmente nos joelhos e coxas."
    },
    {
      question: "Qual das seguintes estratégias fisioterapêuticas é mais recomendada para o tratamento da Distrofia Muscular de Duchenne?",
      options: [
        "Exercícios resistidos intensos para fortalecer a musculatura",
        "Imobilização prolongada para preservar a energia muscular",
        "Exercícios submáximos regulares combinados com alongamentos",
        "Terapia por restrição de movimento para focar na funcionalidade"
      ],
      correctAnswer: 2,
      category: "Distrofia Muscular de Duchenne",
      explanation: "O exercício submáximo regular combinado com alongamentos é recomendado para evitar a atrofia muscular por desuso e prevenir contraturas. Exercícios resistidos intensos podem acelerar a degeneração muscular, enquanto a imobilização prolongada promove a atrofia e as contraturas."
    },
    {
      question: "Quais são os principais benefícios da hidroterapia no tratamento da Distrofia Muscular de Duchenne?",
      options: [
        "Apenas recreação e socialização",
        "Fortalecimento muscular através de alta resistência",
        "Flutuabilidade que facilita movimentos, fortalecimento muscular gradual e relaxamento muscular",
        "Aumento da rigidez muscular e melhora do equilíbrio"
      ],
      correctAnswer: 2,
      category: "Distrofia Muscular de Duchenne",
      explanation: "A hidroterapia oferece múltiplos benefícios para pacientes com DMD: as propriedades físicas da água facilitam a movimentação através da flutuabilidade, proporcionam resistência gradual para fortalecimento dos músculos atrofiados, e as propriedades térmicas auxiliam no relaxamento muscular. Além disso, permite exercícios respiratórios, treino de marcha e atividades lúdicas em ambiente de baixo impacto."
    },
    {
      question: "Por que a adequação postural em cadeiras de rodas é fundamental para pacientes com Distrofia Muscular de Duchenne?",
      options: [
        "Apenas para proporcionar conforto",
        "Para diminuir o desconforto respiratório e prevenir deformidades na coluna vertebral",
        "Somente para facilitar o transporte do paciente",
        "Para fortalecer a musculatura paravertebral"
      ],
      correctAnswer: 1,
      category: "Distrofia Muscular de Duchenne",
      explanation: "A adequação postural em cadeiras de rodas é fundamental para diminuir o desconforto respiratório e prevenir deformidades na coluna vertebral. A postura inadequada pode levar à escoliose e comprometer a eficácia da respiração. O alinhamento postural adequado evita compensações na coluna vertebral, beneficiando a função respiratória, que é frequentemente afetada pela doença."
    },
    {
      question: "Qual é a definição de cuidados paliativos segundo a Organização Mundial da Saúde (OMS)?",
      options: [
        "Cuidados exclusivos para pacientes nos últimos dias de vida",
        "Medidas para acelerar a morte sem sofrimento do paciente",
        "Cuidado ativo e integral de pacientes cuja doença não responde mais ao tratamento curativo",
        "Apenas controle da dor em pacientes terminais"
      ],
      correctAnswer: 2,
      category: "Cuidados Paliativos Pediátricos",
      explanation: "A OMS define cuidados paliativos como o cuidado ativo e integral de pacientes cuja doença não responde mais ao tratamento curativo. O foco principal é o controle da dor e dos sintomas físicos, psicológicos, sociais e espirituais, visando melhorar a qualidade de vida dos pacientes terminais e de seus familiares."
    },
    {
      question: "No contexto dos cuidados paliativos, o que significa ortotanásia?",
      options: [
        "Prática pela qual se abrevia a vida de um enfermo incurável de maneira deliberada",
        "Prolongamento artificial do processo de morte, sem perspectiva de cura ou melhora",
        "Morte natural, permitindo que ela ocorra no tempo certo, sem abreviação ou prolongamento artificial",
        "Suspensão de todos os tratamentos médicos em pacientes terminais"
      ],
      correctAnswer: 2,
      category: "Cuidados Paliativos Pediátricos",
      explanation: "A ortotanásia refere-se à morte natural, permitindo que ela ocorra no tempo certo, sem abreviação (como na eutanásia) ou prolongamento artificial (como na distanásia). Busca proporcionar ao paciente as condições necessárias para compreender sua mortalidade e prepará-lo para uma morte digna, sem intervenção no processo natural."
    },
    {
      question: "Quais são os tipos mais comuns de câncer em crianças?",
      options: [
        "Câncer de pulmão, mama, próstata e colorretal",
        "Leucemias, tumores do SNC, linfomas, neuroblastomas e tumor de Wilms",
        "Melanoma, carcinoma basocelular e carcinoma espinocelular",
        "Carcinoma hepatocelular, câncer gástrico e câncer de pâncreas"
      ],
      correctAnswer: 1,
      category: "Cuidados Paliativos Pediátricos",
      explanation: "Os tipos mais comuns de câncer em crianças incluem leucemias (cânceres do sangue), tumores do Sistema Nervoso Central (SNC), linfomas (cânceres do sistema linfático), neuroblastomas (tumor de células nervosas), tumor de Wilms (tumor renal), tumores ósseos, rabdomiossarcoma e retinoblastoma."
    },
    {
      question: "Qual é o principal objetivo da fisioterapia nos cuidados paliativos de crianças com câncer?",
      options: [
        "Curar a doença de base através de exercícios específicos",
        "Aumentar ou manter o conforto e a independência, reduzindo o tempo de hospitalização",
        "Apenas prevenir úlceras de decúbito",
        "Substituir o tratamento medicamentoso para controle da dor"
      ],
      correctAnswer: 1,
      category: "Cuidados Paliativos Pediátricos",
      explanation: "O objetivo da fisioterapia nos cuidados paliativos é aumentar ou manter o conforto e a independência funcional, reduzindo o tempo de hospitalização e aumentando o tempo com familiares e amigos. A fisioterapia também desempenha um papel preventivo, antecipando possíveis complicações e implementando medidas preventivas."
    },
    {
      question: "Um prematuro de 26 semanas com 45 dias de vida desenvolveu displasia broncopulmonar grave e permanece em ventilação mecânica. Os parâmetros ventilatórios atuais incluem: PIP 24 cmH2O, PEEP 6 cmH2O, FR 45 ipm, Tempo inspiratório 0,35s e FiO2 45%. Gasometria arterial: pH 7,29, PaCO2 58 mmHg, PaO2 62 mmHg, HCO3 26 mEq/L, BE -2. Considerando os princípios de proteção pulmonar, mecânica respiratória neonatal e prevenção de lesão induzida pela ventilação, qual seria a melhor estratégia de ajuste ventilatório?",
      options: [
        "Aumentar PIP para 26 cmH2O e reduzir FR para 40 ipm, visando melhorar a ventilação alveolar",
        "Manter parâmetros atuais, pois a hipercapnia permissiva é aceitável na displasia broncopulmonar",
        "Implementar volume garantido com volume corrente de 4-5ml/kg, reduzir o tempo inspiratório para 0,30s e aumentar PEEP para 7-8 cmH2O, objetivando homogeneização da distribuição ventilatória e redução do espaço morto",
        "Aumentar FiO2 para 60% e FR para 60 ipm para normalizar os valores gasométricos"
      ],
      correctAnswer: 2,
      category: "Ventilação Mecânica Avançada",
      explanation: "A implementação de volume garantido com volume corrente baixo (4-5ml/kg) é a estratégia mais adequada para proteção pulmonar em um prematuro com displasia broncopulmonar grave. O volume garantido proporciona ventilação mais homogênea e reduz o risco de volutrauma e barotrauma por ajustar automaticamente a pressão inspiratória à complacência pulmonar variável. A redução do tempo inspiratório para 0,30s é benéfica pois diminui o risco de air trapping em pulmões com constante de tempo aumentada devido à obstrução de vias aéreas característica da DBP. O aumento da PEEP para 7-8 cmH2O otimiza o recrutamento alveolar nas áreas colapsadas, melhorando a relação ventilação-perfusão e reduzindo o shunt intrapulmonar. Esta abordagem equilibra a necessidade de adequada troca gasosa com a proteção contra lesão pulmonar adicional, aceitando uma hipercapnia leve a moderada (hipercapnia permissiva) como trade-off para uma ventilação mais protetora."
    },
    {
      question: "Qual é o principal papel da fisioterapia em pacientes com Distrofia Muscular de Duchenne (DMD)?",
      options: [
        "Reverter o processo de degeneração muscular",
        "Realizar apenas alongamentos passivos para evitar atrofia",
        "Retardar a progressão da doença e prevenir complicações secundárias",
        "Iniciar precocemente o uso de cadeira de rodas para preservar energia"
      ],
      correctAnswer: 2,
      category: "Distrofia Muscular de Duchenne",
      explanation: "A fisioterapia desempenha um papel fundamental no retardo da progressão da doença e na prevenção de complicações secundárias. Embora não possa reverter o processo degenerativo, intervenções fisioterapêuticas adequadas podem melhorar significativamente a qualidade de vida dos pacientes com DMD."
    },
    {
      question: "Na Distrofia Muscular de Duchenne, o que caracteriza a manobra de Gowers?",
      options: [
        "Capacidade de elevar os braços acima da cabeça",
        "Uso sequencial dos membros e tronco para levantar-se do chão, indicando fraqueza dos músculos proximais dos membros inferiores",
        "Padrão respiratório com predominância torácica",
        "Contração involuntária dos músculos faciais durante o esforço"
      ],
      correctAnswer: 1,
      category: "Distrofia Muscular de Duchenne",
      explanation: "A manobra de Gowers é um sinal clínico característico da DMD que indica fraqueza nos músculos proximais dos membros inferiores devido à atrofia muscular. O paciente utiliza as mãos para 'escalar' o próprio corpo ao se levantar do chão, apoiando-se sequencialmente nos joelhos e coxas."
    },
    {
      question: "Qual das seguintes estratégias fisioterapêuticas é mais recomendada para o tratamento da Distrofia Muscular de Duchenne?",
      options: [
        "Exercícios resistidos intensos para fortalecer a musculatura",
        "Imobilização prolongada para preservar a energia muscular",
        "Exercícios submáximos regulares combinados com alongamentos",
        "Terapia por restrição de movimento para focar na funcionalidade"
      ],
      correctAnswer: 2,
      category: "Distrofia Muscular de Duchenne",
      explanation: "O exercício submáximo regular combinado com alongamentos é recomendado para evitar a atrofia muscular por desuso e prevenir contraturas. Exercícios resistidos intensos podem acelerar a degeneração muscular, enquanto a imobilização prolongada promove a atrofia e as contraturas."
    },
    {
      question: "Quais são os principais benefícios da hidroterapia no tratamento da Distrofia Muscular de Duchenne?",
      options: [
        "Apenas recreação e socialização",
        "Fortalecimento muscular através de alta resistência",
        "Flutuabilidade que facilita movimentos, fortalecimento muscular gradual e relaxamento muscular",
        "Aumento da rigidez muscular e melhora do equilíbrio"
      ],
      correctAnswer: 2,
      category: "Distrofia Muscular de Duchenne",
      explanation: "A hidroterapia oferece múltiplos benefícios para pacientes com DMD: as propriedades físicas da água facilitam a movimentação através da flutuabilidade, proporcionam resistência gradual para fortalecimento dos músculos atrofiados, e as propriedades térmicas auxiliam no relaxamento muscular. Além disso, permite exercícios respiratórios, treino de marcha e atividades lúdicas em ambiente de baixo impacto."
    },
    {
      question: "Por que a adequação postural em cadeiras de rodas é fundamental para pacientes com Distrofia Muscular de Duchenne?",
      options: [
        "Apenas para proporcionar conforto",
        "Para diminuir o desconforto respiratório e prevenir deformidades na coluna vertebral",
        "Somente para facilitar o transporte do paciente",
        "Para fortalecer a musculatura paravertebral"
      ],
      correctAnswer: 1,
      category: "Distrofia Muscular de Duchenne",
      explanation: "A adequação postural em cadeiras de rodas é fundamental para diminuir o desconforto respiratório e prevenir deformidades na coluna vertebral. A postura inadequada pode levar à escoliose e comprometer a eficácia da respiração. O alinhamento postural adequado evita compensações na coluna vertebral, beneficiando a função respiratória, que é frequentemente afetada pela doença."
    },
    {
      question: "Qual é a definição de cuidados paliativos segundo a Organização Mundial da Saúde (OMS)?",
      options: [
        "Cuidados exclusivos para pacientes nos últimos dias de vida",
        "Medidas para acelerar a morte sem sofrimento do paciente",
        "Cuidado ativo e integral de pacientes cuja doença não responde mais ao tratamento curativo",
        "Apenas controle da dor em pacientes terminais"
      ],
      correctAnswer: 2,
      category: "Cuidados Paliativos Pediátricos",
      explanation: "A OMS define cuidados paliativos como o cuidado ativo e integral de pacientes cuja doença não responde mais ao tratamento curativo. O foco principal é o controle da dor e dos sintomas físicos, psicológicos, sociais e espirituais, visando melhorar a qualidade de vida dos pacientes terminais e de seus familiares."
    },
    {
      question: "No contexto dos cuidados paliativos, o que significa ortotanásia?",
      options: [
        "Prática pela qual se abrevia a vida de um enfermo incurável de maneira deliberada",
        "Prolongamento artificial do processo de morte, sem perspectiva de cura ou melhora",
        "Morte natural, permitindo que ela ocorra no tempo certo, sem abreviação ou prolongamento artificial",
        "Suspensão de todos os tratamentos médicos em pacientes terminais"
      ],
      correctAnswer: 2,
      category: "Cuidados Paliativos Pediátricos",
      explanation: "A ortotanásia refere-se à morte natural, permitindo que ela ocorra no tempo certo, sem abreviação (como na eutanásia) ou prolongamento artificial (como na distanásia). Busca proporcionar ao paciente as condições necessárias para compreender sua mortalidade e prepará-lo para uma morte digna, sem intervenção no processo natural."
    },
    {
      question: "Quais são os tipos mais comuns de câncer em crianças?",
      options: [
        "Câncer de pulmão, mama, próstata e colorretal",
        "Leucemias, tumores do SNC, linfomas, neuroblastomas e tumor de Wilms",
        "Melanoma, carcinoma basocelular e carcinoma espinocelular",
        "Carcinoma hepatocelular, câncer gástrico e câncer de pâncreas"
      ],
      correctAnswer: 1,
      category: "Cuidados Paliativos Pediátricos",
      explanation: "Os tipos mais comuns de câncer em crianças incluem leucemias (cânceres do sangue), tumores do Sistema Nervoso Central (SNC), linfomas (cânceres do sistema linfático), neuroblastomas (tumor de células nervosas), tumor de Wilms (tumor renal), tumores ósseos, rabdomiossarcoma e retinoblastoma."
    },
    {
      question: "Qual é o principal objetivo da fisioterapia nos cuidados paliativos de crianças com câncer?",
      options: [
        "Curar a doença de base através de exercícios específicos",
        "Aumentar ou manter o conforto e a independência, reduzindo o tempo de hospitalização",
        "Apenas prevenir úlceras de decúbito",
        "Substituir o tratamento medicamentoso para controle da dor"
      ],
      correctAnswer: 1,
      category: "Cuidados Paliativos Pediátricos",
      explanation: "O objetivo da fisioterapia nos cuidados paliativos é aumentar ou manter o conforto e a independência funcional, reduzindo o tempo de hospitalização e aumentando o tempo com familiares e amigos. A fisioterapia também desempenha um papel preventivo, antecipando possíveis complicações e implementando medidas preventivas."
    },
    {
      question: "Um prematuro de 26 semanas com 45 dias de vida desenvolveu displasia broncopulmonar grave e permanece em ventilação mecânica. Os parâmetros ventilatórios atuais incluem: PIP 24 cmH2O, PEEP 6 cmH2O, FR 45 ipm, Tempo inspiratório 0,35s e FiO2 45%. Gasometria arterial: pH 7,29, PaCO2 58 mmHg, PaO2 62 mmHg, HCO3 26 mEq/L, BE -2. Considerando os princípios de proteção pulmonar, mecânica respiratória neonatal e prevenção de lesão induzida pela ventilação, qual seria a melhor estratégia de ajuste ventilatório?",
      options: [
        "Aumentar PIP para 26 cmH2O e reduzir FR para 40 ipm, visando melhorar a ventilação alveolar",
        "Manter parâmetros atuais, pois a hipercapnia permissiva é aceitável na displasia broncopulmonar",
        "Implementar volume garantido com volume corrente de 4-5ml/kg, reduzir o tempo inspiratório para 0,30s e aumentar PEEP para 7-8 cmH2O, objetivando homogeneização da distribuição ventilatória e redução do espaço morto",
        "Aumentar FiO2 para 60% e FR para 60 ipm para normalizar os valores gasométricos"
      ],
      correctAnswer: 2,
      category: "Ventilação Mecânica Avançada",
      explanation: "A implementação de volume garantido com volume corrente baixo (4-5ml/kg) é a estratégia mais adequada para proteção pulmonar em um prematuro com displasia broncopulmonar grave. O volume garantido proporciona ventilação mais homogênea e reduz o risco de volutrauma e barotrauma por ajustar automaticamente a pressão inspiratória à complacência pulmonar variável. A redução do tempo inspiratório para 0,30s é benéfica pois diminui o risco de air trapping em pulmões com constante de tempo aumentada devido à obstrução de vias aéreas característica da DBP. O aumento da PEEP para 7-8 cmH2O otimiza o recrutamento alveolar nas áreas colapsadas, melhorando a relação ventilação-perfusão e reduzindo o shunt intrapulmonar. Esta abordagem equilibra a necessidade de adequada troca gasosa com a proteção contra lesão pulmonar adicional, aceitando uma hipercapnia leve a moderada (hipercapnia permissiva) como trade-off para uma ventilação mais protetora."
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
          </motion.div>
        )}
      </div>

    </div>
  )
}
