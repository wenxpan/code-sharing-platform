"use client"
import React, { useState } from "react"
import { Input } from "@nextui-org/input"
import { Checkbox } from "@nextui-org/checkbox"
import { Button } from "@nextui-org/button"
import { Doc } from "@convex/_generated/dataModel"

interface CreateProjectPageProps {}

const CreateProjectPage: React.FC<CreateProjectPageProps> = () => {
  const [ownerName, setOwnerName] = useState("")
  const [repoName, setRepoName] = useState("")
  const [project, setProject] = useState<Doc<"projects"> | null>(null)

  const handleRepoLookup = async () => {
    const res = await fetch(
      `/api/github/repo?owner=${ownerName}&repo=${repoName}`
    )
    const { data } = await res.json()
    setProject({ ...data })
  }

  // TODO: show collaborators

  return (
    <>
      <form className="grid grid-cols-2 w-full gap-4 max-w-xl place-items-center">
        <Input
          type="text"
          label="Owner"
          placeholder="/repos/{owner}/{repo}"
          required
          isInvalid={false}
          value={ownerName}
          onChange={(e) => setOwnerName(e.target.value)}
          // value={full_name}
          // errorMessage="Repo not found"
        />
        <Input
          type="text"
          label="Repo"
          placeholder="/repos/{owner}/{repo}"
          required
          isInvalid={false}
          value={repoName}
          onChange={(e) => setRepoName(e.target.value)}
          // value={full_name}
          // errorMessage="Repo not found"
        />
        <Button
          type="button"
          onClick={() => {
            handleRepoLookup()
          }}
        >
          Search for repo
        </Button>
        <Input type="text" label="Project display name" />
        <Input
          type="text"
          label="Deployed page"
          // value={homepage}
        />
        <Input
          type="url"
          label="Github url"
          isDisabled
          // value={home_url}
        />
        <Input
          type="text"
          label="Github repo id"
          isDisabled
          // value={id}
        />
        <Input
          type="number"
          label="Open Issues"
          isDisabled
          // value={open_issues}
        />
        <Checkbox defaultSelected isDisabled>
          Allow Forking
        </Checkbox>
      </form>
    </>
  )
}

export default CreateProjectPage

// {
//   screenshots: [
//     {
//       alt: "screenshot - dashboard",
//       url: "https://picsum.photos/seed/picsum/600/400",
//     },
//     {
//       alt: "screenshot - landing",
//       url: "https://picsum.photos/seed/picsum2/600/400",
//     },
//     {
//       alt: "screenshot - users",
//       url: "https://picsum.photos/seed/picsum3/600/400",
//     },
//     {
//       alt: "screenshot - proejcts",
//       url: "https://picsum.photos/seed/picsum4/600/400",
//     },
//   ],
//   techStack: ["html", "css", "tailwind css", "javascript"],
//   collaborators: [
//     {
//       avatar_url:
//         "https://avatars.githubusercontent.com/u/20641815?v=4",
//       html_url: "https://github.com/MinghongGao",
//       id: 20641815,
//       login: "MinghongGao",
//       role_name: "write",
//     },
//     {
//       avatar_url:
//         "https://avatars.githubusercontent.com/u/28617120?v=4",
//       html_url: "https://github.com/wenxpan",
//       id: 28617120,
//       login: "wenxpan",
//       role_name: "admin",
//     },
//   ],

// }
