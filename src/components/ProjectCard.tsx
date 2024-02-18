"use client"
import React from "react"
import { Image } from "@nextui-org/image"
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card"
import { Button } from "@nextui-org/button"
import { User } from "@nextui-org/user"
import NextImage from "next/image"
import SkillTagList from "./SkillTagList"
import Link from "next/link"
import { useQuery } from "convex/react"
import { api } from "@convex/_generated/api"
import { Icon } from "@iconify-icon/react"
import { Doc } from "@convex/_generated/dataModel"

interface ProjectCardProps {
  project: Doc<"projects">
}

interface ProjectListProps {
  projects: Doc<"projects">[]
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const owner = project.owner
  const user = useQuery(api.users.getCoder, { userId: owner })
  console.log({ user, project })
  if (!user) {
    return <p>Loading...</p>
  }

  return (
    <Card className="py-4" shadow="sm">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <User
          name={user.name}
          description={user.githubLogin}
          avatarProps={{
            src: user.avatar_url,
          }}
        />
        <h4 className="font-bold text-large mt-2">{project.displayName}</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2 flex flex-col gap-2">
        <Image
          as={NextImage}
          alt={project.screenshots[0]?.alt || ""}
          className="object-cover rounded-xl"
          src={
            project.screenshots[0]?.url || "https://placehold.co/300x200/png"
          }
          width={300}
          height={200}
          priority
          // fallbackSrc="https://via.placeholder.com/300x200"
        />
        <SkillTagList skills={project.techStack} showFull={false} />
      </CardBody>
      <CardFooter className="flex gap-2">
        <Button
          color="primary"
          variant="bordered"
          as={Link}
          href={project.homepage}
          endContent={<Icon icon="ph:globe" />}
        >
          Preview
        </Button>
        <Button
          color="primary"
          href={`/projects/${project._id}`}
          as={Link}
          endContent={<Icon icon="gg:arrow-right-o" />}
        >
          Details
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ProjectCard

const ProjectCardList: React.FC<ProjectListProps> = ({ projects }) => {
  return (
    <div className="py-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 place-items-center">
      {projects.map((proj) => (
        <ProjectCard project={proj} key={proj._id} />
      ))}
    </div>
  )
}

export { ProjectCardList, ProjectCard }
