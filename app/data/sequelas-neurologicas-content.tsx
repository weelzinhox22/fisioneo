import React from 'react';

const SequelasNeurologicasContent = `
  <div class="prose max-w-none">
    <h2 class="text-3xl font-bold text-[#4A96D1] mb-6">Sequelas de Doenças Neurológicas em Prematuros</h2>
    
    <div class="bg-blue-50 p-6 rounded-xl mb-8">
      <h3 class="text-xl text-[#4A96D1] mb-4 font-semibold">Introdução</h3>
      <p class="text-gray-700">
        O aumento da sobrevida de recém-nascidos pré-termo, impulsionado pelos avanços nos cuidados intensivos 
        neonatais, trouxe novos desafios relacionados às morbidades neurológicas. Quanto menor a idade gestacional 
        e o peso ao nascer, maior o risco de sequelas neurológicas que podem afetar o desenvolvimento e a qualidade 
        de vida desses bebês a longo prazo.
      </p>
    </div>

    <div class="topic-quick-nav">
      <div class="nav-items">
        <a href="#desenvolvimento-cerebral" class="nav-item">Desenvolvimento Cerebral</a>
        <a href="#principais-lesoes" class="nav-item">Principais Lesões</a>
        <a href="#sequelas-longo-prazo" class="nav-item">Sequelas a Longo Prazo</a>
        <a href="#abordagem-fisioterapeutica" class="nav-item">Abordagem Fisioterapêutica</a>
        <a href="#consideracoes-finais" class="nav-item">Considerações Finais</a>
      </div>
    </div>

    <div class="my-10">
      <div class="relative h-[350px] md:h-[450px] lg:h-[500px] w-full rounded-xl overflow-hidden shadow-md mb-4 bg-gray-50 flex items-center justify-center p-4">
        <img src="/images/neonatal/cerebro-prematuro.webp" alt="Desenvolvimento cerebral em prematuros" class="max-h-full max-w-full object-contain" style="object-fit: contain;" />
      </div>
      <p class="text-sm text-center text-gray-600 italic">Figura 1: Desenvolvimento cerebral humano</p>
    </div>

    <h3 class="text-2xl text-[#6EC1E4] mt-10 mb-4 font-semibold" id="desenvolvimento-cerebral">Desenvolvimento Cerebral Normal e Impacto da Prematuridade</h3>
    <p class="text-gray-700 mb-6">
      O desenvolvimento cerebral é um processo complexo que ocorre durante toda a gestação e continua após o nascimento. 
      A prematuridade interrompe este processo em momentos críticos, podendo afetar diversos aspectos do desenvolvimento neurológico:
    </p>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 mb-8">
      <div class="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100">
        <div class="bg-gradient-to-r from-[#4A96D1]/10 to-[#6EC1E4]/5 p-3 border-b border-gray-100">
          <h4 class="text-[#4A96D1] font-semibold text-lg">Migração Neuronal</h4>
        </div>
        <div class="p-4">
          <p class="text-gray-700 text-sm">O processo de migração neuronal para formar as camadas corticais pode ser interrompido pela prematuridade, resultando em malformações corticais e heterotopias neurais.</p>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100">
        <div class="bg-gradient-to-r from-[#4A96D1]/10 to-[#6EC1E4]/5 p-3 border-b border-gray-100">
          <h4 class="text-[#4A96D1] font-semibold text-lg">Mielinização</h4>
        </div>
        <div class="p-4">
          <p class="text-gray-700 text-sm">A mielinização, crucial para a transmissão eficiente dos impulsos nervosos, ocorre principalmente no terceiro trimestre e pode ser comprometida em nascimentos prematuros.</p>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100">
        <div class="bg-gradient-to-r from-[#4A96D1]/10 to-[#6EC1E4]/5 p-3 border-b border-gray-100">
          <h4 class="text-[#4A96D1] font-semibold text-lg">Sinaptogênese</h4>
        </div>
        <div class="p-4">
          <p class="text-gray-700 text-sm">A formação de conexões sinápticas é intensa durante a gestação e os primeiros anos de vida. Alterações neste processo podem afetar a plasticidade e funcionalidade cerebral.</p>
        </div>
      </div>
    </div>

    <h3 class="text-2xl text-[#6EC1E4] mt-10 mb-4 font-semibold" id="principais-lesoes">Principais Lesões Neurológicas em Prematuros</h3>

    <div class="space-y-6 mt-8">
      <div class="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
        <h4 class="text-[#4A96D1] font-semibold text-lg mb-2">Hemorragia Peri-intraventricular (HPIV)</h4>
        <p class="text-gray-700">
          A HPIV é uma das complicações mais comuns em prematuros, especialmente nos de extremo baixo peso. Origina-se da matriz 
          germinativa subependimária, uma região altamente vascularizada e vulnerável a flutuações do fluxo sanguíneo cerebral. 
          É classificada em quatro graus, sendo os graus III (hemorragia com dilatação ventricular) e IV (hemorragia com extensão 
          ao parênquima) associados a pior prognóstico neurológico.
        </p>
      </div>
      
      <div class="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
        <h4 class="text-[#4A96D1] font-semibold text-lg mb-2">Leucomalácia Periventricular (LPV)</h4>
        <p class="text-gray-700">
          A LPV caracteriza-se por lesão isquêmica da substância branca periventricular, resultando em necrose focal e 
          formação de cistos. Esta região é particularmente vulnerável em prematuros devido à sua vascularização limítrofe 
          e à alta demanda metabólica. A LPV cística é fortemente associada ao desenvolvimento de paralisia cerebral, 
          especialmente a forma espástica bilateral.
        </p>
      </div>
      
      <div class="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
        <h4 class="text-[#4A96D1] font-semibold text-lg mb-2">Lesão Difusa da Substância Branca</h4>
        <p class="text-gray-700">
          Com a melhoria das técnicas de neuroimagem, identificou-se que a lesão da substância branca em prematuros frequentemente 
          apresenta-se como uma injúria difusa, com perda de oligodendrócitos e comprometimento da mielinização, mesmo sem 
          a formação de cistos visíveis. Esta "nova" LPV pode manifestar-se como alterações sutis na substância branca, 
          redução volumétrica e atraso na maturação cerebral.
        </p>
      </div>
    </div>

    <div class="my-10">
      <div class="relative h-[350px] md:h-[450px] lg:h-[500px] w-full rounded-xl overflow-hidden shadow-md mb-4 bg-gray-50 flex items-center justify-center p-4">
        <img src="/images/neonatal/lesoes-cerebrais.jpg" alt="Tipos de lesões cerebrais em prematuros" class="max-h-full max-w-full object-contain" style="object-fit: contain;" />
      </div>
      <p class="text-sm text-center text-gray-600 italic">Figura 2: Representação de um recém-nascido prematuro</p>
    </div>

    <h3 class="text-2xl text-[#6EC1E4] mt-10 mb-4 font-semibold" id="sequelas-longo-prazo">Sequelas Neurológicas a Longo Prazo</h3>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 mb-8">
      <div class="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
        <h4 class="text-[#4A96D1] font-semibold text-lg mb-2">Paralisia Cerebral</h4>
        <p class="text-gray-700 text-sm">
          A forma mais comum em prematuros é a paralisia cerebral espástica bilateral, afetando predominantemente 
          os membros inferiores. A incidência é inversamente proporcional à idade gestacional, atingindo até 10% dos 
          prematuros extremos. A LPV é o principal substrato anatômico associado a esta sequela.
        </p>
      </div>
      
      <div class="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
        <h4 class="text-[#4A96D1] font-semibold text-lg mb-2">Déficits Cognitivos</h4>
        <p class="text-gray-700 text-sm">
          Prematuros apresentam maior risco de comprometimento cognitivo, com QI médio significativamente menor 
          comparado a crianças nascidas a termo. Mesmo na ausência de lesões cerebrais evidentes, alterações sutis 
          na conectividade e desenvolvimento cerebral podem afetar funções cognitivas complexas.
        </p>
      </div>
      
      <div class="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
        <h4 class="text-[#4A96D1] font-semibold text-lg mb-2">Transtornos do Espectro Autista (TEA)</h4>
        <p class="text-gray-700 text-sm">
          Estudos recentes demonstram uma associação entre prematuridade extrema e maior risco de TEA. Acredita-se que 
          alterações no desenvolvimento cerebral precoce, particularmente na conectividade entre diferentes regiões cerebrais, 
          possam contribuir para esta associação.
        </p>
      </div>
      
      <div class="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
        <h4 class="text-[#4A96D1] font-semibold text-lg mb-2">Transtorno de Déficit de Atenção e Hiperatividade (TDAH)</h4>
        <p class="text-gray-700 text-sm">
          O TDAH é significativamente mais prevalente em ex-prematuros, especialmente a apresentação com predomínio 
          de desatenção. Alterações nos circuitos frontoestriatais, frequentemente afetados pela prematuridade, 
          podem ser o substrato neurobiológico desta associação.
        </p>
      </div>

      <div class="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
        <h4 class="text-[#4A96D1] font-semibold text-lg mb-2">Epilepsia</h4>
        <p class="text-gray-700 text-sm">
          O risco de epilepsia é aumentado em prematuros, particularmente naqueles com lesões cerebrais estruturais. 
          A HPIV graus III e IV e a LPV extensa são fatores de risco importantes para o desenvolvimento de epilepsia 
          na infância e adolescência.
        </p>
      </div>
      
      <div class="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
        <h4 class="text-[#4A96D1] font-semibold text-lg mb-2">Dificuldades de Aprendizagem</h4>
        <p class="text-gray-700 text-sm">
          Mesmo prematuros sem deficiências maiores frequentemente apresentam dificuldades específicas de aprendizagem, 
          especialmente em matemática, funções executivas, memória de trabalho e processamento visual-espacial, 
          impactando o desempenho escolar e a necessidade de suporte educacional especializado.
        </p>
      </div>
    </div>

    <h3 class="text-2xl text-[#6EC1E4] mt-10 mb-4 font-semibold">Fatores de Risco e Proteção</h3>
    <p class="text-gray-700 mb-4">
      Diversos fatores influenciam o risco de sequelas neurológicas em prematuros:
    </p>

    <div class="space-y-4 mb-8">
      <div class="flex items-start bg-[#F0F9FF] p-4 rounded-lg">
        <span class="text-[#4A96D1] font-bold mr-3 mt-0.5">•</span>
        <p class="text-gray-700"><span class="font-semibold text-[#4A96D1]">Idade Gestacional e Peso ao Nascer:</span> Quanto menor a idade gestacional e o peso ao nascer, maior o risco de lesões cerebrais e sequelas neurológicas.</p>
      </div>
      
      <div class="flex items-start bg-[#F0F9FF] p-4 rounded-lg">
        <span class="text-[#4A96D1] font-bold mr-3 mt-0.5">•</span>
        <p class="text-gray-700"><span class="font-semibold text-[#4A96D1]">Instabilidade Hemodinâmica:</span> Flutuações na pressão arterial, hipotensão persistente e necessidade de suporte inotrópico aumentam o risco de lesões cerebrais.</p>
      </div>
      
      <div class="flex items-start bg-[#F0F9FF] p-4 rounded-lg">
        <span class="text-[#4A96D1] font-bold mr-3 mt-0.5">•</span>
        <p class="text-gray-700"><span class="font-semibold text-[#4A96D1]">Infecções:</span> Corioamnionite materna e sepse neonatal estão associadas a maior risco de lesão cerebral, possivelmente mediado pela resposta inflamatória sistêmica.</p>
      </div>
      
      <div class="flex items-start bg-[#F0F9FF] p-4 rounded-lg">
        <span class="text-[#4A96D1] font-bold mr-3 mt-0.5">•</span>
        <p class="text-gray-700"><span class="font-semibold text-[#4A96D1]">Distúrbios Respiratórios:</span> Hipoxemia, hipercarbia e necessidade de ventilação mecânica prolongada podem afetar a perfusão cerebral e contribuir para lesões cerebrais.</p>
      </div>
      
      <div class="flex items-start bg-[#F0F9FF] p-4 rounded-lg">
        <span class="text-[#4A96D1] font-bold mr-3 mt-0.5">•</span>
        <p class="text-gray-700"><span class="font-semibold text-[#4A96D1]">Fatores Protetores:</span> Corticoterapia antenatal completa, prevenção de infecções, estabilidade hemodinâmica e estratégias de ventilação protetora podem reduzir o risco de lesões cerebrais.</p>
      </div>
    </div>

    <h3 class="text-2xl text-[#6EC1E4] mt-10 mb-4 font-semibold" id="abordagem-fisioterapeutica">Abordagem Fisioterapêutica</h3>
    <p class="text-gray-700 mb-6">
      A intervenção fisioterapêutica precoce é fundamental para minimizar as sequelas neurológicas e potencializar o desenvolvimento:
    </p>
    
    <div class="my-10">
      <div class="relative h-[350px] md:h-[450px] lg:h-[500px] w-full rounded-xl overflow-hidden shadow-md mb-4 bg-gray-50 flex items-center justify-center p-4">
        <img src="/images/neonatal/fisioterapia-neurologica.webp" alt="Fisioterapia neurológica em prematuros" class="max-h-full max-w-full object-contain" style="object-fit: contain;" />
      </div>
      <p class="text-sm text-center text-gray-600 italic">Figura 3: Técnicas de fisioterapia neurológica aplicadas em bebês prematuros</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 mb-8">
      <div class="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
        <h4 class="text-[#4A96D1] font-semibold text-lg mb-2">Intervenção na UTIN</h4>
        <ul class="text-gray-700 text-sm space-y-2">
          <li class="flex items-start">
            <span class="text-[#6EC1E4] mr-2">•</span>
            <span>Posicionamento terapêutico para prevenir deformidades e promover alinhamento</span>
          </li>
          <li class="flex items-start">
            <span class="text-[#6EC1E4] mr-2">•</span>
            <span>Contenção facilitada para organização comportamental</span>
          </li>
          <li class="flex items-start">
            <span class="text-[#6EC1E4] mr-2">•</span>
            <span>Estimulação sensorial controlada e adequada à maturidade do SNC</span>
          </li>
          <li class="flex items-start">
            <span class="text-[#6EC1E4] mr-2">•</span>
            <span>Orientação para manuseio mínimo em momentos de instabilidade</span>
          </li>
        </ul>
      </div>
      
      <div class="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
        <h4 class="text-[#4A96D1] font-semibold text-lg mb-2">Follow-up Ambulatorial</h4>
        <ul class="text-gray-700 text-sm space-y-2">
          <li class="flex items-start">
            <span class="text-[#6EC1E4] mr-2">•</span>
            <span>Avaliação periódica do desenvolvimento neuropsicomotor</span>
          </li>
          <li class="flex items-start">
            <span class="text-[#6EC1E4] mr-2">•</span>
            <span>Identificação precoce de alterações no tônus muscular e padrões posturais</span>
          </li>
          <li class="flex items-start">
            <span class="text-[#6EC1E4] mr-2">•</span>
            <span>Intervenção baseada nos princípios de controle motor e aprendizagem motora</span>
          </li>
          <li class="flex items-start">
            <span class="text-[#6EC1E4] mr-2">•</span>
            <span>Orientação familiar para continuidade da terapia em ambiente domiciliar</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 mb-8">
      <div class="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
        <h4 class="text-[#4A96D1] font-semibold text-lg mb-2">Abordagens Terapêuticas</h4>
        <ul class="text-gray-700 text-sm space-y-2">
          <li class="flex items-start">
            <span class="text-[#6EC1E4] mr-2">•</span>
            <span>Conceito Neuroevolutivo Bobath: facilitação de padrões normais de movimento</span>
          </li>
          <li class="flex items-start">
            <span class="text-[#6EC1E4] mr-2">•</span>
            <span>Integração Sensorial: organização de estímulos sensoriais para respostas adaptativas</span>
          </li>
          <li class="flex items-start">
            <span class="text-[#6EC1E4] mr-2">•</span>
            <span>Terapia de Restrição e Indução de Movimento modificada: para assimetrias de movimento</span>
          </li>
          <li class="flex items-start">
            <span class="text-[#6EC1E4] mr-2">•</span>
            <span>Estimulação do Desenvolvimento: atividades específicas para cada fase</span>
          </li>
        </ul>
      </div>
      
      <div class="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
        <h4 class="text-[#4A96D1] font-semibold text-lg mb-2">Tecnologia e Inovação</h4>
        <ul class="text-gray-700 text-sm space-y-2">
          <li class="flex items-start">
            <span class="text-[#6EC1E4] mr-2">•</span>
            <span>Uso de realidade virtual adaptada para estímulo de funções cognitivas e motoras</span>
          </li>
          <li class="flex items-start">
            <span class="text-[#6EC1E4] mr-2">•</span>
            <span>Biofeedback para treinamento específico de grupos musculares</span>
          </li>
          <li class="flex items-start">
            <span class="text-[#6EC1E4] mr-2">•</span>
            <span>Órteses e dispositivos de assistência personalizados</span>
          </li>
          <li class="flex items-start">
            <span class="text-[#6EC1E4] mr-2">•</span>
            <span>Sistemas de avaliação computadorizada do movimento e postura</span>
          </li>
        </ul>
      </div>
    </div>

    <h3 class="text-2xl text-[#6EC1E4] mt-10 mb-4 font-semibold" id="consideracoes-finais">Considerações Finais</h3>
    <p class="text-gray-700 mb-4">
      As sequelas neurológicas em prematuros representam um desafio significativo, mas há estratégias eficazes para minimizar seu impacto:
    </p>
    
    <p class="text-gray-700 mb-6">
      A prevenção da prematuridade é a intervenção mais efetiva. Quando esta não é possível, o adequado manejo perinatal, 
      incluindo corticoterapia antenatal, prevenção de infecções e estratégias de neuroproteção, pode reduzir 
      significativamente o risco de lesões cerebrais. O acompanhamento multidisciplinar de longo prazo é essencial para 
      identificar precocemente alterações no desenvolvimento e implementar intervenções adequadas, maximizando o potencial 
      neuroplástico do cérebro em desenvolvimento.
    </p>

    <div class="my-8 p-6 bg-[#F0F9FF] border border-[#E0E0E0] rounded-xl shadow-sm">
      <h3 class="text-xl font-semibold text-[#4A96D1] mb-4">Pontos-chave sobre Sequelas Neurológicas em Prematuros</h3>
      <ul class="space-y-2">
        <li class="flex items-start">
          <span class="text-[#6EC1E4] mr-2">•</span>
          <span class="text-gray-700">A prematuridade interrompe o desenvolvimento cerebral em momentos críticos, podendo resultar em sequelas neurológicas a curto e longo prazo</span>
        </li>
        <li class="flex items-start">
          <span class="text-[#6EC1E4] mr-2">•</span>
          <span class="text-gray-700">HPIV e LPV são as principais lesões cerebrais em prematuros, associadas a maior risco de sequelas como paralisia cerebral</span>
        </li>
        <li class="flex items-start">
          <span class="text-[#6EC1E4] mr-2">•</span>
          <span class="text-gray-700">Além das sequelas motoras, prematuros apresentam maior risco de comprometimento cognitivo, comportamental e de aprendizagem</span>
        </li>
        <li class="flex items-start">
          <span class="text-[#6EC1E4] mr-2">•</span>
          <span class="text-gray-700">A fisioterapia iniciada precocemente, desde a UTIN, pode minimizar sequelas e potencializar o desenvolvimento neuropsicomotor</span>
        </li>
        <li class="flex items-start">
          <span class="text-[#6EC1E4] mr-2">•</span>
          <span class="text-gray-700">O acompanhamento multidisciplinar de longo prazo é fundamental para o manejo adequado das sequelas neurológicas e para maximizar a funcionalidade</span>
        </li>
      </ul>
    </div>
  </div>
`;

export default SequelasNeurologicasContent; 