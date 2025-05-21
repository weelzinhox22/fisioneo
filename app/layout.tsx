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

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Fisioterapia Neonatal e Pediátrica",
  description: "Portal educacional sobre Fisioterapia Neonatal e Pediátrica"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans min-h-screen bg-[#F7FAFC]`}>
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
