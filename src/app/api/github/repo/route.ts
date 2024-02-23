import { getGithubRepo, getGithubRepoById } from "@/lib/fetchGithubData"
import { type NextRequest } from "next/server"

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const owner = searchParams.get("owner")
  const repo = searchParams.get("repo")
  const id = searchParams.get("id")

  let data
  if (owner && repo) {
    data = await getGithubRepo({
      owner,
      repo,
      token: process.env.GITHUB_TOKEN as string,
    })
  } else if (id) {
    data = await getGithubRepoById({
      repoId: id,
      token: process.env.GITHUB_TOKEN as string,
    })
  }
  // TODO: add error handling
  return Response.json({ data })
}
