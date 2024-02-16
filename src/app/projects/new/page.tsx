"use client"
import React, { useState } from "react"
import { Input } from "@nextui-org/input"
import { Checkbox } from "@nextui-org/checkbox"
import { Button } from "@nextui-org/button"
import { Doc } from "@convex/_generated/dataModel"
import { useForm, Controller, useFieldArray } from "react-hook-form"

interface CreateProjectPageProps {}

const CreateProjectPage: React.FC<CreateProjectPageProps> = () => {
  const [ownerName, setOwnerName] = useState("")
  const [repoName, setRepoName] = useState("")
  const {
    register,
    handleSubmit,
    control,
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
      id: 0,
      open_issues: 0,
      screenshots: [],
      techStack: [],
    },
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: "screenshots",
  })

  const handleRepoLookup = async (e: React.FormEvent) => {
    e.preventDefault()
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
  // TODO: display allow forking
  // TODO: upload screenshots
  const onSubmit = async (data: Doc<"projects">) => {
    console.log(data)
  }

  return (
    <>
      <form
        onSubmit={(e) => handleRepoLookup(e)}
        className="w-full max-w-xl mb-8 flex flex-col "
      >
        <div className="flex items-start w-full gap-2">
          <Input
            type="text"
            label="Owner"
            required
            description="https://github.com/{owner}/{repo}"
            isInvalid={false}
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
          />
          <Input
            type="text"
            label="Repo"
            required
            isInvalid={false}
            value={repoName}
            onChange={(e) => setRepoName(e.target.value)}
          />
        </div>
        <Button type="submit" color="primary">
          Search for repo
        </Button>
      </form>
      <form
        className="grid grid-cols-2 w-full gap-4 max-w-xl place-items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* populated info */}
        <Controller
          name="html_url"
          control={control}
          render={({ field }) => (
            <Input
              label="Github url"
              placeholder="/owner/repo"
              isDisabled
              {...field}
            />
          )}
        />
        <Controller
          name="homepage"
          control={control}
          render={({ field }) => <Input label="Deployed page" {...field} />}
        />
        <Controller
          name="open_issues"
          control={control}
          render={({ field }) => (
            <Input
              isDisabled
              label="Open Issues"
              {...field}
              value={field.value.toString()}
            />
          )}
        />
        <Input
          type="number"
          isDisabled
          label="Total collaborators"
          value={getValues("collaborators").length.toString()}
        />
        {/* additional info */}
        <Controller
          name="displayName"
          control={control}
          render={({ field }) => <Input label="display name" {...field} />}
        />
        <div className="col-span-2 w-full">
          <p>Screenshots</p>
          <ul>
            {fields.map((item, index) => (
              <li key={item.id} className="flex items-center gap-2">
                {/* <input {...register(`screenshots.${index}.url`)} /> */}
                {/* <Controller
                  render={({ field }) => <input {...field} />}
                  name={`screenshots.${index}.alt`}
                  control={control}
                /> */}
                <Controller
                  name={`screenshots.${index}.url`}
                  control={control}
                  render={({ field }) => (
                    <Input label="screenshot link" {...field} />
                  )}
                />
                <Controller
                  name={`screenshots.${index}.alt`}
                  control={control}
                  render={({ field }) => (
                    <Input label="screenshot alt text" {...field} />
                  )}
                />
                <Button type="button" onClick={() => remove(index)}>
                  Delete
                </Button>
              </li>
            ))}
          </ul>
          <Button type="button" onClick={() => append({ url: "", alt: "" })}>
            Add
          </Button>
        </div>
        <Button type="submit" color="primary">
          Submit
        </Button>
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
