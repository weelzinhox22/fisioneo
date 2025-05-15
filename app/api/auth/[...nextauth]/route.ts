import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

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
  ],
  pages: {
    signIn: '/login',
    error: '/login', // Página de erro personalizada
  },
  debug: true, // Habilita logs detalhados
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Permite redirecionamento para URLs do mesmo site
      if (url.startsWith(baseUrl)) return url
      // Permite redirecionamento para URLs relativas
      if (url.startsWith("/")) return new URL(url, baseUrl).toString()
      // Por padrão, redireciona para a página inicial
      return baseUrl
    },
    async session({ session, token, user }) {
      return session
    },
    async jwt({ token, user, account, profile }) {
      return token
    },
  },
})

export { handler as GET, handler as POST } 