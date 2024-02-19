"use client"

import { useUser, useSession } from "@descope/nextjs-sdk/client"
import {
  mapDescopeUserToAppUser,
  mapDescopeUserToCleanedDescopeUser,
} from "@/lib/utils"
import { useQuery } from "convex/react"

export interface CleanedDescopeUser {
  id: string
  name: string
  role: "coder" | "businessEmployee" | "businessAdmin"
  email: string
  picture?: string
  githubUsername?: string
  position?: string
}

export const useAppUser = (): {
  user: AppUser | null
  status: "loading" | "authenticated" | "unauthenticated"
} | null => {
  const { isSessionLoading, isAuthenticated } = useSession()
  const { isUserLoading: isDescopeUserLoading, user: descopeUser } = useUser()
  const convexUser = useQuery("users", { id: descopeUser?.userId })

  const cleanedDescopeUser = mapDescopeUserToCleanedDescopeUser(descopeUser)

  if (isSessionLoading || isDescopeUserLoading) {
    return { status: "loading", user: null }
  }
  if (!isAuthenticated) {
    return { status: "unauthenticated", user: null }
  }
  if (!convexUser) {
    return { status: "loading", user: null }
  }

  return { status: "authenticated", user }
}
