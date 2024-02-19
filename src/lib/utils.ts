import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { AppUser } from "@/lib/useAppUser"
import { UserResponse } from "@descope/core-js-sdk"

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const mapDescopeUserToAppUser = (user: UserResponse): AppUser | null => {
  if (!user.userTenants || !user.roleNames) {
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
    picture: user.picture,
    github: {
      id: 28617120,
      login: "wenxpan",
      name: "WP",
      html_url: "https://github.com/wenxpan",
      avatar_url: "https://avatars.githubusercontent.com/u/28617120?v=4",
    },
  }
}
