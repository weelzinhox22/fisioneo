"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Baby, FileText, Home, BookOpen, GraduationCap, Award, MessageSquare, LogIn, LogOut, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { usePathname, useRouter } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import { MagneticButton } from "@/components/ui/magnetic-button"
import { supabase } from "@/lib/supabase"
import { ProfileDropdown } from "@/components/ui/profile-dropdown"
import { AlertDialog } from "@/components/ui/alert-dialog"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { data: nextAuthSession, status: nextAuthStatus } = useSession()
  const [supabaseSession, setSupabaseSession] = useState<any>(null)
  const [username, setUsername] = useState<string | null>(null)
  const router = useRouter()
  const [showLoginAlert, setShowLoginAlert] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Check for Supabase session and subscribe to auth changes
  useEffect(() => {
    const checkSupabaseAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setSupabaseSession(session)

      // Subscribe to auth changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
        setSupabaseSession(session)
        
        // Update username on auth change
        if (session?.user?.id) {
          const { data: userData } = await supabase
            .from('user_profiles')
            .select('username')
            .eq('user_id', session.user.id)
            .single()

          setUsername(userData?.username || null)
        } else {
          setUsername(null)
        }
      })

      return () => subscription.unsubscribe()
    }

    checkSupabaseAuth()
  }, [])

  // Update username when NextAuth session changes
  useEffect(() => {
    const updateUsername = async () => {
      if (nextAuthSession?.user?.email) {
        const { data: userData } = await supabase
          .from('user_profiles')
          .select('username')
          .eq('email', nextAuthSession.user.email)
          .single()

        setUsername(userData?.username || null)
      }
    }

    updateUsername()
  }, [nextAuthSession?.user?.email])

  // Combined session check that updates with auth state changes
  const isAuthenticated = Boolean(nextAuthSession || supabaseSession)
  const userEmail = nextAuthSession?.user?.email || supabaseSession?.user?.email

  // Handle logout for both auth methods
  const handleLogout = async () => {
    if (supabaseSession) {
      await supabase.auth.signOut()
      setSupabaseSession(null)
    }
    if (nextAuthSession) {
      await signOut()
    }
    router.push('/login')
  }

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
    { name: "Pediatria", href: "/pediatria", icon: <Baby className="h-4 w-4" /> },
    { name: "Provas", href: "/provas", icon: <GraduationCap className="h-4 w-4" /> },
    { name: "Prova Geral", href: "/prova-geral", icon: <Award className="h-4 w-4" /> },
    { name: "Prova Ped.", href: "/prova-pediatrica", icon: <Award className="h-4 w-4" /> },
    { name: "Documentos", href: "/documentos", icon: <FileText className="h-4 w-4" /> },
    { 
      name: "Sugestões", 
      type: "button",
      onClick: handleOpenSuggestions, 
      icon: <MessageSquare className="h-4 w-4" /> 
    },
  ]

  // Add protected routes array
  const protectedRoutes = ['/provas', '/prova-geral', '/prova-pediatrica', '/documentos']

  const handleNavigation = (href: string) => {
    if (protectedRoutes.some(route => href.startsWith(route)) && !isAuthenticated) {
      setShowLoginAlert(true)
      return false
    }
    return true
  }

  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  }

  const renderNavItem = (item: typeof navItems[0], isMobile = false) => {
    const commonClasses = cn(
      "text-sm font-medium text-[#666666] hover:text-[#6EC1E4]",
      isMobile 
        ? "transition-all duration-300 hover:translate-x-1 flex items-center gap-2" 
        : "transition-colors group relative"
    )

    if (item.type === "button") {
      return (
        <button
          key={item.name}
          onClick={item.onClick}
          className={commonClasses}
        >
          {isMobile && <span className="text-[#6EC1E4]">{item.icon}</span>}
          <span className="relative z-10">{item.name}</span>
          {!isMobile && (
            <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-[#6EC1E4] to-[#B9A9FF] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          )}
        </button>
      )
    }

    const handleClick = (e: React.MouseEvent) => {
      if (!handleNavigation(item.href!)) {
        e.preventDefault()
      }
      if (isMobile) {
        setIsOpen(false)
      }
    }

    return (
      <Link
        key={item.name}
        href={item.href!}
        className={commonClasses}
        onClick={handleClick}
      >
        {isMobile && <span className="text-[#6EC1E4]">{item.icon}</span>}
        <span className="relative z-10">{item.name}</span>
        {!isMobile && (
          <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-[#6EC1E4] to-[#B9A9FF] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
        )}
      </Link>
    )
  }

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled 
          ? "bg-white/80 backdrop-blur-xl shadow-sm" 
          : "bg-transparent"
      )}
    >
      <AlertDialog
        isOpen={showLoginAlert}
        onClose={() => setShowLoginAlert(false)}
        title="Acesso Restrito"
        message="Você precisa fazer login para acessar esta área."
        type="info"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-[#6EC1E4]/5 to-[#B9A9FF]/5" />
      
      <div className="container mx-auto px-4">
        <nav className="relative flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-[#6EC1E4] to-[#B9A9FF] rounded-full opacity-70 blur-lg group-hover:opacity-100 transition-all duration-300" />
              <div className="relative bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-sm">
                <Baby className="h-6 w-6 text-[#6EC1E4] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#6EC1E4] group-hover:to-[#B9A9FF] transition-all duration-300" />
              </div>
            </div>
            <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#333333] to-[#555555] group-hover:from-[#6EC1E4] group-hover:to-[#B9A9FF] transition-all duration-300">
              FisioNeo
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => renderNavItem(item))}
          </div>

          {/* Auth Button */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: navItems.length * 0.1 }}
          >
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <ProfileDropdown 
                  email={userEmail || ''} 
                  username={username}
                  onLogout={handleLogout}
                />
              </div>
            ) : (
              <Link href="/login">
                <MagneticButton
                  backgroundGradient={true}
                  className="px-4 py-2 text-sm font-medium text-white flex items-center gap-1.5"
                >
                  <LogIn className="h-4 w-4" />
                  Entrar
                </MagneticButton>
              </Link>
            )}
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative z-50 p-2 -mr-2 text-[#666666] hover:text-[#6EC1E4] transition-colors"
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial="closed"
                animate="open"
                exit="closed"
                variants={menuVariants}
                className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl shadow-lg md:hidden border-t border-[#E0E0E0]/50"
              >
                <div className="container mx-auto px-4 py-4">
                  <div className="flex flex-col space-y-4">
                    {navItems.map((item) => renderNavItem(item, true))}
                  </div>

                  {/* Mobile Auth Button */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: navItems.length * 0.05 }}
                    className="mt-4 pt-4 border-t border-[#E0E0E0]"
                  >
                    {isAuthenticated ? (
                      <div className="space-y-2">
                        <div className="px-4 py-2 text-sm text-[#666666]">
                          <User className="h-4 w-4 inline-block mr-2" />
                          {userEmail}
                        </div>
                        <button
                          onClick={() => {
                            handleLogout()
                            setIsOpen(false)
                          }}
                          className="w-full text-left text-[#666666] hover:text-[#6EC1E4] transition-all duration-300 text-sm font-medium py-3 px-4 flex items-center gap-3 rounded-lg hover:bg-[#F8F8F8]"
                        >
                          <LogOut className="h-4 w-4 text-[#6EC1E4]" />
                          Sair
                        </button>
                      </div>
                    ) : (
                      <Link
                        href="/login"
                        className="w-full bg-gradient-to-r from-[#6EC1E4] to-[#B9A9FF] text-white py-3 px-4 rounded-lg flex items-center gap-3 hover:shadow-lg transition-all duration-300"
                        onClick={() => setIsOpen(false)}
                      >
                        <LogIn className="h-4 w-4" />
                        Entrar
                      </Link>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </div>

      {/* Progress bar */}
      <div className="h-0.5 bg-gradient-to-r from-[#6EC1E4] via-[#B9A9FF] to-[#6EC1E4] transform origin-left transition-transform duration-300" 
           style={{ 
             transform: `scaleX(${scrolled ? "1" : "0"})`,
             opacity: scrolled ? "1" : "0" 
           }} 
      />
    </header>
  )
}
