"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export default function MobileInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showBanner, setShowBanner] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isIOS, setIsIOS] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Detectar se é mobile e qual plataforma
      const checkDevice = () => {
        const userAgent = navigator.userAgent.toLowerCase();
        const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
        const isIOSDevice = /iphone|ipad|ipod/i.test(userAgent);
        setIsMobile(isMobileDevice);
        setIsIOS(isIOSDevice);
        // Verificar se já está instalado ou foi dispensado
        const alreadyInstalled = window.matchMedia('(display-mode: standalone)').matches;
        const dismissed = localStorage.getItem("hideMobileInstallBanner");
        if (isMobileDevice && !alreadyInstalled && !dismissed) {
          setShowBanner(true);
        }
      };
      checkDevice();
      window.addEventListener('resize', checkDevice);
      // Capturar o evento beforeinstallprompt quando disponível
      const handler = (e: any) => {
        e.preventDefault();
        setDeferredPrompt(e);
        setShowBanner(true);
      };
      window.addEventListener("beforeinstallprompt", handler);
      // Esconder banner se app for instalado
      window.addEventListener('appinstalled', () => {
        setShowBanner(false);
        localStorage.setItem("hideMobileInstallBanner", "true");
      });
      return () => {
        window.removeEventListener("beforeinstallprompt", handler);
        window.removeEventListener('appinstalled', () => {});
        window.removeEventListener('resize', checkDevice);
      };
    }
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setShowBanner(false);
        localStorage.setItem("hideMobileInstallBanner", "true");
      }
      setDeferredPrompt(null);
    } else {
      // Abrir tutorial detalhado
      showTutorial();
    }
  };

  const showTutorial = () => {
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0,0,0,0.85)';
    modal.style.zIndex = '10000';
    modal.style.display = 'flex';
    modal.style.flexDirection = 'column';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.color = 'white';
    modal.style.padding = '20px';
    modal.style.textAlign = 'center';
    let html = '';
    if (isIOS) {
      html = `
        <div style=\"max-width: 340px; background: white; border-radius: 12px; padding: 20px; color: black;\">
          <h3 style=\"font-size: 18px; font-weight: bold; margin-bottom: 15px;\">Como instalar no iPhone/iPad</h3>
          <ol style=\"text-align: left; margin-bottom: 15px; font-size: 15px;\">
            <li style=\"margin-bottom: 10px;\">1. Toque no ícone <span style='font-size:20px;'>⬆️</span> <b>Compartilhar</b> na barra inferior do Safari.</li>
            <li style=\"margin-bottom: 10px;\">2. Role para baixo e toque em <b>Adicionar à Tela de Início</b>.</li>
            <li>3. Confirme em <b>Adicionar</b>.</li>
          </ol>
          <button id=\"close-modal\" style=\"background: linear-gradient(to right, #6EC1E4, #B9A9FF); border: none; color: white; padding: 8px 16px; border-radius: 20px; font-weight: 500;\">Entendi</button>
        </div>
      `;
    } else {
      html = `
        <div style=\"max-width: 340px; background: white; border-radius: 12px; padding: 20px; color: black;\">
          <h3 style=\"font-size: 18px; font-weight: bold; margin-bottom: 15px;\">Como instalar no Android</h3>
          <ol style=\"text-align: left; margin-bottom: 15px; font-size: 15px;\">
            <li style=\"margin-bottom: 10px;\">1. Toque no menu <span style='font-size:20px;'>⋮</span> (três pontos) no canto superior direito do navegador.</li>
            <li style=\"margin-bottom: 10px;\">2. Toque em <b>Instalar aplicativo</b> ou <b>Adicionar à tela inicial</b>.</li>
            <li>3. Confirme em <b>Instalar</b>.</li>
          </ol>
          <button id=\"close-modal\" style=\"background: linear-gradient(to right, #6EC1E4, #B9A9FF); border: none; color: white; padding: 8px 16px; border-radius: 20px; font-weight: 500;\">Entendi</button>
        </div>
      `;
    }
    modal.innerHTML = html;
    document.body.appendChild(modal);
    document.getElementById('close-modal')?.addEventListener('click', () => {
      document.body.removeChild(modal);
    });
  };

  const handleDismiss = () => {
    setShowBanner(false);
    localStorage.setItem("hideMobileInstallBanner", "true");
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-[9999]">
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
        <div className="flex items-center">
          <button
            onClick={handleInstall}
            className="bg-gradient-to-r from-[#6EC1E4] to-[#B9A9FF] text-white px-6 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
          >
            {deferredPrompt ? "Instalar" : "Como instalar"}
          </button>
          <button 
            onClick={handleDismiss}
            className="ml-2 p-1 rounded-full hover:bg-gray-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
} 