"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { User, Mail, Key, Edit2, Check, X } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { useSession } from "next-auth/react"
import { AlertDialog } from "@/components/ui/alert-dialog"

export default function ProfilePage() {
  const { data: nextAuthSession } = useSession()
  const [supabaseSession, setSupabaseSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [tempUsername, setTempUsername] = useState("")
  const [showAlert, setShowAlert] = useState(false)
  const [alertConfig, setAlertConfig] = useState({
    title: "",
    message: "",
    type: "success" as const
  })

  useEffect(() => {
    const checkSupabaseAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setSupabaseSession(session)
      
      // Fetch username from metadata
      const { data: userData, error } = await supabase
        .from('user_profiles')
        .select('username')
        .eq('user_id', session?.user?.id || nextAuthSession?.user?.email)
        .single()

      if (userData?.username) {
        setUsername(userData.username)
      }
      
      setLoading(false)
    }

    checkSupabaseAuth()
  }, [nextAuthSession?.user?.email])

  const userEmail = nextAuthSession?.user?.email || supabaseSession?.user?.email

  const handleSaveUsername = async () => {
    if (!tempUsername.trim()) {
      setAlertConfig({
        title: "Erro",
        message: "O nome de usuário não pode estar vazio",
        type: "info"
      })
      setShowAlert(true)
      return
    }

    try {
      const userId = supabaseSession?.user?.id || nextAuthSession?.user?.email

      const { data, error } = await supabase
        .from('user_profiles')
        .upsert({
          user_id: userId,
          username: tempUsername,
          updated_at: new Date().toISOString()
        })

      if (error) throw error

      setUsername(tempUsername)
      setIsEditing(false)
      setAlertConfig({
        title: "Sucesso!",
        message: "Nome de usuário atualizado com sucesso",
        type: "success"
      })
      setShowAlert(true)
    } catch (error: any) {
      setAlertConfig({
        title: "Erro",
        message: error.message,
        type: "info"
      })
      setShowAlert(true)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#6EC1E4]"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      <AlertDialog
        isOpen={showAlert}
        onClose={() => setShowAlert(false)}
        title={alertConfig.title}
        message={alertConfig.message}
        type={alertConfig.type}
      />
      
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#333333] mb-2">Perfil do Usuário</h1>
            <p className="text-[#666666]">Gerencie suas informações pessoais</p>
          </div>

          {/* Profile Card */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6">
            {/* User Info */}
            <div className="space-y-6">
              {/* Username Section */}
              <div className="flex items-center gap-4 p-4 bg-[#F8F8F8] rounded-xl">
                <div className="p-3 bg-white rounded-full">
                  <User className="h-6 w-6 text-[#6EC1E4]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-[#666666]">Nome de Usuário</p>
                  {isEditing ? (
                    <div className="flex items-center gap-2 mt-1">
                      <input
                        type="text"
                        value={tempUsername}
                        onChange={(e) => setTempUsername(e.target.value)}
                        className="flex-1 px-3 py-1 rounded-lg border border-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-[#6EC1E4] text-[#333333]"
                        placeholder="Digite seu nome de usuário"
                        autoFocus
                      />
                      <button
                        onClick={handleSaveUsername}
                        className="p-1.5 rounded-lg bg-[#6EC1E4]/10 text-[#6EC1E4] hover:bg-[#6EC1E4]/20 transition-colors"
                      >
                        <Check className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {
                          setIsEditing(false)
                          setTempUsername(username)
                        }}
                        className="p-1.5 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <p className="text-[#333333] font-medium">
                        {username || "Não definido"}
                      </p>
                      <button
                        onClick={() => {
                          setTempUsername(username)
                          setIsEditing(true)
                        }}
                        className="p-1.5 rounded-lg text-[#666666] hover:text-[#6EC1E4] hover:bg-[#6EC1E4]/10 transition-colors"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Email Section */}
              <div className="flex items-center gap-4 p-4 bg-[#F8F8F8] rounded-xl">
                <div className="p-3 bg-white rounded-full">
                  <Mail className="h-6 w-6 text-[#6EC1E4]" />
                </div>
                <div>
                  <p className="text-sm text-[#666666]">Email</p>
                  <p className="text-[#333333] font-medium">{userEmail}</p>
                </div>
              </div>

              {/* Auth Provider */}
              <div className="flex items-center gap-4 p-4 bg-[#F8F8F8] rounded-xl">
                <div className="p-3 bg-white rounded-full">
                  <Key className="h-6 w-6 text-[#6EC1E4]" />
                </div>
                <div>
                  <p className="text-sm text-[#666666]">Método de Login</p>
                  <p className="text-[#333333] font-medium">
                    {nextAuthSession ? "Google" : "Email e Senha"}
                  </p>
                </div>
              </div>
            </div>

            {/* Coming Soon Section */}
            <div className="mt-8 p-4 bg-[#F8F8F8] rounded-xl">
              <p className="text-center text-sm text-[#666666]">
                Mais configurações de perfil em breve! 🚀
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 