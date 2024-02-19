import { descopeClient } from "@/lib/api/descope/descopeClient"
import { UserResponse } from "@descope/core-js-sdk"

export const updateUserCustomAttribute = async ({
  loginId,
  key,
  value,
}: {
  loginId: string
  key: string
  value: any
}) => {
  const result = (await descopeClient("user/update/customAttribute", "POST", {
    loginId,
    attributeKey: key,
    attributeValue: value,
  })) as { user: UserResponse }
  return result.user
}

export const fetchUser = async ({ userId }: { userId: string }) => {
  return (
    (await descopeClient(
      "user?" +
        new URLSearchParams({
          userId,
        }),
      "GET",
    )) as { user: UserResponse }
  ).user
}
