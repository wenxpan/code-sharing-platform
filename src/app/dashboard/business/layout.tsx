"use client"

import { useAppUser } from "@/lib/useAppUser"
import { useRouter } from "next/navigation"

export default function BusinessDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { user } = useAppUser()
  const router = useRouter()

  if (
    user &&
    user.role !== "businessAdmin" &&
    user.role !== "businessEmployee"
  ) {
    router.push("/dashboard")
  }

  return <>{children}</>
}
