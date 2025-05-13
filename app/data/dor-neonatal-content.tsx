import React from 'react';

const DorNeonatalContent = `
  <div class="prose max-w-none">
    <h2 class="text-3xl font-bold text-[#4A96D1] mb-6">Instrumentos de Avaliação da Dor em Neonatos Internados em Unidade de Terapia Intensiva</h2>
    
    <div class="bg-blue-50 p-6 rounded-xl mb-8">
      <h3 class="text-xl text-[#4A96D1] mb-4 font-semibold">Introdução à Dor Neonatal em UTINs</h3>
      <p class="text-gray-700">
        O artigo aborda a dor em neonatos internados em Unidades de Terapia Intensiva Neonatal (UTINs), um tema de extrema 
        relevância clínica e ética. Neonatos, especialmente os prematuros, são frequentemente submetidos a múltiplos 
        procedimentos invasivos e rotineiros que podem causar dor significativa. A não comunicação verbal dos neonatos 
        não elimina sua capacidade de sentir dor, tornando essencial a observação de alterações fisiológicas e comportamentais.
      </p>
    </div>

    <div class="topic-quick-nav">
      <div class="nav-items">
        <a href="#metodologia-da-revisao-integrativa" class="nav-item">Metodologia da Revisão</a>
        <a href="#escalas-de-avaliacao-da-dor-neonatal" class="nav-item">Escalas de Avaliação</a>
        <a href="#estrategias-nao-farmacologicas" class="nav-item">Estratégias Não Farmacológicas</a>
        <a href="#consideracoes-finais" class="nav-item">Considerações Finais</a>
      </div>
    </div>

    <div class="my-10">
      <div class="relative h-[350px] md:h-[450px] lg:h-[500px] w-full rounded-xl overflow-hidden shadow-md mb-4 bg-gray-50 flex items-center justify-center p-4">
        <img src="/images/neonatal/dor-neonatal.jpg" alt="Avaliação da dor em recém-nascido" class="max-h-full max-w-full object-contain" style="object-fit: contain;" />
      </div>
      <p class="text-sm text-center text-gray-600 italic">Figura 2: Profissional de saúde avaliando sinais de dor em recém-nascido em UTIN</p>
    </div>

    <h3 class="text-2xl text-[#6EC1E4] mt-10 mb-4 font-semibold" id="metodologia-da-revisao-integrativa">Metodologia da Revisão Integrativa</h3>
    <p class="text-gray-700">
      O estudo emprega uma Revisão Integrativa da literatura, um método robusto para sintetizar evidências científicas. 
      A busca foi realizada nas bases de dados Lilacs e Medline, cobrindo artigos publicados entre 2015 e 2020. 
      Os critérios de inclusão focaram em artigos completos, publicados nos últimos 5 anos (2015-2020) e disponíveis 
      em português, inglês ou espanhol. Estudos de revisão sistemática e integrativa foram excluídos.
    </p>

    <h3 class="text-2xl text-[#6EC1E4] mt-10 mb-4 font-semibold">Análise do Fluxograma</h3>
    <p class="text-gray-700">
      O fluxograma do estudo detalha o processo de seleção dos artigos. Inicialmente, foram identificados 418 estudos 
      (343 da BVS e 75 do PubMed). Após a aplicação de filtros (período de publicação, tipo de artigo e idioma), 
      36 estudos foram selecionados. A aplicação de Descritores em Ciências da Saúde (DeCS) e Medical Subject Headings (MeSH) 
      resultou na exclusão de 28 estudos, culminando em 8 artigos para análise.
    </p>

    <div class="my-10">
      <div class="relative h-[350px] md:h-[450px] lg:h-[500px] w-full rounded-xl overflow-hidden shadow-md mb-4 bg-gray-50 flex items-center justify-center p-4">
        <img src="/images/neonatal/fluxograma-estudos.jpg" alt="Fluxograma da seleção de estudos" class="max-h-full max-w-full object-contain" style="object-fit: contain;" />
      </div>
      <p class="text-sm text-center text-gray-600 italic">Figura 1: Fluxograma do processo de seleção dos artigos incluídos na revisão</p>
    </div>

    <h3 class="text-2xl text-[#6EC1E4] mt-10 mb-4 font-semibold">Instrumentos de Avaliação da Dor</h3>
    <p class="text-gray-700">
      A avaliação da dor em neonatos é complexa, dada a sua incapacidade de comunicar verbalmente a experiência dolorosa. 
      Portanto, a identificação e o uso de instrumentos de avaliação da dor são cruciais para garantir o alívio e o tratamento adequados da dor.
    </p>

    <h3 class="text-2xl text-[#6EC1E4] mt-10 mb-4 font-semibold" id="escalas-de-avaliacao-da-dor-neonatal">Escalas de Avaliação da Dor Neonatal</h3>
    <p class="text-gray-700 mb-6">
      O artigo destaca diversas escalas utilizadas para mensurar a dor em neonatos, cada uma com suas particularidades:
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 mb-8">
      <div class="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100">
        <div class="bg-gradient-to-r from-[#4A96D1]/10 to-[#6EC1E4]/5 p-3 border-b border-gray-100">
          <h4 class="text-[#4A96D1] font-semibold text-lg">Escala NFCS</h4>
          <p class="text-xs text-gray-500 mt-1">Neonatal Facial Coding System</p>
        </div>
        <div class="p-4">
          <p class="text-gray-700 text-sm">Avalia a dor com base em expressões faciais do neonato, incluindo testa franzida, olhos espremidos, sulco nasolabial aprofundado, lábios entreabertos, boca esticada, língua tensa, tremor de queixo e protrusão da língua.</p>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100">
        <div class="bg-gradient-to-r from-[#4A96D1]/10 to-[#6EC1E4]/5 p-3 border-b border-gray-100">
          <h4 class="text-[#4A96D1] font-semibold text-lg">Escala NIPS</h4>
          <p class="text-xs text-gray-500 mt-1">Neonatal Infant Pain Scale</p>
        </div>
        <div class="p-4">
          <p class="text-gray-700 text-sm">Considera indicadores comportamentais (expressão facial, choro, padrão respiratório, movimentação de braços e pernas) e fisiológicos (estado de alerta), sendo amplamente utilizada para avaliar dor em procedimentos.</p>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100">
        <div class="bg-gradient-to-r from-[#4A96D1]/10 to-[#6EC1E4]/5 p-3 border-b border-gray-100">
          <h4 class="text-[#4A96D1] font-semibold text-lg">Escala PIPP-R</h4>
          <p class="text-xs text-gray-500 mt-1">Premature Infant Pain Profile – Revised</p>
        </div>
        <div class="p-4">
          <p class="text-gray-700 text-sm">Adaptada especificamente para prematuros, avalia respostas comportamentais (expressão facial) e fisiológicas (frequência cardíaca, saturação de oxigênio), considerando também idade gestacional e estado comportamental.</p>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100">
        <div class="bg-gradient-to-r from-[#4A96D1]/10 to-[#6EC1E4]/5 p-3 border-b border-gray-100">
          <h4 class="text-[#4A96D1] font-semibold text-lg">Escala BIIP</h4>
          <p class="text-xs text-gray-500 mt-1">Behavioral Indicators of Infant Pain</p>
        </div>
        <div class="p-4">
          <p class="text-gray-700 text-sm">Foca em indicadores comportamentais de dor, incluindo movimentos faciais, estado de sono/vigília e movimentos das mãos, sendo especialmente útil para avaliar dor em prematuros durante procedimentos.</p>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100">
        <div class="bg-gradient-to-r from-[#4A96D1]/10 to-[#6EC1E4]/5 p-3 border-b border-gray-100">
          <h4 class="text-[#4A96D1] font-semibold text-lg">Escala EDIN</h4>
          <p class="text-xs text-gray-500 mt-1">Échelle Douleur Inconfort Nouveau-Né</p>
        </div>
        <div class="p-4">
          <p class="text-gray-700 text-sm">Avalia dor e desconforto prolongados em neonatos, observando expressão facial, movimentos corporais, qualidade do sono, qualidade de contato com enfermeiros e consolabilidade.</p>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100">
        <div class="bg-gradient-to-r from-[#4A96D1]/10 to-[#6EC1E4]/5 p-3 border-b border-gray-100">
          <h4 class="text-[#4A96D1] font-semibold text-lg">Escala N-PASS</h4>
          <p class="text-xs text-gray-500 mt-1">Neonatal Pain Agitation and Sedation Scale</p>
        </div>
        <div class="p-4">
          <p class="text-gray-700 text-sm">Avalia dor, agitação e sedação em neonatos, considerando irritabilidade/choro, estado comportamental, expressão facial, tônus de extremidades e sinais vitais, sendo particularmente útil para pacientes ventilados ou pós-operatórios.</p>
        </div>
      </div>
    </div>

    <h3 class="text-2xl text-[#6EC1E4] mt-10 mb-4 font-semibold">Resultados e Discussão</h3>
    <p class="text-gray-700">
      A análise dos artigos revelou que a maioria dos profissionais reconhece que recém-nascidos sentem dor e que medidas 
      devem ser tomadas para aliviá-la. No entanto, nem todos utilizam escalas para mensurar o nível de dor, muitas vezes 
      devido à falta de tempo ou confiança nas ferramentas existentes.
    </p>

    <p class="text-gray-700 mt-4">
      Os estudos analisados variam desde ensaios clínicos randomizados até estudos observacionais e de coorte. Os principais resultados 
      destacam a importância de intervenções multissensoriais para alívio da dor, a validação de escalas de dor em diferentes 
      contextos culturais e a necessidade de melhorar as práticas de avaliação da dor em UTINs.
    </p>

    <h3 class="text-2xl text-[#6EC1E4] mt-10 mb-4 font-semibold">Implicações para a Prática Clínica</h3>
    <p class="text-gray-700">
      A implementação de instrumentos de mensuração da dor em neonatos está ocorrendo de forma gradual nas UTINs. 
      A dor neonatal é um fator multidimensional e multifatorial, exigindo uma abordagem abrangente que inclua 
      estratégias farmacológicas e não farmacológicas.
    </p>

    <h3 class="text-2xl text-[#6EC1E4] mt-10 mb-4 font-semibold" id="estrategias-nao-farmacologicas">Estratégias Não Farmacológicas</h3>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 mb-8">
      <div class="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
        <h4 class="text-[#4A96D1] font-semibold text-lg mb-2">Posição Canguru</h4>
        <p class="text-gray-700 text-sm">
          O contato pele a pele com os pais proporciona alívio da dor e regulação fisiológica do bebê, além de 
          fortalecer o vínculo afetivo. Esta técnica é especialmente eficaz para procedimentos como punções e coletas de sangue.
        </p>
      </div>
      
      <div class="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
        <h4 class="text-[#4A96D1] font-semibold text-lg mb-2">Aleitamento Materno</h4>
        <p class="text-gray-700 text-sm">
          A amamentação durante procedimentos dolorosos oferece múltiplos benefícios: contato pele a pele, sucção, 
          sabor adocicado do leite e contenção, sendo uma estratégia altamente eficaz para alívio da dor.
        </p>
      </div>
      
      <div class="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
        <h4 class="text-[#4A96D1] font-semibold text-lg mb-2">Soluções Adocicadas</h4>
        <p class="text-gray-700 text-sm">
          A administração de glicose ou sacarose oral 2 minutos antes de procedimentos dolorosos ativa receptores 
          gustativos e libera endorfinas, promovendo analgesia. É uma intervenção segura e de fácil aplicação.
        </p>
      </div>
      
      <div class="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
        <h4 class="text-[#4A96D1] font-semibold text-lg mb-2">Sucção Não-Nutritiva</h4>
        <p class="text-gray-700 text-sm">
          O uso de chupeta ou dedo enluvado estimula a sucção, produzindo efeito calmante e reduzindo o tempo de choro 
          e a frequência cardíaca durante e após procedimentos dolorosos.
        </p>
      </div>

      <div class="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
        <h4 class="text-[#4A96D1] font-semibold text-lg mb-2">Contenção Facilitada</h4>
        <p class="text-gray-700 text-sm">
          Manter o bebê em posição flexionada com contenção dos membros simula o ambiente uterino, 
          proporcionando conforto e reduzindo respostas fisiológicas e comportamentais à dor.
        </p>
      </div>
      
      <div class="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
        <h4 class="text-[#4A96D1] font-semibold text-lg mb-2">Estímulos Multissensoriais</h4>
        <p class="text-gray-700 text-sm">
          A combinação de técnicas como toque, voz, cheiro e contato visual dos pais cria um ambiente 
          de segurança e conforto, potencializando o efeito analgésico das intervenções.
        </p>
      </div>
    </div>


    <h3 class="text-2xl text-[#6EC1E4] mt-10 mb-4 font-semibold" id="consideracoes-finais">Considerações Finais</h3>
    <p class="text-gray-700">
      O estudo conclui que, embora existam diversos instrumentos para avaliação da dor em neonatos, ainda existem 
      lacunas na prática clínica. A falta de conhecimento e a não utilização de escalas de dor por parte dos profissionais 
      são barreiras a serem superadas. É fundamental que os profissionais de saúde busquem aprimoramento e atualizações 
      constantes sobre os danos causados pela dor não tratada em neonatos.
    </p>

    <div class="my-8 p-6 bg-[#F0F9FF] border border-[#E0E0E0] rounded-xl shadow-sm">
      <h3 class="text-xl font-semibold text-[#4A96D1] mb-4">Pontos-chave sobre a dor neonatal</h3>
      <ul class="space-y-2">
        <li class="flex items-start">
          <span class="text-[#6EC1E4] mr-2">•</span>
          <span class="text-gray-700">Neonatos, incluindo prematuros, sentem dor e demonstram respostas fisiológicas e comportamentais específicas</span>
        </li>
        <li class="flex items-start">
          <span class="text-[#6EC1E4] mr-2">•</span>
          <span class="text-gray-700">A dor não tratada pode causar danos neurológicos a curto e longo prazo, comprometendo o desenvolvimento</span>
        </li>
        <li class="flex items-start">
          <span class="text-[#6EC1E4] mr-2">•</span>
          <span class="text-gray-700">O uso de escalas validadas permite avaliação objetiva e padronizada da experiência dolorosa</span>
        </li>
        <li class="flex items-start">
          <span class="text-[#6EC1E4] mr-2">•</span>
          <span class="text-gray-700">Intervenções não farmacológicas são eficazes e seguras para o manejo da dor em procedimentos</span>
        </li>
        <li class="flex items-start">
          <span class="text-[#6EC1E4] mr-2">•</span>
          <span class="text-gray-700">A combinação de métodos de avaliação com estratégias de alívio deve ser parte do protocolo de cuidados nas UTINs</span>
        </li>
      </ul>
    </div>
  </div>
`;

export default DorNeonatalContent; 