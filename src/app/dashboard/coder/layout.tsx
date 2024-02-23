"use client"

import { useAppUser } from "@/lib/useAppUser"
import { useRouter } from "next/navigation"

export default function CoderDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { user } = useAppUser()
  const router = useRouter()

  if (user && user.role !== "coder") {
    router.push("/dashboard")
  }

  return <>{children}</>
}
