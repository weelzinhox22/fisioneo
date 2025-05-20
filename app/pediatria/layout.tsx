import { RequireAuth } from "@/components/auth/require-auth"

export default function PediatriaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <RequireAuth>{children}</RequireAuth>
} 