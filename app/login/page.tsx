"use client"

import { signIn } from "next-auth/react"
import { motion } from "framer-motion"
import { LogIn } from "lucide-react"
import Link from "next/link"
import { MagneticButton } from "@/components/ui/magnetic-button"
import { ThreeDText } from "@/components/ui/3d-text"
import { Particles } from "@/components/ui/particles"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F8FAFF] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[800px] h-[800px] rounded-full bg-[#6EC1E4]/5 blur-[120px] -top-[400px] -left-[300px]" />
        <div className="absolute w-[600px] h-[600px] rounded-full bg-[#B9A9FF]/5 blur-[100px] -bottom-[200px] -right-[200px]" />
        <Particles className="absolute inset-0" quantity={15} />
      </div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        <Link
          href="/"
          className="inline-flex items-center text-[#666666] hover:text-[#333333] transition-colors mb-12 group"
        >
          <span className="mr-2">←</span>
          Voltar para Home
        </Link>

        <div className="max-w-md mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-4xl font-bold text-[#333333] mb-6">
              Bem-vindo(a) ao FisioNeo
            </h1>
            <p className="text-[#666666] text-lg mb-8">
              Faça login para acessar todo o conteúdo e recursos exclusivos.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <MagneticButton
              onClick={() => signIn("google", { callbackUrl: "/" })}
              backgroundGradient={true}
              glowOnHover={true}
              strength={20}
              className="w-full px-6 py-4 text-lg font-medium inline-flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Entrar com Google
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 