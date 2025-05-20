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

export default function ProvaPediatricaPage() {
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
      question: "Qual é o principal papel da fisioterapia em pacientes com Distrofia Muscular de Duchenne (DMD)?",
      options: [
        "Reverter o processo de degeneração muscular através de técnicas específicas que estimulam a regeneração de fibras musculares, melhorando a síntese proteica nas células danificadas",
        "Realizar apenas alongamentos passivos para evitar atrofia, mantendo o tecido muscular em comprimento funcional e preservando capacidades residuais sem sobrecarregar o sistema musculoesquelético",
        "Retardar a progressão da doença e prevenir complicações secundárias, melhorando a qualidade de vida dos pacientes através de abordagens multidimensionais",
        "Iniciar precocemente o uso de cadeira de rodas para preservar energia metabólica, evitando o gasto energético excessivo que acelera a degeneração muscular nas fases iniciais da doença"
      ],
      correctAnswer: 2,
      category: "Distrofia Muscular de Duchenne",
      explanation: "A fisioterapia desempenha um papel fundamental no retardo da progressão da doença e na prevenção de complicações secundárias. Embora não possa reverter o processo degenerativo, intervenções fisioterapêuticas adequadas podem melhorar significativamente a qualidade de vida dos pacientes com DMD."
    },
    {
      question: "Na Distrofia Muscular de Duchenne, o que caracteriza a manobra de Gowers?",
      options: [
        "Capacidade de elevar os braços acima da cabeça para avaliação da força muscular de cintura escapular, importante na identificação de fraqueza proximal nos estágios iniciais da doença",
        "Padrão respiratório com predominância torácica, desenvolvido como mecanismo compensatório à fraqueza progressiva do diafragma, visível durante avaliação respiratória específica",
        "Contração involuntária dos músculos faciais durante o esforço físico intenso, relacionada à disfunção neurológica secundária à doença neuromuscular progressiva",
        "Uso sequencial dos membros e tronco para levantar-se do chão, indicando fraqueza dos músculos proximais dos membros inferiores devido à atrofia muscular característica"
      ],
      correctAnswer: 3,
      category: "Distrofia Muscular de Duchenne",
      explanation: "A manobra de Gowers é um sinal clínico característico da DMD que indica fraqueza nos músculos proximais dos membros inferiores devido à atrofia muscular. O paciente utiliza as mãos para 'escalar' o próprio corpo ao se levantar do chão, apoiando-se sequencialmente nos joelhos e coxas."
    },
    {
      question: "Qual das seguintes estratégias fisioterapêuticas é mais recomendada para o tratamento da Distrofia Muscular de Duchenne?",
      options: [
        "Exercícios submáximos regulares combinados com alongamentos, visando manutenção da função muscular e prevenção de contraturas sem causar danos adicionais",
        "Exercícios resistidos intensos para fortalecer a musculatura, especialmente em fases iniciais da doença, aumentando a resistência à fadiga e fortalecendo as fibras musculares ainda funcionais",
        "Imobilização prolongada para preservar a energia muscular, minimizando microlesões por esforço e reduzindo o catabolismo proteico excessivo nas fibras musculares comprometidas",
        "Terapia por restrição de movimento para focar na funcionalidade, concentrando o treinamento em grupos musculares específicos que permanecerão funcionais por mais tempo durante a progressão da doença"
      ],
      correctAnswer: 0,
      category: "Distrofia Muscular de Duchenne",
      explanation: "O exercício submáximo regular combinado com alongamentos é recomendado para evitar a atrofia muscular por desuso e prevenir contraturas. Exercícios resistidos intensos podem acelerar a degeneração muscular, enquanto a imobilização prolongada promove a atrofia e as contraturas."
    },
    {
      question: "Quais são os principais benefícios da hidroterapia no tratamento da Distrofia Muscular de Duchenne?",
      options: [
        "Aumento da rigidez muscular e melhora do equilíbrio através da resistência constante oferecida pela água, potencializando o desenvolvimento do tônus muscular protetor nas articulações instáveis",
        "Apenas recreação e socialização para melhorar aspectos psicológicos, sem benefícios físicos diretos, mas com importante papel na qualidade de vida e socialização destes pacientes",
        "Fortalecimento muscular através de alta resistência, com sobrecarga progressiva que só é possível no meio aquático devido à propriedade de resistência hidrodinâmica da água em diferentes velocidades",
        "Flutuabilidade que facilita movimentos, fortalecimento muscular gradual e relaxamento muscular, permitindo exercícios com menor impacto e maior amplitude funcional"
      ],
      correctAnswer: 3,
      category: "Distrofia Muscular de Duchenne",
      explanation: "A hidroterapia oferece múltiplos benefícios para pacientes com DMD: as propriedades físicas da água facilitam a movimentação através da flutuabilidade, proporcionam resistência gradual para fortalecimento dos músculos atrofiados, e as propriedades térmicas auxiliam no relaxamento muscular. Além disso, permite exercícios respiratórios, treino de marcha e atividades lúdicas em ambiente de baixo impacto."
    },
    {
      question: "Por que a adequação postural em cadeiras de rodas é fundamental para pacientes com Distrofia Muscular de Duchenne?",
      options: [
        "Para diminuir o desconforto respiratório e prevenir deformidades na coluna vertebral, mantendo o alinhamento postural adequado e favorecendo a mecânica respiratória",
        "Apenas para proporcionar conforto durante o posicionamento sentado prolongado, sem impacto significativo na progressão da doença ou em complicações secundárias a longo prazo",
        "Para fortalecer a musculatura paravertebral através do estímulo constante à manutenção ativa da postura, criando adaptações musculares compensatórias benéficas",
        "Somente para facilitar o transporte do paciente e permitir maior independência de mobilidade em ambientes variados, sem considerações terapêuticas específicas"
      ],
      correctAnswer: 0,
      category: "Distrofia Muscular de Duchenne",
      explanation: "A adequação postural em cadeiras de rodas é fundamental para diminuir o desconforto respiratório e prevenir deformidades na coluna vertebral. A postura inadequada pode levar à escoliose e comprometer a eficácia da respiração. O alinhamento postural adequado evita compensações na coluna vertebral, beneficiando a função respiratória, que é frequentemente afetada pela doença."
    },
    {
      question: "Qual tecnologia assistiva tem mostrado resultados promissores na melhoria da condição física e funcional de pacientes com Distrofia Muscular de Duchenne?",
      options: [
        "Somente ventilação não-invasiva com diferentes modos respiratórios programáveis, que além de auxiliar na função respiratória, proporciona estímulo à musculatura acessória da respiração",
        "Realidade virtual com interfaces específicas, proporcionando estímulo motor, cognitivo e motivacional através de ambientes interativos adaptados",
        "Exclusivamente órteses rígidas confeccionadas com materiais termomoldáveis de alta tecnologia, que restringem movimentos anormais e previnem deformidades progressivas",
        "Apenas estimulação elétrica neuromuscular de baixa frequência e longa duração, para recrutamento seletivo de fibras musculares tipo I resistentes à fadiga"
      ],
      correctAnswer: 1,
      category: "Distrofia Muscular de Duchenne",
      explanation: "A realidade virtual tem mostrado resultados promissores no tratamento da DMD. Estudos demonstram que o uso de jogos de computador com interfaces específicas pode proporcionar um melhor desempenho motor, ativando a função muscular distal e facilitando os ajustes posturais por meio de interfaces virtuais, além de proporcionar uma abordagem lúdica que aumenta a adesão ao tratamento."
    },
    {
      question: "Qual é a recomendação atual sobre o uso de órteses em pacientes com Distrofia Muscular de Duchenne?",
      options: [
        "Uso precoce, especialmente AFOs articuladas, antes que o déficit funcional esteja avançado, permitindo manutenção da biomecânica e função por períodos mais longos",
        "Evitar completamente para não causar dependência dos dispositivos externos, o que poderia acelerar a atrofia por desuso e comprometer a funcionalidade remanescente",
        "Utilizar apenas durante a noite para não interferir nas atividades diárias, mantendo o alongamento das estruturas sem comprometer a independência funcional durante o dia",
        "Usar apenas em fases avançadas da doença, quando as contraturas já estiverem estabelecidas, como medida paliativa para prevenir úlceras por pressão e dor"
      ],
      correctAnswer: 0,
      category: "Distrofia Muscular de Duchenne",
      explanation: "O uso precoce de órteses, especialmente as AFOs (Ankle-Foot Orthosis) articuladas, pode promover mudanças positivas nos parâmetros da marcha em pacientes com DMD, desde que utilizadas antes que o déficit funcional esteja avançado. As órteses ajudam a prevenir deformidades, prolongam a fase ambulatória e melhoram a funcionalidade."
    },
    {
      question: "Qual é o mecanismo que causa a Distrofia Muscular de Duchenne em nível celular?",
      options: [
        "Ausência ou deficiência da proteína distrofina, essencial para a integridade da membrana celular durante a contração muscular",
        "Excesso de produção de miosina, causando hipercontratilidade e subsequente degeneração das fibras musculares por sobrecarga metabólica crônica",
        "Inflamação crônica do tecido muscular mediada por citocinas pró-inflamatórias, resultando em degradação proteica acelerada e resposta autoimune",
        "Hipertrofia das fibras musculares tipo II com substituição progressiva das fibras tipo I, alterando o metabolismo energético e a capacidade oxidativa do músculo"
      ],
      correctAnswer: 0,
      category: "Distrofia Muscular de Duchenne",
      explanation: "A DMD é causada por um defeito bioquímico intrínseco da célula muscular, relacionado à ausência ou deficiência da proteína distrofina. Esta proteína é essencial para manter a integridade da membrana celular durante a contração muscular. Sua ausência leva à ruptura da membrana e à morte celular, resultando em degeneração muscular progressiva."
    },
    {
      question: "Quais técnicas respiratórias são mais indicadas para pacientes com Distrofia Muscular de Duchenne em fase avançada?",
      options: [
        "Técnicas de expansão pulmonar, treino dos músculos respiratórios e tosse assistida, visando manter a complacência pulmonar e prevenir complicações respiratórias",
        "Exclusivamente manobras de percussão torácica realizadas com alta frequência e baixa intensidade, concentrando-se apenas nas regiões basais do pulmão onde ocorre maior retenção de secreções",
        "Apenas exercícios de respiração abdominal com padrão diafragmático forçado, evitando completamente o uso de musculatura acessória para não acelerar a fadiga muscular",
        "Somente técnicas de expiração forçada com pressão positiva expiratória, sem qualquer intervenção durante a fase inspiratória para não sobrecarregar a musculatura já comprometida"
      ],
      correctAnswer: 0,
      category: "Distrofia Muscular de Duchenne",
      explanation: "Na fase avançada da DMD, as técnicas respiratórias mais indicadas incluem uma combinação de técnicas de expansão pulmonar (incentivadores respiratórios, respiração glossofaríngea), treino dos músculos respiratórios (dentro dos limites da fadiga) e técnicas de tosse assistida (manual ou mecânica). Estas abordagens visam manter a complacência pulmonar, a capacidade vital e a eficácia da tosse, prevenindo complicações respiratórias que são causa frequente de morbimortalidade."
    },
    {
      question: "Qual é a definição de cuidados paliativos segundo a Organização Mundial da Saúde (OMS)?",
      options: [
        "Apenas controle da dor em pacientes terminais, focando exclusivamente no conforto físico sem considerar aspectos psicológicos, sociais ou espirituais do paciente e seus familiares",
        "Medidas para acelerar a morte sem sofrimento do paciente, quando solicitado formalmente pelo indivíduo ou seus responsáveis legais em situações de doença terminal irreversível",
        "Cuidados exclusivos para pacientes nos últimos dias de vida, implementados apenas quando todas as possibilidades terapêuticas curativas foram esgotadas e o óbito é iminente",
        "Cuidado ativo e integral de pacientes cuja doença não responde mais ao tratamento curativo, visando controle de sintomas e melhor qualidade de vida possível"
      ],
      correctAnswer: 3,
      category: "Cuidados Paliativos Pediátricos",
      explanation: "A OMS define cuidados paliativos como o cuidado ativo e integral de pacientes cuja doença não responde mais ao tratamento curativo. O foco principal é o controle da dor e dos sintomas físicos, psicológicos, sociais e espirituais, visando melhorar a qualidade de vida dos pacientes terminais e de seus familiares."
    },
    {
      question: "No contexto dos cuidados paliativos, o que significa ortotanásia?",
      options: [
        "Suspensão de todos os tratamentos médicos em pacientes terminais, incluindo hidratação e nutrição, para acelerar o processo natural de morte sem intervenção médica adicional",
        "Morte natural, permitindo que ela ocorra no tempo certo, sem abreviação ou prolongamento artificial, proporcionando condições para uma morte digna",
        "Prolongamento artificial do processo de morte, sem perspectiva de cura ou melhora, utilizando todos os recursos tecnológicos disponíveis independentemente do sofrimento causado",
        "Prática pela qual se abrevia a vida de um enfermo incurável de maneira deliberada, a pedido do paciente ou família, para eliminar o sofrimento prolongado"
      ],
      correctAnswer: 1,
      category: "Cuidados Paliativos Pediátricos",
      explanation: "A ortotanásia refere-se à morte natural, permitindo que ela ocorra no tempo certo, sem abreviação (como na eutanásia) ou prolongamento artificial (como na distanásia). Busca proporcionar ao paciente as condições necessárias para compreender sua mortalidade e prepará-lo para uma morte digna, sem intervenção no processo natural."
    },
    {
      question: "Quais são os tipos mais comuns de câncer em crianças?",
      options: [
        "Carcinoma hepatocelular, câncer gástrico e câncer de pâncreas, principalmente associados a síndromes genéticas específicas e exposição a toxinas ambientais durante o desenvolvimento fetal",
        "Melanoma, carcinoma basocelular e carcinoma espinocelular, frequentemente relacionados à exposição solar excessiva e predisposição genética durante os primeiros anos de vida",
        "Leucemias, tumores do SNC, linfomas, neuroblastomas e tumor de Wilms, afetando principalmente células com alto índice de proliferação durante o desenvolvimento",
        "Câncer de pulmão, mama, próstata e colorretal, com manifestações clínicas atípicas quando comparadas às apresentações em adultos, dificultando o diagnóstico precoce"
      ],
      correctAnswer: 2,
      category: "Cuidados Paliativos Pediátricos",
      explanation: "Os tipos mais comuns de câncer em crianças incluem leucemias (cânceres do sangue), tumores do Sistema Nervoso Central (SNC), linfomas (cânceres do sistema linfático), neuroblastomas (tumor de células nervosas), tumor de Wilms (tumor renal), tumores ósseos, rabdomiossarcoma e retinoblastoma."
    },
    {
      question: "Qual é o principal objetivo da fisioterapia nos cuidados paliativos de crianças com câncer?",
      options: [
        "Substituir o tratamento medicamentoso para controle da dor, utilizando exclusivamente técnicas não-farmacológicas como massoterapia e termoterapia, reduzindo os efeitos colaterais da medicação",
        "Curar a doença de base através de exercícios específicos que estimulam o sistema imunológico a combater as células cancerígenas mais eficientemente durante e após o tratamento",
        "Apenas prevenir úlceras de decúbito em pacientes acamados, sem intervenção adicional que possa causar fadiga ou desconforto na criança já debilitada pelo tratamento oncológico",
        "Aumentar ou manter o conforto e a independência, reduzindo o tempo de hospitalização e proporcionando melhor qualidade de vida no tempo restante"
      ],
      correctAnswer: 3,
      category: "Cuidados Paliativos Pediátricos",
      explanation: "O objetivo da fisioterapia nos cuidados paliativos é aumentar ou manter o conforto e a independência funcional, reduzindo o tempo de hospitalização e aumentando o tempo com familiares e amigos. A fisioterapia também desempenha um papel preventivo, antecipando possíveis complicações e implementando medidas preventivas."
    },
    {
      question: "Quais componentes devem ser incluídos na avaliação fisioterapêutica de uma criança em cuidados paliativos?",
      options: [
        "Exclusivamente avaliação psicológica e nutricional, delegando os aspectos motores e funcionais a outros profissionais para não sobrecarregar a criança com múltiplas avaliações durante o tratamento",
        "Apenas avaliação da amplitude de movimento e força muscular, focando exclusivamente na preservação da mobilidade articular para prevenir contraturas durante o período de internação",
        "Somente avaliação da dor e do sistema respiratório, considerando que estas são as principais queixas que afetam a qualidade de vida de crianças em cuidados paliativos oncológicos",
        "História do paciente/pais, observação clínica, avaliação da amplitude de movimento, força, postura, dor, tônus, estado respiratório e avaliação funcional completa"
      ],
      correctAnswer: 3,
      category: "Cuidados Paliativos Pediátricos",
      explanation: "Uma avaliação fisioterapêutica completa deve incluir: história do paciente/pais, observação clínica, avaliação da amplitude de movimento, força muscular (com cuidado em pacientes plaquetopênicos), avaliação postural, avaliação da dor, tônus muscular, sistemas sensoriais, estado respiratório, resistência cardiovascular e avaliação funcional (transferência, marcha, mobilidade)."
    },
    {
      question: "Quais são as principais condutas fisioterapêuticas para manejo da dor em crianças com câncer em cuidados paliativos?",
      options: [
        "Exclusivamente técnicas de distração psicológica como contação de histórias e jogos cognitivos, evitando completamente qualquer intervenção física que possa agravar o quadro doloroso subjacente",
        "Eletroterapia, terapia manual, cinesioterapia, crioterapia e termoterapia, adaptadas à condição clínica e tolerância da criança para proporcionar alívio sintomático",
        "Apenas medicação analgésica prescrita pela equipe médica, sem intervenção fisioterapêutica direta para evitar interações medicamentosas ou efeitos adversos no controle da dor",
        "Contenção física e sedação durante procedimentos potencialmente dolorosos, com progressiva dessensibilização para reduzir a necessidade de intervenções farmacológicas a longo prazo"
      ],
      correctAnswer: 1,
      category: "Cuidados Paliativos Pediátricos",
      explanation: "O manejo da dor em cuidados paliativos pediátricos deve incluir diversas técnicas fisioterapêuticas como eletroterapia (TENS), terapia manual (massagens, mobilizações), cinesioterapia (exercícios terapêuticos adaptados), crioterapia (aplicação de frio) e termoterapia (aplicação de calor), sempre considerando a condição clínica e tolerância da criança."
    },
    {
      question: "Por que as atividades lúdicas são importantes no tratamento fisioterapêutico de crianças com câncer em cuidados paliativos?",
      options: [
        "Para proporcionar um ambiente menos traumatizante, mais humanizado e aumentar a adesão ao tratamento fisioterapêutico proposto",
        "Exclusivamente para agradar aos pais e cuidadores, demonstrando empatia da equipe sem benefícios terapêuticos diretos para o processo de reabilitação ou manejo de sintomas",
        "Apenas para distrair a criança durante procedimentos dolorosos, sem relação com os objetivos terapêuticos específicos da intervenção fisioterapêutica em oncologia pediátrica",
        "Somente para ocupar o tempo livre da criança no hospital, reduzindo a ansiedade associada à internação prolongada sem finalidade terapêutica específica"
      ],
      correctAnswer: 0,
      category: "Cuidados Paliativos Pediátricos",
      explanation: "As atividades lúdicas são importantes no tratamento de crianças com câncer pois proporcionam um ambiente menos traumatizante e mais humanizado. Recursos lúdicos como brincadeiras, jogos, livros, brinquedos e música podem ser integrados aos exercícios terapêuticos, aumentando a adesão ao tratamento, promovendo conforto e melhorando a qualidade de vida."
    },
    {
      question: "CASO CLÍNICO: Uma criança de 7 anos apresenta dificuldade em arremessar bolas, rebater objetos e chutar com precisão, embora corra e salte adequadamente para sua idade. Qual é a provável área de déficit e a recomendação mais adequada?",
      options: [
        "Déficit em habilidades manipulativas; recomenda-se atividades graduadas para manipulação de objetos com progressão sistemática de complexidade",
        "Déficit em habilidades locomotoras; recomenda-se focar em exercícios de corrida e salto com maior demanda de coordenação e velocidade",
        "Déficit em controle postural; recomenda-se exercícios de equilíbrio estático em superfícies instáveis para melhorar a base para movimentos manipulativos",
        "Déficit cognitivo; recomenda-se avaliação neuropsicológica completa antes de qualquer intervenção motora específica"
      ],
      correctAnswer: 0,
      category: "Desenvolvimento Motor",
      explanation: "A criança apresenta um déficit específico em habilidades manipulativas (arremessar, rebater, chutar) enquanto as habilidades locomotoras (correr, saltar) estão preservadas. A recomendação mais adequada é implementar um programa de atividades graduadas para desenvolvimento de habilidades manipulativas, iniciando com tarefas simples e progredindo para mais complexas, com ênfase na coordenação olho-mão e olho-pé."
    },
    {
      question: "Qual das seguintes habilidades está normalmente mais desenvolvida em meninos de 6-8 anos, conforme estudos sobre diferenças de gênero no desenvolvimento motor?",
      options: [
        "Coordenação motora fina, incluindo precisão em atividades como escrita, desenho e manipulação de objetos pequenos",
        "Flexibilidade corporal global, especialmente em articulações como ombros, quadril e coluna vertebral",
        "Equilíbrio estático em posições desafiadoras, demonstrando melhor controle postural e propriocepção",
        "Habilidades manipulativas como arremessar e chutar, influenciadas principalmente por fatores socioculturais e oportunidades de prática"
      ],
      correctAnswer: 3,
      category: "Desenvolvimento Motor",
      explanation: "Estudos mostram que meninos geralmente apresentam melhor desempenho em habilidades manipulativas como arremessar, chutar e rebater. Estas diferenças são mais influenciadas por fatores socioculturais e oportunidades de prática do que por fatores biológicos. Meninas frequentemente superam meninos em habilidades como equilíbrio, coordenação motora fina e flexibilidade."
    },
    {
      question: "CASO CLÍNICO: Durante a avaliação de um bebê de 9 meses, você nota que ele não consegue sentar-se sem apoio, não transfere objetos entre as mãos e não produz sons como 'mama' ou 'dada'. Qual deve ser sua conduta imediata?",
      options: [
        "Comunicar ao pediatra e sugerir uma triagem de desenvolvimento mais completa, considerando o atraso em múltiplos domínios",
        "Orientar os pais que cada criança tem seu próprio ritmo e reavaliar em 6 meses, pois estas variações individuais são comuns no primeiro ano",
        "Iniciar imediatamente um programa intensivo de estimulação precoce sem avaliação adicional, para recuperar o tempo perdido",
        "Diagnosticar um atraso global do desenvolvimento e fornecer um prognóstico detalhado aos pais sobre limitações futuras"
      ],
      correctAnswer: 0,
      category: "Avaliação Neurológica",
      explanation: "Esta criança apresenta sinais de atraso nos marcos do desenvolvimento esperados para 9 meses (sentar-se sozinho, transferir objetos entre as mãos e produzir sons específicos). A conduta apropriada é comunicar estes achados ao pediatra e sugerir uma triagem de desenvolvimento mais completa, que é recomendada rotineiramente aos 9 meses. Um diagnóstico formal de atraso global exigiria avaliação multidisciplinar."
    },
    {
      question: "Qual abordagem é mais adequada para estimular o desenvolvimento motor de uma criança de 4 meses?",
      options: [
        "Proporcionar tempo supervisionado em decúbito ventral (tummy time) e oportunidades para pegar e explorar objetos seguros e apropriados para a idade",
        "Posicioná-la sentada com apoio para fortalecer a musculatura cervical, mesmo que ainda não tenha adquirido controle cefálico completo",
        "Restringir o tempo em decúbito ventral para evitar estresse e desconforto, priorizando apenas posições supinas durante o período de vigília",
        "Utilizar andadores para estimular a marcha precoce e fortalecer membros inferiores antes do período típico de desenvolvimento desta habilidade"
      ],
      correctAnswer: 0,
      category: "Avaliação Neurológica",
      explanation: "Para um bebê de 4 meses, a abordagem mais adequada inclui proporcionar tempo supervisionado em decúbito ventral para fortalecer os músculos do pescoço e tronco, além de oferecer oportunidades para pegar e explorar objetos seguros, estimulando o desenvolvimento motor fino. O uso de andadores não é recomendado em nenhuma idade por questões de segurança e interferência no desenvolvimento motor normal."
    },
    {
      question: "CASO CLÍNICO: Uma criança de 3 anos não atende quando chamada pelo nome, evita contato visual, não brinca com outras crianças e apresenta comportamentos repetitivos como alinhar brinquedos. Quais aspectos da avaliação neurológica devem ser priorizados?",
      options: [
        "Triagem específica para autismo e avaliação do desenvolvimento social e comunicativo, utilizando instrumentos validados para esta faixa etária",
        "Avaliação da força muscular e reflexos tendinosos profundos, que podem indicar comprometimento da via piramidal associado aos déficits comportamentais",
        "Avaliação da linguagem receptiva e motricidade fina exclusivamente, ignorando outros domínios do desenvolvimento que não apresentam alterações evidentes",
        "Exames de neuroimagem para detectar lesões estruturais, prioritários antes de qualquer avaliação funcional ou comportamental"
      ],
      correctAnswer: 0,
      category: "Avaliação Neurológica",
      explanation: "Os sinais descritos (não responder ao nome, evitar contato visual, não brincar com outras crianças e comportamentos repetitivos) são compatíveis com Transtorno do Espectro Autista (TEA). A avaliação deve priorizar uma triagem específica para autismo (como M-CHAT-R) e avaliação detalhada do desenvolvimento social e comunicativo. A detecção precoce do TEA é fundamental para intervenção precoce e melhores resultados a longo prazo."
    },
    {
      question: "Durante a avaliação dos marcos do desenvolvimento de um bebê de 12 meses, quais sinais são considerados 'bandeiras vermelhas' que indicam necessidade de investigação imediata?",
      options: [
        "Preferência por brincar sozinho em vez de com adultos, comportamento que pode ser apenas reflexo do temperamento individual e não necessariamente patológico",
        "Não engatinhar, mas conseguir deslocar-se sentado (arrastar-se), representando apenas uma variação normal da sequência de aquisição de mobilidade",
        "Não andar sozinho, mas conseguir andar com apoio, dentro da faixa de normalidade para desenvolvimento motor nesta idade específica",
        "Não falar palavras como 'mamã' ou 'papá' e não apontar para objetos, indicando possível atraso significativo no desenvolvimento comunicativo"
      ],
      correctAnswer: 3,
      category: "Avaliação Neurológica",
      explanation: "Aos 12 meses, a ausência de balbucio com intenção comunicativa (como dizer 'mamã' ou 'papá' com significado) e a falta de gestos como apontar são consideradas 'bandeiras vermelhas' que justificam investigação imediata. A ausência destas habilidades comunicativas pode indicar atrasos significativos ou condições como TEA. As variações na mobilidade (ainda não andar sozinho ou preferir arrastar-se) são menos preocupantes nesta idade."
    },
    {
      question: "Como são classificadas as queimaduras de segundo grau profundas?",
      options: [
        "Comprometem a epiderme e toda a derme, podendo afetar estruturas subcutâneas, com aspecto esbranquiçado e pouca dor pela destruição de terminações nervosas",
        "Comprometem apenas a epiderme, causando eritema e dor intensa, sendo totalmente reversíveis sem formação de cicatrizes residuais",
        "Comprometem a epiderme e parte superficial da derme, com formação de bolhas e dor intensa devido à exposição das terminações nervosas",
        "Comprometem todas as camadas da pele inclusive o tecido subcutâneo, com aspecto carbonizado e indolor pela completa destruição de receptores sensitivos"
      ],
      correctAnswer: 0,
      category: "Queimaduras Pediátricas",
      explanation: "Queimaduras de segundo grau profundas comprometem a epiderme e toda a derme, podendo afetar estruturas subcutâneas. Apresentam aspecto esbranquiçado ou vermelho escuro, superfície mais seca, e relativamente pouca dor devido à destruição de terminações nervosas. Sua cicatrização é mais lenta e frequentemente requer abordagem cirúrgica."
    },
    {
      question: "CASO CLÍNICO: Uma criança de 4 anos sofreu queimadura por água fervente que atingiu toda a face anterior do tórax e abdome, e a região proximal do membro superior direito. Utilizando a 'Regra dos Nove', qual a superfície corporal queimada aproximada?",
      options: [
        "Aproximadamente 23%, considerando as proporções corporais específicas da idade pediátrica que diferem do adulto",
        "Aproximadamente 36%, calculado conforme os percentuais padronizados para adultos sem ajustes para idade",
        "Aproximadamente 18%, utilizando apenas a soma matemática das regiões afetadas sem considerar o desenvolvimento corporal",
        "Aproximadamente 9%, contabilizando exclusivamente a área de maior profundidade da lesão térmica"
      ],
      correctAnswer: 0,
      category: "Queimaduras Pediátricas",
      explanation: "Pela Regra dos Nove adaptada para crianças, o tórax anterior representa 9%, o abdome 9% e o braço proximal aproximadamente 4,5% (metade dos 9% de um braço inteiro). A soma resulta em aproximadamente 22,5%, ou seja, cerca de 23% da superfície corporal queimada (SCQ)."
    },
    {
      question: "Qual das seguintes abordagens fisioterapêuticas está CONTRAINDICADA na fase aguda de uma queimadura de segundo grau em uma criança?",
      options: [
        "Aplicação de alongamento passivo intenso, que pode romper o tecido em cicatrização e aumentar o risco de infecção e sangramento",
        "Posicionamento adequado em padrão antideformidade, essencial para prevenir contraturas durante a cicatrização",
        "Mobilização articular suave dentro dos limites da dor, mantendo a amplitude de movimento sem comprometer a integridade tecidual",
        "Orientação respiratória e manobras de higiene brônquica quando necessário, especialmente em queimaduras extensas com risco respiratório"
      ],
      correctAnswer: 0,
      category: "Queimaduras Pediátricas",
      explanation: "Na fase aguda de uma queimadura de segundo grau, o alongamento passivo intenso está contraindicado pois pode causar ruptura do tecido em cicatrização, aumentar o sangramento e a dor, além de potencialmente agravar o processo inflamatório. As outras intervenções mencionadas são apropriadas quando realizadas com cuidado e respeitando a condição da criança."
    },
    {
      question: "CASO CLÍNICO: Uma criança de 8 anos com queimadura de terceiro grau em região cervical anterior e lateral bilateral está em fase de reabilitação (pós-enxerto). Qual das seguintes complicações é mais provável de ocorrer sem intervenção fisioterapêutica adequada?",
      options: [
        "Contratura em flexão cervical com limitação da extensão e rotação, devido à orientação das fibras colágenas durante o processo cicatricial",
        "Paralisia diafragmática permanente por comprometimento do nervo frênico, levando a insuficiência respiratória crônica",
        "Contratura em hiperextensão cervical que compromete a deglutição e respiração, mesmo em queimaduras anteriores",
        "Escoliose estrutural progressiva como consequência direta da limitação cervical, mesmo sem comprometimento do tronco"
      ],
      correctAnswer: 0,
      category: "Queimaduras Pediátricas",
      explanation: "Em queimaduras cervicais anteriores e laterais, a complicação mais comum é a contratura em flexão cervical com limitação da extensão e rotação. Isso ocorre devido à orientação das fibras colágenas durante a cicatrização, que tendem a encurtar o tecido na direção da lesão. O tratamento precoce deve incluir posicionamento adequado, órteses, mobilização, alongamento e controle cicatricial para prevenir esta complicação."
    },
    {
      question: "Na reabilitação de uma criança com queimaduras graves, quais são os principais objetivos do uso de órteses?",
      options: [
        "Prevenir ou corrigir contraturas posicionando as articulações em posição funcional e aplicando pressão sobre as cicatrizes para controle da hipertrofia",
        "Apenas promover a cosmética da área queimada, reduzindo a aparência da cicatriz sem benefícios funcionais significativos no processo de reabilitação",
        "Substituir a mobilização articular por completo, eliminando a necessidade de exercícios terapêuticos durante o processo de reabilitação",
        "Apenas limitar o movimento durante o sono para evitar posições viciosas, sem necessidade de uso durante atividades diurnas"
      ],
      correctAnswer: 0,
      category: "Queimaduras Pediátricas",
      explanation: "As órteses na reabilitação de queimados têm dois objetivos principais: prevenir ou corrigir contraturas posicionando as articulações em posição funcional e aplicar pressão sobre as cicatrizes para controlar a hipertrofia. Devem ser usadas em conjunto com mobilização e outras técnicas, não como substituto. O tempo de uso pode variar de acordo com a fase (aguda, subaguda ou crônica) e deve ser monitorado para evitar complicações."
    },
    {
      question: "CASO CLÍNICO: Um menino de 7 anos com diagnóstico de Distrofia Muscular de Duchenne apresenta sinal de Gowers positivo, dificuldade para subir escadas e correr. A força muscular está preservada em MMSS e diminuída em MMII (grau 4- proximal e 4+ distal). Qual plano terapêutico é mais adequado nesta fase da doença?",
      options: [
        "Prescrição imediata de cadeira de rodas para conservação de energia, mesmo que ainda apresente capacidade de deambulação funcional e independente na maioria dos ambientes",
        "Exercícios resistidos intensos para retardar a progressão da fraqueza muscular, com foco em fortalecimento excêntrico máximo dos grandes grupos musculares",
        "Programa combinando exercícios aeróbicos submáximos, alongamentos, treino de equilíbrio e funcional, com orientação aos pais sobre adaptações ambientais",
        "Imobilização noturna dos membros inferiores e repouso para evitar a fadiga muscular, preservando as fibras musculares remanescentes do desgaste excessivo"
      ],
      correctAnswer: 2,
      category: "Casos Clínicos",
      explanation: "Nesta fase ambulatória da DMD, o plano terapêutico deve visar a manutenção da função, prevenção de contraturas e prolongamento da marcha independente. A abordagem mais adequada é um programa combinando exercícios aeróbicos submáximos (que não aceleram a degeneração), alongamentos para prevenção de contraturas, treino de equilíbrio e funcional para otimizar a mecânica corporal, e orientações aos pais sobre adaptações e manejo. A prescrição de cadeira de rodas seria prematura, exercícios resistidos intensos podem acelerar a degeneração, e a imobilização prolongada promove atrofia."
    },
    {
      question: "CASO CLÍNICO: Uma criança de 3 anos com queimadura de segundo grau profunda em face, pescoço e tórax anterior (20% SCQ) está internada há 5 dias. Apresenta dor, medo de movimentação e início de contraturas no pescoço. Qual abordagem fisioterapêutica inicial é mais apropriada?",
      options: [
        "Abordagem lúdica com técnicas de distração, posicionamento correto, massagem perilesional e mobilização suave respeitando a dor",
        "Mobilização passiva forçada do pescoço para evitar contraturas fixas, mesmo que cause desconforto inicial, priorizando a prevenção de sequelas",
        "Esperar a completa cicatrização (aproximadamente 21 dias) antes de iniciar qualquer intervenção fisioterapêutica para não prejudicar o processo de epitelização",
        "Confecção imediata de órtese rígida para pescoço em hiperextensão máxima, garantindo a manutenção do comprimento muscular durante o sono"
      ],
      correctAnswer: 0,
      category: "Casos Clínicos",
      explanation: "Para uma criança de 3 anos com queimadura recente, a abordagem inicial deve ser gentil e considerar o componente psicológico. Uma abordagem lúdica com técnicas de distração para manejo da dor e do medo, combinada com posicionamento correto, massagem perilesional para dessensibilização e mobilização suave respeitando os limites de dor é mais apropriada. A mobilização forçada aumentaria o trauma e o medo, esperar a cicatrização completa permitiria o estabelecimento de contraturas mais difíceis de tratar, e a órtese em hiperextensão máxima seria desconfortável e potencialmente prejudicial nesta fase."
    },
    {
      question: "CASO CLÍNICO: Uma menina de 5 anos com câncer em estágio terminal está sob cuidados paliativos domiciliares. Apresenta dor generalizada (EVA 8/10), fadiga intensa, edema em membros inferiores, dispneia aos mínimos esforços e tristeza. Os pais relatam dificuldade em administrar os cuidados. Qual deve ser a prioridade da intervenção fisioterapêutica neste momento?",
      options: [
        "Manejo da dor e desconforto respiratório, com orientação aos pais sobre posicionamento, transferências seguras e técnicas de conservação de energia",
        "Implementar um programa de condicionamento cardiorrespiratório leve para reverter a fadiga e melhorar a capacidade funcional global através de múltiplas sessões diárias",
        "Estimulação cognitiva e treino de AVDs para manter sua independência funcional, focando no fortalecimento muscular para as atividades cotidianas",
        "Prescrição de órteses para os membros inferiores para controle do edema, com aplicação de compressão graduada para drenagem linfática passiva"
      ],
      correctAnswer: 0,
      category: "Casos Clínicos",
      explanation: "No contexto de cuidados paliativos em estágio terminal, a prioridade é o manejo dos sintomas e o conforto da criança. A intervenção deve focar no controle da dor (usando técnicas como TENS, massagem, termoterapia), abordagem do desconforto respiratório (posicionamento, técnicas de relaxamento respiratório), e orientação aos pais sobre como realizar movimentações e transferências seguras, além de técnicas para conservação de energia. Programas de condicionamento ou reabilitação funcional intensiva não são apropriados nesta fase, e as intervenções devem ser guiadas pelas necessidades imediatas da criança e família."
    },
    {
      question: "CASO CLÍNICO: Um bebê de 9 meses foi encaminhado para avaliação do desenvolvimento após sua mãe relatar que ele não consegue sentar-se sem apoio. Na avaliação, você observa hipotonia generalizada, reflexos primitivos persistentes (RTCA, Galant), ausência de reações de proteção e paracedismo, e atraso nos marcos motores (não rola, não senta sem apoio, não engatinha). Qual hipótese diagnóstica é mais provável e qual conduta imediata?",
      options: [
        "Atraso do desenvolvimento psicomotor; iniciar estimulação precoce e investigar causas subjacentes através de encaminhamento multidisciplinar",
        "Desenvolvimento motor típico com variação individual; orientações para estimulação em casa com reavaliação após dois meses de intervenção",
        "Transtorno do espectro autista; encaminhar para avaliação multidisciplinar com neuropediatra e terapeuta ocupacional especializado",
        "Atraso motor transitório; reavaliar em 3 meses após orientações básicas de estimulação para os pais aplicarem no ambiente domiciliar"
      ],
      correctAnswer: 0,
      category: "Casos Clínicos",
      explanation: "O quadro descrito sugere fortemente um atraso do desenvolvimento psicomotor: hipotonia generalizada, persistência de reflexos primitivos que deveriam estar integrados aos 9 meses, ausência de reações de proteção esperadas para a idade e atraso em múltiplos marcos motores. A conduta adequada é iniciar imediatamente um programa de estimulação precoce enquanto se investiga as possíveis causas subjacentes (genéticas, neurológicas, metabólicas) através de encaminhamento para avaliação médica e outros profissionais. Este não é um caso de variação individual do desenvolvimento típico nem de atraso transitório."
    },
    {
      question: "CASO CLÍNICO: Um adolescente de 14 anos com Distrofia Muscular de Duchenne em estágio avançado usa cadeira de rodas há 3 anos. Apresenta escoliose progressiva, contraturas em membros e capacidade vital forçada de 35% do previsto. Recentemente, começou a apresentar fadiga ao falar e desconforto respiratório noturno. Qual conduta fisioterapêutica é prioritária neste momento?",
      options: [
        "Avaliação e manejo da função respiratória, incluindo técnicas de tosse assistida, recrutamento de volume pulmonar e posicionamento adequado",
        "Fortalecer intensamente a musculatura paravertebral para corrigir a escoliose progressiva e melhorar a mecânica respiratória comprometida",
        "Encorajar atividades físicas vigorosas para melhorar a capacidade respiratória através de treinamento muscular respiratório de alta intensidade",
        "Imobilização completa para prevenir progressão da escoliose, com restrição total de mobilidade do tronco durante o dia e a noite"
      ],
      correctAnswer: 0,
      category: "Casos Clínicos",
      explanation: "Em pacientes com DMD em estágio avançado, o comprometimento respiratório é uma das principais causas de morbimortalidade. Os sintomas descritos (fadiga ao falar, desconforto respiratório noturno) associados à CVF reduzida indicam insuficiência respiratória iminente. A prioridade é a avaliação completa da função respiratória e implementação de técnicas como tosse assistida (manual ou mecânica), exercícios de recrutamento de volume (empilhamento de ar, respiração glossofaríngea), e posicionamento adequado. O fortalecimento intenso é contraindicado neste estágio, atividades vigorosas poderiam agravar a condição, e a imobilização completa causaria mais complicações respiratórias."
    },
    {
      question: "CASO CLÍNICO: Uma criança de 7 anos apresenta habilidades locomotoras adequadas para a idade, mas dificuldade significativa em habilidades manipulativas (arremessar, rebater). Seus pais relatam que, além disso, ela tem dificuldade em amarrar cadarços, abotoar roupas e escrever. Com base na Teoria dos Sistemas Dinâmicos, qual seria a abordagem terapêutica mais adequada?",
      options: [
        "Exercícios intensivos focados especificamente em amarrar cadarços, abotoar e escrever para aprendizado direto destas tarefas",
        "Abordagem multissistêmica considerando fatores biomecânicos, perceptuais e ambientais, com tarefas variadas de coordenação olho-mão em diferentes contextos",
        "Fortalecimento dos músculos das mãos e braços apenas, já que o problema é puramente muscular",
        "Apenas orientações aos pais para prática em casa, pois são variações normais do desenvolvimento"
      ],
      correctAnswer: 1,
      category: "Desenvolvimento Motor",
      explanation: "Seguindo a Teoria dos Sistemas Dinâmicos, o desenvolvimento motor resulta da interação de múltiplos subsistemas (motor, perceptual, cognitivo, etc.) sob influência de restrições do indivíduo, ambiente e tarefa. A criança apresenta dificuldades tanto em habilidades motoras grossas manipulativas quanto em motricidade fina, sugerindo um padrão de dificuldade na coordenação olho-mão. A abordagem mais adequada é multissistêmica, considerando fatores biomecânicos (força e coordenação), perceptuais (processamento visual, propriocepção), e ambientais (modificações das tarefas), através de experiências variadas em diferentes contextos, não apenas repetição das tarefas específicas problemáticas."
    },
    {
      question: "Considerando a Teoria dos Estágios de Habilidades Motoras Fundamentais, analise o caso: Uma professora de educação física relata que uma criança de 8 anos executa o arremesso por cima do ombro sem rotação do tronco, mantendo os pés paralelos e sem transferência de peso. Este padrão é indicativo de qual estágio?",
      options: [
        "Estágio maduro, pois aos 8 anos já deveria ter desenvolvido completamente esta habilidade",
        "Estágio elementar, com alguns componentes ainda não integrados no movimento",
        "Estágio inicial, com características de tentativas rudimentares da habilidade",
        "Não se aplica a classificação em estágios, pois trata-se de uma variação normal de execução"
      ],
      correctAnswer: 1,
      category: "Desenvolvimento Motor",
      explanation: "O padrão descrito (arremesso sem rotação do tronco, pés paralelos, sem transferência de peso) é característico do estágio elementar das habilidades motoras fundamentais. Neste estágio, há maior controle e coordenação rítmica dos movimentos em comparação ao estágio inicial, mas os movimentos ainda são restritos ou exagerados, faltando a integração completa dos componentes. No estágio maduro, esperado para a idade de 8 anos, o arremesso incluiria rotação do tronco, transferência de peso e posicionamento contralateral dos pés, indicando que esta criança não atingiu o nível esperado para sua idade."
    },
    {
      question: "CASO CLÍNICO: Durante uma avaliação, você observa que uma criança de 18 meses não consegue empilhar blocos, não faz rabiscos, não caminha sozinha e não diz palavras com significado. A mãe relata que a gravidez foi sem intercorrências, mas o parto foi prematuro (32 semanas) com baixo peso ao nascer (1850g). Qual interpretação e conduta são mais adequadas?",
      options: [
        "Considerar a idade corrigida e usar instrumentos de avaliação normatizados para prematuros, sendo necessária intervenção precoce e acompanhamento multidisciplinar",
        "Interpretar como atraso do desenvolvimento significativo e encaminhar para neurologista pediátrico urgentemente",
        "Considerar normal pela prematuridade e reavaliar aos 2 anos de idade",
        "Diagnosticar como Transtorno do Espectro Autista e iniciar terapia comportamental"
      ],
      correctAnswer: 0,
      category: "Avaliação Neurológica",
      explanation: "Para bebês prematuros, é fundamental considerar a idade corrigida até os 2-3 anos de idade ao avaliar o desenvolvimento. Neste caso, a idade corrigida seria aproximadamente 15-16 meses. Mesmo assim, as habilidades descritas estão abaixo do esperado, mas a interpretação deve ser baseada em instrumentos de avaliação normatizados para prematuros. A conduta mais adequada inclui intervenção precoce e acompanhamento multidisciplinar (fisioterapia, terapia ocupacional, fonoaudiologia), considerando os fatores de risco (prematuridade e baixo peso). Não há informações suficientes para diagnósticos específicos como TEA, e esperar até os 2 anos seria inapropriado diante dos atrasos observados."
    },
    {
      question: "Considere um estudo científico que comparou o desenvolvimento motor de crianças de 6-8 anos em escolas públicas e particulares, identificando diferenças significativas em habilidades como equilíbrio, força e habilidades manipulativas. Qual das seguintes interpretações está mais alinhada com a Teoria Ecológica do desenvolvimento motor?",
      options: [
        "As diferenças são principalmente genéticas, refletindo características inatas das populações estudadas",
        "As diferenças representam variações na maturação neurológica causadas por fatores nutricionais",
        "As diferenças refletem as affordances (oportunidades de ação) presentes nos diferentes ambientes, incluindo espaços físicos, equipamentos e práticas culturais",
        "As diferenças são temporárias e se equalizarão naturalmente com o avanço da idade"
      ],
      correctAnswer: 2,
      category: "Desenvolvimento Motor",
      explanation: "A Teoria Ecológica enfatiza a relação entre o indivíduo e o ambiente, considerando que o desenvolvimento motor é fortemente influenciado pelas affordances (oportunidades de ação) presentes no contexto. Diferenças entre escolas públicas e particulares podem refletir variações em fatores ambientais como qualidade e quantidade de espaços para atividade física, disponibilidade de equipamentos esportivos, presença de professores especializados em educação física, valorização cultural de determinadas práticas motoras, e oportunidades estruturadas para desenvolvimento de habilidades específicas. Esta teoria não nega a influência de fatores biológicos, mas destaca como o ambiente molda o desenvolvimento através das oportunidades que oferece ou restringe."
    },
    {
      question: "CASO CLÍNICO COMPLEXO: Um fisioterapeuta está avaliando uma criança de 5 anos com histórico de leucemia linfoblástica aguda, tratada com quimioterapia sistêmica (incluindo vincristina) e radioterapia craniana. A criança apresenta fraqueza muscular generalizada, fadiga crônica, déficit de coordenação, dificuldades de equilíbrio e baixo desempenho em tarefas motoras que antes realizava adequadamente. Que mecanismos fisiopatológicos provavelmente estão contribuindo para este quadro de desenvolvimento motor atípico?",
      options: [
        "Apenas efeitos diretos da quimioterapia na mielinização nervosa periférica",
        "Combinação de neuropatia periférica induzida pela vincristina, miopatia relacionada à inatividade física durante o tratamento, e possíveis efeitos neurocognitivos da radioterapia craniana",
        "Somente efeitos psicológicos secundários ao estigma da doença",
        "Exclusivamente encefalopatia metabólica causada pela leucemia"
      ],
      correctAnswer: 1,
      category: "Desenvolvimento Motor",
      explanation: "O caso apresenta complexidade devido aos múltiplos mecanismos que podem afetar o desenvolvimento motor da criança com histórico oncológico. A vincristina é um quimioterápico neurotóxico que frequentemente causa neuropatia periférica, afetando a condução nervosa e resultando em fraqueza distal, alterações sensoriais e déficits de coordenação. Além disso, o período prolongado de tratamento geralmente leva à inatividade física e subsequente descondicionamento e miopatia. A radioterapia craniana pode causar efeitos neurocognitivos que impactam funções executivas, atenção e processamento visuoespacial, importantes para o desempenho motor. Este caso ilustra como fatores patológicos, medicamentosos e ambientais interagem afetando o desenvolvimento motor, exigindo uma abordagem multidimensional na reabilitação."
    },
    {
      question: "Quais das seguintes técnicas fisioterapêuticas são recomendadas para o alívio do estresse em crianças com câncer em cuidados paliativos?",
      options: [
        "Apenas técnicas respiratórias isoladas, sem integração com outras abordagens terapêuticas, focando exclusivamente no controle do padrão ventilatório para redução da ansiedade",
        "Somente alongamentos passivos realizados de forma sistemática, com enfoque na musculatura cervical e escapular, principais áreas de tensão associadas ao estresse emocional",
        "Terapia manual, hidroterapia (Watsu), consciência corporal e técnicas de relaxamento, combinadas de acordo com a preferência e condição da criança",
        "Exclusivamente estimulação elétrica de alta frequência em pontos-gatilho miofasciais, associada a biofeedback para ensinar autocontrole da tensão muscular"
      ],
      correctAnswer: 2,
      category: "Cuidados Paliativos Pediátricos",
      explanation: "Para o alívio do estresse em crianças com câncer em cuidados paliativos, recomenda-se uma combinação de técnicas que incluem terapia manual (massagem terapêutica), hidroterapia (especialmente a técnica Watsu), técnicas de consciência corporal e métodos de relaxamento, que podem ser adaptados à idade e condição da criança."
    },
    {
      question: "Como a fisioterapia pode auxiliar no manejo da fadiga em pacientes oncológicos terminais?",
      options: [
        "Conservação de energia, atividades graduadas e adaptação do ambiente, buscando equilíbrio entre atividade e repouso conforme tolerância individual",
        "Recomendando repouso absoluto para todas as atividades, incluindo alimentação e higiene pessoal, visando preservar ao máximo a energia remanescente do paciente",
        "Através de exercícios intensos para aumentar a resistência cardiorrespiratória, fortalecendo o sistema cardiovascular contra os efeitos da fadiga crônica",
        "Apenas com uso de técnicas de respiração profunda, sem qualquer intervenção física que possa exacerbar o quadro de cansaço presente na condição terminal"
      ],
      correctAnswer: 0,
      category: "Cuidados Paliativos Pediátricos",
      explanation: "A fisioterapia pode auxiliar no manejo da fadiga através de estratégias de conservação de energia, atividades físicas cuidadosamente graduadas conforme a tolerância do paciente, e adaptação do ambiente para minimizar o gasto energético. O objetivo é manter a capacidade funcional e minimizar as perdas, equilibrando atividade e repouso."
    },
    {
      question: "No contexto dos cuidados paliativos pediátricos, quais são os cinco estágios do processo de morrer descritos na literatura?",
      options: [
        "Choque, negação, raiva, tristeza e resignação, sequência vivenciada principalmente por crianças mais velhas com compreensão cognitiva da finitude",
        "Medo, negação, isolamento, depressão e paz, manifestados de forma não-verbal em lactentes e crianças pequenas através de comportamentos específicos",
        "Esperança, aceitação, barganha, depressão e raiva, ocorrendo em ordem variável dependendo da idade, cultura e suporte familiar disponível",
        "Negação, raiva, barganha, depressão e aceitação, com particularidades na expressão de cada fase conforme desenvolvimento cognitivo e emocional"
      ],
      correctAnswer: 3,
      category: "Cuidados Paliativos Pediátricos",
      explanation: "Os cinco estágios do processo de morrer são: negação ('isso não está acontecendo comigo'), raiva ('por que está acontecendo comigo?'), barganha (tentativas de adiar o inevitável), depressão (tristeza preparatória) e aceitação (paz e entendimento da situação). Compreender esses estágios é crucial para ajudar os pacientes a aceitarem sua condição com menos sofrimento."
    },
    {
      question: "Em crianças de 6 a 8 anos, qual teoria do desenvolvimento motor considera que o desenvolvimento resulta da interação entre múltiplos subsistemas e é influenciado por fatores ambientais?",
      options: [
        "Teoria dos Sistemas Dinâmicos, que enfatiza a auto-organização emergente e a não-linearidade do desenvolvimento motor humano",
        "Teoria Maturacional, que atribui o desenvolvimento exclusivamente a processos neurológicos inatos e predeterminados geneticamente",
        "Teoria Reflexa, que propõe que todo comportamento motor complexo deriva da integração progressiva de reflexos primitivos durante o neurodesenvolvimento",
        "Teoria da Integração Sensorial, que prioriza o processamento sensorial como único determinante do desenvolvimento motor na infância"
      ],
      correctAnswer: 0,
      category: "Desenvolvimento Motor",
      explanation: "A Teoria dos Sistemas Dinâmicos considera que o desenvolvimento motor resulta da interação entre múltiplos subsistemas (neuromuscular, sensorial, biomecânico) e é influenciado por fatores ambientais e pela tarefa a ser realizada. Esta teoria enfatiza a auto-organização e a não-linearidade do desenvolvimento."
    },
    {
      question: "Aos 6-8 anos, qual das seguintes características NÃO é esperada no desenvolvimento motor típico?",
      options: [
        "Arremesso por cima do ombro com rotação do tronco e transferência de peso, demonstrando integração de movimentos contralaterais coordenados",
        "Padrão maduro de corrida com coordenação de braços e pernas, com fase de voo bem definida e uso eficiente da mecânica corporal",
        "Capacidade de manter o equilíbrio unipodal por 8-10 segundos, refletindo adequado controle postural e propriocepção",
        "Dificuldade em receber uma bola sem usar o corpo como apoio, mostrando imaturidade na coordenação olho-mão e no timing motor"
      ],
      correctAnswer: 3,
      category: "Desenvolvimento Motor",
      explanation: "Aos 6-8 anos, espera-se que a criança já consiga receber uma bola com as mãos sem necessidade de usar o corpo. A opção incorreta é 'Dificuldade em receber uma bola sem usar o corpo', pois essa é uma característica de crianças mais jovens. As outras opções representam habilidades esperadas nessa faixa etária."
    },
    {
      question: "Na fase de movimentos fundamentais, o que caracteriza o estágio maduro das habilidades motoras?",
      options: [
        "Desenvolvimento inicial das habilidades especializadas esportivas, com adaptação progressiva para contextos competitivos estruturados",
        "Movimentos descontrolados com sequência temporal e espacial inadequada, evidenciando as primeiras tentativas de desempenhar a habilidade básica",
        "Maior controle, mas com movimentos ainda restritos ou exagerados, demonstrando progresso parcial na aquisição da habilidade motora fundamental",
        "Integração de todos os componentes do movimento em uma ação coordenada e eficiente, com mecânica corporal otimizada e consistente"
      ],
      correctAnswer: 3,
      category: "Desenvolvimento Motor",
      explanation: "O estágio maduro da fase de movimentos fundamentais caracteriza-se pela integração de todos os componentes do movimento em uma ação coordenada e eficiente. Os movimentos são mecanicamente eficientes, coordenados e controlados, representando o nível mais avançado das habilidades fundamentais antes da transição para a fase de movimentos especializados."
    },
    {
      question: "CASO CLÍNICO: Uma criança de 7 anos apresenta dificuldade em arremessar bolas, rebater objetos e chutar com precisão, embora corra e salte adequadamente para sua idade. Qual é a provável área de déficit e a recomendação mais adequada?",
      options: [
        "Déficit em habilidades manipulativas; recomenda-se atividades graduadas para manipulação de objetos com progressão sistemática de complexidade",
        "Déficit em habilidades locomotoras; recomenda-se focar em exercícios de corrida e salto com maior demanda de coordenação e velocidade",
        "Déficit em controle postural; recomenda-se exercícios de equilíbrio estático em superfícies instáveis para melhorar a base para movimentos manipulativos",
        "Déficit cognitivo; recomenda-se avaliação neuropsicológica completa antes de qualquer intervenção motora específica"
      ],
      correctAnswer: 0,
      category: "Desenvolvimento Motor",
      explanation: "A criança apresenta um déficit específico em habilidades manipulativas (arremessar, rebater, chutar) enquanto as habilidades locomotoras (correr, saltar) estão preservadas. A recomendação mais adequada é implementar um programa de atividades graduadas para desenvolvimento de habilidades manipulativas, iniciando com tarefas simples e progredindo para mais complexas, com ênfase na coordenação olho-mão e olho-pé."
    },
    {
      question: "Qual das seguintes habilidades está normalmente mais desenvolvida em meninos de 6-8 anos, conforme estudos sobre diferenças de gênero no desenvolvimento motor?",
      options: [
        "Coordenação motora fina, incluindo precisão em atividades como escrita, desenho e manipulação de objetos pequenos",
        "Flexibilidade corporal global, especialmente em articulações como ombros, quadril e coluna vertebral",
        "Equilíbrio estático em posições desafiadoras, demonstrando melhor controle postural e propriocepção",
        "Habilidades manipulativas como arremessar e chutar, influenciadas principalmente por fatores socioculturais e oportunidades de prática"
      ],
      correctAnswer: 3,
      category: "Desenvolvimento Motor",
      explanation: "Estudos mostram que meninos geralmente apresentam melhor desempenho em habilidades manipulativas como arremessar, chutar e rebater. Estas diferenças são mais influenciadas por fatores socioculturais e oportunidades de prática do que por fatores biológicos. Meninas frequentemente superam meninos em habilidades como equilíbrio, coordenação motora fina e flexibilidade."
    },
    {
      question: "CASO CLÍNICO: Durante a avaliação de um bebê de 9 meses, você nota que ele não consegue sentar-se sem apoio, não transfere objetos entre as mãos e não produz sons como 'mama' ou 'dada'. Qual deve ser sua conduta imediata?",
      options: [
        "Comunicar ao pediatra e sugerir uma triagem de desenvolvimento mais completa, considerando o atraso em múltiplos domínios",
        "Orientar os pais que cada criança tem seu próprio ritmo e reavaliar em 6 meses, pois estas variações individuais são comuns no primeiro ano",
        "Iniciar imediatamente um programa intensivo de estimulação precoce sem avaliação adicional, para recuperar o tempo perdido",
        "Diagnosticar um atraso global do desenvolvimento e fornecer um prognóstico detalhado aos pais sobre limitações futuras"
      ],
      correctAnswer: 0,
      category: "Avaliação Neurológica",
      explanation: "Esta criança apresenta sinais de atraso nos marcos do desenvolvimento esperados para 9 meses (sentar-se sozinho, transferir objetos entre as mãos e produzir sons específicos). A conduta apropriada é comunicar estes achados ao pediatra e sugerir uma triagem de desenvolvimento mais completa, que é recomendada rotineiramente aos 9 meses. Um diagnóstico formal de atraso global exigiria avaliação multidisciplinar."
    },
    {
      question: "Qual abordagem é mais adequada para estimular o desenvolvimento motor de uma criança de 4 meses?",
      options: [
        "Proporcionar tempo supervisionado em decúbito ventral (tummy time) e oportunidades para pegar e explorar objetos seguros e apropriados para a idade",
        "Posicioná-la sentada com apoio para fortalecer a musculatura cervical, mesmo que ainda não tenha adquirido controle cefálico completo",
        "Restringir o tempo em decúbito ventral para evitar estresse e desconforto, priorizando apenas posições supinas durante o período de vigília",
        "Utilizar andadores para estimular a marcha precoce e fortalecer membros inferiores antes do período típico de desenvolvimento desta habilidade"
      ],
      correctAnswer: 0,
      category: "Avaliação Neurológica",
      explanation: "Para um bebê de 4 meses, a abordagem mais adequada inclui proporcionar tempo supervisionado em decúbito ventral para fortalecer os músculos do pescoço e tronco, além de oferecer oportunidades para pegar e explorar objetos seguros, estimulando o desenvolvimento motor fino. O uso de andadores não é recomendado em nenhuma idade por questões de segurança e interferência no desenvolvimento motor normal."
    },
    {
      question: "CASO CLÍNICO: Uma criança de 3 anos não atende quando chamada pelo nome, evita contato visual, não brinca com outras crianças e apresenta comportamentos repetitivos como alinhar brinquedos. Quais aspectos da avaliação neurológica devem ser priorizados?",
      options: [
        "Triagem específica para autismo e avaliação do desenvolvimento social e comunicativo, utilizando instrumentos validados para esta faixa etária",
        "Avaliação da força muscular e reflexos tendinosos profundos, que podem indicar comprometimento da via piramidal associado aos déficits comportamentais",
        "Avaliação da linguagem receptiva e motricidade fina exclusivamente, ignorando outros domínios do desenvolvimento que não apresentam alterações evidentes",
        "Exames de neuroimagem para detectar lesões estruturais, prioritários antes de qualquer avaliação funcional ou comportamental"
      ],
      correctAnswer: 0,
      category: "Avaliação Neurológica",
      explanation: "Os sinais descritos (não responder ao nome, evitar contato visual, não brincar com outras crianças e comportamentos repetitivos) são compatíveis com Transtorno do Espectro Autista (TEA). A avaliação deve priorizar uma triagem específica para autismo (como M-CHAT-R) e avaliação detalhada do desenvolvimento social e comunicativo. A detecção precoce do TEA é fundamental para intervenção precoce e melhores resultados a longo prazo."
    },
    {
      question: "Durante a avaliação dos marcos do desenvolvimento de um bebê de 12 meses, quais sinais são considerados 'bandeiras vermelhas' que indicam necessidade de investigação imediata?",
      options: [
        "Preferência por brincar sozinho em vez de com adultos, comportamento que pode ser apenas reflexo do temperamento individual e não necessariamente patológico",
        "Não engatinhar, mas conseguir deslocar-se sentado (arrastar-se), representando apenas uma variação normal da sequência de aquisição de mobilidade",
        "Não andar sozinho, mas conseguir andar com apoio, dentro da faixa de normalidade para desenvolvimento motor nesta idade específica",
        "Não falar palavras como 'mamã' ou 'papá' e não apontar para objetos, indicando possível atraso significativo no desenvolvimento comunicativo"
      ],
      correctAnswer: 3,
      category: "Avaliação Neurológica",
      explanation: "Aos 12 meses, a ausência de balbucio com intenção comunicativa (como dizer 'mamã' ou 'papá' com significado) e a falta de gestos como apontar são consideradas 'bandeiras vermelhas' que justificam investigação imediata. A ausência destas habilidades comunicativas pode indicar atrasos significativos ou condições como TEA. As variações na mobilidade (ainda não andar sozinho ou preferir arrastar-se) são menos preocupantes nesta idade."
    },
    {
      question: "Como são classificadas as queimaduras de segundo grau profundas?",
      options: [
        "Comprometem a epiderme e toda a derme, podendo afetar estruturas subcutâneas, com aspecto esbranquiçado e pouca dor pela destruição de terminações nervosas",
        "Comprometem apenas a epiderme, causando eritema e dor intensa, sendo totalmente reversíveis sem formação de cicatrizes residuais",
        "Comprometem a epiderme e parte superficial da derme, com formação de bolhas e dor intensa devido à exposição das terminações nervosas",
        "Comprometem todas as camadas da pele inclusive o tecido subcutâneo, com aspecto carbonizado e indolor pela completa destruição de receptores sensitivos"
      ],
      correctAnswer: 0,
      category: "Queimaduras Pediátricas",
      explanation: "Queimaduras de segundo grau profundas comprometem a epiderme e toda a derme, podendo afetar estruturas subcutâneas. Apresentam aspecto esbranquiçado ou vermelho escuro, superfície mais seca, e relativamente pouca dor devido à destruição de terminações nervosas. Sua cicatrização é mais lenta e frequentemente requer abordagem cirúrgica."
    },
    {
      question: "CASO CLÍNICO: Uma criança de 4 anos sofreu queimadura por água fervente que atingiu toda a face anterior do tórax e abdome, e a região proximal do membro superior direito. Utilizando a 'Regra dos Nove', qual a superfície corporal queimada aproximada?",
      options: [
        "Aproximadamente 23%, considerando as proporções corporais específicas da idade pediátrica que diferem do adulto",
        "Aproximadamente 36%, calculado conforme os percentuais padronizados para adultos sem ajustes para idade",
        "Aproximadamente 18%, utilizando apenas a soma matemática das regiões afetadas sem considerar o desenvolvimento corporal",
        "Aproximadamente 9%, contabilizando exclusivamente a área de maior profundidade da lesão térmica"
      ],
      correctAnswer: 0,
      category: "Queimaduras Pediátricas",
      explanation: "Pela Regra dos Nove adaptada para crianças, o tórax anterior representa 9%, o abdome 9% e o braço proximal aproximadamente 4,5% (metade dos 9% de um braço inteiro). A soma resulta em aproximadamente 22,5%, ou seja, cerca de 23% da superfície corporal queimada (SCQ)."
    },
    {
      question: "Qual das seguintes abordagens fisioterapêuticas está CONTRAINDICADA na fase aguda de uma queimadura de segundo grau em uma criança?",
      options: [
        "Aplicação de alongamento passivo intenso, que pode romper o tecido em cicatrização e aumentar o risco de infecção e sangramento",
        "Posicionamento adequado em padrão antideformidade, essencial para prevenir contraturas durante a cicatrização",
        "Mobilização articular suave dentro dos limites da dor, mantendo a amplitude de movimento sem comprometer a integridade tecidual",
        "Orientação respiratória e manobras de higiene brônquica quando necessário, especialmente em queimaduras extensas com risco respiratório"
      ],
      correctAnswer: 0,
      category: "Queimaduras Pediátricas",
      explanation: "Na fase aguda de uma queimadura de segundo grau, o alongamento passivo intenso está contraindicado pois pode causar ruptura do tecido em cicatrização, aumentar o sangramento e a dor, além de potencialmente agravar o processo inflamatório. As outras intervenções mencionadas são apropriadas quando realizadas com cuidado e respeitando a condição da criança."
    },
    {
      question: "CASO CLÍNICO: Uma criança de 8 anos com queimadura de terceiro grau em região cervical anterior e lateral bilateral está em fase de reabilitação (pós-enxerto). Qual das seguintes complicações é mais provável de ocorrer sem intervenção fisioterapêutica adequada?",
      options: [
        "Contratura em flexão cervical com limitação da extensão e rotação, devido à orientação das fibras colágenas durante o processo cicatricial",
        "Paralisia diafragmática permanente por comprometimento do nervo frênico, levando a insuficiência respiratória crônica",
        "Contratura em hiperextensão cervical que compromete a deglutição e respiração, mesmo em queimaduras anteriores",
        "Escoliose estrutural progressiva como consequência direta da limitação cervical, mesmo sem comprometimento do tronco"
      ],
      correctAnswer: 0,
      category: "Queimaduras Pediátricas",
      explanation: "Em queimaduras cervicais anteriores e laterais, a complicação mais comum é a contratura em flexão cervical com limitação da extensão e rotação. Isso ocorre devido à orientação das fibras colágenas durante a cicatrização, que tendem a encurtar o tecido na direção da lesão. O tratamento precoce deve incluir posicionamento adequado, órteses, mobilização, alongamento e controle cicatricial para prevenir esta complicação."
    },
    {
      question: "Na reabilitação de uma criança com queimaduras graves, quais são os principais objetivos do uso de órteses?",
      options: [
        "Prevenir ou corrigir contraturas posicionando as articulações em posição funcional e aplicando pressão sobre as cicatrizes para controle da hipertrofia",
        "Apenas promover a cosmética da área queimada, reduzindo a aparência da cicatriz sem benefícios funcionais significativos no processo de reabilitação",
        "Substituir a mobilização articular por completo, eliminando a necessidade de exercícios terapêuticos durante o processo de reabilitação",
        "Apenas limitar o movimento durante o sono para evitar posições viciosas, sem necessidade de uso durante atividades diurnas"
      ],
      correctAnswer: 0,
      category: "Queimaduras Pediátricas",
      explanation: "As órteses na reabilitação de queimados têm dois objetivos principais: prevenir ou corrigir contraturas posicionando as articulações em posição funcional e aplicar pressão sobre as cicatrizes para controlar a hipertrofia. Devem ser usadas em conjunto com mobilização e outras técnicas, não como substituto. O tempo de uso pode variar de acordo com a fase (aguda, subaguda ou crônica) e deve ser monitorado para evitar complicações."
    },
    {
      question: "CASO CLÍNICO: Um menino de 7 anos com diagnóstico de Distrofia Muscular de Duchenne apresenta sinal de Gowers positivo, dificuldade para subir escadas e correr. A força muscular está preservada em MMSS e diminuída em MMII (grau 4- proximal e 4+ distal). Qual plano terapêutico é mais adequado nesta fase da doença?",
      options: [
        "Prescrição imediata de cadeira de rodas para conservação de energia, mesmo que ainda apresente capacidade de deambulação funcional e independente na maioria dos ambientes",
        "Exercícios resistidos intensos para retardar a progressão da fraqueza muscular, com foco em fortalecimento excêntrico máximo dos grandes grupos musculares",
        "Programa combinando exercícios aeróbicos submáximos, alongamentos, treino de equilíbrio e funcional, com orientação aos pais sobre adaptações ambientais",
        "Imobilização noturna dos membros inferiores e repouso para evitar a fadiga muscular, preservando as fibras musculares remanescentes do desgaste excessivo"
      ],
      correctAnswer: 2,
      category: "Casos Clínicos",
      explanation: "Nesta fase ambulatória da DMD, o plano terapêutico deve visar a manutenção da função, prevenção de contraturas e prolongamento da marcha independente. A abordagem mais adequada é um programa combinando exercícios aeróbicos submáximos (que não aceleram a degeneração), alongamentos para prevenção de contraturas, treino de equilíbrio e funcional para otimizar a mecânica corporal, e orientações aos pais sobre adaptações e manejo. A prescrição de cadeira de rodas seria prematura, exercícios resistidos intensos podem acelerar a degeneração, e a imobilização prolongada promove atrofia."
    },
    {
      question: "CASO CLÍNICO: Uma criança de 3 anos com queimadura de segundo grau profunda em face, pescoço e tórax anterior (20% SCQ) está internada há 5 dias. Apresenta dor, medo de movimentação e início de contraturas no pescoço. Qual abordagem fisioterapêutica inicial é mais apropriada?",
      options: [
        "Abordagem lúdica com técnicas de distração, posicionamento correto, massagem perilesional e mobilização suave respeitando a dor",
        "Mobilização passiva forçada do pescoço para evitar contraturas fixas, mesmo que cause desconforto inicial, priorizando a prevenção de sequelas",
        "Esperar a completa cicatrização (aproximadamente 21 dias) antes de iniciar qualquer intervenção fisioterapêutica para não prejudicar o processo de epitelização",
        "Confecção imediata de órtese rígida para pescoço em hiperextensão máxima, garantindo a manutenção do comprimento muscular durante o sono"
      ],
      correctAnswer: 0,
      category: "Casos Clínicos",
      explanation: "Para uma criança de 3 anos com queimadura recente, a abordagem inicial deve ser gentil e considerar o componente psicológico. Uma abordagem lúdica com técnicas de distração para manejo da dor e do medo, combinada com posicionamento correto, massagem perilesional para dessensibilização e mobilização suave respeitando os limites de dor é mais apropriada. A mobilização forçada aumentaria o trauma e o medo, esperar a cicatrização completa permitiria o estabelecimento de contraturas mais difíceis de tratar, e a órtese em hiperextensão máxima seria desconfortável e potencialmente prejudicial nesta fase."
    },
    {
      question: "CASO CLÍNICO: Uma menina de 5 anos com câncer em estágio terminal está sob cuidados paliativos domiciliares. Apresenta dor generalizada (EVA 8/10), fadiga intensa, edema em membros inferiores, dispneia aos mínimos esforços e tristeza. Os pais relatam dificuldade em administrar os cuidados. Qual deve ser a prioridade da intervenção fisioterapêutica neste momento?",
      options: [
        "Manejo da dor e desconforto respiratório, com orientação aos pais sobre posicionamento, transferências seguras e técnicas de conservação de energia",
        "Implementar um programa de condicionamento cardiorrespiratório leve para reverter a fadiga e melhorar a capacidade funcional global através de múltiplas sessões diárias",
        "Estimulação cognitiva e treino de AVDs para manter sua independência funcional, focando no fortalecimento muscular para as atividades cotidianas",
        "Prescrição de órteses para os membros inferiores para controle do edema, com aplicação de compressão graduada para drenagem linfática passiva"
      ],
      correctAnswer: 0,
      category: "Casos Clínicos",
      explanation: "No contexto de cuidados paliativos em estágio terminal, a prioridade é o manejo dos sintomas e o conforto da criança. A intervenção deve focar no controle da dor (usando técnicas como TENS, massagem, termoterapia), abordagem do desconforto respiratório (posicionamento, técnicas de relaxamento respiratório), e orientação aos pais sobre como realizar movimentações e transferências seguras, além de técnicas para conservação de energia. Programas de condicionamento ou reabilitação funcional intensiva não são apropriados nesta fase, e as intervenções devem ser guiadas pelas necessidades imediatas da criança e família."
    },
    {
      question: "CASO CLÍNICO: Um bebê de 9 meses foi encaminhado para avaliação do desenvolvimento após sua mãe relatar que ele não consegue sentar-se sem apoio. Na avaliação, você observa hipotonia generalizada, reflexos primitivos persistentes (RTCA, Galant), ausência de reações de proteção e paracedismo, e atraso nos marcos motores (não rola, não senta sem apoio, não engatinha). Qual hipótese diagnóstica é mais provável e qual conduta imediata?",
      options: [
        "Atraso do desenvolvimento psicomotor; iniciar estimulação precoce e investigar causas subjacentes através de encaminhamento multidisciplinar",
        "Desenvolvimento motor típico com variação individual; orientações para estimulação em casa com reavaliação após dois meses de intervenção",
        "Transtorno do espectro autista; encaminhar para avaliação multidisciplinar com neuropediatra e terapeuta ocupacional especializado",
        "Atraso motor transitório; reavaliar em 3 meses após orientações básicas de estimulação para os pais aplicarem no ambiente domiciliar"
      ],
      correctAnswer: 0,
      category: "Casos Clínicos",
      explanation: "O quadro descrito sugere fortemente um atraso do desenvolvimento psicomotor: hipotonia generalizada, persistência de reflexos primitivos que deveriam estar integrados aos 9 meses, ausência de reações de proteção esperadas para a idade e atraso em múltiplos marcos motores. A conduta adequada é iniciar imediatamente um programa de estimulação precoce enquanto se investiga as possíveis causas subjacentes (genéticas, neurológicas, metabólicas) através de encaminhamento para avaliação médica e outros profissionais. Este não é um caso de variação individual do desenvolvimento típico nem de atraso transitório."
    },
    {
      question: "CASO CLÍNICO: Um adolescente de 14 anos com Distrofia Muscular de Duchenne em estágio avançado usa cadeira de rodas há 3 anos. Apresenta escoliose progressiva, contraturas em membros e capacidade vital forçada de 35% do previsto. Recentemente, começou a apresentar fadiga ao falar e desconforto respiratório noturno. Qual conduta fisioterapêutica é prioritária neste momento?",
      options: [
        "Avaliação e manejo da função respiratória, incluindo técnicas de tosse assistida, recrutamento de volume pulmonar e posicionamento adequado",
        "Fortalecer intensamente a musculatura paravertebral para corrigir a escoliose progressiva e melhorar a mecânica respiratória comprometida",
        "Encorajar atividades físicas vigorosas para melhorar a capacidade respiratória através de treinamento muscular respiratório de alta intensidade",
        "Imobilização completa para prevenir progressão da escoliose, com restrição total de mobilidade do tronco durante o dia e a noite"
      ],
      correctAnswer: 0,
      category: "Casos Clínicos",
      explanation: "Em pacientes com DMD em estágio avançado, o comprometimento respiratório é uma das principais causas de morbimortalidade. Os sintomas descritos (fadiga ao falar, desconforto respiratório noturno) associados à CVF reduzida indicam insuficiência respiratória iminente. A prioridade é a avaliação completa da função respiratória e implementação de técnicas como tosse assistida (manual ou mecânica), exercícios de recrutamento de volume (empilhamento de ar, respiração glossofaríngea), e posicionamento adequado. O fortalecimento intenso é contraindicado neste estágio, atividades vigorosas poderiam agravar a condição, e a imobilização completa causaria mais complicações respiratórias."
    },
    {
      question: "CASO CLÍNICO: Uma criança de 7 anos apresenta habilidades locomotoras adequadas para a idade, mas dificuldade significativa em habilidades manipulativas (arremessar, rebater). Seus pais relatam que, além disso, ela tem dificuldade em amarrar cadarços, abotoar roupas e escrever. Com base na Teoria dos Sistemas Dinâmicos, qual seria a abordagem terapêutica mais adequada?",
      options: [
        "Exercícios intensivos focados especificamente em amarrar cadarços, abotoar e escrever para aprendizado direto destas tarefas",
        "Abordagem multissistêmica considerando fatores biomecânicos, perceptuais e ambientais, com tarefas variadas de coordenação olho-mão em diferentes contextos",
        "Fortalecimento dos músculos das mãos e braços apenas, já que o problema é puramente muscular",
        "Apenas orientações aos pais para prática em casa, pois são variações normais do desenvolvimento"
      ],
      correctAnswer: 1,
      category: "Desenvolvimento Motor",
      explanation: "Seguindo a Teoria dos Sistemas Dinâmicos, o desenvolvimento motor resulta da interação de múltiplos subsistemas (motor, perceptual, cognitivo, etc.) sob influência de restrições do indivíduo, ambiente e tarefa. A criança apresenta dificuldades tanto em habilidades motoras grossas manipulativas quanto em motricidade fina, sugerindo um padrão de dificuldade na coordenação olho-mão. A abordagem mais adequada é multissistêmica, considerando fatores biomecânicos (força e coordenação), perceptuais (processamento visual, propriocepção), e ambientais (modificações das tarefas), através de experiências variadas em diferentes contextos, não apenas repetição das tarefas específicas problemáticas."
    },
    {
      question: "Considerando a Teoria dos Estágios de Habilidades Motoras Fundamentais, analise o caso: Uma professora de educação física relata que uma criança de 8 anos executa o arremesso por cima do ombro sem rotação do tronco, mantendo os pés paralelos e sem transferência de peso. Este padrão é indicativo de qual estágio?",
      options: [
        "Estágio maduro, pois aos 8 anos já deveria ter desenvolvido completamente esta habilidade",
        "Estágio elementar, com alguns componentes ainda não integrados no movimento",
        "Estágio inicial, com características de tentativas rudimentares da habilidade",
        "Não se aplica a classificação em estágios, pois trata-se de uma variação normal de execução"
      ],
      correctAnswer: 1,
      category: "Desenvolvimento Motor",
      explanation: "O padrão descrito (arremesso sem rotação do tronco, pés paralelos, sem transferência de peso) é característico do estágio elementar das habilidades motoras fundamentais. Neste estágio, há maior controle e coordenação rítmica dos movimentos em comparação ao estágio inicial, mas os movimentos ainda são restritos ou exagerados, faltando a integração completa dos componentes. No estágio maduro, esperado para a idade de 8 anos, o arremesso incluiria rotação do tronco, transferência de peso e posicionamento contralateral dos pés, indicando que esta criança não atingiu o nível esperado para sua idade."
    },
    {
      question: "CASO CLÍNICO: Durante uma avaliação, você observa que uma criança de 18 meses não consegue empilhar blocos, não faz rabiscos, não caminha sozinha e não diz palavras com significado. A mãe relata que a gravidez foi sem intercorrências, mas o parto foi prematuro (32 semanas) com baixo peso ao nascer (1850g). Qual interpretação e conduta são mais adequadas?",
      options: [
        "Considerar a idade corrigida e usar instrumentos de avaliação normatizados para prematuros, sendo necessária intervenção precoce e acompanhamento multidisciplinar",
        "Interpretar como atraso do desenvolvimento significativo e encaminhar para neurologista pediátrico urgentemente",
        "Considerar normal pela prematuridade e reavaliar aos 2 anos de idade",
        "Diagnosticar como Transtorno do Espectro Autista e iniciar terapia comportamental"
      ],
      correctAnswer: 0,
      category: "Avaliação Neurológica",
      explanation: "Para bebês prematuros, é fundamental considerar a idade corrigida até os 2-3 anos de idade ao avaliar o desenvolvimento. Neste caso, a idade corrigida seria aproximadamente 15-16 meses. Mesmo assim, as habilidades descritas estão abaixo do esperado, mas a interpretação deve ser baseada em instrumentos de avaliação normatizados para prematuros. A conduta mais adequada inclui intervenção precoce e acompanhamento multidisciplinar (fisioterapia, terapia ocupacional, fonoaudiologia), considerando os fatores de risco (prematuridade e baixo peso). Não há informações suficientes para diagnósticos específicos como TEA, e esperar até os 2 anos seria inapropriado diante dos atrasos observados."
    },
    {
      question: "Considere um estudo científico que comparou o desenvolvimento motor de crianças de 6-8 anos em escolas públicas e particulares, identificando diferenças significativas em habilidades como equilíbrio, força e habilidades manipulativas. Qual das seguintes interpretações está mais alinhada com a Teoria Ecológica do desenvolvimento motor?",
      options: [
        "As diferenças são principalmente genéticas, refletindo características inatas das populações estudadas",
        "As diferenças representam variações na maturação neurológica causadas por fatores nutricionais",
        "As diferenças refletem as affordances (oportunidades de ação) presentes nos diferentes ambientes, incluindo espaços físicos, equipamentos e práticas culturais",
        "As diferenças são temporárias e se equalizarão naturalmente com o avanço da idade"
      ],
      correctAnswer: 2,
      category: "Desenvolvimento Motor",
      explanation: "A Teoria Ecológica enfatiza a relação entre o indivíduo e o ambiente, considerando que o desenvolvimento motor é fortemente influenciado pelas affordances (oportunidades de ação) presentes no contexto. Diferenças entre escolas públicas e particulares podem refletir variações em fatores ambientais como qualidade e quantidade de espaços para atividade física, disponibilidade de equipamentos esportivos, presença de professores especializados em educação física, valorização cultural de determinadas práticas motoras, e oportunidades estruturadas para desenvolvimento de habilidades específicas. Esta teoria não nega a influência de fatores biológicos, mas destaca como o ambiente molda o desenvolvimento através das oportunidades que oferece ou restringe."
    },
    {
      question: "CASO CLÍNICO COMPLEXO: Um fisioterapeuta está avaliando uma criança de 5 anos com histórico de leucemia linfoblástica aguda, tratada com quimioterapia sistêmica (incluindo vincristina) e radioterapia craniana. A criança apresenta fraqueza muscular generalizada, fadiga crônica, déficit de coordenação, dificuldades de equilíbrio e baixo desempenho em tarefas motoras que antes realizava adequadamente. Que mecanismos fisiopatológicos provavelmente estão contribuindo para este quadro de desenvolvimento motor atípico?",
      options: [
        "Apenas efeitos diretos da quimioterapia na mielinização nervosa periférica",
        "Combinação de neuropatia periférica induzida pela vincristina, miopatia relacionada à inatividade física durante o tratamento, e possíveis efeitos neurocognitivos da radioterapia craniana",
        "Somente efeitos psicológicos secundários ao estigma da doença",
        "Exclusivamente encefalopatia metabólica causada pela leucemia"
      ],
      correctAnswer: 1,
      category: "Desenvolvimento Motor",
      explanation: "O caso apresenta complexidade devido aos múltiplos mecanismos que podem afetar o desenvolvimento motor da criança com histórico oncológico. A vincristina é um quimioterápico neurotóxico que frequentemente causa neuropatia periférica, afetando a condução nervosa e resultando em fraqueza distal, alterações sensoriais e déficits de coordenação. Além disso, o período prolongado de tratamento geralmente leva à inatividade física e subsequente descondicionamento e miopatia. A radioterapia craniana pode causar efeitos neurocognitivos que impactam funções executivas, atenção e processamento visuoespacial, importantes para o desempenho motor. Este caso ilustra como fatores patológicos, medicamentosos e ambientais interagem afetando o desenvolvimento motor, exigindo uma abordagem multidimensional na reabilitação."
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
      "Distrofia Muscular de Duchenne": "#6EC1E4",
      "Cuidados Paliativos Pediátricos": "#FF6B6B",
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
                  Avaliação Pediátrica
                </span>
                <div className="absolute -z-10 blur-3xl opacity-20 bg-gradient-to-r from-[#6EC1E4] to-[#B9A9FF] w-full h-full top-0" />
              </h1>
              <p className="text-[#666666] text-xl leading-relaxed mb-4 max-w-2xl mx-auto mt-8">
                Esta avaliação contém {questions.length} questões sobre Distrofia Muscular de Duchenne e Cuidados Paliativos em Pediatria.
              </p>
              <p className="text-[#888888] text-lg mb-12">
                Você poderá ver a explicação detalhada após responder cada questão.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
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
                <div className="w-12 h-12 rounded-full bg-[#FF6B6B]/10 flex items-center justify-center mb-4">
                  <BarChart className="h-6 w-6 text-[#FF6B6B]" />
                </div>
                <h3 className="text-lg font-semibold text-[#333333] mb-2">Feedback Detalhado</h3>
                <p className="text-[#666666]">Receba explicações completas após cada resposta.</p>
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

  if (showResults) {
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

        {/* Results screen content */}
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
                  Resultados
                </span>
                <div className="absolute -z-10 blur-3xl opacity-20 bg-gradient-to-r from-[#6EC1E4] to-[#B9A9FF] w-full h-full top-0" />
              </h1>
              <p className="text-[#666666] text-xl leading-relaxed mb-4 max-w-2xl mx-auto mt-8">
                Você acertou {score} de {questions.length} questões.
              </p>
              <p className="text-[#888888] text-lg mb-12">
                Sua nota final é: {calculateFinalGrade()}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-sm"
              >
                <div className="w-12 h-12 rounded-full bg-[#6EC1E4]/10 flex items-center justify-center mb-4">
                  <BarChart className="h-6 w-6 text-[#6EC1E4]" />
                </div>
                <h3 className="text-lg font-semibold text-[#333333] mb-2">Análise por Categoria</h3>
                <p className="text-[#666666]">Veja o desempenho em cada área.</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-sm"
              >
                <div className="w-12 h-12 rounded-full bg-[#FF6B6B]/10 flex items-center justify-center mb-4">
                  <BarChart className="h-6 w-6 text-[#FF6B6B]" />
                </div>
                <h3 className="text-lg font-semibold text-[#333333] mb-2">Análise Geral</h3>
                <p className="text-[#666666]">Veja o desempenho geral da avaliação.</p>
              </motion.div>
            </div>

            <div className="text-center">
              <MagneticButton
                onClick={resetQuiz}
                backgroundGradient={true}
                glowOnHover={true}
                strength={20}
                className="px-10 py-5 text-lg font-medium inline-flex items-center"
              >
                <span className="mr-2">Refazer Avaliação</span>
                <BarChart className="h-5 w-5" />
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
                  Avaliação pediátrica
                </span>
                <h1 className="text-2xl md:text-3xl font-bold text-[#333333]">Prova de Fisioterapia Pediátrica</h1>
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