export default async function useGithubAPI({ token }: { token: string }) {
  const { Octokit } = require("@octokit/core")
  const octokit = new Octokit({ auth: token })
  return octokit
}

export const getGithubUser = async ({
  username,
  token,
}: {
  username: string
  token: string
}) => {
  const octokit = await useGithubAPI({ token })
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
  token,
}: {
  owner: string
  repo: string
  token: string
}) => {
  const octokit = await useGithubAPI({ token })
  console.log({ tokenInServer: token })
  const { data } = await octokit.request("GET /repos/{owner}/{repo}", {
    owner,
    repo,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  })
  const { id, allow_forking, full_name, homepage, html_url, open_issues } = data
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

  const collaborators = collaboratorsData.map(
    // @ts-ignore
    ({ avatar_url, html_url, id, login, role_name }) => ({
      avatar_url,
      html_url,
      id,
      login,
      role_name,
    })
  )

  return {
    id,
    allow_forking,
    full_name,
    homepage,
    html_url,
    open_issues,
    collaborators,
  }
}

export const getGithubRepoById = async ({
  repoId,
  token,
}: {
  repoId: string
  token: string
}) => {
  // TODO: check if it's working
  const octokit = await useGithubAPI({ token })
  const repoData = await octokit.request("GET /repositories/{repo_id}", {
    repo_id: repoId,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  })
  const { allow_forking, full_name, homepage, html_url, open_issues } = repoData
  const collaboratorsData = await octokit.request(
    "GET /repositories/{repo_id}/collaborators",
    {
      id: repoId,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  )

  const collaborators = collaboratorsData.map(
    // @ts-ignore
    ({ avatar_url, html_url, id, login, role_name }) => ({
      avatar_url,
      html_url,
      id,
      login,
      role_name,
    })
  )

  return {
    allow_forking,
    full_name,
    homepage,
    html_url,
    open_issues,
    collaborators,
  }
}
