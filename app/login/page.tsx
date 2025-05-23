"use client"

import { useState, useEffect } from "react"
import { signIn } from "next-auth/react"
import { motion } from "framer-motion"
import { LogIn, Mail, UserPlus, AlertTriangle, X } from "lucide-react"
import Link from "next/link"
import { MagneticButton } from "@/components/ui/magnetic-button"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { AlertDialog } from "@/components/ui/alert-dialog"
import { CookieConsent } from "@/components/ui/cookie-consent"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [mode, setMode] = useState<"login" | "register">("login")
  const [error, setError] = useState("")
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const router = useRouter()
  const [showAlert, setShowAlert] = useState(false)
  const [showGoogleWarning, setShowGoogleWarning] = useState(true)
  const [alertConfig, setAlertConfig] = useState({
    title: "",
    message: "",
    type: "success" as "success" | "error" | "info"
  })

  const createUserProfile = async (userId: string) => {
    try {
      // Convert string ID to UUID format if needed
      const { data, error: profileError } = await supabase
        .from('user_profiles')
        .insert([
          { 
            user_id: userId, // Supabase will handle the UUID conversion
            email_preferences: {
              marketing: false,
              updates: true,
              security: true
            }
          }
        ])
        .select()

      if (profileError) {
        console.error('Error creating profile:', profileError)
        // Log the full error details for debugging
        console.error('Profile Error Details:', {
          code: profileError.code,
          message: profileError.message,
          details: profileError.details,
          hint: profileError.hint
        })
        return { success: false, error: profileError }
      }
      return { success: true, data }
    } catch (error) {
      console.error('Error in createUserProfile:', error)
      return { success: false, error }
    }
  }

  // Validação de senha
  const validatePassword = (pass: string) => {
    const minLength = 8
    const hasLowerCase = /[a-z]/.test(pass)
    const hasNumbers = /\d/.test(pass)

    const errors = []
    if (pass.length < minLength) errors.push("pelo menos 8 caracteres")
    if (!hasLowerCase) errors.push("uma letra")
    if (!hasNumbers) errors.push("um número")

    return errors
  }

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      if (mode === "register") {
        // Validações
        if (!name.trim()) {
          throw new Error("Por favor, insira seu nome completo")
        }

        if (password !== confirmPassword) {
          throw new Error("As senhas não coincidem")
        }

        const passwordErrors = validatePassword(password)
        if (passwordErrors.length > 0) {
          throw new Error(`A senha deve conter ${passwordErrors.join(", ")}`)
        }

        if (!acceptedTerms) {
          throw new Error("Você precisa aceitar os termos de uso e política de privacidade")
        }

        // First, try to create the user
        const { data: authData, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name
            },
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        })

        if (signUpError) throw signUpError

        if (!authData.user) {
          throw new Error("Falha ao criar usuário")
        }

        // Try to create the user profile
        const { success, error: profileError } = await createUserProfile(authData.user.id)

        if (!success) {
          console.error('Failed to create user profile:', profileError)
        }

        setAlertConfig({
          title: "Cadastro realizado com sucesso!",
          message: "Por favor, verifique seu email para confirmar seu cadastro. Enviamos um link de confirmação.",
          type: "success"
        })
        setShowAlert(true)
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (error) throw error

        // Get the session after successful login
        const { data: { session } } = await supabase.auth.getSession()
        
        if (session) {
          // Set cookies for session persistence
          document.cookie = `sb-access-token=${session.access_token}; path=/; max-age=3600; secure; samesite=lax`
          document.cookie = `sb-refresh-token=${session.refresh_token}; path=/; max-age=3600; secure; samesite=lax`
          
          router.push("/")
          router.refresh() // Force a refresh to update auth state
        } else {
          throw new Error("Failed to get session after login")
        }
      }
    } catch (error: any) {
      console.error('Auth error:', error)
      setError(error.message)
      setAlertConfig({
        title: "Erro!",
        message: error.message || "Ocorreu um erro inesperado",
        type: "error"
      })
      setShowAlert(true)
    } finally {
      setLoading(false)
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

      {/* Alert Dialog para erros e notificações */}
      <AlertDialog
        isOpen={showAlert}
        onClose={() => setShowAlert(false)}
        title={alertConfig.title}
        message={alertConfig.message}
        type={alertConfig.type}
      />

      {/* Conteúdo */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 md:p-8">
        <div className="max-w-md w-full mx-auto md:ml-8">
          {/* Banner de aviso do Google fixo e otimizado para mobile */}
          {showGoogleWarning && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 relative bg-gradient-to-r from-[#6EC1E4]/90 to-[#B9A9FF]/90 backdrop-blur-md rounded-xl p-3 md:p-4 shadow-2xl border border-white/20"
            >
              <button 
                onClick={() => setShowGoogleWarning(false)}
                className="absolute top-2 right-2 text-white/70 hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
              
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-blue-400/30 flex-shrink-0">
                  <AlertTriangle className="h-4 w-4 md:h-5 md:w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-sm md:text-base font-semibold text-white mb-0.5">Aviso Importante</h3>
                  <p className="text-xs md:text-sm text-white/90">
                    O login com Google está temporariamente suspenso. Por favor, utilize seu email e senha.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="backdrop-blur-md bg-white/10 rounded-3xl p-6 md:p-8 shadow-2xl border border-white/10"
          >
            {/* Logo ou Título */}
            <div className="text-center mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                {mode === "login" ? "Bem-vindo de volta!" : "Criar nova conta"}
              </h1>
              <p className="text-gray-300 text-base md:text-lg mb-2">
                Conteúdo exclusivo para membros da plataforma
              </p>
              <p className="text-gray-400 text-xs md:text-sm italic">
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
              {mode === "register" && (
                <div>
                  <input
                    type="text"
                    placeholder="Nome completo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4285F4] focus:border-transparent transition-all"
                    required
                  />
                </div>
              )}

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

              {mode === "register" && (
                <>
                  <div>
                    <input
                      type="password"
                      placeholder="Confirme sua senha"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4285F4] focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  {/* Termos de uso - MELHORADO PARA MOBILE */}
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <div className="flex items-center gap-3 mb-2">
                      <input
                        type="checkbox"
                        id="terms"
                        checked={acceptedTerms}
                        onChange={(e) => setAcceptedTerms(e.target.checked)}
                        className="w-5 h-5 accent-blue-500 rounded"
                      />
                      <label htmlFor="terms" className="text-sm text-gray-300 font-medium">
                        Aceito os termos e condições
                      </label>
                    </div>
                    <div className="pl-8 text-xs text-gray-400">
                      Li e aceito os{" "}
                      <Link href="/termos" className="text-blue-400 hover:text-blue-300 font-medium underline">
                        termos de uso
                      </Link>{" "}
                      e a{" "}
                      <Link href="/privacidade" className="text-blue-400 hover:text-blue-300 font-medium underline">
                        política de privacidade
                      </Link>
                    </div>
                  </div>

                  <div className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/20">
                    <h4 className="text-sm font-medium text-blue-400 mb-2">Requisitos da senha:</h4>
                    <ul className="text-xs text-gray-400 space-y-1">
                      <li>• Mínimo de 8 caracteres</li>
                      <li>• Pelo menos uma letra</li>
                      <li>• Pelo menos um número</li>
                    </ul>
                  </div>
                </>
              )}

              {error && (
                <p className="text-red-400 text-sm mt-2 text-center">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading || (mode === "register" && !acceptedTerms)}
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
                  onClick={async () => {
                    if (!email) {
                      setAlertConfig({
                        title: "Atenção!",
                        message: "Por favor, insira seu email antes de solicitar a recuperação de senha.",
                        type: "info"
                      });
                      setShowAlert(true);
                      return;
                    }
                    
                    try {
                      const { error } = await supabase.auth.resetPasswordForEmail(email, {
                        redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
                      });
                      
                      if (error) throw error;
                      
                      setAlertConfig({
                        title: "Email enviado!",
                        message: "Verifique sua caixa de entrada para redefinir sua senha.",
                        type: "success"
                      });
                      setShowAlert(true);
                    } catch (error: any) {
                      setAlertConfig({
                        title: "Erro!",
                        message: error.message,
                        type: "info"
                      });
                      setShowAlert(true);
                    }
                  }}
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
            <div className="flex flex-col items-center justify-center space-y-4 mt-6">
              <div className="relative w-full">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 text-gray-400 bg-[#1a1a1a]">ou continue com</span>
                </div>
              </div>

              {/* Botão do Google desabilitado */}
              <button
                type="button"
                disabled
                className="w-full flex items-center justify-center px-4 py-3 space-x-2 text-white bg-white/5 rounded-xl opacity-50 cursor-not-allowed"
                title="Login com Google temporariamente suspenso"
              >
                <svg className="w-5 h-5" viewBox="0 0 48 48">
                  <path
                    fill="#FFC107"
                    d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
                  />
                  <path
                    fill="#FF3D00"
                    d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"
                  />
                  <path
                    fill="#4CAF50"
                    d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
                  />
                  <path
                    fill="#1976D2"
                    d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
                  />
                </svg>
                <span>Entrar com Google</span>
              </button>
            </div>

            {/* Alternar entre Login e Registro */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-6 text-center"
            >
              {mode === "login" ? (
                <button
                  onClick={() => setMode("register")}
                  className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                >
                  <UserPlus className="w-5 h-5" />
                  <span className="font-medium">Criar nova conta</span>
                  <div className="absolute -bottom-6 left-0 w-full text-center">
                    <span className="text-xs text-emerald-400">É rápido e gratuito!</span>
                  </div>
                </button>
              ) : (
                <button
                  onClick={() => setMode("login")}
                  className="text-gray-400 hover:text-white transition-colors text-sm inline-flex items-center gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  Já tem uma conta? Entre
                </button>
              )}
            </motion.div>

            {/* Link para voltar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-8 text-center"
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

      {/* Cookie Consent - vamos melhorar este componente */}
      <CookieConsent />
    </div>
  )
} 