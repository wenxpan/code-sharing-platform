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
        <AuthProvider
          projectId={process.env.DESCOPE_PROJECT_ID || ""}
          sessionTokenViaCookie={false}
        >
          <Providers>
            <div className="flex flex-col min-h-screen">
              <NavBar />
              <main className="flex grow items-start justify-center py-4 w-full">
                <div className="max-w-[1024px] w-full px-4 flex flex-col items-center">
                  {children}
                </div>
              </main>
              <Footer />
            </div>
          </Providers>
        </AuthProvider>
        <script src="https://cdn.jsdelivr.net/npm/iconify-icon@2.0.0/dist/iconify-icon.min.js"></script>
      </body>
    </html>
  )
}
