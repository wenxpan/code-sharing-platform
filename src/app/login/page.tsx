import React from "react"
import { Descope } from "@descope/nextjs-sdk"

export default function Login() {
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
      <Descope
        flowId={process.env.NEXT_PUBLIC_DESCOPE_FLOW_ID || "sign-up-or-in"}
        redirectAfterSuccess="/"
      />
    </div>
  )
}
