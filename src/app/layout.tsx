import Providers from "./providers"
import "./globals.css"
import { Roboto } from "next/font/google"
import NavBar from "@/components/Navbar"
import Footer from "@/components/Footer"

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="light">
      <body className={roboto.className}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <NavBar />
            <main className="max-w-[1024px] self-center grow py-4">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
