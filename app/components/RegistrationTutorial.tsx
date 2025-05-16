"use client"

import { motion } from "framer-motion"
import { UserPlus, Mail, CheckCircle } from "lucide-react"
import { ThreeDText } from "@/components/ui/3d-text"
import { MagneticButton } from "@/components/ui/magnetic-button"

export function RegistrationTutorial() {
  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-white to-[#F8FBFF]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="px-4 py-1.5 bg-gradient-to-r from-[#6EC1E4]/10 to-[#B9A9FF]/10 rounded-full text-sm font-medium text-[#6EC1E4] inline-block mb-4">
            Comece Agora
          </span>
          
          <ThreeDText
            text="Como Começar"
            gradient={true}
            depth={8}
            fontSize="2.5rem"
            fontWeight="700"
            className="mb-6"
          />
          
          <p className="text-lg text-[#666666] max-w-2xl mx-auto">
            Siga estes passos simples para começar sua jornada na FisioNeo
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl p-6 shadow-md border border-[#E0E0E0]/50"
          >
            <div className="p-3 bg-[#F0F9FF] rounded-lg inline-block mb-4">
              <UserPlus className="h-6 w-6 text-[#6EC1E4]" />
            </div>
            <h3 className="text-lg font-semibold text-[#333333] mb-2">1. Crie sua conta</h3>
            <p className="text-[#666666] text-sm">
              Clique em "Registrar" e preencha seus dados básicos para criar sua conta gratuita.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl p-6 shadow-md border border-[#E0E0E0]/50"
          >
            <div className="p-3 bg-[#F0F9FF] rounded-lg inline-block mb-4">
              <Mail className="h-6 w-6 text-[#6EC1E4]" />
            </div>
            <h3 className="text-lg font-semibold text-[#333333] mb-2">2. Confirme seu email</h3>
            <p className="text-[#666666] text-sm">
              Verifique sua caixa de entrada e confirme seu endereço de email para ativar sua conta.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl p-6 shadow-md border border-[#E0E0E0]/50"
          >
            <div className="p-3 bg-[#F0F9FF] rounded-lg inline-block mb-4">
              <CheckCircle className="h-6 w-6 text-[#6EC1E4]" />
            </div>
            <h3 className="text-lg font-semibold text-[#333333] mb-2">3. Comece a explorar</h3>
            <p className="text-[#666666] text-sm">
              Acesse todos os recursos da plataforma e comece sua jornada de aprendizado.
            </p>
          </motion.div>
        </div>

        <div className="text-center mt-12">
          <MagneticButton
            backgroundGradient={true}
            glowOnHover={true}
            className="px-8 py-4 font-medium"
            href="/register"
          >
            <span className="flex items-center">
              Criar Conta Gratuita
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </span>
          </MagneticButton>
        </div>
      </div>
    </section>
  )
} 