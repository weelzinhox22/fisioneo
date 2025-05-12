import Link from "next/link"
import { Baby, Mail, Phone } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#E0E0E0] py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="flex items-center space-x-2">
              <Baby className="h-6 w-6 text-[#6EC1E4]" />
              <span className="text-lg font-bold text-[#333333]">FisioNeo</span>
            </Link>
            <p className="text-sm text-[#666666] mt-2 text-center md:text-left">
              Portal educacional dedicado à Fisioterapia Neonatal e Pediátrica
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-[#333333] mb-4 text-center md:text-left">Navegação</h3>
              <ul className="space-y-2 text-center md:text-left">
                <li>
                  <Link href="/" className="text-sm text-[#666666] hover:text-[#6EC1E4] transition-colors">
                    Início
                  </Link>
                </li>
                <li>
                  <Link href="/temas" className="text-sm text-[#666666] hover:text-[#6EC1E4] transition-colors">
                    Temas
                  </Link>
                </li>
                <li>
                  <Link href="/provas" className="text-sm text-[#666666] hover:text-[#6EC1E4] transition-colors">
                    Provas
                  </Link>
                </li>
                <li>
                  <Link href="/prova-geral" className="text-sm text-[#666666] hover:text-[#6EC1E4] transition-colors">
                    Prova Geral
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-[#333333] mb-4 text-center md:text-left">Contato</h3>
              <ul className="space-y-2 text-center md:text-left">
                <li className="flex items-center justify-center md:justify-start gap-2">
                  <Mail className="h-4 w-4 text-[#6EC1E4]" />
                  <span className="text-sm text-[#666666]">contato@fisioneo.com.br</span>
                </li>
                <li className="flex items-center justify-center md:justify-start gap-2">
                  <Phone className="h-4 w-4 text-[#6EC1E4]" />
                  <span className="text-sm text-[#666666]">(00) 00000-0000</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-[#E0E0E0] text-center">
          <p className="text-xs text-[#666666]">
            &copy; {new Date().getFullYear()} FisioNeo - Todos os direitos reservados
          </p>
        </div>
      </div>
    </footer>
  )
}
