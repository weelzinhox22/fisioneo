"use client"

import React, { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, CheckCircle2, XCircle, BarChart, TrendingUp, ChevronRight, AlarmClock, ChevronLeft, FileDown, Bell, X } from "lucide-react"
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

// Modal de atualização
interface UpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UpdateModal: React.FC<UpdateModalProps> = ({ isOpen, onClose }) => {
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
            <h3 className="text-lg font-semibold text-gray-900">Atualização de Conteúdo</h3>
            <p className="text-sm text-gray-500">30 de maio de 2025</p>
          </div>
        </div>
        
        <div className="space-y-3 text-gray-700">
          <p>
            Informamos que as questões desta avaliação foram completamente revisadas e atualizadas para melhor refletir o conteúdo programático da disciplina de Fisioterapia Pediátrica.
          </p>
          <p>
            As atualizações incluem:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Reformulação dos enunciados para maior clareza</li>
            <li>Distribuição mais equilibrada das alternativas corretas</li>
            <li>Atualização das explicações com base em evidências científicas</li>
            <li>Ajuste do nível de dificuldade para melhor avaliação do conhecimento</li>
          </ul>
          <p className="font-medium text-blue-600">
            Agradecemos sua compreensão e dedicação aos estudos. Esta atualização visa proporcionar uma experiência de aprendizado mais eficaz e alinhada com as práticas atuais em fisioterapia pediátrica.
          </p>
        </div>
        
        <div className="mt-6">
          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 bg-gradient-to-r from-[#6EC1E4] to-[#B9A9FF] text-white rounded-lg font-medium hover:shadow-md transition-all"
          >
            Entendido, obrigado!
          </button>
        </div>
      </motion.div>
    </div>
  );
};

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
  
  // Verificar se o usuário já viu o popup
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const hasSeenUpdate = localStorage.getItem('hasSeenPediatricaUpdate-May2025');
    if (hasSeenUpdate) {
      setIsModalOpen(false);
    }
  }, []);

  // Função para fechar o modal e salvar no localStorage
  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem('hasSeenPediatricaUpdate-May2025', 'true');
    }
  }
  
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
      
        "question": "Um bebê de 2 meses é levado ao pediatra para uma consulta de rotina. Durante a avaliação, a mãe relata que o bebê raramente reage a sons altos, não fixa o olhar no rosto dela quando está sendo carregado e não emite sons além do choro. Com base nos marcos do desenvolvimento típicos para essa idade, qual a conduta mais apropriada para o profissional de saúde, considerando a importância da detecção precoce?",
        "options": [
          "Orientar os pais a aguardar até os 4 meses, pois variações individuais no desenvolvimento são comuns e essas manifestações podem ser apenas um atraso pontual que se resolverá espontaneamente sem necessidade de intervenção imediata.",
          "Acalmar os pais, explicando que cada bebê tem seu próprio ritmo e que a ausência de alguns marcos aos 2 meses não é indicativo de problema, mas sim de uma fase de maturação mais lenta que será superada naturalmente.",
          "Aconselhar os pais a aumentar o tempo de interação com o bebê através de videochamadas com familiares distantes, visando estimular a linguagem e a comunicação, uma vez que a tecnologia pode compensar a falta de estímulos diretos.",
          "Realizar uma triagem de desenvolvimento, compartilhar as preocupações com os pais e, se necessário, encaminhar para avaliação especializada em intervenção precoce, ressaltando a relevância da ação imediata para maximizar o potencial de desenvolvimento do bebê.",
          "Recomendar o início imediato de um programa de estimulação motora intensiva, focando em exercícios de fortalecimento do pescoço e membros, visto que o principal foco nesse momento é o desenvolvimento físico e a prevenção de atrofias."
        ],
        "correctAnswer": 3,
        "category": "Detecção Precoce e Marcos de 2 Meses",
        "explanation": "A detecção precoce é crucial nos primeiros cinco anos de vida. As manifestações descritas (não reagir a sons altos, não fixar o olhar no rosto, não emitir sons diferentes do choro) são desvios importantes dos marcos esperados para um bebê de 2 meses. A conduta mais apropriada é a triagem, encaminhamento para especialista e intervenção precoce, pois a intervenção imediata maximiza o potencial de desenvolvimento. As outras opções representam subestimação do problema, foco inadequado ou condutas paliativas sem a devida investigação."
      },
      {
        "question": "Uma criança de 4 anos demonstra dificuldades significativas em nomear cores básicas, apresenta vocabulário restrito a frases de duas palavras, não consegue recontar eventos simples do seu dia e raramente pede para brincar com outras crianças, preferindo atividades solitárias. Com base nos marcos de desenvolvimento para essa faixa etária, qual seria a principal preocupação e a abordagem inicial mais adequada?",
        "options": [
          "Há um indicativo de atraso no desenvolvimento linguístico e social/emocional, justificando uma avaliação multidisciplinar para identificar possíveis transtornos de desenvolvimento e o início de intervenções terapêuticas específicas para essas áreas, como fonoaudiologia e terapia ocupacional.",
          "A principal preocupação é o desenvolvimento motor grosso, indicando a necessidade de atividades físicas mais desafiadoras para melhorar a coordenação e o equilíbrio, já que a falta de interação social é um reflexo da imaturidade física.",
          "Sugerir que os pais matriculem a criança em uma pré-escola de período integral, pois a imersão em um ambiente social rico, por si só, garantirá que a criança atinja todos os marcos de desenvolvimento atrasados sem a necessidade de intervenções adicionais.",
          "Aconselhar os pais a incentivarem a criança a brincar mais com bonecas e carrinhos para desenvolver a imaginação, assumindo que as dificuldades de linguagem e socialização são temporárias e serão superadas com brincadeiras mais estruturadas.",
          "O foco deve ser na introdução de ferramentas educacionais digitais interativas para estimular o reconhecimento de cores e o vocabulário, pois a exposição tecnológica adequada pode acelerar o aprendizado cognitivo e linguístico nesse período."
        ],
        "correctAnswer": 0,
        "category": "Marcos de 4 Anos e Intervenção",
        "explanation": "Os marcos de 4 anos incluem dizer frases com quatro ou mais palavras, falar sobre o dia e pedir para brincar com outras crianças. A dificuldade em nomear cores, o vocabulário restrito, a incapacidade de recontar eventos e a preferência por atividades solitárias apontam para atrasos significativos nas áreas linguística e social/emocional. Uma avaliação multidisciplinar e intervenções terapêuticas são cruciais para abordar esses atrasos, ao invés de abordagens isoladas ou simplistas."
      },
      {
        "question": "Um pediatra recebe um bebê de 6 meses para consulta de acompanhamento. Os pais relatam que o bebê leva objetos à boca, alcança brinquedos desejados e fecha os lábios para indicar que não quer mais comida. No entanto, eles estão preocupados porque o bebê ainda não consegue virar de bruços para cima e não demonstra interesse em se olhar no espelho. Qual a melhor orientação do pediatra para os pais, considerando os marcos de desenvolvimento e a necessidade de estimular a criança?",
        "options": [
          "Aconselhar os pais a focar exclusivamente em brincadeiras que estimulem a alimentação, como oferecer diferentes texturas e sabores, pois o principal objetivo aos 6 meses é a introdução alimentar e a formação de hábitos saudáveis, e os outros marcos são secundários.",
          "Recomendar a introdução imediata de andadores para auxiliar o bebê a desenvolver a capacidade de virar e se movimentar, pois a mobilidade precoce é fundamental para o desenvolvimento global da criança e a interação com o ambiente, compensando as dificuldades motoras.",
          "Instruir os pais a forçar o bebê a virar de bruços repetidamente e a colocar o espelho em locais de difícil acesso, pois a superação de desafios é essencial para o desenvolvimento motor em alta velocidade, e a falta de interesse no espelho é um sinal de subestimulação visual.",
          "Elogiar o progresso nas áreas cognitiva e de alimentação, mas orientar os pais a incorporar brincadeiras que incentivem o bebê a rolar para alcançar brinquedos e a mostrar fotos coloridas no espelho, além de cantar e apontar para objetos, para estimular os marcos em atraso sem sobrecarregar o bebê.",
          "Tranquilizar os pais, afirmando que o desenvolvimento de virar e o interesse no espelho são marcos menos importantes e que a criança está progredindo adequadamente nas áreas cognitiva e de alimentação, que são prioritárias nesta fase."
        ],
        "correctAnswer": 3,
        "category": "Marcos de 6 Meses e Estimulação",
        "explanation": "A criança de 6 meses deve virar de bruços para cima e gostar de se olhar no espelho. Embora o bebê esteja alcançando marcos em outras áreas (cognitiva, alimentação), a ausência de virar e o desinteresse pelo espelho merecem atenção. A melhor orientação é a estimulação adequada e lúdica para esses marcos específicos (incentivar o rolamento, usar o espelho em brincadeiras), sem forçar ou desconsiderar as preocupações dos pais. Andadores não são recomendados."
      },
      {
        "question": "Aos 18 meses, uma criança apresenta dificuldades em seguir instruções simples sem gestos, não tenta dizer mais de três palavras além de 'mamãe' e 'papai', e não demonstra a capacidade de apontar para mostrar algo interessante. Os pais relatam que a criança se afasta deles, mas sempre se certifica de que estão por perto. Diante desses dados, qual a ação mais crucial a ser tomada pelo profissional de saúde?",
        "options": [
          "Realizar uma triagem geral de desenvolvimento e, especificamente, uma triagem de autismo, explicando aos pais a importância de identificar precocemente quaisquer sinais de alerta e a necessidade de intervenção especializada, se confirmada a suspeita.",
          "Considerar que a fase de 'birras' é comum aos 18 meses e focar apenas em estratégias de manejo de comportamento, assumindo que os atrasos de comunicação são uma consequência natural da fase de individuação e que se resolverão com o tempo.",
          "Sugerir a matrícula em uma creche de tempo integral para promover a socialização e a interação com outras crianças, pois a imitação dos pares será suficiente para que a criança alcance os marcos de linguagem e comunicação sem necessidade de terapias específicas.",
          "Instruir os pais a utilizar apenas a linguagem de sinais com a criança para reduzir a frustração na comunicação, postergando o estímulo à fala oral até que a criança demonstre maior maturidade neurológica para articular as palavras.",
          "Recomendar o aumento do tempo de exposição a desenhos animados educativos para estimular a linguagem, pois a imersão em conteúdo audiovisual didático pode acelerar o desenvolvimento do vocabulário e a compreensão de instruções."
        ],
        "correctAnswer": 0,
        "category": "Marcos de 18 Meses e Triagem",
        "explanation": "Aos 18 meses, a triagem geral de desenvolvimento e a triagem de autismo são recomendadas. Os marcos de comunicação (seguir instruções sem gestos, tentar dizer mais de três palavras, apontar para mostrar algo) e a capacidade de interagir socialmente são cruciais. A ausência desses marcos, mesmo com a busca por proximidade dos pais, é um sinal de alerta que exige investigação aprofundada, incluindo a triagem para autismo, para garantir intervenção precoce se necessário."
      },
      {
        "question": "Um professor de educação infantil observa que uma criança de 5 anos, apesar de interagir com os colegas, tem dificuldades em seguir regras simples de jogos coletivos, não consegue contar histórias que ouviu com pelo menos dois eventos e ainda não nomeia a maioria dos números entre 1 e 5. A criança também apresenta coordenação motora fina aquém do esperado para abotoar botões. Qual a melhor abordagem para auxiliar no desenvolvimento dessa criança, considerando um plano de estimulação multifacetado?",
        "options": [
          "Aconselhar os pais a limitarem o tempo de brincadeiras livres e focarem em exercícios estruturados e repetitivos de psicomotricidade para corrigir as dificuldades motoras, pois a correção do atraso motor é o ponto de partida para o desenvolvimento das demais habilidades.",
          "Priorizar exclusivamente atividades de alfabetização e numeramento, como repetição de letras e números em voz alta, pois a principal meta aos 5 anos é a preparação para a escola e o domínio dos conhecimentos básicos.",
          "Desenvolver um plano de estimulação que inclua jogos de regras com reforço positivo para o cumprimento das normas, atividades de contação de histórias com incentivo à sequência lógica, exercícios de contagem de objetos, e brincadeiras que fortaleçam a coordenação motora fina, como manipulação de botões e encaixes, com a participação ativa dos pais e da escola.",
          "Recomendar que a criança seja avaliada por um psicólogo infantil para identificar possíveis problemas emocionais que estejam inibindo o desenvolvimento social e cognitivo, pois as dificuldades de regras e contação de histórias são um reflexo de instabilidade emocional.",
          "Ignorar as dificuldades de coordenação motora e focar apenas em brincadeiras que incentivem a contação de histórias e a conversação, assumindo que as habilidades motoras se desenvolverão naturalmente à medida que as outras áreas amadurecerem."
        ],
        "correctAnswer": 2,
        "category": "Marcos de 5 Anos e Estimulação Multifacetada",
        "explanation": "Aos 5 anos, espera-se que a criança siga regras, conte histórias com ao menos dois eventos, nomeie números entre 1 e 5 e abotoe botões. As dificuldades apresentadas indicam a necessidade de um plano de estimulação abrangente e multifacetado, abordando as habilidades sociais (regras de jogos), linguísticas/cognitivas (contar histórias, numeramento) e motoras finas (abotoar). A colaboração entre pais e escola é fundamental para o sucesso dessa intervenção."
      },
      {
        "question": "Um educador físico está planejando atividades para uma turma de crianças de 7 anos. Ele observa que, embora a maioria das crianças corra e salte com bastante agilidade, algumas ainda demonstram dificuldades em manter o equilíbrio em um pé por mais de 5 segundos e ao rebater uma bola pequena com uma raquete. Com base nos conceitos de desenvolvimento motor para essa faixa etária, qual a melhor interpretação dessas observações e a conduta mais indicada?",
        "options": [
          "A dificuldade em rebater a bola indica um atraso grave no desenvolvimento motor fino, o que exige um encaminhamento imediato para terapia ocupacional, pois a coordenação fina é a principal habilidade a ser desenvolvida nessa idade.",
          "Os desafios no equilíbrio unipodal e na rebatida sugerem que essas crianças podem não ter atingido o estágio maduro em algumas habilidades de estabilidade e manipulação. É fundamental oferecer atividades específicas para refiná-las, pois a ausência desse desenvolvimento pode limitar a participação em esportes futuros.",
          "A melhor conduta é separar as crianças em grupos com base no nível de desenvolvimento de cada habilidade, oferecendo atividades muito mais avançadas para os que dominam e repetindo os mesmos exercícios básicos para os que apresentam dificuldades, priorizando a homogeneidade de desempenho.",
          "As crianças estão no estágio elementar de movimentos fundamentais, sendo natural que ainda não dominem o equilíbrio ou as habilidades manipulativas complexas. O educador deve focar em atividades lúdicas gerais, sem preocupação com refinamento técnico.",
          "O equilíbrio unipodal e a rebatida são habilidades especializadas que só devem ser cobradas a partir dos 9 anos. O foco para crianças de 7 anos deve ser apenas em habilidades discretas de locomoção e arremesso, sem complexidade."
        ],
        "correctAnswer": 1,
        "category": "Estágios e Tipos de Habilidades",
        "explanation": "Crianças de 6 a 8 anos devem estar no estágio maduro para a maioria das habilidades fundamentais. A dificuldade em equilíbrio unipodal (estabilidade) e rebatida (manipulação) indica que essas habilidades podem não ter alcançado o estágio maduro, o que é crucial para a transição para movimentos especializados e a participação em atividades esportivas. A intervenção focada nessas áreas é fundamental para superar a 'barreira de proficiência'."
      },
      {
        "question": "Considere o caso de uma criança de 6 anos que se destaca em atividades como ginástica artística e nado sincronizado, onde os movimentos são executados em ambientes controlados e previsíveis. No entanto, essa mesma criança demonstra dificuldade e hesitação ao jogar futebol ou basquete, onde o ambiente é dinâmico e imprevisível. Com base na classificação das habilidades motoras quanto à previsibilidade ambiental, qual a melhor análise para este cenário?",
        "options": [
          "A criança apresenta uma preferência inata por atividades individuais e estruturadas, o que é um traço de personalidade e não um indicativo de atraso no desenvolvimento motor. A melhor abordagem é respeitar essa preferência.",
          "As dificuldades são um reflexo da imaturidade das habilidades motoras finas, que são essenciais para a coordenação em esportes de equipe. O foco deve ser em atividades como escrever e desenhar para melhorar o controle manual.",
          "O problema reside na falta de instrução formal em esportes coletivos. Com aulas específicas de futebol ou basquete, a criança superará rapidamente as dificuldades, independentemente de sua capacidade de adaptação a ambientes imprevisíveis.",
          "A criança está desenvolvendo habilidades motoras grossas de forma inadequada, o que compromete seu desempenho em esportes coletivos. A intervenção deve focar em exercícios de força e resistência.",
          "As habilidades motoras abertas da criança estão subdesenvolvidas em comparação com suas habilidades fechadas. É necessário proporcionar mais oportunidades em ambientes variáveis para que ela aprenda a adaptar seus movimentos e tomar decisões rápidas."
        ],
        "correctAnswer": 4,
        "category": "Habilidades Abertas e Fechadas",
        "explanation": "Habilidades fechadas são executadas em ambientes previsíveis (ginástica, nado sincronizado), enquanto habilidades abertas exigem adaptação a ambientes variáveis (futebol, basquete). A criança demonstra bom domínio de habilidades fechadas, mas dificuldade em habilidades abertas, o que é comum nessa fase de transição. É crucial estimular a capacidade de adaptação em ambientes dinâmicos para o desenvolvimento completo e a participação em esportes coletivos."
      },
      {
        "question": "Um estudo com crianças de 6 a 8 anos revelou que 22% apresentaram desenvolvimento motor abaixo do esperado, e que meninos tiveram melhor desempenho em habilidades manipulativas, enquanto meninas se destacaram em habilidades locomotoras. Além disso, crianças de escolas com melhor infraestrutura apresentaram desempenho superior. Quais recomendações de estimulação seriam mais eficazes e abrangentes diante desses achados, considerando a importância da intervenção?",
        "options": [
          "Recomendar que as crianças com atraso no desenvolvimento motor participem apenas de esportes individuais de alta precisão, como tiro com arco, para evitar a frustração em atividades coletivas e focar em suas aptidões motoras específicas.",
          "Ignorar as diferenças de gênero, pois são meras variações individuais, e concentrar os esforços em aulas teóricas sobre esportes para as crianças com desenvolvimento abaixo do esperado, visando a compreensão dos movimentos antes da prática.",
          "Implementar um programa de treinamento físico intenso e padronizado para todas as crianças, sem considerar as variações de gênero ou nível socioeconômico, pois a repetição exaustiva é o único caminho para o desenvolvimento motor em massa.",
          "Focar exclusivamente em atividades que melhorem a força e a resistência muscular, pois a infraestrutura está diretamente ligada à capacidade física e aprimorando-a, todas as outras habilidades motoras serão naturalmente desenvolvidas.",
          "Oferecer atividades motoras diversificadas que contemplem todas as categorias de movimento, com atenção individualizada para crianças com atrasos, estímulo às habilidades manipulativas em meninas e locomotoras em meninos, e garantia de ambientes e materiais adequados, combatendo estereótipos de gênero."
        ],
        "correctAnswer": 4,
        "category": "Estudo de Caso e Recomendações",
        "explanation": "As recomendações baseadas no estudo destacam a necessidade de atividades diversificadas, atenção individualizada para atrasos, estímulo específico para habilidades manipulativas em meninas e locomotoras em meninos (combatendo estereótipos socioculturais, não biológicos), e a importância de um ambiente adequado. Essa abordagem é a mais abrangente e eficaz para promover o desenvolvimento motor integral das crianças."
      },
      {
        "question": "Uma professora do 2º ano do ensino fundamental (7 anos) percebe que um aluno demonstra dificuldade em coordenar o movimento de chutar uma bola com a aproximação e o balanço da perna oposta. Ele frequentemente chuta a bola de forma estática e sem muita força. Com base nos 'Movimentos de Manipulação' esperados para a idade de 6-8 anos, qual a melhor avaliação e intervenção para este caso?",
        "options": [
          "A criança provavelmente está no estágio elementar de movimento de chutar. A professora deve encorajar a prática de atividades que envolvam o chute, oferecendo feedback específico sobre a coordenação e a transferência de peso, e se necessário, buscar orientação de um profissional de educação física.",
          "A coordenação de braços e pernas no chute é uma habilidade que só se desenvolve plenamente na adolescência. A professora não deve se preocupar com isso e focar apenas nas habilidades de escrita e leitura, que são mais relevantes para essa idade escolar.",
          "É um sinal claro de que a criança precisa de óculos, pois a falta de precisão ao chutar a bola está diretamente relacionada à visão. A intervenção deve ser apenas o encaminhamento para um oftalmologista.",
          "Essa dificuldade é um indicativo de que a criança não possui habilidades motoras grossas adequadas para a prática de esportes. A professora deve sugerir que os pais matriculem o aluno em aulas de natação, pois a natação aprimora todas as habilidades motoras.",
          "A dificuldade é provavelmente resultado da falta de interesse da criança no futebol. A melhor abordagem é oferecer apenas brinquedos que estimulem a coordenação fina, como quebra-cabeças, pois o foco deve ser em atividades que a criança já demonstra aptidão."
        ],
        "correctAnswer": 0,
        "category": "Categorias de Movimento - Manipulação",
        "explanation": "Aos 6-8 anos, espera-se que a criança realize o chute com aproximação e balanço da perna oposta, indicando um padrão maduro. A dificuldade descrita sugere que a criança ainda está em um estágio anterior (provavelmente elementar) para essa habilidade. A intervenção mais adequada é a prática direcionada e o feedback, buscando refinar a coordenação e a técnica do chute, com o apoio de um profissional se necessário."
      },
      {
        "question": "A Teoria dos Sistemas Dinâmicos é uma das abordagens para compreender o desenvolvimento motor em crianças de 6 a 8 anos. Qual das seguintes situações melhor ilustra a aplicação dessa teoria no entendimento de como uma criança aprende a andar de bicicleta sem rodinhas?",
        "options": [
          "A criança consegue andar de bicicleta porque o ambiente oferece uma pista plana e segura, e o tamanho da bicicleta é perfeitamente adequado às suas pernas, fornecendo todas as 'affordances' necessárias para a ação.",
          "O aprendizado de andar de bicicleta é um processo de repetição mecânica de movimentos até que se tornem automáticos, sem a necessidade de ajuste ou adaptação a diferentes superfícies ou condições.",
          "A criança aprende a andar de bicicleta através da interação de múltiplos fatores: a força de suas pernas (subsistema biomecânico), o equilíbrio (subsistema sensorial), a coordenação neural (subsistema neuromuscular), o tamanho e o tipo da bicicleta (fator ambiental) e a motivação para pedalar (fator da tarefa).",
          "A criança aprende a andar de bicicleta somente após atingir uma idade específica, quando seu sistema nervoso central está totalmente maduro para controlar os movimentos complexos, independentemente de qualquer outra influência.",
          "A capacidade de andar de bicicleta é herdada geneticamente e se manifesta quando a criança atinge um certo nível de crescimento físico, sendo mais influenciada por fatores genéticos do que por experiências de prática ou ambiente."
        ],
        "correctAnswer": 2,
        "category": "Conceitos Fundamentais - Teorias do Desenvolvimento Motor",
        "explanation": "A Teoria dos Sistemas Dinâmicos enfatiza que o desenvolvimento motor é um resultado da interação complexa entre múltiplos subsistemas do indivíduo (neuromuscular, sensorial, biomecânico), fatores ambientais (condições da pista, tipo de bicicleta) e as características da tarefa em si (a motivação para pedalar). A aprendizagem de andar de bicicleta é um exemplo clássico dessa interação multifatorial, e não apenas de maturação ou influência ambiental isolada."
      },
      {
        "question": "A Paralisia Cerebral (PC) é uma desordem complexa que afeta o desenvolvimento motor. Qual das seguintes afirmações melhor descreve a principal característica da PC e suas consequências diretas no desenvolvimento da criança?",
        "options": [
          "É um grupo de desordens do desenvolvimento do movimento e da postura, resultantes de uma lesão não progressiva no encéfalo em desenvolvimento, que podem levar a limitações nas atividades de vida diária e serem acompanhadas de outros distúrbios.",
          "A PC é uma doença progressiva que causa degeneração muscular contínua, levando a uma perda gradual de todas as habilidades motoras ao longo da vida, independentemente da intervenção terapêutica.",
          "Define-se como uma doença infecciosa que afeta o sistema nervoso central, levando a deficiências motoras temporárias que podem ser completamente revertidas com fisioterapia intensiva durante a primeira infância.",
          "Caracteriza-se por lesões no encéfalo em desenvolvimento que são progressivas e irreversíveis, resultando em distúrbios exclusivamente motores e sem afetar outras esferas do desenvolvimento da criança.",
          "A PC é uma condição puramente genética que se manifesta apenas por espasticidade severa, sem qualquer impacto na função social ou cognitiva da criança, necessitando apenas de intervenções farmacológicas."
        ],
        "correctAnswer": 0,
        "category": "Introdução à Paralisia Cerebral",
        "explanation": "A Paralisia Cerebral é um grupo de desordens do desenvolvimento do movimento e da postura, resultantes de uma lesão não progressiva no encéfalo em desenvolvimento. As desordens motoras levam a limitações nas AVD e podem ser acompanhadas de outros distúrbios (sensoriais, cognitivos, de comunicação, etc.)."
      },
      {
        "question": "O GMFCS (Sistema de Classificação da Função Motora Ampla) é uma ferramenta importante na avaliação da Paralisia Cerebral. O que o GMFCS avalia?",
        "options": [
          "Apenas a presença de distúrbios sensoriais e perceptivos associados à PC.",
          "Exclusivamente o tônus muscular da criança, classificando-o em espástico, discinético ou atáxico.",
          "O nível de funcionalidade motora, variando de crianças com bom desempenho (nível I) a crianças com severas limitações (nível V).",
          "O impacto da epilepsia e dos problemas musculoesqueléticos secundários na qualidade de vida da criança.",
          "A distribuição topográfica da lesão cerebral, indicando se é hemiplegia, diplegia ou quadriplegia."
        ],
        "correctAnswer": 2,
        "category": "Classificação da Paralisia Cerebral",
        "explanation": "O GMFCS possui cinco níveis que classificam o nível de funcionalidade motora, de crianças com bom desempenho motor e poucas limitações (nível I) a crianças com múltiplas desordens e limitações severas no controle voluntário dos movimentos (nível V)."
      },
      {
        "question": "Um fisioterapeuta está desenvolvendo um programa de intervenção para uma criança com Paralisia Cerebral. Ele decide utilizar a abordagem da fisioterapia funcional. Qual a principal característica dessa abordagem e por que ela é considerada eficaz?",
        "options": [
          "A fisioterapia funcional ignora as características intrínsecas da criança e foca apenas na modificação do ambiente, garantindo que o ambiente seja o único fator determinante para o desempenho funcional da criança.",
          "Baseia-se unicamente na redução da espasticidade através de técnicas manuais intensivas, acreditando que a diminuição do tônus muscular resolverá automaticamente todas as dificuldades de aquisição de marcos motores e desempenho nas AVD.",
          "Essa abordagem prioriza o aprendizado de habilidades motoras significativas e relevantes para a vida diária da criança, nas quais ela se engaja ativamente, relacionando a limitação motora com a atividade funcional, o que a torna eficaz na promoção da independência.",
          "A fisioterapia funcional concentra-se exclusivamente em exercícios de alongamento passivo e fortalecimento muscular isolado, visando aumentar a amplitude de movimento e a força, o que por si só garante a independência funcional da criança.",
          "A eficácia da fisioterapia funcional advém da imposição de tarefas motoras complexas e descontextualizadas para a criança, visando desafiar suas capacidades e acelerar o desenvolvimento de todas as habilidades de uma só vez, independentemente do desejo da criança ou dos pais."
        ],
        "correctAnswer": 2,
        "category": "Fisioterapia Funcional",
        "explanation": "A fisioterapia funcional prioriza o aprendizado de habilidades motoras que são significativas no ambiente da criança e nas quais ela deseja se engajar. Ela relaciona a limitação motora com a atividade funcional, o que a torna essencial para a independência funcional, minimizando dificuldades e promovendo a prática de movimentos no repertório motor da criança."
      },
      {
        "question": "Qual a importância da orientação aos pais e cuidadores no programa de fisioterapia para crianças com Paralisia Cerebral?",
        "options": [
          "É importante apenas para informar sobre o diagnóstico da PC, sem necessidade de envolvimento prático nas atividades da criança.",
          "Serve unicamente para que os pais supervisionem as sessões de fisioterapia, garantindo que a criança realize todos os exercícios corretamente.",
          "É fundamental para integrar os pais nas atividades funcionais do dia a dia da criança, otimizando o programa de fisioterapia e reduzindo o estresse e a ansiedade dos cuidadores.",
          "A orientação é necessária apenas em casos de PC severa (GMFCS nível V) para auxiliar na mobilidade, sendo dispensável em casos leves (GMFCS nível I).",
          "Não há importância significativa, pois o desenvolvimento funcional da criança depende exclusivamente da intervenção do fisioterapeuta."
        ],
        "correctAnswer": 2,
        "category": "Orientação aos Pais e Cuidadores",
        "explanation": "Estudos demonstram a importância de orientar pais e cuidadores de crianças com PC, incentivando-os a estimular as crianças em diferentes habilidades e a promover sua independência funcional. A participação dos pais otimiza o programa de fisioterapia e traz benefícios aos pais, integrando-os nas atividades funcionais do dia a dia da criança e reduzindo o estresse e a ansiedade."
      },
      {
        "question": "O PEDI (Pediatric Evaluation of Disability Inventory) é um instrumento de avaliação funcional utilizado em crianças com Paralisia Cerebral. Quais são as três áreas do desempenho funcional avaliadas pelo PEDI?",
        "options": [
          "Autocuidado, mobilidade e função social.",
          "Equilíbrio, coordenação e agilidade.",
          "Força muscular, amplitude de movimento e tônus muscular.",
          "Linguagem, comunicação e comportamento.",
          "Visão, audição e cognição."
        ],
        "correctAnswer": 0,
        "category": "Procedimentos de Avaliação e Intervenção",
        "explanation": "O PEDI é dividido em três partes (Habilidades funcionais, Assistência do Cuidador e Modificação do ambiente) que informam sobre as três áreas do desempenho funcional: Autocuidado, Mobilidade e Função Social."
      },
      {
        "question": "A Paralisia Cerebral (PC) é uma condição complexa com diversas características. Qual das seguintes afirmações melhor define a PC, destacando sua natureza e o período de ocorrência da lesão?",
        "options": [
          "A PC é uma condição exclusivamente genética, manifestando-se apenas por atrasos motores severos que não são influenciados por fatores ambientais ou terapêuticos.",
          "Caracteriza-se por uma desordem persistente do movimento e da postura, resultante de uma lesão não progressiva no encéfalo em desenvolvimento, que pode ocorrer nos períodos pré, peri ou pós-natais.",
          "É uma desordem progressiva que degenera o sistema nervoso central ao longo do tempo, causando deterioração contínua das habilidades motoras e cognitivas em todas as idades.",
          "Define-se como um transtorno psicomotor que surge na adolescência devido a experiências traumáticas, resultando em distúrbios de movimento e postura sem base neurológica identificável.",
          "É uma doença contagiosa que afeta apenas o córtex motor do cérebro, levando a alterações de tônus muscular que são sempre reversíveis com tratamento medicamentoso intensivo."
        ],
        "correctAnswer": 1,
        "category": "Introdução à Paralisia Cerebral",
        "explanation": "A Paralisia Cerebral é definida como uma desordem persistente, porém variável, do movimento e da postura, que surge nos primeiros anos de vida devido a uma interferência no desenvolvimento do Sistema Nervoso Central (SNC), causada por uma desordem cerebral não progressiva. Pode ocorrer nos períodos pré, peri ou pós-natais."
      },
      {
        "question": "Um recém-nascido apresentou complicações severas durante o parto, incluindo anóxia prolongada. Após alguns meses, a equipe médica diagnosticou Paralisia Cerebral. Com base na etiologia da PC, a anóxia durante o parto é classificada como qual tipo de fator?",
        "options": [
          "Fator Idiopático, já que a causa da anóxia é desconhecida e não pode ser atribuída a nenhum período específico.",
          "Fator Perinatal, pois a anóxia ocorrida durante o parto se encaixa na categoria de eventos que acontecem nesse período.",
          "Fator Pós-natal, pois a anóxia só se manifesta após o nascimento e seus efeitos são tardios.",
          "Fator Pré-natal, uma vez que a anóxia é uma condição que se estabelece durante a gestação e afeta o desenvolvimento fetal.",
          "Fator Genético, pois a predisposição à anóxia em recém-nascidos é sempre de origem hereditária."
        ],
        "correctAnswer": 1,
        "category": "Etiologia da Paralisia Cerebral",
        "explanation": "Os fatores perinatais são aqueles que ocorrem durante o parto. A anóxia (falta de oxigênio) durante o parto é um exemplo de fator perinatal que pode levar à Paralisia Cerebral."
      },
      {
        "question": "Uma criança com Paralisia Cerebral apresenta movimentos involuntários, como distonias axiais e movimentos coreoatetóides das extremidades. Qual tipo de disfunção motora da PC melhor descreve esse quadro clínico?",
        "options": [
          "Espástica",
          "Mista",
          "Atáxica",
          "Extrapiramidal ou Discinética",
          "Hemiplegia"
        ],
        "correctAnswer": 3,
        "category": "Tipos de Paralisia Cerebral - Disfunção Motora",
        "explanation": "A descrição de movimentos involuntários, como distonias axiais e movimentos coreoatetóides das extremidades, é característica da Paralisia Cerebral do tipo Extrapiramidal ou Discinética."
      },
      {
        "question": "O diagnóstico da Paralisia Cerebral envolve a identificação de diversos sinais. Qual das seguintes opções NÃO é um aspecto comumente considerado para o diagnóstico de PC?",
        "options": [
          "Persistência de reflexos primitivos.",
          "Retardo ou atraso no desenvolvimento motor.",
          "Histórico de infecções virais frequentes na primeira infância.",
          "Presença de reflexos anormais.",
          "Ausência do desenvolvimento dos reflexos protetores, como a resposta de paraquedas."
        ],
        "correctAnswer": 2,
        "category": "Diagnóstico da Paralisia Cerebral",
        "explanation": "Embora infecções possam ter impacto na saúde infantil, um histórico de infecções virais frequentes na primeira infância não é um aspecto comumente listado como critério direto para o diagnóstico de Paralisia Cerebral, que se baseia primariamente em sinais neurológicos e motores."
      },
      {
        "question": "A toxina botulínica é um tratamento utilizado em casos específicos de Paralisia Cerebral. Em qual situação sua aplicação é mais indicada e qual é o seu principal efeito?",
        "options": [
          "É empregada para melhorar a cognição e a linguagem em crianças com PC, agindo diretamente nos centros de fala do cérebro, sem impacto no tônus muscular.",
          "Sua aplicação é exclusiva para o tratamento de deformidades ortopédicas severas, substituindo a necessidade de cirurgias corretivas complexas e permanentes.",
          "É indicada para reverter a lesão cerebral e restaurar completamente a função motora em casos de PC grave, pois atua na regeneração neuronal.",
          "É utilizada para tratar a epilepsia associada à PC, atuando como um anticonvulsivante de ação prolongada no sistema nervoso central.",
          "É indicada quando outros métodos falham para reduzir a espasticidade, atuando na junção neuromuscular e provocando paresia muscular, com efeito que dura aproximadamente 3 meses."
        ],
        "correctAnswer": 4,
        "category": "Tratamento da Paralisia Cerebral - Toxina Botulínica",
        "explanation": "A toxina botulínica é indicada para reduzir a espasticidade quando outros métodos falham. Ela atua na junção neuromuscular, provocando paresia muscular, e seu efeito dura aproximadamente 3 meses. Não reverte a lesão cerebral, não trata epilepsia nem é um substituto geral para cirurgias, nem foca em cognição/linguagem."
      },
      {
        "question": "A Paralisia Braquial Obstétrica (PBO) é uma lesão que afeta o membro superior do recém-nascido. Qual a sua causa principal e as raízes nervosas mais comumente envolvidas?",
        "options": [
          "É uma doença genética que afeta o desenvolvimento muscular, e as raízes mais afetadas são as torácicas T10-T12.",
          "Resulta de uma infecção bacteriana no plexo braquial durante a gestação, comprometendo principalmente as raízes cervicais C1-C4.",
          "É causada por deficiências nutricionais maternas no último trimestre da gravidez, impactando as raízes sacrais S1-S5.",
          "É uma condição autoimune que se manifesta após o primeiro ano de vida, afetando aleatoriamente qualquer raiz nervosa do plexo braquial.",
          "Ocorre devido a uma lesão, geralmente distensão ou ruptura, no plexo braquial durante as manobras do parto vaginal, com maior frequência nas raízes cervicais C5 a C8 e torácica T1."
        ],
        "correctAnswer": 4,
        "category": "Definição e Conceitos Básicos",
        "explanation": "A PBO é uma paralisia flácida do membro superior do recém-nascido devido a uma lesão no plexo braquial, geralmente uma distensão ou ruptura, que ocorre durante as manobras do parto vaginal, especialmente em casos de distocia de ombro. As raízes nervosas mais comumente afetadas são as cervicais C5 a C8 e a torácica T1."
      },
      {
        "question": "A Paralisia de Erb-Duchenne é o tipo mais comum de PBO. Qual é a postura típica do membro afetado neste tipo de lesão e qual o seu prognóstico geral?",
        "options": [
          "Acometimento exclusivo dos membros inferiores, com marcha em tesoura, e o prognóstico depende da gravidade da lesão medular.",
          "Lesão completa de todo o plexo braquial, com Síndrome de Horner, e o prognóstico é sempre de dano permanente.",
          "Postura de 'mão de mendigo', com flexão do cotovelo e extensão do punho, e o prognóstico é sempre desfavorável.",
          "Movimentos involuntários e discinéticos dos quatro membros, com prognóstico imprevisível.",
          "Braço aduzido e rodado internamente, cotovelo estendido e pulso flexionado ('gorjeta do garçom'), geralmente com o melhor prognóstico."
        ],
        "correctAnswer": 4,
        "category": "Classificação e Tipos de Lesão",
        "explanation": "A Paralisia de Erb-Duchenne (lesão de C5-C6) se caracteriza pela postura de 'gorjeta do garçom': braço aduzido e rodado internamente, cotovelo estendido e pulso flexionado. É o tipo mais comum e geralmente apresenta o melhor prognóstico."
      },
      {
        "question": "Um bebê nasce com 4,8 kg, e a mãe é diabética. Durante o parto, houve uma distocia de ombro significativa. Com base nos fatores de risco para PBO, qual a principal preocupação neste caso?",
        "options": [
          "A idade materna, que é o fator mais relevante para distocia de ombro e, consequentemente, PBO.",
          "O trabalho de parto prolongado, sendo este o único fator que realmente contribui para a lesão do plexo braquial.",
          "O peso ao nascer superior a 4,5 kg e o diabetes mellitus materno, que são fatores de risco importantes associados à distocia de ombro e PBO.",
          "A apresentação pélvica, que aumenta exponencialmente o risco de PBO, independentemente de outros fatores.",
          "A primogenidade da mãe, pois mães de primeira viagem têm maior probabilidade de ter filhos com PBO."
        ],
        "correctAnswer": 2,
        "category": "Fatores de Risco e Incidência",
        "explanation": "O peso ao nascer superior a 4,5 kg é o fator de risco mais importante para PBO, fortemente relacionado à distocia de ombro. O diabetes mellitus materno também é um fator de risco adicional. A combinação desses fatores aumenta significativamente a preocupação com a PBO."
      },
      {
        "question": "A fisioterapia é crucial no tratamento da Paralisia Braquial Obstétrica (PBO). Qual o principal objetivo do tratamento fisioterapêutico para crianças com PBO e qual a importância da intervenção precoce?",
        "options": [
          "Promover a funcionalidade do membro afetado, prevenindo contraturas musculares, estimulando a sensibilidade e motricidade, mantendo amplitude de movimento, e a intervenção precoce é essencial para otimizar essa recuperação.",
          "Reduzir o peso do recém-nascido para evitar futuras complicações ortopédicas, uma vez que a fisioterapia atua no metabolismo lipídico.",
          "Atingir a recuperação completa da lesão nervosa, pois a fisioterapia tem a capacidade de regenerar os nervos danificados, independentemente da gravidade da lesão.",
          "Substituir completamente a necessidade de cirurgias em todos os casos de PBO, independentemente da gravidade da lesão neurológica.",
          "Focar apenas na estimulação cognitiva e no desenvolvimento da linguagem, pois essas são as áreas mais afetadas em crianças com PBO e a recuperação motora é secundária."
        ],
        "correctAnswer": 0,
        "category": "Abordagens de Tratamento",
        "explanation": "O principal objetivo da fisioterapia na PBO é promover a funcionalidade do membro afetado, prevenindo contraturas, estimulando sensibilidade e motricidade, e mantendo a amplitude de movimento. A intervenção precoce é essencial para otimizar a recuperação do movimento e da sensibilidade, prevenindo complicações neurofuncionais."
      },
      {
        "question": "Um fisioterapeuta utiliza a Terapia de Movimento Induzido por Restrição (TMIR) em uma criança com PBO. Qual é o princípio fundamental dessa técnica e por que ela é considerada eficaz?",
        "options": [
          "A TMIR é uma forma de terapia medicamentosa que utiliza injeções de toxina botulínica no membro saudável para reduzir sua função e, indiretamente, aumentar o uso do membro afetado.",
          "Consiste na contenção do membro superior afetado para forçar o uso do membro saudável, promovendo assim uma recuperação mais rápida do lado lesionado através da imobilização.",
          "Baseia-se na contenção do membro superior saudável para estimular o uso do membro afetado em atividades da vida diária, encorajando o cérebro a 'reaprender' a utilizar o membro comprometido e promover ganhos funcionais.",
          "Envolve a aplicação de choques elétricos de baixa intensidade no membro afetado para estimular a contração muscular e a reativação nervosa, sendo eficaz pela estimulação direta dos neurônios.",
          "É uma técnica puramente passiva, onde o terapeuta manipula o membro afetado sem qualquer participação ativa da criança, visando apenas a manutenção da amplitude de movimento articular e a prevenção de atrofias."
        ],
        "correctAnswer": 2,
        "category": "Abordagens de Tratamento - Terapia de Movimento Induzido por Restrição",
        "explanation": "A Terapia de Movimento Induzido por Restrição (TMIR) consiste na contenção do membro superior saudável para estimular o uso do membro afetado em atividades da vida diária. Essa técnica é considerada eficaz porque encoraja o cérebro a reorganizar-se e 'reaprender' a utilizar o membro comprometido, promovendo ganhos funcionais."
      },
      {
        "question": "O Transtorno do Espectro Autista (TEA) é um distúrbio do neurodesenvolvimento com manifestações complexas. Qual a principal característica do TEA e a importância do diagnóstico precoce, conforme o texto?",
        "options": [
          "É uma condição psicológica que surge na adolescência devido a traumas, e o diagnóstico precoce serve apenas para indicar a necessidade de psicoterapia individual e isolamento social para evitar sobrecarga sensorial.",
          "Trata-se de uma doença infecciosa que afeta o sistema nervoso central em idade adulta, e o diagnóstico precoce é crucial para a administração de antibióticos que erradiquem a causa da doença e previnam sequelas neurológicas.",
          "Caracteriza-se por um distúrbio do neurodesenvolvimento que impacta comunicação, cognição, interação social, comportamento e habilidades motoras/sensoriais. O diagnóstico precoce é fundamental para minimizar sintomas e proporcionar maior bem-estar, aproveitando a neuroplasticidade cerebral.",
          "É um distúrbio motor progressivo que afeta a força muscular, sendo o diagnóstico precoce importante para iniciar tratamentos que revertam a degeneração muscular e restaurem a função motora completa da criança.",
          "É um transtorno de aprendizagem que se manifesta apenas na escola, e o diagnóstico precoce visa exclusivamente a adaptação curricular, sem a necessidade de intervenções motoras ou sensoriais, que não são relevantes para essa condição."
        ],
        "correctAnswer": 2,
        "category": "Conceitos Básicos e Diagnóstico",
        "explanation": "O TEA é um distúrbio do neurodesenvolvimento que se manifesta nos primeiros meses de vida, impactando áreas como comunicação, cognição, interação social, comportamento e habilidades motoras e sensoriais. O diagnóstico precoce é fundamental, pois permite a intervenção temprana para minimizar os sintomas, aproveitar a neuroplasticidade cerebral e proporcionar maior bem-estar e qualidade de vida."
      },
      {
        "question": "Um dos sinais de alerta para TEA, frequentemente observado antes dos dois anos de idade, está relacionado à comunicação. Qual é um dos principais sinais de alerta nesse contexto?",
        "options": [
          "Hipersensibilidade a sons altos.",
          "Desenvolvimento motor acelerado.",
          "Preferência por interações sociais complexas com estranhos.",
          "Ausência de primeiras palavras e frases.",
          "Uso excessivo de frases complexas e elaboradas."
        ],
        "correctAnswer": 3,
        "category": "Características e Manifestações Clínicas",
        "explanation": "Déficits na comunicação são frequentemente observados antes dos dois anos de idade, sendo a ausência de primeiras palavras e frases um dos principais sinais de alerta."
      },
      {
        "question": "A fisioterapia no TEA visa aprimorar diversas habilidades. Quais são os principais objetivos da fisioterapia no tratamento de crianças com TEA?",
        "options": [
          "Realizar apenas massagens relaxantes para diminuir a hipersensibilidade tátil, sem qualquer foco no desenvolvimento de habilidades motoras ou sociais mais complexas.",
          "Focar exclusivamente na correção de problemas gastrointestinais e no fortalecimento do sistema imunológico, pois essas são as principais comorbidades do TEA que a fisioterapia pode tratar.",
          "Concentrar-se unicamente na medicação para reduzir a hiperatividade e a ansiedade, sem a necessidade de intervenções motoras, que não impactam diretamente os sintomas do TEA.",
          "Desenvolver coordenação motora grossa e fina, melhorar equilíbrio e controle postural, estimular a integração sensorial, inibir movimentos estereotipados e promover maior independência nas atividades diárias e interação social.",
          "Priorizar a alfabetização e o desenvolvimento do raciocínio lógico-matemático, visto que a fisioterapia tem como objetivo principal o desempenho acadêmico em crianças com TEA."
        ],
        "correctAnswer": 3,
        "category": "Papel da Fisioterapia",
        "explanation": "Os objetivos da fisioterapia no TEA incluem desenvolver coordenação motora grossa e fina, melhorar equilíbrio e controle postural, estimular a integração sensorial, inibir movimentos estereotipados e inadequados, promover maior independência nas atividades diárias, facilitar interação social e comunicação, e melhorar a qualidade de vida geral da criança."
      },
      {
        "question": "A hidroterapia é uma das intervenções complementares utilizadas na fisioterapia para crianças com TEA. Quais são os principais benefícios que o ambiente aquático oferece a essas crianças?",
        "options": [
          "Aumento do estresse e agitação devido à temperatura da água, o que dificulta o relaxamento e a coordenação motora em crianças com hipersensibilidade.",
          "Apenas a melhora da capacidade de flutuação, sem qualquer benefício terapêutico significativo para o desenvolvimento motor ou sensorial em crianças com TEA.",
          "Exclusivamente o fortalecimento muscular intenso, devido à resistência da água, sem qualquer impacto na estimulação sensorial ou no relaxamento da criança.",
          "O desenvolvimento exclusivo da natação competitiva, sendo contraindicada para crianças com TEA que apresentam dificuldades de interação social ou hipersensibilidade.",
          "Estimulação sensorial, diminuição do estresse, liberação de energia e relaxamento, além de melhorar a coordenação motora, tônus muscular, controle de tronco, equilíbrio e habilidades motoras, facilitando também a realização de movimentos no ambiente terrestre."
        ],
        "correctAnswer": 4,
        "category": "Abordagens Terapêuticas",
        "explanation": "A hidroterapia auxilia na estimulação sensorial, diminuição do estresse, liberação de energia e relaxamento. Além disso, melhora a coordenação motora, tônus muscular, controle de tronco, equilíbrio e habilidades motoras. As propriedades físicas e térmicas da água favorecem a realização de atividades e movimentos, propiciando a facilitação na realização no ambiente terrestre."
      },
      {
        "question": "A abordagem multidisciplinar é fundamental no tratamento do TEA. Quais profissionais, além do fisioterapeuta, geralmente compõem essa equipe?",
        "options": [
          "Apenas arquitetos e engenheiros, focados em adaptar o ambiente físico, sem envolvimento direto com as terapias da criança.",
          "Somente psicólogos e psiquiatras, pois o TEA é um transtorno puramente mental.",
          "Psicólogos, fonoaudiólogos, terapeutas ocupacionais, neurologistas, psiquiatras, pedagogos e educadores físicos, entre outros, trabalhando em conjunto para uma abordagem integral.",
          "Apenas nutricionistas e oftalmologistas, focando em dieta e saúde ocular, sem relação com o desenvolvimento motor ou social.",
          "Exclusivamente dentistas e dermatologistas, para tratar condições de saúde oral e cutânea que afetam a qualidade de vida."
        ],
        "correctAnswer": 2,
        "category": "Integração Multidisciplinar",
        "explanation": "O trabalho multidisciplinar é fundamental no tratamento do TEA e pode envolver psicólogos, fonoaudiólogos, terapeutas ocupacionais, fisioterapeutas, neurologistas, psiquiatras, pedagogos e educadores físicos, entre outros, para uma abordagem completa e integrada de todas as dimensões da pessoa."
      },
      {
        "question": "Os Cuidados Paliativos Pediátricos são essenciais para crianças com câncer em fase avançada. De acordo com a Organização Mundial da Saúde (OMS), qual é a definição e o principal foco dos cuidados paliativos?",
        "options": [
          "Cuidado ativo e integral de pacientes cuja doença não responde mais ao tratamento curativo, com foco principal no controle da dor e dos sintomas físicos, psicológicos, sociais e espirituais, visando melhorar a qualidade de vida dos pacientes e seus familiares.",
          "Conjunto de procedimentos médicos que visam apenas a abreviação da vida de pacientes terminais, sem levar em consideração o controle da dor ou o bem-estar psicológico.",
          "Tratamento intensivo e agressivo focado exclusivamente na cura da doença, independentemente do estágio da progressão do câncer, visando prolongar a vida a todo custo.",
          "Apenas o suporte psicológico para os familiares após o falecimento da criança, sem qualquer intervenção direta no controle dos sintomas físicos do paciente durante a vida.",
          "Intervenções cirúrgicas avançadas para corrigir deformidades causadas pelo câncer, sem preocupação com o alívio de sintomas ou a qualidade de vida no fim da vida."
        ],
        "correctAnswer": 0,
        "category": "Introdução aos Cuidados Paliativos Pediátricos",
        "explanation": "A OMS define cuidados paliativos como o cuidado ativo e integral de pacientes cuja doença não responde mais ao tratamento curativo. O foco principal é o controle da dor e dos sintomas físicos, psicológicos, sociais e espirituais, visando melhorar a qualidade de vida dos pacientes terminais e de seus familiares."
      },
      {
        "question": "No contexto da bioética e dos cuidados paliativos, qual é o conceito que busca proporcionar ao paciente as condições para uma morte digna, sem abreviação ou prolongamento artificial da vida?",
        "options": [
          "Distanásia",
          "Eutanásia",
          "Ortotanásia",
          "Ortofunção",
          "Biointervenção"
        ],
        "correctAnswer": 2,
        "category": "Bioética e Ortotanásia",
        "explanation": "A ortotanásia busca proporcionar ao paciente as condições necessárias para compreender sua mortalidade e prepará-lo para uma morte digna, sem intervenção no processo natural, ou seja, sem abreviação ou prolongamento artificial da vida."
      },
      {
        "question": "Um fisioterapeuta está avaliando uma criança com câncer em estágio avançado que está recebendo cuidados paliativos. Qual das seguintes avaliações deve ser priorizada, considerando as condições do paciente e os objetivos da fisioterapia nesse contexto?",
        "options": [
          "Apenas a observação clínica superficial do paciente, sem qualquer registro ou mensuração de dados, pois a intervenção em cuidados paliativos é puramente intuitiva e não necessita de parâmetros objetivos.",
          "Avaliação detalhada da performance esportiva e da capacidade de correr longas distâncias para planejar o retorno às atividades competitivas, ignorando o estado atual de fragilidade do paciente.",
          "Priorizar a avaliação da dor, estado respiratório, resistência cardiovascular e funcionalidade (transferência, marcha, mobilidade), com cuidado na avaliação de força muscular em pacientes plaquetopênicos, adaptando a avaliação à tolerância do paciente e focando no conforto e independência.",
          "Avaliar unicamente as habilidades cognitivas, como memória e raciocínio lógico, pois a fisioterapia em cuidados paliativos deve focar no bem-estar mental e não no físico.",
          "Avaliação de força muscular máxima e amplitude de movimento em todas as articulações, mesmo que isso cause dor e fadiga excessiva ao paciente, pois a recuperação total da função é o objetivo principal."
        ],
        "correctAnswer": 2,
        "category": "Atuação Fisioterapêutica Detalhada",
        "explanation": "A avaliação fisioterapêutica em cuidados paliativos deve ser completa, mas adaptada à tolerância do paciente. É crucial priorizar elementos como dor, estado respiratório, resistência cardiovascular e avaliação funcional (transferência, marcha, mobilidade). A avaliação de força muscular deve ser feita com cuidado em pacientes plaquetopênicos. O objetivo é aumentar ou manter o conforto e a independência, e não focar em recuperação total ou atividades que causem exaustão desnecessária."
      },
      {
        "question": "A fadiga é um sintoma comum em pacientes oncológicos terminais, comprometendo significativamente sua qualidade de vida. Qual é o principal objetivo do controle da fadiga na fisioterapia paliativa?",
        "options": [
          "Aumentar a dor do paciente para que ele possa identificar os limites de seu corpo.",
          "Minimizar as perdas funcionais e manter a capacidade funcional do paciente, proporcionando conforto e bem-estar.",
          "Reverter completamente a doença e restaurar a energia do paciente para atividades de alta intensidade.",
          "Estimular a fadiga para fortalecer a musculatura residual e prevenir atrofia.",
          "Isolar o paciente para evitar que a fadiga afete seu relacionamento com os familiares."
        ],
        "correctAnswer": 1,
        "category": "Condutas Fisioterapêuticas Específicas",
        "explanation": "O controle da fadiga em pacientes oncológicos terminais visa manter a capacidade funcional do paciente e minimizar as perdas, contribuindo para o conforto e a qualidade de vida. Não se trata de reverter a doença, aumentar a dor ou isolar o paciente, mas sim de gerenciar o sintoma para otimizar o bem-estar."
      },
      {
        "question": "Em pacientes pediátricos com câncer em cuidados paliativos, qual o papel das atividades lúdicas e da música na atuação fisioterapêutica?",
        "options": [
          "São recursos desnecessários que desviam o foco do tratamento principal, que deve ser estritamente técnico e objetivo, sem elementos recreativos.",
          "Devem ser utilizadas apenas para entreter a criança durante procedimentos dolorosos, sem qualquer propósito terapêutico no desenvolvimento motor ou emocional.",
          "São importantes para proporcionar um ambiente menos traumatizante e mais humanizado, aumentando a adesão ao tratamento e promovendo conforto e qualidade de vida através de brincadeiras, jogos e música.",
          "Apenas para crianças com prognóstico muito favorável, como forma de recompensa, sendo contraindicadas para pacientes em estágio terminal, que precisam de repouso absoluto.",
          "Têm como objetivo principal reverter os efeitos da quimioterapia no sistema nervoso central, atuando como um tipo de terapia cognitiva para melhorar a memória."
        ],
        "correctAnswer": 2,
        "category": "Condutas Fisioterapêuticas Específicas - Atividades Lúdicas",
        "explanation": "As atividades lúdicas são importantes no tratamento de crianças com câncer, proporcionando um ambiente menos traumatizante e mais humanizado. Materiais, equipamentos e recursos como brincadeiras, jogos, livros e brinquedos, além da música, podem ser utilizados para promover conforto e qualidade de vida, e aumentar a adesão ao tratamento."
      },
      {
        "question": "Um paciente pediátrico é admitido no hospital com uma queimadura que apresenta bolhas e atinge a epiderme e parte da derme. Como essa queimadura seria classificada quanto à profundidade, e qual a principal característica clínica que a diferencia de outros graus?",
        "options": [
          "Primeiro grau; a principal característica é a presença de necrose tecidual e dor intensa.",
          "Terceiro grau; a principal característica é a área esbranquiçada ou negra e a ausência total de dor.",
          "Quarto grau; a principal característica é o envolvimento de ossos e músculos profundos, sem bolhas.",
          "Segundo grau; a principal característica é a formação de flictenas (bolhas).",
          "Primeiro grau profundo; a principal característica é a presença de eritema e dor leve, sem bolhas."
        ],
        "correctAnswer": 3,
        "category": "Classificação por Profundidade",
        "explanation": "Queimaduras de segundo grau atingem a epiderme e parte da derme, provocando a formação de flictenas (bolhas). As queimaduras de primeiro grau apresentam apenas vermelhidão e dor, enquanto as de terceiro grau envolvem todas as estruturas da pele, são esbranquiçadas/negras e pouco dolorosas."
      },
      {
        "question": "A quantificação da superfície corporal queimada em crianças é crucial para determinar a gravidade. Qual método é considerado mais preciso para avaliar a área queimada em pacientes pediátricos, e por quê?",
        "options": [
          "Regra da palma da mão do paciente; por ser a maneira mais prática e acessível para qualquer faixa etária, independentemente da idade.",
          "Apenas a estimativa visual do profissional, pois a precisão não é tão relevante na avaliação inicial.",
          "Regra dos nove; pois é um método rápido e universalmente aceito para todas as idades.",
          "Esquema de Lund Browder; por avaliar a superfície corporal de acordo com a idade, sendo mais preciso devido às proporções corporais variáveis na infância.",
          "Utilização de balanças eletrônicas, que medem a massa queimada e fornecem dados precisos sobre a área."
        ],
        "correctAnswer": 3,
        "category": "Métodos de Quantificação",
        "explanation": "O Esquema de Lund Browder avalia a superfície corporal queimada de acordo com a idade do paciente, o que o torna mais preciso em crianças, pois suas proporções corporais (especialmente a cabeça e os membros inferiores) diferem significativamente das dos adultos, ao contrário da Regra dos Nove adaptada ou da palma da mão."
      },
      {
        "question": "As queimaduras em crianças representam um grave problema de saúde pública. Qual a faixa etária com maior incidência de queimaduras e qual o tipo mais comum de queimadura nessa população?",
        "options": [
          "Crianças de 1 a 5 anos, principalmente por escaldamento com líquidos quentes.",
          "Recém-nascidos (até 28 dias), principalmente por queimaduras químicas.",
          "Adolescentes de 10 a 18 anos, principalmente por acidentes com fogo.",
          "Bebês de 0 a 6 meses, causadas principalmente por contato com superfícies quentes.",
          "Crianças em idade escolar (6 a 9 anos), devido a acidentes com eletricidade."
        ],
        "correctAnswer": 0,
        "category": "A Magnitude do Problema",
        "explanation": "A epidemiologia das queimaduras em crianças mostra um pico de incidência em crianças de 1 a 5 anos, sendo as queimaduras por escaldamento com líquidos quentes o tipo mais comum nessa faixa etária."
      },
      {
        "question": "A fisioterapia desempenha um papel crucial na reabilitação de pacientes pediátricos vítimas de queimaduras. Qual é o principal objetivo da atuação fisioterapêutica, desde a internação até o acompanhamento ambulatorial?",
        "options": [
          "Promover a cura da lesão tecidual primária da queimadura através de técnicas manuais intensivas, substituindo a necessidade de cirurgias ou enxertias.",
          "Diminuir as sequelas, melhorar a qualidade de vida e promover a integração social do indivíduo, visando uma cicatrização correta e evitando complicações futuras que comprometam a estrutura e função do corpo.",
          "Apenas a mobilização passiva diária para prevenir rigidez articular, sem qualquer outra intervenção funcional ou de prevenção de sequelas.",
          "O uso exclusivo de realidade virtual para o alívio da dor durante os curativos, sem a necessidade de exercícios terapêuticos ou outras abordagens de reabilitação física.",
          "Exclusivamente o manejo da dor aguda nas primeiras 24 horas pós-queimadura, sem preocupação com a reabilitação a longo prazo ou a reinserção social do paciente."
        ],
        "correctAnswer": 1,
        "category": "Atuação da Fisioterapia",
        "explanation": "A intervenção fisioterapêutica é de extrema importância para diminuir as sequelas, melhorar a qualidade de vida e promover a integração do indivíduo na sociedade. Ela atua desde a internação até o acompanhamento ambulatorial, visando uma cicatrização correta e evitando complicações futuras que possam comprometer a estrutura e função do corpo, limitando as atividades de vida diária."
      },
      {
        "question": "As queimaduras podem levar a complicações sistêmicas importantes. Nos primeiros sete dias após a queimadura, o organismo pode sofrer alterações funcionais em múltiplos órgãos vitais. Como é conhecida essa complicação inicial e o que pode ocorrer após esse período?",
        "options": [
          "Choque hipovolêmico; após esse período, o paciente desenvolve anemia severa.",
          "Disfunção de Múltiplos Órgãos e Sistemas (DMOS) primária; após esse período, pode ocorrer uma resposta inflamatória sistêmica que leva a infecções (DMOS secundária).",
          "Sepsia generalizada; após esse período, ocorre a falência renal aguda.",
          "Hipermetabolismo agudo; após esse período, ocorre um processo de regeneração celular completa em todos os órgãos.",
          "Síndrome da Resposta Inflamatória Sistêmica (SIRS); e após, pode ocorrer a formação de cicatrizes queloides."
        ],
        "correctAnswer": 1,
        "category": "Fisiopatologia e Complicações",
        "explanation": "Nos primeiros sete dias após a queimadura, o organismo pode sofrer a Disfunção de Múltiplos Órgãos e Sistemas (DMOS) primária. Após esse período, ocorre uma resposta inflamatória sistêmica, que pode levar a infecções, conhecida como DMOS secundária."
      },
      {
        "question": "A Distrofia Muscular de Duchenne (DMD) é uma doença genética grave. Qual das seguintes afirmações melhor descreve a DMD, incluindo um de seus sinais clínicos mais característicos e o impacto no desenvolvimento muscular?",
        "options": [
          "Trata-se de uma condição hereditária benigna que causa pseudo-hipertrofia muscular sem progressão para paralisia, e a manobra de Gowers é uma técnica de alongamento para prevenir contraturas.",
          "É uma doença que se manifesta exclusivamente na fase adulta, causando dor crônica e rigidez articular, e a manobra de Gowers é um exercício para aliviar a dor lombar.",
          "Caracteriza-se por fraqueza muscular progressiva devido a um defeito na proteína distrofina, levando à atrofia muscular e apresentando a manobra de Gowers como um sinal de fraqueza nos músculos proximais dos membros inferiores.",
          "É uma doença infecciosa que causa inflamação muscular reversível com antibióticos, e a manobra de Gowers é um sinal de recuperação da força nos músculos distais dos membros superiores.",
          "É um distúrbio neurológico que afeta a coordenação e o equilíbrio, sem causar fraqueza muscular significativa, e a manobra de Gowers indica apenas um problema de equilíbrio na marcha."
        ],
        "correctAnswer": 2,
        "category": "O que é Distrofia Muscular de Duchenne",
        "explanation": "A DMD é uma doença genética que se manifesta através da fraqueza muscular progressiva, levando à paralisia. É causada pela ausência ou deficiência da proteína distrofina, resultando em atrofia muscular. A manobra de Gowers é um sinal clínico característico que indica fraqueza nos músculos proximais dos membros inferiores."
      },
      {
        "question": "O diagnóstico precoce da DMD é fundamental. Qual a importância principal de um diagnóstico oportuno da doença para a intervenção e a qualidade de vida do paciente?",
        "options": [
          "Apenas facilita a obtenção de benefícios financeiros para a família, sem impacto real na progressão da doença ou no bem-estar físico do paciente.",
          "É crucial para iniciar intervenções que possam retardar a progressão da doença e prevenir complicações secundárias, melhorando significativamente a qualidade de vida dos pacientes, embora não haja cura.",
          "Permite o início de um tratamento curativo que reverte completamente a ausência de distrofina e elimina os sintomas da doença, garantindo uma vida normal e sem sequelas.",
          "Serve para identificar a necessidade de cirurgias corretivas de emergência que podem eliminar completamente a fraqueza muscular e as deformidades logo nos primeiros anos de vida.",
          "Permite o isolamento social da criança para evitar a exposição a ambientes que possam acelerar a degeneração muscular e o aparecimento de complicações cardiorrespiratórias."
        ],
        "correctAnswer": 1,
        "category": "Diagnóstico e Incidência",
        "explanation": "O diagnóstico precoce da DMD é fundamental para iniciar intervenções que possam retardar a progressão da doença e prevenir complicações secundárias, melhorando significativamente a qualidade de vida dos pacientes, mesmo sabendo que não há cura."
      },
      {
        "question": "Um dos principais objetivos da fisioterapia na DMD é manter a função muscular. Quais são as estratégias de reabilitação recomendadas para atrasar ou impedir o desenvolvimento de contraturas e a atrofia muscular por desuso?",
        "options": [
          "Uso de cadeiras de rodas desde o início para evitar qualquer tipo de esforço muscular, o que prolongaria a vida da criança sem o risco de fadiga.",
          "Apenas o repouso absoluto em leito para preservar a energia muscular e evitar a sobrecarga dos músculos enfraquecidos, sem qualquer tipo de exercício ou alongamento.",
          "Exclusivamente cirurgias ortopédicas precoces para corrigir todas as deformidades articulares, sem a necessidade de fisioterapia complementar para manutenção dos resultados.",
          "Administração de altas doses de corticosteroides como única medida terapêutica, pois esses medicamentos são capazes de reverter completamente a fraqueza muscular sem a necessidade de intervenção fisioterapêutica.",
          "Alongamentos regulares e uso de órteses para manter o comprimento e a extensibilidade muscular, combinados com exercícios submáximos para evitar atrofia por desuso e outras complicações da inatividade."
        ],
        "correctAnswer": 4,
        "category": "Princípios de Reabilitação",
        "explanation": "Dentro dos princípios de reabilitação, o tratamento deve incluir opções para manter o comprimento e a extensibilidade dos grupos musculares afetados, como alongamentos regulares e o uso de órteses. Adicionalmente, o exercício submáximo regular é recomendado para evitar a atrofia muscular por desuso e outras complicações da inatividade."
      },
      {
        "question": "A hidroterapia tem se mostrado uma intervenção eficaz no tratamento da DMD. Quais são os principais benefícios que as propriedades físicas da água oferecem a crianças com DMD, impactando sua movimentação e bem-estar?",
        "options": [
          "O ambiente aquático promove apenas o relaxamento sem qualquer benefício para o fortalecimento muscular ou o treino de marcha, sendo mais indicado para o manejo da dor em outras condições, não na DMD.",
          "A flutuabilidade da água aumenta a força gravitacional sobre os músculos, tornando os movimentos mais desafiadores e acelerando a degeneração muscular em pacientes com DMD avançada.",
          "A resistência da água dificulta a movimentação e o fortalecimento muscular, sendo um ambiente contraindicado para crianças com fraqueza muscular progressiva, aumentando o risco de quedas.",
          "A hidroterapia é benéfica apenas para a redução da dor articular em pacientes com DMD, não possuindo impacto sobre a função respiratória ou o equilíbrio, que são comprometidos pela doença.",
          "A flutuabilidade facilita os movimentos ativos, a resistência da água proporciona fortalecimento gradual, e as propriedades térmicas auxiliam no relaxamento muscular, além de permitir exercícios respiratórios e de equilíbrio em um ambiente lúdico, reduzindo o risco de quedas."
        ],
        "correctAnswer": 4,
        "category": "Hidroterapia e DMD",
        "explanation": "A hidroterapia é eficaz na DMD porque as propriedades físicas da água facilitam a movimentação (flutuabilidade), proporcionam fortalecimento gradual (resistência), e o ambiente aquático, com suas propriedades térmicas, auxilia no relaxamento muscular. Além disso, permite exercícios respiratórios, treino de marcha e atividades lúdicas, melhorando o equilíbrio e reduzindo o risco de quedas."
      },
      {
        "question": "Além das técnicas fisioterapêuticas tradicionais, a tecnologia assistiva, como a realidade virtual, tem sido explorada no tratamento da DMD. Qual o potencial benefício do uso da realidade virtual nessa população?",
        "options": [
          "Causar sobrecarga sensorial e desorientação em crianças com DMD, tornando-se uma ferramenta contraindicada para o desenvolvimento motor e funcional.",
          "Promover o isolamento social da criança, visto que o uso de jogos de computador reduz a necessidade de interação humana e foca apenas no desenvolvimento de habilidades cognitivas.",
          "Apenas diagnosticar a progressão da doença de forma mais precisa, sem oferecer qualquer tipo de intervenção terapêutica para o paciente, focando em avaliação e não em tratamento.",
          "Melhorar a condição física e funcional dos pacientes, ativando a função muscular distal e facilitando ajustes por meio de interfaces virtuais, proporcionando uma abordagem mais lúdica e motivadora.",
          "Substituir completamente a necessidade de exercícios físicos e alongamentos, pois a estimulação visual da realidade virtual é suficiente para manter a massa muscular e prevenir contraturas."
        ],
        "correctAnswer": 3,
        "category": "Tecnologia Assistiva",
        "explanation": "O uso de tecnologia assistiva, como a realidade virtual, tem demonstrado potencial para melhorar a condição física e funcional de pacientes com DMD. Estudos indicam que o uso de jogos de computador com interfaces específicas pode proporcionar melhor desempenho, ativando a função muscular distal e facilitando ajustes por meio de interfaces virtuais, tornando a abordagem mais lúdica e motivadora."
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
      doc.text("Prova de Fisioterapia Pediátrica - Questões e Gabarito", pageWidth / 2, yPosition, { align: "center" });
      yPosition += lineHeight * 2;
      
      // Data
      const today = new Date();
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(`Gerado em: ${today.toLocaleDateString()}`, pageWidth / 2, yPosition, { align: "center" });
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
      doc.save("prova-fisioterapia-pediatrica.pdf");
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
      <div className="relative min-h-screen bg-white">
        <AnimatePresence>
          {isModalOpen && (
            <UpdateModal 
              isOpen={isModalOpen} 
              onClose={handleCloseModal} 
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

  if (showResults) {
    return (
      <div className="relative min-h-screen bg-white">
        <AnimatePresence>
          {isModalOpen && (
            <UpdateModal 
              isOpen={isModalOpen} 
              onClose={handleCloseModal} 
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
      <AnimatePresence>
        {isModalOpen && (
          <UpdateModal 
            isOpen={isModalOpen} 
            onClose={handleCloseModal} 
          />
        )}
      </AnimatePresence>
      
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
            
            <div className="mt-6 text-center">
              <button
                onClick={generatePDF}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
              >
                <FileDown className="h-5 w-5" />
                Baixar PDF com questões e gabarito
              </button>
            </div>
          </motion.div>
        )}
      </div>

    </div>
  )
} 