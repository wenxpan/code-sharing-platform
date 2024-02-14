import NextAuth from "next-auth/next"
import { NextAuthOptions } from "next-auth"

export const authOptions: NextAuthOptions = {
  secret: process.env.SECRET,
  providers: [
    {
      id: "descope",
      name: "Descope",
      type: "oauth",
      wellKnown: `https://api.descope.com/${process.env.DESCOPE_PROJECT_ID}/.well-known/openid-configuration`,
      authorization: {
        params: { scope: "openid email profile descope.custom_claims" },
      },
      idToken: true,
      clientId: process.env.DESCOPE_CLIENT_ID,
      clientSecret: process.env.DESCOPE_CLIENT_SECRET,
      checks: ["pkce", "state"],
      profile(profile, tokens) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          idToken: tokens.id_token,
          ...tokens,
        }
      },
    },
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account?.id_token) {
        token.idToken = account.id_token
      }
      return token
    },
    async session({ session, token, user }) {
      // @ts-ignore
      session.idToken = token.idToken
      return session
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
