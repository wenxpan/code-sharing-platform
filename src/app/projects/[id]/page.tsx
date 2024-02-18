"use client"
import FeedbackCard from "@/components/FeedbackCard"
import { ScreenshotsCarousel } from "@/components/ScreenshotsCarousel"
import SkillTagList from "@/components/SkillTagList"
import { Button } from "@nextui-org/button"
import { User } from "@nextui-org/user"
import { notFound } from "next/navigation"
import React from "react"
import { Icon } from "@iconify-icon/react"
import { Link } from "@nextui-org/link"
import { useQuery } from "convex/react"
import { api } from "@convex/_generated/api"

interface ProjectPageProps {
  params: { id: string }
}

const ProjectPage: React.FC<ProjectPageProps> = ({ params }) => {
  const id = params.id
  // const id = "jh776741shb7sb1k02bq56ya756kn79e"
  const project = useQuery(api.projects.getProjectById, { id })
  const owner = project?.owner || undefined
  const user = useQuery(api.users.getCoder, { userId: owner })

  if (!project || !user) {
    return <p>Loading...</p>
  }

  return (
    <article className="max-w-xl mx-auto py-8 flex flex-col gap-4 items-start">
      <h1 className="font-bold text-2xl">{project.displayName}</h1>
      <User
        name={user.name}
        description={user.githubLogin}
        avatarProps={{
          src: user.avatar_url,
        }}
      />
      <section>
        <p>Collaborators:</p>
        <div className="flex gap-2">
          {project.collaborators.map((c) => (
            <User
              key={c.id}
              name={c.login}
              avatarProps={{ src: c.avatar_url }}
            />
          ))}
        </div>
      </section>
      <section className="grid grid-cols-2 gap-4">
        <Button
          as={Link}
          href={project.html_url}
          startContent={<Icon icon="mdi:github" height="1.5rem" />}
        >
          {project.full_name}
        </Button>
        <Button
          as={Link}
          href={project.homepage}
          startContent={<Icon icon="ph:globe-light" height="1.5rem" />}
        >
          {project.homepage}
        </Button>
      </section>
      <Button color="primary">Leave feedback</Button>
      {project.screenshots.length > 0 && (
        <ScreenshotsCarousel screenshots={project.screenshots} />
      )}
      <section>
        <h2 className="font-semibold text-lg">Tech Stack:</h2>
        <SkillTagList skills={project.techStack} showFull={true} />
      </section>
      <section>
        <h2 className="font-semibold text-lg">Feedback</h2>
        <FeedbackCard />
        <FeedbackCard />
      </section>
    </article>
  )
}

export default ProjectPage
