"use client"

import { Button, CheckboxGroup, Input, Link, Spinner } from "@nextui-org/react"
import { Avatar } from "@nextui-org/react"
import { useMutation } from "convex/react"
import { api } from "@convex/_generated/api"
import React, { useEffect, useState } from "react"
import CustomCheckbox from "@/components/ui/checkbox"
import { useRouter } from "next/navigation"
import { useAppUser } from "@/lib/useAppUser"

interface CoderProfileProps {}

const CoderProfile: React.FC<CoderProfileProps> = () => {
  const { user } = useAppUser()
  const [groupSelected, setGroupSelected] = useState(
    user?.skillSet?.map((skill) => skill.name) || []
  )

  const [stackGroup, setStackGroup] = React.useState([
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Convex",
    "Node.js",
  ])
  const [stackInput, setStackInput] = React.useState("")
  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (stackGroup.includes(stackInput) && event.key === "Enter") {
      event.preventDefault()
      setGroupSelected([...groupSelected, stackInput] as never)
      setStackInput(() => "")
    } else if (event.key === "Enter") {
      event.preventDefault()
      setStackGroup([...stackGroup, stackInput] as never)
      setGroupSelected([...groupSelected, stackInput] as never)
      setStackInput(() => "")
    }
  }

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [githubName, setGithubName] = useState("")
  const [githubAvatar, setGithubAvatar] = useState("")
  const [githubUrl, setGithubUrl] = useState("")
  const [githubLogin, setGithubLogin] = useState("")
  const [githubId, setGithubId] = useState(0)

  const router = useRouter()

  const updateUser = useMutation(api.users.updateCoder)

  useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)
      if (user.github) {
        setGithubLogin(user.github.login || "")
        setGithubName(user.github.name || "")
        setGithubAvatar(user.github.avatar_url || "")
        setGithubUrl(user.github.html_url || "")
        setGithubId(user.github.id || 0)
      }
      setGroupSelected(user.skillSet?.map((skill) => skill.name) || [])
    }
  }, [user])

  async function fetchGithub(event: React.FormEvent) {
    event.preventDefault()

    const res = await fetch(`https://api.github.com/users/${githubLogin}`)
    const data = await res.json()
    console.log(data)
    setGithubAvatar(data.avatar_url || "")
    setGithubUrl(data.html_url)
    // setGithubLogin(data.login)
    setGithubId(data.id)
    setGithubName(data.name || "")
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const skillSet = groupSelected.map((stack) => ({ name: stack }))

    const githubData = {
      avatar_url: githubAvatar,
      html_url: githubUrl,
      login: githubLogin,
      id: githubId,
      name: githubName,
      // name: githubName,
    }

    try {
      if (user && name && email) {
        console.log("updating...")
        await updateUser({
          data: {
            _id: user._id,
            name,
            email,
            github: githubData,
            skillSet,
          },
        })
      }
    } catch (error) {
      console.error(error)
      alert(error)
    }

    router.push("/dashboard/coder")
  }

  if (user === undefined) {
    return <Spinner />
  }

  return (
    <div>
      <form
        className="grid grid-cols-1 w-full gap-4 max-w-xl place-items-center pb-6"
        onSubmit={fetchGithub}
      >
        <Avatar src={githubAvatar} />
        {/* get from github */}

        <Input
          type="text"
          label="GitHub Username"
          placeholder="GitHub Username"
          labelPlacement="outside"
          value={githubLogin}
          onChange={(e) => setGithubLogin(e.target.value)}
        />

        {githubUrl && (
          <p>
            Github url: <Link href={githubUrl}>{githubUrl}</Link>
          </p>
        )}

        <Button color="primary" type="submit">
          Fetch GitHub Account
        </Button>
      </form>

      <form
        className="grid grid-cols-1 w-full gap-4 max-w-xl place-items-center"
        onSubmit={handleSubmit}
      >
        <Input
          isRequired
          type="text"
          label="Display Name"
          placeholder="What's Your Name"
          defaultValue={user?.name}
          labelPlacement="outside"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          isRequired
          type="email"
          label="Email"
          labelPlacement="outside"
          defaultValue={user?.email}
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="flex flex-col gap-3">
          <CheckboxGroup
            className="gap-1"
            label="Select Tech Stacks"
            orientation="horizontal"
            value={groupSelected}
            // @ts-ignore
            onChange={setGroupSelected}
          >
            {stackGroup.map((stack) => (
              // @ts-ignore
              <CustomCheckbox value={stack} key={stack}>
                {stack}
              </CustomCheckbox>
            ))}
          </CheckboxGroup>
          <Input
            type="text"
            labelPlacement="outside"
            placeholder="Additional Tech Stacks"
            variant="bordered"
            onChange={(e) => setStackInput(e.target.value)}
            value={stackInput}
            onKeyDown={handleKeyDown}
          />
          <p className="mt-4 ml-1 text-default-500 font-semibold">
            Selected: {groupSelected.join(", ")}
          </p>
        </div>

        <Button type="submit" color="primary">
          Update
        </Button>
      </form>
    </div>
  )
}

export default CoderProfile
