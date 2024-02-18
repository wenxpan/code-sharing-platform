import { descopeClient } from "@/lib/api/descope/descopeClient"

export const updateUserCustomAttribute = async ({
  id,
  key,
  value,
}: {
  id: string
  key: string
  value: string
}) => {
  return await descopeClient("user/update/customAttribute", {
    loginId: id,
    attributeKey: key,
    attributeValue: value,
  })
}
