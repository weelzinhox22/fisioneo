import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  // Função que roda em cada requisição para rotas protegidas
  function middleware(req) {
    return NextResponse.next()
  },
  {
    callbacks: {
      // Retorna true se o usuário estiver autorizado
      authorized: ({ token }) => !!token
    },
    pages: {
      signIn: '/login',
    },
  }
)

// Configuração de quais rotas devem ser protegidas
export const config = {
  matcher: [
    // Rotas que requerem autenticação
    "/provas/:path*",
    "/prova-geral",
    "/documentos/:path*",
    "/temas/:path*",  // Protege todas as subpáginas de temas
    "/temas",         // Protege a página principal de temas
  ]
} 