import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { CleanedDescopeUser } from "@/lib/useAppUser"
import { UserResponse } from "@descope/core-js-sdk"

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const mapDescopeUserToCleanedDescopeUser = (
  user: UserResponse,
): CleanedDescopeUser => {
  if (!user.userTenants || !user.roleNames) {
    throw new Error("Descope User is missing required fields")
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
    throw new Error("Descope User is missing required fields")
  }

  return {
    id: user.userId,
    name: user.name || "Unknown",
    role,
    email: user.email || "Unknown",
    picture: user.picture,
    githubUsername: user.customAttributes?.githubUsername,
    position: user.customAttributes?.position,
  }
}
