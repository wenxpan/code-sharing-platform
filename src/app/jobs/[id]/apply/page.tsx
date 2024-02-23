"use client"
import ApplyProjectCardList from "@/components/ApplyProjectCard"
import SkillTagList from "@/components/SkillTagList"
import { useAppUser } from "@/lib/useAppUser"
import { api } from "@convex/_generated/api"
import { Id } from "@convex/_generated/dataModel"
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Spinner,
  Link,
  Input,
} from "@nextui-org/react"
import { useMutation, useQuery } from "convex/react"
import { useRouter } from "next/navigation"
import React, { useState } from "react"

interface ApplyJobPageProps {
  params: { id: Id<"jobs"> }
}

const ApplyJobPage: React.FC<ApplyJobPageProps> = ({ params }) => {
  const { user } = useAppUser()
  const { id } = params
  const projects = useQuery(api.projects.getProjectByOwner, {
    owner: user?._id,
  })
  const [selectedId, setSelectedId] = useState<Id<"projects"> | null>(null)
  const [selectedName, setSelectedName] = useState<string | undefined>(
    undefined
  )
  const [description, setDescription] = useState("")
  const router = useRouter()

  const createApplication = useMutation(api.applications.createApplication)
  if (projects === undefined) {
    return <Spinner />
  }

  if (user && user.role !== "coder") {
    router.push(`/jobs/${params.id}`)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (id && selectedId && user!._id && description) {
        const data = {
          jobId: id,
          projectId: selectedId,
          applicantId: user!._id,
          text: description,
        }
        await createApplication({ data })
        router.push(`/jobs/${id}`)
      }
    } catch (e) {
      console.error("error applying.")
    }
  }

  return (
    <>
      <form
        className="flex flex-col gap-2 py-4"
        onSubmit={(e) => handleSubmit(e)}
      >
        <Input
          label="summary"
          description="Why do you think the project will showcase your skills"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button type="submit" color="primary" isDisabled={!selectedName}>
          {selectedName ? `Apply with ${selectedName}` : "choose project below"}
        </Button>
      </form>
      {projects && (
        <ApplyProjectCardList
          projects={projects}
          setSelectedId={setSelectedId}
          setSelectedName={setSelectedName}
        />
      )}
    </>
  )
}

export default ApplyJobPage
