import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

// Rotas que requerem autenticação
const protectedRoutes = ['/provas', '/prova-geral', '/documentos']

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  // Criar cliente Supabase com os cookies
  const supabase = createMiddlewareClient({ req, res })

  // Verificar sessão do Supabase
  const { data: { session: supabaseSession } } = await supabase.auth.getSession()

  // Verificar sessão do NextAuth
  const nextAuthSession = await getToken({ req })

  // Verificar se a rota atual precisa de autenticação
  const isProtectedRoute = protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route))

  // Se for rota protegida e não houver sessão, redirecionar para login
  if (isProtectedRoute && !supabaseSession && !nextAuthSession) {
    const redirectUrl = new URL('/login', req.url)
    redirectUrl.searchParams.set('callbackUrl', req.url)
    return NextResponse.redirect(redirectUrl)
  }

  return res
}

// Configurar em quais rotas o middleware deve ser executado
export const config = {
  matcher: ['/provas/:path*', '/prova-geral/:path*', '/documentos/:path*']
} 