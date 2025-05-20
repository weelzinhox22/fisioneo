"use client"

import { ArrowLeft, BookOpen, Share2, Bookmark, ChevronDown, ChevronUp, Info, ArrowUp, Baby, Clock, Calendar } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import DraggableAIButton from "@/app/components/DraggableAIButton"
import BackToTop from "@/app/components/ui/back-to-top"
import ReadingProgress from "@/app/components/ui/reading-progress"

export default function DesenvolvimentoMotorPage() {
  const [bookmarked, setBookmarked] = useState(false)
  const [showMobileTableOfContents, setShowMobileTableOfContents] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  // Dados da página
  const topic = {
    id: "desenvolvimento-motor",
    title: "Reflexos de 0 a 6 meses",
    description: "Estudo dos reflexos primitivos e sua evolução nos primeiros 6 meses de vida.",
    content: "<h3>Primeiro Mês</h3><p>Conteúdo sobre o primeiro mês...</p><h3>Segundo Mês</h3><p>Conteúdo sobre o segundo mês...</p><h3>Terceiro Mês</h3><p>Conteúdo sobre o terceiro mês...</p><h3>Quarto Mês</h3><p>Conteúdo sobre o quarto mês...</p><h3>Quinto Mês</h3><p>Conteúdo sobre o quinto mês...</p><h3>Sexto Mês</h3><p>Conteúdo sobre o sexto mês...</p>",
    icon: <Baby className="h-12 w-12 text-[#6EC1E4]" />
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
                Este conteúdo educativo aborda os reflexos primitivos presentes em recém-nascidos e bebês até 6 meses,
                explicando sua importância para o desenvolvimento neurológico e motor.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm ml-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Informações do material</h3>
              <div className="text-sm text-gray-600">
                <div className="flex items-center mb-1">
                  <Clock className="h-4 w-4 mr-1 text-[#6EC1E4]" />
                  Tempo de leitura: 24 minutos
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
            {/* Tabela de conteúdo - apenas visível em telas grandes */}
            <motion.div variants={childVariant} className="hidden lg:block">
              <div className="sticky top-20">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-[#E0E0E0]">
                  <h3 className="font-medium text-gray-700 mb-3 flex items-center">
                    <BookOpen className="h-4 w-4 text-[#6EC1E4] mr-2" />
                    Índice do conteúdo
                  </h3>
                  <nav className="space-y-1">
                    {headings.map((title, index) => (
                      <a
                        key={index}
                        href={`#${title.toLowerCase().replace(/\s+/g, '-')}`}
                        className="block p-2 hover:bg-[#F0F9FF] rounded-lg transition-colors text-[#4A96D1] text-sm"
                      >
                        {title}
                      </a>
                    ))}
                  </nav>
                </div>
                
                <div className="mt-6 bg-[#F0F9FF] p-4 rounded-lg border border-[#E0E0E0]">
                  <div className="flex items-center mb-3">
                    <Info className="h-5 w-5 text-[#6EC1E4] mr-2" />
                    <h3 className="text-sm font-medium text-gray-700">Dica de estudo</h3>
                  </div>
                  <p className="text-xs text-gray-600">
                    Para melhor compreensão, estude a evolução dos reflexos e reações por idade, observe as tabelas e relacione com os conceitos teóricos.
                  </p>
                </div>
              </div>
            </motion.div>
            
            {/* Conteúdo principal */}
            <motion.div variants={childVariant} className="lg:col-span-3">
              <div className="prose prose-lg max-w-none bg-white rounded-2xl p-8 shadow-sm">
                <h1 className="text-3xl font-bold text-[#333333] mb-6">Cartilha de Desenvolvimento: 2 meses a 5 anos</h1>
                
                <div className="text-[#666666]">
                  <p>
                    Bom dia a todos! Sejam bem-vindos a mais uma aula sobre desenvolvimento infantil. Hoje, vamos mergulhar em um material muito interessante, a "Cartilha de Desenvolvimento", elaborada pelo Centers for Disease Control and Prevention (CDC) em parceria com a Sociedade Brasileira de Pediatria (SBP). Esta cartilha é uma ferramenta valiosa para nós, profissionais da saúde, e para as famílias, pois nos auxilia na identificação precoce de possíveis atrasos no neurodesenvolvimento de crianças de 2 meses a 5 anos de idade.
                  </p>

                  {/* Espaço para imagem */}
                  <div className="my-8 bg-gray-100 rounded-lg p-4 flex items-center justify-center h-64">
                    <p className="text-gray-500 italic">Imagem ilustrativa da cartilha de desenvolvimento</p>
                  </div>

                  <h2 className="text-2xl font-semibold text-[#333333] mt-8 mb-4">A Importância da Detecção Precoce</h2>
                  <p>
                    Como vocês sabem, os primeiros cinco anos de vida são cruciais para o desenvolvimento físico e mental de uma criança. É nesse período que o cérebro está mais plástico e receptivo a estímulos. Identificar precocemente qualquer atraso no desenvolvimento nos permite intervir de forma mais eficaz, maximizando o potencial da criança.
                  </p>

                  <h2 className="text-2xl font-semibold text-[#333333] mt-8 mb-4">Marcos do Desenvolvimento: Bebê aos 2 Meses</h2>
                  <p>
                    Vamos começar com os marcos do desenvolvimento aos 2 meses. Nesta idade, esperamos que o bebê apresente os seguintes comportamentos:
                  </p>
                  <ul className="list-disc pl-6 space-y-4">
                    <li>
                      <strong>Marcos Sociais/Emocionais:</strong> Acalmar-se ao ouvir a voz ou ser pego no colo, fixar o olhar no rosto de quem o carrega, demonstrar alegria ao ver alguém se aproximando e sorrir em resposta a um sorriso ou voz.
                    </li>
                    <li>
                      <strong>Marcos de Linguagem/Comunicação:</strong> Emitir sons diferentes do choro e reagir a sons altos.
                    </li>
                    <li>
                      <strong>Marcos Cognitivos:</strong> Acompanhar objetos em movimento com o olhar e fixar o olhar em um brinquedo por alguns segundos.
                    </li>
                    <li>
                      <strong>Marcos de Movimento/Desenvolvimento Físico:</strong> Manter a cabeça erguida brevemente quando colocado de bruços, mover os braços e pernas e abrir as mãos por alguns instantes.
                    </li>
                  </ul>

                  <p className="mt-4">
                    É importante lembrar que esses são apenas marcos gerais. Cada bebê se desenvolve em seu próprio ritmo. No entanto, se um bebê não está alcançando esses marcos, é importante investigar.
                  </p>

                  {/* Espaço para imagem */}
                  <div className="my-8 bg-gray-100 rounded-lg p-4 flex items-center justify-center h-64">
                    <p className="text-gray-500 italic">Imagem ilustrativa de um bebê de 2 meses</p>
                  </div>

                  <h2 className="text-2xl font-semibold text-[#333333] mt-8 mb-4">Ações e Intervenções</h2>
                  <p>
                    Se você, como pai ou profissional de saúde, tiver alguma preocupação com o desenvolvimento de um bebê de 2 meses, é fundamental agir cedo. Converse com o pediatra, compartilhe suas preocupações e questione sobre a triagem do desenvolvimento. Se necessário, peça um encaminhamento para um especialista e procure programas de intervenção precoce.
                  </p>

                  <h2 className="text-2xl font-semibold text-[#333333] mt-8 mb-4">Estimulando o Desenvolvimento aos 2 Meses</h2>
                  <p>Como podemos ajudar no desenvolvimento de um bebê de 2 meses? Aqui estão algumas dicas:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Responda positivamente aos sons e movimentos do bebê, sorria e converse com ele.</li>
                    <li>Leia e cante para o bebê para estimular a linguagem.</li>
                    <li>Dedique tempo para abraçar e segurar o bebê, transmitindo segurança e afeto.</li>
                    <li>Deite o bebê de bruços por curtos períodos, sob supervisão, para fortalecer os músculos do pescoço.</li>
                    <li>Alimente o bebê exclusivamente com leite materno ou fórmula infantil.</li>
                  </ul>

                  <h2 className="text-2xl font-semibold text-[#333333] mt-8 mb-4">Marcos do Desenvolvimento: Bebê aos 4 Meses</h2>
                  <p>Aos 4 meses, o bebê já apresenta novas habilidades:</p>
                  <ul className="list-disc pl-6 space-y-4">
                    <li>
                      <strong>Marcos Sociais/Emocionais:</strong> Sorrir espontaneamente para chamar a atenção, rir quando estimulado e emitir sons para obter atenção.
                    </li>
                    <li>
                      <strong>Marcos de Linguagem/Comunicação:</strong> Produzir sons como "oooo" e "aahh", vocalizar em resposta à fala e virar a cabeça em direção à voz.
                    </li>
                    <li>
                      <strong>Marcos Cognitivos:</strong> Abrir a boca ao ver o peito ou a mamadeira e observar as próprias mãos com interesse.
                    </li>
                    <li>
                      <strong>Marcos de Movimento/Desenvolvimento Físico:</strong> Manter a cabeça firme sem apoio, segurar um brinquedo quando colocado em sua mão, usar os braços para balançar brinquedos, levar as mãos à boca e empurrar o tronco para cima quando deitado de bruços.
                    </li>
                  </ul>

                  {/* Espaço para imagem */}
                  <div className="my-8 bg-gray-100 rounded-lg p-4 flex items-center justify-center h-64">
                    <p className="text-gray-500 italic">Imagem ilustrativa de um bebê de 4 meses</p>
                  </div>

                  <h2 className="text-2xl font-semibold text-[#333333] mt-8 mb-4">Estimulando o Desenvolvimento aos 4 Meses</h2>
                  <p>Para estimular o desenvolvimento de um bebê de 4 meses:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Responda aos sons do bebê com entusiasmo, sorrindo e falando com ele.</li>
                    <li>Ofereça oportunidades seguras para o bebê pegar e chutar brinquedos e explorar o ambiente.</li>
                    <li>Permita que o bebê coloque objetos seguros na boca para explorá-los.</li>
                    <li>Converse, leia e cante para o bebê.</li>
                    <li>Limite o tempo de tela a videochamadas com entes queridos.</li>
                    <li>Alimente o bebê exclusivamente com leite materno ou fórmula infantil.</li>
                  </ul>

                  <h2 className="text-2xl font-semibold text-[#333333] mt-8 mb-4">Marcos do Desenvolvimento: Bebê aos 6 Meses</h2>
                  <p>Aos 6 meses, o bebê demonstra maior interação e controle motor:</p>
                  <ul className="list-disc pl-6 space-y-4">
                    <li>
                      <strong>Marcos Sociais/Emocionais:</strong> Reconhecer pessoas familiares e gostar de se olhar no espelho.
                    </li>
                    <li>
                      <strong>Marcos de Linguagem/Comunicação:</strong> Fazer sons alternados com você e produzir sons agudos.
                    </li>
                    <li>
                      <strong>Marcos Cognitivos:</strong> Levar objetos à boca para explorá-los, alcançar brinquedos desejados e fechar os lábios para indicar que não quer mais comida.
                    </li>
                    <li>
                      <strong>Marcos de Movimento/Desenvolvimento Físico:</strong> Virar de bruços para cima, empurrar o corpo com os braços esticados quando deitado de bruços e apoiar-se nas mãos quando sentado.
                    </li>
                  </ul>

                  <h2 className="text-2xl font-semibold text-[#333333] mt-8 mb-4">Estimulando o Desenvolvimento aos 6 Meses</h2>
                  <p>Para estimular o desenvolvimento de um bebê de 6 meses:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Use a brincadeira de "para frente e para trás", repetindo os sons e sorrisos do bebê.</li>
                    <li>"Leia" para o bebê, mostrando fotos coloridas e falando sobre elas.</li>
                    <li>Aponte para objetos novos e nomeie-os.</li>
                    <li>Cante para o bebê e toque música.</li>
                    <li>Limite o tempo de tela a videochamadas com entes queridos.</li>
                    <li>Incentive o bebê a rolar para alcançar brinquedos.</li>
                  </ul>

                  {/* Espaço para imagem */}
                  <div className="my-8 bg-gray-100 rounded-lg p-4 flex items-center justify-center h-64">
                    <p className="text-gray-500 italic">Imagem ilustrativa de um bebê de 6 meses</p>
                  </div>

                  <h2 className="text-2xl font-semibold text-[#333333] mt-8 mb-4">Marcos do Desenvolvimento: Bebê aos 9 Meses</h2>
                  <p>Aos 9 meses, a criança começa a demonstrar timidez e reações mais claras:</p>
                  <ul className="list-disc pl-6 space-y-4">
                    <li>
                      <strong>Marcos Sociais/Emocionais:</strong> Mostrar timidez ou medo perto de estranhos, expressar diferentes emoções, atender pelo nome e reagir quando você sai.
                    </li>
                    <li>
                      <strong>Marcos de Linguagem/Comunicação:</strong> Produzir sons como "mamamama" e "babababa" e levantar os braços para ser pego.
                    </li>
                    <li>
                      <strong>Marcos Cognitivos:</strong> Procurar objetos que foram escondidos e bater duas coisas juntas.
                    </li>
                    <li>
                      <strong>Marcos de Movimento/Desenvolvimento Físico:</strong> Sentar-se sozinho, passar objetos de uma mão para a outra e usar os dedos para pegar comida.
                    </li>
                  </ul>

                  <h3 className="text-xl font-semibold text-[#333333] mt-6 mb-3">Triagem de Desenvolvimento aos 9 Meses</h3>
                  <p>Aos 9 meses, é recomendada uma triagem de desenvolvimento para todas as crianças. Converse com o pediatra sobre isso.</p>

                  <h3 className="text-xl font-semibold text-[#333333] mt-6 mb-3">Estimulando o Desenvolvimento aos 9 Meses</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Repita os sons do bebê e diga palavras simples usando esses sons.</li>
                    <li>Coloque brinquedos um pouco fora do alcance para incentivar o bebê a se mover.</li>
                    <li>Ensine o bebê a acenar "tchau" ou balançar a cabeça "não".</li>
                    <li>Brinque de "escondeu-achou".</li>
                    <li>Brinque com blocos, despejando-os e colocando-os de volta no recipiente.</li>
                  </ul>

                  <h2 className="text-2xl font-semibold text-[#333333] mt-8 mb-4">Marcos do Desenvolvimento: Bebê aos 12 Meses</h2>
                  <p>Com 12 meses, a criança já demonstra mais habilidades motoras e de comunicação:</p>
                  <ul className="list-disc pl-6 space-y-4">
                    <li>
                      <strong>Marcos Sociais/Emocionais:</strong> Brincar com você, como parceiro de jogo.
                    </li>
                    <li>
                      <strong>Marcos de Linguagem/Comunicação:</strong> Acenar "adeus", chamar "mamã" ou "papá" e entender o "não".
                    </li>
                    <li>
                      <strong>Marcos Cognitivos:</strong> Colocar objetos em um recipiente e procurar coisas que você esconde.
                    </li>
                    <li>
                      <strong>Marcos de Movimento/Desenvolvimento Físico:</strong> Puxar para cima para ficar em pé, caminhar segurando nos móveis, beber de um copo sem tampa (com ajuda) e pegar coisas entre o polegar e o indicador.
                    </li>
                  </ul>

                  {/* Espaço para imagem */}
                  <div className="my-8 bg-gray-100 rounded-lg p-4 flex items-center justify-center h-64">
                    <p className="text-gray-500 italic">Imagem ilustrativa de um bebê de 12 meses</p>
                  </div>

                  <h2 className="text-2xl font-semibold text-[#333333] mt-8 mb-4">Estimulando o Desenvolvimento aos 12 Meses</h2>
                  <p>Para estimular o desenvolvimento de um bebê de 12 meses:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Ensine comportamentos desejados, mostrando o que fazer e elogiando quando a criança realiza a ação.</li>
                    <li>Fale ou cante sobre o que você está fazendo.</li>
                    <li>Dê significado ao que o bebê tenta dizer.</li>
                    <li>Redirecione a criança quando ela estiver fazendo algo que você não quer que ela faça.</li>
                    <li>Ofereça lugares seguros para explorar.</li>
                  </ul>

                  <h2 className="text-2xl font-semibold text-[#333333] mt-8 mb-4">Marcos do Desenvolvimento: Criança aos 15 Meses</h2>
                  <p>Aos 15 meses, a criança demonstra maior capacidade de imitação e interação social:</p>
                  <ul className="list-disc pl-6 space-y-4">
                    <li>
                      <strong>Marcos Sociais/Emocionais:</strong> Imitar outras crianças, mostrar objetos que gosta, bater palmas e abraçar bonecas ou brinquedos.
                    </li>
                    <li>
                      <strong>Marcos de Linguagem/Comunicação:</strong> Tentar dizer uma ou duas palavras além de "mamã" ou "dada", olhar para objetos familiares quando você os nomeia e seguir instruções simples com gestos e palavras.
                    </li>
                    <li>
                      <strong>Marcos Cognitivos:</strong> Tentar usar objetos da maneira correta e empilhar pelo menos dois objetos pequenos.
                    </li>
                    <li>
                      <strong>Marcos de Movimento/Desenvolvimento Físico:</strong> Dar alguns passos sozinho e usar os dedos para se alimentar.
                    </li>
                  </ul>

                  <h2 className="text-2xl font-semibold text-[#333333] mt-8 mb-4">Estimulando o Desenvolvimento aos 15 Meses</h2>
                  <p>Para estimular o desenvolvimento de uma criança de 15 meses:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Ajude a criança a aprender a falar, repetindo e expandindo o que ela diz.</li>
                    <li>Diga os nomes dos objetos quando a criança apontar para eles.</li>
                    <li>Encontre maneiras de deixar a criança ajudar com as atividades cotidianas.</li>
                    <li>Mantenha rotinas consistentes para dormir e se alimentar.</li>
                    <li>Cante músicas com gestos.</li>
                  </ul>

                  {/* Espaço para imagem */}
                  <div className="my-8 bg-gray-100 rounded-lg p-4 flex items-center justify-center h-64">
                    <p className="text-gray-500 italic">Imagem ilustrativa de uma criança de 15 meses</p>
                  </div>

                  <h3 className="text-xl font-semibold text-[#333333] mt-6 mb-3">Triagem de Desenvolvimento aos 18 Meses</h3>
                  <p>Aos 18 meses, é recomendada uma triagem geral de desenvolvimento e uma triagem de autismo.</p>

                  <h2 className="text-2xl font-semibold text-[#333333] mt-8 mb-4">Marcos do Desenvolvimento: Criança aos 18 Meses</h2>
                  <p>Aos 18 meses, a criança começa a demonstrar mais independência:</p>
                  <ul className="list-disc pl-6 space-y-4">
                    <li>
                      <strong>Marcos Sociais/Emocionais:</strong> Afastar-se de você, mas certificar-se de que você está por perto, apontar para mostrar algo interessante e ajudar a se vestir.
                    </li>
                    <li>
                      <strong>Marcos de Linguagem/Comunicação:</strong> Tentar dizer três ou mais palavras além de "mamãe" ou "papai" e seguir instruções simples sem gestos.
                    </li>
                    <li>
                      <strong>Marcos Cognitivos:</strong> Copiar você fazendo tarefas e brincar com brinquedos de maneira simples.
                    </li>
                    <li>
                      <strong>Marcos de Movimento/Desenvolvimento Físico:</strong> Caminhar sem se segurar, rabiscar, beber em um copo sem tampa (com derramamentos), alimentar-se com os dedos e subir e descer de móveis sem ajuda.
                    </li>
                  </ul>

                  <h2 className="text-2xl font-semibold text-[#333333] mt-8 mb-4">Estimulando o Desenvolvimento aos 18 Meses</h2>
                  <p>Para estimular o desenvolvimento de uma criança de 18 meses:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Use palavras positivas e dê mais atenção aos comportamentos que você quer que a criança apresente.</li>
                    <li>Incentive a brincadeira de "faz-de-conta".</li>
                    <li>Ajude a criança a aprender sobre os sentimentos dos outros e sobre formas positivas de se conectar.</li>
                    <li>Faça perguntas simples para ajudar a criança a pensar sobre o que está ao seu redor.</li>
                    <li>Dê escolhas simples.</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-[#333333] mt-6 mb-3">Triagem de Desenvolvimento aos 2 Anos</h3>
                  <p>Aos 2 anos, é recomendada uma triagem geral de desenvolvimento e uma triagem de autismo.</p>

                  <h2 className="text-2xl font-semibold text-[#333333] mt-8 mb-4">Marcos do Desenvolvimento: Criança aos 2 Anos</h2>
                  <p>Aos 2 anos, a criança demonstra maior capacidade de combinar palavras e imitar ações:</p>
                  <ul className="list-disc pl-6 space-y-4">
                    <li>
                      <strong>Marcos Sociais/Emocionais:</strong> Perceber quando os outros estão magoados ou chateados e olhar para o seu rosto para ver como reagir em novas situações.
                    </li>
                    <li>
                      <strong>Marcos de Linguagem/Comunicação:</strong> Apontar para coisas em um livro quando você pergunta, dizer pelo menos duas palavras juntas e apontar para partes do corpo quando solicitado.
                    </li>
                    <li>
                      <strong>Marcos Cognitivos:</strong> Segurar algo em uma mão enquanto usa a outra e tentar usar interruptores, botões ou botões em um brinquedo.
                    </li>
                    <li>
                      <strong>Marcos de Movimento/Desenvolvimento Físico:</strong> Chutar uma bola, correr e subir escadas (com ou sem ajuda).
                    </li>
                  </ul>

                  {/* Espaço para imagem */}
                  <div className="my-8 bg-gray-100 rounded-lg p-4 flex items-center justify-center h-64">
                    <p className="text-gray-500 italic">Imagem ilustrativa de uma criança de 2 anos</p>
                  </div>

                  <h2 className="text-2xl font-semibold text-[#333333] mt-8 mb-4">Estimulando o Desenvolvimento aos 2 Anos</h2>
                  <p>Para estimular o desenvolvimento de uma criança de 2 anos:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Ajude a criança a aprender como as palavras soam.</li>
                    <li>Observe a criança durante as brincadeiras, mostrando como compartilhar e resolver problemas.</li>
                    <li>Peça à criança para ajudá-lo a preparar a hora da refeição.</li>
                    <li>Dê bolas para a criança chutar, rolar e jogar.</li>
                    <li>Dê brinquedos que ensinem a criança como fazer as coisas funcionarem e como resolver problemas.</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-[#333333] mt-6 mb-3">Triagem de Desenvolvimento aos 30 Meses</h3>
                  <p>Aos 30 meses, é recomendada uma triagem geral de desenvolvimento.</p>

                  <h2 className="text-2xl font-semibold text-[#333333] mt-8 mb-4">Marcos do Desenvolvimento: Criança aos 30 Meses</h2>
                  <p>Aos 30 meses, a criança demonstra maior capacidade de seguir rotinas e nomear objetos:</p>
                  <ul className="list-disc pl-6 space-y-4">
                    <li>
                      <strong>Marcos Sociais/Emocionais:</strong> Brincar ao lado de outras crianças e seguir rotinas simples quando solicitado.
                    </li>
                    <li>
                      <strong>Marcos de Linguagem/Comunicação:</strong> Falar cerca de 50 palavras, dizer duas ou mais palavras com uma palavra de ação e nomear coisas em um livro quando você aponta e pergunta.
                    </li>
                    <li>
                      <strong>Marcos Cognitivos:</strong> Usar coisas para fingir, mostrar habilidades simples de resolução de problemas e seguir instruções de duas etapas.
                    </li>
                    <li>
                      <strong>Marcos de Movimento/Desenvolvimento Físico:</strong> Usar as mãos para torcer coisas, tirar algumas roupas sozinho e pular do chão com os dois pés.
                    </li>
                  </ul>

                  <h2 className="text-2xl font-semibold text-[#333333] mt-8 mb-4">Estimulando o Desenvolvimento aos 30 Meses</h2>
                  <p>Para estimular o desenvolvimento de uma criança de 30 meses:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Incentive a "brincadeira livre".</li>
                    <li>Use palavras positivas e dê mais atenção aos comportamentos que você espera.</li>
                    <li>Dê opções alimentares simples e saudáveis.</li>
                    <li>Faça perguntas simples sobre livros e histórias.</li>
                    <li>Ajude a criança a aprender a brincar com outras crianças.</li>
                    <li>Deixe a criança "desenhar" com diferentes materiais.</li>
                  </ul>

                  {/* Espaço para imagem */}
                  <div className="my-8 bg-gray-100 rounded-lg p-4 flex items-center justify-center h-64">
                    <p className="text-gray-500 italic">Imagem ilustrativa de uma criança de 30 meses</p>
                  </div>

                  <h2 className="text-2xl font-semibold text-[#333333] mt-8 mb-4">Marcos do Desenvolvimento: Criança aos 3 Anos</h2>
                  <p>Aos 3 anos, a criança demonstra maior capacidade de interação e comunicação:</p>
                  <ul className="list-disc pl-6 space-y-4">
                    <li>
                      <strong>Marcos Sociais/Emocionais:</strong> Acalmar-se após se separar dos pais e observar outras crianças e se juntar a elas para brincar.
                    </li>
                    <li>
                      <strong>Marcos de Linguagem/Comunicação:</strong> Conversar com você usando pelo menos duas trocas de turno, perguntar "quem", "o quê", "onde" ou "por quê" e dizer o que está acontecendo em uma imagem ou livro.
                    </li>
                    <li>
                      <strong>Marcos Cognitivos:</strong> Desenhar um círculo quando você mostra como e evitar tocar objetos quentes quando você o avisa.
                    </li>
                    <li>
                      <strong>Marcos de Movimento/Desenvolvimento Físico:</strong> Alinhar itens juntos, vestir algumas roupas sozinho e usar um garfo.
                    </li>
                  </ul>

                  <h2 className="text-2xl font-semibold text-[#333333] mt-8 mb-4">Estimulando o Desenvolvimento aos 3 Anos</h2>
                  <p>Para estimular o desenvolvimento de uma criança de 3 anos:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Incentive a criança a resolver seus próprios problemas com seu apoio.</li>
                    <li>Fale sobre as emoções da criança e dê-lhe palavras para ajudá-lo a explicar como está se sentindo.</li>
                    <li>Defina algumas regras simples e claras que a criança pode seguir.</li>
                    <li>Leia com a criança, fazendo perguntas sobre a história.</li>
                    <li>Jogue jogos de contar.</li>
                    <li>Ajude a criança a desenvolver suas habilidades linguísticas, falando com ela em frases mais longas e usando palavras reais.</li>
                  </ul>

                  {/* Espaço para imagem */}
                  <div className="my-8 bg-gray-100 rounded-lg p-4 flex items-center justify-center h-64">
                    <p className="text-gray-500 italic">Imagem ilustrativa de uma criança de 3 anos</p>
                  </div>

                  <h2 className="text-2xl font-semibold text-[#333333] mt-8 mb-4">Marcos do Desenvolvimento: Criança aos 4 Anos</h2>
                  <p>Aos 4 anos, a criança demonstra maior capacidade de fingir, confortar e evitar perigos:</p>
                  <ul className="list-disc pl-6 space-y-4">
                    <li>
                      <strong>Marcos Sociais/Emocionais:</strong> Fingir ser um personagem ao brincar, pedir para brincar com outras crianças e confortar os outros que estão feridos ou tristes.
                    </li>
                    <li>
                      <strong>Marcos de Linguagem/Comunicação:</strong> Dizer frases com quatro ou mais palavras, dizer algumas palavras de uma canção, história ou rima infantil e falar sobre algo que aconteceu durante o seu dia.
                    </li>
                    <li>
                      <strong>Marcos Cognitivos:</strong> Nomear algumas cores de objetos, contar o que vem a seguir em uma história bem conhecida e desenhar uma pessoa com três ou mais partes do corpo.
                    </li>
                    <li>
                      <strong>Marcos de Movimento/Desenvolvimento Físico:</strong> Pegar uma bola grande na maior parte do tempo, servir a si mesmo comida ou água (com supervisão), desabotoar alguns botões e segurar um lápis ou caneta entre os dedos e o polegar.
                    </li>
                  </ul>

                  <h2 className="text-2xl font-semibold text-[#333333] mt-8 mb-4">Estimulando o Desenvolvimento aos 4 Anos</h2>
                  <p>Para estimular o desenvolvimento de uma criança de 4 anos:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Ajude a criança a estar pronta para novos lugares e conhecer novas pessoas.</li>
                    <li>Leia com a criança, fazendo perguntas sobre a história.</li>
                    <li>Ajude a criança a aprender sobre cores, formas e tamanhos.</li>
                    <li>Incentive a criança a usar "suas palavras" para pedir coisas e resolver problemas.</li>
                    <li>Ajude a criança a aprender sobre os sentimentos dos outros e sobre maneiras positivas de reagir.</li>
                  </ul>

                  <h2 className="text-2xl font-semibold text-[#333333] mt-8 mb-4">Marcos do Desenvolvimento: Criança aos 5 Anos</h2>
                  <p>Aos 5 anos, a criança demonstra maior capacidade de seguir regras, contar histórias e reconhecer letras:</p>
                  <ul className="list-disc pl-6 space-y-4">
                    <li>
                      <strong>Marcos Sociais/Emocionais:</strong> Seguir regras ou se revezar ao brincar com outras crianças, cantar, dançar ou atuar para você e fazer tarefas simples em casa.
                    </li>
                    <li>
                      <strong>Marcos de Linguagem/Comunicação:</strong> Contar uma história que ouviu ou inventou com pelo menos dois eventos, responder perguntas simples sobre um livro ou história e manter uma conversa com mais de três trocas de ideias.
                    </li>
                    <li>
                      <strong>Marcos Cognitivos:</strong> Contar até 10, nomear alguns números entre 1 e 5, usar palavras sobre o tempo e prestar atenção durante 5 a 10 minutos durante as atividades.
                    </li>
                    <li>
                      <strong>Marcos de Movimento/Desenvolvimento Físico:</strong> Abotoar alguns botões e pular em um pé.
                    </li>
                  </ul>

                  {/* Espaço para imagem */}
                  <div className="my-8 bg-gray-100 rounded-lg p-4 flex items-center justify-center h-64">
                    <p className="text-gray-500 italic">Imagem ilustrativa de uma criança de 5 anos</p>
                  </div>

                  <h2 className="text-2xl font-semibold text-[#333333] mt-8 mb-4">Estimulando o Desenvolvimento aos 5 Anos</h2>
                  <p>Para estimular o desenvolvimento de uma criança de 5 anos:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Limite a atenção que você dá às palavras negativas.</li>
                    <li>Pergunte à criança sobre o que ele está brincando.</li>
                    <li>Brinque com brinquedos que incentivam a criança a montar coisas.</li>
                    <li>Use palavras para ajudar a criança a começar a entender o tempo.</li>
                    <li>Deixe a criança fazer as coisas por si mesmo, mesmo que ele não faça isso perfeitamente.</li>
                  </ul>

                  <h2 className="text-2xl font-semibold text-[#333333] mt-8 mb-4">Considerações Finais</h2>
                  <p>
                    Lembrem-se, esta cartilha é apenas um guia. Cada criança é única e se desenvolve em seu próprio ritmo. O mais importante é estarmos atentos aos sinais e agirmos cedo se tivermos alguma preocupação. Ao trabalharmos juntos, profissionais de saúde e famílias, podemos garantir que todas as crianças tenham a oportunidade de atingir seu pleno potencial.
                  </p>
                  <p className="mt-4">
                    Além disso, a cartilha apresenta a diretoria plena e de publicações da Sociedade Brasileira de Pediatria, assim como os departamentos científicos e grupos de trabalho que a compõem.
                  </p>
                  <p className="mt-4">
                    Espero que esta aula tenha sido útil. Se tiverem alguma dúvida, por favor, não hesitem em perguntar.
                  </p>
                </div>
              </div>
              
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link
                  href="/provas"
                  className="px-6 py-4 bg-gradient-to-r from-[#6EC1E4] to-[#4A96D1] text-white rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center transform hover:-translate-y-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Testar Conhecimentos
                </Link>

                <Link
                  href="/pediatria"
                  className="px-6 py-4 bg-white border border-[#6EC1E4] text-[#6EC1E4] rounded-lg hover:bg-[#F0F9FF] transition-colors flex items-center justify-center transform hover:-translate-y-1 hover:shadow-md"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                  </svg>
                  Explorar Outros Temas
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}