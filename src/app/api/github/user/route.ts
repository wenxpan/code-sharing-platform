import { getGithubUser } from "@/lib/fetchGithubData"
import { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const login = searchParams.get("login")

  if (!login) {
    return new Response(JSON.stringify({ error: "Missing login parameter" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }

  try {
    const data = await getGithubUser({
      username: login,
      token: process.env.GITHUB_TOKEN as string,
    })

    return new Response(JSON.stringify({ data }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch GitHub user data" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
  }
}
