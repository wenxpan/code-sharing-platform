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
} from "@nextui-org/react"
import { useQuery } from "convex/react"
import React, { useState } from "react"

interface ApplyJobPageProps {
  params: { id: Id<"jobs"> }
}

const ApplyJobPage: React.FC<ApplyJobPageProps> = ({ params }) => {
  const { user } = useAppUser()
  const projects = useQuery(api.projects.getProjectByOwner, {
    owner: user?._id,
  })
  console.log({ projects })
  const [chosen, setChosen] = useState("")

  if (projects === undefined) {
    return <Spinner />
  }

  return <>{projects && <ApplyProjectCardList projects={projects} />}</>
}

export default ApplyJobPage
