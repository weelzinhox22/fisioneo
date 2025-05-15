"use client"

import React, { useState, useRef, useEffect } from "react"
import { notFound } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, CheckCircle2, XCircle, AlarmClock, ChevronRight, BarChart, TrendingUp } from "lucide-react"
import Link from "next/link"
import { Baby, Brain, Droplets, HeartPulse, Stethoscope } from "lucide-react"
import { ThreeDText } from "@/components/ui/3d-text"
import { AdvancedParallax } from "@/components/animations/advanced-parallax"
import { MagneticButton } from "@/components/ui/magnetic-button"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register GSAP plugins on client-side only
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface QuizPageProps {
  params: {
    slug: string
  }
}

export default function QuizPage({ params }: QuizPageProps) {
  const { slug } = params

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [feedbackMessage, setFeedbackMessage] = useState("")
  const [timer, setTimer] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  
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

  const quizzes = [
    {
      id: "reflexos-0-6",
      title: "Reflexos de 0 a 6 meses",
      icon: <Baby className="h-10 w-10 text-[#6EC1E4]" />,
      color: "#6EC1E4",
      questions: [
        {
          question: "Qual reflexo primitivo normalmente desaparece por volta dos 3 meses de idade?",
          options: ["Reflexo de Moro", "Reflexo de Preensão Palmar", "Reflexo de Sucção", "Reflexo de Galant"],
          correctAnswer: 0,
          explanation: "O Reflexo de Moro (reflexo de susto) normalmente desaparece por volta dos 3 meses de idade.",
          category: "Reflexos Primitivos"
        },
        {
          question: "O reflexo tônico cervical assimétrico (RTCA) é normalmente observado até qual idade?",
          options: ["1 mês", "3 meses", "6 meses", "9 meses"],
          correctAnswer: 2,
          explanation: "O reflexo tônico cervical assimétrico (RTCA) geralmente persiste até os 6 meses de idade.",
          category: "Reflexos Primitivos"
        },
        {
          question:
            "Qual reflexo está relacionado à resposta de proteção quando o bebê é movido rapidamente para baixo?",
          options: ["Reflexo de Landau", "Reflexo de Moro", "Reflexo de Galant", "Reflexo de Babinski"],
          correctAnswer: 1,
          explanation:
            "O Reflexo de Moro é uma resposta de proteção quando o bebê é movido rapidamente para baixo, caracterizado pela extensão e abdução dos braços seguida de flexão.",
          category: "Reflexos Primitivos"
        },
        {
          question: "O reflexo de preensão plantar normalmente persiste até qual idade?",
          options: ["3 meses", "6 meses", "9 meses", "12 meses"],
          correctAnswer: 3,
          explanation: "O reflexo de preensão plantar normalmente persiste até aproximadamente 12 meses de idade.",
          category: "Reflexos de Desenvolvimento"
        },
        {
          question: "Qual reflexo é testado ao estimular a lateral da coluna do bebê, causando flexão do tronco?",
          options: ["Reflexo de Galant", "Reflexo de Landau", "Reflexo de Babinski", "Reflexo de Moro"],
          correctAnswer: 0,
          explanation:
            "O Reflexo de Galant é testado estimulando a lateral da coluna do bebê, o que causa flexão do tronco para o lado estimulado.",
          category: "Reflexos Primitivos"
        },
      ],
    },
    {
      id: "reflexos-7-15",
      title: "Reflexos de 7 a 15 meses",
      icon: <Baby className="h-10 w-10 text-[#B9A9FF]" />,
      color: "#B9A9FF",
      questions: [
        {
          question: "O reflexo de apoio positivo normalmente se integra (desaparece) por volta de qual idade?",
          options: [
            "7-8 meses",
            "9-10 meses",
            "11-12 meses",
            "14-15 meses"
          ],
          correctAnswer: 1,
          explanation: "O reflexo de apoio positivo, que faz com que o bebê estenda rigidamente as pernas quando colocado em pé sobre uma superfície, normalmente se integra (desaparece) por volta dos 9-10 meses. Esta integração é importante para permitir que o bebê desenvolva os movimentos de flexão de joelho necessários para o aprendizado da marcha controlada.",
          category: "Reflexos Posturais"
        },
        {
          question: "Qual reflexo postural importante geralmente surge entre os 6-8 meses e é fundamental para o desenvolvimento de reações de equilíbrio na posição sentada?",
          options: [
            "Reflexo de Landau",
            "Reflexo de Anfíbio",
            "Reação de proteção lateral",
            "Reação de rotação corporal"
          ],
          correctAnswer: 2,
          explanation: "A reação de proteção lateral (também conhecida como reflexo de pára-quedas lateral) surge tipicamente entre 6-8 meses e é fundamental para o desenvolvimento de reações de equilíbrio na posição sentada. Caracteriza-se pela extensão do braço para o lado quando o bebê é deslocado lateralmente, protegendo-o de quedas. Esta reação é essencial para que o bebê mantenha a postura sentada de forma independente e segura.",
          category: "Reações de Proteção"
        },
        {
          question: "O reflexo de Landau, quando presente, é um indicador importante de desenvolvimento neuromotor adequado. Em qual faixa etária ele normalmente atinge sua expressão máxima?",
          options: [
            "4-5 meses",
            "7-8 meses",
            "10-12 meses",
            "13-15 meses"
          ],
          correctAnswer: 1,
          explanation: "O reflexo de Landau atinge sua expressão máxima por volta dos 7-8 meses. Este reflexo é observado quando o bebê é suspenso em posição prona (de bruços) no ar, e responde com extensão da cabeça, coluna e quadris, mantendo os membros superiores em semiflexão. É um importante indicador do desenvolvimento adequado do tônus extensor contra a gravidade e do controle postural, sendo precursor de habilidades como o engatinhar e a postura de quatro apoios.",
          category: "Reflexos Posturais"
        },
        {
          question: "A reação de proteção para trás (pára-quedas posterior) surge tipicamente em qual idade e qual sua importância funcional?",
          options: [
            "6 meses; importante para o início do engatinhar",
            "9-10 meses; importante para a segurança na posição sentada",
            "12 meses; importante para o controle do desequilíbrio durante a marcha",
            "15 meses; importante para o desenvolvimento de saltos"
          ],
          correctAnswer: 1,
          explanation: "A reação de proteção para trás (pára-quedas posterior) surge tipicamente aos 9-10 meses e é importante para a segurança na posição sentada. Esta reação permite que o bebê estenda os braços para trás quando está perdendo o equilíbrio nessa direção, evitando quedas e traumatismos. É a última das reações de proteção a se desenvolver (após as anteriores e laterais) e representa um marco importante na capacidade do bebê de manter-se sentado com independência segura mesmo quando movimenta o tronco em todas as direções.",
          category: "Reações de Proteção"
        },
        {
          question: "Entre 7-15 meses, a persistência de qual reflexo primitivo é mais problemática para o desenvolvimento da marcha independente?",
          options: [
            "Reflexo de Galant",
            "Reflexo de preensão plantar",
            "Reflexo de Moro",
            "Reflexo Tônico Labiríntico (RTL)"
          ],
          correctAnswer: 3,
          explanation: "A persistência do Reflexo Tônico Labiríntico (RTL) é a mais problemática para o desenvolvimento da marcha independente nesta faixa etária. Quando persistente, o RTL causa extensão excessiva do corpo quando o bebê está em supino (de costas) e flexão exagerada quando em prono (de bruços). Isso dificulta significativamente a aquisição de postura ereta equilibrada necessária para a marcha, pois o bebê tem dificuldade em manter o alinhamento adequado da cabeça e tronco contra a gravidade, afetando a distribuição de peso, o equilíbrio dinâmico e a coordenação dos movimentos alternados das pernas durante a marcha.",
          category: "Reflexos Primitivos"
        }
      ],
    },
    {
      id: "reacoes-0-15",
      title: "Reações de 0 a 15 meses",
      icon: <HeartPulse className="h-10 w-10 text-[#6EC1E4]" />,
      color: "#6EC1E4",
      questions: [
        {
          question: "Qual reação postural é essencial para proteger o bebê de quedas quando começa a sentar-se de forma independente?",
          options: [
            "Reação de endireitamento do corpo",
            "Reação de anfíbio",
            "Reação de proteção para os lados",
            "Reação de encurtamento dos membros inferiores"
          ],
          correctAnswer: 2,
          explanation: "A reação de proteção para os lados (ou reflexo de paraquedas lateral) é essencial para proteger o bebê de quedas quando começa a sentar-se independentemente. Esta reação surge por volta dos 6-7 meses e envolve a extensão dos braços para o lado quando o bebê é inclinado lateralmente, proporcionando uma 'base de suporte' para evitar quedas e lesões. Esta é a primeira das reações de proteção a se desenvolver e é fundamental para o controle postural na posição sentada.",
          category: "Reações de Proteção"
        },
        {
          question: "As reações retificadoras da cabeça são cruciais para o desenvolvimento motor do bebê. Qual dessas reações surge primeiro?",
          options: [
            "Reação de retificação labiríntica da cabeça",
            "Reação de retificação óptica da cabeça",
            "Reação de retificação corporal da cabeça",
            "Reação de retificação cervical da cabeça"
          ],
          correctAnswer: 0,
          explanation: "A reação de retificação labiríntica da cabeça é a primeira a surgir, geralmente presente desde o nascimento. Esta reação é mediada pelo sistema vestibular (labirinto) e permite que o bebê mantenha a cabeça na posição vertical em relação à gravidade, independentemente da posição do corpo. É fundamental para o desenvolvimento do controle cefálico e base para as demais reações retificadoras que se desenvolvem posteriormente.",
          category: "Reações de Retificação"
        },
        {
          question: "A reação de Landau completa, que normalmente está presente aos 10 meses, é caracterizada por qual padrão motor?",
          options: [
            "Extensão da cabeça e flexão de tronco quando o bebê é suspenso em prono",
            "Flexão de cabeça e extensão de tronco quando o bebê é suspenso em supino",
            "Extensão da cabeça, tronco e membros inferiores quando o bebê é suspenso em prono",
            "Rotação de cabeça e tronco quando o bebê é suspenso verticalmente"
          ],
          correctAnswer: 2,
          explanation: "A reação de Landau completa é caracterizada pela extensão da cabeça, tronco e membros inferiores quando o bebê é suspenso em posição prona (de bruços). Esta reação se desenvolve gradualmente: por volta dos 3 meses, ocorre inicialmente a extensão da cabeça; aos 6 meses, adiciona-se a extensão do tronco; e aos 10 meses, a reação está completa com a extensão também dos membros inferiores. É um importante indicador da maturação do controle postural e do desenvolvimento do tônus extensor contra a gravidade.",
          category: "Reações Posturais"
        },
        {
          question: "As reações de equilíbrio são fundamentais para o desenvolvimento da postura e da locomoção. Em qual sequência de posições elas tipicamente se desenvolvem?",
          options: [
            "Em pé, sentado, quatro apoios, ajoelhado",
            "Supino, prono, sentado, em pé",
            "Prono, supino, sentado, quatro apoios, em pé",
            "Sentado, quatro apoios, ajoelhado, em pé"
          ],
          correctAnswer: 3,
          explanation: "As reações de equilíbrio tipicamente se desenvolvem na sequência: sentado (6-7 meses), quatro apoios (8-9 meses), ajoelhado (9-10 meses) e em pé (12-15 meses). Esta progressão segue o desenvolvimento do controle postural contra a gravidade em posições cada vez mais desafiadoras. As reações de equilíbrio permitem ajustes automáticos do corpo para manter a estabilidade quando há deslocamento do centro de gravidade, sendo essenciais para a aquisição e refinamento de habilidades motoras mais complexas.",
          category: "Reações de Equilíbrio"
        },
        {
          question: "Qual é a sequência correta de desenvolvimento das reações de proteção (paraquedas) em bebês?",
          options: [
            "Para frente, para os lados, para trás",
            "Para os lados, para frente, para trás",
            "Para trás, para frente, para os lados",
            "Para frente, para trás, para os lados"
          ],
          correctAnswer: 0,
          explanation: "A sequência correta de desenvolvimento das reações de proteção (paraquedas) em bebês é: para frente (6 meses), para os lados (7 meses) e para trás (9-10 meses). Esta progressão reflete o desenvolvimento neuromotor e as demandas funcionais. A reação para frente desenvolve-se primeiro, coincidindo com o início da postura sentada e do pivoteio em prono; a lateral surge pouco depois, protegendo o bebê durante a exploração do movimento na posição sentada; e a posterior é a última a aparecer, sendo a mais complexa e relacionada à maturação do controle postural e da consciência corporal.",
          category: "Reações de Proteção"
        }
      ],
    },
    {
      id: "escala-avaliacao",
      title: "Escala de avaliação neonatal",
      icon: <Stethoscope className="h-10 w-10 text-[#A8E6CF]" />,
      color: "#A8E6CF",
      questions: [
        {
          question: "Pergunta exemplo sobre escala de avaliação neonatal",
          options: ["Opção 1", "Opção 2", "Opção 3", "Opção 4"],
          correctAnswer: 0,
          explanation: "Explicação da resposta correta.",
          category: "Avaliação Neonatal"
        },
      ],
    },
    {
      id: "dor-neonatal",
      title: "Dor neonatal",
      icon: <HeartPulse className="h-10 w-10 text-[#FF6B6B]" />,
      color: "#FF6B6B",
      questions: [
        {
          question: "Qual das seguintes escalas de avaliação da dor neonatal incorpora especificamente a medição da variabilidade da frequência cardíaca como um dos parâmetros?",
          options: [
            "Escala NIPS (Neonatal Infant Pain Scale)",
            "Escala PIPP (Premature Infant Pain Profile)",
            "Escala COMFORT",
            "Escala CRIES (Crying, Requires oxygen, Increased vital signs, Expression, Sleeplessness)"
          ],
          correctAnswer: 1,
          explanation: "A escala PIPP (Premature Infant Pain Profile) é a que incorpora especificamente a medição da variabilidade da frequência cardíaca como um dos parâmetros. Esta escala foi desenvolvida para avaliar a dor em recém-nascidos prematuros e a termo, considerando sete indicadores: idade gestacional, estado comportamental, frequência cardíaca, saturação de oxigênio, testa franzida, olhos espremidos e sulco nasolabial. A frequência cardíaca é medida comparando-se a variabilidade antes e durante o procedimento doloroso, sendo um indicador fisiológico importante na avaliação da dor neonatal.",
          category: "Avaliação da Dor"
        },
        {
          question: "Durante a punção de calcâneo para coleta de sangue em um recém-nascido prematuro de 32 semanas, qual intervenção não farmacológica é mais recomendada como primeira linha para alívio da dor?",
          options: [
            "Contenção facilitada apenas",
            "Sacarose oral 24% exclusivamente",
            "Método canguru sem outras medidas",
            "Combinação de sacarose oral, sucção não nutritiva e contenção facilitada"
          ],
          correctAnswer: 3,
          explanation: "A combinação de sacarose oral 24%, sucção não nutritiva (chupeta) e contenção facilitada é a intervenção não farmacológica mais recomendada como primeira linha para alívio da dor durante procedimentos como a punção de calcâneo em prematuros. Esta abordagem multimodal proporciona maior eficácia, pois combina o efeito analgésico da sacarose (mediado pela liberação de opioides endógenos), o efeito calmante da sucção não nutritiva (que ativa mecanismos inibitórios descendentes da dor) e o efeito organizador da contenção facilitada (que proporciona segurança e limites ao bebê). Estudos demonstram que essa combinação é superior a qualquer uma das medidas isoladas.",
          category: "Intervenções não Farmacológicas"
        },
        {
          question: "Qual é o mecanismo neurofisiológico pelo qual a sacarose oral reduz a dor em recém-nascidos submetidos a procedimentos dolorosos?",
          options: [
            "Diminuição direta da condução nervosa nas fibras nociceptivas Aδ e C",
            "Inibição da liberação de mediadores inflamatórios na periferia",
            "Liberação de opioides endógenos e ativação de vias inibitórias descendentes",
            "Bloqueio direto dos receptores NMDA no corno posterior da medula espinhal"
          ],
          correctAnswer: 2,
          explanation: "O mecanismo neurofisiológico pelo qual a sacarose oral reduz a dor em recém-nascidos é através da liberação de opioides endógenos e ativação de vias inibitórias descendentes. A estimulação dos receptores gustativos pelo sabor doce desencadeia a liberação de beta-endorfinas endógenas, que se ligam a receptores opioides no sistema nervoso central, ativando vias inibitórias descendentes da dor. Este mecanismo é confirmado por estudos que demonstram que o efeito analgésico da sacarose pode ser revertido pela administração de naloxona, um antagonista dos receptores opioides, evidenciando o papel do sistema opioide endógeno nesta resposta.",
          category: "Mecanismos da Dor"
        },
        {
          question: "Em relação aos efeitos neurofisiológicos da exposição repetida à dor não tratada em prematuros, qual afirmação está correta?",
          options: [
            "A exposição repetida à dor leva à dessensibilização dos nociceptores, reduzindo a resposta à dor em longo prazo",
            "A dor repetida não afeta o desenvolvimento neurológico pois o sistema nociceptivo ainda é imaturo",
            "A exposição repetida à dor pode causar alterações no processamento sensorial e no desenvolvimento dos sistemas de modulação da dor",
            "Os efeitos da dor não tratada limitam-se ao período neonatal, sem consequências no neurodesenvolvimento posterior"
          ],
          correctAnswer: 2,
          explanation: "A exposição repetida à dor não tratada em prematuros pode causar alterações no processamento sensorial e no desenvolvimento dos sistemas de modulação da dor. Estudos mostram que a dor repetida durante este período crítico de desenvolvimento neuronal pode levar a alterações na organização funcional e estrutural do sistema nervoso, incluindo sensibilização central, alterações na densidade sináptica e na mielinização. Essas alterações podem resultar em processamento anormal da dor em longo prazo, hiperalgesia, alterações no limiar de dor e potencialmente contribuir para problemas neurocomportamentais posteriores, como transtornos de atenção, ansiedade e alterações na resposta ao estresse.",
          category: "Consequências da Dor"
        },
        {
          question: "Quais são os parâmetros comportamentais mais específicos para avaliação da dor em recém-nascidos prematuros extremos (idade gestacional <28 semanas)?",
          options: [
            "Choro vigoroso e agitação motora generalizada",
            "Expressões faciais (sobrancelhas salientes, olhos espremidos, sulco nasolabial) e movimentos de extremidades",
            "Alterações na frequência cardíaca e saturação de oxigênio exclusivamente",
            "Movimentos corporais generalizados e rigidez muscular difusa"
          ],
          correctAnswer: 1,
          explanation: "Em prematuros extremos (idade gestacional <28 semanas), as expressões faciais específicas (sobrancelhas salientes, olhos espremidos, sulco nasolabial) e movimentos de extremidades são os parâmetros comportamentais mais específicos para avaliação da dor. Diferentemente de bebês a termo, os prematuros extremos frequentemente não apresentam choro vigoroso ou agitação generalizada devido à imaturidade neurológica e baixa reserva energética. As expressões faciais são uma resposta mais específica à dor, estando presentes mesmo em prematuros muito imaturos, sendo mediadas por vias nervosas do tronco cerebral que se desenvolvem precocemente. Os parâmetros fisiológicos como alterações na frequência cardíaca são importantes, mas menos específicos, pois podem ser alterados por outros fatores como estresse, fome ou desconforto respiratório.",
          category: "Avaliação da Dor"
        }
      ],
    },
    {
      id: "metodo-canguru",
      title: "Método Canguru",
      icon: <Baby className="h-10 w-10 text-[#A8E6CF]" />,
      color: "#A8E6CF",
      questions: [
        {
          question: "Pergunta exemplo sobre método canguru",
          options: ["Opção 1", "Opção 2", "Opção 3", "Opção 4"],
          correctAnswer: 0,
          explanation: "Explicação da resposta correta.",
          category: "Método Canguru"
        },
      ],
    },
    {
      id: "hidroterapia",
      title: "Hidroterapia em neonatos",
      icon: <Droplets className="h-10 w-10 text-[#6EC1E4]" />,
      color: "#6EC1E4",
      questions: [
        {
          question: "Considerando as propriedades físicas da água, qual é o princípio que explica os benefícios da hidroterapia na redução do tônus muscular em neonatos com hipertonia?",
          options: [
            "Coesão molecular e tensão superficial",
            "Pressão hidrostática e viscosidade",
            "Empuxo e flutuação",
            "Gradiente de temperatura e transferência de calor"
          ],
          correctAnswer: 2,
          explanation: "O empuxo e a flutuação são os princípios físicos que explicam os benefícios da hidroterapia na redução do tônus muscular em neonatos com hipertonia. Estas propriedades reduzem o efeito da gravidade sobre as articulações e músculos, permitindo maior amplitude de movimento com menor esforço e facilitando o relaxamento muscular. Em neonatos com hipertonia, a sensação de flutuação promove redução do tônus por diminuir a ativação dos fusos musculares e órgãos tendinosos de Golgi, o que facilita a reorganização sensório-motora e permite experiências de movimento que seriam impossíveis no ambiente terrestre.",
          category: "Princípios Físicos"
        },
        {
          question: "No contexto da hidroterapia neonatal para prematuros com idade gestacional corrigida entre 32-36 semanas, qual a temperatura da água mais indicada para promover os benefícios terapêuticos minimizando riscos de hipotermia?",
          options: [
            "35-37°C",
            "33-34°C",
            "38-40°C",
            "30-32°C"
          ],
          correctAnswer: 0,
          explanation: "A temperatura da água mais indicada para hidroterapia neonatal em prematuros com idade gestacional corrigida entre 32-36 semanas é de 35-37°C. Esta faixa de temperatura é ideal pois está próxima à temperatura neutra do neonato, minimizando o risco de hipotermia (comum em temperaturas mais baixas) e prevenindo o desconforto ou estresse térmico causado por temperaturas muito elevadas. Os prematuros têm capacidade limitada de termorregulação devido à menor quantidade de gordura subcutânea e maior razão entre superfície corporal e peso, tornando crucial a manutenção de uma temperatura que não induza perda calórica excessiva ou aumento desnecessário do metabolismo para produção de calor.",
          category: "Parâmetros Técnicos"
        },
        {
          question: "Qual técnica de hidroterapia neonatal é mais adequada para promover a organização neurofisiológica e reduzir o estresse em um recém-nascido prematuro com 34 semanas de idade gestacional corrigida?",
          options: [
            "Imersão completa com movimentação ativa",
            "Método Halliwick adaptado com rotações de tronco",
            "Watsu neonatal com movimentos lentos e contenção",
            "Bad Ragaz em padrões diagonais adaptados"
          ],
          correctAnswer: 2,
          explanation: "O Watsu neonatal com movimentos lentos e contenção é a técnica mais adequada para promover a organização neurofisiológica e reduzir o estresse em um recém-nascido prematuro de 34 semanas de idade gestacional corrigida. Esta adaptação da técnica Watsu (Water Shiatsu) para neonatos combina elementos de flutuação, imersão parcial, movimentos lentos e rítmicos, com contenção suave que simula o ambiente intrauterino. A técnica favorece a integração sensorial, estimula o sistema vestibular de forma controlada e promove regulação autonômica, reduzindo marcadores de estresse como cortisol salivar. A contenção durante o procedimento proporciona segurança e facilita a auto-organização do prematuro, enquanto os movimentos lentos promovem relaxamento sem estimulação excessiva, respeitando a maturidade neurológica dessa faixa etária.",
          category: "Técnicas Específicas"
        },
        {
          question: "Quais são as contraindicações absolutas para a hidroterapia neonatal em bebês prematuros?",
          options: [
            "Displasia broncopulmonar leve e refluxo gastroesofágico controlado",
            "Lesões cutâneas cicatrizadas e hiperbilirrubinemia tratada",
            "Cateteres venosos centrais e febre não controlada",
            "Peso inferior a 2000g e idade gestacional corrigida menor que 34 semanas"
          ],
          correctAnswer: 2,
          explanation: "As contraindicações absolutas para a hidroterapia neonatal em bebês prematuros incluem cateteres venosos centrais e febre não controlada. A presença de cateteres venosos centrais representa risco significativo de infecção e complicações, pois estes dispositivos comunicam diretamente com a circulação central e podem ser colonizados por microrganismos presentes na água. A febre não controlada é contraindicação absoluta pois pode indicar processo infeccioso ativo, e a imersão em água, mesmo em temperatura controlada, pode agravar a desregulação térmica e potencializar a resposta inflamatória. As outras condições mencionadas representam contraindicações relativas ou podem ser manejadas com adaptações adequadas durante a terapia.",
          category: "Contraindicações"
        },
        {
          question: "No contexto da hidroterapia para neonatos com padrões hipertônicos de membros inferiores secundários à leucomalácia periventricular, qual técnica específica demonstra maior eficácia na normalização do tônus e facilitação de padrões motores mais funcionais?",
          options: [
            "Turbilhonamento direcionado para membros inferiores",
            "Método dos Anéis de Bad Ragaz adaptado para neonatos",
            "Técnica de imersão alternada com estímulos proprioceptivos",
            "Hidrocinesioterapia com padrões de facilitação neuromuscular proprioceptiva (PNF)"
          ],
          correctAnswer: 3,
          explanation: "A hidrocinesioterapia com padrões de facilitação neuromuscular proprioceptiva (PNF) demonstra maior eficácia na normalização do tônus e facilitação de padrões motores mais funcionais em neonatos com padrões hipertônicos de membros inferiores secundários à leucomalácia periventricular. Esta técnica utiliza movimentos em diagonais funcionais, combinando rotação, flexão/extensão e adução/abdução, aproveitando a redução da gravidade no meio aquático para facilitar movimentos fisiológicos. Os padrões de PNF adaptados para neonatos promovem estímulos proprioceptivos que facilitam a ativação de antagonistas dos músculos hipertônicos, melhoram o recrutamento muscular, facilitam a irradiação de força para grupos musculares enfraquecidos e promovem reorganização dos esquemas motores no sistema nervoso central, sendo particularmente benéficos em lesões da substância branca periventricular, onde há comprometimento das vias corticoespinhais.",
          category: "Aplicações Terapêuticas"
        }
      ],
    },
    {
      id: "sequelas-neurologicas",
      title: "Sequelas de doenças neurológicas em prematuros",
      icon: <Brain className="h-10 w-10 text-[#B9A9FF]" />,
      color: "#B9A9FF",
      questions: [
        {
          question: "Pergunta exemplo sobre sequelas neurológicas",
          options: ["Opção 1", "Opção 2", "Opção 3", "Opção 4"],
          correctAnswer: 0,
          explanation: "Explicação da resposta correta.",
          category: "Sequelas Neurológicas"
        },
      ],
    },
    {
      id: "sequelas-pulmonares",
      title: "Sequelas de doenças pulmonares em prematuros",
      icon: <Stethoscope className="h-10 w-10 text-[#6EC1E4]" />,
      color: "#6EC1E4",
      questions: [
        {
          question: "Qual alteração fisiopatológica é característica da displasia broncopulmonar (DBP) em sua forma 'nova' ou atenuada, comum em prematuros extremos atuais?",
          options: [
            "Hiperplasia das glândulas mucosas e espessamento muscular das vias aéreas",
            "Fibrose pulmonar intersticial extensa e atelectasias",
            "Interrupção do desenvolvimento alveolar normal e redução da vascularização pulmonar",
            "Metaplasia escamosa do epitélio brônquico e enfisema grave"
          ],
          correctAnswer: 2,
          explanation: "A forma 'nova' ou atenuada da displasia broncopulmonar (DBP), comum em prematuros extremos atuais, caracteriza-se principalmente pela interrupção do desenvolvimento alveolar normal e redução da vascularização pulmonar. Diferentemente da forma 'clássica' da DBP, que apresentava lesões como fibrose, hiperplasia muscular e metaplasia escamosa devido ao barotrauma e oxigenotoxicidade graves, a 'nova' DBP ocorre em prematuros extremos (geralmente <28 semanas) que receberam surfactante e ventilação menos agressiva. A patologia é caracterizada por alvéolos maiores e em menor número (simplificação alveolar), redução da septação alveolar, e desenvolvimento vascular pulmonar anormal, resultando em área de troca gasosa reduzida.",
          category: "Fisiopatologia"
        },
        {
          question: "Quais parâmetros respiratórios devem ser monitorizados periodicamente em bebês prematuros com displasia broncopulmonar durante o primeiro ano de vida?",
          options: [
            "Apenas a saturação de oxigênio durante a alimentação e sono",
            "Frequência respiratória e saturação de oxigênio apenas durante infecções",
            "Oximetria contínua noturna, capnografia e gasometria arterial semanais",
            "Saturação de oxigênio em repouso, durante atividades e sono, e frequência respiratória"
          ],
          correctAnswer: 3,
          explanation: "Em bebês prematuros com displasia broncopulmonar durante o primeiro ano de vida, deve-se monitorizar periodicamente a saturação de oxigênio em repouso, durante atividades e sono, além da frequência respiratória. Este monitoramento permite identificar precocemente a hipoxemia intermitente ou persistente, comum nestes pacientes, especialmente durante atividades que aumentam o consumo de oxigênio (alimentação, choro) ou durante o sono quando pode ocorrer hipoventilação. A monitorização deve ser ajustada à gravidade da DBP e individualizada, sendo mais frequente nos primeiros meses após a alta e em pacientes que necessitam de oxigênio domiciliar. As outras opções são inadequadas por serem ou insuficientes para detectar comprometimentos funcionais ou excessivamente invasivas para o seguimento ambulatorial.",
          category: "Monitorização Clínica"
        },
        {
          question: "Qual é a abordagem fisioterapêutica mais apropriada para um lactente de 8 meses (idade corrigida 5 meses) com displasia broncopulmonar moderada a grave durante um episódio de bronquiolite viral?",
          options: [
            "Terapia com CPAP nasal domiciliar contínuo e oxigenoterapia de alto fluxo",
            "Fisioterapia respiratória convencional intensiva com tapotagem e vibração torácica",
            "Técnicas de desobstrução com aumento do fluxo expiratório (AFE) e posicionamento",
            "Espirometria de incentivo e exercícios respiratórios resistidos"
          ],
          correctAnswer: 2,
          explanation: "A abordagem fisioterapêutica mais apropriada para um lactente de 8 meses (idade corrigida 5 meses) com displasia broncopulmonar moderada a grave durante um episódio de bronquiolite viral consiste em técnicas de desobstrução com aumento do fluxo expiratório (AFE) e posicionamento. Estas técnicas são adequadas à idade e condição respiratória do lactente, promovendo a eliminação de secreções sem causar trauma ou desconforto. A AFE lenta e controlada, aplicada respeitando a mecânica ventilatória do lactente, facilita a mobilização das secreções. O posicionamento adequado (elevação da cabeceira, alternância de decúbitos com drenagem postural modificada) otimiza a ventilação-perfusão e facilita a drenagem. As outras opções são inadequadas: CPAP e oxigenoterapia de alto fluxo são decisões médicas e não técnicas fisioterapêuticas; a fisioterapia convencional com tapotagem é contraindicada na bronquiolite aguda podendo piorar o broncoespasmo; e a espirometria e exercícios resistidos são inaplicáveis para lactentes.",
          category: "Abordagem Fisioterapêutica"
        },
        {
          question: "Um prematuro de 30 semanas desenvolveu displasia broncopulmonar e recebeu alta com oxigênio domiciliar a 0,25L/min. Durante sua primeira consulta ambulatorial aos 3 meses de idade corrigida, quais são os sinais clínicos que sugerem aumento da resistência das vias aéreas e necessidade de ajuste terapêutico?",
          options: [
            "Frequência respiratória de 50irpm em repouso, saturação de 89% durante alimentação, e leve retração subcostal",
            "Saturação de 95% em ar ambiente, taquipneia transitória durante choro, ausência de sibilos",
            "Frequência respiratória de 35irpm, saturação de 94% em sono, ausência de tiragem",
            "Cianose de extremidades, apneia durante sono, e sopro cardíaco funcional"
          ],
          correctAnswer: 0,
          explanation: "Os sinais clínicos que sugerem aumento da resistência das vias aéreas e necessidade de ajuste terapêutico em um prematuro com displasia broncopulmonar incluem frequência respiratória de 50irpm em repouso (taquipneia significativa para a idade), saturação de 89% durante alimentação (dessaturação durante atividade que aumenta demanda metabólica), e presença de retração subcostal (sinal de aumento do trabalho respiratório). Este conjunto de sinais indica que o fluxo de oxigênio domiciliar atual (0,25L/min) é insuficiente e/ou que há broncoespasmo/obstrução das vias aéreas que necessita de tratamento adicional como broncodilatadores. As outras opções descrevem situações sem comprometimento significativo ou com sinais não característicos de aumento da resistência das vias aéreas em DBP.",
          category: "Avaliação Clínica"
        },
        {
          question: "Qual estratégia é mais eficaz para estimular o desenvolvimento neuropsicomotor em prematuros com displasia broncopulmonar moderada a grave durante o primeiro ano de vida?",
          options: [
            "Atividades motoras intensas em ambiente com oxigênio suplementar para compensar o aumento do consumo energético",
            "Restrição de atividades físicas até os 12 meses para evitar exacerbações respiratórias",
            "Estimulação motora adaptada às limitações respiratórias, com monitoramento da saturação durante as atividades",
            "Foco exclusivo na reabilitação respiratória, postergando a estimulação motora para após a resolução da displasia"
          ],
          correctAnswer: 2,
          explanation: "A estratégia mais eficaz para estimular o desenvolvimento neuropsicomotor em prematuros com displasia broncopulmonar moderada a grave é a estimulação motora adaptada às limitações respiratórias, com monitoramento da saturação durante as atividades. Esta abordagem reconhece a importância da estimulação precoce para o desenvolvimento neuropsicomotor adequado, mas adapta as atividades às limitações respiratórias do bebê. O monitoramento da saturação durante as atividades permite identificar sinais de fadiga ou esforço excessivo, ajustando a intensidade e duração da estimulação. As outras opções são inadequadas: atividades motoras intensas podem sobrecarregar o sistema cardiorrespiratório; a restrição de atividades físicas prejudica o desenvolvimento motor; e postergar a estimulação motora ignora a importância dos períodos críticos de desenvolvimento neuroplástico.",
          category: "Desenvolvimento Neuropsicomotor"
        }
      ],
    },
  ]

  const quiz = quizzes.find((q) => q.id === slug)

  if (!quiz) {
    notFound()
  }

  const handleAnswerSelect = (index: number) => {
    if (isAnswered) return

    setSelectedAnswer(index)
    setIsAnswered(true)

    if (index === quiz.questions[currentQuestion].correctAnswer) {
      setScore(score + 1)
      setFeedbackMessage("Correto! " + quiz.questions[currentQuestion].explanation)
    } else {
      setFeedbackMessage(
        "Incorreto. A resposta correta é: " +
          quiz.questions[currentQuestion].options[quiz.questions[currentQuestion].correctAnswer] +
          ". " +
          quiz.questions[currentQuestion].explanation,
      )
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
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

    quiz.questions.forEach((question, index) => {
      const category = question.category || quiz.title

      if (!categories[category]) {
        categories[category] = { total: 0, correct: 0 }
      }

      categories[category].total += 1

      // Verifica se a pergunta foi respondida corretamente
      if (index < currentQuestion && quiz.questions[index].correctAnswer === selectedAnswer) {
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

  // Retorna progresso em porcentagem
  const getProgress = () => {
    return ((currentQuestion + 1) / quiz.questions.length) * 100
  }

  // Cálculo da nota final
  const calculateFinalGrade = () => {
    const percentage = (score / quiz.questions.length) * 100
    return percentage.toFixed(1)
  }

  // Cores para as categorias
  const getCategoryColor = (category: string) => {
    const colorMap: Record<string, string> = {
      "Reflexos Primitivos": "#6EC1E4",
      "Reflexos de Desenvolvimento": "#B9A9FF",
      "Reações Posturais": "#A8E6CF",
      "Avaliação Neonatal": "#A8E6CF",
      "Dor Neonatal": "#FF6B6B",
      "Método Canguru": "#A8E6CF",
      "Hidroterapia Neonatal": "#6EC1E4",
      "Sequelas Neurológicas": "#B9A9FF",
      "Sequelas Pulmonares": "#6EC1E4",
    }
    
    return colorMap[category] || quiz.color || "#6EC1E4"
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
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg bg-gradient-to-r from-[${quiz.color}]/10 to-[${quiz.color}]/5`}>
                  {quiz.icon}
        </div>
                <div>
                  <span className={`px-4 py-1.5 bg-gradient-to-r from-[${quiz.color}]/10 to-[${quiz.color}]/5 rounded-full text-sm font-medium text-[${quiz.color}] inline-block mb-2`}>
                    Prova temática
                </span>
                  <h1 className="text-2xl md:text-3xl font-bold text-[#333333]">{quiz.title}</h1>
                </div>
              </div>
              
              <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-lg py-2 px-4 shadow-sm">
                <AlarmClock className="h-4 w-4 text-[#6EC1E4]" />
                <span className="text-sm font-medium">{formatTime(timer)}</span>
              </div>
            </div>

            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mb-4">
              <motion.div 
                className={`h-full bg-[${quiz.color}]`}
                style={{ width: `${getProgress()}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${getProgress()}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            
            <div className="flex justify-between items-center text-sm text-[#666666]">
              <span>Questão {currentQuestion + 1} de {quiz.questions.length}</span>
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
                  backgroundColor: `${getCategoryColor(quiz.questions[currentQuestion].category || quiz.title)}20`,
                  color: getCategoryColor(quiz.questions[currentQuestion].category || quiz.title)
                }}
              >
                {quiz.questions[currentQuestion].category || quiz.title}
              </span>
              
              <h2 className="text-xl md:text-2xl font-semibold text-[#333333] mb-6">
                {quiz.questions[currentQuestion].question}
              </h2>
              
              <div className="space-y-3 mb-6" style={{ position: "relative", zIndex: 50, pointerEvents: "auto" }}>
                  {quiz.questions[currentQuestion].options.map((option, index) => (
                  <motion.button
                      key={index}
                    className={`w-full text-left p-4 rounded-lg border transition-all ${
                        selectedAnswer === index
                          ? index === quiz.questions[currentQuestion].correctAnswer
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
                            ? index === quiz.questions[currentQuestion].correctAnswer
                              ? "bg-green-100 text-green-600"
                              : "bg-red-100 text-red-600"
                            : "bg-gray-100 text-gray-400"
                        }`}>
                          {selectedAnswer === index ? (
                            index === quiz.questions[currentQuestion].correctAnswer ? (
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
                    selectedAnswer === quiz.questions[currentQuestion].correctAnswer
                      ? "bg-green-50 border border-green-100"
                      : "bg-red-50 border border-red-100"
                  }`}
                >
                  <p className={`text-sm ${
                        selectedAnswer === quiz.questions[currentQuestion].correctAnswer
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
                    {currentQuestion < quiz.questions.length - 1 ? "Próxima questão" : "Ver resultados"}
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
                  <div className="text-4xl font-bold text-[#B9A9FF]">{quiz.questions.length}</div>
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

            <div className="flex flex-wrap gap-4 justify-center mt-8">
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
                  Voltar para Provas
                </span>
              </MagneticButton>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
