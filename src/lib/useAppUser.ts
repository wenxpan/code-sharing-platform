"use client"

import { useUser, useSession } from "@descope/nextjs-sdk/client"

export interface AppUser {
  id: string
  name: string
  role: "coder" | "businessEmployee" | "businessAdmin"
  email: string
  avatarUrl?: string
}

export const useAppUser = (): AppUser | null => {
  const { isSessionLoading, isAuthenticated } = useSession()
  const { isUserLoading, user } = useUser()

  if (
    isSessionLoading ||
    !isAuthenticated ||
    isUserLoading ||
    !user ||
    !user.userTenants ||
    !user.roleNames
  ) {
    return null
  }

  let role: "coder" | "businessEmployee" | "businessAdmin" | undefined
  if (user.userTenants.length === 0) {
    role = "coder"
  } else if (user.userTenants.length > 0 && user.roleNames.length === 0) {
    role = "businessEmployee"
  } else if (user.userTenants.length > 0 && user.roleNames.length > 0) {
    role = "businessAdmin"
  }

  if (!role) {
    return null
  }

  return {
    id: user.userId,
    name: user.name || "Unknown",
    role,
    email: user.email || "Unknown",
    avatarUrl: user.picture,
  }
}
