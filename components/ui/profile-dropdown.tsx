"use client"

import * as React from "react"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { motion, AnimatePresence } from "framer-motion"
import { User, Settings, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

interface ProfileDropdownProps {
  email: string
  username?: string | null
  onLogout: () => Promise<void>
}

export function ProfileDropdown({ email, username, onLogout }: ProfileDropdownProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = React.useState(false)

  const displayName = username || email

  return (
    <DropdownMenu.Root open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenu.Trigger asChild>
        <button className="flex items-center gap-2 text-sm text-[#666666] hover:text-[#6EC1E4] transition-colors outline-none">
          <User className="h-4 w-4 inline-block" />
          <span>{displayName}</span>
        </button>
      </DropdownMenu.Trigger>

      <AnimatePresence>
        {isOpen && (
          <DropdownMenu.Portal forceMount>
            <DropdownMenu.Content
              align="end"
              sideOffset={5}
              asChild
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="z-50 min-w-[240px] overflow-hidden rounded-xl border border-white/20 bg-white/95 backdrop-blur-xl shadow-lg"
              >
                <div className="flex flex-col">
                  {/* Header */}
                  <div className="px-4 py-3 border-b border-[#E0E0E0]">
                    <p className="text-sm font-medium text-[#333333]">
                      {username || "Perfil"}
                    </p>
                    <p className="text-xs text-[#666666] mt-0.5">{email}</p>
                  </div>

                  {/* Menu Items */}
                  <div className="p-2">
                    <DropdownMenu.Item asChild>
                      <button
                        onClick={() => router.push('/perfil')}
                        className="w-full flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-[#666666] hover:text-[#6EC1E4] hover:bg-[#F8F8F8] transition-all outline-none cursor-pointer"
                      >
                        <Settings className="h-4 w-4" />
                        Configurações
                      </button>
                    </DropdownMenu.Item>

                    <DropdownMenu.Separator className="h-px bg-[#E0E0E0] my-1" />

                    <DropdownMenu.Item asChild>
                      <button
                        onClick={onLogout}
                        className="w-full flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-all outline-none cursor-pointer"
                      >
                        <LogOut className="h-4 w-4" />
                        Sair
                      </button>
                    </DropdownMenu.Item>
                  </div>
                </div>
              </motion.div>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        )}
      </AnimatePresence>
    </DropdownMenu.Root>
  )
} 