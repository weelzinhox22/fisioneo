"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Baby, FileText, Home, BookOpen, GraduationCap, Award, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  // Detectar scroll para efeitos visuais
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  const handleOpenSuggestions = () => {
    // Create and dispatch a custom event to open the suggestions dialog
    const event = new CustomEvent('openSuggestions');
    document.dispatchEvent(event);
    // Close mobile menu if open
    if (isOpen) setIsOpen(false);
  };

  const navItems = [
    { name: "Início", href: "/", icon: <Home className="h-4 w-4" /> },
    { name: "Temas", href: "/temas", icon: <BookOpen className="h-4 w-4" /> },
    { name: "Provas", href: "/provas", icon: <GraduationCap className="h-4 w-4" /> },
    { name: "Prova Geral", href: "/prova-geral", icon: <Award className="h-4 w-4" /> },
    { name: "Documentos", href: "/documentos", icon: <FileText className="h-4 w-4" /> },
    { name: "Sugestões", onClick: handleOpenSuggestions, icon: <MessageSquare className="h-4 w-4" /> },
  ]

  // Variants for animations
  const logoVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.5, 
        ease: "easeOut" 
      } 
    }
  };

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled 
          ? "border-b border-[#E0E0E0]/40 bg-white/90 backdrop-blur-md shadow-sm" 
          : "bg-white/80 backdrop-blur-sm"
      )}
    >
      <div 
        className={cn(
          "absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#6EC1E4] via-[#B9A9FF] to-[#6EC1E4] opacity-0 transition-all duration-300",
          scrolled && "opacity-100"
        )}
      ></div>
      
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={logoVariants}
          >
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#6EC1E4] to-[#B9A9FF] rounded-full opacity-70 blur-sm group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative bg-white rounded-full p-1.5">
                  <Baby className="h-7 w-7 text-[#6EC1E4] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#6EC1E4] group-hover:to-[#B9A9FF] transition-all duration-300" />
                </div>
              </div>
              <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#333333] to-[#555555] group-hover:from-[#6EC1E4] group-hover:to-[#B9A9FF] transition-all duration-300">FisioNeo</span>
          </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {item.href ? (
              <Link
                href={item.href}
                className={cn(
                      "relative px-4 py-2 rounded-full text-[#666666] hover:text-[#6EC1E4] transition-all duration-300 text-sm font-medium flex items-center gap-1.5 group",
                      pathname === item.href 
                        ? "text-white bg-gradient-to-r from-[#6EC1E4] to-[#B9A9FF] font-semibold shadow-md hover:shadow-lg hover:shadow-[#6EC1E4]/20" 
                        : "hover:bg-[#F0F9FF]"
                )}
              >
                    <span className={cn(
                      "transition-all duration-300",
                      pathname === item.href ? "text-white" : "text-[#6EC1E4] group-hover:scale-110"
                    )}>
                      {item.icon}
                    </span>
                {item.name}
                    {pathname === item.href && (
                      <motion.span
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-[#6EC1E4] to-[#B9A9FF] -z-10"
                        layoutId="navIndicator"
                        transition={{ 
                          type: "spring", 
                          stiffness: 350, 
                          damping: 30 
                        }}
                      />
                    )}
              </Link>
                ) : (
                  <button
                    onClick={item.onClick}
                    className="relative px-4 py-2 rounded-full text-[#666666] hover:text-[#6EC1E4] transition-all duration-300 text-sm font-medium flex items-center gap-1.5 group hover:bg-[#F0F9FF]"
                  >
                    <span className="text-[#6EC1E4] group-hover:scale-110 transition-all duration-300">
                      {item.icon}
                    </span>
                    {item.name}
                  </button>
                )}
              </motion.div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="md:hidden relative"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-[#6EC1E4]/20 to-[#B9A9FF]/20 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative p-2">
              {isOpen ? 
                <X className="h-6 w-6 text-[#6EC1E4]" /> : 
                <Menu className="h-6 w-6 text-[#6EC1E4]" />
              }
            </div>
          </motion.button>
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
            className="md:hidden border-t border-[#E0E0E0] bg-white/95 backdrop-blur-md"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    {item.href ? (
                  <Link
                    href={item.href}
                    className={cn(
                          "text-[#666666] hover:text-[#6EC1E4] transition-all duration-300 text-sm font-medium py-3 px-4 flex items-center gap-3 rounded-lg",
                          pathname === item.href 
                            ? "bg-gradient-to-r from-[#6EC1E4]/10 to-[#B9A9FF]/10 text-[#6EC1E4] font-semibold border-l-4 border-[#6EC1E4]" 
                            : "hover:bg-[#F8F8F8]"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                        <span className="text-[#6EC1E4]">
                          {item.icon}
                        </span>
                    {item.name}
                  </Link>
                    ) : (
                      <button
                        onClick={item.onClick}
                        className="text-[#666666] hover:text-[#6EC1E4] transition-all duration-300 text-sm font-medium py-3 px-4 flex items-center gap-3 rounded-lg hover:bg-[#F8F8F8] w-full text-left"
                      >
                        <span className="text-[#6EC1E4]">
                          {item.icon}
                        </span>
                        {item.name}
                      </button>
                    )}
                  </motion.div>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
