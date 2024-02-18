"use client"

import React from "react"
import { Descope } from "@descope/nextjs-sdk"

const Login: React.FC = () => {
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
