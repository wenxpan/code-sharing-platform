"use client"

import { useAppUser } from "@/lib/useAppUser"
import { redirect } from "next/navigation"

const DashboardPage = () => {
  const user = useAppUser()

  if (!user) {
    redirect("/login")
  }

  if (user.role === "coder") {
    redirect("/dashboard/coder")
  }

  if (user.role === "businessEmployee" || user.role === "businessAdmin") {
    redirect("/dashboard/business")
  }
}

export default DashboardPage
