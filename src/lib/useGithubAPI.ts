export default async function useGithubAPI() {
  const { Octokit } = require("@octokit/core")
  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })
  return octokit
}

export const getGithubUser = async ({ username }: { username: string }) => {
  const octokit = await useGithubAPI()
  const userData = await octokit.request("GET /users/{username}", {
    username,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  })
  return userData
}

export const getGithubRepo = async ({
  owner,
  repo,
}: {
  owner: string
  repo: string
}) => {
  const octokit = await useGithubAPI()
  const repoData = await octokit.request("GET /repos/{owner}/{repo}", {
    owner,
    repo,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  })
  return repoData
}
