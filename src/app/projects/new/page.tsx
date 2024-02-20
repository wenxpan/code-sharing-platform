"use client"
import React, { useState } from "react"
import { Input } from "@nextui-org/input"
import { Button } from "@nextui-org/button"
import { Doc } from "@convex/_generated/dataModel"
import { useForm, Controller, useFieldArray } from "react-hook-form"
import { Icon } from "@iconify-icon/react"
import { useMutation } from "convex/react"
import { api } from "@convex/_generated/api"
import { useAppUser } from "@/lib/useAppUser"
import { Spinner } from "@nextui-org/spinner"
import { redirect } from "next/navigation"
import { Avatar, AvatarGroup } from "@nextui-org/avatar"
import { Skeleton } from "@nextui-org/skeleton"

interface CreateProjectPageProps {}

const CreateProjectPage: React.FC<CreateProjectPageProps> = () => {
  const [repoName, setRepoName] = useState("")
  const { user, status } = useAppUser()

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
      owner: user?._id,
    },
  })
  const {
    fields: screenshotFields,
    append: appendScreenshot,
    remove: removeScreenshot,
  } = useFieldArray({
    control,
    name: "screenshots",
  })

  const {
    fields: stackFields,
    append: appendStack,
    remove: removeStack,
  } = useFieldArray({
    control,
    name: "techStack",
  })

  const handleRepoLookup = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch(
      `/api/github/repo?owner=${user?.github?.login}&repo=${repoName}`,
    )
    const { data } = await res.json()
    const currentValues = getValues()
    reset(
      { ...currentValues, ...data },
      { keepDefaultValues: true, keepDirtyValues: true },
    )
  }
  const createProject = useMutation(api.projects.createProject)

  // TODO: show collaborators
  // TODO: upload screenshots
  // TODO: tech stack - group by frontend/backend/db/ui
  const onSubmit = async (data: Doc<"projects">) => {
    console.log({ data })
    const projectId = await createProject({ data })
    console.log({ projectId })
  }
  // TODO: create table for techStack
  // https://docs.convex.dev/database/document-ids
  // const techStack = [
  //   {
  //     name: "js",
  //     category: "language",
  //   },
  //   { name: "react", category: "frontend framework" },
  // ]
  // const project = {
  //   name: "xx",
  //   techStack: ["id1", "id2"],
  //   // description for tags: custom tech stack or other tools used
  //   tags: [{ name: "xx" }, { name: "xx" }],
  // }

  if (status === "loading") {
    return <Spinner />
  }

  if (status === "unauthenticated") {
    redirect("/login")
  }

  if (!user) {
    return null
  }
  console.log({ user })

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
            description={`https://github.com/${user.github?.login}/${repoName}`}
            isInvalid={false}
            value={user.github?.login}
            isReadOnly={true}
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

        <div className="col-span-2 w-full justify-start">
          {getValues("collaborators").length === 0 && (
            <Skeleton className="flex rounded-full w-12 h-12" />
          )}
          {getValues("collaborators").length > 0 && (
            <AvatarGroup isBordered max={5} className="justify-start">
              {getValues("collaborators").map((collaborator) => (
                <Avatar
                  src={collaborator.avatar_url}
                  key={collaborator.login}
                />
              ))}
            </AvatarGroup>
          )}
        </div>
        <Controller
          name="displayName"
          control={control}
          render={({ field }) => <Input label="Display name" {...field} />}
        />
        <div className="col-span-2 w-full">
          <p className="font-semibold">Tech Stack</p>
          <ul className="grid gap-2 grid-cols-2 sm:grid-cols-3">
            {stackFields.map((item, index) => (
              <li key={item.id} className="flex items-center gap-2">
                <Controller
                  name={`techStack.${index}.name`}
                  control={control}
                  render={({ field }) => (
                    <Input
                      // label="stack name"
                      {...field}
                      endContent={
                        <Icon
                          icon="icomoon-free:bin"
                          className="cursor-pointer"
                          onClick={() => removeStack(index)}
                        ></Icon>
                      }
                    />
                  )}
                />
              </li>
            ))}
          </ul>
          <Button
            type="button"
            onClick={() => appendStack({ name: "" })}
            className="mt-2"
          >
            Add
          </Button>
        </div>
        <div className="col-span-2 w-full">
          <p className="font-semibold">Screenshots</p>
          <ul className="flex flex-col gap-2">
            {screenshotFields.map((item, index) => (
              <li key={item.id} className="flex items-center gap-2">
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
                <Button type="button" onClick={() => removeScreenshot(index)}>
                  Delete
                </Button>
              </li>
            ))}
          </ul>
          <Button
            type="button"
            className="mt-2"
            onClick={() => appendScreenshot({ url: "", alt: "" })}
          >
            Add
          </Button>
        </div>
        <Button type="submit" color="primary" className="w-full col-span-2">
          Submit
        </Button>
      </form>
    </>
  )
}

export default CreateProjectPage
