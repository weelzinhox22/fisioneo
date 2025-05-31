"use client"

import { useEffect } from "react"

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator && typeof window !== "undefined") {
      // Registrar o service worker quando a página carregar completamente
      window.addEventListener("load", async () => {
        try {
          // Verificar se há uma versão anterior do service worker
          const registrations = await navigator.serviceWorker.getRegistrations();
          for (let registration of registrations) {
            // Forçar atualização de service workers antigos
            await registration.update();
          }
          
          // Registrar o service worker
          const registration = await navigator.serviceWorker.register("/service-worker.js", {
            scope: "/"
          });
          
          console.log("Service Worker registrado com sucesso:", registration.scope);
          
          // Verificar por atualizações do service worker
          registration.addEventListener("updatefound", () => {
            const newWorker = registration.installing;
            console.log("Novo Service Worker instalando:", newWorker);
            
            // Quando o novo service worker estiver instalado
            newWorker?.addEventListener("statechange", () => {
              if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
                console.log("Novo conteúdo disponível! Recarregando...");
                // Forçar atualização da página para usar o novo service worker
                window.location.reload();
              }
            });
          });
          
          // Detectar quando o service worker controlar a página
          if (navigator.serviceWorker.controller) {
            console.log("Esta página está sendo controlada por:", navigator.serviceWorker.controller);
          }
          
          // Verificar se há uma nova versão do service worker
          navigator.serviceWorker.addEventListener("controllerchange", () => {
            console.log("Controlador do Service Worker mudou");
          });
          
          // Verificar se o app está sendo executado no modo standalone (instalado)
          const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
          if (isStandalone) {
            console.log("Aplicativo está rodando no modo standalone (instalado)");
          }
          
        } catch (error) {
          console.error("Erro ao registrar Service Worker:", error);
        }
      });
    }
  }, []);

  return null;
} 