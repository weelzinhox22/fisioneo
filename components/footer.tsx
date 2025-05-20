import Link from "next/link"
import { Baby, Mail, Phone, Instagram } from "lucide-react"

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-white to-[#F8FBFD] border-t border-[#E0E0E0]">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-grid-slate-100/[0.03] bg-[size:20px_20px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/50" />
      
      <div className="relative container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-12">
          {/* Logo and description section */}
          <div className="flex flex-col items-center md:items-start max-w-sm">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="relative">
                <div className="absolute -inset-1.5 bg-gradient-to-r from-[#6EC1E4] to-[#B9A9FF] rounded-full opacity-70 blur-lg group-hover:opacity-100 transition-all duration-300"></div>
                <div className="relative bg-white rounded-full p-2 shadow-lg">
                  <Baby className="h-7 w-7 text-[#6EC1E4] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#6EC1E4] group-hover:to-[#B9A9FF] transition-all duration-300" />
                </div>
              </div>
              <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#333333] to-[#555555] group-hover:from-[#6EC1E4] group-hover:to-[#B9A9FF] transition-all duration-300">FisioNeo</span>
            </Link>
            <p className="text-sm text-[#666666] mt-4 text-center md:text-left leading-relaxed">
              Portal educacional dedicado à Fisioterapia Neonatal e Pediátrica, promovendo conhecimento.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
            {/* Navigation section */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#6EC1E4]/5 to-[#B9A9FF]/5 rounded-2xl blur-lg -z-10" />
              <h3 className="text-sm font-semibold text-[#333333] mb-6 text-center md:text-left">
                Navegação
              </h3>
              <ul className="space-y-3 text-center md:text-left">
                <li>
                  <Link href="/" className="text-sm text-[#666666] hover:text-[#6EC1E4] transition-all duration-300 hover:translate-x-1 inline-flex">
                    Início
                  </Link>
                </li>
                <li>
                  <Link href="/temas" className="text-sm text-[#666666] hover:text-[#6EC1E4] transition-all duration-300 hover:translate-x-1 inline-flex">
                    Temas
                  </Link>
                </li>
                <li>
                  <Link href="/provas" className="text-sm text-[#666666] hover:text-[#6EC1E4] transition-all duration-300 hover:translate-x-1 inline-flex">
                    Provas
                  </Link>
                </li>
                <li>
                  <Link href="/prova-geral" className="text-sm text-[#666666] hover:text-[#6EC1E4] transition-all duration-300 hover:translate-x-1 inline-flex">
                    Prova Geral
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact section */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#B9A9FF]/5 to-[#6EC1E4]/5 rounded-2xl blur-lg -z-10" />
              <h3 className="text-sm font-semibold text-[#333333] mb-6 text-center md:text-left">
                Contato
              </h3>
              <ul className="space-y-4 text-center md:text-left">
                <li>
                  <a 
                    href="mailto:weelzinhox22@gmail.com" 
                    className="flex items-center justify-center md:justify-start gap-3 text-sm text-[#666666] hover:text-[#6EC1E4] transition-all duration-300 group hover:-translate-y-0.5"
                  >
                    <span className="relative">
                      <span className="absolute -inset-1 bg-gradient-to-r from-[#6EC1E4]/20 to-[#B9A9FF]/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <Mail className="h-4 w-4 text-[#6EC1E4] relative group-hover:scale-110 transition-transform duration-300" />
                    </span>
                    <span>weelzinhox22@gmail.com</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="tel:+5571991373142" 
                    className="flex items-center justify-center md:justify-start gap-3 text-sm text-[#666666] hover:text-[#6EC1E4] transition-all duration-300 group hover:-translate-y-0.5"
                  >
                    <span className="relative">
                      <span className="absolute -inset-1 bg-gradient-to-r from-[#6EC1E4]/20 to-[#B9A9FF]/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <Phone className="h-4 w-4 text-[#6EC1E4] relative group-hover:scale-110 transition-transform duration-300" />
                    </span>
                    <span>+55 (71) 99137-3142</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="https://instagram.com/welziinho" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center justify-center md:justify-start gap-3 text-sm text-[#666666] hover:text-[#6EC1E4] transition-all duration-300 group hover:-translate-y-0.5"
                  >
                    <span className="relative">
                      <span className="absolute -inset-1 bg-gradient-to-r from-[#6EC1E4]/20 to-[#B9A9FF]/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <Instagram className="h-4 w-4 text-[#6EC1E4] relative group-hover:scale-110 transition-transform duration-300" />
                    </span>
                    <span>@welziinho</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright section */}
        <div className="mt-12 pt-6 border-t border-[#E0E0E0]/50">
          <p className="text-xs text-[#666666] text-center">
            &copy; {new Date().getFullYear()} FisioNeo - Todos os direitos reservados
          </p>
        </div>
      </div>
    </footer>
  )
}
