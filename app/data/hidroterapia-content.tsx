import React from 'react';

const HidroterapiaContent = `
  <div class="prose max-w-none">
    <h2 class="text-3xl font-bold text-[#4A96D1] mb-6">Hidroterapia em Neonatos: Recurso Terapêutico em UTINs</h2>
    
    <div class="bg-blue-50 p-6 rounded-xl mb-8">
      <h3 class="text-xl text-[#4A96D1] mb-4 font-semibold">Introdução à Hidroterapia Neonatal</h3>
      <p class="text-gray-700">
        O estudo aborda a hidroterapia como um recurso fisioterapêutico para promover a humanização em Unidades de Terapia 
        Intensiva Neonatal (UTIN). A permanência em UTIN pode ser um ambiente estressante para o recém-nascido (RN) devido 
        à exposição a estímulos invasivos, ruídos excessivos e ausência do contato materno, o que pode prejudicar o 
        desenvolvimento neuropsicomotor. A hidroterapia, também conhecida como fisioterapia aquática ou ofuroterapia, 
        surge como uma intervenção que busca recriar um ambiente semelhante ao intrauterino, promovendo relaxamento e bem-estar.
      </p>
    </div>

    <div class="topic-quick-nav">
      <div class="nav-items">
        <a href="#metodologia-do-estudo" class="nav-item">Metodologia</a>
        <a href="#resultados" class="nav-item">Resultados</a>
        <a href="#discussao-detalhada" class="nav-item">Discussão</a>
        <a href="#exemplos-praticos" class="nav-item">Exemplos Práticos</a>
        <a href="#consideracoes-especiais" class="nav-item">Considerações Especiais</a>
        <a href="#consideracoes-finais" class="nav-item">Considerações Finais</a>
      </div>
    </div>

    <div class="my-10">
      <div class="relative h-[350px] md:h-[450px] lg:h-[500px] w-full rounded-xl overflow-hidden shadow-md mb-4 bg-gray-50 flex items-center justify-center p-4">
        <img src="/images/neonatal/hidroterapia-principal.jpg" alt="Bebê recebendo hidroterapia em UTIN" class="max-h-full max-w-full object-contain" style="object-fit: contain;" />
      </div>
      <p class="text-sm text-center text-gray-600 italic">Figura 1: Técnica de hidroterapia (ofurô) sendo aplicada em recém-nascido na UTIN</p>
    </div>

    <h3 class="text-2xl text-[#6EC1E4] mt-10 mb-4 font-semibold" id="metodologia-do-estudo">Metodologia do Estudo</h3>
    <p class="text-gray-700 mb-6">
      O estudo analisado é retrospectivo, examinando dados de neonatos que foram submetidos à hidroterapia em uma UTIN 
      de um hospital no Rio Grande do Sul. Os dados foram coletados antes e após a intervenção, utilizando escalas 
      de avaliação específicas e monitoramento de parâmetros fisiológicos.
    </p>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 mb-8">
      <div class="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100">
        <div class="bg-gradient-to-r from-[#4A96D1]/10 to-[#6EC1E4]/5 p-3 border-b border-gray-100">
          <h4 class="text-[#4A96D1] font-semibold text-lg">Escala de Dor (NFCS)</h4>
        </div>
        <div class="p-4">
          <p class="text-gray-700 text-sm">Avalia expressões faciais do neonato para identificar a presença de dor, incluindo testa franzida, olhos espremidos, sulco nasolabial, boca aberta e queixo trêmulo.</p>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100">
        <div class="bg-gradient-to-r from-[#4A96D1]/10 to-[#6EC1E4]/5 p-3 border-b border-gray-100">
          <h4 class="text-[#4A96D1] font-semibold text-lg">Escala de Sono e Vigília</h4>
        </div>
        <div class="p-4">
          <p class="text-gray-700 text-sm">Avalia o estado comportamental do neonato em seis níveis, desde sono profundo até choro intenso, permitindo identificar o grau de conforto e estresse.</p>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100">
        <div class="bg-gradient-to-r from-[#4A96D1]/10 to-[#6EC1E4]/5 p-3 border-b border-gray-100">
          <h4 class="text-[#4A96D1] font-semibold text-lg">Variáveis Fisiológicas</h4>
        </div>
        <div class="p-4">
          <p class="text-gray-700 text-sm">Monitoramento de frequência cardíaca (FC), frequência respiratória (FR), saturação periférica de oxigênio (SpO2) e temperatura axilar (TAx) para verificar o impacto da hidroterapia nos sinais vitais.</p>
        </div>
      </div>
    </div>

    <div class="my-10">
      <div class="relative h-[300px] md:h-[400px] w-full rounded-xl overflow-hidden shadow-md mb-4 bg-gray-50 flex items-center justify-center p-4">
        <img src="/images/neonatal/parametros-hidroterapia.jpg" alt="Gráfico mostrando os parâmetros fisiológicos antes e depois da hidroterapia" class="max-h-full max-w-full object-contain" style="object-fit: contain;" />
      </div>
      <p class="text-sm text-center text-gray-600 italic">Figura 2: Comparação dos parâmetros fisiológicos antes e após a sessão de hidroterapia em neonatos</p>
    </div>

    <h3 class="text-2xl text-[#6EC1E4] mt-10 mb-4 font-semibold" id="resultados">Resultados</h3>
    <p class="text-gray-700 mb-4">
      Os resultados do estudo demonstraram benefícios significativos da hidroterapia em diferentes aspectos do bem-estar dos neonatos:
    </p>

    <div class="space-y-6 mt-8">
      <div class="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
        <h4 class="text-[#4A96D1] font-semibold text-lg mb-2">Diminuição da Dor</h4>
        <p class="text-gray-700">
          Houve redução significativa nos escores da escala NFCS após a hidroterapia, indicando que a intervenção foi eficaz 
          para aliviar a dor nos neonatos. As expressões faciais associadas à dor diminuíram consideravelmente, 
          demonstrando maior conforto.
        </p>
      </div>
      
      <div class="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
        <h4 class="text-[#4A96D1] font-semibold text-lg mb-2">Redução da Agitação</h4>
        <p class="text-gray-700">
          Observou-se melhora no estado de sono e vigília, com os neonatos passando de estados de agitação para estados 
          de sono mais profundo após a hidroterapia. Este resultado sugere que a intervenção promove relaxamento e 
          melhora a qualidade do sono, fatores essenciais para o desenvolvimento neurológico.
        </p>
      </div>
      
      <div class="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
        <h4 class="text-[#4A96D1] font-semibold text-lg mb-2">Melhora dos Parâmetros Fisiológicos</h4>
        <p class="text-gray-700">
          A hidroterapia resultou em redução da frequência cardíaca (FC) e da frequência respiratória (FR), além de 
          aumento da saturação periférica de oxigênio (SpO2), sem alterações significativas na temperatura axilar (TAx). 
          Estes dados indicam uma resposta fisiológica positiva à intervenção, com melhora da função cardiorrespiratória.
        </p>
      </div>
    </div>

    <h3 class="text-2xl text-[#6EC1E4] mt-10 mb-4 font-semibold" id="discussao-detalhada">Discussão Detalhada</h3>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 mb-8">
      <div class="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
        <h4 class="text-[#4A96D1] font-semibold text-lg mb-2">Dor e Agitação</h4>
        <p class="text-gray-700 text-sm">
          A hidroterapia demonstrou ser eficaz na redução da dor e agitação, proporcionando um ambiente mais calmo e 
          confortável para o neonato. A imersão em água aquecida pode diminuir a sensibilidade das terminações nervosas, 
          promovendo analgesia e relaxamento. A água também oferece contenção suave, similar ao ambiente uterino.
        </p>
      </div>
      
      <div class="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
        <h4 class="text-[#4A96D1] font-semibold text-lg mb-2">Parâmetros Fisiológicos</h4>
        <p class="text-gray-700 text-sm">
          A melhora nos parâmetros fisiológicos sugere que a hidroterapia pode ter um impacto positivo na função 
          cardiorrespiratória dos neonatos. A redução da FC e FR indica um estado de maior relaxamento e menor estresse. 
          O aumento da SpO2 reflete uma melhor oxigenação, possivelmente relacionada à redução do trabalho respiratório.
        </p>
      </div>
      
      <div class="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
        <h4 class="text-[#4A96D1] font-semibold text-lg mb-2">Humanização do Cuidado</h4>
        <p class="text-gray-700 text-sm">
          A hidroterapia pode ser realizada na presença dos pais, promovendo o vínculo afetivo e o envolvimento nos 
          cuidados com o bebê. A participação dos pais pode reduzir o estresse e a ansiedade, tanto para o neonato 
          quanto para a família, contribuindo para um ambiente de cuidado mais humanizado na UTIN.
        </p>
      </div>
      
      <div class="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
        <h4 class="text-[#4A96D1] font-semibold text-lg mb-2">Desenvolvimento Neuropsicomotor</h4>
        <p class="text-gray-700 text-sm">
          Os estímulos sensoriais proporcionados pela hidroterapia, como o contato com a água e os movimentos suaves, 
          podem contribuir para o desenvolvimento neuropsicomotor do neonato. A redução do estresse e a promoção de 
          um ambiente mais favorável podem facilitar a maturação neurológica e o desenvolvimento de habilidades motoras.
        </p>
      </div>
    </div>

    <h3 class="text-2xl text-[#6EC1E4] mt-10 mb-4 font-semibold" id="exemplos-praticos">Exemplos Práticos</h3>
    <p class="text-gray-700 mb-4">
      A aplicação da hidroterapia em neonatos segue um protocolo específico, garantindo a segurança e eficácia da intervenção:
    </p>

    <div class="my-10">
      <div class="relative h-[350px] md:h-[450px] lg:h-[500px] w-full rounded-xl overflow-hidden shadow-md mb-4 bg-gray-50 flex items-center justify-center p-4">
        <img src="/images/neonatal/tecnica-hidroterapia.jpg" alt="Sequência da técnica de hidroterapia em neonatos" class="max-h-full max-w-full object-contain" style="object-fit: contain;" />
      </div>
      <p class="text-sm text-center text-gray-600 italic">Figura 3: Sequência da técnica de hidroterapia em neonatos, demonstrando o posicionamento e contenção adequados</p>
    </div>

    <div class="space-y-4 mb-8">
      <div class="flex items-start bg-[#F0F9FF] p-4 rounded-lg">
        <div class="bg-[#4A96D1] text-white font-bold rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">1</div>
        <div>
          <h5 class="font-semibold text-[#4A96D1]">Preparação</h5>
          <p class="text-gray-700">Preparar o ambiente com iluminação baixa e temperatura controlada (36,5ºC a 37,5ºC). Utilizar um balde higienizado com solução de Clorexidina e álcool 70%. A água deve estar entre 36,5°C e 37°C, verificada com termômetro digital. Todo o material necessário deve estar disponível antes do início da intervenção.</p>
        </div>
      </div>
      
      <div class="flex items-start bg-[#F0F9FF] p-4 rounded-lg">
        <div class="bg-[#4A96D1] text-white font-bold rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">2</div>
        <div>
          <h5 class="font-semibold text-[#4A96D1]">Técnica</h5>
          <p class="text-gray-700">Envolver o neonato em uma toalha, mantendo o corpo semi flexionado, e colocá-lo gentilmente na água até a linha do ombro. Realizar movimentos circulares suaves para promover estimulação tátil e cinestésica. A cabeça e o pescoço devem ser apoiados adequadamente, mantendo as vias aéreas livres. A duração da intervenção varia de 10 a 15 minutos.</p>
        </div>
      </div>
      
      <div class="flex items-start bg-[#F0F9FF] p-4 rounded-lg">
        <div class="bg-[#4A96D1] text-white font-bold rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">3</div>
        <div>
          <h5 class="font-semibold text-[#4A96D1]">Monitoramento</h5>
          <p class="text-gray-700">Observar continuamente o neonato durante a intervenção, interrompendo caso apresente sinais de desconforto ou instabilidade clínica. Avaliar os sinais vitais e as escalas de dor e sono antes e após a terapia. O fisioterapeuta deve estar atento a alterações na coloração da pele, padrão respiratório e expressões faciais.</p>
        </div>
      </div>
      
      <div class="flex items-start bg-[#F0F9FF] p-4 rounded-lg">
        <div class="bg-[#4A96D1] text-white font-bold rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">4</div>
        <div>
          <h5 class="font-semibold text-[#4A96D1]">Finalização</h5>
          <p class="text-gray-700">Após a hidroterapia, retirar o neonato da água com cuidado, envolvê-lo em uma toalha seca e aquecida, e retorná-lo ao berço ou incubadora. Realizar a secagem delicada, especialmente das dobras cutâneas, para evitar umidade residual. Registrar os parâmetros vitais e o comportamento do neonato após a intervenção.</p>
        </div>
      </div>
    </div>

    <h3 class="text-2xl text-[#6EC1E4] mt-10 mb-4 font-semibold" id="consideracoes-especiais">Considerações Especiais</h3>

    <div class="space-y-6 mt-8">
      <div class="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
        <h4 class="text-[#4A96D1] font-semibold text-lg mb-2">Prematuridade e Doença da Membrana Hialina (DMH)</h4>
        <p class="text-gray-700">
          A maioria dos neonatos no estudo eram prematuros e apresentavam DMH. A prematuridade aumenta o risco de complicações 
          respiratórias e infecções devido à imaturidade do sistema imunológico. A hidroterapia pode auxiliar na melhora 
          da função respiratória e no bem-estar geral desses pacientes, mas deve ser aplicada com cuidados redobrados, 
          monitorando constantemente os parâmetros respiratórios.
        </p>
      </div>
      
      <div class="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
        <h4 class="text-[#4A96D1] font-semibold text-lg mb-2">Sepse Neonatal</h4>
        <p class="text-gray-700">
          Uma parcela dos neonatos desenvolveu sepse neonatal. É crucial garantir que a hidroterapia seja realizada em um 
          ambiente estéril e que todos os materiais sejam rigorosamente higienizados para evitar infecções. Em casos de 
          sepse confirmada, a hidroterapia deve ser adiada até que o neonato apresente estabilidade clínica e controle 
          da infecção.
        </p>
      </div>
      
      <div class="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
        <h4 class="text-[#4A96D1] font-semibold text-lg mb-2">Envolvimento dos Pais</h4>
        <p class="text-gray-700">
          A participação dos pais é fundamental para o sucesso da hidroterapia. Encorajar os pais a cantar ou falar com o 
          bebê durante a intervenção pode fortalecer o vínculo afetivo e proporcionar um ambiente mais acolhedor. Além disso, 
          a presença dos pais durante a hidroterapia pode reduzir a ansiedade dos mesmos em relação aos cuidados com o 
          bebê, aumentando sua confiança e participação nos cuidados.
        </p>
      </div>
    </div>

    <h3 class="text-2xl text-[#6EC1E4] mt-10 mb-4 font-semibold" id="consideracoes-finais">Considerações Finais</h3>
    <p class="text-gray-700 mb-4">
      A hidroterapia surge como uma ferramenta valiosa no cuidado neonatal, promovendo benefícios tanto fisiológicos quanto 
      emocionais. Os resultados observados no estudo endossam a incorporação dessa técnica na rotina de cuidados em UTINs, 
      como parte de uma abordagem humanizada e centrada no bem-estar integral do neonato.
    </p>
    
    <p class="text-gray-700 mb-6">
      Entretanto, é importante ressaltar que a hidroterapia deve ser aplicada por profissionais devidamente treinados, 
      seguindo protocolos específicos e considerando as particularidades de cada neonato. A avaliação criteriosa das 
      condições clínicas do paciente antes da intervenção é fundamental para garantir a segurança e eficácia da técnica.
    </p>

    <div class="my-8 p-6 bg-[#F0F9FF] border border-[#E0E0E0] rounded-xl shadow-sm">
      <h3 class="text-xl font-semibold text-[#4A96D1] mb-4">Pontos-chave sobre Hidroterapia em Neonatos</h3>
      <ul class="space-y-2">
        <li class="flex items-start">
          <span class="text-[#6EC1E4] mr-2">•</span>
          <span class="text-gray-700">A hidroterapia proporciona um ambiente similar ao intrauterino, promovendo relaxamento e bem-estar em neonatos internados em UTIN</span>
        </li>
        <li class="flex items-start">
          <span class="text-[#6EC1E4] mr-2">•</span>
          <span class="text-gray-700">Estudos demonstram redução significativa na dor, agitação e melhora nos parâmetros vitais após a intervenção</span>
        </li>
        <li class="flex items-start">
          <span class="text-[#6EC1E4] mr-2">•</span>
          <span class="text-gray-700">A técnica deve seguir um protocolo rigoroso de higiene e segurança, com monitoramento constante dos sinais vitais</span>
        </li>
        <li class="flex items-start">
          <span class="text-[#6EC1E4] mr-2">•</span>
          <span class="text-gray-700">A participação dos pais durante a intervenção fortalece o vínculo afetivo e promove um ambiente mais humanizado</span>
        </li>
        <li class="flex items-start">
          <span class="text-[#6EC1E4] mr-2">•</span>
          <span class="text-gray-700">Considerações especiais devem ser observadas em casos de prematuridade, DMH e sepse neonatal</span>
        </li>
      </ul>
    </div>
  </div>
`;

export default HidroterapiaContent; 