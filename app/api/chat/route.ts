import { type NextRequest, NextResponse } from "next/server"

const GEMINI_API_KEY = "AIzaSyC3sePdHsHorioq0jhvYuGE4SJBOvdjA3o";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    // Construir o prompt para o Gemini
    // Gemini não suporta o formato de chat como o OpenAI, então precisamos formatar manualmente
    const systemPrompt = `Você é um assistente especializado em fisioterapia neonatal e pediátrica. Forneça informações precisas, úteis e em português brasileiro. Seja amigável e profissional.

Você possui conhecimento especializado sobre os seguintes tópicos:

1. Reflexos primitivos em bebês de 0 a 6 meses (ATNP, Moro, Preensão Palmar e Plantar, Galant, etc.)
2. Reflexos em bebês de 7 a 15 meses (Landau, Paraquedas, etc.)
3. Reações posturais e de equilíbrio de 0 a 15 meses
4. Escalas de avaliação neonatal (AIMS, Bayley, TIMP, etc.)
5. Avaliação e manejo da dor neonatal
6. Método Canguru e seus benefícios
7. Hidroterapia em neonatos e bebês prematuros
8. Sequelas neurológicas em prematuros (Leucomalácia, Hemorragia Intraventricular, etc.)
9. Sequelas pulmonares em prematuros (Displasia Broncopulmonar, etc.)
10. Desenvolvimento motor típico e atípico
11. Intervenção precoce em bebês de risco
12. Técnicas de fisioterapia respiratória neonatal
13. Posicionamento terapêutico em UTI Neonatal
14. Estimulação sensorial e motora em bebês

Limite suas respostas a tópicos relacionados à fisioterapia neonatal, desenvolvimento infantil, e temas médicos relacionados. Se perguntado sobre outros assuntos, gentilmente redirecione para temas de fisioterapia neonatal.`;

    // Formatar a conversa como um único texto
    let conversationText = systemPrompt + "\n\n";
    
    // Adicionar mensagens anteriores
    for (const message of messages) {
      if (message.role === "user") {
        conversationText += `Pergunta do usuário: ${message.content}\n\n`;
      } else if (message.role === "assistant") {
        conversationText += `Sua resposta anterior: ${message.content}\n\n`;
      }
    }
    
    // Adicionar instrução final
    conversationText += "Por favor, responda à pergunta mais recente do usuário de forma detalhada e precisa.";

    try {
      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: conversationText,
                },
              ],
            },
          ],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Erro na API do Gemini: ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      
      // Extrair o texto da resposta do Gemini
      const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Não foi possível gerar uma resposta.";

      return NextResponse.json({
        response: {
          role: "assistant",
          content: responseText,
        },
      });
    } catch (error) {
      console.error("Erro na API do Gemini:", error)
      
      // Resposta de fallback
      return NextResponse.json({
        response: {
          role: "assistant",
          content: "Estou com dificuldades para processar sua solicitação no momento. Como posso ajudar com fisioterapia neonatal?",
        },
      })
    }
  } catch (error) {
    console.error("Erro no processamento da requisição:", error)
    return NextResponse.json(
      {
        error: "Ocorreu um erro ao processar sua solicitação",
        details: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 },
    )
  }
}
