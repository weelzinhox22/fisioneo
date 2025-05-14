"use client"

import React, { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, CheckCircle2, XCircle, BarChart, TrendingUp, ChevronRight, AlarmClock } from "lucide-react"
import Link from "next/link"
import { ThreeDText } from "@/components/ui/3d-text"
import { AdvancedParallax } from "@/components/animations/advanced-parallax"
import { MagneticButton } from "@/components/ui/magnetic-button"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register GSAP plugins on client-side only
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function ProvaGeralPage() {
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

  // Exemplo de perguntas para a prova geral
  const questions = [
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
      explanation: "A estimulação sensorial multimodal com posicionamento em flexão e contenção facilitada é a conduta mais adequada para este caso, pois respeita o desenvolvimento neurológico do prematuro, promove organização postural, facilita a integração dos reflexos primitivos e favorece experiências sensoriais positivas. Alongamentos isolados não abordam a desorganização neurológica, técnicas de PNF são avançadas para esta idade, e o treino de marcha seria inadequado neste estágio."
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
      explanation: "A imersão em água aquecida durante a hidroterapia neonatal promove a redução do estresse e estabilização dos sinais vitais. Estudos demonstram que após a hidroterapia ocorre diminuição da frequência cardíaca e respiratória, aumento da saturação de oxigênio e redução de comportamentos indicativos de estresse, com diminuição dos níveis de cortisol."
    },
    {
      question: "No Método Canguru, a posição do recém-nascido no decúbito lateral direito durante o contato pele a pele está associada a qual benefício?",
      options: [
        "Diminuição da saturação de oxigênio",
        "Aumento dos sinais de desconforto respiratório",
        "Aumento dos níveis de SatO2 e redução do desconforto respiratório",
        "Não há benefícios específicos nesta posição comparada a outras"
      ],
      correctAnswer: 2,
      category: "Método Canguru",
      explanation: "Conforme estudos sobre a posição canguru em diferentes decúbitos, o decúbito lateral direito durante o contato pele a pele aumenta os níveis de saturação de oxigênio (SatO2) e reduz os sinais de desconforto respiratório do bebê. Esta posição facilita uma melhor expansão torácica e melhora a ventilação-perfusão, promovendo bem-estar respiratório."
    },
    {
      question: "Um recém-nascido de 29 semanas apresenta irritabilidade, choro intenso, expressão facial de dor, alteração na saturação de oxigênio e frequência cardíaca durante uma punção venosa. Qual escala é mais adequada para avaliar a dor neste procedimento?",
      options: [
        "Escala EDIN (Échelle Douleur Inconfort Nouveau-Né)",
        "Escala NIPS (Neonatal Infant Pain Scale)",
        "Escala PIPP-R (Premature Infant Pain Profile – Revised)",
        "Escala N-PASS (Neonatal Pain Agitation and Sedation Scale)"
      ],
      correctAnswer: 2,
      category: "Dor Neonatal",
      explanation: "A escala PIPP-R (Premature Infant Pain Profile – Revised) é a mais adequada para este caso por ser especificamente adaptada para prematuros, avaliando não apenas as respostas comportamentais como expressão facial, mas também as respostas fisiológicas (frequência cardíaca, saturação de oxigênio) e considerando a idade gestacional como fator de correção, o que é fundamental para a avaliação em um prematuro de 29 semanas."
    },
    {
      question: "Bebê de 4 meses, nascido a termo, apresenta persistência do Reflexo Tônico Cervical Assimétrico (RTCA) além do tempo esperado. Como este reflexo influencia o desenvolvimento motor e quais consequências sua persistência pode causar?",
      options: [
        "Facilita o desenvolvimento do controle cefálico e não causa prejuízos significativos",
        "Dificulta o alcance de marcos como rolar e sentar, prejudicando a simetria e orientação na linha média",
        "Acelera o processo de controle de tronco, mas prejudica a coordenação entre membros superiores e inferiores",
        "Não interfere no desenvolvimento motor típico, sendo uma variação normal do desenvolvimento"
      ],
      correctAnswer: 1,
      category: "Desenvolvimento Motor",
      explanation: "A persistência do Reflexo Tônico Cervical Assimétrico (RTCA) além do tempo esperado dificulta a aquisição de marcos motores como rolar e sentar, pois impede que o bebê explore a linha média, desenvolvendo padrões de movimento assimétricos. Este reflexo, quando persistente, inibe a coordenação bilateral, dificultando atividades como levar as mãos à linha média, fundamentais para o desenvolvimento motor típico."
    },
    {
      question: "Uma criança nascida prematura com 32 semanas apresenta, aos 18 meses, dificuldades na marcha com padrão de hipertonia em membros inferiores, caracterizada por flexão de quadril, rotação interna e adução, joelhos semiflexionados e pés em equino. Qual é o diagnóstico mais provável e quais lesões cerebrais comumente estão associadas a este quadro?",
      options: [
        "Atraso do desenvolvimento motor; Malformação do corpo caloso",
        "Paralisia cerebral discinética; Lesão dos gânglios da base",
        "Paralisia cerebral espástica bilateral; Leucomalácia periventricular",
        "Ataxia cerebelar; Hemorragia cerebelar"
      ],
      correctAnswer: 2,
      category: "Sequelas Neurológicas em Prematuros",
      explanation: "O quadro descrito é característico de Paralisia Cerebral espástica bilateral, com predomínio em membros inferiores (diparesia espástica), que está frequentemente associada à Leucomalácia Periventricular (LPV). A LPV é uma lesão isquêmica da substância branca periventricular comum em prematuros, afetando principalmente as fibras descendentes do trato córtico-espinhal que inervam os membros inferiores, resultando no padrão típico de hipertonia espástica descrito."
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
      explanation: "É importante utilizar escalas multidimensionais porque a resposta à dor em prematuros pode ser atenuada ou desorganizada devido à imaturidade do sistema nervoso. Prematuros podem apresentar menor capacidade de sustentação da resposta comportamental à dor e maior variabilidade nas respostas fisiológicas. A combinação de parâmetros fisiológicos (FC, FR, SatO2) e comportamentais (expressão facial, choro, estado de sono/vigília) permite uma avaliação mais precisa e individualizada da experiência dolorosa."
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
      explanation: "A conduta imediata deve ser finalizar a sessão, retirar o bebê da água, secá-lo e aquecê-lo, além de monitorar seus sinais vitais. A diminuição súbita da temperatura corporal e palidez são sinais de estresse térmico que podem levar à hipotermia, que é particularmente perigosa em prematuros devido à sua menor reserva de gordura corporal, maior superfície corporal em relação à massa e imaturidade do centro de termorregulação. A continuidade do procedimento poderia agravar o quadro e levar a complicações graves."
    },
    {
      question: "Um recém-nascido de 3 meses de idade corrigida (nascido com 32 semanas) apresenta movimentos de membros superiores com padrão discinético, força de preensão palmar assimétrica e dificuldade em manter a cabeça na linha média. Qual instrumento de avaliação é mais apropriado para detectar precocemente alterações neuromotoras neste caso?",
      options: [
        "Escala de Denver II",
        "Teste de Gesell",
        "TIMP (Test of Infant Motor Performance)",
        "Escala Motora de Alberta (AIMS)"
      ],
      correctAnswer: 2,
      category: "Avaliação Neonatal",
      explanation: "O TIMP (Test of Infant Motor Performance) é o instrumento mais apropriado para este caso pois foi desenvolvido especificamente para avaliar qualidade e organização do movimento em bebês prematuros. É ideal para bebês nascidos a partir de 34 semanas pós-concepção até 4 meses de idade corrigida. Diferentemente dos outros testes mencionados, o TIMP é particularmente sensível para detectar precocemente alterações na qualidade do movimento e assimetrias, além de ter alto valor preditivo para identificar bebês com risco de desenvolvimento motor atípico."
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
      explanation: "Na terceira fase do Método Canguru, que ocorre após a alta hospitalar, o papel do fisioterapeuta inclui avaliar periodicamente o desenvolvimento neuropsicomotor do bebê, orientar os pais quanto ao posicionamento adequado e atividades de estimulação em domicílio. O fisioterapeuta também deve detectar precocemente desvios do desenvolvimento, adaptar as intervenções conforme crescimento e necessidades da criança, e trabalhar integrado à equipe multidisciplinar no acompanhamento ambulatorial até o bebê atingir 2.500g, contribuindo para a continuidade do cuidado."
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
      explanation: "A combinação de glicose oral, contato pele a pele e sucção não-nutritiva oferece maior efeito analgésico por atuar em diferentes mecanismos. A glicose ativa receptores gustativos e libera endorfinas endógenas; o contato pele a pele promove liberação de ocitocina, estabilização dos sinais vitais e reduz o estresse; e a sucção não-nutritiva ativa mecanismos de autorregulação e inibição da hiperatividade. Estudos demonstram que esta abordagem multimodal potencializa o efeito analgésico, sendo mais eficaz que qualquer estratégia isolada, especialmente em procedimentos repetitivos."
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
      explanation: "Para a aplicação segura da ofuroterapia, a água deve estar entre 36,5°C e 37°C (similar à temperatura corporal), verificada com termômetro digital antes da imersão. É essencial o monitoramento contínuo dos sinais vitais durante toda a sessão, que deve durar entre 5-10 minutos para evitar estresse térmico. O ambiente deve ter temperatura controlada, o procedimento deve ser interrompido imediatamente se houver sinais de instabilidade, e a cabeça/pescoço do bebê devem estar adequadamente apoiados para manter as vias aéreas livres."
    },
    {
      question: "Ao avaliar um bebê prematuro de 7 meses de idade corrigida com histórico de Hemorragia Peri-intraventricular grau III, você observa aumento do tônus extensor em tronco com hipertonia em membros inferiores. De acordo com os padrões de evolução do tônus muscular no primeiro ano de vida, o que este achado representa?",
      options: [
        "Desenvolvimento motor típico, pois aos 7 meses o segundo padrão extensor já deveria estar presente",
        "Atraso no desenvolvimento por persistência do primeiro padrão extensor além do tempo esperado",
        "Alteração neurológica com hipertonia patológica, sugerindo desenvolvimento de paralisia cerebral",
        "Variação normal do desenvolvimento, sem necessidade de intervenção específica"
      ],
      correctAnswer: 2,
      category: "Sequelas Neurológicas em Prematuros",
      explanation: "O achado representa uma alteração neurológica com hipertonia patológica, sugerindo desenvolvimento de paralisia cerebral. Aos 7 meses de idade corrigida, o bebê deveria estar no segundo padrão flexor, caracterizado pela capacidade de segurar os pés e levá-los à boca. A presença de padrão extensor em tronco com hipertonia em membros inferiores, associada ao histórico de HPIV grau III (que envolve hemorragia com dilatação ventricular), é altamente sugestiva de paralisia cerebral espástica, necessitando intervenção precoce e especializada."
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
      explanation: "A sequência correta de aquisição das reações posturais é: reação de proteção para frente (surge por volta dos 6 meses), reação de proteção lateral (surge por volta dos 7-8 meses) e reação de proteção para trás (surge por volta dos 9-10 meses). Esta sequência acompanha o desenvolvimento do controle postural do bebê, que primeiro consegue se proteger na direção anterior, quando começa a sentar sem apoio, depois lateralmente e, por fim, posteriormente, quando já tem maior estabilidade na posição sentada."
    },
    {
      question: "Bebê de 32 semanas submetido a hidroterapia apresenta, após 5 sessões, melhora nos parâmetros de frequência cardíaca e respiratória em repouso. Este resultado pode ser atribuído a qual dos seguintes mecanismos fisiológicos da imersão em água aquecida?",
      options: [
        "Aumento da pressão arterial sistêmica e maior débito cardíaco",
        "Vasoconstrição periférica e aumento da resistência vascular",
        "Efeito térmico com vasodilatação e pressão hidrostática promovendo melhor retorno venoso",
        "Estimulação do sistema nervoso simpático com aumento do tônus vagal"
      ],
      correctAnswer: 2,
      category: "Hidroterapia em Neonatos",
      explanation: "A melhora nos parâmetros de frequência cardíaca e respiratória pode ser atribuída ao efeito térmico da água aquecida, que promove vasodilatação periférica, combinada à pressão hidrostática que facilita o retorno venoso. Estes efeitos melhoram a performance cardíaca e a circulação periférica, resultando em maior eficiência cardiovascular com menor demanda energética. Adicionalmente, a imersão em água aquecida tem efeito relaxante que reduz o estresse, contribuindo para a estabilização dos sinais vitais mesmo fora do ambiente aquático."
    },
    {
      question: "Durante a avaliação fisioterapêutica de um recém-nascido a termo com 2 dias de vida, é observada assimetria nos movimentos espontâneos dos membros superiores, com mão direita predominantemente fechada. A motricidade provocada demonstra restrição na abertura dos dedos à direita. O que estes achados sugerem?",
      options: [
        "Características normais do desenvolvimento neuromotor neonatal",
        "Reflexo tônico cervical assimétrico fisiológico para a idade",
        "Possível lesão do plexo braquial tipo Erb-Duchenne",
        "Imaturidade transitória do controle motor fino"
      ],
      correctAnswer: 2,
      category: "Avaliação Neonatal",
      explanation: "Os achados de assimetria nos movimentos espontâneos com mão predominantemente fechada e restrição na abertura dos dedos unilateralmente (à direita) sugerem possível lesão do plexo braquial tipo Erb-Duchenne. Esta lesão afeta as raízes nervosas C5-C6 e resulta em comprometimento da abdução e rotação externa do ombro, supinação do antebraço e extensão do punho e dedos. A assimetria persistente não é característica normal do desenvolvimento neuromotor neonatal e não se explica pelo reflexo tônico cervical assimétrico, que é temporário e relacionado à posição da cabeça."
    },
    {
      question: "Uma criança nascida prematura com 30 semanas, agora com 4 anos, apresenta dificuldades de aprendizagem, especialmente em matemática e habilidades visuoespaciais, apesar de ter QI na faixa normal. Estudos de neuroimagem na fase neonatal evidenciaram lesão difusa da substância branca. Qual é a explicação neurofisiológica mais provável para este quadro?",
      options: [
        "Lesão focal do córtex motor primário com preservação das áreas de associação",
        "Comprometimento da mielinização e conectividade entre diferentes regiões cerebrais",
        "Atrofia cortical progressiva secundária à epilepsia não tratada",
        "Sequela de acidente vascular cerebral neonatal em território da artéria cerebral média"
      ],
      correctAnswer: 1,
      category: "Sequelas Neurológicas em Prematuros",
      explanation: "A explicação neurofisiológica mais provável é o comprometimento da mielinização e conectividade entre diferentes regiões cerebrais. A lesão difusa da substância branca, comum em prematuros, resulta em perda de oligodendrócitos e prejuízo na mielinização, afetando a eficiência da transmissão de sinais entre áreas cerebrais distantes. Isto compromete particularmente funções cognitivas complexas que dependem de redes neurais distribuídas, como matemática e habilidades visuoespaciais, mesmo quando o QI geral está preservado, caracterizando um déficit específico de conectividade cerebral."
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
      explanation: "O fisioterapeuta deve orientar a posição vertical, levemente reclinada, com cabeça lateralizada e vias aéreas livres. Esta posição otimiza a função respiratória ao promover melhor expansão diafragmática, reduzir o trabalho respiratório e diminuir o risco de obstrução das vias aéreas. A posição vertical favorece a estabilização da caixa torácica e melhora a ventilação das bases pulmonares. A leve lateralização da cabeça previne flexão excessiva do pescoço, enquanto o suporte adequado do corpo proporciona contenção sem restringir os movimentos respiratórios."
    }
  ]

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
