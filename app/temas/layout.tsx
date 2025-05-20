"use client"

import { RequireAuth } from "@/components/auth/require-auth-new"
import Paywall from "@/components/paywall"
import { Skeleton } from "@/components/ui/skeleton"
import { usePageAccess } from "@/hooks/usePageAccess"
import { usePathname } from "next/navigation"

export default function TemasLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  
  // Usar o hook de acesso às páginas de temas
  const { loading, hasAccess, remainingViews, viewCount } = usePageAccess({
    pagePath: pathname,
    viewLimit: 2,
    requiresPayment: true,
  });
  
  return (
    <RequireAuth>
      {loading ? (
        <div className="container mx-auto px-4 py-12">
          <Skeleton className="h-[600px] w-full rounded-xl" />
        </div>
      ) : !hasAccess ? (
        <Paywall
          title="Acesso Limitado aos Temas de Fisioterapia"
          description="Você já visualizou esta página 2 vezes. Para continuar acessando este conteúdo e todos os materiais exclusivos da Fisioneo, assine agora o plano Premium."
          redirectUrl="https://pay.kiwify.com.br/RIjocp1"
          hasAccess={hasAccess}
          remainingViews={remainingViews}
          maxViews={2}
        />
      ) : (
        <>
          {/* Aviso de visualizações restantes */}
          {remainingViews > 0 && (
            <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-2 mb-4 rounded-md mx-auto max-w-7xl mt-4">
              <p className="text-sm font-medium">
                Você tem {remainingViews} {remainingViews === 1 ? 'visualização restante' : 'visualizações restantes'} 
                nesta página. Após isso, será necessário assinar o plano Premium para continuar acessando.
              </p>
            </div>
          )}
          
          {/* Adicionar uma mensagem de debug */}
          <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-2 mb-4 rounded-md mx-auto max-w-7xl mt-4">
            <p className="text-sm font-medium">
              [DEBUG] Informações: Página: {pathname} | Visualizações: {viewCount} | Restantes: {remainingViews}
            </p>
          </div>
          
          {children}
        </>
      )}
    </RequireAuth>
  )
} 