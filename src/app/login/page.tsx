"use client"

import React from "react"
import { Descope } from "@descope/nextjs-sdk"
import { useAppUser } from "@/lib/useAppUser"
import { useRouter } from "next/navigation"
import { Spinner } from "@nextui-org/react"

const Login: React.FC = () => {
  const { user } = useAppUser()
  const router = useRouter()

  // if (user === undefined) {
  //   return <Spinner />
  // }

  if (user) {
    router.push("/dashboard")
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Note that if the component is rendered on the server
			you cannot pass onSuccess/onError callbacks because they are not serializable. */}
      <Descope flowId="sign-up-or-in" redirectAfterSuccess="/dashboard" />
    </div>
  )
}

export default Login
