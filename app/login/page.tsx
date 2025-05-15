"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { motion } from "framer-motion"
import { LogIn, Mail } from "lucide-react"
import Link from "next/link"
import { MagneticButton } from "@/components/ui/magnetic-button"
import { supabase } from "@/lib/supabase"
import { useRouter, useSearchParams } from "next/navigation"
import { AlertDialog } from "@/components/ui/alert-dialog"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [mode, setMode] = useState<"login" | "register">("login")
  const [error, setError] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()
  const [showAlert, setShowAlert] = useState(false)
  const [alertConfig, setAlertConfig] = useState<{
    title: string;
    message: string;
    type: 'success' | 'error' | 'info';
  }>({
    title: "",
    message: "",
    type: "success"
  })

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      if (mode === "register") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        })

        if (error) throw error
        setAlertConfig({
          title: "Cadastro realizado!",
          message: "Verifique seu email para confirmar o cadastro. Enviamos um link de confirmação para você.",
          type: "success"
        })
        setShowAlert(true)
      } else {
        // Primeiro autentica com Supabase
        const { data: { user, session }, error: supabaseError } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (supabaseError) {
          console.error('Erro Supabase:', supabaseError)
          throw supabaseError
        }

        if (!user || !session) {
          throw new Error('Usuário ou sessão não encontrados')
        }

        // Depois autentica com NextAuth
        const callbackUrl = searchParams.get('callbackUrl') || '/'
        console.log('Tentando login NextAuth com callbackUrl:', callbackUrl)

        const result = await signIn("credentials", {
          email,
          password,
          redirect: false,
          callbackUrl,
        })

        if (result?.error) {
          console.error('Erro NextAuth:', result.error)
          throw new Error(result.error)
        }

        // Aguarda um momento para garantir que as sessões estejam sincronizadas
        await new Promise(resolve => setTimeout(resolve, 500))

        console.log('Login bem-sucedido, redirecionando para:', callbackUrl)
        router.push(callbackUrl)
      }
    } catch (error: any) {
      console.error('Erro durante autenticação:', error)
      setError(error.message)
      setAlertConfig({
        title: "Erro!",
        message: error.message,
        type: "error"
      })
      setShowAlert(true)
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordReset = async () => {
    if (!email) {
      setAlertConfig({
        title: "Atenção!",
        message: "Por favor, insira seu email antes de solicitar a recuperação de senha.",
        type: "info"
      })
      setShowAlert(true)
      return
    }
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
      })
      
      if (error) throw error
      
      setAlertConfig({
        title: "Email enviado!",
        message: "Verifique sua caixa de entrada para redefinir sua senha.",
        type: "success"
      })
      setShowAlert(true)
    } catch (error: any) {
      setAlertConfig({
        title: "Erro!",
        message: error.message,
        type: "error"
      })
      setShowAlert(true)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Vídeo de fundo */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/images/feto/hero-baby-security.mp4" type="video/mp4" />
        </video>
        {/* Overlay gradiente sobre o vídeo */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40" />
      </div>

      {/* Alert Dialog */}
      <AlertDialog
        isOpen={showAlert}
        onClose={() => setShowAlert(false)}
        title={alertConfig.title}
        message={alertConfig.message}
        type={alertConfig.type}
      />

      {/* Conteúdo */}
      <div className="relative z-10 min-h-screen flex items-center justify-start p-8">
        <div className="max-w-md w-full ml-8">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="backdrop-blur-md bg-white/10 rounded-3xl p-8 shadow-2xl border border-white/10"
          >
            {/* Logo ou Título */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white mb-4">
                {mode === "login" ? "Bem-vindo de volta!" : "Criar nova conta"}
              </h1>
              <p className="text-gray-300 text-lg mb-2">
                Conteúdo exclusivo para membros da plataforma
              </p>
              <p className="text-gray-400 text-sm italic">
                "Porque até os bebês sabem que conhecimento é poder! 👶✨"
              </p>
            </div>

            {/* Form de Email */}
            <motion.form
              onSubmit={handleEmailAuth}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="space-y-4 mb-6"
            >
              <div>
                <input
                  type="email"
                  placeholder="Seu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4285F4] focus:border-transparent transition-all"
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4285F4] focus:border-transparent transition-all"
                  required
                />
              </div>
              {error && (
                <p className="text-red-400 text-sm mt-2 text-center">{error}</p>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 text-lg font-medium relative overflow-hidden rounded-xl bg-gradient-to-r from-[#4285F4] to-[#34A853] hover:from-[#34A853] hover:to-[#4285F4] text-white transition-all duration-500 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-center justify-center gap-3">
                  <Mail className="w-5 h-5" />
                  <span>
                    {loading
                      ? "Processando..."
                      : mode === "login"
                      ? "Entrar com Email"
                      : "Criar conta"}
                  </span>
                </div>
              </button>
            </motion.form>

            {/* Botão de Recuperação de Senha */}
            {mode === "login" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center"
              >
                <button
                  onClick={handlePasswordReset}
                  className="text-gray-400 hover:text-white transition-colors text-sm mt-2 group inline-flex items-center gap-2"
                >
                  <span className="relative">
                    Esqueceu sua senha?
                    <span className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-gradient-to-r from-[#4285F4] to-[#34A853] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                  </span>
                </button>
              </motion.div>
            )}

            {/* Divisor */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-transparent text-gray-400">ou</span>
              </div>
            </div>

            {/* Botão do Google */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <MagneticButton
                onClick={() => signIn("google", { callbackUrl: "/" })}
                backgroundGradient={true}
                glowOnHover={true}
                strength={20}
                className="w-full px-6 py-4 text-lg font-medium group relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#4285F4] to-[#34A853] hover:from-[#34A853] hover:to-[#4285F4] transition-all duration-500 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
              >
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="flex items-center justify-center gap-3">
                  <div className="bg-white p-2 rounded-full">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                  </div>
                  <span className="text-white font-semibold tracking-wide">
                    Continuar com Google
                  </span>
                </div>
              </MagneticButton>
            </motion.div>

            {/* Alternar entre Login e Registro */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-6 text-center"
            >
              <button
                onClick={() => setMode(mode === "login" ? "register" : "login")}
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                {mode === "login"
                  ? "Não tem uma conta? Cadastre-se"
                  : "Já tem uma conta? Entre"}
              </button>
            </motion.div>

            {/* Link para voltar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-4 text-center"
            >
              <Link
                href="/"
                className="text-gray-400 hover:text-white transition-colors text-sm inline-flex items-center gap-2"
              >
                <span>←</span>
                Voltar para Home
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 