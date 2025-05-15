import { RequireAuth } from "@/components/auth/require-auth"

export default function ProvaGeralLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <RequireAuth>{children}</RequireAuth>
} 