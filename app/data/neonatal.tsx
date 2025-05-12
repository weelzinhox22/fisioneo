import { Baby } from "lucide-react"
import { ReactNode } from "react"

export interface Neonatal {
  id: string
  title: string
  description: string
  icon: ReactNode
  content: string
  images?: {
    src: string
    alt: string
    caption?: string
  }[]
}

export const neonatal: Neonatal[] = [
  {
    id: "escala-avaliacao-neonatal",
    title: "Escala de avaliação neonatal",
    description: "Instrumentos de avaliação do desenvolvimento de prematuros",
    icon: <Baby className="h-10 w-10 text-[#6EC1E4]" />,
    images: [
      {
        src: "/images/neonatal/avaliacao-neonatal.jpg",
        alt: "Avaliação neonatal",
        caption: "Avaliação do desenvolvimento em recém-nascidos prematuros"
      }
    ],
    content: `
      <h2 id="introducao" class="text-3xl font-bold text-[#4A96D1] mb-6">Instrumentos de avaliação do desenvolvimento de prematuros</h2>
      
      <p class="text-gray-700">O artigo "Instrumentos de avaliação do desenvolvimento de prematuros" revisa a importância da avaliação do desenvolvimento infantil em recém-nascidos prematuros, devido ao aumento da sobrevivência desses bebês proporcionada pelos avanços nos cuidados intensivos neonatais. O objetivo é identificar os principais instrumentos para avaliar o desenvolvimento de bebês prematuros. A pesquisa utilizou diversas bases de dados como Medline, Lilacs e Scielo, buscando desde os instrumentos mais antigos até os mais recentes, sem limite de tempo. Foram identificados 11 instrumentos de avaliação do desenvolvimento, publicados entre 1947 e 1994. O conhecimento sobre essas escalas e testes pode auxiliar profissionais de saúde e pesquisadores que trabalham com o desenvolvimento de crianças prematuras, sendo uma ferramenta adicional no processo de avaliação. A escolha do instrumento deve ser feita de acordo com as necessidades de cada criança, podendo ser utilizado para triagem, diagnóstico, planejamento e acompanhamento do tratamento.</p>

      <p class="text-gray-700">Os avanços tecnológicos nas Unidades de Terapia Intensiva Neonatal (UTIN) aumentaram a sobrevivência de prematuros, gerando preocupações sobre o desenvolvimento dessas crianças a curto e longo prazo. Esse aumento despertou o interesse de pesquisadores em investigar o desenvolvimento neuropsicomotor desses bebês. O acompanhamento desse desenvolvimento em recém-nascidos de risco, como os prematuros, permite a detecção precoce de anormalidades e o encaminhamento para tratamento específico, atuando de forma preventiva. O diagnóstico precoce continua sendo um desafio para os profissionais de saúde, exigindo uma avaliação e compreensão precisas de qualquer atraso no desenvolvimento. A intervenção precoce no desenvolvimento motor do RN prematuro é importante para estimular a criança a desenvolver suas capacidades plenamente, limitando sequelas e invalidez. A avaliação do desenvolvimento motor faz parte do protocolo de seguimento de pacientes que passaram pela UTIN, com diversas ferramentas para auxiliar os profissionais a fazer uma avaliação funcional mais precisa. Na avaliação do desenvolvimento neuropsicomotor, é crucial utilizar escalas confiáveis, com sensibilidade e especificidade comprovadas, que representem a diversidade cultural dos indivíduos.</p>
      
      <p class="text-gray-700">Existem vários instrumentos padronizados que auxiliam na identificação de crianças de risco, usados tanto em estudos para verificar sua eficácia, quanto na prática clínica em programas de <i>follow-up</i>. Esses testes e escalas de desenvolvimento facilitam a triagem, o diagnóstico, o planejamento e a progressão do tratamento, caso alguma anormalidade seja detectada. Portanto, o profissional deve estar familiarizado com os diversos instrumentos de avaliação existentes para selecionar o mais adequado para seu serviço ou pesquisa. No Brasil, a escassez de instrumentos de avaliação padronizados e validados para essa população agrava o desafio do diagnóstico de alterações motoras, sendo necessário o uso de testes e escalas internacionais, cujos manuais e protocolos estão, em sua maioria, em inglês. O objetivo é descrever os principais instrumentos de avaliação do desenvolvimento infantil aplicáveis aos recém-nascidos prematuros.</p>

      <p class="text-gray-700">A pesquisa foi realizada nas bases de dados Medline, Lilacs, Scielo, Plataforma CAPES, PubMed e Google Scholar, utilizando palavras-chave como "desenvolvimento neuropsicomotor", "instrumentos de avaliação do desenvolvimento", "programas de acompanhamento" e "prematuridade" em português e inglês. Foram incluídos artigos sobre avaliação do desenvolvimento neuropsicomotor de prematuros, publicados em inglês e português, e excluídos artigos de intervenção, revisão e trabalhos que não incluíram recém-nascidos prematuros. Livros das áreas de Neonatologia e Pediatria, além de manuais sobre os principais instrumentos de avaliação do desenvolvimento da criança, foram utilizados para complementar a pesquisa. Os manuais foram incluídos por apresentarem maiores detalhes sobre os instrumentos. Não foi estabelecido limite de tempo para identificar desde os instrumentos mais antigos até os publicados recentemente. As informações coletadas foram organizadas de acordo com a ordem cronológica de publicação dos instrumentos, levantando informações como objetivo do teste ou escala, comportamentos ou itens avaliados, faixa etária específica, propriedades psicométricas e limitações quanto à aplicação.</p>
      
      <p class="text-gray-700">A revisão identificou 11 instrumentos de avaliação do desenvolvimento neuropsicomotor indicados para avaliação e acompanhamento de prematuros. Com base no levantamento dos principais instrumentos de avaliação, verifica-se a existência de 11 tipos de instrumentos de avaliação do desenvolvimento de crianças de zero a dois anos de idade. O teste mais antigo foi publicado em 1947 (Teste de Gesell) e o mais recente publicado em 1994 (Escala Motora de Alberta).</p>

      <h3 class="text-2xl text-[#6EC1E4] mt-10 mb-4 font-semibold">Instrumentos de Avaliação</h3>

      <p class="text-gray-700">A <strong class="text-[#4A96D1] font-semibold">Tabela 1</strong> apresenta os instrumentos de avaliação do desenvolvimento neuropsicomotor de recém-nascidos prematuros, incluindo o tipo de teste, autor e ano de publicação, faixa etária e descrição do teste. Os testes listados são:</p>
      
      <ul class="mt-4 mb-6">
        <li class="flex items-start my-1.5"><strong class="text-[#4A96D1] font-semibold">Teste de Gesell</strong> <span class="text-gray-700">(Arnold Gesell e colaboradores, 1947): Avaliação direta da qualidade e integração de comportamentos em áreas como comportamento adaptativo, motor, linguagem e pessoal-social, para crianças de 4 semanas a 36 meses.</span></li>
        
        <li class="flex items-start my-1.5"><strong class="text-[#4A96D1] font-semibold">Escala de Desenvolvimento Infantil de Bayley (BSID)</strong> <span class="text-gray-700">(Nancy Bayley, 1969): Teste padronizado para avaliar o desenvolvimento motor, cognitivo, de linguagem e comportamental de crianças de 1 a 42 meses, utilizado na intervenção precoce e pesquisa clínica, necessitando de treinamento específico.</span></li>
        
        <li class="flex items-start my-1.5"><strong class="text-[#4A96D1] font-semibold">Teste Denver</strong> <span class="text-gray-700">(William Frankenburg e Josiah Dodds, 1967): Teste padronizado para avaliar aspectos pessoal-social, motor fino adaptativo, linguagem e motor grosseiro de crianças de 1 semana a 6 anos e meio, utilizado para diagnosticar atraso no desenvolvimento, embora com fraca especificidade.</span></li>
        
        <li class="flex items-start my-1.5"><strong class="text-[#4A96D1] font-semibold">Teste de Triagem Sobre o Desenvolvimento de Milani-Comparetti</strong> <span class="text-gray-700">(Milani Comparetti e Gidoni, 1967): Teste de investigação padronizado de comportamentos motores espontâneos e respostas evocadas em crianças de 0 a 2 anos, útil para descrever o desenvolvimento baseado na integração de reflexos primitivos para o controle postural.</span></li>
        
        <li class="flex items-start my-1.5"><strong class="text-[#4A96D1] font-semibold">Gráfico do Desenvolvimento Motor de Zdanska - Brincken</strong> <span class="text-gray-700">(Zdanska-Brincken e Wolanski, 1969): Avalia o controle postural de crianças no 1º ano de vida, detalhando as mudanças no desenvolvimento em movimentos da cabeça e tronco, postura sentada, bípede e locomoção.</span></li>
        
        <li class="flex items-start my-1.5"><strong class="text-[#4A96D1] font-semibold">Escala de Avaliação do Comportamento do Neonato (NBAS)</strong> <span class="text-gray-700">(T. Berry Brazelton e J. Kelvi Nugent, 1973): Teste para recém-nascidos pré-termo com 37-48 semanas pós-concepção, baseado em critérios de habituação, resposta oromotora, função vestibular e de tronco, comportamentos e interação social, fornecendo informações sobre os padrões interativos das crianças.</span></li>
        
        <li class="flex items-start my-1.5"><strong class="text-[#4A96D1] font-semibold">Avaliação dos Movimentos da Criança (MAI)</strong> <span class="text-gray-700">(Lynnette Chandler, Mary Andrews e Marcia Sanson, 1980): Teste para crianças de 0-12 meses, baseado em critérios para tônus muscular, reflexos, reações automáticas e movimento voluntário, calculando o valor de risco para identificar RN com disfunção motora.</span></li>
        
        <li class="flex items-start my-1.5"><strong class="text-[#4A96D1] font-semibold">Avaliação Neurológica de Bebês Prematuros e a Termo</strong> <span class="text-gray-700">(Lilly Dubowitz e Victor Dubowitz, 1981): Teste para bebês a termo até 3 dias de vida e pré-termo estáveis, baseado em critérios de maturação neurológica, testando habituação, movimento, tônus, reflexos e respostas comportamentais para determinar maturação e desvios neurológicos.</span></li>
        
        <li class="flex items-start my-1.5"><strong class="text-[#4A96D1] font-semibold">Peabody Developmental Motor Scale (Escala PDMS)</strong> <span class="text-gray-700">(Rhonda Folio e Rebecca Fewell, 1982): Teste padronizado para avaliação das habilidades motoras grosseiras e finas divididas em reflexos, estática, locomoção, manipulação de objetos, garra e integração visuomotora em crianças de 1-72 meses, útil em programas de intervenção precoce.</span></li>
        
        <li class="flex items-start my-1.5"><strong class="text-[#4A96D1] font-semibold">TIMP (Test of Infant Motor Performance)</strong> <span class="text-gray-700">(Suzann Campbell, 1993): Avalia movimentos funcionais da cabeça e controle do tronco nas posições em prono, supino e de pé, com 28 itens avaliados em dicotomia e 31 itens escalonados, em bebês pré-termo nascidos com 34 semanas pós-concepção e até 4 meses após o nascimento, identificando RN com risco de resultado motor pobre.</span></li>
        
        <li class="flex items-start my-1.5"><strong class="text-[#4A96D1] font-semibold">Alberta Infant Motor Scale (AIMS)</strong> <span class="text-gray-700">(Martha Piper e Johanna Darrah, 1994): Teste padronizado na observação das habilidades motoras grosseiras em quatro posições (prono, supino, sentada e de pé) em crianças de 0 a 18 meses, identificando RN com atraso motor e avaliando a maturação da habilidade motora grosseira.</span></li>
      </ul>

      <h3 id="teste-gesell" class="text-2xl text-[#6EC1E4] mt-10 mb-4 font-semibold">Teste de Gesell</h3>

      <p class="text-gray-700">O Teste de Gesell, elaborado por Arnold Gesell e colaboradores na década de 1920, avalia o comportamento da criança durante o desenvolvimento para diagnosticar desvios. O teste, atualizado como Escala de Desenvolvimento de Gesell e Amatruda, envolve a avaliação direta e observação da qualidade e integração de comportamentos em crianças de quatro semanas a 36 meses de idade cronológica. As categorias de análise incluem comportamento adaptativo (organização e adaptação sensório-motora, cognição), comportamento motor grosseiro e delicado (sustentação da cabeça, sentar, engatinhar, andar, manipulação de objetos), comportamento de linguagem (expressiva ou receptiva) e comportamento pessoal-social (relação com o meio-ambiente). Os comportamentos são observados em idades-chave como quatro semanas, 16 semanas, 28 semanas, 40 semanas, 12 meses, 18 meses, 24 meses e 36 meses. O resultado final é quantitativo e expresso como quociente de desenvolvimento (QD), utilizando a idade corrigida para prematuros. Os dados são comparados a uma escala elaborada a partir de comportamentos padrão apresentados por crianças em determinadas faixas etárias. O teste apresenta boa confiabilidade e validade, sendo um bom instrumento diagnóstico utilizado em pesquisas e centros de reabilitação. No entanto, não considera a movimentação espontânea do RN, sua qualidade de movimentos, e baseia-se na teoria neuromaturacional do desenvolvimento.</p>

      <h3 id="escala-bayley" class="text-2xl text-[#6EC1E4] mt-10 mb-4 font-semibold">Escala de Desenvolvimento Infantil de Bayley (BSID)</h3>

      <p class="text-gray-700">As Escalas de Desenvolvimento Infantil de Bayley (BSID), originalmente publicadas em 1933 e revisadas em 1969, são consideradas possuidoras de propriedades psicométricas para avaliação do desenvolvimento infantil, sendo padronizadas com referências normativas para crianças pequenas. Desenvolvidas por Nancy Bayley e colaboradores, as escalas são um meio abrangente de avaliar o estado de desenvolvimento de uma criança, resultado de mais de 40 anos de pesquisa e prática clínica com crianças pequenas. O teste foi padronizado em uma amostra de 1262 crianças americanas com idade de dois a 30 meses, divididas em 14 grupos, no ano de 1960, e apresenta três versões: BSID I (1969), BSID II (1983) e BSID III (2006). As escalas BSID II são reconhecidas como umas das melhores na área de avaliação do desenvolvimento infantil, fornecendo resultados confiáveis, válidos e precisos. Sua utilização como instrumento de pesquisa tem grande suporte da comunidade científica, mas seu elevado custo e o treino exigido para correta administração restringem seu uso a especialistas que trabalham com crianças pequenas. A BSID-III corresponde à Escala de Bayley – III e ao Teste de Triagem Bayley–III (Screeningtest), subdividido em cinco domínios: Cognição, Linguagem (comunicação expressiva e receptiva), Motor (grosso e fino), Social-emocional e Componente adaptativo. Os três primeiros domínios são observados com a criança em situação de teste, e os dois últimos são observados por meio de questionários preenchidos pelos pais ou cuidadores. A Escala de Bayley – III é uma atualização dos dados normativos da BSID-II com amostra contemporânea e representativa, indicada para avaliar crianças de um a 42 meses de idade, apresentando melhora do conteúdo dos testes, da qualidade psicométrica e, consequentemente, maior utilidade clínica. Dentre os domínios, a Escala Cognitiva determina como a criança pensa, reage e aprende sobre o mundo ao seu redor e está composta de 91 itens; a Escala de Linguagem está subdividida em dois subtipos: Comunicação Receptiva (49 itens) e Comunicação Expressiva (48 itens). A Escala Motora está subdividida em Escala Motora Grossa (72 itens) e Fina (66 itens). A utilização dessa escala no Brasil é possível, porém, com limitações, pois ainda não se dispõe de validação para nossa população e cultura. Outras limitações importantes são que a escala só pode ser aplicada por profissionais especializados e treinados, e o examinador deve ser cauteloso na aplicação da mesma em RN pré-termo.</p>
      
      <h3 id="teste-denver" class="text-2xl text-[#6EC1E4] mt-10 mb-4 font-semibold">Teste Denver</h3>

      <p class="text-gray-700">O Teste Denver, desenvolvido por Frankenburg e Dodds em 1967, tem como objetivo direcionar o cuidado dos adultos para crianças com riscos, e não diagnosticar atrasos no desenvolvimento. Seu uso foi difundido em muitos países, sofrendo adaptações, o que resultou no Teste Denver II em 1992. O teste pode ser aplicado por vários profissionais da saúde em crianças de zero a seis anos, classificando-as dicotomicamente em risco ou normal. É composto por 125 itens distribuídos na avaliação de quatro áreas distintas do desenvolvimento neuropsicomotor: motricidade ampla, motricidade fina-adaptativa, comportamento pessoal-social e linguagem. Os itens são registrados por meio da observação direta da criança e, para alguns deles, solicita-se que a mãe informe se o filho realiza ou não determinada tarefa. O Teste Denver II apresenta bons índices de validade e confiabilidade (0,99 interobservador e 0,9 em teste reteste), sendo largamente utilizado tanto em pesquisas quanto na prática clínica. O teste é considerado de fácil execução e oferece um manual para treinamento e orientações quanto a sua utilização. Pode ser aplicado por vários profissionais da saúde e, por isso, é um dos testes mais utilizados na triagem de atrasos, inclusive no Brasil, apesar de não ser validado para a população brasileira, uma adaptação cultural, não formal, foi realizada a fim de facilitar a sua aplicação. Outra vantagem é a larga faixa etária que o teste atinge, possibilitando o acompanhamento prolongado do desenvolvimento infantil. Esta nova versão do teste também foi normatizada e validada cuidadosamente para a população do Colorado, EUA, e parece demonstrar maior sensibilidade na identificação de atraso em relação à primeira versão, especialmente na área da linguagem. Uma das desvantagens ressaltadas pelos pesquisadores é que, como o teste não foi criado para diagnosticar atrasos, mas para direcionar os cuidados com a criança, ele oferece resultados com pouco valor prognóstico, especialmente nos casos em que o número de respostas falhas é pequeno. Apesar de o teste abranger uma larga faixa etária e permitir o acompanhamento longitudinal do desenvolvimento, parece ser insuficiente para avaliar mudanças qualitativas ao longo do tempo e detectar precocemente alterações psicomotoras sutis.</p>
      
      <h3 id="consideracoes-finais" class="text-2xl text-[#6EC1E4] mt-10 mb-4 font-semibold">Considerações Finais</h3>

      <p class="text-gray-700">Muitos testes são utilizados para triagem e diagnóstico de anormalidades do desenvolvimento de prematuros, identificando-se, neste estudo, 11 testes como sendo mais indicados na avaliação de prematuros. Cada instrumento abordado na presente pesquisa apresenta vantagens e desvantagens, sendo que o examinador deve escolher o exame mais adequado aos seus objetivos, seja na sua utilização em pesquisas, triagem clínica ou na verificação da eficiência da intervenção precoce proposta. Além disso, devem estar atentos às propriedades psicométricas, pois bons escores de confiabilidade e validade são determinantes na eficácia do teste, principalmente quando aplicados em determinada faixa etária, já que alguns instrumentos são mais confiáveis e preditivos quando aplicados em determinadas idades ou condições clínicas.</p>
      
      <div class="my-8 p-6 bg-[#F0F9FF] border border-[#E0E0E0] rounded-xl shadow-sm">
        <h3 class="text-xl font-semibold text-[#4A96D1] mb-4">Pontos importantes</h3>
        <ul class="space-y-2">
          <li class="flex items-start">
            <span class="text-[#6EC1E4] mr-2">•</span>
            <span class="text-gray-700">Os avanços nas UTINs aumentaram a sobrevivência de prematuros, tornando essencial a avaliação do seu desenvolvimento neuropsicomotor</span>
          </li>
          <li class="flex items-start">
            <span class="text-[#6EC1E4] mr-2">•</span>
            <span class="text-gray-700">A detecção precoce de anormalidades permite intervenção rápida, minimizando sequelas e potencializando o desenvolvimento</span>
          </li>
          <li class="flex items-start">
            <span class="text-[#6EC1E4] mr-2">•</span>
            <span class="text-gray-700">Os 11 instrumentos identificados possuem características específicas adaptadas a diferentes idades e objetivos de avaliação</span>
          </li>
          <li class="flex items-start">
            <span class="text-[#6EC1E4] mr-2">•</span>
            <span class="text-gray-700">A escolha do instrumento deve considerar os objetivos específicos: triagem, diagnóstico ou acompanhamento</span>
          </li>
          <li class="flex items-start">
            <span class="text-[#6EC1E4] mr-2">•</span>
            <span class="text-gray-700">No Brasil, há escassez de instrumentos validados, o que exige adaptação e cuidado na aplicação de testes internacionais</span>
          </li>
        </ul>
      </div>
    `,
  },
] 