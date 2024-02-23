"use client"

import { useAppUser } from "@/lib/useAppUser"
import { useRouter } from "next/navigation"

export default function CoderDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { status } = useAppUser()
  const router = useRouter()

  if (status === "unauthenticated") {
    router.push("/")
  }

  return <>{children}</>
}
