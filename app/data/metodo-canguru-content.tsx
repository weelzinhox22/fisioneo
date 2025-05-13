import React from 'react';

const MetodoCanguruContent = `
  <div class="prose max-w-none">
    <h2 class="text-3xl font-bold text-[#4A96D1] mb-6">Método Canguru: Abordagem Humanizada para Prematuros</h2>
    
    <div class="bg-blue-50 p-6 rounded-xl mb-8">
      <h3 class="text-xl text-[#4A96D1] mb-4 font-semibold">Introdução ao Método Canguru</h3>
      <p class="text-gray-700">
        O Método Canguru (MC) é uma intervenção de saúde centrada na família, que surgiu na Colômbia em 1978 e foi implementada 
        no Brasil em 2007, com o objetivo de melhorar o cuidado de recém-nascidos (RN) prematuros ou de baixo peso. 
        Essa abordagem visa reduzir os riscos associados à prematuridade, como infecções e hipotermia, além de fortalecer 
        o vínculo entre mãe e bebê, e promover o aleitamento materno exclusivo.
      </p>
    </div>

    <div class="topic-quick-nav">
      <div class="nav-items">
        <a href="#pilares-do-metodo-canguru" class="nav-item">Pilares do Método</a>
        <a href="#fases-do-metodo-canguru" class="nav-item">Fases do Método</a>
        <a href="#atuacao-da-fisioterapia" class="nav-item">Atuação da Fisioterapia</a>
        <a href="#evidencias-cientificas" class="nav-item">Evidências Científicas</a>
        <a href="#consideracoes-finais" class="nav-item">Considerações Finais</a>
      </div>
    </div>

    <div class="my-10">
      <div class="relative h-[350px] md:h-[450px] lg:h-[500px] w-full rounded-xl overflow-hidden shadow-md mb-4 bg-gray-50 flex items-center justify-center p-4">
        <img src="/images/neonatal/metodo-canguru-principal.jpg" alt="Mãe realizando o método canguru com seu bebê prematuro" class="max-h-full max-w-full object-contain" style="object-fit: contain;" />
      </div>
      <p class="text-sm text-center text-gray-600 italic">Figura 1: Posição canguru demonstrando o contato pele a pele entre mãe e recém-nascido prematuro</p>
    </div>

    <h3 class="text-2xl text-[#6EC1E4] mt-10 mb-4 font-semibold" id="pilares-do-metodo-canguru">Pilares do Método Canguru</h3>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 mb-8">
      <div class="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100">
        <div class="bg-gradient-to-r from-[#4A96D1]/10 to-[#6EC1E4]/5 p-3 border-b border-gray-100">
          <h4 class="text-[#4A96D1] font-semibold text-lg">Contato Pele a Pele</h4>
        </div>
        <div class="p-4">
          <p class="text-gray-700 text-sm">O contato pele a pele entre a mãe e o RN é fundamental, proporcionando estabilidade térmica, estímulos sensoriais e afetivos, além de favorecer a amamentação.</p>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100">
        <div class="bg-gradient-to-r from-[#4A96D1]/10 to-[#6EC1E4]/5 p-3 border-b border-gray-100">
          <h4 class="text-[#4A96D1] font-semibold text-lg">Aleitamento Materno</h4>
        </div>
        <div class="p-4">
          <p class="text-gray-700 text-sm">O MC incentiva o aleitamento materno exclusivo, aumentando a duração e a produção de leite, o que é crucial para o desenvolvimento do RN.</p>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100">
        <div class="bg-gradient-to-r from-[#4A96D1]/10 to-[#6EC1E4]/5 p-3 border-b border-gray-100">
          <h4 class="text-[#4A96D1] font-semibold text-lg">Suporte Familiar</h4>
        </div>
        <div class="p-4">
          <p class="text-gray-700 text-sm">O método envolve uma equipe multidisciplinar que oferece suporte aos pais, desde o pré-natal até o acompanhamento ambulatorial após a alta hospitalar.</p>
        </div>
      </div>
    </div>

    <h3 class="text-2xl text-[#6EC1E4] mt-10 mb-4 font-semibold" id="fases-do-metodo-canguru">Fases do Método Canguru</h3>
    <p class="text-gray-700 mb-6">
      O Método Canguru é dividido em três fases bem definidas, que acompanham o desenvolvimento do recém-nascido desde 
      o pré-natal até após a alta hospitalar:
    </p>


    <div class="space-y-6 mt-8">
      <div class="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
        <h4 class="text-[#4A96D1] font-semibold text-lg mb-2">Primeira Fase</h4>
        <p class="text-gray-700">
          Inicia-se no pré-natal, com o apoio e a educação dos pais sobre o método, identificando gestantes com risco de 
          parto prematuro. Após o nascimento, o bebê é acolhido na Unidade Neonatal, onde os pais recebem orientações 
          sobre o MC e são incentivados a realizar o contato pele a pele assim que possível, mesmo com o bebê ainda 
          em cuidados intensivos.
        </p>
      </div>
      
      <div class="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
        <h4 class="text-[#4A96D1] font-semibold text-lg mb-2">Segunda Fase</h4>
        <p class="text-gray-700">
          Ocorre durante a internação na Unidade de Terapia Intensiva Neonatal (UTIN) ou Unidade de Cuidados Intermediários 
          Neonatal Canguru (UCINCa). Nesta fase, a mãe é capacitada e orientada para realizar o contato pele a pele de 
          forma segura e contínua. O bebê deve apresentar estabilidade clínica, peso mínimo de 1.250g, estar em nutrição 
          enteral plena e com ganho de peso adequado. A mãe precisa demonstrar interesse e disponibilidade para 
          permanecer com o bebê no hospital.
        </p>
      </div>
      
      <div class="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
        <h4 class="text-[#4A96D1] font-semibold text-lg mb-2">Terceira Fase</h4>
        <p class="text-gray-700">
          Inicia-se com a alta hospitalar, com o RN pesando no mínimo 1.600g e em aleitamento materno exclusivo ou 
          complementar. O bebê e a família recebem acompanhamento ambulatorial regular até atingir 2.500g, com consultas 
          frequentes para monitorar o crescimento, o desenvolvimento neuro-psicomotor e para dar continuidade 
          às orientações sobre o MC no ambiente domiciliar.
        </p>
      </div>
    </div>

    <h3 class="text-2xl text-[#6EC1E4] mt-10 mb-4 font-semibold" id="atuacao-da-fisioterapia">Atuação da Fisioterapia no Método Canguru</h3>
    <p class="text-gray-700 mb-6">
      O fisioterapeuta desempenha um papel crucial na equipe multidisciplinar do MC, atuando na estabilidade clínica, 
      no desenvolvimento motor e na promoção de experiências sensoriais do RN. As intervenções fisioterapêuticas incluem:
    </p>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 mb-8">
      <div class="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
        <h4 class="text-[#4A96D1] font-semibold text-lg mb-2">Estimulação Motora</h4>
        <p class="text-gray-700 text-sm">
          Técnicas para promover o desenvolvimento motor adequado, prevenindo alterações posturais e deformidades. 
          Inclui exercícios passivos delicados, facilitação de movimentos e posturas que respeitam a maturidade 
          neurológica do bebê.
        </p>
      </div>
      
      <div class="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
        <h4 class="text-[#4A96D1] font-semibold text-lg mb-2">Ofurôterapia</h4>
        <p class="text-gray-700 text-sm">
          Utilização de banhos terapêuticos para promover o relaxamento e bem-estar do RN. Este procedimento 
          simula o ambiente uterino, reduzindo o estresse e favorecendo o desenvolvimento sensorial.
        </p>
      </div>
      
      <div class="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
        <h4 class="text-[#4A96D1] font-semibold text-lg mb-2">Posicionamento Canguru</h4>
        <p class="text-gray-700 text-sm">
          Orientação e supervisão do posicionamento correto do RN em contato pele a pele com a mãe, garantindo 
          a estabilidade fisiológica e o conforto do bebê. O fisioterapeuta auxilia no alinhamento postural 
          e na adaptação da posição às necessidades de cada bebê.
        </p>
      </div>
      
      <div class="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
        <h4 class="text-[#4A96D1] font-semibold text-lg mb-2">Experiências Sensoriais</h4>
        <p class="text-gray-700 text-sm">
          Promoção de estímulos sensoriais adequados para o desenvolvimento cognitivo e emocional do RN. 
          Inclui estímulos táteis, proprioceptivos, vestibulares e auditivos que respeitam o limiar de 
          tolerância do bebê prematuro.
        </p>
      </div>

      <div class="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
        <h4 class="text-[#4A96D1] font-semibold text-lg mb-2">Mudanças Posturais</h4>
        <p class="text-gray-700 text-sm">
          Intervenção nas mudanças posturais (decúbito lateral direito e esquerdo), observando os parâmetros 
          respiratórios e cardíacos. Estas mudanças auxiliam na prevenção de deformidades e na otimização 
          da função pulmonar.
        </p>
      </div>
    </div>

    <div class="my-10">
      <div class="relative h-[350px] md:h-[450px] lg:h-[500px] w-full rounded-xl overflow-hidden shadow-md mb-4 bg-gray-50 flex items-center justify-center p-4">
        <img src="/images/neonatal/fisioterapia-metodo-canguru.jpg" alt="Fisioterapeuta orientando mãe sobre posicionamento canguru" class="max-h-full max-w-full object-contain" style="object-fit: contain;" />
      </div>
      <p class="text-sm text-center text-gray-600 italic">Figura 3: Fisioterapeuta orientando a mãe sobre o posicionamento correto durante o Método Canguru</p>
    </div>

    <h3 class="text-2xl text-[#6EC1E4] mt-10 mb-4 font-semibold" id="evidencias-cientificas">Evidências Científicas</h3>
    <p class="text-gray-700 mb-4">
      Estudos têm demonstrado os benefícios da intervenção fisioterapêutica no MC, evidenciando sua importância para o 
      desenvolvimento adequado dos recém-nascidos prematuros.
    </p>

    <div class="space-y-4 mb-8">
      <div class="flex items-start bg-[#F0F9FF] p-4 rounded-lg">
        <span class="text-[#4A96D1] font-bold mr-3 mt-0.5">•</span>
        <p class="text-gray-700"><span class="font-semibold text-[#4A96D1]">Estabilidade Fisiológica:</span> A posição canguru promove a estabilidade das funções fisiológicas do RN, como frequência cardíaca e saturação de oxigênio.</p>
      </div>
      
      <div class="flex items-start bg-[#F0F9FF] p-4 rounded-lg">
        <span class="text-[#4A96D1] font-bold mr-3 mt-0.5">•</span>
        <p class="text-gray-700"><span class="font-semibold text-[#4A96D1]">Neurodesenvolvimento:</span> O MC auxilia no desenvolvimento neurológico do RN, promovendo a regulação fisiológica e reduzindo o estresse.</p>
      </div>
      
      <div class="flex items-start bg-[#F0F9FF] p-4 rounded-lg">
        <span class="text-[#4A96D1] font-bold mr-3 mt-0.5">•</span>
        <p class="text-gray-700"><span class="font-semibold text-[#4A96D1]">Redução de Infecções:</span> Bebês de baixo peso se beneficiam com a redução de infecções hospitalares e o aumento do ganho de peso.</p>
      </div>
      
      <div class="flex items-start bg-[#F0F9FF] p-4 rounded-lg">
        <span class="text-[#4A96D1] font-bold mr-3 mt-0.5">•</span>
        <p class="text-gray-700"><span class="font-semibold text-[#4A96D1]">Aumento da Confiança dos Pais:</span> A interação com o fisioterapeuta durante o MC aumenta a confiança dos pais no cuidado com o bebê.</p>
      </div>
      
      <div class="flex items-start bg-[#F0F9FF] p-4 rounded-lg">
        <span class="text-[#4A96D1] font-bold mr-3 mt-0.5">•</span>
        <p class="text-gray-700"><span class="font-semibold text-[#4A96D1]">Melhora Respiratória:</span> Mudanças de decúbito auxiliam no bem-estar respiratório dos pacientes, aumentando os níveis de saturação de oxigênio e reduzindo o desconforto respiratório.</p>
      </div>
    </div>

    <h3 class="text-2xl text-[#6EC1E4] mt-10 mb-4 font-semibold">Análise do Fluxograma e Tabelas</h3>
    <p class="text-gray-700 mb-4">
      O artigo original apresenta um fluxograma detalhando o processo de busca dos artigos para a revisão integrativa, 
      incluindo as etapas de identificação, seleção e inclusão dos estudos nas bases de dados LILACS, MEDLINE, Scielo e 
      Google Acadêmico.
    </p>
    
    <p class="text-gray-700 mb-6">
      Adicionalmente, um quadro sintético apresenta os estudos selecionados, com informações sobre título, autores, ano, 
      objetivos, intervenção fisioterapêutica e conclusão, permitindo uma análise comparativa das diferentes abordagens 
      e resultados encontrados na literatura sobre a atuação da fisioterapia no MC.
    </p>


    <h3 class="text-2xl text-[#6EC1E4] mt-10 mb-4 font-semibold" id="consideracoes-finais">Considerações Finais</h3>
    <p class="text-gray-700 mb-4">
      A fisioterapia desempenha um papel fundamental no Método Canguru, contribuindo para a estabilidade clínica, o 
      desenvolvimento motor e a promoção de experiências sensoriais do RN. A intervenção fisioterapêutica no MC potencializa 
      os benefícios da metodologia, favorecendo o desenvolvimento neuropsicomotor adequado dos prematuros.
    </p>
    
    <p class="text-gray-700 mb-6">
      No entanto, é importante ressaltar a escassez de estudos que descrevem a atuação específica do fisioterapeuta 
      nas fases 2 e 3 do MC, o que sugere a necessidade de novas pesquisas para fortalecer a aplicação do método de 
      forma abrangente. O desenvolvimento de protocolos específicos de intervenção fisioterapêutica para cada fase do MC 
      pode contribuir significativamente para a padronização e otimização dos cuidados ao recém-nascido prematuro.
    </p>

    <div class="my-8 p-6 bg-[#F0F9FF] border border-[#E0E0E0] rounded-xl shadow-sm">
      <h3 class="text-xl font-semibold text-[#4A96D1] mb-4">Pontos-chave sobre o Método Canguru</h3>
      <ul class="space-y-2">
        <li class="flex items-start">
          <span class="text-[#6EC1E4] mr-2">•</span>
          <span class="text-gray-700">O Método Canguru é uma abordagem humanizada e eficaz para o cuidado de recém-nascidos prematuros ou de baixo peso</span>
        </li>
        <li class="flex items-start">
          <span class="text-[#6EC1E4] mr-2">•</span>
          <span class="text-gray-700">Os três pilares do método são: contato pele a pele, aleitamento materno exclusivo e suporte familiar contínuo</span>
        </li>
        <li class="flex items-start">
          <span class="text-[#6EC1E4] mr-2">•</span>
          <span class="text-gray-700">A fisioterapia contribui significativamente para o sucesso do MC, atuando nas três fases do método</span>
        </li>
        <li class="flex items-start">
          <span class="text-[#6EC1E4] mr-2">•</span>
          <span class="text-gray-700">Evidências científicas comprovam os benefícios do MC para a estabilidade fisiológica e o desenvolvimento neuromotor</span>
        </li>
        <li class="flex items-start">
          <span class="text-[#6EC1E4] mr-2">•</span>
          <span class="text-gray-700">É necessário ampliar as pesquisas sobre a atuação específica da fisioterapia nas fases 2 e 3 do método</span>
        </li>
      </ul>
    </div>
  </div>
`;

export default MetodoCanguruContent; 