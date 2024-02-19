import { NextRequest } from "next/server"
import { fetchUser, updateUserCustomAttribute } from "@/lib/api/descope/user"
import { AppUser } from "@/lib/useAppUser"
import { mapDescopeUserToAppUser } from "@/lib/utils"

export const GET = async (
  req: NextRequest,
  { params: { id } }: { params: { id: string } },
) => {
  const user = await fetchUser({ userId: id })

  return Response.json({ data: mapDescopeUserToAppUser(user) })
}

export const PUT = async (
  req: NextRequest,
  { params: { id } }: { params: { id: string } },
) => {
  const updatedAppUser = (await req.json()) as AppUser

  const customAttributeUpdateMap = {
    github: updatedAppUser.github,
  }

  const user = await fetchUser({ userId: id })

  const promises = [
    ...Object.entries(customAttributeUpdateMap).map(([key, value]) =>
      updateUserCustomAttribute({ loginId: user.loginIds[0], key, value }),
    ),
  ]
  await Promise.all(promises)

  const updatedUser = await fetchUser({ userId: id })

  return Response.json({ data: mapDescopeUserToAppUser(updatedUser) })
}
