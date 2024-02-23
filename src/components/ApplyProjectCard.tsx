"use client"
import { Doc, Id } from "@convex/_generated/dataModel"
import React from "react"
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Spinner,
  Link,
} from "@nextui-org/react"
import SkillTagList from "./SkillTagList"

interface ApplyProjectCardProps {
  project: Doc<"projects">
  setSelectedId: React.Dispatch<React.SetStateAction<Id<"projects"> | null>>
  setSelectedName: React.Dispatch<React.SetStateAction<string | undefined>>
}

const ApplyProjectCard: React.FC<ApplyProjectCardProps> = ({
  project,
  setSelectedId,
  setSelectedName,
}) => {
  const { _id, displayName, techStack, html_url, full_name } = project
  const handleChoose = () => {
    setSelectedId(_id)
    setSelectedName(full_name)
  }
  return (
    <>
      <Card>
        <CardHeader className="flex flex-col items-start">
          <p>
            <Link href={`/projects/${_id}`}>{displayName}</Link>
          </p>
          <p>
            <Link href={html_url} showAnchorIcon>
              {full_name}
            </Link>
          </p>
        </CardHeader>
        <CardBody>
          <SkillTagList skills={techStack} showFull={true} />
        </CardBody>
        <CardFooter>
          <Button onClick={handleChoose}>Apply with this project</Button>
        </CardFooter>
      </Card>
    </>
  )
}

const ApplyProjectCardList = ({
  projects,
  setSelectedId,
  setSelectedName,
}: {
  projects: Doc<"projects">[]
  setSelectedId: React.Dispatch<React.SetStateAction<Id<"projects"> | null>>
  setSelectedName: React.Dispatch<React.SetStateAction<string | undefined>>
}) => {
  return (
    <>
      {projects.map((project) => (
        <ApplyProjectCard
          key={project._id}
          project={project}
          setSelectedId={setSelectedId}
          setSelectedName={setSelectedName}
        />
      ))}
    </>
  )
}

export default ApplyProjectCardList
