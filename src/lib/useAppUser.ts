"use client"

import { useUser, useSession } from "@descope/nextjs-sdk/client"
import { mapDescopeUserToAppUser } from "@/lib/utils"

export interface AppUser {
  id: string
  name: string
  role: "coder" | "businessEmployee" | "businessAdmin"
  email: string
  picture?: string
  github?: {
    id: number
    login: string
    name: string
    avatar_url: string
    html_url: string
  }
}

export const useAppUser = (): AppUser | null => {
  const { isSessionLoading, isAuthenticated } = useSession()
  const { isUserLoading, user } = useUser()

  if (isSessionLoading || !isAuthenticated || isUserLoading || !user) {
    return null
  }

  return mapDescopeUserToAppUser(user)
}
