import { RequireAuth } from "@/components/auth/require-auth"

export default function TemasLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <RequireAuth>{children}</RequireAuth>
} 