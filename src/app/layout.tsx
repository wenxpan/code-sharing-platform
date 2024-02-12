import Providers from "./providers"
import "./globals.css"
import { Roboto } from "next/font/google"
import NavBar from "@/components/Navbar"

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] })

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="light">
      <body className={roboto.className}>
        <Providers>
          <NavBar />
          <main className="max-w-[1024px] mx-auto">{children}</main>
          <footer></footer>
        </Providers>
      </body>
    </html>
  )
}
