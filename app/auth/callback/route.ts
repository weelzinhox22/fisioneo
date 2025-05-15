import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const supabase = createRouteHandlerClient({ cookies })
    
    try {
      // Exchange the code for a session
      const { data: { session }, error: sessionError } = await supabase.auth.exchangeCodeForSession(code)
      
      if (sessionError) {
        console.error('Error exchanging code for session:', sessionError)
        return NextResponse.redirect(new URL('/login?error=auth', requestUrl.origin))
      }

      // Set the session cookie
      if (session) {
        cookies().set('sb-access-token', session.access_token, {
          secure: true,
          sameSite: 'lax',
          maxAge: 60 * 60 * 24 * 7 // 1 week
        })
        cookies().set('sb-refresh-token', session.refresh_token!, {
          secure: true,
          sameSite: 'lax',
          maxAge: 60 * 60 * 24 * 7 // 1 week
        })
      }

      return NextResponse.redirect(new URL('/', requestUrl.origin))
    } catch (error) {
      console.error('Error in auth callback:', error)
      return NextResponse.redirect(new URL('/login?error=unknown', requestUrl.origin))
    }
  }

  // If no code is present, redirect to login
  return NextResponse.redirect(new URL('/login', requestUrl.origin))
} 