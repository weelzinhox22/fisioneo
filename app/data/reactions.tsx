import { HeartPulse } from "lucide-react"
import { ReactNode } from "react"

export interface Reaction {
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

export const reactions: Reaction[] = [
  {
    id: "reacoes-0-15",
    title: "Reações de 0 a 15 meses",
    description: "Reações posturais e de equilíbrio durante o primeiro ano de vida.",
    icon: <HeartPulse className="h-10 w-10 text-[#6EC1E4]" />,
    images: [
      {
        src: "/images/reacoes/desenvolvimento-motor.jpg",
        alt: "Tabela de desenvolvimento motor",
        caption: "Evolução do desenvolvimento motor no primeiro ano de vida"
      },
      {
        src: "/images/reacoes/reflexos-primitivos.jpg",
        alt: "Tabela de reflexos primitivos",
        caption: "Evolução dos reflexos primitivos por idade"
      }
    ],
    content: `
      <h2 id="desenvolvimento-motor" class="text-3xl font-bold text-[#4A96D1] mb-6">Desenvolvimento Neuropsicomotor do Bebê: Primeiro ao Décimo Quinto Mês de Vida</h2>
      
      <h3 class="text-2xl text-[#6EC1E4] mt-10 mb-4 font-semibold">Conceitos Essenciais</h3>
      
      <p class="text-gray-700">No primeiro ano de vida, os reflexos do bebê mudam à medida que o sistema nervoso central se desenvolve, permitindo movimentos mais complexos e intencionais. As experiências sensório-motoras da criança ajudam no desenvolvimento das habilidades motoras, criando e reorganizando conexões no cérebro.</p>
      
      <p class="text-gray-700">As etapas do desenvolvimento motor acontecem de forma gradual e organizada, onde cada etapa depende da anterior para que a próxima aconteça. Por exemplo, o bebê precisa aprender a equilibrar a cabeça e o tronco antes de conseguir ficar de pé e andar. A ordem em que essas habilidades são adquiridas pode variar, mas a sequência geral é interdependente.</p>
      
      <div class="my-6">
        <div class="relative h-[300px] md:h-[400px] w-full rounded-xl overflow-hidden shadow-md mb-4 bg-gray-50">
          <img src="/images/reacoes/desenvolvimento-motor.jpg" alt="Evolução de desenvolvimento motor" class="object-contain w-full h-full" style="object-fit: scale-down;" />
        </div>
        <p class="text-sm text-center text-gray-600 italic">Progressão do desenvolvimento motor no primeiro ano de vida</p>
      </div>
      
      <ul class="mt-4 mb-6">
        <li class="flex items-start my-1.5"><strong class="text-[#4A96D1] font-semibold">Controle cefálico:</strong> <span class="text-gray-700">É a primeira grande conquista, geralmente alcançada entre 2-3 meses.</span></li>
        <li class="flex items-start my-1.5"><strong class="text-[#4A96D1] font-semibold">Sentar com apoio:</strong> <span class="text-gray-700">Em torno dos 5-6 meses, o bebê consegue sentar com algum apoio.</span></li>
        <li class="flex items-start my-1.5"><strong class="text-[#4A96D1] font-semibold">Sentar sem apoio:</strong> <span class="text-gray-700">Geralmente alcançado entre 6-8 meses, marca importante estabilidade do tronco.</span></li>
        <li class="flex items-start my-1.5"><strong class="text-[#4A96D1] font-semibold">Engatinhar:</strong> <span class="text-gray-700">Entre 8-10 meses, a criança inicia os movimentos de engatinhar.</span></li>
      </ul>
      
      <p class="text-gray-700">O acompanhamento do desenvolvimento motor é feito observando os movimentos espontâneos, provocados, dirigidos e a forma como o bebê se move livremente, avaliando o tônus muscular, os reflexos e comparando com o desenvolvimento motor considerado normal, além de usar testes padronizados.</p>
      
      <h3 id="avaliação-observacional-da-motricidade" class="text-2xl text-[#6EC1E4] mt-10 mb-4 font-semibold">Avaliação Observacional da Motricidade</h3>
      
      <p class="text-gray-700">A motricidade espontânea é a forma como o bebê se move naturalmente. Para avaliar, o bebê precisa estar acordado, e não é necessário contato visual direto. É melhor observar entre as mamadas, pois o bebê pode ficar sonolento depois de mamar. Se o bebê estiver chorando muito, a observação pode ser difícil, mas ainda pode ser feita, lembrando que a movimentação pode estar aumentada.</p>
      
      <p class="text-gray-700">Ao observar a motricidade espontânea de um bebê de até três meses, é importante verificar se:</p>
      
      <div class="my-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 max-w-md mx-auto">
          <div class="relative h-44 w-full rounded-lg overflow-hidden mb-3">
            <img src="/images/reacoes/desenvolvimento-motor-2.webp" alt="Bebê demonstrando movimentos espontâneos" class="object-cover w-full h-full" />
          </div>
          <p class="text-sm text-center text-gray-600 italic">A observação dos movimentos espontâneos é fundamental para avaliar o desenvolvimento neurológico.</p>
        </div>
      </div>
      
      <ul class="mt-4 mb-6">
        <li class="flex items-start my-1.5"><strong class="text-[#4A96D1] font-semibold">Os movimentos são simétricos.</strong> <span class="text-gray-700">Uma assimetria persistente pode indicar problemas neurológicos localizados.</span></li>
        <li class="flex items-start my-1.5"><strong class="text-[#4A96D1] font-semibold">As mãos abrem e fecham sozinhas.</strong> <span class="text-gray-700">Mãos permanentemente fechadas podem indicar aumento do tônus muscular.</span></li>
        <li class="flex items-start my-1.5"><strong class="text-[#4A96D1] font-semibold">Os braços e pernas se movem livremente,</strong> <span class="text-gray-700">aumentando conforme a roupa é retirada, até o bebê estar sem roupa em um ambiente aquecido.</span></li>
        <li class="flex items-start my-1.5"><strong class="text-[#4A96D1] font-semibold">Os movimentos de "busca e fuga" acontecem nos braços,</strong> <span class="text-gray-700">com as mãos tentando se encontrar no meio do corpo. A posição da cabeça pode influenciar esses movimentos.</span></li>
        <li class="flex items-start my-1.5"><strong class="text-[#4A96D1] font-semibold">Os movimentos das pernas são menores que os dos braços,</strong> <span class="text-gray-700">imitando um pedalar rítmico e harmonioso.</span></li>
      </ul>
      
      <p class="text-gray-700">Em bebês com problemas no sistema nervoso central, a motricidade espontânea pode ser limitada, os movimentos não se direcionam ao centro do corpo e o tônus muscular pode ser maior.</p>
      
      <p class="text-gray-700">A motricidade provocada complementa a espontânea. O examinador estimula o bebê com contato visual ou tocando suavemente o abdômen, rosto ou corpo com um tecido leve, observando as reações. É importante notar se:</p>
      
      <ul class="mt-4 mb-6">
        <li class="flex items-start my-1.5"><strong class="text-[#4A96D1] font-semibold">Há um aumento repentino nos movimentos dos braços,</strong> <span class="text-gray-700">se são rápidos e amplos, ou se continuam buscando o centro do corpo.</span></li>
        <li class="flex items-start my-1.5"><strong class="text-[#4A96D1] font-semibold">A qualidade do movimento é simétrica em todo o corpo</strong> <span class="text-gray-700">e se as mãos abrem e fecham.</span></li>
        <li class="flex items-start my-1.5"><strong class="text-[#4A96D1] font-semibold">Os movimentos das pernas acompanham o aumento geral da movimentação</strong> <span class="text-gray-700">e se os movimentos de dobrar e esticar as pernas aumentam.</span></li>
      </ul>
      
      <p class="text-gray-700">Como o tônus muscular do bebê de até dois meses é geralmente flexionado, a extensão total das pernas raramente é vista nessa fase.</p>
      
      <p class="text-gray-700">A motricidade liberada é obtida quando a nuca do bebê é sustentada com uma mão, enquanto ele está semissentado, permitindo que o corpo se mova livremente. O examinador deve estar de frente para o bebê, na mesma altura, para interagir visualmente e verbalmente. É importante observar:</p>
      
      <ul class="mt-4 mb-6">
        <li class="flex items-start my-1.5"><strong class="text-[#4A96D1] font-semibold">Se os movimentos amplos diminuem</strong> <span class="text-gray-700">e a qualidade dos movimentos dos braços melhora, tornando-se mais complexos.</span></li>
        <li class="flex items-start my-1.5"><strong class="text-[#4A96D1] font-semibold">Se as mãos estão preferencialmente abertas.</strong> <span class="text-gray-700">Mãos constantemente fechadas podem indicar problemas.</span></li>
        <li class="flex items-start my-1.5"><strong class="text-[#4A96D1] font-semibold">Se o pescoço e o tronco se endireitam</strong> <span class="text-gray-700">indicando bom controle postural inicial.</span></li>
      </ul>
      
      <p class="text-gray-700">A motricidade dirigida é obtida através de estímulos no corpo da criança, direcionando o movimento. Ao examinar a motricidade dirigida, espera-se que o toque cause movimento nos braços (como girar a palma para cima e para baixo, e abrir os dedos) e nas pernas (principalmente nos pés). O examinador deve usar um toque leve e repetido. Pouca seletividade ou movimentos assimétricos podem indicar problemas no tônus muscular. A tensão muscular excessiva pode restringir os movimentos, causando contrações musculares excessivas, perda de controle e ação muscular descoordenada.</p>
      
      <h3 id="avaliação-do-tônus-muscular" class="text-2xl text-[#6EC1E4] mt-10 mb-4 font-semibold">Avaliação do Tônus Muscular</h3>
      
      <p class="text-gray-700">Após o nascimento, o bebê passa por quatro padrões de tônus muscular: dois flexores e dois extensores.</p>
      
      <ul class="mt-4 mb-6">
        <li class="flex items-start my-1.5"><strong class="text-[#4A96D1] font-semibold">Padrão flexor do recém-nascido:</strong> <span class="text-gray-700">Os membros do corpo ficam flexionados. Os movimentos são direcionados para o centro do corpo, e quando de bruços, o peso se concentra no pescoço, exigindo esforço para estendê-lo.</span></li>
        <li class="flex items-start my-1.5"><strong class="text-[#4A96D1] font-semibold">Primeiro padrão extensor (4 meses):</strong> <span class="text-gray-700">De bruços, o bebê consegue estender-se totalmente, tirando braços e pernas do chão e apoiando-se no abdômen. Quando colocado de pé, consegue sustentar o próprio peso.</span></li>
        <li class="flex items-start my-1.5"><strong class="text-[#4A96D1] font-semibold">Segundo padrão flexor (6 meses):</strong> <span class="text-gray-700">O bebê consegue segurar os pés e levá-los à boca. Esse padrão, junto com as habilidades motoras, permite que o bebê fique de gatas.</span></li>
        <li class="flex items-start my-1.5"><strong class="text-[#4A96D1] font-semibold">Último padrão extensor:</strong> <span class="text-gray-700">A criança consegue saltar quando colocada de pé. O melhor equilíbrio permite liberar uma das mãos quando está de gatas e depois de pé.</span></li>
      </ul>
      
      <div class="my-8">
        <div class="relative h-[300px] md:h-[400px] w-full rounded-xl overflow-hidden shadow-md mb-4 bg-gray-50">
          <img src="/images/reacoes/bebe-hipotonico.webp" alt="Bebê deitado com as pernas sendo movimentadas por um adulto durante avaliação do tônus muscular" class="object-contain w-full h-full" style="object-fit: scale-down;" />
        </div>
        <p class="text-sm text-center text-gray-600 italic">Avaliação do tônus muscular em um bebê. Essa etapa é fundamental no acompanhamento do desenvolvimento motor infantil, permitindo identificar precocemente alterações musculares como hipertonia ou hipotonia.</p>
      </div>
      
      <p class="text-gray-700">Anormalidades no tônus muscular são sinais de problemas no desenvolvimento neuro-sensório-motor. Essas alterações incluem:</p>
      
      <ul class="mt-4 mb-6">
        <li class="flex items-start my-1.5"><strong class="text-[#4A96D1] font-semibold">Hipotonia:</strong> <span class="text-gray-700">Diminuição da tensão muscular</span></li>
        <li class="flex items-start my-1.5"><strong class="text-[#4A96D1] font-semibold">Hipertonia:</strong> <span class="text-gray-700">Aumento da tensão muscular</span></li>
        <li class="flex items-start my-1.5"><strong class="text-[#4A96D1] font-semibold">Flutuação tônica:</strong> <span class="text-gray-700">Variação entre diminuição e aumento da tensão</span></li>
      </ul>
      
      <p class="text-gray-700">Crianças com a Síndrome Congênita do Vírus Zika podem apresentar alterações no tônus muscular, com variações na forma como se movem. Frequentemente, essas crianças têm atraso motor e, com tônus muscular aumentado ou flutuante, desenvolvem formas adaptadas de movimento, podendo não alcançar todas as etapas do desenvolvimento. É importante conhecer a história da doença, as capacidades da criança e prever o desenvolvimento motor para definir metas de tratamento e avaliar os resultados.</p>
      
      
      <p class="text-gray-700">A idade em que a criança consegue equilibrar a cabeça, sentar e engatinhar, em casos de crianças com tônus muscular aumentado, são parâmetros para prever se ela irá andar:</p>
      
      <ul class="mt-4 mb-6">
        <li class="flex items-start my-1.5"><span class="text-gray-700">Equilibrar a cabeça antes dos nove meses: bom sinal para a marcha</span></li>
        <li class="flex items-start my-1.5"><span class="text-gray-700">Equilibrar a cabeça após os 20 meses: prognóstico ruim</span></li>
        <li class="flex items-start my-1.5"><span class="text-gray-700">Sentar sem apoio por volta dos 24 meses: prognóstico favorável</span></li>
        <li class="flex items-start my-1.5"><span class="text-gray-700">Engatinhar antes dos 30 meses: prognóstico favorável</span></li>
      </ul>

      <div class="my-8">
        <div class="relative h-[300px] md:h-[400px] w-full rounded-xl overflow-hidden shadow-md mb-4 bg-gray-50">
          <img src="/images/reacoes/av-prog-marcha.jpg" alt="Avaliação do prognóstico de marcha" class="object-contain w-full h-full" style="object-fit: scale-down;" />
        </div>
        <p class="text-sm text-center text-gray-600 italic"> Avaliação do prognóstico de marcha</p>
      </div>      

      <h3 id="avaliação-das-reações-e-reflexos-primitivos" class="text-2xl text-[#6EC1E4] mt-10 mb-4 font-semibold">Avaliação das Reações e Reflexos Primitivos</h3>
      
      <p class="text-gray-700">Os reflexos podem ser divididos em três grupos, conforme sua evolução:</p>
      
      <ul class="mt-4 mb-6">
        <li class="flex items-start my-1.5"><strong class="text-[#4A96D1] font-semibold">Reflexos que são normais por um tempo e desaparecem:</strong> <span class="text-gray-700">Reaparecendo apenas em situações anormais: reflexo tônico cervical e de retificação corporal (desaparecem com um ou dois meses), reflexo de Moro (desaparece por volta de 4-6 meses) e o sinal de Babinski (pode ser normal até 18 meses quando nos dois pés).</span></li>
        <li class="flex items-start my-1.5"><strong class="text-[#4A96D1] font-semibold">Reflexos que existem, desaparecem e reaparecem como ações intencionais:</strong> <span class="text-gray-700">Reflexo de preensão, sucção e marcha, por exemplo.</span></li>
        <li class="flex items-start my-1.5"><strong class="text-[#4A96D1] font-semibold">Ações que permanecem por toda a vida:</strong> <span class="text-gray-700">Reflexos profundos e os reflexos cutâneos abdominais.</span></li>
      </ul>
      
      <p class="text-gray-700">A observação dos reflexos nos bebês é muito importante, pois a persistência, ausência ou intensidade incomum desses reflexos podem indicar problemas neurológicos.</p>
      
      <div class="my-8">
        <div class="relative h-[300px] md:h-[400px] w-full rounded-xl overflow-hidden shadow-md mb-4 bg-gray-50">
          <img src="/images/reacoes/av-ref-pri.jpg" alt="Reações e Reflexos Primitivos" class="object-contain w-full h-full" style="object-fit: scale-down;" />
        </div>
        <p class="text-sm text-center text-gray-600 italic">Reações e Reflexos Primitivos - Idade de início até inibição</p>
      </div>      

      
      <div class="my-8 p-6 bg-[#FFF8F8] border border-[#FFDBDB] rounded-xl shadow-sm">
        <h3 class="text-xl font-semibold text-[#D03131] mb-4">Sinais de Alerta</h3>
        <ul class="space-y-2">
          <li class="flex items-start">
            <span class="text-[#D03131] mr-2">•</span>
            <span class="text-gray-700">Assimetria persistente nos movimentos ou postura</span>
          </li>
          <li class="flex items-start">
            <span class="text-[#D03131] mr-2">•</span>
            <span class="text-gray-700">Mãos persistentemente fechadas após 3 meses</span>
          </li>
          <li class="flex items-start">
            <span class="text-[#D03131] mr-2">•</span>
            <span class="text-gray-700">Ausência de movimentos espontâneos ou movimentação excessiva</span>
          </li>
          <li class="flex items-start">
            <span class="text-[#D03131] mr-2">•</span>
            <span class="text-gray-700">Persistência de reflexos primitivos além do tempo esperado</span>
          </li>
          <li class="flex items-start">
            <span class="text-[#D03131] mr-2">•</span>
            <span class="text-gray-700">Atraso no controle cefálico após 3 meses</span>
          </li>
          <li class="flex items-start">
            <span class="text-[#D03131] mr-2">•</span>
            <span class="text-gray-700">Tônus muscular aumentado ou diminuído de forma anormal</span>
          </li>
          <li class="flex items-start">
            <span class="text-[#D03131] mr-2">•</span>
            <span class="text-gray-700">Dificuldade para manter posturas esperadas para a idade</span>
          </li>
          <li class="flex items-start">
            <span class="text-[#D03131] mr-2">•</span>
            <span class="text-gray-700">Ausência de reações de proteção ou equilíbrio</span>
          </li>
        </ul>
      </div>
      
      <h3 class="text-2xl text-[#6EC1E4] mt-10 mb-4 font-semibold">Considerações Adicionais</h3>
      <ul class="mt-4 mb-6">
        <li class="flex items-start my-1.5"><strong class="text-[#4A96D1] font-semibold">Variabilidade Normal:</strong> <span class="text-gray-700">É importante lembrar que existe uma ampla variação normal no desenvolvimento. Alguns bebês desenvolvem certas habilidades antes de outras. A sequência e qualidade das aquisições são mais importantes que a idade exata.</span></li>
        <li class="flex items-start my-1.5"><strong class="text-[#4A96D1] font-semibold">Adaptação para Prematuridade:</strong> <span class="text-gray-700">Lembre-se sempre de adaptar as avaliações à idade corrigida da criança, especialmente em casos de prematuridade.</span></li>
        <li class="flex items-start my-1.5"><strong class="text-[#4A96D1] font-semibold">Acompanhamento Profissional:</strong> <span class="text-gray-700">O acompanhamento regular com um profissional de saúde é fundamental para identificar precocemente qualquer desvio no desenvolvimento e garantir a intervenção adequada.</span></li>
        <li class="flex items-start my-1.5"><strong class="text-[#4A96D1] font-semibold">Desenvolvimento Integrado:</strong> <span class="text-gray-700">O desenvolvimento infantil é integrado, com a motricidade, cognição, linguagem e socialização evoluindo de forma interrelacionada.</span></li>
      </ul>
      <p class="text-gray-700">A estimulação adequada e um ambiente enriquecedor são fundamentais para potencializar todas as áreas do desenvolvimento do bebê durante este primeiro ano crítico de vida.</p>
    `,
  },
]