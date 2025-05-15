import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req: request, res })

  // Try to refresh the session
  const { data: { session }, error } = await supabase.auth.getSession()

  // If we have a session, update the cookies
  if (session) {
    res.cookies.set('sb-access-token', session.access_token, {
      secure: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 1 week
    })

    if (session.refresh_token) {
      res.cookies.set('sb-refresh-token', session.refresh_token, {
        secure: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7 // 1 week
      })
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
     * - api routes
     */
    '/((?!_next/static|_next/image|favicon.ico|public|images|login|api).*)',
  ],
} 