import { RequireAuth } from "@/components/auth/require-auth"

export default function ProvasLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <RequireAuth>{children}</RequireAuth>
} 