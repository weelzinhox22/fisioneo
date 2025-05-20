"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { User, Mail, Key, Edit2, Check, X, Bell, Shield, Trash2, Lock } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { useSession } from "next-auth/react"
import { AlertDialog } from "@/components/ui/alert-dialog"
import { useRouter } from "next/navigation"

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
    type: "success" as "success" | "error" | "info"
  })
  const [emailPreferences, setEmailPreferences] = useState({
    marketing: false,
    updates: true,
    security: true
  })
  const router = useRouter()

  useEffect(() => {
    const checkSupabaseAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setSupabaseSession(session)
      
      // Fetch username from metadata
      const { data: userData, error } = await supabase
        .from('user_profiles')
        .select('username, email_preferences')
        .eq('user_id', session?.user?.id || nextAuthSession?.user?.email)
        .single()

      if (userData?.username) {
        setUsername(userData.username)
      }
      if (userData?.email_preferences) {
        setEmailPreferences(userData.email_preferences)
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

      // First check if a profile exists
      const { data: existingProfile } = await supabase
        .from('user_profiles')
        .select()
        .eq('user_id', userId)
        .single()

      let operation
      if (existingProfile) {
        // Update existing profile
        operation = supabase
          .from('user_profiles')
          .update({
            username: tempUsername,
            updated_at: new Date().toISOString()
          })
          .eq('user_id', userId)
      } else {
        // Insert new profile
        operation = supabase
          .from('user_profiles')
          .insert({
            user_id: userId,
            username: tempUsername,
            updated_at: new Date().toISOString(),
            email_preferences: {
              marketing: false,
              updates: true,
              security: true
            }
          })
      }

      const { error } = await operation

      if (error) {
        console.error('Error saving username:', error)
        throw new Error('Erro ao salvar o nome de usuário. Por favor, tente novamente.')
      }

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
        message: error.message || "Erro ao atualizar o nome de usuário",
        type: "info"
      })
      setShowAlert(true)
    }
  }

  const handleResetPassword = async () => {
    try {
      if (!userEmail) throw new Error("Email não encontrado")

      const { error } = await supabase.auth.resetPasswordForEmail(userEmail, {
        redirectTo: `${window.location.origin}/auth/callback?next=/perfil`,
      })

      if (error) throw error

      setAlertConfig({
        title: "Email Enviado!",
        message: "Verifique sua caixa de entrada para redefinir sua senha.",
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

  const handleUpdateEmailPreferences = async (key: keyof typeof emailPreferences) => {
    try {
      const userId = supabaseSession?.user?.id || nextAuthSession?.user?.email
      const newPreferences = {
        ...emailPreferences,
        [key]: !emailPreferences[key]
      }

      const { error } = await supabase
        .from('user_profiles')
        .update({ 
          email_preferences: newPreferences,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId)

      if (error) throw error

      setEmailPreferences(newPreferences)
      setAlertConfig({
        title: "Sucesso!",
        message: "Preferências de email atualizadas",
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

  const handleDeleteAccount = async () => {
    try {
      const userId = supabaseSession?.user?.id || nextAuthSession?.user?.email

      // Delete user profile first
      const { error: profileError } = await supabase
        .from('user_profiles')
        .delete()
        .eq('user_id', userId)

      if (profileError) throw profileError

      // If using Supabase auth, delete the auth user
      if (supabaseSession) {
        const { error: authError } = await supabase.auth.admin.deleteUser(
          supabaseSession.user.id
        )
        if (authError) throw authError
      }

      setAlertConfig({
        title: "Conta Excluída",
        message: "Sua conta foi excluída com sucesso. Você será redirecionado em breve.",
        type: "success"
      })
      setShowAlert(true)

      // Redirect after a short delay
      setTimeout(() => {
        router.push('/')
      }, 2000)
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
          className="max-w-2xl mx-auto space-y-8"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#333333] mb-2">Perfil do Usuário</h1>
            <p className="text-[#666666]">Gerencie suas informações pessoais</p>
          </div>

          {/* Profile Card */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6">
            <h2 className="text-xl font-semibold text-[#333333] mb-4">Informações Pessoais</h2>
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
                <div className="flex-1">
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
          </div>

          {/* Security Card */}
          {!nextAuthSession && (
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6">
              <h2 className="text-xl font-semibold text-[#333333] mb-4">Segurança</h2>
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-[#F8F8F8] rounded-xl">
                  <div className="p-3 bg-white rounded-full">
                    <Lock className="h-6 w-6 text-[#6EC1E4]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-[#666666]">Senha</p>
                    <p className="text-[#333333] text-sm mt-1">
                      Altere sua senha para manter sua conta segura
                    </p>
                    <button
                      onClick={handleResetPassword}
                      className="mt-2 px-4 py-2 text-sm bg-[#6EC1E4]/10 text-[#6EC1E4] rounded-lg hover:bg-[#6EC1E4]/20 transition-colors"
                    >
                      Redefinir Senha
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Email Preferences Card */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6">
            <h2 className="text-xl font-semibold text-[#333333] mb-4">Preferências de Email</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-[#F8F8F8] rounded-xl">
                <div className="flex items-center gap-3">
                  <Bell className="h-5 w-5 text-[#6EC1E4]" />
                  <div>
                    <p className="text-sm font-medium text-[#333333]">Atualizações da Plataforma</p>
                    <p className="text-xs text-[#666666]">Receba notificações sobre novos recursos</p>
                  </div>
                </div>
                <button
                  onClick={() => handleUpdateEmailPreferences('updates')}
                  className={`w-12 h-6 rounded-full transition-colors relative ${
                    emailPreferences.updates ? 'bg-[#6EC1E4]' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                      emailPreferences.updates ? 'right-1' : 'left-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-[#F8F8F8] rounded-xl">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-[#6EC1E4]" />
                  <div>
                    <p className="text-sm font-medium text-[#333333]">Alertas de Segurança</p>
                    <p className="text-xs text-[#666666]">Seja notificado sobre atividades suspeitas</p>
                  </div>
                </div>
                <button
                  onClick={() => handleUpdateEmailPreferences('security')}
                  className={`w-12 h-6 rounded-full transition-colors relative ${
                    emailPreferences.security ? 'bg-[#6EC1E4]' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                      emailPreferences.security ? 'right-1' : 'left-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-[#F8F8F8] rounded-xl">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-[#6EC1E4]" />
                  <div>
                    <p className="text-sm font-medium text-[#333333]">Emails de Marketing</p>
                    <p className="text-xs text-[#666666]">Receba novidades e ofertas especiais</p>
                  </div>
                </div>
                <button
                  onClick={() => handleUpdateEmailPreferences('marketing')}
                  className={`w-12 h-6 rounded-full transition-colors relative ${
                    emailPreferences.marketing ? 'bg-[#6EC1E4]' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                      emailPreferences.marketing ? 'right-1' : 'left-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-red-200 p-6">
            <h2 className="text-xl font-semibold text-red-600 mb-4">Zona de Perigo</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <Trash2 className="h-5 w-5 text-red-600" />
                  <div>
                    <p className="text-sm font-medium text-red-600">Excluir Conta</p>
                    <p className="text-xs text-red-500">Esta ação não pode ser desfeita</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    const confirmed = window.confirm(
                      "Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita."
                    )
                    if (confirmed) {
                      handleDeleteAccount()
                    }
                  }}
                  className="px-4 py-2 text-sm bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                >
                  Excluir
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 