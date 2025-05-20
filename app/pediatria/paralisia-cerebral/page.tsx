"use client"

import { ArrowLeft, BookOpen, Share2, Bookmark, ChevronDown, ChevronUp, Info, ArrowUp, Brain, Clock, Calendar } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import DraggableAIButton from "@/app/components/DraggableAIButton"
import BackToTop from "@/app/components/ui/back-to-top"
import ReadingProgress from "@/app/components/ui/reading-progress"

export default function ParalisiaCerebralPage() {
  const [bookmarked, setBookmarked] = useState(false)
  const [showMobileTableOfContents, setShowMobileTableOfContents] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  // Dados da página
  const topic = {
    id: "paralisia-cerebral",
    title: "Paralisia Cerebral",
    description: "Estudo abrangente sobre a Paralisia Cerebral (PC), incluindo definição, etiologia, tipos, diagnóstico, quadro clínico e abordagens terapêuticas.",
    content: "<h3>Introdução à Paralisia Cerebral</h3><p>Definição e impacto no desenvolvimento motor.</p><h3>Etiologia da Paralisia Cerebral</h3><p>Fatores pré-natais, perinatais e pós-natais.</p><h3>Tipos de Paralisia Cerebral</h3><p>Classificação por disfunção motora e localização.</p><h3>Diagnóstico da Paralisia Cerebral</h3><p>Identificação e avaliação clínica.</p><h3>Quadro Clínico</h3><p>Manifestações e sintomas principais.</p><h3>Tratamento da Paralisia Cerebral</h3><p>Abordagens terapêuticas e intervenções.</p>",
    icon: <Brain className="h-12 w-12 text-[#6EC1E4]" />
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
                Este conteúdo educativo aborda os principais aspectos da Paralisia Cerebral, incluindo sua definição, 
                etiologia, diagnóstico, quadro clínico e abordagens terapêuticas, com o objetivo de proporcionar uma 
                compreensão completa dessa condição neurológica.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm ml-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Informações do material</h3>
              <div className="text-sm text-gray-600">
                <div className="flex items-center mb-1">
                  <Clock className="h-4 w-4 mr-1 text-[#6EC1E4]" />
                  Tempo de leitura: 18 minutos
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1 text-[#6EC1E4]" />
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
                  Olá! Vamos iniciar nossa aula sobre Paralisia Cerebral (PC), abordando os principais aspectos contidos 
                  no material que temos.
                </p>

                <section id="introdução-à-paralisia-cerebral" className="mb-10">
                  <h2 className="text-2xl font-bold text-[#333333] mb-4">Introdução à Paralisia Cerebral</h2>
                  <p className="mb-4">
                    A Paralisia Cerebral (PC) é definida como uma desordem persistente, porém variável, do movimento e da postura, 
                    que surge nos primeiros anos de vida devido a uma interferência no desenvolvimento do Sistema Nervoso Central (SNC), 
                    causada por uma desordem cerebral não progressiva. Essa condição afeta o desenvolvimento motor normal da criança, 
                    sendo resultado de uma lesão ou mau desenvolvimento do cérebro que ocorre desde a infância.
                  </p>
                  
                  <p className="mb-4">
                    A principal alteração observada em crianças com PC é o comprometimento motor, que leva a diversas modificações 
                    decorrentes da encefalopatia, resultando em alterações na biomecânica corporal. Além disso, a criança pode 
                    apresentar distúrbios cognitivos, sensitivos, visuais e auditivos que, somados às alterações motoras e às 
                    restrições do ambiente, impactam seu desempenho funcional de diferentes formas.
                  </p>
                  
                  <div className="bg-[#F0F9FF] p-5 rounded-lg mb-6">
                    <h3 className="text-xl font-medium text-[#4A96D1] mb-3">Características Fundamentais</h3>
                    <ul className="list-disc pl-6">
                      <li className="mb-2">
                        Distúrbio motor não progressivo
                      </li>
                      <li className="mb-2">
                        Alterações de tônus, postura e movimento
                      </li>
                      <li className="mb-2">
                        Condição frequentemente mutável
                      </li>
                      <li className="mb-2">
                        Secundário à lesão do cérebro imaturo
                      </li>
                      <li>
                        Ocorrência possível nos períodos pré, peri ou pós-natal
                      </li>
                    </ul>
                  </div>
                  
                  <p className="mb-4">
                    É importante ressaltar que crianças com necessidades especiais, incluindo aquelas com PC, frequentemente 
                    apresentam atrasos motores devido à falta de oportunidades de se movimentar. A PC é caracterizada por um 
                    distúrbio motor não progressivo, que inclui alterações de tônus, postura e movimento, sendo frequentemente 
                    mutável e secundário à lesão do cérebro imaturo, que pode ocorrer nos períodos pré, peri ou pós-natal.
                  </p>
                </section>

                <section id="etiologia-da-paralisia-cerebral" className="mb-10">
                  <h2 className="text-2xl font-bold text-[#333333] mb-4">Etiologia da Paralisia Cerebral</h2>
                  <p className="mb-6">
                    As causas da Paralisia Cerebral podem ser divididas em três categorias principais:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-[#F0F9FF] p-5 rounded-lg">
                      <h3 className="text-xl font-medium text-[#4A96D1] mb-3">Fatores Pré-natais</h3>
                      <p className="mb-3">Ocorrem durante a gestação:</p>
                      <ul className="list-disc pl-6">
                        <li className="mb-2">Diminuição da pressão parcial de oxigênio</li>
                        <li className="mb-2">Diminuição da concentração de hemoglobina</li>
                        <li className="mb-2">Diminuição da superfície placentária</li>
                        <li className="mb-2">Alterações da circulação materna</li>
                        <li className="mb-2">Tumores uterinos</li>
                        <li className="mb-2">Nó de cordão</li>
                        <li className="mb-2">Cordão curto</li>
                        <li className="mb-2">Malformações de cordão</li>
                        <li>Prolapso ou pinçamento de cordão</li>
                      </ul>
                    </div>
                    
                    <div className="bg-[#F0F9FF] p-5 rounded-lg">
                      <h3 className="text-xl font-medium text-[#4A96D1] mb-3">Fatores Perinatais</h3>
                      <p className="mb-3">Ocorrem durante o parto:</p>
                      <ul className="list-disc pl-6">
                        <li className="mb-2">Idade da mãe</li>
                        <li className="mb-2">Desproporção céfalo-pélvica</li>
                        <li className="mb-2">Anomalias da placenta</li>
                        <li className="mb-2">Anomalias do cordão</li>
                        <li className="mb-2">Anomalias da contração uterina</li>
                        <li className="mb-2">Narcose e anestesia</li>
                        <li className="mb-2">Primogenidade</li>
                        <li className="mb-2">Prematuridade</li>
                        <li className="mb-2">Dismaturidade</li>
                        <li>Gemelaridade</li>
                      </ul>
                    </div>
                    
                    <div className="bg-[#F0F9FF] p-5 rounded-lg">
                      <h3 className="text-xl font-medium text-[#4A96D1] mb-3">Fatores Pós-natais</h3>
                      <p className="mb-3">Ocorrem após o nascimento:</p>
                      <ul className="list-disc pl-6">
                        <li className="mb-2">Anóxia anêmica</li>
                        <li className="mb-2">Anóxia por estase</li>
                        <li className="mb-2">Anóxia anoxêmica</li>
                        <li>Anóxia histotóxica</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section id="tipos-de-paralisia-cerebral" className="mb-10">
                  <h2 className="text-2xl font-bold text-[#333333] mb-4">Tipos de Paralisia Cerebral</h2>
                  <p className="mb-6">
                    A PC pode ser classificada de acordo com dois critérios principais:
                  </p>
                  
                  <div className="bg-[#F0F9FF] p-5 rounded-lg mb-6">
                    <h3 className="text-xl font-medium text-[#4A96D1] mb-3">1. Tipo de Disfunção Motora</h3>
                    <ul className="list-disc pl-6">
                      <li className="mb-3">
                        <strong>Extrapiramidal ou Discinético:</strong> Inclui os tipos atetóide, coréico e distônico.
                      </li>
                      <li className="mb-3">
                        <strong>Atáxico:</strong> Caracterizado por alterações no equilíbrio e coordenação.
                      </li>
                      <li className="mb-3">
                        <strong>Misto:</strong> Combinação de diferentes tipos de disfunção motora.
                      </li>
                      <li>
                        <strong>Espástico:</strong> Tipo mais comum, presente em cerca de 88% dos casos.
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-[#F0F9FF] p-5 rounded-lg mb-6">
                    <h3 className="text-xl font-medium text-[#4A96D1] mb-3">2. Localização do Corpo Afetado</h3>
                    <ul className="list-disc pl-6">
                      <li className="mb-3">
                        <strong>Tetraplegia ou Quadriplegia:</strong> Acometimento dos quatro membros.
                      </li>
                      <li className="mb-3">
                        <strong>Monoplegia:</strong> Acometimento de um único membro.
                      </li>
                      <li className="mb-3">
                        <strong>Paraplegia ou Diplegia:</strong> Acometimento dos membros inferiores.
                      </li>
                      <li>
                        <strong>Hemiplegia:</strong> Acometimento de um lado do corpo.
                      </li>
                    </ul>
                  </div>
                </section>

                <section id="diagnóstico-da-paralisia-cerebral" className="mb-10">
                  <h2 className="text-2xl font-bold text-[#333333] mb-4">Diagnóstico da Paralisia Cerebral</h2>
                  <p className="mb-4">
                    O diagnóstico de PC geralmente envolve a identificação de retardo ou atraso no desenvolvimento motor, 
                    persistência de reflexos primitivos, presença de reflexos anormais e ausência do desenvolvimento dos 
                    reflexos protetores, como a resposta de paraquedas.
                  </p>
                  
                  <div className="border-l-4 border-[#6EC1E4] pl-4 py-2 mb-6">
                    <p className="text-gray-700">
                      É importante considerar os seguintes aspectos para o diagnóstico:
                    </p>
                  </div>
                  
                  <ul className="list-disc pl-6 mb-6">
                    <li className="mb-3">
                      Histórico de comprometimento predominantemente motor não evolutivo.
                    </li>
                    <li className="mb-3">
                      Exame neurológico para identificar o tipo de PC.
                    </li>
                    <li className="mb-3">
                      EEG nos casos de epilepsia associada.
                    </li>
                    <li>
                      TAC e RM para identificar alterações estruturais cerebrais.
                    </li>
                  </ul>
                </section>

                <section id="quadro-clínico" className="mb-10">
                  <h2 className="text-2xl font-bold text-[#333333] mb-4">Quadro Clínico</h2>
                  <p className="mb-6">
                    As manifestações clínicas da PC variam amplamente, dependendo do tipo e da gravidade da lesão.
                  </p>
                  
                  <div className="space-y-6 mb-6">
                    <div className="bg-[#F0F9FF] p-5 rounded-lg">
                      <h3 className="text-xl font-medium text-[#4A96D1] mb-3">Hemiplegia</h3>
                      <p>
                        Mais frequente, com maior comprometimento do membro superior, acompanhado de espasticidade, 
                        hiper-reflexia e sinal de Babinski. O paciente assume uma postura em semiflexão do membro superior, 
                        com o membro inferior hiperestendido e aduzido, e o pé em postura equinovara.
                      </p>
                    </div>
                    
                    <div className="bg-[#F0F9FF] p-5 rounded-lg">
                      <h3 className="text-xl font-medium text-[#4A96D1] mb-3">Hemiplegia Bilateral (Tetra ou Quadriplegia)</h3>
                      <p>
                        Lesões difusas bilaterais no sistema piramidal, resultando em tetraparesia espástica grave, 
                        síndrome pseudobulbar (hipomimia, disfagia e disartria), microcefalia, deficiência mental e epilepsia.
                      </p>
                    </div>
                    
                    <div className="bg-[#F0F9FF] p-5 rounded-lg">
                      <h3 className="text-xl font-medium text-[#4A96D1] mb-3">Diplegia</h3>
                      <p>
                        Comprometimento dos membros inferiores, com hipertonia dos adutores, resultando na síndrome 
                        de Little (postura com cruzamento dos membros inferiores e marcha "em tesoura"). A intensidade 
                        do distúrbio varia, com alguns pacientes apresentando boa recuperação e outros evoluindo com 
                        graves limitações funcionais.
                      </p>
                    </div>
                    
                    <div className="bg-[#F0F9FF] p-5 rounded-lg">
                      <h3 className="text-xl font-medium text-[#4A96D1] mb-3">Discinesia</h3>
                      <p>
                        Movimentos involuntários, como distonias axiais e movimentos coreoatetóides das extremidades.
                      </p>
                    </div>
                    
                    <div className="bg-[#F0F9FF] p-5 rounded-lg">
                      <h3 className="text-xl font-medium text-[#4A96D1] mb-3">Ataxia</h3>
                      <p>
                        Alterações do equilíbrio (ataxia axial) e, menos comumente, da coordenação (ataxia apendicular). 
                        A marcha se faz com aumento da base de sustentação e pode apresentar tremor intencional.
                      </p>
                    </div>
                    
                    <div className="bg-[#F0F9FF] p-5 rounded-lg">
                      <h3 className="text-xl font-medium text-[#4A96D1] mb-3">Formas Mistas</h3>
                      <p>
                        Associação de diferentes manifestações, como movimentos distônicos e coreoatetóides, 
                        ou ataxia com plegia (principalmente diplegia).
                      </p>
                    </div>
                  </div>
                  
                  <p className="mb-4">
                    Além do distúrbio motor, o quadro clínico pode incluir deficiência mental, epilepsia, distúrbios 
                    da linguagem, distúrbios visuais e distúrbios do comportamento. Complicações ortopédicas, como 
                    retrações fibrotendíneas, cifoescoliose, "coxa valga" e deformidades nos pés, também são comuns.
                  </p>
                </section>

                <section id="tratamento-da-paralisia-cerebral" className="mb-10">
                  <h2 className="text-2xl font-bold text-[#333333] mb-4">Tratamento da Paralisia Cerebral</h2>
                  <p className="mb-6">
                    O tratamento da PC é paliativo, visando melhorar a qualidade de vida do paciente, uma vez que 
                    não é possível reverter a lesão cerebral.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-[#F0F9FF] p-5 rounded-lg">
                      <h3 className="text-xl font-medium text-[#4A96D1] mb-3">Tratamento Medicamentoso</h3>
                      <p className="mb-3">
                        Uso de anticonvulsivantes (se necessário) e, mais raramente, medicamentos psiquiátricos para 
                        controle de distúrbios afetivo-emocionais e agitação psicomotora.
                      </p>
                      <p>
                        Medicamentos como baclofen, diazepam, clonazepan, dantrolene, clonidina, tizanidina e 
                        clopromazina são utilizados para tratar a espasticidade.
                      </p>
                    </div>
                    
                    <div className="bg-[#F0F9FF] p-5 rounded-lg">
                      <h3 className="text-xl font-medium text-[#4A96D1] mb-3">Tratamento Cirúrgico</h3>
                      <p>
                        Cirurgias ortopédicas para correção de deformidades e estabilização articular, visando 
                        preservar a função e aliviar a dor.
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-[#F0F9FF] p-5 rounded-lg">
                      <h3 className="text-xl font-medium text-[#4A96D1] mb-3">Fisioterapia</h3>
                      <p>
                        Principal enfoque terapêutico, utilizando diferentes métodos como Bobath, Phelps e Kabat. 
                        O atendimento deve considerar as etapas do desenvolvimento motor normal e utilizar estimulação 
                        sensitiva e sensorial.
                      </p>
                    </div>
                    
                    <div className="bg-[#F0F9FF] p-5 rounded-lg">
                      <h3 className="text-xl font-medium text-[#4A96D1] mb-3">Toxina Botulínica</h3>
                      <p className="mb-3">
                        Utilizada para reduzir a espasticidade, atuando na junção neuromuscular e provocando paresia muscular. 
                        A dose depende de fatores como idade, peso e grau de espasticidade.
                      </p>
                      <p>
                        O efeito dura aproximadamente 3 meses, e os efeitos colaterais podem incluir dores, equimoses, 
                        fraqueza muscular transitória e astenia.
                      </p>
                    </div>
                  </div>
                  
                  <div className="border border-[#6EC1E4] rounded-lg p-5 mb-6">
                    <h3 className="text-xl font-medium text-[#4A96D1] mb-3">Indicações da Toxina Botulínica</h3>
                    <p className="mb-3">
                      A toxina botulínica é indicada quando outros métodos falham, sendo aplicada em espasticidades dos:
                    </p>
                    <ul className="list-disc pl-6">
                      <li>Flexores do punho</li>
                      <li>Antebraço</li>
                      <li>Adutores do quadril</li>
                      <li>Flexores do joelho</li>
                      <li>Flexores do pé</li>
                    </ul>
                    <p className="mt-3">
                      Após a aplicação da Toxina Botulínica, o uso de órteses pode melhorar a posição funcional do membro.
                    </p>
                  </div>
                  
                  <p>
                    Espero que esta aula detalhada tenha sido útil para a sua compreensão sobre a Paralisia Cerebral. 
                    Se tiverem mais alguma questão, podem perguntar!
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
                        <li>ROSENBAUM, P. et al. A report: the definition and classification of cerebral palsy. Developmental Medicine & Child Neurology, v. 49, n. s109, p. 8-14, 2007.</li>
                        <li>BAX, M. et al. Proposed definition and classification of cerebral palsy. Developmental Medicine & Child Neurology, v. 47, n. 8, p. 571-576, 2005.</li>
                        <li>SOCIEDADE BRASILEIRA DE PEDIATRIA. Manual de Orientação: Seguimento da criança com paralisia cerebral. Rio de Janeiro: SBP, 2020.</li>
                        <li>MARRET, S.; VANHULLE, C.; LAQUERRIERE, A. Pathophysiology of cerebral palsy. Handbook of Clinical Neurology, v. 111, p. 169-176, 2013.</li>
                        <li>NOVAK, I. et al. A systematic review of interventions for children with cerebral palsy: state of the evidence. Developmental Medicine & Child Neurology, v. 55, n. 10, p. 885-910, 2013.</li>
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