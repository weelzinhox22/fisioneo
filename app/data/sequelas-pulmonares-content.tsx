import React from 'react';

const SequelasPulmonaresContent = `
  <div class="prose max-w-none">
    <h2 class="text-3xl font-bold text-[#4A96D1] mb-6">Sequelas de Doenças Pulmonares em Prematuros</h2>
    
    <div class="bg-blue-50 p-6 rounded-xl mb-8">
      <h3 class="text-xl text-[#4A96D1] mb-4 font-semibold">Introdução e Contexto da Prematuridade</h3>
      <p class="text-gray-700">
        O aumento da sobrevida de recém-nascidos pré-termo, impulsionado por avanços nos cuidados intensivos neonatais, 
        corticoterapia antenatal, surfactante e novas técnicas de ventilação, trouxe um paradoxo: mais bebês prematuros 
        estão sobrevivendo, mas muitos enfrentam morbidades respiratórias tardias, como a displasia broncopulmonar (DBP). 
        Problemas como tosse, sibilância recorrente e até falência respiratória são complicações importantes que afetam 
        a qualidade de vida desses pacientes a longo prazo.
      </p>
    </div>

    <div class="topic-quick-nav">
      <div class="nav-items">
        <a href="#desenvolvimento-pulmonar-intrauterino" class="nav-item">Desenvolvimento Pulmonar</a>
        <a href="#doenca-pulmonar-cronica-da-prematuridade" class="nav-item">Doença Pulmonar Crônica</a>
        <a href="#evolucao-respiratoria-clinica-e-funcional" class="nav-item">Evolução Clínica</a>
        <a href="#avaliacao-funcional-respiratoria" class="nav-item">Avaliação Funcional</a>
        <a href="#consequencias-a-longo-prazo" class="nav-item">Consequências</a>
        <a href="#abordagem-fisioterapeutica" class="nav-item">Abordagem Fisioterapêutica</a>
        <a href="#consideracoes-finais" class="nav-item">Considerações Finais</a>
      </div>
    </div>

    <div class="my-10">
      <div class="relative h-[350px] md:h-[450px] lg:h-[500px] w-full rounded-xl overflow-hidden shadow-md mb-4 bg-gray-50 flex items-center justify-center p-4">
        <img src="/images/neonatal/pulmao-prematuro.jpg" alt="Atelectasia e alterações pulmonares em recém-nascidos prematuros no período neonatal" class="max-h-full max-w-full object-contain" style="object-fit: contain;" />
      </div>
      <p class="text-sm text-center text-gray-600 italic">Figura 1: Atelectasia e alterações pulmonares em recém-nascidos prematuros no período neonatal</p>
    </div>

    <h3 class="text-2xl text-[#6EC1E4] mt-10 mb-4 font-semibold" id="desenvolvimento-pulmonar-intrauterino">Desenvolvimento Pulmonar Intrauterino</h3>
    <p class="text-gray-700 mb-6">
      Para compreender o impacto da prematuridade no sistema respiratório, é essencial conhecer as fases do desenvolvimento pulmonar normal:
    </p>
    
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6 mb-8">
      <div class="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100">
        <div class="bg-gradient-to-r from-[#4A96D1]/10 to-[#6EC1E4]/5 p-3 border-b border-gray-100">
          <h4 class="text-[#4A96D1] font-semibold text-lg">Fase Pseudoglandular</h4>
          <p class="text-xs text-gray-500">5-17 semanas</p>
        </div>
        <div class="p-4">
          <p class="text-gray-700 text-sm">Formação das vias aéreas condutoras, com ramificações brônquicas até bronquíolos terminais. Desenvolvimento da cartilagem, músculo liso e glândulas.</p>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100">
        <div class="bg-gradient-to-r from-[#4A96D1]/10 to-[#6EC1E4]/5 p-3 border-b border-gray-100">
          <h4 class="text-[#4A96D1] font-semibold text-lg">Fase Canalicular</h4>
          <p class="text-xs text-gray-500">16-26 semanas</p>
        </div>
        <div class="p-4">
          <p class="text-gray-700 text-sm">Aumento do calibre das vias aéreas, desenvolvimento dos bronquíolos respiratórios, ductos alveolares e início da formação da barreira alvéolo-capilar.</p>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100">
        <div class="bg-gradient-to-r from-[#4A96D1]/10 to-[#6EC1E4]/5 p-3 border-b border-gray-100">
          <h4 class="text-[#4A96D1] font-semibold text-lg">Fase Sacular</h4>
          <p class="text-xs text-gray-500">24-38 semanas</p>
        </div>
        <div class="p-4">
          <p class="text-gray-700 text-sm">Desenvolvimento dos ácinos, com formação de sacos terminais. Afinamento do epitélio respiratório e aproximação dos capilares. Início da produção de surfactante.</p>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100">
        <div class="bg-gradient-to-r from-[#4A96D1]/10 to-[#6EC1E4]/5 p-3 border-b border-gray-100">
          <h4 class="text-[#4A96D1] font-semibold text-lg">Fase Alveolar</h4>
          <p class="text-xs text-gray-500">36 semanas - 8 anos</p>
        </div>
        <div class="p-4">
          <p class="text-gray-700 text-sm">Formação dos alvéolos verdadeiros através de septação secundária. Multiplicação alveolar intensa nos primeiros 2 anos de vida, continuando até aproximadamente 8 anos.</p>
        </div>
      </div>
    </div>

    <p class="text-gray-700 mb-6">
      A alveolarização, processo crucial para a função pulmonar adequada, inicia-se por volta da 28ª semana e continua até a idade adulta. 
      Um nascimento prematuro interrompe esse processo fundamental, podendo resultar em alterações permanentes na arquitetura pulmonar. 
      Além disso, fatores pré-natais como insuficiência placentária, tabagismo materno e infecções podem prejudicar o desenvolvimento 
      pulmonar fetal antes mesmo do nascimento.
    </p>

    <h3 class="text-2xl text-[#6EC1E4] mt-10 mb-4 font-semibold" id="doenca-pulmonar-cronica-da-prematuridade">Doença Pulmonar Crônica da Prematuridade (DPCP)</h3>

    <div class="space-y-6 mt-8">
      <div class="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
        <h4 class="text-[#4A96D1] font-semibold text-lg mb-2">Displasia Broncopulmonar (DBP)</h4>
        <p class="text-gray-700">
          A DBP é a complicação respiratória crônica mais grave da prematuridade, caracterizada pela necessidade prolongada 
          de oxigênio e alterações radiológicas. Originalmente descrita por Northway em 1967, a DBP "clássica" estava associada 
          a lesão pulmonar induzida por ventilação mecânica agressiva e toxicidade do oxigênio. Atualmente, com a introdução 
          do surfactante exógeno e estratégias ventilatórias mais gentis, observa-se a "nova DBP", caracterizada principalmente 
          por interrupção do desenvolvimento alveolar normal, resultando em alvéolos maiores e em menor número, com redução 
          da área de troca gasosa.
        </p>
      </div>
      
      <div class="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
        <h4 class="text-[#4A96D1] font-semibold text-lg mb-2">Definições de DBP</h4>
        <p class="text-gray-700">
          Existem diferentes definições para a DBP, incluindo a dependência de oxigênio aos 28-30 dias de vida ou 
          a necessidade de oxigênio suplementar com 36 semanas de idade pós-concepcional. Em 2000, o NICHD propôs 
          uma classificação de gravidade baseada na necessidade de oxigênio ou suporte ventilatório em diferentes 
          idades pós-concepcionais, estratificando os pacientes de acordo com a idade gestacional ao nascimento.
        </p>
      </div>
      
      <div class="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
        <h4 class="text-[#4A96D1] font-semibold text-lg mb-2">Etiologia Multifatorial</h4>
        <p class="text-gray-700">
          A DBP tem etiologia multifatorial, envolvendo imaturidade pulmonar, inflamação, estresse oxidativo, 
          barotrauma/volutrauma, infecções e fatores genéticos. A inflamação pulmonar desempenha um papel central 
          no desenvolvimento da DBP, com aumento de citocinas pró-inflamatórias no lavado broncoalveolar de prematuros 
          que desenvolvem a doença. Fatores como persistência do canal arterial, administração excessiva de fluidos e 
          desnutrição também contribuem para o desenvolvimento da DBP.
        </p>
      </div>
    </div>

    <div class="my-10">
      <div class="relative h-[350px] md:h-[450px] lg:h-[500px] w-full rounded-xl overflow-hidden shadow-md mb-4 bg-gray-50 flex items-center justify-center p-4">
        <img src="/images/neonatal/dbp-radiografia.jpg" alt="Radiografia de tórax mostrando alterações típicas de DBP" class="max-h-full max-w-full object-contain" style="object-fit: contain;" />
      </div>
      <p class="text-sm text-center text-gray-600 italic">Figura 2: Radiografia de tórax mostrando alterações típicas de Displasia Broncopulmonar</p>
    </div>

    <h3 class="text-2xl text-[#6EC1E4] mt-10 mb-4 font-semibold" id="evolucao-respiratoria-clinica-e-funcional">Evolução Respiratória Clínica e Funcional</h3>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 mb-8">
      <div class="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
        <h4 class="text-[#4A96D1] font-semibold text-lg mb-2">Manifestações Clínicas</h4>
        <p class="text-gray-700 text-sm">
          Prematuros apresentam maior incidência de pneumonias, bronquiolites, re-hospitalizações, tosse e sibilância 
          crônicas e hiper-reatividade brônquica. Estudos mostram que prematuros com peso inferior a 1.000g têm um risco 
          significativamente maior de re-hospitalizações por infecções respiratórias, especialmente nos primeiros dois 
          anos de vida. Sobreviventes de DBP são mais propensos a infecções respiratórias inferiores e otite média aguda.
        </p>
      </div>
      
      <div class="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
        <h4 class="text-[#4A96D1] font-semibold text-lg mb-2">Impacto no Crescimento e Desenvolvimento</h4>
        <p class="text-gray-700 text-sm">
          A DBP, especialmente com necessidade de oxigenoterapia domiciliar, pode prejudicar o crescimento somático. 
          O gasto energético aumentado devido ao trabalho respiratório, associado a dificuldades na alimentação, 
          contribui para déficits nutricionais. Além disso, a DBP também está associada a alterações neurológicas, 
          incluindo maior risco de paralisia cerebral e atrasos no desenvolvimento neuropsicomotor.
        </p>
      </div>
    </div>

    <h3 class="text-2xl text-[#6EC1E4] mt-10 mb-4 font-semibold" id="avaliacao-funcional-respiratoria">Avaliação Funcional Respiratória</h3>
    <p class="text-gray-700 mb-4">
      A avaliação da função pulmonar em prematuros evoluiu significativamente nas últimas décadas:
    </p>

    <div class="space-y-4 mb-8">
      <div class="flex items-start bg-[#F0F9FF] p-4 rounded-lg">
        <span class="text-[#4A96D1] font-bold mr-3 mt-0.5">•</span>
        <p class="text-gray-700"><span class="font-semibold text-[#4A96D1]">Técnicas em Lactentes:</span> Compressão torácica rápida (manobras expiratórias forçadas parciais - MEFP) permite avaliar a função pulmonar de forma não invasiva em lactentes, identificando precocemente alterações nas vias aéreas.</p>
      </div>
      
      <div class="flex items-start bg-[#F0F9FF] p-4 rounded-lg">
        <span class="text-[#4A96D1] font-bold mr-3 mt-0.5">•</span>
        <p class="text-gray-700"><span class="font-semibold text-[#4A96D1]">Fatores de Risco:</span> A imaturidade pulmonar e a intensidade do suporte ventilatório são fatores de risco para alterações na função pulmonar. Estudos recentes sugerem que a idade gestacional e o retardo de crescimento intrauterino podem ser mais importantes do que as intercorrências perinatais.</p>
      </div>
      
      <div class="flex items-start bg-[#F0F9FF] p-4 rounded-lg">
        <span class="text-[#4A96D1] font-bold mr-3 mt-0.5">•</span>
        <p class="text-gray-700"><span class="font-semibold text-[#4A96D1]">Hipótese do Crescimento Dissináptico:</span> O retardo de crescimento intrauterino pode levar a um padrão de crescimento pulmonar discordante, com vias aéreas mais estreitas em relação ao volume do parênquima, predispondo a doenças obstrutivas na infância e vida adulta.</p>
      </div>
      
      <div class="flex items-start bg-[#F0F9FF] p-4 rounded-lg">
        <span class="text-[#4A96D1] font-bold mr-3 mt-0.5">•</span>
        <p class="text-gray-700"><span class="font-semibold text-[#4A96D1]">Prematuridade Per Se:</span> Mesmo poucos minutos de ventilação com pressão positiva podem causar danos epiteliais em neonatos imaturos. A prematuridade por si só pode ser um fator de risco independente para alterações na função pulmonar, mais evidentes nos primeiros anos de vida.</p>
      </div>
    </div>

    <h3 class="text-2xl text-[#6EC1E4] mt-10 mb-4 font-semibold" id="consequencias-a-longo-prazo">Consequências a Longo Prazo</h3>
    <p class="text-gray-700 mb-6">
      As consequências respiratórias da prematuridade podem persistir até a vida adulta:
    </p>
    
    <div class="my-10">
      <div class="relative h-[350px] md:h-[450px] lg:h-[500px] w-full rounded-xl overflow-hidden shadow-md mb-4 bg-gray-50 flex items-center justify-center p-4">
        <img src="/images/neonatal/funcao-pulmonar-grafico.jpg" alt="Síndrome do Desconforto Respiratório em prematuros" class="max-h-full max-w-full object-contain" style="object-fit: contain;" />
      </div>
      <p class="text-sm text-center text-gray-600 italic">Figura 3: Síndrome do Desconforto Respiratório em prematuros</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 mb-8">
      <div class="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
        <h4 class="text-[#4A96D1] font-semibold text-lg mb-2">Infância e Adolescência</h4>
        <ul class="text-gray-700 text-sm space-y-2">
          <li class="flex items-start">
            <span class="text-[#6EC1E4] mr-2">•</span>
            <span>Maior prevalência de asma e hiperresponsividade brônquica</span>
          </li>
          <li class="flex items-start">
            <span class="text-[#6EC1E4] mr-2">•</span>
            <span>Redução dos fluxos expiratórios, especialmente em pequenas vias aéreas</span>
          </li>
          <li class="flex items-start">
            <span class="text-[#6EC1E4] mr-2">•</span>
            <span>Capacidade de exercício reduzida em alguns pacientes</span>
          </li>
          <li class="flex items-start">
            <span class="text-[#6EC1E4] mr-2">•</span>
            <span>Maior sensibilidade a poluentes ambientais e tabagismo passivo</span>
          </li>
        </ul>
      </div>
      
      <div class="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
        <h4 class="text-[#4A96D1] font-semibold text-lg mb-2">Idade Adulta</h4>
        <ul class="text-gray-700 text-sm space-y-2">
          <li class="flex items-start">
            <span class="text-[#6EC1E4] mr-2">•</span>
            <span>Persistência de alterações obstrutivas em exames de função pulmonar</span>
          </li>
          <li class="flex items-start">
            <span class="text-[#6EC1E4] mr-2">•</span>
            <span>Maior risco de DPOC precoce, especialmente em fumantes</span>
          </li>
          <li class="flex items-start">
            <span class="text-[#6EC1E4] mr-2">•</span>
            <span>Possível redução da capacidade pulmonar total e volumes pulmonares</span>
          </li>
          <li class="flex items-start">
            <span class="text-[#6EC1E4] mr-2">•</span>
            <span>Alterações na difusão de gases em casos mais graves</span>
          </li>
        </ul>
      </div>
    </div>

    <h3 class="text-2xl text-[#6EC1E4] mt-10 mb-4 font-semibold" id="abordagem-fisioterapeutica">Abordagem Fisioterapêutica</h3>
    <p class="text-gray-700 mb-6">
      A fisioterapia respiratória desempenha papel fundamental no manejo das sequelas pulmonares em prematuros:
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 mb-8">
      <div class="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
        <h4 class="text-[#4A96D1] font-semibold text-lg mb-2">Fase Aguda (UTIN)</h4>
        <ul class="text-gray-700 text-sm space-y-2">
          <li class="flex items-start">
            <span class="text-[#6EC1E4] mr-2">•</span>
            <span>Posicionamento adequado para otimizar a relação ventilação-perfusão</span>
          </li>
          <li class="flex items-start">
            <span class="text-[#6EC1E4] mr-2">•</span>
            <span>Técnicas de higiene brônquica adaptadas à condição do RN</span>
          </li>
          <li class="flex items-start">
            <span class="text-[#6EC1E4] mr-2">•</span>
            <span>Aspiração de vias aéreas quando necessário, com técnica minimamente invasiva</span>
          </li>
          <li class="flex items-start">
            <span class="text-[#6EC1E4] mr-2">•</span>
            <span>Suporte à ventilação não-invasiva e desmame ventilatório</span>
          </li>
        </ul>
      </div>
      
      <div class="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
        <h4 class="text-[#4A96D1] font-semibold text-lg mb-2">Acompanhamento Ambulatorial</h4>
        <ul class="text-gray-700 text-sm space-y-2">
          <li class="flex items-start">
            <span class="text-[#6EC1E4] mr-2">•</span>
            <span>Avaliação periódica da função respiratória</span>
          </li>
          <li class="flex items-start">
            <span class="text-[#6EC1E4] mr-2">•</span>
            <span>Técnicas de desobstrução brônquica em casos de secreção aumentada</span>
          </li>
          <li class="flex items-start">
            <span class="text-[#6EC1E4] mr-2">•</span>
            <span>Exercícios respiratórios para melhorar volumes e capacidades</span>
          </li>
          <li class="flex items-start">
            <span class="text-[#6EC1E4] mr-2">•</span>
            <span>Orientação familiar para reconhecimento precoce de sinais de descompensação</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 mb-8">
      <div class="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
        <h4 class="text-[#4A96D1] font-semibold text-lg mb-2">Condicionamento Físico</h4>
        <ul class="text-gray-700 text-sm space-y-2">
          <li class="flex items-start">
            <span class="text-[#6EC1E4] mr-2">•</span>
            <span>Estímulo à atividade física regular adaptada à idade e condição</span>
          </li>
          <li class="flex items-start">
            <span class="text-[#6EC1E4] mr-2">•</span>
            <span>Treinamento muscular respiratório em casos selecionados</span>
          </li>
          <li class="flex items-start">
            <span class="text-[#6EC1E4] mr-2">•</span>
            <span>Exercícios aeróbicos para melhorar condicionamento cardiorrespiratório</span>
          </li>
          <li class="flex items-start">
            <span class="text-[#6EC1E4] mr-2">•</span>
            <span>Adaptação de atividades esportivas para promover desenvolvimento global</span>
          </li>
        </ul>
      </div>
      
      <div class="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
        <h4 class="text-[#4A96D1] font-semibold text-lg mb-2">Educação e Prevenção</h4>
        <ul class="text-gray-700 text-sm space-y-2">
          <li class="flex items-start">
            <span class="text-[#6EC1E4] mr-2">•</span>
            <span>Orientação sobre vacinação (incluindo profilaxia para VSR)</span>
          </li>
          <li class="flex items-start">
            <span class="text-[#6EC1E4] mr-2">•</span>
            <span>Educação sobre controle ambiental (alérgenos, poluentes, tabagismo)</span>
          </li>
          <li class="flex items-start">
            <span class="text-[#6EC1E4] mr-2">•</span>
            <span>Treinamento familiar para uso correto de dispositivos inalatórios quando necessário</span>
          </li>
          <li class="flex items-start">
            <span class="text-[#6EC1E4] mr-2">•</span>
            <span>Orientação nutricional para otimizar crescimento e desenvolvimento</span>
          </li>
        </ul>
      </div>
    </div>

    <h3 class="text-2xl text-[#6EC1E4] mt-10 mb-4 font-semibold" id="consideracoes-finais">Considerações Finais</h3>
    <p class="text-gray-700 mb-4">
      As sequelas pulmonares da prematuridade representam um desafio significativo para pacientes, famílias e profissionais de saúde:
    </p>
    
    <p class="text-gray-700 mb-6">
      A prematuridade e suas consequências alteram permanentemente o desenvolvimento do sistema respiratório. Os cuidados antenatais 
      e a prevenção da prematuridade são cruciais para a saúde pulmonar a longo prazo. Ainda existem muitas lacunas na compreensão 
      do crescimento e desenvolvimento pulmonar normal e da resposta a insultos precoces. A emergência de técnicas para mensuração 
      da função pulmonar em lactentes facilita a avaliação do impacto de exposições pré e pós-natais. O acompanhamento multidisciplinar 
      prolongado é essencial para otimizar a função pulmonar e a qualidade de vida desses pacientes.
    </p>

    <div class="my-8 p-6 bg-[#F0F9FF] border border-[#E0E0E0] rounded-xl shadow-sm">
      <h3 class="text-xl font-semibold text-[#4A96D1] mb-4">Pontos-chave sobre Sequelas Pulmonares em Prematuros</h3>
      <ul class="space-y-2">
        <li class="flex items-start">
          <span class="text-[#6EC1E4] mr-2">•</span>
          <span class="text-gray-700">O nascimento prematuro interrompe o desenvolvimento pulmonar normal, especialmente a alveolarização, que se inicia por volta da 28ª semana gestacional</span>
        </li>
        <li class="flex items-start">
          <span class="text-[#6EC1E4] mr-2">•</span>
          <span class="text-gray-700">A Displasia Broncopulmonar (DBP) é a principal complicação respiratória crônica da prematuridade, com impacto significativo na morbidade a longo prazo</span>
        </li>
        <li class="flex items-start">
          <span class="text-[#6EC1E4] mr-2">•</span>
          <span class="text-gray-700">Prematuros apresentam maior risco de infecções respiratórias, sibilância recorrente e asma na infância e adolescência</span>
        </li>
        <li class="flex items-start">
          <span class="text-[#6EC1E4] mr-2">•</span>
          <span class="text-gray-700">Alterações na função pulmonar podem persistir até a vida adulta, predispondo a doenças obstrutivas crônicas</span>
        </li>
        <li class="flex items-start">
          <span class="text-[#6EC1E4] mr-2">•</span>
          <span class="text-gray-700">A fisioterapia respiratória tem papel fundamental no manejo das sequelas pulmonares, desde a fase aguda na UTIN até o acompanhamento ambulatorial a longo prazo</span>
        </li>
      </ul>
    </div>
  </div>
`;

export default SequelasPulmonaresContent; 