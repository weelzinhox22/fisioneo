import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const next = requestUrl.searchParams.get('next') || '/'

  if (code) {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    
    try {
      // Exchange the code for a session
      await supabase.auth.exchangeCodeForSession(code)
      
      // Get the session
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        console.error('Failed to get session after exchanging code')
        return NextResponse.redirect(new URL('/login?error=session', requestUrl.origin))
      }
      
      // Redirect to the requested page or home
      return NextResponse.redirect(new URL(next, requestUrl.origin))
    } catch (error) {
      console.error('Error in auth callback:', error)
      return NextResponse.redirect(new URL('/login?error=unknown', requestUrl.origin))
    }
  }

  // If no code is present, redirect to login
  return NextResponse.redirect(new URL('/login', requestUrl.origin))
} 