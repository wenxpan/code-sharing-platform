"use client"

import { useUser, useSession } from "@descope/nextjs-sdk/client"
import { mapDescopeUserToCleanedDescopeUser } from "@/lib/utils"
import { useAction } from "convex/react"
import { Doc } from "@convex/_generated/dataModel"
import { useEffect, useState } from "react"
import { api } from "@convex/_generated/api"

export interface CleanedDescopeUser {
  descopeId: string
  name: string
  role: "coder" | "businessEmployee" | "businessAdmin"
  email: string
  picture?: string
  github?: {
    login: string
  }
  position?: string
}

export const useAppUser = (): {
  user: Doc<"users"> | null | undefined
  status: "loading" | "authenticated" | "unauthenticated"
} => {
  const { isSessionLoading, isAuthenticated } = useSession()
  const { isUserLoading: isDescopeUserLoading, user: descopeUser } = useUser()

  const getConvexUser = useAction(api.userFunctions.getUserFromDescope)
  const [convexUser, setConvexUser] = useState<Doc<"users"> | undefined>(
    undefined
  )
  const [isUserLoading, setIsUserLoading] = useState(true)

  useEffect(() => {
    if (descopeUser) {
      const cleanedDescopeUser = mapDescopeUserToCleanedDescopeUser(descopeUser)
      const getUser = async () => {
        if (cleanedDescopeUser?.descopeId && convexUser === undefined) {
          const user = await getConvexUser({ data: cleanedDescopeUser })
          if (user === null) {
            return
          }
          setConvexUser(user)
          setIsUserLoading(false)
          console.log("convexUser set")
        }
      }
      getUser()
    }
  }, [isDescopeUserLoading])

  if (!isSessionLoading && !isAuthenticated) {
    return { status: "unauthenticated", user: null }
  }

  if (isSessionLoading || isDescopeUserLoading || isUserLoading) {
    return { status: "loading", user: undefined }
  }

  return { status: "authenticated", user: convexUser }
}
