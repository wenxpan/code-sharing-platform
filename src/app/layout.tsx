import Providers from "./providers"
import "./globals.css"
import { Roboto } from "next/font/google"
import NavBar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { AuthProvider } from "@descope/nextjs-sdk"

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="light">
      <head>
        <link rel="icon" href="/icon.svg" sizes="any" />
      </head>
      <body className={roboto.className}>
        <AuthProvider projectId={process.env.DESCOPE_CLIENT_ID || ""}>
          <Providers>
            <div className="flex flex-col min-h-screen">
              <NavBar />
              <main className="max-w-[1024px] self-center grow py-4">
                {children}
              </main>
              <Footer />
            </div>
          </Providers>
        </AuthProvider>
      </body>
    </html>
  )
}
