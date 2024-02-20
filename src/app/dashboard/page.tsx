"use client"

import { useAppUser } from "@/lib/useAppUser"
import { redirect } from "next/navigation"

const DashboardPage = () => {
  const { status, user } = useAppUser()
  // TODO: add loading status to navbar

  if (status === "unauthenticated") {
    redirect("/")
  }

  if (user && user.role === "coder") {
    redirect("/dashboard/coder")
  }

  if (
    user &&
    (user.role === "businessEmployee" || user.role === "businessAdmin")
  ) {
    redirect("/dashboard/business")
  }
}

export default DashboardPage
