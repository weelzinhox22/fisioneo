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

    // Se estiver acessando uma rota protegida
    if (request.nextUrl.pathname.startsWith('/temas') || 
        request.nextUrl.pathname.startsWith('/provas') ||
        request.nextUrl.pathname.startsWith('/prova-geral') ||
        request.nextUrl.pathname.startsWith('/documentos')) {
      
      // Se não tiver nenhuma sessão válida, redireciona para o login
      if (!token && !supabaseSession) {
        console.log('Nenhuma sessão válida encontrada, redirecionando para login')
        
        // Adiciona a URL atual como callbackUrl para retornar após o login
        const callbackUrl = request.nextUrl.pathname
        const loginUrl = new URL('/login', request.url)
        loginUrl.searchParams.set('callbackUrl', callbackUrl)
        
        return NextResponse.redirect(loginUrl)
      }

      console.log('Acesso permitido à rota protegida:', request.nextUrl.pathname)
    }

    return res
  } catch (error) {
    console.error('Erro no middleware:', error)
    // Em caso de erro, redireciona para o login
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