import { useEffect, useState } from "react"
import { useMutation, useQuery } from "convex/react"
import { api } from "../../convex/_generated/api"
import { useSession } from "next-auth/react"
import { Doc, Id } from "../../convex/_generated/dataModel"

export default function useStoreCoderEffect() {
  // store user as coder role and return user id
  // TODO: expand this to store business
  const { data: session, status } = useSession()
  const [userId, setUserId] = useState<Id<"users"> | null>(null)
  const storeCoder = useMutation(api.users.storeCoder)

  useEffect(() => {
    // If the user is not logged in don't do anything
    if (status !== "authenticated") {
      return
    }
    // @ts-ignore
    const { name, email, image } = session.user
    async function createCoder() {
      const id = await storeCoder({ name, email, image })
      setUserId(id)
    }
    createCoder()

    // cleanup
    return () => setUserId(null)
  }, [status, storeCoder, session?.user?.email])
  return userId
}
