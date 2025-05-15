import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

// Rotas que requerem autenticação
const protectedRoutes = ['/provas', '/prova-geral', '/documentos', '/temas']

export async function middleware(req: NextRequest) {
  // Criar resposta inicial
  const res = NextResponse.next()

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