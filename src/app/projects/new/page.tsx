"use client"
import React, { useState } from "react"
import { Input } from "@nextui-org/input"
import { Checkbox } from "@nextui-org/checkbox"
import { Button } from "@nextui-org/button"
import { Doc } from "@convex/_generated/dataModel"
import { useForm } from "react-hook-form"

interface CreateProjectPageProps {}

const CreateProjectPage: React.FC<CreateProjectPageProps> = () => {
  const [ownerName, setOwnerName] = useState("")
  const [repoName, setRepoName] = useState("")
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<Doc<"projects">>({
    defaultValues: {
      full_name: "",
      allow_forking: false,
      collaborators: [],
      displayName: "",
      homepage: "",
      html_url: "",
      id: 300,
      open_issues: 20,
      screenshots: [],
      techStack: [],
    },
  })

  const handleRepoLookup = async () => {
    const res = await fetch(
      `/api/github/repo?owner=${ownerName}&repo=${repoName}`
    )
    const { data } = await res.json()
    const currentValues = getValues()
    reset(
      { ...currentValues, ...data },
      { keepDefaultValues: true, keepDirtyValues: true }
    )
  }

  // TODO: show collaborators
  const onSubmit = async (data: Doc<"projects">) => {
    console.log(data)
  }

  return (
    <>
      <form
        className="grid grid-cols-2 w-full gap-4 max-w-xl place-items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          type="text"
          label="Owner"
          placeholder="/repos/{owner}"
          required
          isInvalid={false}
          value={ownerName}
          onChange={(e) => setOwnerName(e.target.value)}
          // errorMessage="Repo not found"
        />
        <Input
          type="text"
          label="Repo"
          placeholder="/{repo}"
          required
          isInvalid={false}
          value={repoName}
          onChange={(e) => setRepoName(e.target.value)}
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
        <Input
          type="text"
          label="Fetched Repo Full Name"
          placeholder="/repos/{owner}/{repo}"
          isDisabled
          {...register("full_name")}
          // errorMessage="Repo not found"
        />
        <Input
          type="text"
          label="Project display name"
          {...register("displayName")}
        />
        <Input type="text" label="Deployed page" {...register("homepage")} />
        <Input
          type="url"
          label="Github url"
          placeholder="/owner/repo"
          isDisabled
          {...register("html_url")}
        />
        <Input
          // type="number"
          label="Github repo id"
          // isDisabled
          {...register("id", { valueAsNumber: true })}
        />
        <Input
          type="number"
          label="Open Issues"
          isDisabled
          {...register("open_issues")}
        />
        <Checkbox isDisabled {...register("allow_forking")}>
          Allow Forking
        </Checkbox>
        <Button type="submit">Submit</Button>
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
