"use client"

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RequireAuth } from "@/components/auth/require-auth-new";

export default function AssinaturaPage() {
  const [loading, setLoading] = useState(false);

  return (
    <RequireAuth>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Assinatura Fisioneo Premium</h1>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-6">Acesso Ilimitado ao Conteúdo Exclusivo</h2>
            
            <div className="mb-8">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1 bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-lg border border-blue-100">
                  <h3 className="text-xl font-semibold mb-4 text-blue-700">O que está incluído:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Acesso completo a todo o material educativo</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Estudos de casos clínicos detalhados</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Atualizações constantes com novos conteúdos</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Áreas especializadas: pediatria, traumato-ortopedia, neurologia e mais</span>
                    </li>
                  </ul>
                </div>
                
                <div className="flex-1 bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg border border-green-100">
                  <h3 className="text-xl font-semibold mb-4 text-emerald-700">Benefícios:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-emerald-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Aprendizado a seu ritmo, quando e onde quiser</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-emerald-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Conteúdo baseado em evidências científicas atuais</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-emerald-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Melhore suas habilidades clínicas e teóricas</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-emerald-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Destaque-se no mercado de trabalho</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="mt-8 border-t border-gray-200 pt-8">
              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-600 mb-1">Plano Premium</p>
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold">R$29,90</span>
                      <span className="text-gray-500 ml-1">/mês</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Cancele a qualquer momento</p>
                  </div>
                  <Button
                    className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white"
                    size="lg"
                    onClick={() => {
                      setLoading(true);
                      window.location.href = "https://pay.kiwify.com.br/RIjocp1";
                    }}
                    disabled={loading}
                  >
                    {loading ? "Redirecionando..." : "Assinar agora"}
                  </Button>
                </div>
              </div>
              
              <p className="text-sm text-gray-500 mt-4">
                Ao assinar, você concorda com nossos <Link href="/termos" className="text-blue-600 hover:underline">Termos de Serviço</Link> e 
                <Link href="/privacidade" className="text-blue-600 hover:underline"> Política de Privacidade</Link>.
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-2xl font-semibold mb-6">Perguntas Frequentes</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Como funciona a assinatura?</h3>
                <p className="text-gray-600">
                  Após assinar, você terá acesso ilimitado a todo o conteúdo da plataforma Fisioneo. 
                  O pagamento é processado pela Kiwify, uma plataforma segura de pagamentos.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Posso cancelar a qualquer momento?</h3>
                <p className="text-gray-600">
                  Sim, você pode cancelar sua assinatura a qualquer momento através da plataforma Kiwify
                  ou entrando em contato com nosso suporte.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">O que acontece após o cancelamento?</h3>
                <p className="text-gray-600">
                  Após cancelar, você continuará com acesso até o final do período pago. 
                  Depois disso, seu acesso será limitado novamente a 2 visualizações por página.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Como faço para obter suporte?</h3>
                <p className="text-gray-600">
                  Para qualquer dúvida ou problema, entre em contato pelo email 
                  <a href="mailto:contato@fisioneo.com" className="text-blue-600 hover:underline"> contato@fisioneo.com</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RequireAuth>
  );
} 