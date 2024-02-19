import { getGithubUser } from "@/lib/useGithubAPI"
import { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const login = searchParams.get("login")

  // TODO: add error handling
  if (!login) return null

  const data = await getGithubUser({
    username: login,
    token: process.env.GITHUB_TOKEN as string,
  })

  return Response.json({ data })
}
