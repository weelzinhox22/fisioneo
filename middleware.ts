import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Lista de rotas protegidas
const protectedRoutes = ['/provas', '/prova-geral', '/documentos', '/temas']

export async function middleware(req: NextRequest) {
  // Criar resposta inicial
  const res = NextResponse.next()

  // Verificar se é uma rota de API ou assets estáticos
  const { pathname } = req.nextUrl
  if (
    pathname.startsWith('/_next') || 
    pathname.startsWith('/api/') ||
    pathname.includes('.') // files like favicon.ico, etc.
  ) {
    return res
  }

  try {
    // Criar cliente Supabase com os cookies
    const supabase = createMiddlewareClient({ req, res })

    // Verificar sessão do Supabase
    const { data: { session } } = await supabase.auth.getSession()

    // Se estiver na página de login e tiver sessão válida, redirecionar para home
    if (pathname === '/login' && session) {
      return NextResponse.redirect(new URL('/', req.url))
    }

    // Verificar se a rota atual precisa de autenticação
    const isProtectedRoute = protectedRoutes.some(route => 
      pathname.startsWith(route)
    )

    // Se for rota protegida e não houver sessão, redirecionar para login
    if (isProtectedRoute && !session) {
      const callbackUrl = encodeURIComponent(req.url)
      return NextResponse.redirect(new URL(`/login?callbackUrl=${callbackUrl}`, req.url))
    }

    // Retornar a resposta com os cookies atualizados
    return res
  } catch (error) {
    console.error('Middleware error:', error)
    return res
  }
}

// Configurar em quais rotas o middleware deve ser executado
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ]
} 