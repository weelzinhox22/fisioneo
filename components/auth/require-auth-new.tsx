"use client"

import React from "react"

export function RequireAuth({ children }: { children: React.ReactNode }) {
  // Agora sempre renderiza o conteúdo sem verificar autenticação
    return <>{children}</>
} 