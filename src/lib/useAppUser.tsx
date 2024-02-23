"use client"

import { useUser, useSession } from "@descope/nextjs-sdk/client"
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react"
import { mapDescopeUserToCleanedDescopeUser } from "@/lib/utils"
import { useAction } from "convex/react"
import { Doc } from "@convex/_generated/dataModel"
import { api } from "@convex/_generated/api"

interface UserState {
  user: Doc<"users"> | null | undefined
  status: "loading" | "authenticated" | "unauthenticated"
}

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

interface UserProviderProps {
  children: ReactNode
}

interface UserContextType extends UserState {}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const { isSessionLoading, isAuthenticated } = useSession()
  const { isUserLoading: isDescopeUserLoading, user: descopeUser } = useUser()
  const getConvexUser = useAction(api.userFunctions.getUserFromDescope)
  const [convexUser, setConvexUser] = useState<Doc<"users"> | null | undefined>(
    undefined
  )
  const [status, setStatus] = useState<
    "loading" | "authenticated" | "unauthenticated"
  >("loading")

  useEffect(() => {
    console.log({ descopeUser })
    if (descopeUser) {
      const cleanedDescopeUser = mapDescopeUserToCleanedDescopeUser(descopeUser)
      const getUser = async () => {
        if (cleanedDescopeUser?.descopeId && convexUser === undefined) {
          setStatus("loading")
          const user = await getConvexUser({ data: cleanedDescopeUser })
          if (user === null) {
            setStatus("unauthenticated")
            return
          }
          setConvexUser(user)
          setStatus("authenticated")
          console.log("convexUser set", { user })
        }
      }
      getUser()
    } else {
      if (!isSessionLoading && !isAuthenticated) {
        setStatus("unauthenticated")
      }
    }
  }, [descopeUser])

  // Dynamically update the status based on the current state
  useEffect(() => {
    if (isSessionLoading || isDescopeUserLoading) {
      setStatus("loading")
    } else if (!isAuthenticated) {
      setStatus("unauthenticated")
    } else if (convexUser) {
      setStatus("authenticated")
    }
  }, [isSessionLoading, isDescopeUserLoading, isAuthenticated, convexUser])

  return (
    <UserContext.Provider value={{ user: convexUser, status }}>
      {children}
    </UserContext.Provider>
  )
}

export const useAppUser = (): UserContextType => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("useAppUser must be used within a UserProvider")
  }
  return context
}
