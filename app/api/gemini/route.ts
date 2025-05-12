import { NextRequest, NextResponse } from "next/server";

const GEMINI_API_KEY = "AIzaSyC3sePdHsHorioq0jhvYuGE4SJBOvdjA3o";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt não fornecido" },
        { status: 400 }
      );
    }

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
                text: prompt,
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
    console.error("Erro na API do Gemini:", error);
    return NextResponse.json(
      {
        error: "Erro ao processar a solicitação",
        details: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 }
    );
  }
} 