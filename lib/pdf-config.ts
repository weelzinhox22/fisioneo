// Este arquivo contém a configuração para o PDF.js
// Será importado dinamicamente apenas no lado do cliente

let pdfjs: any = null;

export async function getPdfJs() {
  if (pdfjs) return pdfjs;
  
  // Importar o PDF.js dinamicamente
  try {
    pdfjs = await import('pdfjs-dist');
    
    // Configurar o worker
    const workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
    pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;
    
    return pdfjs;
  } catch (error) {
    console.error("Erro ao carregar a biblioteca PDF.js:", error);
    throw new Error("Não foi possível carregar a biblioteca de processamento de PDF.");
  }
} 