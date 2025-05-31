"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export default function MobileInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowBanner(true)
    }

    window.addEventListener("beforeinstallprompt", handler)

    return () => {
      window.removeEventListener("beforeinstallprompt", handler)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === "accepted") {
      setShowBanner(false)
    }

    setDeferredPrompt(null)
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-[100]">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-[#6EC1E4] to-[#B9A9FF] rounded-xl flex items-center justify-center">
            <Image
              src="/icons/baby-boy.png"
              alt="Fisioneo"
              width={32}
              height={32}
              className="rounded-lg"
            />
          </div>
          <div>
            <p className="font-medium text-gray-900">Fisioneo</p>
            <p className="text-sm text-gray-500">Instale nosso app</p>
          </div>
        </div>
        <button
          onClick={handleInstall}
          className="bg-gradient-to-r from-[#6EC1E4] to-[#B9A9FF] text-white px-6 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Instalar
        </button>
      </div>
    </div>
  )
} 