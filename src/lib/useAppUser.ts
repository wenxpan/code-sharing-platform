"use client"

import { useUser, useSession } from "@descope/nextjs-sdk/client"
import { mapDescopeUserToCleanedDescopeUser } from "@/lib/utils"
import { useAction } from "convex/react"
import { Doc } from "@convex/_generated/dataModel"
import { useEffect, useMemo, useState } from "react"
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

  const cleanedDescopeUser = useMemo(
    () => mapDescopeUserToCleanedDescopeUser(descopeUser),
    [descopeUser]
  )

  const getConvexUser = useAction(api.userFunctions.getUserFromDescope)
  const [convexUser, setConvexUser] = useState(null)

  useEffect(() => {
    console.log("cleaned descope user changed")
    const getUser = async () => {
      if (cleanedDescopeUser?.descopeId) {
        const convexUser = await getConvexUser({ data: cleanedDescopeUser })
        setConvexUser(convexUser)
        console.log("convexUser set")
      }
    }
    getUser()
  }, [cleanedDescopeUser])

  if (!isSessionLoading && !isAuthenticated) {
    console.log({ status: "unauthenticated", user: null })
    return { status: "unauthenticated", user: null }
  }

  if (isSessionLoading || isDescopeUserLoading || !convexUser) {
    console.log({ status: "loading", user: null })
    return { status: "loading", user: null }
  }

  console.log({ status: "authenticated", user: convexUser })
  return { status: "authenticated", user: convexUser }
}
