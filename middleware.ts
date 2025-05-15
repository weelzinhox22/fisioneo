import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const res = NextResponse.next()
  
  try {
    // Verifica a sessão do NextAuth
    const token = await getToken({ 
      req: request,
      secret: process.env.NEXTAUTH_SECRET 
    })
    
    // Verifica a sessão do Supabase
    const supabase = createMiddlewareClient({ req: request, res })
    const { data: { session: supabaseSession } } = await supabase.auth.getSession()

    // Log do estado das sessões
    console.log('NextAuth token:', token ? 'Presente' : 'Ausente')
    console.log('Supabase session:', supabaseSession ? 'Presente' : 'Ausente')
    
    if (token) {
      console.log('Provider:', token.provider)
    }

    // Se estiver acessando uma rota protegida
    if (request.nextUrl.pathname.startsWith('/temas') || 
        request.nextUrl.pathname.startsWith('/provas') ||
        request.nextUrl.pathname.startsWith('/prova-geral') ||
        request.nextUrl.pathname.startsWith('/documentos')) {
      
      // Verifica se tem uma sessão válida (NextAuth OU Supabase)
      const hasValidSession = token || supabaseSession

      if (!hasValidSession) {
        console.log('Nenhuma sessão válida encontrada, redirecionando para login')
        const callbackUrl = request.nextUrl.pathname
        const loginUrl = new URL('/login', request.url)
        loginUrl.searchParams.set('callbackUrl', callbackUrl)
        return NextResponse.redirect(loginUrl)
      }

      // Se chegou aqui, tem uma sessão válida
      console.log('Acesso permitido à rota protegida:', request.nextUrl.pathname)
      
      // Adiciona o token à resposta para uso no cliente
      if (token) {
        res.headers.set('x-auth-provider', token.provider as string)
      }
    }

    return res
  } catch (error) {
    console.error('Erro no middleware:', error)
    const loginUrl = new URL('/login', request.url)
    return NextResponse.redirect(loginUrl)
  }
}

// Especifica quais rotas devem ser protegidas
export const config = {
  matcher: [
    '/temas/:path*',
    '/provas/:path*',
    '/prova-geral/:path*',
    '/documentos/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ]
} 