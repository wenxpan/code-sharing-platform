"use client"

import { useAppUser } from "@/lib/useAppUser"
import { redirect } from "next/navigation"
import { useRouter } from "next/navigation"

const DashboardPage = () => {
  const { status, user } = useAppUser()
  const router = useRouter()

  if (status === "unauthenticated") {
    router.push("/")
  }

  if (user && user.role === "coder") {
    router.push("/dashboard/coder")
  }

  if (
    user &&
    (user.role === "businessEmployee" || user.role === "businessAdmin")
  ) {
    router.push("/dashboard/business")
  }
}

export default DashboardPage
