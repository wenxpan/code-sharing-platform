export default async function useGithubAPI() {
  const { Octokit } = require("@octokit/core")
  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })
  return octokit
}
