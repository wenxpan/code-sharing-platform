"use client"

import { signIn } from "next-auth/react"

export default function Navbar() {
  return (
    <button
      onClick={() => signIn("descope", { callbackUrl: "/dashboard" })}
      className="bg-blue-100 py-2 px-4 rounded-full"
    >
      Get Started
    </button>
  )
}
