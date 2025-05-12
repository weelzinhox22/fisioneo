"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Baby, FileText } from "lucide-react"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { name: "Início", href: "/" },
    { name: "Temas", href: "/temas" },
    { name: "Provas", href: "/provas" },
    { name: "Prova Geral", href: "/prova-geral" },
    { name: "Documentos", href: "/documentos", icon: <FileText className="h-4 w-4" /> },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E0E0E0] bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Baby className="h-8 w-8 text-[#6EC1E4]" />
            <span className="text-xl font-bold text-[#333333]">FisioNeo</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-[#666666] hover:text-[#6EC1E4] transition-colors text-sm font-medium flex items-center gap-1",
                  pathname === item.href && "text-[#6EC1E4] font-semibold",
                )}
              >
                {item.icon && item.icon}
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isOpen ? <X className="h-6 w-6 text-[#666666]" /> : <Menu className="h-6 w-6 text-[#666666]" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-[#E0E0E0] bg-white"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "text-[#666666] hover:text-[#6EC1E4] transition-colors text-sm font-medium py-2 flex items-center gap-2",
                      pathname === item.href && "text-[#6EC1E4] font-semibold",
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.icon && item.icon}
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
