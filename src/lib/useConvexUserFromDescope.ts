"use client"
import { useMutation, useQuery } from "convex/react"
import { api } from "@convex/_generated/api"

export function useConvexUserFromDescope(descopeId: string) {
  let user
  user = useQuery(api.users.getUserByDescopeId, { descopeId })
}
