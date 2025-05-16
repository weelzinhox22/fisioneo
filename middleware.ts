import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { getToken } from 'next-auth/jwt'

// Rotas que requerem autenticação
const protectedRoutes = ['/provas', '/prova-geral', '/documentos', '/temas']

export async function middleware(req: NextRequest) {
  // Criar resposta inicial
  const res = NextResponse.next()
  
  // Verificar se é uma rota protegida
  const isProtectedRoute = protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route))
  
  if (isProtectedRoute) {
    // Verificar token do NextAuth (Google)
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
    if (token) {
      // Se tem token do Google, permitir acesso
      return res
    }
  }

  // Criar cliente Supabase com os cookies
  const supabase = createMiddlewareClient({ req, res })

  // Atualizar cookies de autenticação se necessário
  await supabase.auth.getSession()

  // Sempre retornar a resposta com cookies atualizados
  return res
}

// Configurar em quais rotas o middleware deve ser executado
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|images|public).*)'
  ]
} 