"use client"

import { SessionProvider } from "next-auth/react"
import { NextUIProvider } from "@nextui-org/react"
import { ConvexProvider, ConvexReactClient } from "convex/react"
import { useRouter } from "next/navigation"

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

export default function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  return (
    <NextUIProvider navigate={router.push}>
      <SessionProvider>
        <ConvexProvider client={convex}>{children}</ConvexProvider>
      </SessionProvider>
    </NextUIProvider>
  )
}
