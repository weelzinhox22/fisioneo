// Respostas de fallback para o assistente quando a API não estiver disponível

export const fallbackResponses = {
  // Respostas para tópicos específicos
  reflexos: [
    "Os reflexos primitivos são respostas motoras automáticas presentes em recém-nascidos. Eles são importantes indicadores do desenvolvimento neurológico normal.",
    "O reflexo de Moro (reflexo de susto) normalmente desaparece por volta dos 3 meses de idade.",
    "O reflexo tônico cervical assimétrico (RTCA) geralmente persiste até os 6 meses de idade.",
    "O reflexo de preensão plantar normalmente persiste até aproximadamente 12 meses de idade.",
    "O Reflexo de Galant é testado estimulando a lateral da coluna do bebê, o que causa flexão do tronco para o lado estimulado.",
  ],

  desenvolvimento: [
    "O desenvolvimento motor infantil segue uma sequência previsível, começando com o controle da cabeça, seguido por rolar, sentar, engatinhar e andar.",
    "A fisioterapia neonatal pode ajudar a estimular o desenvolvimento neuromotor e prevenir complicações em bebês de risco.",
    "Marcos do desenvolvimento típico incluem: controle cefálico (3 meses), sentar sem apoio (6 meses), engatinhar (9 meses) e andar (12-15 meses).",
    "A estimulação precoce é fundamental para o desenvolvimento adequado, especialmente em bebês prematuros ou com alterações neurológicas.",
  ],

  prematuro: [
    "Bebês prematuros podem necessitar de cuidados especiais de fisioterapia para estimular o desenvolvimento neuromotor e prevenir complicações.",
    "O método canguru é uma técnica eficaz para bebês prematuros que promove o contato pele a pele.",
    "Prematuros têm maior risco de atrasos no desenvolvimento motor e podem se beneficiar de intervenção fisioterapêutica precoce.",
    "A fisioterapia respiratória é frequentemente necessária em prematuros com complicações pulmonares como a displasia broncopulmonar.",
  ],

  canguru: [
    "O Método Canguru é uma técnica de cuidado neonatal que envolve contato pele a pele entre o bebê e os pais.",
    "Benefícios do Método Canguru incluem: termorregulação, promoção do vínculo afetivo, estabilidade dos sinais vitais e estímulo ao aleitamento materno.",
    "É especialmente recomendado para bebês prematuros e de baixo peso ao nascer.",
    "O Método Canguru pode ser realizado por ambos os pais e contribui para o desenvolvimento neuropsicomotor do bebê.",
  ],

  hidroterapia: [
    "A hidroterapia para neonatos utiliza as propriedades da água para proporcionar relaxamento, redução do estresse e estimulação sensorial.",
    "É especialmente benéfica para bebês prematuros e com alterações neurológicas.",
    "A água aquecida promove relaxamento muscular e facilita movimentos que seriam difíceis fora dela.",
    "A hidroterapia pode auxiliar no desenvolvimento motor, na regulação do tônus muscular e na integração sensorial.",
  ],

  dor: [
    "A avaliação da dor neonatal é realizada através de escalas específicas como a NIPS (Neonatal Infant Pain Scale).",
    "Indicadores de dor em neonatos incluem: expressão facial, choro, padrão respiratório alterado e agitação.",
    "O manejo não-farmacológico da dor inclui: sucção não-nutritiva, contenção facilitada, método canguru e glicose oral.",
    "A dor não tratada em neonatos pode ter consequências a longo prazo no desenvolvimento neurológico.",
  ],

  avaliacao: [
    "A avaliação fisioterapêutica neonatal inclui observação dos reflexos primitivos, tônus muscular, padrões de movimento, postura e reações adaptativas.",
    "Escalas padronizadas como a AIMS (Alberta Infant Motor Scale) e a TIMP (Test of Infant Motor Performance) são utilizadas para avaliar o desenvolvimento motor.",
    "A avaliação precoce é fundamental para identificar alterações no desenvolvimento e iniciar intervenções oportunas.",
    "O acompanhamento longitudinal permite monitorar a evolução do desenvolvimento e ajustar as intervenções conforme necessário.",
  ],

  // Resposta genérica
  default:
    "Como assistente de fisioterapia neonatal, posso fornecer informações sobre desenvolvimento infantil, reflexos primitivos, técnicas de intervenção precoce e outros tópicos relacionados. Por favor, faça uma pergunta mais específica sobre fisioterapia neonatal e pediátrica.",
}

export function getFallbackResponse(query: string): string {
  // Converter a consulta para minúsculas para facilitar a comparação
  const queryLower = query.toLowerCase()

  // Verificar se a consulta contém palavras-chave específicas
  if (queryLower.includes("reflexo")) {
    return fallbackResponses.reflexos[Math.floor(Math.random() * fallbackResponses.reflexos.length)]
  }

  if (queryLower.includes("desenvolv")) {
    return fallbackResponses.desenvolvimento[Math.floor(Math.random() * fallbackResponses.desenvolvimento.length)]
  }

  if (queryLower.includes("prematuro") || queryLower.includes("prematuro")) {
    return fallbackResponses.prematuro[Math.floor(Math.random() * fallbackResponses.prematuro.length)]
  }

  if (queryLower.includes("canguru")) {
    return fallbackResponses.canguru[Math.floor(Math.random() * fallbackResponses.canguru.length)]
  }

  if (queryLower.includes("hidroterapia") || queryLower.includes("água")) {
    return fallbackResponses.hidroterapia[Math.floor(Math.random() * fallbackResponses.hidroterapia.length)]
  }

  if (queryLower.includes("dor")) {
    return fallbackResponses.dor[Math.floor(Math.random() * fallbackResponses.dor.length)]
  }

  if (queryLower.includes("avalia") || queryLower.includes("exame")) {
    return fallbackResponses.avaliacao[Math.floor(Math.random() * fallbackResponses.avaliacao.length)]
  }

  // Se nenhuma palavra-chave for encontrada, retornar resposta padrão
  return fallbackResponses.default
}
