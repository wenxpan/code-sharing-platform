import NextAuth from "next-auth/next"
import { NextAuthOptions } from "next-auth"

export const authOptions: NextAuthOptions = {
  secret: process.env.SECRET,
  providers: [
    {
      id: "descope",
      name: "Descope",
      type: "oauth",
      wellKnown: `https://api.descope.com/${process.env.DESCOPE_CLIENT_ID}/.well-known/openid-configuration`,
      authorization: { params: { scope: "openid email profile" } },
      idToken: true,
      clientId: process.env.DESCOPE_CLIENT_ID,
      clientSecret: process.env.DESCOPE_CLIENT_SECRET,
      checks: ["pkce", "state"],
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        }
      },
    },
  ],
  callbacks: {
    async session({ session, token }) {
      const user = { ...session.user, id: token.sub }
      return { ...session, user }
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
