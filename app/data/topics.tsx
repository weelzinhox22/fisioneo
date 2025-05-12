import { Baby, Brain, Droplets, HeartPulse, Stethoscope } from "lucide-react"
import { ReactNode } from "react"
import DorNeonatalContent from "./dor-neonatal-content"
import MetodoCanguruContent from "./metodo-canguru-content"
import HidroterapiaNeonatosContent from "./hidroterapia-neonatos-content"
import SequelasNeurologicasContent from "./sequelas-neurologicas-content"
import SequelasPulmonaresContent from "./sequelas-pulmonares-content"

export interface Topic {
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

export const topics: Topic[] = [
  {
    id: "reflexos-0-6",
    title: "Reflexos de 0 a 6 meses",
    description: "Estudo dos reflexos primitivos e sua evolução nos primeiros 6 meses de vida.",
    icon: <Baby className="h-10 w-10 text-[#6EC1E4]" />,
    images: [
      {
        src: "/images/reflexos/bebe-sentado.jpg",
        alt: "Bebê em posição sentada com apoio",
        caption: "Desenvolvimento do controle postural"
      },
      {
        src: "/images/reflexos/evolucao-postural.jpg",
        alt: "Evolução postural do bebê ao longo dos meses",
        caption: "Progressão do desenvolvimento postural"
      },
      {
        src: "/images/reflexos/tonus-muscular.jpg",
        alt: "Tabela de evolução do tônus muscular",
        caption: "Evolução do tônus muscular de acordo com a idade corrigida"
      },
      {
        src: "/images/reflexos/bebe-terapeuta-1.jpg",
        alt: "Bebê interagindo com terapeuta",
        caption: "Contato olho no olho e toque durante a terapia"
      },
      {
        src: "/images/reflexos/bebe-terapeuta-2.jpg",
        alt: "Bebê no colo do terapeuta",
        caption: "Posicionamento adequado no colo para estimulação"
      },
      {
        src: "/images/reflexos/bebe-supino-1.jpg",
        alt: "Bebê de 2 meses em posição supino",
        caption: "Posicionamento dos braços no segundo mês"
      },
      {
        src: "/images/reflexos/bebe-prono-1.jpg",
        alt: "Bebê de 2 meses em posição prono",
        caption: "Controle de cabeça aos 2 meses"
      },
      {
        src: "/images/reflexos/bebe-estimulo.jpg",
        alt: "Bebê recebendo estímulo para elevar a cabeça",
        caption: "Técnica de estimulação para controle cervical"
      },
      {
        src: "/images/reflexos/bebe-terapeuta-3.jpg",
        alt: "Bebê com terapeuta fazendo contato olho no olho",
        caption: "Contato visual e estímulos proprioceptivos"
      },
      {
        src: "/images/reflexos/bebe-supino-2.jpg",
        alt: "Bebê de 3 meses em posição supina",
        caption: "Postura esperada aos 3 meses"
      },
      {
        src: "/images/reflexos/bebe-prono-2.jpg",
        alt: "Bebê de 3 meses em prono com rolinho",
        caption: "Controle cervical aos 3 meses"
      },
      {
        src: "/images/reflexos/bebe-colo.jpg",
        alt: "Bebê no colo em posição de cadeirinha",
        caption: "Posicionamento em cadeirinha para organização corporal"
      },
      {
        src: "/images/reflexos/bebe-alcance.jpg",
        alt: "Bebê alcançando objeto na linha média",
        caption: "Alcance na linha média aos 4 meses"
      },
      {
        src: "/images/reflexos/bebe-descoberta-pes.jpg",
        alt: "Bebê descobrindo os pés",
        caption: "Descoberta dos pés aos 4 meses"
      },
      {
        src: "/images/reflexos/bebe-rolando.jpg",
        alt: "Sequência de bebê rolando",
        caption: "Estimulação do rolar de supino para prono"
      }
    ],
    content: `
      <div class="my-8">
        <div class="relative h-[200px] md:h-[280px] w-full rounded-xl overflow-hidden shadow-md mb-4 bg-gray-50">
          <img src="/images/reflexos/bebe-sentado.jpg" alt="Bebê em posição sentada com apoio" class="object-contain w-full h-full max-h-full" style="object-fit: scale-down;" />
        </div>
        <p class="text-sm text-center text-gray-600 italic">Desenvolvimento do controle postural em posição sentada com apoio</p>
      </div>

      <h2>Desenvolvimento Neuropsicomotor do Bebê: Primeiro ao Sexto Mês de Vida</h2>
      
      <h3>Conceitos Essenciais</h3>
      <p>O desenvolvimento segue uma maturação neuromotora que progride em três períodos principais no primeiro ano de vida:</p>

      <div class="my-6">
        <div class="relative h-[250px] md:h-[350px] w-full rounded-xl overflow-hidden shadow-md mb-4 bg-gray-50">
          <img src="/images/reflexos/evolucao-postural.jpg" alt="Evolução postural do bebê ao longo dos meses" class="object-contain w-full h-full" />
        </div>
        <p class="text-sm text-center text-gray-600 italic">Progressão do desenvolvimento postural do bebê</p>
      </div>

      <ol>
        <li><strong>Final da vida fetal:</strong> Há uma maturação ascendente do tônus em flexão e reforço do tônus antigravitário.</li>
        <li><strong>Por volta de 40 semanas de Idade Corrigida (IC):</strong> Predomínio da flexão, extensão na posição vertical e equilíbrio entre flexores e extensores da cabeça.</li>
        <li><strong>Dois primeiros anos:</strong> Maturação descendente do sistema piramidal, influenciando o tônus muscular e as aquisições motoras.</li>
      </ol>
      <p>A avaliação do tônus muscular sempre considera a Idade Corrigida (IC) e observa a simetria, passando da hipertonia fisiológica para a hipotonia fisiológica.</p>

      <div class="my-8">
        <div class="relative h-[250px] md:h-[350px] w-full rounded-xl overflow-hidden shadow-md mb-4 bg-gray-50">
          <img src="/images/reflexos/tonus-muscular.jpg" alt="Tabela de evolução do tônus muscular" class="object-contain w-full h-full" />
        </div>
        <p class="text-sm text-center text-gray-600 italic">Evolução do tônus muscular de acordo com a idade corrigida (IC)</p>
      </div>
      
      <h3 id="primeiro-mês">Primeiro Mês</h3>
      <ul>
        <li><strong>Aspectos Clínicos Detalhados:</strong> Neste período, o bebê está se adaptando à vida extrauterina. A postura é caracterizada por flexão predominante devido ao tônus muscular aumentado. Assimetrias posturais são comuns, mas devem ser avaliadas para descartar torcicolos congênitos ou preferências anormais.</li>
        <li><strong>Reflexos Primitivos:</strong> A avaliação dos reflexos primitivos é crucial. O reflexo de Moro (reação de sobressalto) está presente e simétrico. A ausência ou assimetria podem indicar lesão neurológica. O reflexo de preensão palmar é forte, mas involuntário.</li>
        <li><strong>Exemplo Prático:</strong> Ao examinar um recém-nascido, observe a postura em repouso. A cabeça está predominantemente lateralizada? Há resistência ao tentar centralizá-la? Avalie o reflexo de Moro: segure o bebê em semissentado e simule uma queda. A resposta esperada é abdução e extensão dos braços, seguidas de adução e choro.</li>
        <li><strong>Sinais de Alerta:</strong> Mãos persistentemente fechadas ou dedos do pé em garra podem ser sinais de alerta.</li>
      </ul>
      <p><em>Orientação para os pais:</em> Estimular posturas adequadas e fornecer estímulos sensoriais suaves.</p>
      
      <div class="my-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 max-w-xs mx-auto">
          <div class="relative h-44 w-full rounded-lg overflow-hidden mb-3">
            <img src="/images/reflexos/bebe-mao-boca.jpg" alt="bebê com a mão na boca" class="object-cover w-full h-full" />
          </div>
          <p class="text-sm text-center text-gray-600 italic">O bebê apresenta movimentação corporal rica, toca o rosto e eleva os membros inferiores do apoio.</p>
        </div>
        
        <div class="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 max-w-xs mx-auto">
          <div class="relative h-44 w-full rounded-lg overflow-hidden mb-3">
            <img src="/images/reflexos/bebe-terapeuta-1.jpg" alt="Bebê interagindo com terapeuta" class="object-cover w-full h-full" />
          </div>
          <p class="text-sm text-center text-gray-600 italic">Contato olho no olho, toque e conversa ajudam o bebê a se manter organizado. O rolinho é também uma forma de manter a organização corporal, mas é desaconselhado durante o sono e quando os pais não estão próximos.</p>
        </div>
      </div>
      
      <div class="my-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 max-w-xs mx-auto">
          <div class="relative h-44 w-full rounded-lg overflow-hidden mb-3">
            <img src="/images/reflexos/bebe-terapeuta-2.jpg" alt="Bebê no colo do terapeuta" class="object-cover w-full h-full" />
          </div>
          <p class="text-sm text-center text-gray-600 italic">Manter o bebê organizado no colo e realizar a estimulação visual, auditiva e tátil no cuidado diário.</p>
        </div>
      </div>
      
      <h3 id="segundo-mês">Segundo Mês</h3>
      <ul>
        <li><strong>Aspectos Clínicos Detalhados:</strong> O predomínio da flexão começa a diminuir, e o bebê explora a extensão. O Reflexo Tônico Cervical Assimétrico (RTCA) é notado quando o bebê vira a cabeça para um lado, e o braço e a perna desse lado estendem-se, enquanto os membros do lado oposto se flexionam. Este reflexo auxilia na descoberta visual das mãos.</li>
        <li><strong>Controle Ocular e Auditivo:</strong> Há um início do controle olho-mão e a capacidade de virar a cabeça em direção aos sons.</li>
        <li><strong>Exemplo Prático:</strong> Observe o bebê em supino. Ele consegue levantar os braços em direção a um brinquedo? Ao chacoalhar um chocalho ao lado da cabeça, ele vira na direção do som? A falta dessas respostas pode indicar atraso no desenvolvimento.</li>
        <li><strong>Sinais de Alerta:</strong> A ausência de sorriso social ou a falta de reação a sons familiares são sinais de alerta.</li>
      </ul>
      <p><em>Orientação para os pais:</em> Encorajar a descoberta visual das mãos e oferecer estímulos visuais e auditivos.</p>
      
      <div class="my-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 max-w-xs mx-auto">
          <div class="relative h-44 w-full rounded-lg overflow-hidden mb-3">
            <img src="/images/reflexos/bebe-supino-1.jpg" alt="Bebê de 2 meses em posição supino" class="object-cover w-full h-full" />
          </div>
          <p class="text-sm text-center text-gray-600 italic">Neste mês, os braços permanecem próximos ao corpo e as mãos, predominantemente abertas. A estimulação com aproximação dos ombros e um leve movimento destes em direção à pelve possibilita que os ombros se afastem das orelhas e os braços alcancem a linha média.</p>
        </div>
        
        <div class="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 max-w-xs mx-auto">
          <div class="relative h-44 w-full rounded-lg overflow-hidden mb-3">
            <img src="/images/reflexos/bebe-prono-1.jpg" alt="Bebê de 2 meses em posição prono" class="object-cover w-full h-full" />
          </div>
          <p class="text-sm text-center text-gray-600 italic">Observa-se uma hipotonia axial leve, pois, aos 2 meses, o bebê deve elevar a cabeça e a parte superior do tronco.</p>
        </div>
      </div>
      
      <div class="my-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 max-w-xs mx-auto">
          <div class="relative h-44 w-full rounded-lg overflow-hidden mb-3">
            <img src="/images/reflexos/bebe-estimulo.jpg" alt="Bebê recebendo estímulo para elevar a cabeça" class="object-cover w-full h-full" />
          </div>
          <p class="text-sm text-center text-gray-600 italic">Estímulos para elevar a cabeça como uma leve tração sobre os ombros ou do tronco em direção à pelve.</p>
        </div>
      </div>
      
      <h3 id="terceiro-mês">Terceiro Mês</h3>
      <ul>
        <li><strong>Aspectos Clínicos Detalhados:</strong> A simetria corporal se torna mais evidente, e o bebê mantém a cabeça na linha média com mais frequência. Em prono, ele eleva a cabeça contra a gravidade, marcando o primeiro controle voluntário.</li>
        <li><strong>Coordenação Visuomotora:</strong> A coordenação olho-mão melhora, e o bebê segue objetos em movimento circular.</li>
        <li><strong>Exemplo Prático:</strong> Coloque o bebê em prono sobre uma superfície firme. Ele consegue levantar a cabeça a 45° e mantê-la por alguns segundos? Em supino, ele tenta alcançar um brinquedo com ambas as mãos? A dificuldade nessas tarefas pode indicar hipotonia ou atraso motor.</li>
        <li><strong>Sinais de Alerta:</strong> Controle pobre da cabeça além dos 3 meses é um sinal de alerta.</li>
      </ul>
      <p><em>Orientação para os pais:</em> Estimular o contato olho no olho, oferecer estímulos proprioceptivos e promover a simetria.</p>
      
      <div class="my-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div class="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
            <div class="relative h-52 w-full rounded-lg overflow-hidden mb-3">
              <img src="/images/reflexos/bebe-terapeuta-3.jpg" alt="Bebê com terapeuta fazendo contato olho no olho" class="object-cover w-full h-full" />
            </div>
          </div>
          
          <div class="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
            <div class="relative h-52 w-full rounded-lg overflow-hidden mb-3">
              <img src="/images/reflexos/bebe-supino-2.jpg" alt="Bebê de 3 meses em posição supina" class="object-cover w-full h-full" />
            </div>
          </div>
        </div>
        <p class="text-sm text-center text-gray-600 italic mb-6 bg-[#F0F9FF] p-3 rounded-lg shadow-sm">Contato olho no olho, conversa e estímulos proprioceptivos durante os exercícios orientados de acordo com a fase do desenvolvimento: espera-se cabeça alinhada, simetria, mãos abertas e alcançando os joelhos.</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
            <div class="relative h-52 w-full rounded-lg overflow-hidden mb-3">
              <img src="/images/reflexos/bebe-prono-2.jpg" alt="Bebê de 3 meses em prono com rolinho" class="object-cover w-full h-full" />
            </div>
            <p class="text-sm text-center text-gray-600 italic">Estímulos visuais ou sonoros e o uso do rolinho subaxilar ajudam no controle da cabeça e na melhora do tônus axial. Aos 3 meses, o bebê apoia-se sobre os antebraços com os cotovelos à frente dos ombros.</p>
          </div>
          
          <div class="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
            <div class="relative h-52 w-full rounded-lg overflow-hidden mb-3">
              <img src="/images/reflexos/bebe-colo.jpg" alt="Bebê no colo em posição de cadeirinha" class="object-cover w-full h-full" />
            </div>
            <p class="text-sm text-center text-gray-600 italic">Carregar no colo "em cadeirinha" ajuda a organização corporal e melhora o tônus cervical e axial do bebê.</p>
          </div>
        </div>
      </div>
      
      <h3 id="quarto-mês">Quarto Mês</h3>
      <ul>
        <li><strong>Aspectos Clínicos Detalhados:</strong> A simetria predomina em todas as posições, e o RTCA começa a atenuar. O bebê eleva os braços para alcançar objetos e, ao ser puxado para sentar, mantém a cabeça alinhada.</li>
        <li><strong>Preensão Cubito-Palmar:</strong> Inicia-se a preensão cubito-palmar, com o bebê aproximando a mão do objeto com um movimento de varredura.</li>
        <li><strong>Exemplo Prático:</strong> Segure um brinquedo próximo ao bebê em supino. Ele consegue elevar os braços para alcançá-lo, utilizando um movimento de varredura com a mão? Ao puxá-lo para sentar, a cabeça acompanha o movimento sem cair para trás? A dificuldade nessas atividades pode indicar fraqueza muscular ou falta de coordenação.</li>
        <li><strong>Sinais de Alerta:</strong> Jogar-se constantemente para trás quando sentado é um sinal de alerta.</li>
      </ul>
      <p><em>Orientação para os pais:</em> Estimular o alcance de objetos na linha média e o rolar de supino para prono.</p>
      
      <div class="my-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 max-w-xs mx-auto">
          <div class="relative h-44 w-full rounded-lg overflow-hidden mb-3">
            <img src="/images/reflexos/bebe-alcance.jpg" alt="Bebê alcançando objeto na linha média" class="object-cover w-full h-full" />
          </div>
          <p class="text-sm text-center text-gray-600 italic">Alcance do objeto na linha média, afastado do tronco com ambas as mãos.</p>
        </div>
        
        <div class="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 max-w-xs mx-auto">
          <div class="relative h-44 w-full rounded-lg overflow-hidden mb-3">
            <img src="/images/reflexos/bebe-descoberta-pes.jpg" alt="Bebê descobrindo os pés" class="object-cover w-full h-full" />
          </div>
          <p class="text-sm text-center text-gray-600 italic">Estimulação da descoberta dos pés com meias, argolas coloridas ou brincando com o bebê. Observa-se a aproximação do queixo ao tórax, o que contribui no alongamento da musculatura cervical.</p>
        </div>
      </div>
      
      <div class="my-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 max-w-xs mx-auto">
          <div class="relative h-44 w-full rounded-lg overflow-hidden mb-3">
            <img src="/images/reflexos/bebe-rolando.jpg" alt="Sequência de bebê rolando" class="object-cover w-full h-full" />
          </div>
          <p class="text-sm text-center text-gray-600 italic">Estimular o rolar de supino para prono. Com o estímulo visual, o bebê vira a cabeça. O membro superior em rotação externa e alinhado ao ombro, o membro inferior contralateral flexionado e, com apoio no quadril, realiza-se um movimento em direção ao objeto. O bebê passa pela postura lateral e alcança o prono.</p>
        </div>
      </div>
      
      <h3 id="quinto-mês">Quinto Mês</h3>
      <ul>
        <li><strong>Aspectos Clínicos Detalhados:</strong> O bebê explora seus pés, rola para ambos os lados e inicia a reação de apoio anterior. Em prono, ele eleva o tronco com extensão dos cotovelos e pode pivotear.</li>
        <li><strong>Hipotonia Fisiológica:</strong> Inicia-se a fase da hipotonia fisiológica, importante para as aquisições sensório-motoras.</li>
        <li><strong>Exemplo Prático:</strong> Observe o bebê em supino. Ele consegue alcançar os pés e levá-los à boca? Ao colocá-lo de lado, ele rola completamente para a posição prona? Em prono, ele se apoia nas mãos com os cotovelos estendidos, elevando o tronco? A dificuldade nessas atividades pode indicar tônus muscular inadequado ou falta de integração motora.</li>
        <li><strong>Sinais de Alerta:</strong> Usar somente um lado do corpo para se mover é um sinal de alerta.</li>
      </ul>
      <p><em>Orientação para os pais:</em> Estimular o alcance dos pés à boca e a musculatura abdominal durante as trocas de postura.</p>
      
      <div class="my-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 max-w-xs mx-auto">
          <div class="relative h-44 w-full rounded-lg overflow-hidden mb-3">
            <img src="/images/reflexos/bebe-alcance-2.jpg" alt="Bebê alcançando objeto na linha média" class="object-cover w-full h-full" />
          </div>
          <p class="text-sm text-center text-gray-600 italic">Estimular o alcance dos pés à boca. Nota-se o início da fase da hipotonia fisiológica do bebê, importante para as aquisições sensório-motoras.</p>
        </div>
        
        <div class="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 max-w-xs mx-auto">
          <div class="relative h-44 w-full rounded-lg overflow-hidden mb-3">
            <img src="/images/reflexos/bebe-estimulo-2.jpg" alt="Bebê descobrindo os pés" class="object-cover w-full h-full" />
          </div>
          <p class="text-sm text-center text-gray-600 italic">A estimulação da musculatura abdominal pode ocorrer durante as trocas de posturas, como de supino para sentado e vice-versa.</p>
        </div>
      </div>
      
      <div class="my-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 max-w-xs mx-auto">
          <div class="relative h-44 w-full rounded-lg overflow-hidden mb-3">
            <img src="/images/reflexos/bebe-rolo.jpg" alt="Sequência de bebê rolando" class="object-cover w-full h-full" />
          </div>
          <p class="text-sm text-center text-gray-600 italic">O uso do rolinho na região tóraco-abdominal possibilita a extensão dos membros superiores e dos quadris. O bebê pode transferir o peso para um dos lados, a fim de elevar o outro braço para alcançar o brinquedo. Estímulos como uma leve tração do tronco em direção à pelve contribuem para que se mantenha na postura.</p>
        </div>
        
        <div class="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 max-w-xs mx-auto">
          <div class="relative h-44 w-full rounded-lg overflow-hidden mb-3">
            <img src="/images/reflexos/bebe-sentado-2.jpg" alt="Bebê em posição sentada" class="object-cover w-full h-full" />
          </div>
          <p class="text-sm text-center text-gray-600 italic">Incentivar a postura sentada com as mãos apoiadas à frente do corpo</p>
        </div>
      </div>

      <h3 id="sexto-mês">Sexto Mês</h3>
      <ul>
        <li><strong>Aspectos Clínicos Detalhados:</strong> Os movimentos voluntários tornam-se mais refinados e coordenados. O bebê interage com o meio, pessoas e objetos, prestando atenção e emitindo fonemas ainda sem significado simbólico.</li>
        <li><strong>Sentar e Preensão:</strong> Ele mantém-se sentado sem apoio por curtos períodos e a preensão evolui para o estágio dígito-palmar.</li>
        <li><strong>Exemplo Prático:</strong> Sente o bebê no chão, apoiando-o inicialmente. Ele consegue manter a postura sentada sem apoio por alguns segundos? Ofereça um pequeno objeto. Ele o pega utilizando os dedos e a palma da mão? A dificuldade nessas tarefas pode indicar instabilidade postural ou problemas de preensão.</li>
        <li><strong>Sinais de Alerta:</strong> Dificuldade para se manter nas posturas de acordo com a faixa etária e alteração do tônus muscular são sinais de alerta.</li>
      </ul>
      <p><em>Orientação para os pais:</em> Estimular a retificação do tronco e o rolar de prono para supino.</p>
      
      <div class="mt-8 mb-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
          <div class="relative h-52 w-full rounded-lg overflow-hidden mb-3">
            <img src="/images/reflexos/bebe-estimulo-3.jpg" alt="Bebê recebendo estímulo" class="object-cover w-full h-full" />
          </div>
          <p class="text-sm text-center text-gray-600 italic">Estímulos como uma leve tração do tronco em direção à pelve contribuem para a retificação do tronco.</p>
        </div>

        <div class="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
          <div class="relative h-52 w-full rounded-lg overflow-hidden mb-3">
            <img src="/images/reflexos/bebe-estimulo-4.jpg" alt="Bebê preparando para rolar" class="object-cover w-full h-full" />
          </div>
          <p class="text-sm text-center text-gray-600 italic">Estimular o rolar de prono para supino. O membro superior elevado ao longo da cabeça e em rotação externa, o membro inferior contralateral flexionado, realiza-se um movimento de rotação em direção posterior. O bebê passa pela postura lateral e alcança o supino.</p>
        </div>
      </div>

      <h3>Considerações Adicionais</h3>
      <ul>
        <li><strong>Visão e Audição:</strong> Aos 3 meses, a visão fica mais nítida, o que é crucial para a coordenação óculo-manual. A avaliação auditiva é fundamental, e qualquer ausência de resposta deve ser encaminhada para diagnóstico funcional.</li>
        <li><strong>Sinais de Alerta:</strong> Assimetrias, pobreza ou excesso de movimentos, atraso no controle da cabeça, dificuldades nas posturas e ausência de sorriso social são sinais de alerta.</li>
      </ul>
      <p>Lembre-se que cada bebê tem seu próprio ritmo de desenvolvimento. O importante é oferecer um ambiente rico em estímulos e estar atento aos sinais de alerta para intervenção precoce, se necessário.</p>

      <h3 id="teste-gesell" class="text-2xl text-[#6EC1E4] mt-10 mb-4 font-semibold">Teste de Gesell</h3>

      <p class="text-gray-700">O Teste de Gesell, elaborado por Arnold Gesell e colaboradores na década de 1920, avalia o comportamento da criança durante o desenvolvimento para diagnosticar desvios. O teste, atualizado como Escala de Desenvolvimento de Gesell e Amatruda, envolve a avaliação direta e observação da qualidade e integração de comportamentos em crianças de quatro semanas a 36 meses de idade cronológica. As categorias de análise incluem comportamento adaptativo (organização e adaptação sensório-motora, cognição), comportamento motor grosseiro e delicado (sustentação da cabeça, sentar, engatinhar, andar, manipulação de objetos), comportamento de linguagem (expressiva ou receptiva) e comportamento pessoal-social (relação com o meio-ambiente). Os comportamentos são observados em idades-chave como quatro semanas, 16 semanas, 28 semanas, 40 semanas, 12 meses, 18 meses, 24 meses e 36 meses. O resultado final é quantitativo e expresso como quociente de desenvolvimento (QD), utilizando a idade corrigida para prematuros. Os dados são comparados a uma escala elaborada a partir de comportamentos padrão apresentados por crianças em determinadas faixas etárias. O teste apresenta boa confiabilidade e validade, sendo um bom instrumento diagnóstico utilizado em pesquisas e centros de reabilitação. No entanto, não considera a movimentação espontânea do RN, sua qualidade de movimentos, e baseia-se na teoria neuromaturacional do desenvolvimento.</p>
    `,
  },
  {
    id: "reflexos-7-15",
    title: "Reflexos de 7 a 15 meses",
    description: "Desenvolvimento dos reflexos em bebês de 7 a 15 meses de idade.",
    icon: <Baby className="h-10 w-10 text-[#B9A9FF]" />,
    images: [
      {
        src: "/images/reflexos/bebe-sentado-7m.jpg",
        alt: "Bebê sentado sem apoio aos 7 meses",
        caption: "Desenvolvimento do controle postural sentado"
      },
      {
        src: "/images/reflexos/bebe-engatinhando.jpg",
        alt: "Bebê engatinhando aos 9 meses",
        caption: "Evolução do engatinhar"
      },
      {
        src: "/images/reflexos/bebe-puxando.jpg",
        alt: "Bebê puxando para ficar em pé",
        caption: "Apoio para ficar em pé"
      },
      {
        src: "/images/reflexos/bebe-andando-moveis.jpg",
        alt: "Bebê andando com apoio de móveis",
        caption: "Marcha lateral com apoio"
      },
      {
        src: "/images/reflexos/bebe-em-pe.jpg",
        alt: "Bebê em pé sem apoio",
        caption: "Equilíbrio em pé"
      },
      {
        src: "/images/reflexos/primeiros-passos.jpg",
        alt: "Bebê dando primeiros passos",
        caption: "Primeiros passos independentes"
      },
      {
        src: "/images/reflexos/bebe-agachando.jpg",
        alt: "Bebê agachando para pegar brinquedo",
        caption: "Controle de agachamento"
      },
      {
        src: "/images/reflexos/bebe-pinsa.jpg",
        alt: "Bebê usando preensão em pinça",
        caption: "Desenvolvimento da preensão em pinça"
      },
      {
        src: "/images/reflexos/bebe-alimentando.jpg",
        alt: "Bebê se alimentando sozinho",
        caption: "Desenvolvimento da autonomia"
      },
      {
        src: "/images/reflexos/bebe-interacao.jpg",
        alt: "Bebê interagindo com brinquedos",
        caption: "Interação com objetos"
      },
      {
        src: "/images/reflexos/bebe-brincando.jpg",
        alt: "Bebê brincando com blocos",
        caption: "Desenvolvimento da coordenação motora fina"
      },
      {
        src: "/images/reflexos/bebe-explorando.jpg",
        alt: "Bebê explorando o ambiente",
        caption: "Exploração do ambiente"
      }
    ],
    content: `
      <h2>Desenvolvimento Neuropsicomotor do Bebê: Sétimo ao Décimo Quinto Mês de Vida</h2>
      
      <h3>Conceitos Essenciais</h3>
      <p>Entre os 7 e 15 meses, o desenvolvimento motor do bebê é caracterizado pela maturação do sistema neurológico e pela aquisição de habilidades motoras complexas. Este período contempla conquistas importantes como:</p>

      <div class="my-6">
        <div class="relative h-[300px] md:h-[400px] w-full rounded-xl overflow-hidden shadow-md mb-4 bg-gray-50">
          <img src="/images/reflexos/bebe-engatinhando.webp" alt="Evolução de bebê engatinhando" class="object-contain w-full h-full" style="object-fit: scale-down;" />
        </div>
        <p class="text-sm text-center text-gray-600 italic">Progressão do engatinhar, fundamental para o desenvolvimento neuropsicomotor</p>
      </div>

      <ol>
        <li><strong>Sedestação independente:</strong> Que se consolida do sétimo ao oitavo mês, com o desenvolvimento da musculatura paravertebral.</li>
        <li><strong>Engatinhar:</strong> Geralmente estabelecido entre o oitavo e décimo mês, importante para o desenvolvimento do equilíbrio e coordenação.</li>
        <li><strong>Postura bípede:</strong> Com apoio inicialmente (9-10 meses) e depois de forma independente (12-15 meses).</li>
        <li><strong>Marcha autônoma:</strong> Que se inicia normalmente entre o décimo segundo e décimo quinto mês.</li>
      </ol>
      <p>O acompanhamento do desenvolvimento nesta fase considera aquisições motoras globais e refinamento da motricidade fina, mantendo a avaliação da simetria e qualidade dos movimentos.</p>

      <div class="my-8">
        <div class="relative h-[300px] md:h-[400px] w-full rounded-xl overflow-hidden shadow-md mb-4 bg-gray-50">
          <img src="/images/reflexos/bebe-progresso-motor.jpg" alt="Tabela de evolução motora" class="object-contain w-full h-full" style="object-fit: scale-down;" />
        </div>
        <p class="text-sm text-center text-gray-600 italic">Evolução do desenvolvimento motor dos 7 aos 15 meses</p>
      </div>
      
      <h3 id="sétimo-mês:-mobilidade-e-interação-aumentadas">Sétimo Mês: Mobilidade e Interação Aumentadas</h3>
      <ul>
        <li><strong>Aspectos Clínicos Detalhados:</strong> A criança demonstra grande desejo de se movimentar e explorar o ambiente. Observa-se o desenvolvimento da reação de apoio lateral, crucial para a proteção em quedas laterais.</li>
        <li><strong>Padrões de Movimento:</strong> A criança não permanece muito tempo em supino, preferindo virar para o lado ou rolar para prono. Em prono, pode rastejar ou deslizar para trás, elevando um pouco a pelve para tentar se mover para frente.</li>
        <li><strong>Transições Posturais:</strong> Inicia a transição de sentada para "quatro apoios". A postura de "quatro apoios" pode não ser estável de início.</li>
        <li><strong>Preensão:</strong> A preensão torna-se mais voluntária, utilizando preferencialmente o lado radial da mão. Inicia a pinça digital inferior, pegando objetos entre o polegar, o indicador e o dedo médio.</li>
        <li><strong>Exemplo Prático:</strong> Coloque a criança sentada no chão, com brinquedos ao alcance lateral. Observe se ela consegue se apoiar com uma das mãos para alcançar o brinquedo, demonstrando a reação de apoio lateral. Observe também se ela tenta passar da posição sentada para a posição de "quatro apoios", mesmo que ainda com dificuldade.</li>
        <li><strong>Comunicação:</strong> A criança balbucia, imita sons e gestos e começa a reconhecer algumas palavras. Agita-se e fica feliz ao ouvir "mamadeira", dirigindo o olhar ao objeto quando alguém diz "olha".</li>
        <li><strong>Sinais de Alerta:</strong> Dificuldade em realizar transferências de peso lateralmente ou não demonstrar interesse em explorar objetos.</li>
      </ul>
      <p><em>Orientação para os pais:</em> Estimular a postura sentada com apoio frontal e lateral gradualmente reduzido. Oferecer brinquedos para transferência entre as mãos.</p>
      
      <div class="my-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 max-w-md mx-auto">
          <div class="relative h-44 w-full rounded-lg overflow-hidden mb-3">
            <img src="/images/reflexos/bebe-transferencia-objeto.jpg" alt="Bebê transferindo objeto" class="object-cover w-full h-full" />
          </div>
          <p class="text-sm text-center text-gray-600 italic">Estimular a postura sentada com o apoio lateral.</p>
        </div>
        
        <div class="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 max-w-md mx-auto">
          <div class="relative h-44 w-full rounded-lg overflow-hidden mb-3">
            <img src="/images/reflexos/bebe-sentado-estavel.jpg" alt="Bebê sentado estável" class="object-cover w-full h-full" />
          </div>
          <p class="text-sm text-center text-gray-600 italic">O interesse pelo brinquedo é um estímulo para a transição da postura sentada para "quatro apoios".</p>
          <p class="text-sm text-center text-gray-600 italic">Na segunda imagem, nota-se a orientação para a criança se manter em "quatro apoios".</p>
        </div>
      </div>

      <div class="my-8">
        <div class="relative h-[300px] md:h-[400px] w-full rounded-xl overflow-hidden shadow-md mb-4 bg-gray-50">
          <img src="/images/reflexos/bebe-incentivo.jpg" alt="Tabela de evolução motora" class="object-contain w-full h-full" style="object-fit: scale-down;" />
        </div>
        <p class="text-sm text-center text-gray-600 italic">O interesse em se deslocar para alcançar um objeto deve ser incentivado, assim como a postura de "quatro apoios".</p>
      </div>

      <h3 id="oitavo-mês:-transições-e-noções-espaciais">Oitavo Mês: Transições e Noções Espaciais</h3>
      <ul>
        <li><strong>Aspectos Clínicos Detalhados:</strong> A criança realiza transições posturais com mais facilidade e começa a adquirir noções espaciais. A reação de apoio lateral está presente, e a reação de apoio posterior começa a se desenvolver.</li>
        <li><strong>Padrões de Movimento:</strong> Passa rapidamente de prono para "quatro apoios", pode engatinhar "em bloco" ou passar para "sentado de lado" e atingir a postura sentada.</li>
        <li><strong>Engatinhar:</strong> O engatinhar, mesmo que ainda com pouca rotação de tronco, é importante para a estimulação sensorial das mãos, desenvolvimento dos arcos palmares, aquisição da noção de espaço e preparo para a marcha.</li>
        <li><strong>Preensão:</strong> A preensão é voluntária, com pinça digital inferior ou pinça lateral (variante um pouco melhorada da pinça inferior).</li>
        <li><strong>Exemplo Prático:</strong> Coloque a criança em prono no chão. Observe se ela consegue passar para a posição de "quatro apoios" e engatinhar em direção a um brinquedo. Observe também a preensão ao oferecer pequenos objetos, como blocos, e como ela os manipula.</li>
        <li><strong>Comunicação:</strong> A criança gosta de brincar com gestos e de esconder, emite sons ainda sem significado simbólico, mas começa a perceber que, com esses sons, consegue chamar a atenção de alguém.</li>
        <li><strong>Sinais de Alerta:</strong> Não demonstrar tentativas de engatinhar ou usar apenas um lado do corpo para se locomover.</li>
      </ul>
      <p><em>Orientação para os pais:</em> Encorajar movimentos que iniciam o engatinhar, como balancear na posição de quatro apoios. Oferecer brinquedos que estimulem a preensão mais refinada.</p>
      
      <div class="my-8">
        <div class="relative h-[300px] md:h-[400px] w-full rounded-xl overflow-hidden shadow-md mb-4 bg-gray-50">
          <img src="/images/reflexos/bebe-quatro-apoios.jpg" alt="Tabela de evolução motora" class="object-contain w-full h-full max-h-full" style="object-fit: scale-down;" />
        </div>
        <p class="text-sm text-center text-gray-600 italic">A criança se locomove em "quatro apoios", brinca na postura de joelhos e a postura de pé deve ser incentivada, com apoio na pelve ou nos joelhos, se necessário, e mantendo os pés totalmente apoiados na superfície. Utiliza as posturas ajoelhada e semiajoelhada como transição para a postura ortostática.</p>
      </div>
      
      <h3 id="nono-mês:-domínio-do-engatinhar-e-equilíbrio">Nono Mês: Domínio do Engatinhar e Equilíbrio</h3>
      <ul>
        <li><strong>Aspectos Clínicos Detalhados:</strong> A criança adora as novas descobertas e experimenta todas as mudanças posturais com movimentos mais controlados e harmônicos. O engatinhar é seu principal meio de locomoção.</li>
        <li><strong>Reações de Equilíbrio:</strong> A reação de apoio posterior está presente, e as habilidades de equilíbrio estão mais aprimoradas, permitindo a investigação do espaço ao seu redor.</li>
        <li><strong>Padrões de Movimento:</strong> A postura sentada é estável, passa para "quatro apoios", ajoelhada, semiajoelhada e consegue voltar para sentado ou passar para a postura de pé.</li>
        <li><strong>Engatinhar:</strong> Engatinha com rotação do tronco.</li>
        <li><strong>Exemplo Prático:</strong> Observe a criança engatinhando em diferentes superfícies e direções. Veja se ela consegue mudar de direção sem perder o equilíbrio. Incentive a brincar na postura semi-ajoelhada, colocando brinquedos em um nível mais alto.</li>
        <li><strong>Comunicação:</strong> A criança diz "papa" e "mama" ainda sem especificidade, expressa-se com linguagem corporal e gestual, "dá tchau". Compreende a função dos objetos e inicia "bater palminhas".</li>
        <li><strong>Sinais de Alerta:</strong> Incapacidade de manter a postura sentada sem apoio ou não demonstrar reações de proteção ao perder o equilíbrio.</li>
      </ul>
      <p><em>Orientação para os pais:</em> Estimular a transição entre as posturas e oferecer brinquedos em diferentes alturas para incentivar mudanças posturais.</p>
      
      <div class="my-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 max-w-md mx-auto">
          <div class="relative h-44 w-full rounded-lg overflow-hidden mb-3">
            <img src="/images/reflexos/bebe-sentado-3.jpg" alt="Bebê transferindo objeto" class="object-cover w-full h-full" />
          </div>
          <p class="text-sm text-center text-gray-600 italic">Idade em que a criançase mantém brincando sentada de lado (side sitting).</p>
        </div>
        
        <div class="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 max-w-md mx-auto">
          <div class="relative h-44 w-full rounded-lg overflow-hidden mb-3">
            <img src="/images/reflexos/passos-laterais.jpg" alt="Bebê puxando para ficar em pé" class="object-cover w-full h-full" />
          </div>
          <p class="text-sm text-center text-gray-600 italic">O interesse pelo brinquedo motiva a realização dos passos laterais.</p>
        </div>
      </div>

      <div class="my-8">
        <div class="relative h-[300px] md:h-[400px] w-full rounded-xl overflow-hidden shadow-md mb-4 bg-gray-50">
          <img src="/images/reflexos/passos-laterais-2.jpg" alt="Tabela de evolução motora" class="object-contain w-full h-full max-h-full" style="object-fit: scale-down;" />
        </div>
        <p class="text-sm text-center text-gray-600 italic">Orientações incentivando a criança a passar pela postura semiajoelhada. Interação com o brinquedo e exploração do mesmo com o dedo indicador.</p>
      </div>      
      
      <h3 id="décimo-mês:-aprimoramento-e-motricidade-fina">Décimo Mês: Aprimoramento e Motricidade Fina</h3>
      <ul>
        <li><strong>Aspectos Clínicos Detalhados:</strong> A criança explora cada vez mais o ambiente e aprimora as suas habilidades nas áreas de motricidade, coordenação, linguagem e social.</li>
        <li><strong>Padrões de Movimento:</strong> Atinge a postura sentada com total equilíbrio. Consegue ficar de joelhos sem apoio, brinca na postura semi-ajoelhada e passa de semi-ajoelhada para a postura de pé.</li>
        <li><strong>Motricidade Fina:</strong> Segura o objeto com as polpas dos dedos indicador e polegar. Inspeciona os brinquedos, usa o dedo indicador para apontar, "cutucar" e colocar o objeto em buracos pequenos (movimento seletivo do indicador).</li>
        <li><strong>Exemplo Prático:</strong> Ofereça pequenos objetos, como grãos de feijão ou pequenos cubos, e observe como a criança os pega e manipula. Incentive a colocar os objetos dentro de um recipiente e a retirá-los, trabalhando a coordenação motora fina.</li>
        <li><strong>Comunicação:</strong> Compreende seu nome e usa "mamá" e "papá" com significado adequado e de forma consciente.</li>
        <li><strong>Sinais de Alerta:</strong> Dificuldade em manipular objetos pequenos ou não demonstrar interesse em explorar o ambiente.</li>
      </ul>
      <p><em>Orientação para os pais:</em> Proporcionar móveis seguros para o bebê praticar a marcha lateral e oferecer atividades que estimulem a motricidade fina, como encaixar objetos em recipientes.</p>
      
      <div class="my-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 max-w-md mx-auto">
          <div class="relative h-44 w-full rounded-lg overflow-hidden mb-3">
            <img src="/images/reflexos/pinça.jpg" alt="Bebê andando lateralmente" class="object-cover w-full h-full" />
          </div>
          <p class="text-sm text-center text-gray-600 italic">Avaliação da motricidade fina com a pinça bidigital</p>
        </div>
      </div>
      
      <h3 id="décimo-primeiro-mês:-refinamento-e-primeiras-palavras">Décimo Primeiro Mês: Refinamento e Primeiras Palavras</h3>
      <ul>
        <li><strong>Aspectos Clínicos Detalhados:</strong> A criança aprimora cada vez mais as habilidades dos estágios anteriores.</li>
        <li><strong>Padrões de Movimento:</strong> Engatinhar ainda é o principal meio de locomoção, pode engatinhar "tipo urso" e pode passar para a posição de cócoras ou para de pé sem apoio.</li>
        <li><strong>Coordenação e Equilíbrio:</strong> Pode se manter de pé sem o apoio das mãos, com a base de sustentação ampla, e consegue abaixar e passar para a postura de cócoras.</li>
        <li><strong>Preensão:</strong> Pinça digital superior, a criança alcança e pega o objeto pequeno colocado sobre a mesa por cima e com precisão, com as polpas dos dedos polegar e indicador.</li>
        <li><strong>Exemplo Prático:</strong> Incentive a criança a caminhar segurando em móveis, transferindo o peso de um lado para o outro. Observe se ela consegue se abaixar para pegar um brinquedo no chão e se levantar novamente sem apoio.</li>
        <li><strong>Comunicação:</strong> Emite a primeira palavra, caso ainda não tenha o feito.</li>
        <li><strong>Sinais de Alerta:</strong> Não demonstrar tentativas de ficar em pé ou não emitir nenhuma palavra.</li>
      </ul>
      <p><em>Orientação para os pais:</em> Incentivar o bebê a dar passos com apoio nas duas mãos e posteriormente em apenas uma. Oferecer jogos de encaixe e empilhamento simples.</p>
      
      <div class="my-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 max-w-md mx-auto">
          <div class="relative h-44 w-full rounded-lg overflow-hidden mb-3">
            <img src="/images/reflexos/bebe-em-pe.jpg" alt="Bebê dando passos com ajuda" class="object-cover w-full h-full" />
          </div>
          <p class="text-sm text-center text-gray-600 italic">De pé, com a base de sustentação aumentada.</p>
        </div>
        
        <div class="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 max-w-md mx-auto">
          <div class="relative h-44 w-full rounded-lg overflow-hidden mb-3">
            <img src="/images/reflexos/bebe-em-pe-2.jpg" alt="Bebê encaixando objetos" class="object-cover w-full h-full" />
          </div>
          <p class="text-sm text-center text-gray-600 italic">De frente para a criança e oferecendo apoio nas suas mãos, ela se sente mais segura para experimentar os passos para frente.</p>
        </div>
      </div>
      
      <h3 id="décimo-segundo-ao-décimo-quinto-mês:-primeiros-passos-e-autonomia">Décimo Segundo ao Décimo Quinto Mês: Primeiros Passos e Autonomia</h3>
      <ul>
        <li><strong>Aspectos Clínicos Detalhados:</strong> A criança interage cada vez mais com o meio, gosta de escalar, planeja e executa uma atividade. Demonstra desejo de explorar e curiosidade nas novas descobertas e elabora estratégias.</li>
        <li><strong>Marcha:</strong> Pode iniciar a marcha independente com passos curtos e fixação dos ombros.</li>
        <li><strong>Motricidade Fina:</strong> Coloca um cubo sobre o outro, faz torre de dois cubos, coloca um cubo ao lado do outro e solta o cubo e o coloca dentro do recipiente com agilidade.</li>
        <li><strong>Exemplo Prático:</strong> Ofereça um carrinho ou brinquedo de empurrar para incentivar a marcha. Crie um ambiente seguro para que a criança possa explorar e praticar seus primeiros passos.</li>
        <li><strong>Comunicação:</strong> Aumenta a frequência do balbucio e inicia a produção das primeiras palavras, pode falar duas a três palavras, identifica mais alguns objetos, animais e partes do corpo.</li>
        <li><strong>Sinais de Alerta:</strong> Não andar com 18 meses ou não falar palavras simples.</li>
      </ul>
      <p><em>Orientação para os pais:</em> Estimular a marcha em diferentes superfícies e incentivar a autonomia na alimentação com utensílios adaptados.</p>
      
      <div class="my-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 max-w-md mx-auto">
          <div class="relative h-44 w-full rounded-lg overflow-hidden mb-3">
            <img src="/images/reflexos/bebe-degraus.jpg" alt="Bebê andando sozinho" class="object-cover w-full h-full" />
          </div>
          <p class="text-sm text-center text-gray-600 italic">Em "quatro apoios", sob supervisão, a criança escala degraus. </p>
        </div>
      </div>
        
      <div class="my-8">
        <div class="relative h-[300px] md:h-[400px] w-full rounded-xl overflow-hidden shadow-md mb-4 bg-gray-50">
          <img src="/images/reflexos/bebe-carrinho.jpg" alt="Tabela de evolução motora" class="object-contain w-full h-full max-h-full" style="object-fit: scale-down;" />
        </div>
        <p class="text-sm text-center text-gray-600 italic">Orientações incentivando a criança a passar pela postura semiajoelhada. Interação com o brinquedo e exploração do mesmo com o dedo indicador.</p>
      </div>

      <div class="my-8">
        <div class="relative h-[300px] md:h-[400px] w-full rounded-xl overflow-hidden shadow-md mb-4 bg-gray-50">
          <img src="/images/reflexos/bebe-carrinho-2.jpg" alt="Tabela de evolução motora" class="object-contain w-full h-full max-h-full" style="object-fit: scale-down;" />
        </div>
        <p class="text-sm text-center text-gray-600 italic">Orientações incentivando a criança a passar pela postura semiajoelhada. Interação com o brinquedo e exploração do mesmo com o dedo indicador.</p>
      </div>      
      </div>

      <div class="my-8">
        <div class="relative h-[300px] md:h-[400px] w-full rounded-xl overflow-hidden shadow-md mb-4 bg-gray-50">
          <img src="/images/reflexos/tabela-av-visao.jpg" alt="Tabela de evolução motora" class="object-contain w-full h-full max-h-full" style="object-fit: scale-down;" />
        </div>
        <p class="text-sm text-center text-gray-600 italic">Esta tabela apresenta os comportamentos esperados em diferentes idades e como avaliar a função visual da criança</p>
      </div>      
      </div>     
      <div class="my-8">
        <div class="relative h-[300px] md:h-[400px] w-full rounded-xl overflow-hidden shadow-md mb-4 bg-gray-50">
          <img src="/images/reflexos/tabela-aud.jpg" alt="Tabela de evolução motora" class="object-contain w-full h-full max-h-full" style="object-fit: scale-down;" />
        </div>
        <p class="text-sm text-center text-gray-600 italic">Esta tabela apresenta os marcos do desenvolvimento da audição e da linguagem que devem ser acompanhados até os 3 anos de idade</p>
      </div>      
      </div>          
      
      <div class="my-8">
        <div class="relative h-[300px] md:h-[400px] w-full rounded-xl overflow-hidden shadow-md mb-4 bg-gray-50">
          <img src="/images/reflexos/tabela-prosposta.jpg" alt="Tabela de evolução motora" class="object-contain w-full h-full max-h-full" style="object-fit: scale-down;" />
        </div>
        <p class="text-sm text-center text-gray-600 italic">Esta tabela apresenta uma proposta inicial de conduta para crianças com atraso no desenvolvimento neuropsicomotor, considerando as áreas de avaliação (motora, coordenação, social e linguagem)</p>
      </div>      
      </div>            

      <div class="my-8 p-6 bg-[#FFF8F8] border border-[#FFDBDB] rounded-xl shadow-sm">
        <h3 class="text-xl font-semibold text-[#D03131] mb-4">Sinais de Alerta</h3>
        <ul class="space-y-2">
          <li class="flex items-start">
            <span class="text-[#D03131] mr-2">•</span>
            <span>Pobreza ou excesso de movimentos, movimentos anormais e assimetria</span>
          </li>
          <li class="flex items-start">
            <span class="text-[#D03131] mr-2">•</span>
            <span>Mãos persistentemente fechadas ou dedos do pé em garra</span>
          </li>
          <li class="flex items-start">
            <span class="text-[#D03131] mr-2">•</span>
            <span>Controle pobre da cabeça além dos 3 meses</span>
          </li>
          <li class="flex items-start">
            <span class="text-[#D03131] mr-2">•</span>
            <span>Ombros para cima, para frente ou para trás</span>
          </li>
          <li class="flex items-start">
            <span class="text-[#D03131] mr-2">•</span>
            <span>Jogar-se constantemente para trás quando sentado</span>
          </li>
          <li class="flex items-start">
            <span class="text-[#D03131] mr-2">•</span>
            <span>Usar somente um lado do corpo ou apenas os membros superiores para arrastar-se</span>
          </li>
          <li class="flex items-start">
            <span class="text-[#D03131] mr-2">•</span>
            <span>Dificuldade para se manter nas posturas de acordo com a faixa etária e alteração do tônus muscular</span>
          </li>
          <li class="flex items-start">
            <span class="text-[#D03131] mr-2">•</span>
            <span>Marcha exclusivamente ou preferencialmente na ponta dos pés</span>
          </li>
          <li class="flex items-start">
            <span class="text-[#D03131] mr-2">•</span>
            <span>Não sorrir aos 3 meses</span>
          </li>
          <li class="flex items-start">
            <span class="text-[#D03131] mr-2">•</span>
            <span>Não reagir a sons, não vocalizar aos 3 ou 4 meses e não balbuciar aos 6 meses</span>
          </li>
          <li class="flex items-start">
            <span class="text-[#D03131] mr-2">•</span>
            <span>Ausência do reflexo pupilar à luz</span>
          </li>
          <li class="flex items-start">
            <span class="text-[#D03131] mr-2">•</span>
            <span>Não olhar, fixar e seguir objeto após 6 semanas</span>
          </li>
          <li class="flex items-start">
            <span class="text-[#D03131] mr-2">•</span>
            <span>Choro extremo ou irritabilidade</span>
          </li>
          <li class="flex items-start">
            <span class="text-[#D03131] mr-2">•</span>
            <span>Não conseguir se manter alerta</span>
          </li>
          <li class="flex items-start">
            <span class="text-[#D03131] mr-2">•</span>
            <span>Fechamento das suturas cranianas antes dos 6 meses de idade com alteração do crescimento do perímetro cefálico</span>
          </li>
          <li class="flex items-start">
            <span class="text-[#D03131] mr-2">•</span>
            <span>De acordo com as áreas de avaliação do neurodesenvolvimento (motora, coordenação, social e linguagem), podemos considerar a Tabela 3 como uma proposta inicial</span>
          </li>
        </ul>
      </div>

      <h3>Considerações Adicionais</h3>
      <ul>
        <li><strong>Variabilidade Normal:</strong> É importante lembrar que existe uma ampla variação normal no desenvolvimento. Alguns bebês engatinham primeiro, enquanto outros vão direto para a marcha. A sequência e qualidade das aquisições são mais importantes que a idade exata.</li>
        <li><strong>Adaptação para Prematuridade:</strong> Lembre-se sempre de adaptar as atividades e avaliações à idade corrigida da criança, especialmente em casos de prematuridade.</li>
        <li><strong>Acompanhamento Profissional:</strong> O acompanhamento regular com um profissional de saúde é fundamental para identificar precocemente qualquer desvio no desenvolvimento e garantir a intervenção adequada.</li>
        <li><strong>Desenvolvimento Integrado:</strong> O desenvolvimento infantil é integrado, com a motricidade, cognição, linguagem e socialização evoluindo de forma interrelacionada.</li>
      </ul>
      <p>A estimulação adequada e um ambiente enriquecedor são fundamentais para potencializar todas as áreas do desenvolvimento do bebê nesta fase de intensas aquisições motoras e cognitivas.</p>

      <h3 id="teste-gesell" class="text-2xl text-[#6EC1E4] mt-10 mb-4 font-semibold">Teste de Gesell</h3>

      <p class="text-gray-700">O Teste de Gesell, elaborado por Arnold Gesell e colaboradores na década de 1920, avalia o comportamento da criança durante o desenvolvimento para diagnosticar desvios. O teste, atualizado como Escala de Desenvolvimento de Gesell e Amatruda, envolve a avaliação direta e observação da qualidade e integração de comportamentos em crianças de quatro semanas a 36 meses de idade cronológica. As categorias de análise incluem comportamento adaptativo (organização e adaptação sensório-motora, cognição), comportamento motor grosseiro e delicado (sustentação da cabeça, sentar, engatinhar, andar, manipulação de objetos), comportamento de linguagem (expressiva ou receptiva) e comportamento pessoal-social (relação com o meio-ambiente). Os comportamentos são observados em idades-chave como quatro semanas, 16 semanas, 28 semanas, 40 semanas, 12 meses, 18 meses, 24 meses e 36 meses. O resultado final é quantitativo e expresso como quociente de desenvolvimento (QD), utilizando a idade corrigida para prematuros. Os dados são comparados a uma escala elaborada a partir de comportamentos padrão apresentados por crianças em determinadas faixas etárias. O teste apresenta boa confiabilidade e validade, sendo um bom instrumento diagnóstico utilizado em pesquisas e centros de reabilitação. No entanto, não considera a movimentação espontânea do RN, sua qualidade de movimentos, e baseia-se na teoria neuromaturacional do desenvolvimento.</p>
    `,
  },
  {
    id: "reacoes-0-15",
    title: "Reações de 0 a 15 meses",
    description: "Reações posturais e de equilíbrio durante o primeiro ano de vida.",
    icon: <HeartPulse className="h-10 w-10 text-[#6EC1E4]" />,
    content: "O conteúdo detalhado sobre reações de 0 a 15 meses está disponível em uma página separada.",
  },
  {
    id: "escala-avaliacao",
    title: "Escala de avaliação neonatal",
    description: "Métodos e escalas para avaliação do desenvolvimento neonatal.",
    icon: <Stethoscope className="h-10 w-10 text-[#A8E6CF]" />,
    images: [
      {
        src: "/images/neonatal/avaliacao-neonatal.jpg",
        alt: "Avaliação neonatal",
        caption: "Avaliação do desenvolvimento em recém-nascidos prematuros"
      },
      {
        src: "/images/neonatal/tabela-instrumentos.jpg",
        alt: "Tabela com instrumentos de avaliação do desenvolvimento neuropsicomotor",
        caption: "Instrumentos de avaliação do desenvolvimento neuropsicomotor de recém-nascidos prematuros"
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

      <p class="text-gray-700 mb-6">A <strong class="text-[#4A96D1] font-semibold">Tabela 1</strong> apresenta os instrumentos de avaliação do desenvolvimento neuropsicomotor de recém-nascidos prematuros, incluindo o tipo de teste, autor e ano de publicação, faixa etária e descrição do teste. Os testes listados são:</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 mb-6">
        <div class="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100">
          <div class="bg-gradient-to-r from-[#4A96D1]/10 to-[#6EC1E4]/5 p-3 border-b border-gray-100">
            <div class="flex items-center">
              <div class="flex-shrink-0 bg-[#4A96D1] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm">1947</div>
              <h4 class="ml-3 text-[#4A96D1] font-semibold text-lg">Teste de Gesell</h4>
            </div>
            <p class="text-xs text-gray-500 mt-1">Arnold Gesell e colaboradores</p>
          </div>
          <div class="p-4">
            <p class="text-gray-700 text-sm">Avaliação direta da qualidade e integração de comportamentos em áreas como comportamento adaptativo, motor, linguagem e pessoal-social, para crianças de 4 semanas a 36 meses.</p>
            <div class="mt-3 text-xs bg-[#F0F9FF] rounded-lg p-2 text-gray-600">
              <span class="font-medium">Faixa etária:</span> 4 semanas a 36 meses
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100">
          <div class="bg-gradient-to-r from-[#4A96D1]/10 to-[#6EC1E4]/5 p-3 border-b border-gray-100">
            <div class="flex items-center">
              <div class="flex-shrink-0 bg-[#4A96D1] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm">1969</div>
              <h4 class="ml-3 text-[#4A96D1] font-semibold text-lg">Escala de Desenvolvimento Infantil de Bayley (BSID)</h4>
            </div>
            <p class="text-xs text-gray-500 mt-1">Nancy Bayley</p>
          </div>
          <div class="p-4">
            <p class="text-gray-700 text-sm">Teste padronizado para avaliar o desenvolvimento motor, cognitivo, de linguagem e comportamental de crianças de 1 a 42 meses, utilizado na intervenção precoce e pesquisa clínica, necessitando de treinamento específico.</p>
            <div class="mt-3 text-xs bg-[#F0F9FF] rounded-lg p-2 text-gray-600">
              <span class="font-medium">Faixa etária:</span> 1 a 42 meses
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100">
          <div class="bg-gradient-to-r from-[#4A96D1]/10 to-[#6EC1E4]/5 p-3 border-b border-gray-100">
            <div class="flex items-center">
              <div class="flex-shrink-0 bg-[#4A96D1] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm">1967</div>
              <h4 class="ml-3 text-[#4A96D1] font-semibold text-lg">Teste Denver</h4>
            </div>
            <p class="text-xs text-gray-500 mt-1">William Frankenburg e Josiah Dodds</p>
          </div>
          <div class="p-4">
            <p class="text-gray-700 text-sm">Teste padronizado para avaliar aspectos pessoal-social, motor fino adaptativo, linguagem e motor grosseiro de crianças de 1 semana a 6 anos e meio, utilizado para diagnosticar atraso no desenvolvimento, embora com fraca especificidade.</p>
            <div class="mt-3 text-xs bg-[#F0F9FF] rounded-lg p-2 text-gray-600">
              <span class="font-medium">Faixa etária:</span> 1 semana a 6 anos e meio
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100">
          <div class="bg-gradient-to-r from-[#4A96D1]/10 to-[#6EC1E4]/5 p-3 border-b border-gray-100">
            <div class="flex items-center">
              <div class="flex-shrink-0 bg-[#4A96D1] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm">1967</div>
              <h4 class="ml-3 text-[#4A96D1] font-semibold text-lg">Teste de Triagem Sobre o Desenvolvimento de Milani-Comparetti</h4>
            </div>
            <p class="text-xs text-gray-500 mt-1">Milani Comparetti e Gidoni</p>
          </div>
          <div class="p-4">
            <p class="text-gray-700 text-sm">Teste de investigação padronizado de comportamentos motores espontâneos e respostas evocadas em crianças de 0 a 2 anos, útil para descrever o desenvolvimento baseado na integração de reflexos primitivos para o controle postural.</p>
            <div class="mt-3 text-xs bg-[#F0F9FF] rounded-lg p-2 text-gray-600">
              <span class="font-medium">Faixa etária:</span> 0 a 2 anos
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100">
          <div class="bg-gradient-to-r from-[#4A96D1]/10 to-[#6EC1E4]/5 p-3 border-b border-gray-100">
            <div class="flex items-center">
              <div class="flex-shrink-0 bg-[#4A96D1] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm">1969</div>
              <h4 class="ml-3 text-[#4A96D1] font-semibold text-lg">Gráfico do Desenvolvimento Motor de Zdanska - Brincken</h4>
            </div>
            <p class="text-xs text-gray-500 mt-1">Zdanska-Brincken e Wolanski</p>
          </div>
          <div class="p-4">
            <p class="text-gray-700 text-sm">Avalia o controle postural de crianças no 1º ano de vida, detalhando as mudanças no desenvolvimento em movimentos da cabeça e tronco, postura sentada, bípede e locomoção.</p>
            <div class="mt-3 text-xs bg-[#F0F9FF] rounded-lg p-2 text-gray-600">
              <span class="font-medium">Faixa etária:</span> 0 a 12 meses
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100">
          <div class="bg-gradient-to-r from-[#4A96D1]/10 to-[#6EC1E4]/5 p-3 border-b border-gray-100">
            <div class="flex items-center">
              <div class="flex-shrink-0 bg-[#4A96D1] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm">1973</div>
              <h4 class="ml-3 text-[#4A96D1] font-semibold text-lg">Escala de Avaliação do Comportamento do Neonato (NBAS)</h4>
            </div>
            <p class="text-xs text-gray-500 mt-1">T. Berry Brazelton e J. Kelvi Nugent</p>
          </div>
          <div class="p-4">
            <p class="text-gray-700 text-sm">Teste para recém-nascidos pré-termo com 37-48 semanas pós-concepção, baseado em critérios de habituação, resposta oromotora, função vestibular e de tronco, comportamentos e interação social, fornecendo informações sobre os padrões interativos das crianças.</p>
            <div class="mt-3 text-xs bg-[#F0F9FF] rounded-lg p-2 text-gray-600">
              <span class="font-medium">Faixa etária:</span> 37-48 semanas pós-concepção
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100">
          <div class="bg-gradient-to-r from-[#4A96D1]/10 to-[#6EC1E4]/5 p-3 border-b border-gray-100">
            <div class="flex items-center">
              <div class="flex-shrink-0 bg-[#4A96D1] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm">1980</div>
              <h4 class="ml-3 text-[#4A96D1] font-semibold text-lg">Avaliação dos Movimentos da Criança (MAI)</h4>
            </div>
            <p class="text-xs text-gray-500 mt-1">Lynnette Chandler, Mary Andrews e Marcia Sanson</p>
          </div>
          <div class="p-4">
            <p class="text-gray-700 text-sm">Teste para crianças de 0-12 meses, baseado em critérios para tônus muscular, reflexos, reações automáticas e movimento voluntário, calculando o valor de risco para identificar RN com disfunção motora.</p>
            <div class="mt-3 text-xs bg-[#F0F9FF] rounded-lg p-2 text-gray-600">
              <span class="font-medium">Faixa etária:</span> 0 a 12 meses
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100">
          <div class="bg-gradient-to-r from-[#4A96D1]/10 to-[#6EC1E4]/5 p-3 border-b border-gray-100">
            <div class="flex items-center">
              <div class="flex-shrink-0 bg-[#4A96D1] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm">1981</div>
              <h4 class="ml-3 text-[#4A96D1] font-semibold text-lg">Avaliação Neurológica de Bebês Prematuros e a Termo</h4>
            </div>
            <p class="text-xs text-gray-500 mt-1">Lilly Dubowitz e Victor Dubowitz</p>
          </div>
          <div class="p-4">
            <p class="text-gray-700 text-sm">Teste para bebês a termo até 3 dias de vida e pré-termo estáveis, baseado em critérios de maturação neurológica, testando habituação, movimento, tônus, reflexos e respostas comportamentais para determinar maturação e desvios neurológicos.</p>
            <div class="mt-3 text-xs bg-[#F0F9FF] rounded-lg p-2 text-gray-600">
              <span class="font-medium">Faixa etária:</span> Bebês a termo até 3 dias de vida e pré-termo estáveis
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100">
          <div class="bg-gradient-to-r from-[#4A96D1]/10 to-[#6EC1E4]/5 p-3 border-b border-gray-100">
            <div class="flex items-center">
              <div class="flex-shrink-0 bg-[#4A96D1] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm">1982</div>
              <h4 class="ml-3 text-[#4A96D1] font-semibold text-lg">Peabody Developmental Motor Scale (Escala PDMS)</h4>
            </div>
            <p class="text-xs text-gray-500 mt-1">Rhonda Folio e Rebecca Fewell</p>
          </div>
          <div class="p-4">
            <p class="text-gray-700 text-sm">Teste padronizado para avaliação das habilidades motoras grosseiras e finas divididas em reflexos, estática, locomoção, manipulação de objetos, garra e integração visuomotora em crianças de 1-72 meses, útil em programas de intervenção precoce.</p>
            <div class="mt-3 text-xs bg-[#F0F9FF] rounded-lg p-2 text-gray-600">
              <span class="font-medium">Faixa etária:</span> 1 a 72 meses
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100">
          <div class="bg-gradient-to-r from-[#4A96D1]/10 to-[#6EC1E4]/5 p-3 border-b border-gray-100">
            <div class="flex items-center">
              <div class="flex-shrink-0 bg-[#4A96D1] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm">1993</div>
              <h4 class="ml-3 text-[#4A96D1] font-semibold text-lg">TIMP (Test of Infant Motor Performance)</h4>
            </div>
            <p class="text-xs text-gray-500 mt-1">Suzann Campbell</p>
          </div>
          <div class="p-4">
            <p class="text-gray-700 text-sm">Avalia movimentos funcionais da cabeça e controle do tronco nas posições em prono, supino e de pé, com 28 itens avaliados em dicotomia e 31 itens escalonados, em bebês pré-termo nascidos com 34 semanas pós-concepção e até 4 meses após o nascimento, identificando RN com risco de resultado motor pobre.</p>
            <div class="mt-3 text-xs bg-[#F0F9FF] rounded-lg p-2 text-gray-600">
              <span class="font-medium">Faixa etária:</span> 34 semanas pós-concepção até 4 meses após o nascimento
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100">
          <div class="bg-gradient-to-r from-[#4A96D1]/10 to-[#6EC1E4]/5 p-3 border-b border-gray-100">
            <div class="flex items-center">
              <div class="flex-shrink-0 bg-[#4A96D1] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm">1994</div>
              <h4 class="ml-3 text-[#4A96D1] font-semibold text-lg">Alberta Infant Motor Scale (AIMS)</h4>
            </div>
            <p class="text-xs text-gray-500 mt-1">Martha Piper e Johanna Darrah</p>
          </div>
          <div class="p-4">
            <p class="text-gray-700 text-sm">Teste padronizado na observação das habilidades motoras grosseiras em quatro posições (prono, supino, sentada e de pé) em crianças de 0 a 18 meses, identificando RN com atraso motor e avaliando a maturação da habilidade motora grosseira.</p>
            <div class="mt-3 text-xs bg-[#F0F9FF] rounded-lg p-2 text-gray-600">
              <span class="font-medium">Faixa etária:</span> 0 a 18 meses
            </div>
          </div>
        </div>
      </div>

      <h3 id="teste-gesell" class="text-2xl text-[#6EC1E4] mt-10 mb-4 font-semibold">Teste de Gesell</h3>

      <p class="text-gray-700">O Teste de Gesell, elaborado por Arnold Gesell e colaboradores na década de 1920, avalia o comportamento da criança durante o desenvolvimento para diagnosticar desvios. O teste, atualizado como Escala de Desenvolvimento de Gesell e Amatruda, envolve a avaliação direta e observação da qualidade e integração de comportamentos em crianças de quatro semanas a 36 meses de idade cronológica. As categorias de análise incluem comportamento adaptativo (organização e adaptação sensório-motora, cognição), comportamento motor grosseiro e delicado (sustentação da cabeça, sentar, engatinhar, andar, manipulação de objetos), comportamento de linguagem (expressiva ou receptiva) e comportamento pessoal-social (relação com o meio-ambiente). Os comportamentos são observados em idades-chave como quatro semanas, 16 semanas, 28 semanas, 40 semanas, 12 meses, 18 meses, 24 meses e 36 meses. O resultado final é quantitativo e expresso como quociente de desenvolvimento (QD), utilizando a idade corrigida para prematuros. Os dados são comparados a uma escala elaborada a partir de comportamentos padrão apresentados por crianças em determinadas faixas etárias. O teste apresenta boa confiabilidade e validade, sendo um bom instrumento diagnóstico utilizado em pesquisas e centros de reabilitação. No entanto, não considera a movimentação espontânea do RN, sua qualidade de movimentos, e baseia-se na teoria neuromaturacional do desenvolvimento.</p>

      <h3 id="escala-bayley" class="text-2xl text-[#6EC1E4] mt-10 mb-4 font-semibold">Escala de Desenvolvimento Infantil de Bayley (BSID)</h3>

      <p class="text-gray-700">As Escalas de Desenvolvimento Infantil de Bayley (BSID), originalmente publicadas em 1933 e revisadas em 1969, são consideradas possuidoras de propriedades psicométricas para avaliar o desenvolvimento infantil, sendo padronizadas com referências normativas para crianças pequenas. Desenvolvidas por Nancy Bayley e colaboradores, as escalas são um meio abrangente de avaliar o estado de desenvolvimento de uma criança, resultado de mais de 40 anos de pesquisa e prática clínica com crianças pequenas. O teste foi padronizado em uma amostra de 1262 crianças americanas com idade de dois a 30 meses, divididas em 14 grupos, no ano de 1960, e apresenta três versões: BSID I (1969), BSID II (1983) e BSID III (2006). As escalas BSID II são reconhecidas como umas das melhores na área de avaliação do desenvolvimento infantil, fornecendo resultados confiáveis, válidos e precisos. Sua utilização como instrumento de pesquisa tem grande suporte da comunidade científica, mas seu elevado custo e o treino exigido para correta administração restringem seu uso a especialistas que trabalham com crianças pequenas. A BSID-III corresponde à Escala de Bayley – III e ao Teste de Triagem Bayley–III (Screeningtest), subdividido em cinco domínios: Cognição, Linguagem (comunicação expressiva e receptiva), Motor (grosso e fino), Social-emocional e Componente adaptativo. Os três primeiros domínios são observados com a criança em situação de teste, e os dois últimos são observados por meio de questionários preenchidos pelos pais ou cuidadores. A Escala de Bayley – III é uma atualização dos dados normativos da BSID-II com amostra contemporânea e representativa, indicada para avaliar crianças de um a 42 meses de idade, apresentando melhora do conteúdo dos testes, da qualidade psicométrica e, consequentemente, maior utilidade clínica. Dentre os domínios, a Escala Cognitiva determina como a criança pensa, reage e aprende sobre o mundo ao seu redor e está composta de 91 itens; a Escala de Linguagem está subdividida em dois subtipos: Comunicação Receptiva (49 itens) e Comunicação Expressiva (48 itens). A Escala Motora está subdividida em Escala Motora Grossa (72 itens) e Fina (66 itens). A utilização dessa escala no Brasil é possível, porém, com limitações, pois ainda não se dispõe de validação para nossa população e cultura. Outras limitações importantes são que a escala só pode ser aplicada por profissionais especializados e treinados, e o examinador deve ser cauteloso na aplicação da mesma em RN pré-termo.</p>
      
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
  {
    id: "dor-neonatal",
    title: "Dor Neonatal",
    description: "Avaliação e manejo da dor em recém-nascidos e prematuros.",
    icon: <HeartPulse className="h-10 w-10 text-[#FF6B6B]" />,
    content: DorNeonatalContent,
  },
  {
    id: "metodo-canguru",
    title: "Método Canguru",
    description: "Benefícios e aplicação do método canguru em neonatos.",
    icon: <Baby className="h-10 w-10 text-[#A8E6CF]" />,
    content: MetodoCanguruContent,
  },
  {
    id: "hidroterapia",
    title: "Hidroterapia em neonatos",
    description: "Técnicas e benefícios da hidroterapia para bebês prematuros e recém-nascidos.",
    icon: <Droplets className="h-10 w-10 text-[#6EC1E4]" />,
    content: HidroterapiaNeonatosContent,
  },
  {
    id: "sequelas-neurologicas",
    title: "Sequelas de doenças neurológicas em prematuros",
    description: "Identificação e tratamento de sequelas neurológicas em bebês prematuros.",
    icon: <Brain className="h-10 w-10 text-[#B9A9FF]" />,
    content: SequelasNeurologicasContent,
  },
  {
    id: "sequelas-pulmonares",
    title: "Sequelas de doenças pulmonares em prematuros",
    description: "Abordagem fisioterapêutica para sequelas pulmonares em prematuros.",
    icon: <Stethoscope className="h-10 w-10 text-[#6EC1E4]" />,
    content: SequelasPulmonaresContent,
  },
  {
    id: "avaliacao-neuro",
    title: "Avaliação Neuropsicomotora",
    icon: "/icons/brain.svg",
    description: "Compreenda como é feita a avaliação do desenvolvimento neuropsicomotor em bebês.",
    content: `
      <div class="my-8">
        <div class="relative h-[200px] md:h-[280px] w-full rounded-xl overflow-hidden shadow-md mb-4 bg-gray-50">
          <img src="/images/reflexos/bebe-sentado.jpg" alt="Bebê em posição sentada com apoio" class="object-contain w-full h-full max-h-full" style="object-fit: scale-down;" />
        </div>
        <p class="text-sm text-center text-gray-600 italic">Desenvolvimento do controle postural em posição sentada com apoio</p>
      </div>

      <h2>Desenvolvimento Neuropsicomotor do Bebê: Primeiro ao Sexto Mês de Vida</h2>
      
      <h3>Conceitos Essenciais</h3>
      <p>O desenvolvimento segue uma maturação neuromotora que progride em três períodos principais no primeiro ano de vida:</p>

      <div class="my-6">
        <div class="relative h-[250px] md:h-[350px] w-full rounded-xl overflow-hidden shadow-md mb-4 bg-gray-50">
          <img src="/images/reflexos/evolucao-postural.jpg" alt="Evolução postural do bebê ao longo dos meses" class="object-contain w-full h-full" />
        </div>
        <p class="text-sm text-center text-gray-600 italic">Progressão do desenvolvimento postural do bebê</p>
      </div>

      <ol>
        <li><strong>Final da vida fetal:</strong> Há uma maturação ascendente do tônus em flexão e reforço do tônus antigravitário.</li>
        <li><strong>Por volta de 40 semanas de Idade Corrigida (IC):</strong> Predomínio da flexão, extensão na posição vertical e equilíbrio entre flexores e extensores da cabeça.</li>
        <li><strong>Dois primeiros anos:</strong> Maturação descendente do sistema piramidal, influenciando o tônus muscular e as aquisições motoras.</li>
      </ol>
      <p>A avaliação do tônus muscular sempre considera a Idade Corrigida (IC) e observa a simetria, passando da hipertonia fisiológica para a hipotonia fisiológica.</p>

      <div class="my-8">
        <div class="relative h-[250px] md:h-[350px] w-full rounded-xl overflow-hidden shadow-md mb-4 bg-gray-50">
          <img src="/images/reflexos/tonus-muscular.jpg" alt="Tabela de evolução do tônus muscular" class="object-contain w-full h-full" />
        </div>
        <p class="text-sm text-center text-gray-600 italic">Evolução do tônus muscular de acordo com a idade corrigida (IC)</p>
      </div>
      
      <h3 id="primeiro-mês">Primeiro Mês</h3>
      <ul>
        <li><strong>Aspectos Clínicos Detalhados:</strong> Neste período, o bebê está se adaptando à vida extrauterina. A postura é caracterizada por flexão predominante devido ao tônus muscular aumentado. Assimetrias posturais são comuns, mas devem ser avaliadas para descartar torcicolos congênitos ou preferências anormais.</li>
        <li><strong>Reflexos Primitivos:</strong> A avaliação dos reflexos primitivos é crucial. O reflexo de Moro (reação de sobressalto) está presente e simétrico. A ausência ou assimetria podem indicar lesão neurológica. O reflexo de preensão palmar é forte, mas involuntário.</li>
        <li><strong>Exemplo Prático:</strong> Ao examinar um recém-nascido, observe a postura em repouso. A cabeça está predominantemente lateralizada? Há resistência ao tentar centralizá-la? Avalie o reflexo de Moro: segure o bebê em semissentado e simule uma queda. A resposta esperada é abdução e extensão dos braços, seguidas de adução e choro.</li>
        <li><strong>Sinais de Alerta:</strong> Mãos persistentemente fechadas ou dedos do pé em garra podem ser sinais de alerta.</li>
      </ul>
      <p><em>Orientação para os pais:</em> Estimular posturas adequadas e fornecer estímulos sensoriais suaves.</p>
      
      <div class="my-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 max-w-xs mx-auto">
          <div class="relative h-44 w-full rounded-lg overflow-hidden mb-3">
            <img src="/images/reflexos/bebe-mao-boca.jpg" alt="bebê com a mão na boca" class="object-cover w-full h-full" />
          </div>
          <p class="text-sm text-center text-gray-600 italic">O bebê apresenta movimentação corporal rica, toca o rosto e eleva os membros inferiores do apoio.</p>
        </div>
        
        <div class="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 max-w-xs mx-auto">
          <div class="relative h-44 w-full rounded-lg overflow-hidden mb-3">
            <img src="/images/reflexos/bebe-terapeuta-1.jpg" alt="Bebê interagindo com terapeuta" class="object-cover w-full h-full" />
          </div>
          <p class="text-sm text-center text-gray-600 italic">Contato olho no olho, toque e conversa ajudam o bebê a se manter organizado. O rolinho é também uma forma de manter a organização corporal, mas é desaconselhado durante o sono e quando os pais não estão próximos.</p>
        </div>
      </div>
      
      <div class="my-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 max-w-xs mx-auto">
          <div class="relative h-44 w-full rounded-lg overflow-hidden mb-3">
            <img src="/images/reflexos/bebe-terapeuta-2.jpg" alt="Bebê no colo do terapeuta" class="object-cover w-full h-full" />
          </div>
          <p class="text-sm text-center text-gray-600 italic">Manter o bebê organizado no colo e realizar a estimulação visual, auditiva e tátil no cuidado diário.</p>
        </div>
      </div>
      
      <h3 id="segundo-mês">Segundo Mês</h3>
      <ul>
        <li><strong>Aspectos Clínicos Detalhados:</strong> O predomínio da flexão começa a diminuir, e o bebê explora a extensão. O Reflexo Tônico Cervical Assimétrico (RTCA) é notado quando o bebê vira a cabeça para um lado, e o braço e a perna desse lado estendem-se, enquanto os membros do lado oposto se flexionam. Este reflexo auxilia na descoberta visual das mãos.</li>
        <li><strong>Controle Ocular e Auditivo:</strong> Há um início do controle olho-mão e a capacidade de virar a cabeça em direção aos sons.</li>
        <li><strong>Exemplo Prático:</strong> Observe o bebê em supino. Ele consegue levantar os braços em direção a um brinquedo? Ao chacoalhar um chocalho ao lado da cabeça, ele vira na direção do som? A falta dessas respostas pode indicar atraso no desenvolvimento.</li>
        <li><strong>Sinais de Alerta:</strong> A ausência de sorriso social ou a falta de reação a sons familiares são sinais de alerta.</li>
      </ul>
      <p><em>Orientação para os pais:</em> Encorajar a descoberta visual das mãos e oferecer estímulos visuais e auditivos.</p>
      
      <div class="my-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 max-w-xs mx-auto">
          <div class="relative h-44 w-full rounded-lg overflow-hidden mb-3">
            <img src="/images/reflexos/bebe-supino-1.jpg" alt="Bebê de 2 meses em posição supino" class="object-cover w-full h-full" />
          </div>
          <p class="text-sm text-center text-gray-600 italic">Neste mês, os braços permanecem próximos ao corpo e as mãos, predominantemente abertas. A estimulação com aproximação dos ombros e um leve movimento destes em direção à pelve possibilita que os ombros se afastem das orelhas e os braços alcancem a linha média.</p>
        </div>
        
        <div class="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 max-w-xs mx-auto">
          <div class="relative h-44 w-full rounded-lg overflow-hidden mb-3">
            <img src="/images/reflexos/bebe-prono-1.jpg" alt="Bebê de 2 meses em posição prono" class="object-cover w-full h-full" />
          </div>
          <p class="text-sm text-center text-gray-600 italic">Observa-se uma hipotonia axial leve, pois, aos 2 meses, o bebê deve elevar a cabeça e a parte superior do tronco.</p>
        </div>
      </div>
      
      <div class="my-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 max-w-xs mx-auto">
          <div class="relative h-44 w-full rounded-lg overflow-hidden mb-3">
            <img src="/images/reflexos/bebe-estimulo.jpg" alt="Bebê recebendo estímulo para elevar a cabeça" class="object-cover w-full h-full" />
          </div>
          <p class="text-sm text-center text-gray-600 italic">Estímulos para elevar a cabeça como uma leve tração sobre os ombros ou do tronco em direção à pelve.</p>
        </div>
      </div>
      
      <h3 id="terceiro-mês">Terceiro Mês</h3>
      <ul>
        <li><strong>Aspectos Clínicos Detalhados:</strong> A simetria corporal se torna mais evidente, e o bebê mantém a cabeça na linha média com mais frequência. Em prono, ele eleva a cabeça contra a gravidade, marcando o primeiro controle voluntário.</li>
        <li><strong>Coordenação Visuomotora:</strong> A coordenação olho-mão melhora, e o bebê segue objetos em movimento circular.</li>
        <li><strong>Exemplo Prático:</strong> Coloque o bebê em prono sobre uma superfície firme. Ele consegue levantar a cabeça a 45° e mantê-la por alguns segundos? Em supino, ele tenta alcançar um brinquedo com ambas as mãos? A dificuldade nessas tarefas pode indicar hipotonia ou atraso motor.</li>
        <li><strong>Sinais de Alerta:</strong> Controle pobre da cabeça além dos 3 meses é um sinal de alerta.</li>
      </ul>
      <p><em>Orientação para os pais:</em> Estimular o contato olho no olho, oferecer estímulos proprioceptivos e promover a simetria.</p>
      
      <div class="my-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div class="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
            <div class="relative h-52 w-full rounded-lg overflow-hidden mb-3">
              <img src="/images/reflexos/bebe-terapeuta-3.jpg" alt="Bebê com terapeuta fazendo contato olho no olho" class="object-cover w-full h-full" />
            </div>
          </div>
          
          <div class="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
            <div class="relative h-52 w-full rounded-lg overflow-hidden mb-3">
              <img src="/images/reflexos/bebe-supino-2.jpg" alt="Bebê de 3 meses em posição supina" class="object-cover w-full h-full" />
            </div>
          </div>
        </div>
        <p class="text-sm text-center text-gray-600 italic mb-6 bg-[#F0F9FF] p-3 rounded-lg shadow-sm">Contato olho no olho, conversa e estímulos proprioceptivos durante os exercícios orientados de acordo com a fase do desenvolvimento: espera-se cabeça alinhada, simetria, mãos abertas e alcançando os joelhos.</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
            <div class="relative h-52 w-full rounded-lg overflow-hidden mb-3">
              <img src="/images/reflexos/bebe-prono-2.jpg" alt="Bebê de 3 meses em prono com rolinho" class="object-cover w-full h-full" />
            </div>
            <p class="text-sm text-center text-gray-600 italic">Estímulos visuais ou sonoros e o uso do rolinho subaxilar ajudam no controle da cabeça e na melhora do tônus axial. Aos 3 meses, o bebê apoia-se sobre os antebraços com os cotovelos à frente dos ombros.</p>
          </div>
          
          <div class="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
            <div class="relative h-52 w-full rounded-lg overflow-hidden mb-3">
              <img src="/images/reflexos/bebe-colo.jpg" alt="Bebê no colo em posição de cadeirinha" class="object-cover w-full h-full" />
            </div>
            <p class="text-sm text-center text-gray-600 italic">Carregar no colo "em cadeirinha" ajuda a organização corporal e melhora o tônus cervical e axial do bebê.</p>
          </div>
        </div>
      </div>
      
      <h3 id="quarto-mês">Quarto Mês</h3>
      <ul>
        <li><strong>Aspectos Clínicos Detalhados:</strong> A simetria predomina em todas as posições, e o RTCA começa a atenuar. O bebê eleva os braços para alcançar objetos e, ao ser puxado para sentar, mantém a cabeça alinhada.</li>
        <li><strong>Preensão Cubito-Palmar:</strong> Inicia-se a preensão cubito-palmar, com o bebê aproximando a mão do objeto com um movimento de varredura.</li>
        <li><strong>Exemplo Prático:</strong> Segure um brinquedo próximo ao bebê em supino. Ele consegue elevar os braços para alcançá-lo, utilizando um movimento de varredura com a mão? Ao puxá-lo para sentar, a cabeça acompanha o movimento sem cair para trás? A dificuldade nessas atividades pode indicar fraqueza muscular ou falta de coordenação.</li>
        <li><strong>Sinais de Alerta:</strong> Jogar-se constantemente para trás quando sentado é um sinal de alerta.</li>
      </ul>
      <p><em>Orientação para os pais:</em> Estimular o alcance de objetos na linha média e o rolar de supino para prono.</p>
      
      <div class="my-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 max-w-xs mx-auto">
          <div class="relative h-44 w-full rounded-lg overflow-hidden mb-3">
            <img src="/images/reflexos/bebe-alcance.jpg" alt="Bebê alcançando objeto na linha média" class="object-cover w-full h-full" />
          </div>
          <p class="text-sm text-center text-gray-600 italic">Alcance do objeto na linha média, afastado do tronco com ambas as mãos.</p>
        </div>
        
        <div class="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 max-w-xs mx-auto">
          <div class="relative h-44 w-full rounded-lg overflow-hidden mb-3">
            <img src="/images/reflexos/bebe-descoberta-pes.jpg" alt="Bebê descobrindo os pés" class="object-cover w-full h-full" />
          </div>
          <p class="text-sm text-center text-gray-600 italic">Estimulação da descoberta dos pés com meias, argolas coloridas ou brincando com o bebê. Observa-se a aproximação do queixo ao tórax, o que contribui no alongamento da musculatura cervical.</p>
        </div>
      </div>
      
      <div class="my-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 max-w-xs mx-auto">
          <div class="relative h-44 w-full rounded-lg overflow-hidden mb-3">
            <img src="/images/reflexos/bebe-rolando.jpg" alt="Sequência de bebê rolando" class="object-cover w-full h-full" />
          </div>
          <p class="text-sm text-center text-gray-600 italic">Estimular o rolar de supino para prono. Com o estímulo visual, o bebê vira a cabeça. O membro superior em rotação externa e alinhado ao ombro, o membro inferior contralateral flexionado e, com apoio no quadril, realiza-se um movimento em direção ao objeto. O bebê passa pela postura lateral e alcança o prono.</p>
        </div>
      </div>
      
      <h3 id="quinto-mês">Quinto Mês</h3>
      <ul>
        <li><strong>Aspectos Clínicos Detalhados:</strong> O bebê explora seus pés, rola para ambos os lados e inicia a reação de apoio anterior. Em prono, ele eleva o tronco com extensão dos cotovelos e pode pivotear.</li>
        <li><strong>Hipotonia Fisiológica:</strong> Inicia-se a fase da hipotonia fisiológica, importante para as aquisições sensório-motoras.</li>
        <li><strong>Exemplo Prático:</strong> Observe o bebê em supino. Ele consegue alcançar os pés e levá-los à boca? Ao colocá-lo de lado, ele rola completamente para a posição prona? Em prono, ele se apoia nas mãos com os cotovelos estendidos, elevando o tronco? A dificuldade nessas atividades pode indicar tônus muscular inadequado ou falta de integração motora.</li>
        <li><strong>Sinais de Alerta:</strong> Usar somente um lado do corpo para se mover é um sinal de alerta.</li>
      </ul>
      <p><em>Orientação para os pais:</em> Estimular o alcance dos pés à boca e a musculatura abdominal durante as trocas de postura.</p>
      
      <div class="my-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 max-w-xs mx-auto">
          <div class="relative h-44 w-full rounded-lg overflow-hidden mb-3">
            <img src="/images/reflexos/bebe-alcance-2.jpg" alt="Bebê alcançando objeto na linha média" class="object-cover w-full h-full" />
          </div>
          <p class="text-sm text-center text-gray-600 italic">Estimular o alcance dos pés à boca. Nota-se o início da fase da hipotonia fisiológica do bebê, importante para as aquisições sensório-motoras.</p>
        </div>
        
        <div class="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 max-w-xs mx-auto">
          <div class="relative h-44 w-full rounded-lg overflow-hidden mb-3">
            <img src="/images/reflexos/bebe-estimulo-2.jpg" alt="Bebê descobrindo os pés" class="object-cover w-full h-full" />
          </div>
          <p class="text-sm text-center text-gray-600 italic">A estimulação da musculatura abdominal pode ocorrer durante as trocas de posturas, como de supino para sentado e vice-versa.</p>
        </div>
      </div>
      
      <div class="my-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 max-w-xs mx-auto">
          <div class="relative h-44 w-full rounded-lg overflow-hidden mb-3">
            <img src="/images/reflexos/bebe-rolo.jpg" alt="Sequência de bebê rolando" class="object-cover w-full h-full" />
          </div>
          <p class="text-sm text-center text-gray-600 italic">O uso do rolinho na região tóraco-abdominal possibilita a extensão dos membros superiores e dos quadris. O bebê pode transferir o peso para um dos lados, a fim de elevar o outro braço para alcançar o brinquedo. Estímulos como uma leve tração do tronco em direção à pelve contribuem para que se mantenha na postura.</p>
        </div>
        
        <div class="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 max-w-xs mx-auto">
          <div class="relative h-44 w-full rounded-lg overflow-hidden mb-3">
            <img src="/images/reflexos/bebe-sentado-2.jpg" alt="Bebê em posição sentada" class="object-cover w-full h-full" />
          </div>
          <p class="text-sm text-center text-gray-600 italic">Incentivar a postura sentada com as mãos apoiadas à frente do corpo</p>
        </div>
      </div>

      <h3 id="sexto-mês">Sexto Mês</h3>
      <ul>
        <li><strong>Aspectos Clínicos Detalhados:</strong> Os movimentos voluntários tornam-se mais refinados e coordenados. O bebê interage com o meio, pessoas e objetos, prestando atenção e emitindo fonemas ainda sem significado simbólico.</li>
        <li><strong>Sentar e Preensão:</strong> Ele mantém-se sentado sem apoio por curtos períodos e a preensão evolui para o estágio dígito-palmar.</li>
        <li><strong>Exemplo Prático:</strong> Sente o bebê no chão, apoiando-o inicialmente. Ele consegue manter a postura sentada sem apoio por alguns segundos? Ofereça um pequeno objeto. Ele o pega utilizando os dedos e a palma da mão? A dificuldade nessas tarefas pode indicar instabilidade postural ou problemas de preensão.</li>
        <li><strong>Sinais de Alerta:</strong> Dificuldade para se manter nas posturas de acordo com a faixa etária e alteração do tônus muscular são sinais de alerta.</li>
      </ul>
      <p><em>Orientação para os pais:</em> Estimular a retificação do tronco e o rolar de prono para supino.</p>
      
      <div class="mt-8 mb-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
          <div class="relative h-52 w-full rounded-lg overflow-hidden mb-3">
            <img src="/images/reflexos/bebe-estimulo-3.jpg" alt="Bebê recebendo estímulo" class="object-cover w-full h-full" />
          </div>
          <p class="text-sm text-center text-gray-600 italic">Estímulos como uma leve tração do tronco em direção à pelve contribuem para a retificação do tronco.</p>
        </div>

        <div class="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
          <div class="relative h-52 w-full rounded-lg overflow-hidden mb-3">
            <img src="/images/reflexos/bebe-estimulo-4.jpg" alt="Bebê preparando para rolar" class="object-cover w-full h-full" />
          </div>
          <p class="text-sm text-center text-gray-600 italic">Estimular o rolar de prono para supino. O membro superior elevado ao longo da cabeça e em rotação externa, o membro inferior contralateral flexionado, realiza-se um movimento de rotação em direção posterior. O bebê passa pela postura lateral e alcança o supino.</p>
        </div>
      </div>

      <h3>Considerações Adicionais</h3>
      <ul>
        <li><strong>Visão e Audição:</strong> Aos 3 meses, a visão fica mais nítida, o que é crucial para a coordenação óculo-manual. A avaliação auditiva é fundamental, e qualquer ausência de resposta deve ser encaminhada para diagnóstico funcional.</li>
        <li><strong>Sinais de Alerta:</strong> Assimetrias, pobreza ou excesso de movimentos, atraso no controle da cabeça, dificuldades nas posturas e ausência de sorriso social são sinais de alerta.</li>
      </ul>
      <p>Lembre-se que cada bebê tem seu próprio ritmo de desenvolvimento. O importante é oferecer um ambiente rico em estímulos e estar atento aos sinais de alerta para intervenção precoce, se necessário.</p>

      <h3 id="teste-gesell" class="text-2xl text-[#6EC1E4] mt-10 mb-4 font-semibold">Teste de Gesell</h3>

      <p class="text-gray-700">O Teste de Gesell, elaborado por Arnold Gesell e colaboradores na década de 1920, avalia o comportamento da criança durante o desenvolvimento para diagnosticar desvios. O teste, atualizado como Escala de Desenvolvimento de Gesell e Amatruda, envolve a avaliação direta e observação da qualidade e integração de comportamentos em crianças de quatro semanas a 36 meses de idade cronológica. As categorias de análise incluem comportamento adaptativo (organização e adaptação sensório-motora, cognição), comportamento motor grosseiro e delicado (sustentação da cabeça, sentar, engatinhar, andar, manipulação de objetos), comportamento de linguagem (expressiva ou receptiva) e comportamento pessoal-social (relação com o meio-ambiente). Os comportamentos são observados em idades-chave como quatro semanas, 16 semanas, 28 semanas, 40 semanas, 12 meses, 18 meses, 24 meses e 36 meses. O resultado final é quantitativo e expresso como quociente de desenvolvimento (QD), utilizando a idade corrigida para prematuros. Os dados são comparados a uma escala elaborada a partir de comportamentos padrão apresentados por crianças em determinadas faixas etárias. O teste apresenta boa confiabilidade e validade, sendo um bom instrumento diagnóstico utilizado em pesquisas e centros de reabilitação. No entanto, não considera a movimentação espontânea do RN, sua qualidade de movimentos, e baseia-se na teoria neuromaturacional do desenvolvimento.</p>
      
      <h3 id="escala-bayley" class="text-2xl text-[#6EC1E4] mt-10 mb-4 font-semibold">Escala de Desenvolvimento Infantil de Bayley (BSID)</h3>

      <p class="text-gray-700">As Escalas de Desenvolvimento Infantil de Bayley (BSID), originalmente publicadas em 1933 e revisadas em 1969, são consideradas possuidoras de propriedades psicométricas para avaliar o desenvolvimento infantil, sendo padronizadas com referências normativas para crianças pequenas. Desenvolvidas por Nancy Bayley e colaboradores, as escalas são um meio abrangente de avaliar o estado de desenvolvimento de uma criança, resultado de mais de 40 anos de pesquisa e prática clínica com crianças pequenas. O teste foi padronizado em uma amostra de 1262 crianças americanas com idade de dois a 30 meses, divididas em 14 grupos, no ano de 1960, e apresenta três versões: BSID I (1969), BSID II (1983) e BSID III (2006). As escalas BSID II são reconhecidas como umas das melhores na área de avaliação do desenvolvimento infantil, fornecendo resultados confiáveis, válidos e precisos. Sua utilização como instrumento de pesquisa tem grande suporte da comunidade científica, mas seu elevado custo e o treino exigido para correta administração restringem seu uso a especialistas que trabalham com crianças pequenas. A BSID-III corresponde à Escala de Bayley – III e ao Teste de Triagem Bayley–III (Screeningtest), subdividido em cinco domínios: Cognição, Linguagem (comunicação expressiva e receptiva), Motor (grosso e fino), Social-emocional e Componente adaptativo. Os três primeiros domínios são observados com a criança em situação de teste, e os dois últimos são observados por meio de questionários preenchidos pelos pais ou cuidadores. A Escala de Bayley – III é uma atualização dos dados normativos da BSID-II com amostra contemporânea e representativa, indicada para avaliar crianças de um a 42 meses de idade, apresentando melhora do conteúdo dos testes, da qualidade psicométrica e, consequentemente, maior utilidade clínica. Dentre os domínios, a Escala Cognitiva determina como a criança pensa, reage e aprende sobre o mundo ao seu redor e está composta de 91 itens; a Escala de Linguagem está subdividida em dois subtipos: Comunicação Receptiva (49 itens) e Comunicação Expressiva (48 itens). A Escala Motora está subdividida em Escala Motora Grossa (72 itens) e Fina (66 itens). A utilização dessa escala no Brasil é possível, porém, com limitações, pois ainda não se dispõe de validação para nossa população e cultura. Outras limitações importantes são que a escala só pode ser aplicada por profissionais especializados e treinados, e o examinador deve ser cauteloso na aplicação da mesma em RN pré-termo.</p>
      
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