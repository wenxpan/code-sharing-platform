import React from "react"
import { Descope } from "@descope/nextjs-sdk"
import { usePathname } from "next/navigation"

interface LoginPageProps {
  params: { role: string }
}

const Login: React.FC<LoginPageProps> = ({ params }) => {
  const role = params.role

  let flowName = "sign-up-or-in"

  if (role === "coder") {
    flowName = "sign-up-or-in-for-coder"
  } else if (role === "business") {
    flowName = "sign-up-or-in"
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
      <Descope flowId={flowName} redirectAfterSuccess="/" />
    </div>
  )
}

export default Login
