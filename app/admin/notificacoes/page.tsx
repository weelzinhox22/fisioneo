"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast"
import { Bell, ArrowLeft, Send, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useNotifications } from "@/components/notification-handler"

export default function NotificacoesAdminPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { sendLocalNotification } = useNotifications()
  const [form, setForm] = useState({
    title: "Lembrete de Estudo - FisioNeo",
    body: "Não se esqueça de estudar para a prova de Fisioterapia Neonatal! Revise o conteúdo no FisioNeo.",
    url: "/prova-geral",
    icon: "/icons/baby-boy.png",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/notifications/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          tags: ['prova', 'fisioterapia-neonatal']
        }),
      })

      if (!response.ok) {
        throw new Error(`Status: ${response.status} - ${response.statusText}`)
      }

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Notificações enviadas!",
          description: `Enviadas com sucesso para ${data.sent} dispositivos. Falhas: ${data.failed}.`,
          variant: "default",
        })
      } else {
        toast({
          title: "Erro ao enviar notificações",
          description: data.error || "Não foi possível enviar as notificações. Tente novamente.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Erro ao enviar notificações:", error)
      toast({
        title: "Erro",
        description: "Não foi possível enviar as notificações. Verifique a conexão com o servidor.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSendLocalNotification = async () => {
    setLoading(true)
    try {
      await sendLocalNotification(form.title, {
        body: form.body,
        icon: form.icon,
        badge: "/icons/baby-icon-192.png",
        vibrate: [100, 50, 100],
        data: {
          url: form.url,
          dateOfArrival: Date.now()
        },
        actions: [
          {
            action: "explore",
            title: "Ver agora",
            icon: "/icons/baby-icon-192.png"
          },
          {
            action: "close",
            title: "Depois",
            icon: "/icons/baby-icon-192.png"
          }
        ]
      })
      
      toast({
        title: "Notificação local enviada!",
        description: "A notificação foi enviada com sucesso para este dispositivo.",
        variant: "default",
      })
    } catch (error) {
      console.error("Erro ao enviar notificação local:", error)
      toast({
        title: "Erro",
        description: "Não foi possível enviar a notificação local. Verifique as permissões do navegador.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/admin" className="inline-flex items-center text-blue-500 hover:text-blue-700 mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar para Administração
        </Link>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Enviar Notificações Push</h1>
        <p className="text-gray-600">
          Envie notificações push para todos os usuários que permitiram receber alertas.
        </p>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-yellow-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              <strong>Atenção:</strong> Se você estiver em ambiente de desenvolvimento, use a opção "Testar Notificação Local" 
              para testar a funcionalidade sem precisar de configuração completa.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Título da Notificação
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-1">
              Conteúdo da Mensagem
            </label>
            <textarea
              id="body"
              name="body"
              value={form.body}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
                URL de Destino
              </label>
              <input
                type="text"
                id="url"
                name="url"
                value={form.url}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Página para onde o usuário será direcionado ao clicar na notificação
              </p>
            </div>

            <div>
              <label htmlFor="icon" className="block text-sm font-medium text-gray-700 mb-1">
                Ícone
              </label>
              <input
                type="text"
                id="icon"
                name="icon"
                value={form.icon}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Caminho para o ícone que será exibido na notificação
              </p>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <Bell className="h-5 w-5 text-blue-500 mt-0.5 mr-3" />
              <div>
                <h3 className="text-sm font-medium text-blue-800">Prévia da Notificação</h3>
                <div className="mt-2 bg-white rounded border border-gray-200 p-3">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
                      {form.icon && (
                        <img src={form.icon} alt="Ícone" className="h-full w-full object-cover" />
                      )}
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-sm">{form.title || "Título da Notificação"}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{form.body || "Conteúdo da mensagem aqui..."}</p>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  Esta é uma prévia aproximada. A aparência exata pode variar de acordo com o dispositivo e navegador do usuário.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <button
              type="button"
              onClick={handleSendLocalNotification}
              disabled={loading}
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <Bell className="h-5 w-5 mr-2" />
              Testar Notificação Local
            </button>
            
            <button
              type="submit"
              disabled={loading}
              className={`inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="h-5 w-5 mr-2" />
                  Enviar Notificação
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
