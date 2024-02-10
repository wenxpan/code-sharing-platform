import NextAuthSessionProvider from "./provider"
import "./globals.css"
import { Roboto } from "next/font/google"

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] })

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body className={roboto.className}>
        <NextAuthSessionProvider>
          <div>{children}</div>
        </NextAuthSessionProvider>
      </body>
    </html>
  )
}
