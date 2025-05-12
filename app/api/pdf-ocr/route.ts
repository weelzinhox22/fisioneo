import { NextRequest, NextResponse } from "next/server";

const GEMINI_API_KEY = "AIzaSyC3sePdHsHorioq0jhvYuGE4SJBOvdjA3o";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

export async function POST(req: NextRequest) {
  try {
    // Verificar se a requisição é multipart/form-data
    if (!req.headers.get("content-type")?.includes("multipart/form-data")) {
      return NextResponse.json(
        { error: "Requisição deve ser multipart/form-data" },
        { status: 400 }
      );
    }

    const formData = await req.formData();
    const pdfFile = formData.get("pdf") as File | null;

    if (!pdfFile) {
      return NextResponse.json(
        { error: "Nenhum arquivo PDF fornecido" },
        { status: 400 }
      );
    }

    // Verificar se é um PDF
    if (pdfFile.type !== "application/pdf" && !pdfFile.name.endsWith(".pdf")) {
      return NextResponse.json(
        { error: "O arquivo deve ser um PDF" },
        { status: 400 }
      );
    }

    // Converter o arquivo para base64
    const arrayBuffer = await pdfFile.arrayBuffer();
    const base64Data = Buffer.from(arrayBuffer).toString("base64");

    // Preparar o prompt para o Gemini
    const prompt = `Este é um PDF de um artigo científico sobre fisioterapia neonatal. 
    Por favor, extraia o texto principal do documento, incluindo título, autores, resumo, 
    introdução, metodologia, resultados, discussão e conclusão. 
    Ignore cabeçalhos, rodapés, números de página e referências bibliográficas.`;

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
                  text: prompt,
                },
                {
                  inline_data: {
                    mime_type: "application/pdf",
                    data: base64Data,
                  },
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.1,
            topK: 32,
            topP: 0.95,
            maxOutputTokens: 8192,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Erro na API do Gemini: ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();

      // Extrair o texto da resposta do Gemini
      const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Não foi possível extrair o texto do PDF.";

      return NextResponse.json({
        text: responseText,
      });
    } catch (error) {
      console.error("Erro na API do Gemini:", error);

      return NextResponse.json(
        {
          error: "Erro ao processar o PDF",
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