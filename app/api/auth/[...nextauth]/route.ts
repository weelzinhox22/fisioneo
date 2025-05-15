import NextAuth, { type DefaultSession } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { supabase } from "@/lib/supabase"

// Extend the session type to include user ID
declare module "next-auth" {
  interface Session {
    user: {
      id: string
    } & DefaultSession["user"]
  }
  interface User {
    id: string
  }
}

// Log das variáveis de ambiente (remova em produção)
console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID)
console.log('GOOGLE_CLIENT_SECRET length:', process.env.GOOGLE_CLIENT_SECRET?.length)
console.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL)

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error('Please define GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET environment variables')
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log('Credenciais ausentes')
          return null
        }
        
        try {
          const { data: { user }, error } = await supabase.auth.signInWithPassword({
            email: credentials.email,
            password: credentials.password,
          })

          if (error) {
            console.log('Erro Supabase:', error.message)
            return null
          }
          
          if (!user) {
            console.log('Usuário não encontrado')
            return null
          }
          
          return {
            id: user.id,
            name: user.email?.split('@')[0] || user.email,
            email: user.email,
            image: null
          }
        } catch (error) {
          console.error('Erro de autenticação:', error)
          return null
        }
      }
    })
  ],
  pages: {
    signIn: '/login',
    error: '/login',
  },
  debug: process.env.NODE_ENV === 'development',
  callbacks: {
    async redirect({ url, baseUrl }) {
      console.log('Redirecionando para:', url)
      // Permite redirecionamento para URLs do mesmo site
      if (url.startsWith(baseUrl)) return url
      // Permite redirecionamento para URLs relativas
      if (url.startsWith("/")) return new URL(url, baseUrl).toString()
      // Por padrão, redireciona para a página inicial
      return baseUrl
    },
    async session({ session, token }) {
      console.log('Gerando sessão com token:', token)
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    },
    async jwt({ token, user, account }) {
      console.log('Gerando JWT para usuário:', user?.email)
      if (user) {
        token.id = user.id
      }
      if (account) {
        token.provider = account.provider
      }
      return token
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 dias
  },
})

export { handler as GET, handler as POST } 