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
    const token = await getToken({ req })
    if (token) {
      return res
    }

    // Se não tem token do Google, verificar Supabase
    const supabase = createMiddlewareClient({ req, res })
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      // Se não está autenticado em nenhum dos dois, redirecionar para login
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }

  // Criar cliente Supabase e atualizar cookies
  const supabase = createMiddlewareClient({ req, res })
  await supabase.auth.getSession()

  return res
}

// Configurar em quais rotas o middleware deve ser executado
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|images|public).*)'
  ]
} 