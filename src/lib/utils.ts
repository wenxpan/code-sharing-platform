import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { CleanedDescopeUser } from "@/lib/useAppUser"
import { UserResponse } from "@descope/core-js-sdk"

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const mapDescopeUserToCleanedDescopeUser = (
  user: UserResponse
): CleanedDescopeUser | null => {
  if (!user?.userTenants || !user?.roleNames) {
    // throw new Error("Descope User is missing required fields")
    return null
  }
  let role: "coder" | "businessEmployee" | "businessAdmin" | undefined
  let companyName: string | undefined
  if (user.userTenants.length === 0) {
    role = "coder"
  } else if (user.userTenants.length > 0) {
    const userCompany = user.userTenants[0].tenantName
    companyName = userCompany
    if (user.roleNames.length === 0) {
      role = "businessEmployee"
    } else {
      role = "businessAdmin"
    }
  }

  if (!role) {
    throw new Error("Descope User is missing required fields")
  }

  const returnedUser = {
    descopeId: user.userId,
    name: user.name || "Unknown",
    role,
    email: user.email || "Unknown",
    picture: user.picture,
    github: {
      login: user.customAttributes?.githubUsername,
    },
    company: companyName,
    position: user.customAttributes?.position,
  }
  return returnedUser
}
