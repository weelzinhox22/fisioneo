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
            <p className="text-sm text-gray-500">30 de maio de 2025</p>
          </div>
        </div>
        
        <div className="space-y-3 text-gray-700">
          <p>
            Todas as questões desta avaliação foram elaboradas com base nos artigos científicos disponibilizados pela professora Leandra Oliva, garantindo alinhamento com o conteúdo programático e as evidências científicas mais atuais na área de fisioterapia neonatal.
          </p>
          <p>
             Os enunciados foram revisados para proporcionar uma avaliação justa e abrangente do conhecimento, todas com base nos artigos científicos disponibilizados pela professora Leandra Oliva.
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
      "question": "Um bebê de 2 meses é levado ao pediatra para uma consulta de rotina. Durante a avaliação, a mãe relata que o bebê raramente reage a sons altos, não fixa o olhar no rosto dela quando está sendo carregado e não emite sons além do choro. Com base nos marcos do desenvolvimento típicos para essa idade, qual a conduta mais apropriada para o profissional de saúde, considerando a importância da detecção precoce?",
      "options": [
        "Acalmar os pais, explicando que cada bebê tem seu próprio ritmo e que a ausência de alguns marcos aos 2 meses não é indicativo de problema, mas sim de uma fase de maturação mais lenta que será superada naturalmente.",
        "Realizar uma triagem de desenvolvimento, compartilhar as preocupações com os pais e, se necessário, encaminhar para avaliação especializada em intervenção precoce, ressaltando a relevância da ação imediata para maximizar o potencial de desenvolvimento do bebê.",
        "Orientar os pais a aguardar até os 4 meses, pois variações individuais no desenvolvimento são comuns e essas manifestações podem ser apenas um atraso pontual que se resolverá espontaneamente sem necessidade de intervenção imediata.",
        "Recomendar o início imediato de um programa de estimulação motora intensiva, focando em exercícios de fortalecimento do pescoço e membros, visto que o principal foco nesse momento é o desenvolvimento físico e a prevenção de atrofias.",
        "Aconselhar os pais a aumentar o tempo de interação com o bebê através de videochamadas com familiares distantes, visando estimular a linguagem e a comunicação, uma vez que a tecnologia pode compensar a falta de estímulos diretos."
      ],
      "correctAnswer": 1,
      "category": "Detecção Precoce e Marcos de 2 Meses",
      "explanation": "A detecção precoce é crucial nos primeiros cinco anos de vida. As manifestações descritas (não reagir a sons altos, não fixar o olhar no rosto, não emitir sons diferentes do choro) são desvios importantes dos marcos esperados para um bebê de 2 meses. A conduta mais apropriada é a triagem, encaminhamento para especialista e intervenção precoce, pois a intervenção imediata maximiza o potencial de desenvolvimento. As outras opções representam subestimação do problema, foco inadequado ou condutas paliativas sem a devida investigação."
    },
    {
      "question": "Um bebê de 3 meses, durante a avaliação do desenvolvimento, ainda apresenta controle pobre da cabeça quando colocado em diferentes posições, especialmente em prono. Além disso, a simetria corporal não se mostra tão evidente quanto o esperado para a idade. Qual a interpretação mais acurada desses achados e a implicação para o desenvolvimento motor?",
      "options": [
        "O principal foco nesse momento deve ser a coordenação olho-mão e a capacidade de seguir objetos. O controle da cabeça é uma habilidade secundária e não indica um problema significativo no desenvolvimento geral da criança.",
        "A presença de um controle pobre da cabeça além dos 3 meses é um sinal de alerta para atraso no desenvolvimento motor, especialmente no controle voluntário. A falta de simetria também é relevante, sugerindo a necessidade de estimulação específica para o alinhamento postural e fortalecimento cervical.",
        "O pobre controle da cabeça e a falta de simetria aos 3 meses são variações normais do desenvolvimento e não indicam qualquer preocupação, pois cada bebê tem seu próprio ritmo e essas habilidades se consolidarão naturalmente nos próximos meses.",
        "Esses achados são indicativos de uma hipotonia fisiológica precoce, que é um bom sinal para futuras aquisições sensório-motoras, e não requerem intervenção, pois o bebê está se preparando para rolar.",
        "A ausência de controle da cabeça é compensada pela força nos membros inferiores. O fisioterapeuta deve priorizar exercícios para o tronco e quadril, pois a estabilidade central é mais importante que o controle cefálico nesta fase."
      ],
      "correctAnswer": 1,
      "category": "Terceiro Mês",
      "explanation": "No terceiro mês, espera-se que o bebê demonstre maior simetria corporal e eleve a cabeça contra a gravidade em prono, marcando o início do controle voluntário. O controle pobre da cabeça além dos 3 meses é um sinal de alerta importante que sugere atraso no desenvolvimento motor e a necessidade de intervenção para estimular o controle cefálico e o alinhamento postural."
    },
    {
      "question": "Aos 5 meses, um bebê explora seus pés e rola para ambos os lados. No entanto, os pais relatam que o bebê utiliza predominantemente apenas um lado do corpo para se mover e interagir com brinquedos. Qual a interpretação mais adequada dessa observação à luz dos marcos de desenvolvimento e sinais de alerta?",
      "options": [
        "O uso unilateral é uma estratégia inteligente do bebê para economizar energia e focar no desenvolvimento da preensão cubito-palmar, não indicando qualquer problema motor ou neurológico, e deve ser incentivado para que a criança domine o lado preferencial.",
        "A observação é irrelevante, pois a avaliação do desenvolvimento motor aos 5 meses deve se concentrar exclusivamente na capacidade de o bebê se sentar sem apoio por curtos períodos, que é o marco mais relevante para a idade.",
        "Nessa idade, o foco principal é a transição para a hipotonia fisiológica, e a assimetria de movimento é uma manifestação normal desse processo de amadurecimento muscular, que não necessita de correção.",
        "A preferência por um lado do corpo é comum e transitória, sem significância clínica, pois o bebê está apenas explorando novas formas de movimento e eventualmente usará ambos os lados de forma simétrica.",
        "A utilização unilateral do corpo é um sinal de alerta importante. Embora o bebê esteja alcançando outros marcos como rolar e explorar os pés, a assimetria persistente requer avaliação e intervenção para descartar possíveis desvios neurológicos ou ortopédicos e promover o uso bilateral."
      ],
      "correctAnswer": 4,
      "category": "Quinto Mês",
      "explanation": "Aos 5 meses, embora o bebê explore os pés e role, usar somente um lado do corpo para se mover é um sinal de alerta importante. Isso pode indicar uma assimetria persistente que necessita de avaliação para descartar possíveis desvios neurológicos ou ortopédicos e promover o desenvolvimento simétrico do movimento e da interação."
    },
    {
      "question": "O Teste de Gesell é um instrumento utilizado para avaliar o desenvolvimento infantil. Quais são as principais categorias de comportamento analisadas por este teste e qual é o tipo de resultado final que ele fornece?",
      "options": [
        "Ele se concentra apenas na avaliação de reflexos primitivos e estereotipias motoras, com um resultado final que classifica a criança em 'leve', 'moderado' ou 'grave' comprometimento neurológico.",
        "As categorias de análise são apenas o comportamento motor fino e a capacidade de resolução de problemas matemáticos, com um resultado final qualitativo, indicando se a criança é 'normal' ou 'anormal'.",
        "O teste avalia exclusivamente a inteligência verbal e não verbal da criança, fornecendo um QI (Quociente de Inteligência) que determina sua capacidade de aprendizado acadêmico futuro.",
        "As categorias incluem comportamento adaptativo, comportamento motor grosso e delicado, comportamento de linguagem e comportamento pessoal-social, com um resultado final quantitativo expresso como quociente de desenvolvimento (QD).",
        "O teste analisa apenas o histórico familiar de desenvolvimento e a saúde geral da criança, sem observar diretamente os comportamentos, e o resultado é uma recomendação de tratamento medicamentoso."
      ],
      "correctAnswer": 3,
      "category": "Teste de Gesell",
      "explanation": "O Teste de Gesell avalia o comportamento da criança em diversas categorias: comportamento adaptativo (organização e adaptação sensório-motora, cognição), comportamento motor grosseiro e delicado (sustentação da cabeça, sentar, engatinhar, andar, manipulação de objetos), comportamento de linguagem (expressiva ou receptiva) e comportamento pessoal-social (relação com o meio-ambiente). O resultado final é quantitativo, expresso como quociente de desenvolvimento (QD)."
    },
    {
      "question": "Um bebê de 6 meses é levado à consulta e, durante a avaliação, a mãe relata que ele ainda tem grande dificuldade para se manter sentado sem apoio, mesmo por curtos períodos. O fisioterapeuta também observa uma alteração no tônus muscular. Qual a significância desses achados e a conduta recomendada?",
      "options": [
        "O principal foco aos 6 meses é a emissão de fonemas e a interação social. A capacidade de sentar e o tônus muscular são secundários e não indicam um problema significativo no desenvolvimento geral da criança.",
        "A dificuldade em sentar sem apoio aos 6 meses é esperada, pois o bebê ainda está na fase de movimentos rudimentares e não há preocupação com o tônus muscular nesta idade. A conduta deve ser apenas esperar o amadurecimento natural.",
        "O bebê deve ser incentivado a utilizar equipamentos de sustentação, como cadeirinhas e andadores, para compensar a fraqueza muscular e acelerar a aquisição da postura sentada, sem necessidade de intervenções terapêuticas adicionais.",
        "Esses são sinais de alerta importantes. A dificuldade em se manter nas posturas esperadas para a faixa etária (como sentar sem apoio) e a alteração do tônus muscular exigem avaliação aprofundada para identificar possíveis atrasos no desenvolvimento motor e iniciar intervenções precoces, focando no controle postural e fortalecimento.",
        "A alteração do tônus muscular é um indicativo de que o bebê está entrando na hipotonia fisiológica de forma acelerada, o que é um bom sinal para o desenvolvimento futuro. A conduta deve ser apenas o acompanhamento de rotina, sem intervenção."
      ],
      "correctAnswer": 3,
      "category": "Sexto Mês",
      "explanation": "Aos 6 meses, espera-se que o bebê consiga se manter sentado sem apoio por curtos períodos. A dificuldade nessa postura e a alteração do tônus muscular são sinais de alerta importantes que exigem avaliação aprofundada para identificar atrasos no desenvolvimento motor. A intervenção precoce é crucial para auxiliar no controle postural e na aquisição de habilidades motoras."
    },
    {
      "question": "No sétimo mês de vida, um bebê demonstra grande desejo de se movimentar e explorar o ambiente. Durante uma avaliação, o fisioterapeuta observa que, ao colocar brinquedos ao alcance lateral, o bebê não consegue se apoiar com uma das mãos para alcançá-los, e não demonstra interesse em tentar passar da posição sentada para 'quatro apoios'. Qual o sinal de alerta mais relevante e a conduta inicial recomendada?",
      "options": [
        "A dificuldade em realizar transferências de peso lateralmente (reação de apoio lateral) e não demonstrar interesse em explorar objetos ou iniciar transições para 'quatro apoios' são sinais de alerta. De acordo com a Tabela 2 ('Falta ganho em 1 área de avaliação'), a conduta inicial é Orientar estímulos e avaliar doenças; observar em 1 mês.",
        "A principal preocupação é a ausência de balbucio e imitação de sons, indicando um atraso na comunicação, que exige encaminhamento imediato para fonoaudiologia, pois a motricidade é secundária nesse mês.",
        "A criança apresenta falta de interesse em explorar objetos, o que é um sinal de alerta para problemas visuais. A conduta inicial deve ser um encaminhamento para avaliação oftalmológica para corrigir a visão e estimular o interesse.",
        "O atraso em passar de sentado para 'quatro apoios' é normal, pois a sedestação independente é o marco mais importante do sétimo mês. A conduta deve ser apenas esperar o desenvolvimento natural sem intervenção.",
        "O problema é o bebê não permanecer muito tempo em supino. O fisioterapeuta deve focar em posicionamentos para aumentar o tempo em supino, pois isso é crucial para o desenvolvimento da estabilidade postural e não as transições."
      ],
      "correctAnswer": 0,
      "category": "Sétimo Mês e Sinais de Alerta",
      "explanation": "No sétimo mês, a reação de apoio lateral é crucial, e a criança inicia a transição para 'quatro apoios' e demonstra desejo de explorar. A dificuldade em transferências de peso lateralmente e a falta de interesse em explorar objetos ou iniciar transições são sinais de alerta. De acordo com a Tabela de Conduta (assumindo que 'Falta ganho em 1 área de avaliação' se aplica a essa falha de marcos), a orientação de estímulos e a observação em 1 mês são a conduta inicial."
    },
    {
      "question": "Uma criança de 8 meses ainda não demonstra tentativas de engatinhar, e quando tenta se locomover, usa predominantemente apenas um lado do corpo para se arrastar. Os pais também relatam que a criança ainda não emite sons com significado simbólico e não gosta de brincar com gestos. Com base nos marcos do oitavo mês, qual a classificação da condição da criança e a ação recomendada?",
      "options": [
        "Normal; a criança está dentro da variabilidade esperada, e o engatinhar pode ocorrer a qualquer momento. A ação é apenas acompanhamento de rotina.",
        "Alerta; falta ganho em pelo menos duas áreas de avaliação (motora/locomoção e comunicação/linguagem). A ação recomendada é Orientar, observar por 1 mês, e se não houver progresso, encaminhar para consulta especializada.",
        "Alerta; falta ganho em apenas uma área de avaliação (motora). A ação é Orientar estímulos e avaliar doenças: observar em 1 mês.",
        "Normal; a preferência unilateral é uma característica individual e a comunicação simbólica só é esperada após os 12 meses. A ação é incentivar brincadeiras com foco em motricidade fina.",
        "Alerta; falta ganho em várias áreas de avaliação (motora, coordenação, social e linguagem). A ação recomendada é Orientar e encaminhar para consulta especializada."
      ],
      "correctAnswer": 4,
      "category": "Oitavo Mês e Conduta de Alerta",
      "explanation": "Aos 8 meses, espera-se que a criança demonstre tentativas de engatinhar e comece a perceber que, com sons, consegue chamar atenção. A ausência de tentativas de engatinhar, o uso unilateral do corpo para se locomover, e a dificuldade com sons/gestos indicam falta de ganho em várias áreas (motora e linguagem/comunicação). De acordo com a Tabela de Conduta, se faltam 1 ou mais ganhos em várias áreas de avaliação, a ação é Orientar e encaminhar para consulta especializada."
    },
    {
      "question": "No nono mês, um bebê já engatinha com rotação do tronco e se mantém sentado de forma estável. No entanto, os pais estão preocupados porque o bebê ainda não demonstra reações de proteção ao perder o equilíbrio quando brinca sentado. Qual a principal implicação dessa observação e a intervenção fisioterapêutica mais adequada?",
      "options": [
        "A incapacidade de demonstrar reações de proteção é um sinal de alerta para problemas visuais. A intervenção deve ser o encaminhamento para um oftalmologista e restrição de brincadeiras que envolvam equilíbrio.",
        "Essa é uma manifestação comum e temporária de um bebê que está se concentrando na motricidade fina. A intervenção deve ser apenas oferecer pequenos objetos para manipulação, sem preocupação com o equilíbrio.",
        "A falta de reações de proteção sugere um desenvolvimento motor acelerado, pois o bebê está pulando a fase das reações de proteção e irá direto para a marcha independente. A intervenção deve ser apenas observar.",
        "Indica um atraso no desenvolvimento das reações de equilíbrio, que são cruciais para a segurança e exploração do ambiente. A intervenção fisioterapêutica deve focar em atividades que estimulem essas reações, como brincadeiras com pequenas perturbações do equilíbrio sentado, com apoio seguro.",
        "O problema é a criança engatinhar com rotação de tronco, o que pode causar escoliose futura. A fisioterapia deve focar em imobilizar o tronco para evitar movimentos compensatórios e proteger a coluna vertebral."
      ],
      "correctAnswer": 3,
      "category": "Nono Mês e Reações de Equilíbrio",
      "explanation": "No nono mês, as reações de equilíbrio, incluindo a reação de apoio posterior, devem estar presentes e aprimoradas. A incapacidade de demonstrar reações de proteção ao perder o equilíbrio é um sinal de alerta. A intervenção fisioterapêutica deve focar na estimulação dessas reações através de atividades que desafiem o equilíbrio de forma segura, preparando a criança para a exploração do ambiente e a prevenção de quedas."
    },
    {
      "question": "Uma criança de 12 meses de idade já balbucia com frequência e inicia a produção das primeiras palavras, como 'mamá' e 'papá' com significado. Com base na tabela de 'Marcos do desenvolvimento da audição e da linguagem', qual a expectativa para a linguagem dessa criança nos próximos meses e qual o principal sinal de alerta relacionado à comunicação após essa idade?",
      "options": [
        "A expectativa é que a criança aumente a frequência do balbucio, inicie a produção das primeiras palavras e entenda ordens simples (como 'dá tchau'), sendo um sinal de alerta não andar com 18 meses ou não falar palavras simples.",
        "A expectativa é que a criança comece a cantar músicas infantis completas e a recitar poemas complexos, sendo um sinal de alerta se não conseguir conversar fluentemente até os 18 meses.",
        "A criança já deveria estar produzindo sentenças completas e complexas, sendo um sinal de alerta a ausência de fala de frases de duas palavras até os 15 meses.",
        "A expectativa é que a criança se comunique exclusivamente por gestos e grunhidos, sendo um sinal de alerta qualquer tentativa de vocalização ou produção de palavras.",
        "A principal expectativa é que a criança imite perfeitamente todos os sons de animais, e o sinal de alerta seria se ela não demonstrar interesse por nenhum tipo de comunicação verbal até os 2 anos."
      ],
      "correctAnswer": 0,
      "category": "Décimo Segundo ao Décimo Quinto Mês e Comunicação",
      "explanation": "De acordo com a tabela 'Marcos do desenvolvimento da audição e da linguagem' (coluna de 12 meses), a criança aumenta a frequência do balbucio, inicia a produção das primeiras palavras e entende ordens simples, como 'dá tchau'. O sinal de alerta para a comunicação é 'Não andar com 18 meses ou não falar palavras simples', indicando a importância da aquisição de palavras e a relação com o desenvolvimento motor."
    },
    {
      "question": "No décimo mês, um bebê consegue segurar objetos pequenos com a pinça bidigital (polpas do indicador e polegar) e usa o dedo indicador para apontar e 'cutucar'. Com base nesses marcos e nas orientações para os pais, qual a principal ação que os pais devem realizar para estimular a motricidade fina e a coordenação nesta fase?",
      "options": [
        "Incentivar o bebê a caminhar segurando em móveis e a praticar passos laterais, pois a motricidade fina se desenvolve automaticamente com o treino da marcha e não exige estimulação específica.",
        "Restringir o acesso a objetos pequenos para evitar que o bebê os leve à boca, pois a segurança é a única prioridade e a manipulação de objetos finos não é crucial nessa idade.",
        "Oferecer pequenos objetos, como grãos de feijão ou pequenos cubos, e incentivar a criança a pegá-los, manipular, e colocar dentro e retirar de recipientes, trabalhando ativamente a coordenação motora fina.",
        "Focar exclusivamente em atividades de leitura e canto para estimular a linguagem, pois a motricidade fina será desenvolvida plenamente apenas no período escolar e não exige intervenção precoce.",
        "Estimular a postura sentada com apoio lateral e frontal gradualmente reduzido, pois a estabilidade do tronco é a base para todas as habilidades motoras, incluindo a motricidade fina."
      ],
      "correctAnswer": 2,
      "category": "Décimo Mês e Motricidade Fina",
      "explanation": "No décimo mês, a criança aprimora a pinça digital superior e usa o dedo indicador para apontar. Para estimular a motricidade fina e a coordenação, os pais devem oferecer pequenos objetos e incentivar a manipulação, como pegar, soltar, e colocar dentro/retirar de recipientes. Isso desenvolve a coordenação olho-mão e a destreza dos dedos."
    },
    {
      "question": "No acompanhamento do desenvolvimento neuropsicomotor, a avaliação do tônus muscular é fundamental. Um bebê de 5 meses, ao ser avaliado, apresenta um tônus muscular onde os membros ficam flexionados, os movimentos são direcionados para o centro do corpo, e quando de bruços, o peso se concentra no pescoço. Com base nos padrões de tônus muscular descritos, qual padrão este bebê está apresentando, e o que isso pode indicar se for o único padrão observado?",
      "options": [
        "Segundo padrão flexor; isso indica que o bebê já está pronto para engatinhar de gatas e que o desenvolvimento está avançado.",
        "Último padrão extensor; o bebê está desenvolvendo o equilíbrio para saltar quando colocado de pé.",
        "Primeiro padrão extensor; o bebê consegue estender-se totalmente, tirando braços e pernas do chão.",
        "Padrão flexor do recém-nascido; se for o único padrão persistente aos 5 meses, pode ser um sinal de anormalidade no tônus muscular e um atraso no desenvolvimento, pois o esperado seria a transição para o primeiro padrão extensor ou segundo padrão flexor.",
        "Hipotonia fisiológica; indica uma transição normal para aquisições sensório-motoras mais complexas, e não há motivo para preocupação."
      ],
      "correctAnswer": 3,
      "category": "Avaliação do Tônus Muscular",
      "explanation": "O padrão de tônus muscular descrito (membros flexionados, movimentos direcionados ao centro do corpo, peso no pescoço em prono) é o 'padrão flexor do recém-nascido'. Aos 5 meses, espera-se que o bebê já tenha passado para o primeiro padrão extensor ou esteja no segundo padrão flexor. A persistência do padrão de recém-nascido nessa idade é um sinal de anormalidade no tônus muscular e possível atraso no desenvolvimento neuro-sensório-motor."
    },
    {
      "question": "Um fisioterapeuta está avaliando um bebê de 3 meses. Ao observar a motricidade espontânea, o profissional nota que o bebê mantém as mãos persistentemente fechadas e que seus movimentos não se direcionam ao centro do corpo, sendo mais limitados. Com base nos sinais de alerta para bebês de até três meses, qual a principal preocupação e a conduta recomendada?",
      "options": [
        "A principal preocupação é que o bebê esteja com frio, e a conduta recomendada é aquecer o ambiente para aumentar os movimentos livres dos braços e pernas.",
        "A persistência das mãos fechadas e a limitação dos movimentos para o centro do corpo são sinais de alerta para aumento do tônus muscular e possíveis problemas no sistema nervoso central. A conduta recomendada é a avaliação aprofundada e intervenção precoce, se necessária.",
        "Esses são comportamentos normais para a idade, indicando que o bebê está desenvolvendo força na preensão. A conduta deve ser apenas observar a evolução natural sem intervenções.",
        "O foco deve ser em estimular o reflexo de busca e fuga nos braços, pois a falta desses movimentos é o sinal mais crítico para essa idade.",
        "A preocupação é com a assimetria postural, que exige o uso imediato de órteses para corrigir a postura antes que o tônus muscular se normalize."
      ],
      "correctAnswer": 1,
      "category": "Avaliação Observacional da Motricidade - Sinais de Alerta",
      "explanation": "Para bebês de até três meses, mãos permanentemente fechadas e movimentos limitados que não se direcionam ao centro do corpo são sinais de alerta, podendo indicar aumento do tônus muscular e problemas no sistema nervoso central. Isso exige uma avaliação aprofundada e, se necessário, intervenção precoce."
    },
    {
      "question": "Um bebê de 8 meses não demonstra tentativas de engatinhar, e quando colocado em prono, apenas rasteja ou desliza para trás. A avaliação do tônus muscular, no entanto, é normal. De acordo com a tabela ('REACÕES E REFLEXOS PRIMITIVOS'), qual reflexo, se persistente nessa idade, poderia indicar um sinal de alerta em relação ao desenvolvimento motor, e qual a fase em que o engatinhar geralmente se estabelece?",
      "options": [
        "Reflexo de mordida; o engatinhar se estabelece entre 0 e 2 meses.",
        "Reflexo de Moro; o engatinhar se estabelece entre 2 e 7 meses.",
        "Reflexo de preensão plantar; o engatinhar se estabelece entre 8 e 10 meses.",
        "Reflexo tônico cervical assimétrico (RTCA); o engatinhar se estabelece entre 8 e 10 meses.",
        "Reflexo de Landau; o engatinhar se estabelece entre 7 e 9 meses."
      ],
      "correctAnswer": 3,
      "category": "Reações e Reflexos Primitivos (Tabela) e Engatinhar",
      "explanation": "De acordo com a tabela 'REACÕES E REFLEXOS PRIMITIVOS', o Reflexo Tônico Cervical Assimétrico (RTCA) deve ter sua inibição por volta dos 4 meses. A persistência do RTCA em um bebê de 8 meses, somada à dificuldade em engatinhar (que geralmente se estabelece entre 8 e 10 meses), é um sinal de alerta importante que interfere no desenvolvimento das transições e da locomoção. O artigo menciona que o engatinhar é geralmente estabelecido entre o oitavo e décimo mês."
    },
    {
      "question": "A maturação neurológica no primeiro ano de vida é dividida em períodos importantes. Qual a característica mais marcante do período por volta das 40 semanas de Idade Corrigida (IC) e como o tônus muscular se comporta nessa fase?",
      "options": [
        "Predomínio da extensão, com dificuldade de sustentar o peso do corpo na posição vertical e desequilíbrio entre flexores e extensores da cabeça.",
        "Predomínio da flexão, extensão na posição vertical e equilíbrio entre flexores e extensores da cabeça.",
        "Predomínio da hipotonia fisiológica, com movimentos descoordenados e ausência de controle cefálico.",
        "Predomínio da hipertonia em membros inferiores, com flexão predominante nos membros superiores e dificuldade de endireitamento do tronco.",
        "Início da maturação descendente do sistema piramidal, levando a uma diminuição generalizada do tônus muscular em todas as posturas."
      ],
      "correctAnswer": 1,
      "category": "Conceitos Essenciais - Maturação Neuromotora",
      "explanation": "Por volta de 40 semanas de Idade Corrigida (IC), o desenvolvimento neuropsicomotor é caracterizado pelo predomínio da flexão, extensão na posição vertical e um equilíbrio entre flexores e extensores da cabeça, marcando um estágio importante na maturação neuromotora."
    },
    {
      "question": "O acompanhamento regular do desenvolvimento neuropsicomotor do bebê é crucial para identificar desvios. Qual das seguintes situações NÃO é considerada um sinal de alerta que exige atenção profissional?",
      "options": [
        "Assimetria persistente nos movimentos ou postura.",
        "Controle pobre da cabeça após 3 meses.",
        "Dificuldade para manter posturas esperadas para a idade.",
        "Movimentação excessiva, mas simétrica e com movimentos direcionados ao centro do corpo.",
        "Ausência de reações de proteção ou equilíbrio."
      ],
      "correctAnswer": 3,
      "category": "Sinais de Alerta e Considerações Adicionais",
      "explanation": "Os sinais de alerta incluem assimetrias, pobreza ou excesso de movimentos (anormais), atraso no controle da cabeça, dificuldades nas posturas e ausência de sorriso social ou reações auditivas. Uma movimentação excessiva, mas que é simétrica e direcionada ao centro do corpo, não é, por si só, um sinal de alerta, pois o artigo menciona que os movimentos de braços e pernas aumentam livremente, especialmente quando o bebê está sem roupa em ambiente aquecido, e os movimentos de 'busca e fuga' acontecem nos braços, com as mãos tentando se encontrar no meio do corpo."
    },
    {
      "question": "A Escala de Desenvolvimento Infantil de Bayley (BSID) é um instrumento abrangente para avaliar o desenvolvimento infantil. Qual é a faixa etária para a qual a versão BSID-III é indicada e quais são os domínios avaliados, destacando como eles são observados?",
      "options": [
        "Indicada para crianças de 1 a 42 meses. Avalia exclusivamente os domínios Cognição e Linguagem (comunicação expressiva e receptiva), observados apenas por questionários preenchidos pelos pais ou cuidadores.",
        "Indicada para crianças de 4 semanas a 36 meses. Avalia os domínios Comportamento Adaptativo, Motor, Linguagem e Pessoal-Social, todos observados diretamente com a criança em situação de teste.",
        "Indicada para recém-nascidos pré-termo com 37-48 semanas pós-concepção. Avalia Critérios de habituação, resposta oromotora, função vestibular e de tronco, e comportamentos e interação social, todos por meio de observação direta do neonato.",
        "Indicada para crianças de 1 a 72 meses. Avalia habilidades motoras grosseiras e finas, divididas em reflexos, estática, locomoção, manipulação de objetos, garra e integração visuomotora, com foco na identificação de disfunção motora.",
        "Indicada para crianças de 1 a 42 meses. Avalia os domínios Cognição, Linguagem (comunicação expressiva e receptiva), Motor (grosso e fino), Social-emocional e Componente adaptativo, sendo os três primeiros observados com a criança em situação de teste e os dois últimos por meio de questionários preenchidos pelos pais ou cuidadores."
      ],
      "correctAnswer": 4,
      "category": "Escala de Desenvolvimento Infantil de Bayley (BSID)",
      "explanation": "A BSID-III é indicada para crianças de 1 a 42 meses de idade. Avalia cinco domínios: Cognição, Linguagem (comunicação expressiva e receptiva), Motor (grosso e fino), Social-emocional e Componente adaptativo. Os três primeiros domínios são observados com a criança em situação de teste, e os dois últimos por meio de questionários preenchidos pelos pais ou cuidadores."
    },
    {
      "question": "Um profissional da saúde utiliza o Teste Denver II para triagem de atrasos no desenvolvimento de uma criança. Qual é o principal objetivo desse teste e quais são as quatro áreas distintas do desenvolvimento neuropsicomotor que ele avalia?",
      "options": [
        "O principal objetivo é diagnosticar atrasos específicos no desenvolvimento. Avalia a maturação neurológica, o tônus muscular, os reflexos e as respostas comportamentais, determinando o desvio neurológico.",
        "O objetivo é direcionar o cuidado dos adultos para crianças com riscos, e não diagnosticar atrasos. Avalia motricidade ampla, motricidade fina-adaptativa, comportamento pessoal-social e linguagem.",
        "O principal objetivo é avaliar a qualidade e a integração de comportamentos em áreas como comportamento adaptativo, motor, linguagem e pessoal-social, fornecendo um Quociente de Desenvolvimento (QD).",
        "O objetivo é identificar recém-nascidos com risco de resultado motor pobre. Avalia movimentos funcionais da cabeça e controle do tronco nas posições em prono, supino e de pé, com itens dicotômicos e escalonados.",
        "O principal objetivo é analisar o desenvolvimento motor do bebê observando habilidades grosseiras em quatro posições (prono, supino, sentada e de pé), identificando atraso motor e avaliando a maturação da habilidade motora grosseira."
      ],
      "correctAnswer": 1,
      "category": "Teste Denver",
      "explanation": "O Teste Denver II tem como objetivo direcionar o cuidado dos adultos para crianças com riscos, e não diagnosticar atrasos no desenvolvimento. Ele avalia quatro áreas distintas do desenvolvimento neuropsicomotor: motricidade ampla, motricidade fina-adaptativa, comportamento pessoal-social e linguagem."
    },
    {
      "question": "Considerando a Tabela 1, um fisioterapeuta busca um instrumento de avaliação que se concentre na investigação de comportamentos motores espontâneos e respostas evocadas em crianças de 0 a 2 anos, sendo útil para descrever o desenvolvimento baseado na integração de reflexos primitivos para o controle postural. Qual instrumento seria o mais adequado para essa finalidade?",
      "options": [
        "Teste de Gesell.",
        "Escala de Desenvolvimento Infantil de Bayley (BSID).",
        "Teste Denver.",
        "Teste de Triagem Sobre o Desenvolvimento de Milani-Comparetti.",
        "Gráfico do Desenvolvimento Motor de Zdanska - Brincken."
      ],
      "correctAnswer": 3,
      "category": "Instrumentos de Avaliação",
      "explanation": "De acordo com a Tabela 1, o 'Teste de Triagem Sobre o Desenvolvimento de Milani-Comparetti' é um teste de investigação padronizado de comportamentos motores espontâneos e respostas evocadas em crianças de 0 a 2 anos, útil para descrever o desenvolvimento baseado na integração de reflexos primitivos para o controle postural."
    },
    {
      "question": "Um pesquisador está buscando um instrumento de avaliação padronizado que seja útil para identificar recém-nascidos com risco de resultado motor pobre, avaliando movimentos funcionais da cabeça e controle do tronco em diferentes posições. O teste deve ser aplicável a bebês pré-termo nascidos com 34 semanas pós-concepção e até 4 meses após o nascimento. Qual instrumento seria o mais indicado para o estudo?",
      "options": [
        "Escala de Avaliação do Comportamento do Neonato (NBAS).",
        "Avaliação dos Movimentos da Criança (MAI).",
        "Peabody Developmental Motor Scale (Escala PDMS).",
        "TIMP (Test of Infant Motor Performance).",
        "Alberta Infant Motor Scale (AIMS)."
      ],
      "correctAnswer": 3,
      "category": "Instrumentos de Avaliação",
      "explanation": "Conforme a Tabela 1, o 'TIMP (Test of Infant Motor Performance)' avalia movimentos funcionais da cabeça e controle do tronco em prono, supino e de pé, e é indicado para bebês pré-termo nascidos com 34 semanas pós-concepção e até 4 meses após o nascimento, identificando RN com risco de resultado motor pobre."
    },
    {
      "question": "Qual instrumento de avaliação do desenvolvimento de prematuros, listado na Tabela 1, é mais focado na avaliação das habilidades motoras grosseiras observadas em quatro posições (prono, supino, sentada e de pé) em crianças de 0 a 18 meses, sendo útil para identificar atraso motor e avaliar a maturação da habilidade motora grosseira?",
      "options": [
        "Teste de Gesell.",
        "Teste Denver.",
        "Avaliação Neurológica de Bebês Prematuros e a Termo.",
        "Gráfico do Desenvolvimento Motor de Zdanska - Brincken.",
        "Alberta Infant Motor Scale (AIMS)."
      ],
      "correctAnswer": 4,
      "category": "Instrumentos de Avaliação",
      "explanation": "De acordo com a Tabela 1, a 'Alberta Infant Motor Scale (AIMS)' é um teste padronizado na observação das habilidades motoras grosseiras em quatro posições (prono, supino, sentada e de pé) em crianças de 0 a 18 meses, identificando RN com atraso motor e avaliando a maturação da habilidade motora grosseira."
    },
    {
      "question": "A avaliação da dor em neonatos é um desafio significativo devido à incapacidade de comunicação verbal. Qual das seguintes escalas de avaliação da dor neonatal se baseia especificamente em expressões faciais como testa franzida, olhos espremidos e lábios entreabertos para mensurar a dor?",
      "options": [
        "Escala PIPP-R (Premature Infant Pain Profile – Revised)",
        "Escala EDIN (Échelle Douleur Inconfort Nouveau-Né)",
        "Escala N-PASS (Neonatal Pain Agitation and Sedation Scale)",
        "Escala NFCS (Neonatal Facial Coding System)",
        "Escala BIIP (Behavioral Indicators of Infant Pain)"
      ],
      "correctAnswer": 3,
      "category": "Escalas de Avaliação da Dor Neonatal",
      "explanation": "A Escala NFCS (Neonatal Facial Coding System) avalia a dor exclusivamente com base em expressões faciais do neonato, como testa franzida, olhos espremidos, sulco nasolabial aprofundado, lábios entreabertos, boca esticada, língua tensa, tremor de queixo e protrusão da língua."
    },
    {
      "question": "Um enfermeiro em uma Unidade de Terapia Intensiva Neonatal (UTIN) precisa avaliar a dor de um bebê prematuro durante um procedimento de punção calcânea. Ele busca uma escala que considere tanto respostas comportamentais quanto fisiológicas, e que seja adaptada para a idade gestacional e o estado comportamental do neonato. Qual escala é a mais indicada para essa situação?",
      "options": [
        "Escala NIPS (Neonatal Infant Pain Scale), por ser a mais utilizada para avaliar dor em procedimentos em geral.",
        "Escala EDIN (Échelle Douleur Inconfort Nouveau-Né), por focar em dor e desconforto prolongados.",
        "Escala NFCS (Neonatal Facial Coding System), por ser baseada apenas em expressões faciais e ser de fácil aplicação.",
        "Escala PIPP-R (Premature Infant Pain Profile – Revised), por ser adaptada especificamente para prematuros e considerar os fatores solicitados.",
        "Escala BIIP (Behavioral Indicators of Infant Pain), por focar apenas em indicadores comportamentais, o que é suficiente para prematuros."
      ],
      "correctAnswer": 3,
      "category": "Escalas de Avaliação da Dor Neonatal",
      "explanation": "A Escala PIPP-R (Premature Infant Pain Profile – Revised) é adaptada especificamente para prematuros, avaliando respostas comportamentais (expressão facial) e fisiológicas (frequência cardíaca, saturação de oxigênio), e considerando também idade gestacional e estado comportamental, o que a torna ideal para a situação descrita."
    },
    {
      "question": "Qual estratégia não farmacológica para alívio da dor neonatal oferece múltiplos benefícios como contato pele a pele, sucção, sabor adocicado do leite e contenção, sendo considerada altamente eficaz durante procedimentos dolorosos?",
      "options": [
        "Posição Canguru, pois o contato pele a pele é suficiente para todos os benefícios.",
        "Sucção Não-Nutritiva, que estimula a sucção mas não oferece os outros benefícios listados.",
        "Estímulos Multissensoriais, que combinam diversas técnicas mas não incluem o sabor adocicado do leite.",
        "Soluções Adocicadas, que oferecem o sabor adocicado mas não o contato pele a pele ou a sucção prolongada.",
        "Aleitamento Materno, por oferecer todos os benefícios de forma integrada durante o procedimento."
      ],
      "correctAnswer": 4,
      "category": "Estratégias Não Farmacológicas",
      "explanation": "O aleitamento materno durante procedimentos dolorosos oferece múltiplos benefícios: contato pele a pele, sucção, sabor adocicado do leite e contenção, sendo uma estratégia altamente eficaz e integrada para alívio da dor em neonatos."
    },
    {
      "question": "A implementação de instrumentos de mensuração da dor em neonatos é gradual nas UTINs. Qual das seguintes afirmações sobre a dor neonatal é verdadeira, e o que ela exige em termos de abordagem?",
      "options": [
        "A dor neonatal é um fator exclusivamente comportamental, exigindo apenas a utilização de chupetas para seu controle em todos os casos, independentemente da intensidade ou tipo de procedimento.",
        "A dor neonatal é um fator unidimensional e fisiológico, exigindo apenas estratégias farmacológicas de alta potência para seu tratamento, sem necessidade de outras abordagens.",
        "A dor neonatal é um fator multidimensional e multifatorial, exigindo uma abordagem abrangente que inclua estratégias farmacológicas e não farmacológicas.",
        "A avaliação da dor neonatal é desnecessária, pois os neonatos não possuem a capacidade neurológica para sentir dor, e qualquer sinal de desconforto é reflexo de outras condições subjacentes.",
        "A dor neonatal é um problema que se resolve espontaneamente com o tempo, e a única intervenção necessária é o repouso absoluto do bebê."
      ],
      "correctAnswer": 2,
      "category": "Implicações para a Prática Clínica",
      "explanation": "A dor neonatal é um fator multidimensional e multifatorial, exigindo uma abordagem abrangente que inclua estratégias farmacológicas e não farmacológicas, e não apenas uma única dimensão ou tipo de intervenção."
    },
    {
      "question": "Um recém-nascido está passando por um procedimento doloroso em uma UTIN. Para promover analgesia, a equipe decide administrar uma solução adocicada oralmente 2 minutos antes do procedimento. Qual é o mecanismo de ação dessa estratégia não farmacológica para alívio da dor?",
      "options": [
        "Ativa receptores de calor na pele do neonato, promovendo uma sensação de conforto que anula a dor.",
        "Bloqueia diretamente os impulsos nervosos da dor no local do procedimento, agindo como um anestésico local.",
        "Estimula a sucção não-nutritiva, que libera endorfinas e promove analgesia, independentemente da composição da solução.",
        "Ativa receptores gustativos e libera endorfinas, promovendo analgesia através de um mecanismo endógeno de alívio da dor.",
        "Induz o sono profundo no neonato, impedindo a percepção da dor durante o procedimento através da sedação."
      ],
      "correctAnswer": 3,
      "category": "Estratégias Não Farmacológicas",
      "explanation": "A administração de glicose ou sacarose oral 2 minutos antes de procedimentos dolorosos ativa receptores gustativos e libera endorfinas, promovendo analgesia. É um mecanismo de ação que envolve a resposta natural do corpo ao sabor adocicado."
    },
    {
      "question": "O Método Canguru (MC) é uma abordagem humanizada para recém-nascidos prematuros ou de baixo peso. Qual é o principal objetivo do MC e em que ano ele foi implementado no Brasil?",
      "options": [
        "O principal objetivo é acelerar a alta hospitalar de RN a termo, e foi implementado no Brasil em 1978.",
        "Visa reduzir os riscos associados à prematuridade, como infecções e hipotermia, e fortalecer o vínculo entre mãe e bebê, sendo implementado no Brasil em 2007.",
        "Seu objetivo é substituir completamente a incubadora em todos os casos de prematuros, e sua implementação no Brasil ocorreu em 2000.",
        "Busca apenas promover o aleitamento materno exclusivo, sem foco na redução de riscos clínicos, e foi implementado no Brasil em 1990.",
        "O objetivo é treinar os pais para realizar procedimentos médicos complexos em casa, e sua implementação no Brasil se deu em 2015."
      ],
      "correctAnswer": 1,
      "category": "Introdução ao Método Canguru",
      "explanation": "O Método Canguru (MC) foi implementado no Brasil em 2007, com o objetivo de reduzir os riscos associados à prematuridade, como infecções e hipotermia, além de fortalecer o vínculo entre mãe e bebê, e promover o aleitamento materno exclusivo."
    },
    {
      "question": "O Método Canguru é dividido em três fases. Qual das seguintes descrições corresponde corretamente à Segunda Fase do MC?",
      "options": [
        "Inicia-se no pré-natal, com o apoio e a educação dos pais, identificando gestantes com risco de parto prematuro e incentivando o contato pele a pele assim que possível, mesmo em cuidados intensivos.",
        "Ocorre durante a internação na UTIN ou UCINCa, onde a mãe é capacitada e orientada para realizar o contato pele a pele de forma segura e contínua, com o bebê apresentando estabilidade clínica, peso mínimo de 1.250g, em nutrição enteral plena e com ganho de peso adequado.",
        "Inicia-se com a alta hospitalar, com o RN pesando no mínimo 1.600g e em aleitamento materno exclusivo ou complementar, recebendo acompanhamento ambulatorial regular até atingir 2.500g.",
        "Foca na reabilitação motora intensiva do bebê após a alta, sem a participação dos pais, visando corrigir deformidades posturais adquiridas durante a internação hospitalar.",
        "Consiste em um período de observação domiciliar do bebê prematuro, sem intervenção profissional, para verificar a adaptação espontânea da família ao novo membro."
      ],
      "correctAnswer": 1,
      "category": "Fases do Método Canguru",
      "explanation": "A Segunda Fase do Método Canguru ocorre durante a internação na UTIN ou UCINCa. Nesta fase, a mãe é capacitada e orientada para realizar o contato pele a pele de forma segura e contínua. O bebê deve apresentar estabilidade clínica, peso mínimo de 1.250g, estar em nutrição enteral plena e com ganho de peso adequado."
    },
    {
      "question": "A atuação do fisioterapeuta no Método Canguru é crucial. Qual das seguintes intervenções é uma responsabilidade do fisioterapeuta no MC, e qual seu objetivo principal?",
      "options": [
        "Administração de medicamentos e monitoramento dos sinais vitais, pois o fisioterapeuta é o principal responsável pelo tratamento farmacológico do RN prematuro.",
        "Realização de cirurgias corretivas para prevenir deformidades musculoesqueléticas severas em prematuros, uma vez que o fisioterapeuta tem formação para procedimentos invasivos.",
        "Promoção de experiências sensoriais adequadas para o desenvolvimento cognitivo e emocional do RN, incluindo estímulos táteis, proprioceptivos, vestibulares e auditivos, respeitando o limiar de tolerância do bebê prematuro.",
        "Exclusivamente a orientação para o aleitamento materno, sem envolvimento com o desenvolvimento motor ou postural do bebê.",
        "Foco na organização de eventos sociais para a família, sem qualquer intervenção direta no cuidado clínico do recém-nascido, pois o suporte familiar é responsabilidade apenas de assistentes sociais."
      ],
      "correctAnswer": 2,
      "category": "Atuação da Fisioterapia no Método Canguru",
      "explanation": "O fisioterapeuta desempenha um papel crucial na promoção de experiências sensoriais adequadas para o desenvolvimento cognitivo e emocional do RN. Isso inclui estímulos táteis, proprioceptivos, vestibulares e auditivos, sempre respeitando o limiar de tolerância do bebê prematuro."
    },
    {
      "question": "Um estudo científico sobre o Método Canguru demonstrou que a posição canguru promove a estabilidade das funções fisiológicas do RN. Além disso, quais outros benefícios o MC proporciona ao neurodesenvolvimento do bebê e à confiança dos pais?",
      "options": [
        "Apenas a redução de infecções hospitalares, sem qualquer impacto no neurodesenvolvimento ou na relação entre pais e bebê.",
        "Auxilia no desenvolvimento neurológico do RN, promovendo a regulação fisiológica e reduzindo o estresse, e aumenta a confiança dos pais no cuidado com o bebê.",
        "Provoca um aumento significativo do estresse no RN devido à estimulação excessiva do contato pele a pele, diminuindo o neurodesenvolvimento e a confiança dos pais.",
        "Limita o ganho de peso e impede o aleitamento materno, o que impacta negativamente o neurodesenvolvimento e a confiança dos pais.",
        "Foca exclusivamente na melhora respiratória através de mudanças de decúbito, sem influenciar diretamente o neurodesenvolvimento ou a confiança dos pais."
      ],
      "correctAnswer": 1,
      "category": "Evidências Científicas",
      "explanation": "O Método Canguru (MC) auxilia no desenvolvimento neurológico do RN, promovendo a regulação fisiológica e reduzindo o estresse. Além disso, a interação com o fisioterapeuta durante o MC aumenta a confiança dos pais no cuidado com o bebê, sendo um benefício importante evidenciado por estudos."
    },
    {
      "question": "A Ofurôterapia é uma das intervenções fisioterapêuticas citadas no Método Canguru. Qual é o principal benefício da Ofurôterapia para o recém-nascido prematuro?",
      "options": [
        "Acelerar o processo de desidratação do bebê, para que ele perca peso mais rapidamente e atinja o peso mínimo para alta hospitalar.",
        "Promover o relaxamento e bem-estar do RN, simulando o ambiente uterino, o que reduz o estresse e favorece o desenvolvimento sensorial.",
        "Fortalecer a musculatura esquelética do bebê através de exercícios aquáticos de alta intensidade, preparando-o para a marcha precoce.",
        "Induzir hipotermia controlada para estimular a circulação sanguínea periférica e prevenir infecções graves.",
        "Estimular a comunicação verbal precoce do bebê através de vocalizações no ambiente aquático, sem outros benefícios fisiológicos."
      ],
      "correctAnswer": 1,
      "category": "Atuação da Fisioterapia no Método Canguru",
      "explanation": "A Ofurôterapia utiliza banhos terapêuticos para promover o relaxamento e bem-estar do RN. Este procedimento simula o ambiente uterino, reduzindo o estresse e favorecendo o desenvolvimento sensorial do bebê prematuro."
    },
    {
      "question": "A hidroterapia em neonatos é uma abordagem terapêutica que utiliza as propriedades da água. Qual é o principal objetivo dessa técnica em recém-nascidos, especialmente prematuros?",
      "options": [
        "Acelerar a perda de peso para facilitar a alta hospitalar precoce, através da diurese induzida pela imersão em água.",
        "Promover relaxamento, estimulação sensorial e motora, recriando um ambiente semelhante ao intrauterino para favorecer o desenvolvimento neuromotor e reduzir o estresse.",
        "Realizar exercícios de fortalecimento muscular de alta intensidade para corrigir hipotonia severa e acelerar o desenvolvimento da marcha independente em prematuros.",
        "Estimular a vocalização e a comunicação verbal precoce do neonato através de exercícios de fonoaudiologia aquática, sem impacto no desenvolvimento motor.",
        "Apenas resfriar o corpo do bebê para controlar febres persistentes e prevenir infecções, não sendo indicada para estimulação ou relaxamento."
      ],
      "correctAnswer": 1,
      "category": "Introdução à Hidroterapia Neonatal",
      "explanation": "A hidroterapia para neonatos utiliza as propriedades físicas da água para promover relaxamento, estimulação sensorial e motora em recém-nascidos, especialmente prematuros. Ela recria um ambiente semelhante ao intrauterino, favorecendo o desenvolvimento neuromotor, reduzindo o estresse e promovendo o bem-estar do bebê."
    },
    {
      "question": "Uma das técnicas de hidroterapia em neonatologia é o Ofurô Terapêutico. Qual é a principal característica dessa técnica e qual benefício ela proporciona ao neonato?",
      "options": [
        "Consiste na imersão total do bebê em água fria por longos períodos para estimular o sistema circulatório e aumentar o tônus muscular.",
        "É uma técnica adaptada da dança aquática que envolve movimentos rápidos e vigorosos para fortalecer a musculatura respiratória e melhorar a capacidade pulmonar do bebê.",
        "Envolve a imersão parcial do bebê em água aquecida (aprox. 37°C) em banheiras adaptadas, simulando o ambiente uterino, o que proporciona relaxamento global, redução do estresse e melhora da qualidade do sono.",
        "Utiliza jatos de água de alta pressão para realizar massagens terapêuticas que quebram aderências cicatriciais e promovem a cicatrização de lesões de pele em neonatos.",
        "Baseia-se na aplicação de compressas úmidas e frias em todo o corpo do bebê para induzir um estado de hibernação controlada e reduzir a demanda metabólica."
      ],
      "correctAnswer": 2,
      "category": "Técnicas de Hidroterapia em Neonatologia",
      "explanation": "O Ofurô Terapêutico consiste na imersão parcial do bebê em água aquecida (aproximadamente 37°C), em banheiras adaptadas que permitem manter o neonato em posição fetal, simulando o ambiente uterino. A técnica proporciona relaxamento global, redução do estresse e melhora da qualidade do sono."
    },
    {
      "question": "Qual das seguintes condições representa uma contraindicação ABSOLUTA para a realização da hidroterapia em neonatos?",
      "options": [
        "Hipotonia muscular.",
        "Desorganização sensorial.",
        "Estresse e irritabilidade.",
        "Instabilidade clínica ou hemodinâmica.",
        "Prematuridade estável (após 32 semanas de idade corrigida)."
      ],
      "correctAnswer": 3,
      "category": "Indicações e Contraindicações",
      "explanation": "A instabilidade clínica ou hemodinâmica é uma contraindicação absoluta para a realização da hidroterapia em neonatos, pois a intervenção poderia comprometer ainda mais a saúde do bebê. As outras opções listadas são indicações ou condições que podem ser beneficiadas pela hidroterapia."
    },
    {
      "question": "A implementação da hidroterapia em UTINs requer protocolos específicos. Qual é a etapa que envolve a verificação dos sinais vitais, análise da estabilidade clínica, avaliação da idade gestacional corrigida e discussão com a equipe multidisciplinar antes do procedimento?",
      "options": [
        "Preparação do Ambiente, que inclui o controle da temperatura da água e a desinfecção da banheira.",
        "Realização do Procedimento, que abrange a imersão gradual e o monitoramento contínuo das respostas comportamentais.",
        "Avaliação Pós-procedimento, focada na secagem cuidadosa e no registro das respostas obtidas para a próxima sessão.",
        "Capacitação da Equipe, que é o treinamento dos profissionais na aplicação das técnicas.",
        "Avaliação Pré-procedimento, que é a fase inicial de verificação da condição do bebê e planejamento da abordagem."
      ],
      "correctAnswer": 4,
      "category": "Protocolos de Aplicação",
      "explanation": "A etapa que envolve a verificação dos sinais vitais, análise da estabilidade clínica, avaliação da idade gestacional corrigida e discussão com a equipe multidisciplinar para determinar a melhor abordagem é a 'Avaliação Pré-procedimento'. As outras opções descrevem fases posteriores ou distintas do processo."
    },
    {
      "question": "Estudos científicos têm documentado diversos benefícios da hidroterapia em neonatos. Qual dos seguintes não é um benefício comprovado da hidroterapia neonatal?",
      "options": [
        "Redução da frequência cardíaca e respiratória.",
        "Diminuição dos níveis de cortisol e melhora da qualidade do sono.",
        "Aumento da necessidade de sedação e analgésicos potentes.",
        "Normalização do tônus em bebês com hipertonia ou hipotonia.",
        "Melhor desenvolvimento neuromotor a longo prazo."
      ],
      "correctAnswer": 2,
      "category": "Benefícios Comprovados",
      "explanation": "O artigo menciona que a hidroterapia promove 'Alívio da Dor' e 'Redução do Estresse', o que implicaria uma diminuição, e não um 'aumento da necessidade de sedação e analgésicos potentes'. As outras opções são benefícios comprovados explicitamente citados: 'Estabilização dos Sinais Vitais' (incluindo redução de frequência cardíaca e respiratória), 'Redução do Estresse' (com diminuição de cortisol e melhora do sono), 'Regulação do Tônus Muscular' e 'Melhor Desenvolvimento Neuromotor'."
    },
    {
      "question": "O desenvolvimento cerebral é um processo complexo que pode ser afetado pela prematuridade. Qual das seguintes afirmações descreve corretamente o impacto da prematuridade na mielinização e sinaptogênese?",
      "options": [
        "A mielinização ocorre exclusivamente no primeiro trimestre da gestação e não é afetada pela prematuridade, enquanto a sinaptogênese é interrompida, resultando em superprodução de conexões sinápticas que causam rigidez muscular.",
        "A prematuridade acelera a mielinização e a sinaptogênese, levando a um desenvolvimento cerebral mais rápido e robusto, sem riscos de sequelas neurológicas a longo prazo.",
        "A mielinização, crucial para a transmissão eficiente dos impulsos nervosos, ocorre principalmente no terceiro trimestre e pode ser comprometida em nascimentos prematuros, e alterações na sinaptogênese podem afetar a plasticidade e funcionalidade cerebral.",
        "Tanto a mielinização quanto a sinaptogênese são processos que só se iniciam após o nascimento, portanto, a prematuridade não tem impacto direto sobre eles, e as sequelas neurológicas são causadas apenas por fatores genéticos.",
        "A prematuridade causa uma migração neuronal excessiva, o que compensa a falta de mielinização e sinaptogênese, garantindo um desenvolvimento cerebral normal mesmo em casos de nascimentos muito prematuros."
      ],
      "correctAnswer": 2,
      "category": "Desenvolvimento Cerebral Normal e Impacto da Prematuridade",
      "explanation": "A mielinização, crucial para a transmissão eficiente dos impulsos nervosos, ocorre principalmente no terceiro trimestre e pode ser comprometida em nascimentos prematuros. Da mesma forma, alterações na sinaptogênese, que é intensa durante a gestação e os primeiros anos, podem afetar a plasticidade e funcionalidade cerebral. A prematuridade interrompe esses processos em momentos críticos, o que pode resultar em diversas sequelas neurológicas."
    },
    {
      "question": "Um recém-nascido prematuro foi diagnosticado com uma lesão isquêmica da substância branca periventricular que resultou na formação de cistos. Qual o nome dessa lesão e qual a sequela neurológica mais fortemente associada a ela?",
      "options": [
        "Hemorragia Peri-intraventricular (HPIV); está fortemente associada ao Transtorno de Déficit de Atenção e Hiperatividade (TDAH).",
        "Lesão Difusa da Substância Branca; está associada a deficiências cognitivas graves, mas sem impacto motor.",
        "Leucomalácia Periventricular (LPV); está fortemente associada ao desenvolvimento de paralisia cerebral, especialmente a forma espástica bilateral.",
        "Encefalopatia Hipóxico-Isquêmica; está associada principalmente a problemas de linguagem e comunicação.",
        "Displasia Broncopulmonar; está associada a atraso no desenvolvimento motor, mas sem lesão cerebral detectável."
      ],
      "correctAnswer": 2,
      "category": "Principais Lesões Neurológicas em Prematuros",
      "explanation": "A Leucomalácia Periventricular (LPV) caracteriza-se por lesão isquêmica da substância branca periventricular, resultando em necrose focal e formação de cistos. A LPV cística é fortemente associada ao desenvolvimento de paralisia cerebral, especialmente a forma espástica bilateral."
    },
    {
      "question": "A prematuridade pode levar a diversas sequelas neurológicas a longo prazo. Qual das seguintes opções descreve corretamente uma dessas sequelas e um fator de risco importante para o seu desenvolvimento?",
      "options": [
        "Transtorno do Espectro Autista (TEA), que está associado apenas a fatores genéticos, sem influência da prematuridade.",
        "Epilepsia, cujo risco é aumentado em prematuros, particularmente naqueles com lesões cerebrais estruturais como HPIV graus III e IV e LPV extensa.",
        "Paralisia Cerebral, que é mais comum na forma atáxica e não tem relação com a idade gestacional.",
        "Déficits Cognitivos, que só ocorrem se houver infecções virais maternas durante o primeiro trimestre da gestação, sem relação com a prematuridade.",
        "Dificuldades de Aprendizagem, que são causadas exclusivamente por problemas emocionais e de socialização, sem substrato neurológico."
      ],
      "correctAnswer": 1,
      "category": "Sequelas Neurológicas a Longo Prazo",
      "explanation": "O risco de epilepsia é aumentado em prematuros, particularmente naqueles com lesões cerebrais estruturais. A HPIV graus III e IV e a LPV extensa são fatores de risco importantes para o desenvolvimento de epilepsia na infância e adolescência."
    },
    {
      "question": "A intervenção fisioterapêutica precoce em recém-nascidos prematuros é fundamental para minimizar as sequelas neurológicas. Qual das seguintes intervenções faz parte da atuação do fisioterapeuta na UTIN?",
      "options": [
        "Realização de cirurgias ortopédicas complexas para corrigir deformidades congênitas imediatamente após o nascimento.",
        "Administração de corticosteroides em altas doses para promover a maturação pulmonar e cerebral, sem necessidade de acompanhamento fisioterapêutico.",
        "Posicionamento terapêutico para prevenir deformidades e promover alinhamento, contenção facilitada para organização comportamental e estimulação sensorial controlada e adequada à maturidade do SNC.",
        "Restrição total de estímulos sensoriais e motores para preservar a energia do bebê e evitar sobrecarga do sistema nervoso imaturo.",
        "Foco exclusivo na terapia de fala e linguagem, pois as dificuldades motoras são secundárias e se resolvem espontaneamente com o tempo."
      ],
      "correctAnswer": 2,
      "category": "Abordagem Fisioterapêutica - Intervenção na UTIN",
      "explanation": "A atuação do fisioterapeuta na UTIN inclui posicionamento terapêutico para prevenir deformidades e promover alinhamento, contenção facilitada para organização comportamental e estimulação sensorial controlada e adequada à maturidade do SNC, além da orientação para manuseio mínimo em momentos de instabilidade."
    },
    {
      "question": "Em relação aos fatores de risco e proteção para sequelas neurológicas em prematuros, qual das seguintes combinações está CORRETA?",
      "options": [
        "Fator de risco: Idade gestacional e peso ao nascer elevados; Fator protetor: Necessidade de ventilação mecânica prolongada.",
        "Fator de risco: Infecções (como sepse neonatal); Fator protetor: Corticoterapia antenatal completa.",
        "Fator de risco: Estabilidade hemodinâmica; Fator protetor: Hipoxemia e hipercarbia.",
        "Fator de risco: Ausência de lesões cerebrais evidentes; Fator protetor: Diagnóstico tardio de TDAH.",
        "Fator de risco: Parto cesariana eletiva; Fator protetor: Baixa estatura materna."
      ],
      "correctAnswer": 1,
      "category": "Fatores de Risco e Proteção",
      "explanation": "Infecções como sepse neonatal são fatores de risco para lesão cerebral em prematuros, enquanto a corticoterapia antenatal completa é um fator protetor, pois ajuda na maturação pulmonar e cerebral, reduzindo o risco de lesões."
    },
    {
      "question": "A prematuridade afeta o desenvolvimento pulmonar em fases críticas. Qual das seguintes opções descreve corretamente a Fase Sacular do desenvolvimento pulmonar intrauterino e um evento crucial que se inicia nessa fase?",
      "options": [
        "Fase Pseudoglandular; com a formação das vias aéreas condutoras e o início da produção de surfactante.",
        "Fase Alveolar; caracterizada pela multiplicação alveolar intensa e o desenvolvimento da barreira alvéolo-capilar.",
        "Fase Canalicular; com o aumento do calibre das vias aéreas e a formação dos alvéolos verdadeiros por septação secundária.",
        "Fase Sacular; caracterizada pelo desenvolvimento dos ácinos, afinamento do epitélio respiratório, aproximação dos capilares e início da produção de surfactante.",
        "Fase de Maturação; com a formação de todas as estruturas pulmonares e o desenvolvimento completo da troca gasosa, que ocorre apenas após o nascimento."
      ],
      "correctAnswer": 3,
      "category": "Desenvolvimento Pulmonar Intrauterino",
      "explanation": "A Fase Sacular (24-38 semanas) é caracterizada pelo desenvolvimento dos ácinos, com formação de sacos terminais, afinamento do epitélio respiratório e aproximação dos capilares. É nessa fase que se inicia a produção de surfactante, crucial para a função pulmonar."
    },
    {
      "question": "A Displasia Broncopulmonar (DBP) é uma complicação respiratória crônica da prematuridade. Como a 'nova DBP' é caracterizada, em contraste com a DBP 'clássica', e qual é o seu principal efeito na arquitetura pulmonar?",
      "options": [
        "A DBP 'clássica' era caracterizada por interrupção do desenvolvimento alveolar normal, enquanto a 'nova DBP' está associada a lesão pulmonar induzida por ventilação mecânica agressiva e toxicidade do oxigênio, resultando em alvéolos maiores e em menor número.",
        "A 'nova DBP' é caracterizada principalmente por interrupção do desenvolvimento alveolar normal, resultando em alvéolos maiores e em menor número, com redução da área de troca gasosa, diferentemente da DBP 'clássica' que estava mais ligada à lesão por ventilação agressiva e toxicidade do oxigênio.",
        "Ambas as formas de DBP são idênticas em suas características fisiopatológicas e manifestações clínicas, diferenciando-se apenas pelo tempo de diagnóstico.",
        "A 'nova DBP' é uma doença puramente infecciosa, sem impacto na arquitetura pulmonar, enquanto a DBP 'clássica' era causada por fatores genéticos e não por ventilação mecânica.",
        "A DBP, tanto clássica quanto nova, leva a um aumento no número de alvéolos e uma maior área de troca gasosa, melhorando a função pulmonar em prematuros a longo prazo."
      ],
      "correctAnswer": 1,
      "category": "Doença Pulmonar Crônica da Prematuridade (DPCP)",
      "explanation": "A 'nova DBP' é caracterizada principalmente por interrupção do desenvolvimento alveolar normal, resultando em alvéolos maiores e em menor número, com redução da área de troca gasosa. A DBP 'clássica', por sua vez, estava mais associada a lesão pulmonar induzida por ventilação mecânica agressiva e toxicidade do oxigênio."
    },
    {
      "question": "A fisioterapia respiratória desempenha um papel fundamental no manejo das sequelas pulmonares em prematuros. Na fase aguda (UTIN), qual é uma das principais intervenções do fisioterapeuta para otimizar a função respiratória do RN?",
      "options": [
        "Priorizar o treinamento muscular de grandes grupos, ignorando o posicionamento, pois a força muscular é o principal fator para o desmame ventilatório.",
        "Realizar aspiração de vias aéreas apenas quando houver grande acúmulo de secreções visível, sem considerar a técnica minimamente invasiva.",
        "Focar exclusivamente na realização de exercícios aeróbicos intensos para aumentar a capacidade pulmonar, mesmo em neonatos instáveis.",
        "Posicionamento adequado para otimizar a relação ventilação-perfusão, e suporte à ventilação não-invasiva e desmame ventilatório, além de técnicas de higiene brônquica adaptadas.",
        "Administrar surfactante exógeno diretamente nas vias aéreas do bebê, pois essa é uma função exclusiva do fisioterapeuta na UTIN para reverter a DBP."
      ],
      "correctAnswer": 3,
      "category": "Abordagem Fisioterapêutica - Fase Aguda (UTIN)",
      "explanation": "Na fase aguda (UTIN), o fisioterapeuta atua com posicionamento adequado para otimizar a relação ventilação-perfusão, suporte à ventilação não-invasiva e desmame ventilatório, e técnicas de higiene brônquica adaptadas à condição do RN. A aspiração de vias aéreas é realizada quando necessária, com técnica minimamente invasiva."
    },
    {
      "question": "Mesmo após a alta hospitalar, prematuros com sequelas pulmonares necessitam de acompanhamento ambulatorial. Qual das seguintes ações faz parte da abordagem fisioterapêutica nesse período, visando o desenvolvimento a longo prazo?",
      "options": [
        "Interromper todas as intervenções fisioterapêuticas, pois a recuperação pulmonar se completa espontaneamente após a alta da UTIN.",
        "Realizar avaliação periódica da função respiratória, técnicas de desobstrução brônquica em casos de secreção aumentada, exercícios respiratórios para melhorar volumes e capacidades, e orientação familiar sobre sinais de descompensação.",
        "Focar apenas em cirurgias corretivas para expandir o parênquima pulmonar, sem a necessidade de exercícios ou educação familiar.",
        "Restringir a criança de toda e qualquer atividade física para evitar sobrecarga pulmonar, mesmo que a condição clínica permita.",
        "Administrar exclusivamente medicamentos broncodilatadores em casa, sem qualquer intervenção fisioterapêutica complementar ou monitoramento."
      ],
      "correctAnswer": 1,
      "category": "Abordagem Fisioterapêutica - Acompanhamento Ambulatorial",
      "explanation": "No acompanhamento ambulatorial, a fisioterapia inclui avaliação periódica da função respiratória, técnicas de desobstrução brônquica em casos de secreção aumentada, exercícios respiratórios para melhorar volumes e capacidades e orientação familiar para reconhecimento precoce de sinais de descompensação."
    },
    {
      "question": "A DBP tem uma etiologia multifatorial. Qual dos seguintes fatores NÃO é diretamente citado no artigo como contribuindo para o desenvolvimento da DBP?",
      "options": [
        "Imaturidade pulmonar.",
        "Inflamação.",
        "Estresse oxidativo.",
        "Barotrauma/volutrauma.",
        "Exposição a altos níveis de ruído ambiental na UTIN."
      ],
      "correctAnswer": 4,
      "category": "Doença Pulmonar Crônica da Prematuridade (DPCP) - Etiologia Multifatorial",
      "explanation": "O artigo cita imaturidade pulmonar, inflamação, estresse oxidativo, barotrauma/volutrauma, infecções, fatores genéticos, persistência do canal arterial, administração excessiva de fluidos e desnutrição como fatores que contribuem para a DBP. A exposição a altos níveis de ruído ambiental na UTIN não é diretamente mencionada como fator etiológico da DBP neste artigo."
    },
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
        href="/temas"
            className="inline-flex items-center text-[#666666] hover:text-[#333333] transition-colors mb-12 group"
          >
            <ChevronLeft className="h-5 w-5 mr-1 transition-transform group-hover:-translate-x-1" />
            Voltar para conteúdo neonatal
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
