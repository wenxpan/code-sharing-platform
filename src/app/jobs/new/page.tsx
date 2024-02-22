"use client"

import { Button, CheckboxGroup, Input, Textarea } from "@nextui-org/react"
import React from "react"
import CustomCheckbox from "@/components/ui/checkbox"
import { useMutation } from "convex/react"
import { api } from "@convex/_generated/api"
import { useRouter } from "next/navigation"

const NewJob: React.FC = () => {
  const router = useRouter()
  const [email, setEmail] = React.useState("")
  const [position, setPosition] = React.useState("")
  const [companyName, setCompanyName] = React.useState("")
  const [jobDescription, setJobDescription] = React.useState("")
  const [externalPostUrl, setExternalPostUrl] = React.useState("")
  const [groupSelected, setGroupSelected] = React.useState([])
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

  const createJobs = useMutation(api.jobs.createJobs)
  // TODO: auto populate company name

  const validateEmail = (email: string) =>
    email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i)

  const isInvalid = React.useMemo(() => {
    if (email === "") return false

    return validateEmail(email) ? false : true
  }, [email])

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

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const newJobId = await createJobs({
      data: {
        email: email,
        position,
        companyName,
        jobDescription,
        externalPostUrl,
        techStack: groupSelected,
      },
    })
    router.push(`/jobs/${newJobId}`)
  }

  return (
    <div>
      <h1 className="pb-8">Post a new job!</h1>
      <form onSubmit={handleSubmit} className="grid gap-y-10">
        <div className="flex flex-col gap-4">
          <Input
            isRequired
            type="text"
            label="Position"
            placeholder="Position"
            labelPlacement="outside"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />
          <Input
            isRequired
            type="text"
            label="Company Name"
            placeholder="Company Name"
            labelPlacement="outside"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
          <Input
            type="text"
            label="External Job Post Link"
            placeholder="External Job Post Link"
            labelPlacement="outside"
            value={externalPostUrl}
            onChange={(e) => setExternalPostUrl(e.target.value)}
          />
          <Textarea
            isRequired
            type="text"
            label="JD"
            labelPlacement="outside"
            placeholder="Enter your job description"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
          <Input
            isRequired
            value={email}
            type="email"
            label="Contact Email"
            labelPlacement="outside"
            placeholder="johndoe@hotmail.com"
            variant="bordered"
            isInvalid={isInvalid}
            color={isInvalid ? "danger" : undefined}
            errorMessage={isInvalid && "Please enter a valid email"}
            onValueChange={setEmail}
            // className="max-w-xs"
          />

          <div>
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
            <p className="mt-4 ml-1 text-default-500">
              Selected: {groupSelected.join(", ")}
            </p>
            <Input
              type="text"
              labelPlacement="outside"
              placeholder="Tech Stacks"
              variant="bordered"
              onChange={(e) => setStackInput(e.target.value)}
              value={stackInput}
              onKeyDown={handleKeyDown}
            />
          </div>
          <Button color="primary" className="mt-10" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </div>
  )
}

export default NewJob
