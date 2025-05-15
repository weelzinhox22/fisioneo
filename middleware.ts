import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const res = NextResponse.next()
  
  // Check NextAuth session
  const token = await getToken({ req: request })
  
  // Check Supabase session
  const supabase = createMiddlewareClient({ req: request, res })
  const { data: { session } } = await supabase.auth.getSession()

  // If accessing a protected route
  if (request.nextUrl.pathname.startsWith('/temas') || 
      request.nextUrl.pathname.startsWith('/provas') ||
      request.nextUrl.pathname.startsWith('/prova-geral') ||
      request.nextUrl.pathname.startsWith('/documentos')) {
    
    // Allow access if either authentication is valid
    if (!token && !session) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return res
}

// Specify which routes should be protected
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - images folder
     * - login page
     * - auth callback
     */
    '/((?!_next/static|_next/image|favicon.ico|public|images|login|auth/callback).*)',
  ],
} 