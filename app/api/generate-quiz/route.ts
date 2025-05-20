import { NextRequest, NextResponse } from 'next/server'
import GroqAPI from 'groq-sdk'
import crypto from 'crypto'

const groq = new GroqAPI()

// Extrair conteúdo relevante de um texto longo
function extractRelevantContent(text: string, maxLength: number = 10000): string {
  if (text.length <= maxLength) return text;
  
  // Dividir o texto em parágrafos
  const paragraphs = text.split(/\n\n+/);
  
  // Se tivermos poucos parágrafos ou parágrafos muito longos, dividimos por sentenças
  if (paragraphs.length < 10) {
    const sentences = text.split(/(?<=[.!?])\s+/);
    
    // Coletar algumas sentenças do início
    const startSentences = sentences.slice(0, Math.min(10, sentences.length / 4));
    
    // Coletar algumas sentenças do meio
    const middleStart = Math.floor(sentences.length / 2) - 5;
    const middleSentences = sentences.slice(
      Math.max(10, middleStart),
      Math.min(sentences.length, middleStart + 10)
    );
    
    // Coletar algumas sentenças do final
    const endSentences = sentences.slice(Math.max(0, sentences.length - 10));
    
    // Juntar tudo
    return [...startSentences, ...middleSentences, ...endSentences].join(' ');
  }
  
  // Coletar parágrafos do início
  const startParagraphs = paragraphs.slice(0, Math.min(5, paragraphs.length / 4));
  
  // Coletar parágrafos do meio
  const middleStart = Math.floor(paragraphs.length / 2) - 3;
  const middleParagraphs = paragraphs.slice(
    Math.max(5, middleStart),
    Math.min(paragraphs.length, middleStart + 6)
  );
  
  // Coletar parágrafos do final
  const endParagraphs = paragraphs.slice(Math.max(0, paragraphs.length - 5));
  
  // Juntar tudo
  const result = [...startParagraphs, ...middleParagraphs, ...endParagraphs].join('\n\n');
  
  // Se ainda estiver muito longo, cortar
  return result.length > maxLength ? result.slice(0, maxLength) : result;
}

// Geração de perguntas mock quando a API falha
function generateFallbackQuestions(text: string, title: string): any[] {
  // Extrair algumas palavras chave do texto para usar nas perguntas
  const keywords = text
    .split(/\s+/)
    .filter(word => word.length > 5)
    .filter((word, index, self) => self.indexOf(word) === index)
    .slice(0, 50)
  
  const questions = [
    {
      id: 1,
      question: `Qual é o assunto principal abordado no documento "${title}"?`,
      options: [
        "Fisioterapia neonatal",
        "Pediatria geral",
        "Neurologia adulta",
        "Cirurgia pediátrica"
      ],
      correctAnswer: 0
    },
    {
      id: 2,
      question: "Quais são os principais benefícios da fisioterapia em recém-nascidos?",
      options: [
        "Apenas prevenção de complicações respiratórias",
        "Somente ganho de peso acelerado",
        "Desenvolvimento neuromotor e prevenção de complicações",
        "Apenas melhoria na alimentação"
      ],
      correctAnswer: 2
    },
    {
      id: 3,
      question: "Qual é a importância da intervenção precoce em prematuros?",
      options: [
        "Não tem importância significativa",
        "Apenas para tranquilizar os pais",
        "Reduz problemas apenas na fase adulta",
        "Melhora o prognóstico de desenvolvimento"
      ],
      correctAnswer: 3
    }
  ]
  
  // Gerar mais 7 perguntas com base nas palavras-chave
  for (let i = 0; i < 7; i++) {
    if (keywords.length > i*4 + 4) {
      const randomKeyword1 = keywords[i*4]
      const randomKeyword2 = keywords[i*4 + 1]
      const randomKeyword3 = keywords[i*4 + 2]
      
      questions.push({
        id: i + 4,
        question: `Qual conceito está mais diretamente relacionado a "${randomKeyword1}" no contexto do documento?`,
        options: [
          `${randomKeyword2}`,
          "Um conceito não mencionado no documento",
          `${randomKeyword3}`,
          "Nenhuma das alternativas"
        ],
        correctAnswer: 0
      })
    }
  }
  
  return questions
}

// Armazenar perguntas anteriormente geradas para evitar repetição
const questionCache = new Map<string, Set<string>>();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { text, title } = body
    
    if (!text) {
      return NextResponse.json(
        { error: 'Texto do documento não fornecido' },
        { status: 400 }
      )
    }
    
    // Criar um identificador único para este documento
    const docId = crypto.createHash('md5').update(title + text.slice(0, 200)).digest('hex');
    
    // Pegar ou criar o conjunto de perguntas para este documento
    if (!questionCache.has(docId)) {
      questionCache.set(docId, new Set());
    }
    
    const existingQuestions = questionCache.get(docId)!;
    
    // Extrair conteúdo relevante do texto
    const relevantText = extractRelevantContent(text, 6000)
    
    try {
      // Crie o prompt com as perguntas existentes listadas
      let previousQuestionsText = '';
      
      if (existingQuestions.size > 0) {
        previousQuestionsText = `IMPORTANTE: Evite gerar perguntas semelhantes a estas que já foram criadas anteriormente:
        
        ${Array.from(existingQuestions).join('\n')}
        
        As novas perguntas devem ser COMPLETAMENTE DIFERENTES das listadas acima.`;
      }
      
      // Primeiro, vamos solicitar as perguntas em formato de texto simples
      const prompt = `
      Por favor, crie 10 perguntas de múltipla escolha totalmente novas sobre o seguinte texto médico:
      
      ${relevantText}
      
      ${previousQuestionsText}
      
      REGRAS IMPORTANTES:
      1. Cada pergunta deve ser clara, específica e diretamente relacionada ao conteúdo
      2. Para cada pergunta, forneça 4 opções de resposta onde apenas uma está correta
      3. Evite questões genéricas ou superficiais
      4. NÃO inclua introduções como "Aqui estão 10 perguntas" no início
      5. Comece cada pergunta imediatamente com "PERGUNTA:" (sem numeração)
      
      Use EXATAMENTE este formato para cada pergunta:
      
      PERGUNTA: [texto da pergunta]
      A) [opção A]
      B) [opção B]
      C) [opção C]
      D) [opção D]
      RESPOSTA: [letra da resposta correta: A, B, C ou D]
      
      `
      
      // Chamar a API para gerar as perguntas
      const completion = await groq.chat.completions.create({
        messages: [
          { role: 'user', content: prompt }
        ],
        model: 'llama3-8b-8192',
        temperature: 0.8,
        max_tokens: 4096,
        top_p: 0.9
      })
      
      const response = completion.choices[0].message.content || ''
      
      // Processar o texto para extrair perguntas e respostas
      const questions: any[] = []
      // Usar regex para extrair cada bloco que começa com "PERGUNTA:"
      const matches = response.match(/PERGUNTA:[\s\S]+?(?=PERGUNTA:|$)/g) || [];
      
      // Para cada bloco extraído, processar a pergunta
      matches.forEach((block, index) => {
        try {
          // Extrair a pergunta (primeira linha após "PERGUNTA:")
          const questionMatch = block.match(/PERGUNTA:\s*([^\n]+)/);
          if (!questionMatch) return;
          
          const question = questionMatch[1].trim();
          
          // Adicionar à cache para evitar duplicação futura
          existingQuestions.add(question);
          
          // Extrair as opções
          const optionA = block.match(/A\)\s*([^\n]+)/)?.[1]?.trim() || "Opção A";
          const optionB = block.match(/B\)\s*([^\n]+)/)?.[1]?.trim() || "Opção B";
          const optionC = block.match(/C\)\s*([^\n]+)/)?.[1]?.trim() || "Opção C";
          const optionD = block.match(/D\)\s*([^\n]+)/)?.[1]?.trim() || "Opção D";
          
          // Extrair a resposta correta
          const answerMatch = block.match(/RESPOSTA:\s*([A-D])/i);
          let correctAnswer = 0;
          
          if (answerMatch) {
            const letter = answerMatch[1].toUpperCase();
            correctAnswer = letter === 'A' ? 0 : letter === 'B' ? 1 : letter === 'C' ? 2 : 3;
          }
          
          // Adicionar à lista de perguntas
          questions.push({
            id: index + 1,
            question,
            options: [optionA, optionB, optionC, optionD],
            correctAnswer
          });
        } catch (parseError) {
          console.error('Erro ao parsear bloco de pergunta:', parseError);
        }
      });
      
      // Limitar o cache para não crescer demais (máximo de 100 perguntas por documento)
      if (existingQuestions.size > 100) {
        // Converter para array, remover os mais antigos e converter de volta para Set
        const questionsArray = Array.from(existingQuestions);
        const newQuestions = new Set(questionsArray.slice(-100));
        questionCache.set(docId, newQuestions);
      }
      
      // Se conseguimos extrair pelo menos 3 perguntas, use-as
      if (questions.length >= 3) {
        return NextResponse.json({ questions })
      }
      
      // Caso contrário, gere perguntas de fallback
      const fallbackQuestions = generateFallbackQuestions(text, title)
      return NextResponse.json({ questions: fallbackQuestions })
      
    } catch (error) {
      console.error('Erro ao gerar perguntas:', error)
      
      // Gerar perguntas fallback em caso de erro
      const fallbackQuestions = generateFallbackQuestions(text, title)
      return NextResponse.json({ questions: fallbackQuestions })
    }
  } catch (error) {
    console.error('Erro na API de geração de quiz:', error)
    return NextResponse.json(
      { error: 'Erro ao processar a solicitação' },
      { status: 500 }
    )
  }
} 