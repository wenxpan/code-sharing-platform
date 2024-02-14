import { useEffect, useState } from "react"
import { useMutation } from "convex/react"
import { api } from "../../convex/_generated/api"
import { Id } from "../../convex/_generated/dataModel"
import { useUser } from "@descope/react-sdk"

export default function useStoreCoderEffect() {
  // store user as coder role and return user id
  // TODO: expand this to store business
  const { user, isUserLoading } = useUser()
  const [userId, setUserId] = useState<Id<"users"> | null>(null)
  const storeCoder = useMutation(api.users.storeCoder)

  useEffect(() => {
    // If the user is not logged in don't do anything
    if (status !== "authenticated") {
      return
    }
    // @ts-ignore
    const { name, email, picture } = session.user
    async function createCoder() {
      const id = await storeCoder({ name, email, image: picture })
      setUserId(id)
    }
    createCoder()

    // cleanup
    return () => setUserId(null)
  }, [status, storeCoder, user?.email])
  return userId
}
