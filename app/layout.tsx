import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ParallaxBackground from "@/components/parallax-background"
import AIAssistant from "@/components/ai-assistant"
import OnboardingWalkthrough from "@/components/onboarding-walkthrough"
import { SmoothScrollProvider } from '@/components/animations/smooth-scroll'
import { Providers } from "./providers"
import { useEffect, useState } from "react"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Fisioneo",
  description: "Plataforma de fisioterapia neonatal e pediátrica",
  icons: {
    icon: "/baby-icon.svg",
  },
  manifest: "/manifest.json"
}

function MobileInstallBanner() {
  const [show, setShow] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isMobile = window.innerWidth < 768
      const dismissed = localStorage.getItem("hideMobileInstallBanner")
      if (isMobile && !dismissed) setShow(true)
      // Captura o evento beforeinstallprompt
      const handler = (e: any) => {
        e.preventDefault()
        setDeferredPrompt(e)
      }
      window.addEventListener("beforeinstallprompt", handler)
      return () => window.removeEventListener("beforeinstallprompt", handler)
    }
  }, [])
  if (!show) return null
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[95vw] max-w-md bg-gradient-to-r from-[#6EC1E4] to-[#B9A9FF] text-white rounded-2xl shadow-xl px-5 py-4 flex items-center gap-4 animate-fade-in">
      <span className="flex-1 text-base font-medium">
        📱 Acessando pelo celular? <span className="font-bold">Instale nosso app</span> e tenha acesso facilitado!
      </span>
      {deferredPrompt && (
        <button
          onClick={async () => {
            deferredPrompt.prompt()
            const { outcome } = await deferredPrompt.userChoice
            if (outcome === "accepted") {
              setShow(false)
              localStorage.setItem("hideMobileInstallBanner", "1")
            }
          }}
          className="ml-2 px-3 py-1 rounded-full bg-white/90 text-[#6EC1E4] font-semibold shadow hover:bg-white hover:text-[#B9A9FF] transition-all"
        >
          Instalar
        </button>
      )}
      <button onClick={() => { setShow(false); localStorage.setItem("hideMobileInstallBanner", "1") }} className="ml-2 p-1 rounded-full hover:bg-white/20 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
      </button>
    </div>
  )
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        {/* Add any additional head elements here */}
      </head>
      <body className={`${inter.variable} font-sans min-h-screen bg-[#F7FAFC]`}>
        <MobileInstallBanner />
        <Providers>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <SmoothScrollProvider options={{ lerp: 0.08, duration: 1.0, smoothTouch: false }}>
              <ParallaxBackground speed={0.2} direction="up">
                <div className="absolute inset-0 bg-gradient-to-b from-[#F0F9FF] to-[#F7FAFC] opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#F0F9FF]/10 to-[#F7FAFC]/10 bg-repeat opacity-5" />
              </ParallaxBackground>
              <div className="flex min-h-screen flex-col">
                <Navbar />
                <main className="flex-1">{children}</main>
                <Footer />
                <AIAssistant />
                <OnboardingWalkthrough />
              </div>
            </SmoothScrollProvider>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}
