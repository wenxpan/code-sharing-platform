import { authMiddleware } from "@descope/nextjs-sdk/server"

export default authMiddleware({
  // The Descope project ID to use for authentication
  // Defaults to process.env.DESCOPE_PROJECT_ID
  projectId: process.env.DESCOPE_CLIENT_ID,

  // The URL to redirect to if the user is not authenticated
  // Defaults to process.env.SIGN_IN_ROUTE or '/sign-in' if not provided
  redirectUrl: "/login",

  // An array of public routes that do not require authentication
  // In addition to the default public routes:
  // - process.env.SIGN_IN_ROUTE or /sign-in if not provided
  // - process.env.SIGN_UP_ROUTE or /sign-up if not provided
  publicRoutes: ["/", "/projects"],
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
