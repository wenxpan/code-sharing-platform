"use client"

import { NextUIProvider } from "@nextui-org/react"
import { ConvexProvider, ConvexReactClient } from "convex/react"
import { useRouter } from "next/navigation"

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

export default function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  return (
    <NextUIProvider navigate={router.push}>
      <ConvexProvider client={convex}>{children}</ConvexProvider>
    </NextUIProvider>
  )
}
