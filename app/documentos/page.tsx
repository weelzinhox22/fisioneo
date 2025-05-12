import DocumentViewer from "@/components/document-viewer"

export const metadata = {
  title: "Análise de Documentos - Fisioterapia Neonatal",
  description: "Analise documentos de fisioterapia neonatal com inteligência artificial",
}

export default function DocumentosPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-[#333333] mb-8">
        Análise de Documentos
      </h1>
      <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        Faça upload de documentos de texto relacionados à fisioterapia neonatal e pediátrica para análise com inteligência artificial. 
        Obtenha resumos, explicações e respostas para suas perguntas sobre o conteúdo.
      </p>
      
      <DocumentViewer />
    </div>
  )
} 