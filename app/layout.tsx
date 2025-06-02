import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ParallaxBackground from "@/components/parallax-background"
import AIAssistant from "@/components/ai-assistant"
import OnboardingWalkthrough from "@/components/onboarding-walkthrough"
import { SmoothScrollProvider } from '@/components/animations/smooth-scroll'
import { Providers } from "./providers"
import MobileInstallBanner from "@/components/mobile-install-banner"
import ServiceWorkerRegister from "@/components/service-worker-register"
import Notification from "@/components/notification"
import { cn } from "@/lib/utils"
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Fisioneo",
  description: "Portal educacional sobre fisioterapia neonatal",
  icons: {
    icon: "/icons/baby-boy.png",
    shortcut: "/icons/baby-boy.png",
    apple: "/icons/baby-boy.png"
  },
  manifest: "/manifest.json"
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
        <ServiceWorkerRegister />
        <MobileInstallBanner />
        <Providers>
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
              <Notification />
            </div>
          </SmoothScrollProvider>
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
