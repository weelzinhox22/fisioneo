import { NextRequest, NextResponse } from "next/server";

const GEMINI_API_KEY = "AIzaSyC3sePdHsHorioq0jhvYuGE4SJBOvdjA3o";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export async function POST(req: NextRequest) {
  try {
    const { text, action, question } = await req.json();

    if (!text) {
      return NextResponse.json(
        { error: "Nenhum texto fornecido" },
        { status: 400 }
      );
    }

    // Limitar o texto para evitar exceder o limite de tokens
    // Gemini 2.0 Flash suporta até 32k tokens, mas vamos limitar para garantir
    const limitedText = text.length > 25000 ? text.substring(0, 25000) + "..." : text;

    let prompt = "";
    
    switch (action) {
      case "resumir":
        prompt = `Por favor, faça um resumo detalhado do seguinte texto de um documento sobre fisioterapia neonatal ou pediátrica. Destaque os pontos principais, conceitos-chave e conclusões importantes:\n\n${limitedText}`;
        break;
      case "explicar":
        prompt = `Por favor, explique de forma clara e didática os conceitos principais presentes neste texto de um documento sobre fisioterapia neonatal ou pediátrica:\n\n${limitedText}`;
        break;
      case "perguntar":
        if (!question) {
          return NextResponse.json(
            { error: "Pergunta não fornecida" },
            { status: 400 }
          );
        }
        prompt = `Com base no seguinte texto de um documento sobre fisioterapia neonatal ou pediátrica, responda à pergunta: "${question}"\n\nTexto do documento:\n${limitedText}`;
        break;
      default:
        prompt = `Analise o seguinte texto de um documento sobre fisioterapia neonatal ou pediátrica e forneça insights relevantes:\n\n${limitedText}`;
    }

    // Adicionar instruções de sistema para o Gemini
    const systemPrompt = "Você é um assistente especializado em fisioterapia neonatal e pediátrica. Forneça informações precisas, úteis e em português brasileiro. Seja amigável e profissional. Organize sua resposta em seções com títulos quando apropriado para facilitar a leitura.";
    
    const fullPrompt = `${systemPrompt}\n\n${prompt}`;

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
                  text: fullPrompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.2,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 8192,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
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
      console.error("Erro na API do Gemini:", error);
      
      return NextResponse.json(
        {
          error: "Erro ao analisar o documento",
          details: error instanceof Error ? error.message : "Erro desconhecido",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Erro no processamento da requisição:", error);
    return NextResponse.json(
      {
        error: "Ocorreu um erro ao processar sua solicitação",
        details: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 }
    );
  }
} 