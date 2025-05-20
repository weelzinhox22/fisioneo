import { RequireAuth } from "@/components/auth/require-auth"

export default function DocumentosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <RequireAuth>{children}</RequireAuth>
} 