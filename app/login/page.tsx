"use client"

import { signIn } from "next-auth/react"
import { motion } from "framer-motion"
import { LogIn } from "lucide-react"
import Link from "next/link"
import { MagneticButton } from "@/components/ui/magnetic-button"

export default function LoginPage() {
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
                Êpa, êpa, êpa! Vamos fazer login!
              </h1>
              <p className="text-gray-300 text-lg mb-2">
                Conteúdo exclusivo para membros da plataforma
              </p>
              <p className="text-gray-400 text-sm italic">
                "Porque até os bebês sabem que conhecimento é poder! 👶✨"
              </p>
            </div>

            {/* Botão de Login */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
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
                    Entrar com Google
                  </span>
                </div>
              </MagneticButton>
            </motion.div>

            {/* Link para voltar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-6 text-center"
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