"use client"

import { ArrowLeft, BookOpen, Share2, Bookmark, ChevronDown, ChevronUp, Info, ArrowUp, Brain, Clock, Calendar } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import DraggableAIButton from "@/app/components/DraggableAIButton"
import BackToTop from "@/app/components/ui/back-to-top"
import ReadingProgress from "@/app/components/ui/reading-progress"

export default function AvaliacaoNeurologicaPage() {
  const [bookmarked, setBookmarked] = useState(false)
  const [showMobileTableOfContents, setShowMobileTableOfContents] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  // Dados da página
  const topic = {
    id: "avaliacao-neurologica",
    title: "Desenvolvimento motor das crianças de 6 a 8 anos de idade",
    description: "Análise e compreensão dos marcos motores e habilidades de movimento em crianças da idade escolar inicial.",
    content: "<h3>Conceitos Fundamentais</h3><p>Teorias e abordagens do desenvolvimento motor.</p><h3>Fases do Desenvolvimento</h3><p>As quatro fases principais.</p><h3>Estágios de Habilidades Motoras</h3><p>Progressão das habilidades.</p><h3>Tipos de Habilidades</h3><p>Classificações motoras.</p><h3>Categorias de Movimento</h3><p>Estabilidade, locomoção e manipulação.</p><h3>Estudo de Caso</h3><p>Análise de crianças do 2º e 3º ano.</p>",
    icon: <Brain className="h-12 w-12 text-[#B9A9FF]" />
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
          className="h-full bg-gradient-to-r from-[#B9A9FF] to-[#9A86F2] transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
      
      <BackToTop />
      <DraggableAIButton />
      
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <Link
            href="/pediatria"
            className="inline-flex items-center text-[#666666] hover:text-[#B9A9FF] transition-colors"
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
              <Share2 className="h-5 w-5 text-[#B9A9FF]" />
            </button>
            
            <button 
              className="p-2 rounded-full hover:bg-[#F0F9FF] transition-colors"
              onClick={() => setBookmarked(!bookmarked)}
            >
              <Bookmark 
                className={`h-5 w-5 ${bookmarked ? 'fill-[#B9A9FF] text-[#B9A9FF]' : 'text-[#B9A9FF]'}`} 
              />
            </button>
          </div>
        </div>

        {/* ThemeInfoCard simplificado */}
        <div className="bg-blue-50 rounded-lg p-6 mb-8">
          <div className="flex items-start">
            <div className="mr-2 text-[#B9A9FF]">
              <Info className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-medium text-gray-900 mb-2">Sobre este tema</h2>
              <p className="text-gray-600">
                Este material apresenta um panorama completo sobre o desenvolvimento motor em crianças de 6 a 8 anos, 
                destacando conceitos fundamentais, classificações de habilidades motoras e achados de um estudo específico.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm ml-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Informações do material</h3>
              <div className="text-sm text-gray-600">
                <div className="flex items-center mb-1">
                  <Clock className="h-4 w-4 mr-1 text-[#B9A9FF]" />
                  Tempo de leitura: 15 minutos
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1 text-[#B9A9FF]" />
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
                  <ChevronUp className="h-5 w-5 text-[#B9A9FF]" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-[#B9A9FF]" />
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
                <section id="conceitos-fundamentais" className="mb-10">
                  <h2 className="text-2xl font-bold text-[#333333] mb-4">Conceitos Fundamentais</h2>
                  <p className="mb-4">
                    O desenvolvimento motor é um processo contínuo que ocorre ao longo da vida, mas apresenta características específicas em cada faixa etária. Entre 6 e 8 anos, as crianças estão na fase de refinamento das habilidades motoras fundamentais e início das habilidades especializadas.
                  </p>
                  <p className="mb-4">
                    Existem três teorias principais que explicam o desenvolvimento motor nessa faixa etária:
                  </p>
                  <ul className="list-disc pl-6 mb-4">
                    <li className="mb-2">
                      <strong>Teoria Maturacional:</strong> Enfatiza a influência da maturação neurológica no desenvolvimento de habilidades motoras. Segundo esta teoria, as estruturas neurais precisam atingir certo nível de maturidade para que determinadas habilidades motoras sejam adquiridas.
                    </li>
                    <li className="mb-2">
                      <strong>Teoria dos Sistemas Dinâmicos:</strong> Considera que o desenvolvimento motor resulta da interação entre múltiplos subsistemas (neuromuscular, sensorial, biomecânico) e é influenciado por fatores ambientais e pela tarefa a ser realizada.
                    </li>
                    <li className="mb-2">
                      <strong>Teoria Ecológica:</strong> Destaca a relação entre indivíduo e ambiente, considerando que o desenvolvimento motor é influenciado pelas affordances (oportunidades de ação) presentes no ambiente.
                    </li>
                  </ul>
                  <p>
                    A compreensão dessas teorias é fundamental para avaliar adequadamente o desenvolvimento motor das crianças nessa faixa etária e planejar intervenções quando necessário.
                  </p>
                </section>
                
                <section id="fases-do-desenvolvimento" className="mb-10">
                  <h2 className="text-2xl font-bold text-[#333333] mb-4">Fases do Desenvolvimento</h2>
                  <p className="mb-4">
                    O desenvolvimento motor pode ser dividido em quatro fases principais, sendo que as crianças de 6 a 8 anos encontram-se principalmente na fase de movimentos fundamentais, em transição para a fase de movimentos especializados:
                  </p>
                  <div className="overflow-x-auto mb-6">
                    <table className="min-w-full divide-y divide-gray-200 border rounded-lg">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fase</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Idade Aproximada</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Características</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Fase de Movimentos Reflexos</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Nascimento até 1 ano</td>
                          <td className="px-6 py-4 text-sm text-gray-500">Movimentos involuntários que formam a base para as fases posteriores</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Fase de Movimentos Rudimentares</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">0 a 2 anos</td>
                          <td className="px-6 py-4 text-sm text-gray-500">Primeiros movimentos voluntários (sentar, engatinhar, andar)</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Fase de Movimentos Fundamentais</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2 a 7 anos</td>
                          <td className="px-6 py-4 text-sm text-gray-500">Desenvolvimento das habilidades básicas de locomoção, manipulação e estabilidade</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Fase de Movimentos Especializados</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">7 anos em diante</td>
                          <td className="px-6 py-4 text-sm text-gray-500">Refinamento das habilidades fundamentais e desenvolvimento de habilidades esportivas e recreativas específicas</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p>
                    As crianças de 6 a 8 anos estão em um período de transição, onde as habilidades fundamentais devem estar sendo refinadas e as habilidades especializadas começam a emergir, especialmente no contexto de jogos, esportes e atividades físicas estruturadas.
                  </p>
                </section>
                
                <section id="estágios-de-habilidades-motoras" className="mb-10">
                  <h2 className="text-2xl font-bold text-[#333333] mb-4">Estágios de Habilidades Motoras</h2>
                  <p className="mb-4">
                    Dentro da fase de movimentos fundamentais, as crianças progridem através de três estágios distintos:
                  </p>
                  <div className="bg-[#F0F9FF] p-4 rounded-lg mb-4">
                    <h3 className="text-xl font-medium text-[#9A86F2] mb-2">Estágio Inicial (aproximadamente 2-3 anos)</h3>
                    <p>
                      Caracterizado por tentativas iniciais de executar habilidades fundamentais. Os movimentos são descoordenados, com sequência temporal e espacial inadequada.
                    </p>
                  </div>
                  <div className="bg-[#F0F9FF] p-4 rounded-lg mb-4">
                    <h3 className="text-xl font-medium text-[#9A86F2] mb-2">Estágio Elementar (aproximadamente 4-5 anos)</h3>
                    <p>
                      Maior controle e coordenação rítmica dos movimentos fundamentais. A sincronização espaço-temporal melhora, mas os movimentos ainda são restritos ou exagerados.
                    </p>
                  </div>
                  <div className="bg-[#F0F9FF] p-4 rounded-lg mb-4">
                    <h3 className="text-xl font-medium text-[#9A86F2] mb-2">Estágio Maduro (aproximadamente 6-7 anos)</h3>
                    <p>
                      Integração de todos os componentes do movimento em uma ação coordenada e eficiente. Os movimentos são mecânicamente eficientes, coordenados e controlados.
                    </p>
                  </div>
                  <p className="mb-4">
                    As crianças de 6 a 8 anos geralmente encontram-se no estágio maduro para a maioria das habilidades fundamentais, embora possa haver variações individuais. No entanto, muitas crianças dessa faixa etária podem não alcançar o estágio maduro em todas as habilidades fundamentais sem instrução específica e oportunidades de prática.
                  </p>
                  <p>
                    A ausência de desenvolvimento dessas habilidades no estágio maduro pode limitar o sucesso dessas crianças em atividades físicas futuras, inclusive esportes e atividades recreativas, constituindo a "barreira de proficiência".
                  </p>
                </section>
                
                <section id="tipos-de-habilidades" className="mb-10">
                  <h2 className="text-2xl font-bold text-[#333333] mb-4">Tipos de Habilidades</h2>
                  <p className="mb-4">
                    As habilidades motoras podem ser classificadas em diversas categorias. As mais relevantes para a compreensão do desenvolvimento motor de crianças de 6 a 8 anos são:
                  </p>
                  <h3 className="text-xl font-medium text-[#9A86F2] mb-2">Quanto à precisão do movimento:</h3>
                  <ul className="list-disc pl-6 mb-4">
                    <li className="mb-2">
                      <strong>Habilidades motoras grossas:</strong> Envolvem grandes grupos musculares e movimentos amplos. Ex: correr, saltar, arremessar.
                    </li>
                    <li className="mb-2">
                      <strong>Habilidades motoras finas:</strong> Envolvem pequenos grupos musculares, especialmente das mãos e dedos, com grande precisão. Ex: escrever, recortar, desenhar.
                    </li>
                  </ul>
                  <p className="mb-4">
                    Aos 6-8 anos, as crianças devem apresentar um bom desenvolvimento tanto das habilidades motoras grossas quanto das finas, sendo particularmente importante o desenvolvimento das habilidades motoras finas para o sucesso escolar.
                  </p>
                  <h3 className="text-xl font-medium text-[#9A86F2] mb-2">Quanto ao início e fim do movimento:</h3>
                  <ul className="list-disc pl-6 mb-4">
                    <li className="mb-2">
                      <strong>Habilidades discretas:</strong> Possuem início e fim definidos. Ex: arremessar uma bola, chutar.
                    </li>
                    <li className="mb-2">
                      <strong>Habilidades seriais:</strong> Combinação de várias habilidades discretas. Ex: driblar e arremessar uma bola.
                    </li>
                    <li className="mb-2">
                      <strong>Habilidades contínuas:</strong> Não possuem início e fim claramente definidos. Ex: nadar, correr.
                    </li>
                  </ul>
                  <p className="mb-4">
                    Nessa faixa etária, as crianças devem ser capazes de executar habilidades discretas com eficiência e começar a combinar essas habilidades em séries mais complexas, especialmente em contextos de jogos e esportes.
                  </p>
                  <h3 className="text-xl font-medium text-[#9A86F2] mb-2">Quanto à previsibilidade ambiental:</h3>
                  <ul className="list-disc pl-6 mb-4">
                    <li className="mb-2">
                      <strong>Habilidades fechadas:</strong> Executadas em ambiente estável e previsível. Ex: ginástica artística, nado sincronizado.
                    </li>
                    <li className="mb-2">
                      <strong>Habilidades abertas:</strong> Executadas em ambiente variável e imprevisível. Ex: jogar futebol, basquete.
                    </li>
                  </ul>
                  <p>
                    Entre 6 e 8 anos, as crianças começam a desenvolver maior capacidade de adaptar seus movimentos a ambientes variáveis, o que é fundamental para a participação em esportes coletivos e jogos que exigem tomada de decisão rápida.
                  </p>
                </section>
                
                <section id="categorias-de-movimento" className="mb-10">
                  <h2 className="text-2xl font-bold text-[#333333] mb-4">Categorias de Movimento</h2>
                  <p className="mb-4">
                    Os movimentos fundamentais podem ser divididos em três categorias principais:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-[#F0F9FF] p-4 rounded-lg">
                      <h3 className="text-xl font-medium text-[#9A86F2] mb-2">Movimentos de Estabilidade</h3>
                      <p className="mb-2">Envolvem a manutenção do equilíbrio em relação à força de gravidade.</p>
                      <ul className="list-disc pl-6">
                        <li>Equilíbrio estático</li>
                        <li>Equilíbrio dinâmico</li>
                        <li>Rolamentos</li>
                        <li>Apoios invertidos</li>
                        <li>Esquivas</li>
                      </ul>
                    </div>
                    <div className="bg-[#F0F9FF] p-4 rounded-lg">
                      <h3 className="text-xl font-medium text-[#9A86F2] mb-2">Movimentos de Locomoção</h3>
                      <p className="mb-2">Envolvem o deslocamento do corpo de um ponto a outro.</p>
                      <ul className="list-disc pl-6">
                        <li>Correr</li>
                        <li>Saltar</li>
                        <li>Galopar</li>
                        <li>Saltitar</li>
                        <li>Escalar</li>
                        <li>Deslizar</li>
                      </ul>
                    </div>
                    <div className="bg-[#F0F9FF] p-4 rounded-lg">
                      <h3 className="text-xl font-medium text-[#9A86F2] mb-2">Movimentos de Manipulação</h3>
                      <p className="mb-2">Envolvem a relação com objetos, aplicando ou recebendo força.</p>
                      <ul className="list-disc pl-6">
                        <li>Arremessar</li>
                        <li>Receber</li>
                        <li>Chutar</li>
                        <li>Rebater</li>
                        <li>Driblar</li>
                        <li>Volear</li>
                      </ul>
                    </div>
                  </div>
                  <p className="mb-4">
                    Aos 6-8 anos, espera-se que a maioria das crianças apresente um padrão maduro nas habilidades fundamentais de cada categoria, com destaque para:
                  </p>
                  <ul className="list-disc pl-6 mb-4">
                    <li className="mb-2">
                      <strong>Estabilidade:</strong> Capacidade de manter o equilíbrio em diferentes posturas e durante atividades dinâmicas, incluindo equilíbrio unipodal por 8-10 segundos.
                    </li>
                    <li className="mb-2">
                      <strong>Locomoção:</strong> Corrida com padrão maduro, salto horizontal e vertical com coordenação de braços e pernas, salto em altura e em distância mais eficientes.
                    </li>
                    <li className="mb-2">
                      <strong>Manipulação:</strong> Arremesso por cima do ombro com rotação do tronco e transferência de peso, recepção com as mãos sem necessidade de usar o corpo, chute com aproximação e balanço da perna oposta.
                    </li>
                  </ul>
                  <p>
                    É importante ressaltar que pode haver diferenças no desenvolvimento dessas habilidades entre meninos e meninas, principalmente nas habilidades manipulativas, embora essas diferenças sejam mais influenciadas por fatores socioculturais e oportunidades de prática do que por fatores biológicos.
                  </p>
                </section>
                
                <section id="estudo-de-caso" className="mb-10">
                  <h2 className="text-2xl font-bold text-[#333333] mb-4">Estudo de Caso</h2>
                  <p className="mb-4">
                    Um estudo realizado com 120 crianças do 2º e 3º anos do ensino fundamental (6-8 anos) avaliou o desenvolvimento motor utilizando o Test of Gross Motor Development - Second Edition (TGMD-2). Os resultados mostram:
                  </p>
                  <div className="bg-[#F0F9FF] p-4 rounded-lg mb-4">
                    <h3 className="text-xl font-medium text-[#9A86F2] mb-2">Principais Achados</h3>
                    <ul className="list-disc pl-6">
                      <li className="mb-2">
                        <strong>Nível de desenvolvimento geral:</strong> 22% das crianças apresentaram desenvolvimento motor abaixo do esperado para a idade, 63% dentro do esperado e 15% acima do esperado.
                      </li>
                      <li className="mb-2">
                        <strong>Habilidades locomotoras:</strong> Melhor desempenho em correr, galopar e saltar horizontalmente; pior desempenho em saltitar em um pé.
                      </li>
                      <li className="mb-2">
                        <strong>Habilidades manipulativas:</strong> Melhor desempenho em quicar e chutar; pior desempenho em rebater e arremessar por cima do ombro.
                      </li>
                      <li className="mb-2">
                        <strong>Diferenças entre gêneros:</strong> Meninos apresentaram melhor desempenho em habilidades manipulativas, enquanto meninas se destacaram em habilidades locomotoras.
                      </li>
                      <li className="mb-2">
                        <strong>Diferenças por nível socioeconômico:</strong> Crianças de escolas com melhor infraestrutura apresentaram desempenho superior.
                      </li>
                    </ul>
                  </div>
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-lg font-medium text-yellow-800">Implicações Educacionais</h3>
                        <p className="mt-2 text-yellow-700">
                          O estudo aponta para a necessidade de programas específicos de educação física que visem o desenvolvimento das habilidades motoras fundamentais, especialmente para as crianças que apresentam atrasos no desenvolvimento motor.
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="mb-4">
                    Os dados do estudo reforçam a importância de intervenções precoces, considerando que as crianças nessa faixa etária estão em um período crítico para o desenvolvimento das habilidades motoras fundamentais, que servirão de base para habilidades mais complexas no futuro.
                  </p>
                  <div className="border border-[#B9A9FF] rounded-lg p-4">
                    <h3 className="text-xl font-medium text-[#9A86F2] mb-2">Recomendações para Estimulação</h3>
                    <p className="mb-2">Com base nos achados do estudo, recomenda-se:</p>
                    <ol className="list-decimal pl-6">
                      <li className="mb-2">
                        <strong>Atividades diversificadas:</strong> Oferecer experiências motoras variadas que contemplem todas as categorias de movimento.
                      </li>
                      <li className="mb-2">
                        <strong>Atenção individualizada:</strong> Identificar crianças com atrasos no desenvolvimento motor e proporcionar atividades específicas para suas necessidades.
                      </li>
                      <li className="mb-2">
                        <strong>Estímulo às habilidades manipulativas em meninas:</strong> Proporcionar mais oportunidades de prática dessas habilidades, combatendo estereótipos de gênero.
                      </li>
                      <li className="mb-2">
                        <strong>Estímulo às habilidades locomotoras em meninos:</strong> Incentivar atividades que desenvolvam equilíbrio, coordenação e ritmo.
                      </li>
                      <li className="mb-2">
                        <strong>Ambiente adequado:</strong> Garantir espaços e materiais apropriados para a prática de atividades físicas.
                      </li>
                    </ol>
                  </div>
                </section>
                
                <section className="pt-8 border-t border-gray-200">
                  <div className="flex items-start mb-4">
                    <div className="mr-3 text-[#B9A9FF]">
                      <BookOpen className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-[#333333] mb-2">Referências Bibliográficas</h3>
                      <ul className="text-gray-600 space-y-2">
                        <li>GALLAHUE, D. L.; OZMUN, J. C.; GOODWAY, J. D. Compreendendo o desenvolvimento motor: bebês, crianças, adolescentes e adultos. 7. ed. Porto Alegre: AMGH, 2013.</li>
                        <li>HAYWOOD, K. M.; GETCHELL, N. Desenvolvimento motor ao longo da vida. 6. ed. Porto Alegre: Artmed, 2016.</li>
                        <li>SOCIEDADE BRASILEIRA DE PEDIATRIA. Manual de Orientação: Promoção da Atividade Física na Infância e Adolescência. Rio de Janeiro: SBP, 2017.</li>
                        <li>VALENTINI, N. C. Competência percebida e real das habilidades motoras de crianças. Revista da Educação Física da UEM, v. 25, n. 4, p. 649-662, 2014.</li>
                        <li>WORLD HEALTH ORGANIZATION. Guidelines on physical activity, sedentary behaviour and sleep for children under 5 years of age. Geneva: WHO, 2019.</li>
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