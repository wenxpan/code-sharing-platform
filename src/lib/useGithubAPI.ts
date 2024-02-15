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

  const collaboratorsData = await octokit.request(
    "GET /repos/{owner}/{repo}/collaborators",
    {
      owner,
      repo,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  )
  return { ...repoData, ...collaboratorsData }
}

export const getGithubRepoById = async ({ repoId }: { repoId: string }) => {
  const octokit = await useGithubAPI()
  const repoData = await octokit.request("GET /repositories/{repo_id}", {
    repo_id: repoId,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  })
  const collaboratorsData = await octokit.request(
    "GET /repositories/{repo_id}/collaborators",
    {
      id: repoId,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  )

  return { ...repoData, ...collaboratorsData }
}
