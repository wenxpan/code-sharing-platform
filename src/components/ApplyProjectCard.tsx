"use client"
import { Doc } from "@convex/_generated/dataModel"
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
}

const ApplyProjectCard: React.FC<ApplyProjectCardProps> = ({ project }) => {
  const { _id, displayName, techStack, html_url, full_name } = project
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
          <Button>Apply with this project</Button>
        </CardFooter>
      </Card>
    </>
  )
}

const ApplyProjectCardList = ({
  projects,
}: {
  projects: Doc<"projects">[]
}) => {
  return (
    <>
      {projects.map((project) => (
        <ApplyProjectCard key={project._id} project={project} />
      ))}
    </>
  )
}

export default ApplyProjectCardList
