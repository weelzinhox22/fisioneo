"use client"

import { useState, useRef, useEffect } from "react"
import { Loader2, FileUp, Download, Search, BookOpen, MessageSquare, X, AlertTriangle, FileText, FileType, RefreshCw, Eye } from "lucide-react"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import PDFExtractor from './pdf-extractor'
import PDFViewer from './pdf-viewer'
import QuizGenerator from './quiz-generator'

type DocumentAnalysisProps = {
  text: string
  info: {
    title: string
    type: string
  }
}

type ViewMode = "text" | "original"

export default function DocumentViewer() {
  const [file, setFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isExtracting, setIsExtracting] = useState(false)
  const [documentData, setDocumentData] = useState<DocumentAnalysisProps | null>(null)
  const [analysisResult, setAnalysisResult] = useState<string>("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [action, setAction] = useState<"resumir" | "explicar" | "perguntar" | null>(null)
  const [question, setQuestion] = useState("")
  const [savedDocuments, setSavedDocuments] = useState<string[]>([])
  const [extractionError, setExtractionError] = useState<string | null>(null)
  const [usingOcr, setUsingOcr] = useState(false)
  const [viewMode, setViewMode] = useState<ViewMode>("text")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const textAreaRef = useRef<HTMLDivElement>(null)
  const analysisAreaRef = useRef<HTMLDivElement>(null)

  // Carregar documentos salvos do localStorage quando o componente for montado
  useEffect(() => {
    const loadSavedDocuments = () => {
      try {
        const savedDocumentsList = localStorage.getItem('savedDocuments')
        if (savedDocumentsList) {
          setSavedDocuments(JSON.parse(savedDocumentsList))
        }
      } catch (error) {
        console.error('Erro ao carregar documentos salvos:', error)
      }
    }

    loadSavedDocuments()
  }, [])

  // Handler para garantir que o scroll funcione
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const scrollAmount = e.deltaY;
    const newScrollTop = target.scrollTop + scrollAmount;
    
    // Verifica se o scroll chegou ao limite superior ou inferior
    if (newScrollTop >= 0 && 
        newScrollTop <= (target.scrollHeight - target.clientHeight)) {
      e.stopPropagation();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    setFile(selectedFile)
    setIsLoading(true)
    setAnalysisResult("")
    setExtractionError(null)
    setUsingOcr(false)
    setViewMode("text")

    try {
      const fileType = selectedFile.type
      
      // Se for um arquivo PDF
      if (fileType === 'application/pdf' || selectedFile.name.endsWith('.pdf')) {
        setIsExtracting(true)
        // O texto será extraído pelo componente PDFExtractor
        return
      }
      
      // Para arquivos de texto, usar FileReader
      const reader = new FileReader()
      
      reader.onload = (event) => {
        try {
          const text = event.target?.result as string || ""
          
          // Criar objeto com os dados do documento
          const docInfo = {
            text: text,
            info: {
              title: selectedFile.name,
              type: fileType || 'text/plain'
            }
          }
          
          // Salvar no localStorage
          localStorage.setItem(`doc_${selectedFile.name}`, JSON.stringify(docInfo))
          
          // Atualizar a lista de documentos salvos
          const updatedDocs = savedDocuments.includes(selectedFile.name) 
            ? savedDocuments 
            : [...savedDocuments, selectedFile.name]
          setSavedDocuments(updatedDocs)
          localStorage.setItem('savedDocuments', JSON.stringify(updatedDocs))
          
          setDocumentData(docInfo)
        } catch (error) {
          console.error("Erro ao processar o documento:", error)
          setExtractionError("Erro ao processar o documento. Por favor, tente novamente.")
        } finally {
          setIsLoading(false)
        }
      }
      
      reader.onerror = () => {
        console.error("Erro ao ler o arquivo")
        setExtractionError("Erro ao ler o arquivo. Por favor, tente novamente.")
        setIsLoading(false)
      }
      
      reader.readAsText(selectedFile)
      
    } catch (error) {
      console.error("Erro ao processar o documento:", error)
      setExtractionError("Erro ao processar o documento. Por favor, tente novamente.")
      setIsLoading(false)
    }
  }

  const handlePdfTextExtracted = (text: string) => {
    if (!file) return
    
    try {
      // Criar objeto com os dados do documento
      const docInfo = {
        text: text,
        info: {
          title: file.name,
          type: 'application/pdf'
        }
      }
      
      // Salvar no localStorage
      localStorage.setItem(`doc_${file.name}`, JSON.stringify(docInfo))
      
      // Atualizar a lista de documentos salvos
      const updatedDocs = savedDocuments.includes(file.name) 
        ? savedDocuments 
        : [...savedDocuments, file.name]
      setSavedDocuments(updatedDocs)
      localStorage.setItem('savedDocuments', JSON.stringify(updatedDocs))
      
      setDocumentData(docInfo)
    } catch (error) {
      console.error("Erro ao processar o PDF:", error)
      setExtractionError("Erro ao processar o PDF. Por favor, tente novamente.")
    } finally {
      setIsLoading(false)
      setIsExtracting(false)
    }
  }

  const handlePdfExtractionError = async (errorMessage: string) => {
    if (!file) {
      setExtractionError(errorMessage)
      setIsLoading(false)
      setIsExtracting(false)
      return
    }
    
    // Se a extração normal falhar, tentar usar OCR com Gemini Vision
    try {
      setUsingOcr(true)
      setExtractionError(null)
      
      // Criar FormData para enviar o arquivo
      const formData = new FormData()
      formData.append('pdf', file)
      
      // Enviar para a API de OCR
      const response = await fetch('/api/pdf-ocr', {
        method: 'POST',
        body: formData,
      })
      
      if (!response.ok) {
        throw new Error(`Erro na API de OCR: ${response.status}`)
      }
      
      const data = await response.json()
      
      if (data.error) {
        throw new Error(data.error)
      }
      
      // Criar objeto com os dados do documento
      const docInfo = {
        text: data.text,
        info: {
          title: file.name,
          type: 'application/pdf'
        }
      }
      
      // Salvar no localStorage
      localStorage.setItem(`doc_${file.name}`, JSON.stringify(docInfo))
      
      // Atualizar a lista de documentos salvos
      const updatedDocs = savedDocuments.includes(file.name) 
        ? savedDocuments 
        : [...savedDocuments, file.name]
      setSavedDocuments(updatedDocs)
      localStorage.setItem('savedDocuments', JSON.stringify(updatedDocs))
      
      setDocumentData(docInfo)
    } catch (error) {
      console.error("Erro ao processar o PDF com OCR:", error)
      setExtractionError(`Não foi possível extrair o texto do PDF. ${error instanceof Error ? error.message : 'Tente com outro arquivo.'}`)
    } finally {
      setIsLoading(false)
      setIsExtracting(false)
      setUsingOcr(false)
    }
  }

  const handleAnalyzeAction = async (actionType: "resumir" | "explicar" | "perguntar") => {
    if (!documentData) return

    setAction(actionType)
    setIsAnalyzing(true)
    setAnalysisResult("")

    try {
      const response = await fetch("/api/pdf-analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: documentData.text,
          action: actionType,
          question: actionType === "perguntar" ? question : undefined,
        }),
      })

      if (!response.ok) {
        throw new Error(`Erro: ${response.status}`)
      }

      const data = await response.json()
      setAnalysisResult(data.response.content)
    } catch (error) {
      console.error("Erro ao analisar o documento:", error)
      setAnalysisResult("Ocorreu um erro ao analisar o documento. Por favor, tente novamente.")
    } finally {
      setIsAnalyzing(false)
    }
  }

  const loadSavedDocument = (docName: string) => {
    try {
      const savedDoc = localStorage.getItem(`doc_${docName}`)
      if (savedDoc) {
        const parsedDoc = JSON.parse(savedDoc) as DocumentAnalysisProps
        setDocumentData(parsedDoc)
        
        // Tentar recriar o objeto File se for um PDF
        if (parsedDoc.info.type === 'application/pdf') {
          // Como não podemos recriar o conteúdo binário, apenas criamos um placeholder
          // O usuário precisará fazer upload novamente para ver o PDF original
          setFile(new File([], docName, { type: 'application/pdf' }))
        } else {
          setFile(new File([parsedDoc.text], docName, { type: parsedDoc.info.type }))
        }
        
        setAnalysisResult("")
        setAction(null)
        setExtractionError(null)
        setViewMode("text")
      }
    } catch (error) {
      console.error('Erro ao carregar documento salvo:', error)
      setExtractionError('Erro ao carregar o documento salvo. Por favor, tente novamente.')
    }
  }

  const resetFile = () => {
    setFile(null)
    setDocumentData(null)
    setAnalysisResult("")
    setAction(null)
    setQuestion("")
    setExtractionError(null)
    setViewMode("text")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const deleteSavedDocument = (docName: string, e: React.MouseEvent) => {
    e.stopPropagation() // Impedir que o documento seja carregado ao clicar no botão de exclusão
    
    try {
      // Remover do localStorage
      localStorage.removeItem(`doc_${docName}`)
      
      // Atualizar a lista de documentos salvos
      const updatedDocs = savedDocuments.filter(name => name !== docName)
      setSavedDocuments(updatedDocs)
      localStorage.setItem('savedDocuments', JSON.stringify(updatedDocs))
      
      // Se o documento atual for o que está sendo excluído, resetar
      if (documentData?.info.title === docName) {
        resetFile()
      }
    } catch (error) {
      console.error('Erro ao excluir documento salvo:', error)
      setExtractionError('Erro ao excluir o documento salvo. Por favor, tente novamente.')
    }
  }

  const toggleViewMode = () => {
    setViewMode(viewMode === "text" ? "original" : "text")
  }

  const getFileIcon = (fileName: string) => {
    if (fileName.endsWith('.pdf')) {
      return <FileType className="h-5 w-5 text-red-500 mr-2" />
    }
    return <FileText className="h-5 w-5 text-[#6EC1E4] mr-2" />
  }

  const isPdf = file?.type === 'application/pdf' || file?.name.endsWith('.pdf')

  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-xl shadow-lg border border-gray-100 relative z-20" style={{ pointerEvents: "auto" }}>
      {/* Mensagem de erro */}
      {extractionError && (
        <div className="m-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-red-800 font-medium">Erro</p>
            <p className="text-red-700 text-sm">{extractionError}</p>
          </div>
        </div>
      )}
      
      {/* Lista de documentos salvos */}
      {savedDocuments.length > 0 && !file && (
        <div className="m-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-[#6EC1E4]" />
            Documentos Recentes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {savedDocuments.map((docName) => (
              <div 
                key={docName}
                onClick={() => loadSavedDocument(docName)}
                className="bg-white border border-gray-100 rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-all flex justify-between items-center hover:shadow-md relative"
              >
                <div className="flex items-center">
                  {getFileIcon(docName)}
                  <span className="truncate max-w-[150px] text-sm">{docName}</span>
                </div>
                <button 
                  onClick={(e) => deleteSavedDocument(docName, e)}
                  className="p-1 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-100 z-20"
                  aria-label="Excluir documento"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {!file ? (
        <div 
          className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-lg mx-6 my-8 p-12 cursor-pointer hover:bg-gray-50 transition-all relative"
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="w-20 h-20 rounded-full bg-[#F0F9FF] flex items-center justify-center mb-6">
            <FileUp className="h-10 w-10 text-[#6EC1E4]" />
          </div>
          <p className="text-xl font-medium mb-3 text-[#333333]">Faça upload do seu documento</p>
          <p className="text-sm text-gray-500 mb-6 max-w-md text-center">
            Carregue artigos científicos, protocolos clínicos ou outros textos relacionados à fisioterapia neonatal para análise
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.txt,application/pdf,text/plain"
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="flex flex-col items-center">
            <button className="px-6 py-3 bg-gradient-to-r from-[#6EC1E4] to-[#5BA8CB] text-white rounded-lg hover:shadow-md transition-all font-medium relative z-10">
            Selecionar arquivo
          </button>
            <p className="text-xs text-gray-400 mt-3">Formatos suportados: PDF (.pdf) e texto (.txt)</p>
          </div>
        </div>
      ) : isLoading ? (
        isExtracting && file ? (
          usingOcr ? (
            <div className="flex flex-col items-center justify-center p-12">
              <div className="w-20 h-20 rounded-full bg-[#F0F9FF] flex items-center justify-center mb-6">
                <Loader2 className="h-10 w-10 text-[#6EC1E4] animate-spin" />
              </div>
              <p className="text-xl font-medium mb-3 text-[#333333]">Processando PDF com IA avançada</p>
              <p className="text-sm text-gray-500 max-w-md text-center">
                Este processo utiliza reconhecimento avançado de texto e pode levar alguns minutos para PDFs complexos
              </p>
            </div>
          ) : (
            <PDFExtractor 
              file={file} 
              onTextExtracted={handlePdfTextExtracted}
              onError={handlePdfExtractionError}
            />
          )
        ) : (
          <div className="flex flex-col items-center justify-center p-12">
            <div className="w-20 h-20 rounded-full bg-[#F0F9FF] flex items-center justify-center mb-6">
              <Loader2 className="h-10 w-10 text-[#6EC1E4] animate-spin" />
            </div>
            <p className="text-xl font-medium text-[#333333]">Processando o documento...</p>
          </div>
        )
      ) : (
        <div className={`p-6 ${isPdf && viewMode === "original" ? "flex flex-col" : "flex flex-col lg:flex-row"} gap-6 relative`}>
          {/* Painel do documento */}
          <div className={`${isPdf && viewMode === "original" ? "w-full" : "flex-1"} border border-gray-100 rounded-lg p-4 bg-white shadow-sm relative`} style={{ pointerEvents: "auto" }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold flex items-center text-[#333333]">
                {documentData?.info.type === 'application/pdf' 
                  ? <FileType className="h-5 w-5 mr-2 text-red-500" />
                  : <FileText className="h-5 w-5 mr-2 text-[#6EC1E4]" />
                }
                <span className="truncate max-w-[200px]">{documentData?.info.title || "Documento"}</span>
              </h2>
              <div className="flex gap-2">
                {isPdf && (
                  <button
                    onClick={toggleViewMode}
                    className="p-2 text-[#6EC1E4] hover:text-[#5BA8CB] rounded-lg hover:bg-[#F0F9FF] flex items-center gap-1 transition-colors relative z-10"
                    title={viewMode === "text" ? "Ver PDF original" : "Ver texto extraído"}
                  >
                    {viewMode === "text" ? (
                      <>
                        <Eye className="h-5 w-5" />
                        <span className="text-sm hidden sm:inline">Ver original</span>
                      </>
                    ) : (
                      <>
                        <FileText className="h-5 w-5" />
                        <span className="text-sm hidden sm:inline">Ver texto</span>
                      </>
                    )}
                  </button>
                )}
                <button
                  onClick={resetFile}
                  className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-gray-50 transition-colors relative z-10"
                  aria-label="Fechar documento"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {isPdf && viewMode === "original" ? (
              <PDFViewer 
                file={file} 
                onError={(error) => setExtractionError(error)} 
              />
            ) : (
            <div 
              ref={textAreaRef}
              className="mt-4 border border-gray-100 rounded-lg p-4 max-h-[500px] overflow-y-auto bg-[#F9FAFC] relative" 
              style={{ 
                zIndex: 20, 
                pointerEvents: "auto", 
                touchAction: "auto", 
                scrollBehavior: "smooth",
                overflowY: "scroll" 
              }}
              onWheel={handleWheel}
            >
              <pre className="whitespace-pre-wrap font-sans text-sm text-[#333333]">
                {documentData?.text || "Nenhum texto extraído"}
              </pre>
            </div>
            )}
          </div>

          {/* Painel de análise */}
          {(!isPdf || viewMode !== "original") && (
          <div className="flex-1 border border-gray-100 rounded-lg p-4 bg-white shadow-sm relative" style={{ pointerEvents: "auto" }}>
            <h2 className="text-xl font-semibold mb-6 flex items-center text-[#333333]">
              <Search className="h-5 w-5 mr-2 text-[#B9A9FF]" />
              Análise Inteligente
            </h2>

            <div className="flex flex-wrap gap-2 mb-6">
              <button
                onClick={() => handleAnalyzeAction("resumir")}
                disabled={isAnalyzing}
                className={`px-4 py-2 rounded-lg transition-all flex items-center relative z-10 ${
                  action === "resumir"
                    ? "bg-gradient-to-r from-[#6EC1E4] to-[#5BA8CB] text-white shadow-sm"
                    : "bg-[#F0F9FF] hover:bg-[#E1F5FE] text-[#6EC1E4]"
                } ${isAnalyzing ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <RefreshCw className={`h-4 w-4 mr-1.5 ${isAnalyzing && action === "resumir" ? "animate-spin" : ""}`} />
                Resumir
              </button>
              <button
                onClick={() => handleAnalyzeAction("explicar")}
                disabled={isAnalyzing}
                className={`px-4 py-2 rounded-lg transition-all flex items-center relative z-10 ${
                  action === "explicar"
                    ? "bg-gradient-to-r from-[#B9A9FF] to-[#A090E0] text-white shadow-sm"
                    : "bg-[#F8F5FF] hover:bg-[#F0EBFF] text-[#B9A9FF]"
                } ${isAnalyzing ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <BookOpen className={`h-4 w-4 mr-1.5 ${isAnalyzing && action === "explicar" ? "animate-spin" : ""}`} />
                Explicar conceitos
              </button>
              <button
                onClick={() => setAction(action === "perguntar" ? null : "perguntar")}
                disabled={isAnalyzing}
                className={`px-4 py-2 rounded-lg transition-all flex items-center relative z-10 ${
                  action === "perguntar"
                    ? "bg-gradient-to-r from-[#A8E6CF] to-[#8CD3B2] text-white shadow-sm"
                    : "bg-[#F0F9F5] hover:bg-[#E1F5ED] text-[#A8E6CF]"
                } ${isAnalyzing ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <MessageSquare className={`h-4 w-4 mr-1.5 ${isAnalyzing && action === "perguntar" ? "animate-spin" : ""}`} />
                Fazer pergunta
              </button>
            </div>

            {action === "perguntar" && (
              <div className="mb-6 relative z-10">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Digite sua pergunta sobre o documento..."
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6EC1E4] focus:border-transparent text-sm"
                  />
                  <button
                    onClick={() => handleAnalyzeAction("perguntar")}
                    disabled={isAnalyzing || !question.trim()}
                    className="px-4 py-2 bg-gradient-to-r from-[#6EC1E4] to-[#5BA8CB] text-white rounded-lg hover:shadow-md transition-all disabled:opacity-50 disabled:shadow-none flex items-center relative z-10"
                  >
                    {isAnalyzing ? <Loader2 className="h-5 w-5 animate-spin" /> : <MessageSquare className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            )}

            {isAnalyzing ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="h-8 w-8 text-[#6EC1E4] animate-spin mb-4" />
                <p className="text-md font-medium text-[#666666]">Analisando o documento...</p>
                <p className="text-xs text-gray-400 mt-2">Isso pode levar alguns segundos</p>
              </div>
            ) : analysisResult ? (
              <div 
                ref={analysisAreaRef}
                className="border border-gray-100 rounded-lg p-6 bg-white shadow-sm max-h-[500px] overflow-y-auto relative" 
                style={{ 
                  zIndex: 20, 
                  pointerEvents: "auto", 
                  touchAction: "auto", 
                  scrollBehavior: "smooth",
                  overflowY: "scroll" 
                }}
                onWheel={handleWheel}
              >
                <div className="prose prose-sm max-w-none">
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]} 
                    rehypePlugins={[rehypeRaw, rehypeSanitize]}
                  >
                    {analysisResult}
                  </ReactMarkdown>
                </div>
              </div>
            ) : (
              <div className="border border-gray-100 rounded-lg p-8 bg-[#F9FAFC] flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-[#F0F9FF] flex items-center justify-center mb-4">
                  <Search className="h-8 w-8 text-[#6EC1E4]" />
                </div>
                <p className="text-[#666666] max-w-md">
                  Selecione uma ação acima para analisar o documento com inteligência artificial
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  A IA irá processar o texto e gerar insights personalizados
                </p>
              </div>
            )}
              
              {/* Quiz Generator */}
              {documentData && (
                <div className="mt-8 border-t border-gray-100 pt-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center text-[#333333]">
                    <BookOpen className="h-5 w-5 mr-2 text-[#B9A9FF]" />
                    Quiz de Aprendizado
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Teste seu conhecimento com perguntas geradas automaticamente por IA sobre este documento
                  </p>
                  
                  <QuizGenerator 
                    documentText={documentData.text}
                    documentTitle={documentData.info.title}
                  />
                </div>
              )}
          </div>
          )}
        </div>
      )}
    </div>
  )
} 