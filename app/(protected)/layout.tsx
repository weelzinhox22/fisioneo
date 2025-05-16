import { RequireAuth } from "@/components/auth/require-auth-new"

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <RequireAuth>{children}</RequireAuth>
} 