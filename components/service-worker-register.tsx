"use client"

import { useEffect } from "react"

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator && typeof window !== "undefined") {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/service-worker.js")
          .then((registration) => {
            console.log("Service Worker registrado com sucesso:", registration.scope);
          })
          .catch((error) => {
            console.error("Erro ao registrar Service Worker:", error);
          });
      });
    }
  }, []);

  return null;
} 