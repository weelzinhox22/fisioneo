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
  
  // Para rotas protegidas, verificar autenticação
  if (isProtectedRoute) {
    // 1. Verificar token do NextAuth (Google)
    const token = await getToken({ req })
    if (token) {
      // Se tem token do Google, permitir acesso imediato
      return res
    }
    
    // 2. Verificar autenticação do Supabase
    const supabase = createMiddlewareClient({ req, res })
    const { data } = await supabase.auth.getSession()
    
    // Se não estiver autenticado nem no Google nem no Supabase, redirecionar para login
    if (!data.session) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }
  
  // Criar cliente Supabase com os cookies para outras rotas
  const supabase = createMiddlewareClient({ req, res })
  await supabase.auth.getSession()
  
  // Retornar a resposta com cookies atualizados
  return res
}

// Configurar em quais rotas o middleware deve ser executado
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|images|public).*)'
  ]
} 