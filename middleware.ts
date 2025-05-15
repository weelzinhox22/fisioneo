import { withAuth } from "next-auth/middleware"

// Protege todas as rotas que começam com /provas
export default withAuth({
  pages: {
    signIn: '/login',
  },
})

export const config = {
  matcher: [
    "/provas/:path*",
    "/prova-geral",
    "/documentos/:path*"
  ]
} 