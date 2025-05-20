import { RequireAuth } from "@/components/auth/require-auth"

export default function ProvaPediatricaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <RequireAuth>{children}</RequireAuth>
} 