"use client"
import FeedbackCard, {
  FeedbackWithUser,
} from "@/components/FeedbackCommentCard"
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
import { Doc, Id } from "@convex/_generated/dataModel"
import { Spinner } from "@nextui-org/react"

interface ProjectPageProps {
  params: { projectId: Id<"projects"> }
}

const ProjectPage: React.FC<ProjectPageProps> = ({ params }) => {
  const id = params.projectId
  const project: Doc<"projects"> | null | undefined = useQuery(
    api.projects.getProjectById,
    { id },
  )
  const ownerId = project?.owner || null
  const user: Doc<"users"> | null | undefined = useQuery(
    api.users.getUserById,
    { id: ownerId! },
  )
  const feedback = useQuery(api.feedback.getFeedbackByProject, {
    projectId: id,
  }) as FeedbackWithUser[]

  if (project === null || ownerId === null || user === null) {
    notFound()
  }

  if (!project || !user || !feedback) {
    return <Spinner />
  }

  return (
    <article className="max-w-xl mx-auto py-8 flex flex-col gap-4 items-start">
      <h1 className="font-bold text-2xl">{project.displayName}</h1>
      <User
        name={user.name}
        description={user.github?.login}
        avatarProps={{
          src: user.picture || user.github?.avatar_url,
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
      <Button color="primary" as={Link} href={`/projects/${id}/feedback/new`}>
        Leave feedback
      </Button>
      {project.screenshots.length > 0 && (
        <ScreenshotsCarousel screenshots={project.screenshots} />
      )}
      <section>
        <h2 className="font-semibold text-lg">Tech Stack:</h2>
        <SkillTagList skills={project.techStack} showFull={true} />
      </section>
      <section className="w-full">
        <h2 className="font-semibold text-lg">Feedback</h2>
        <ul>
          {feedback.map((fb) => (
            <li key={fb._id}>
              <FeedbackCard feedback={fb} />
            </li>
          ))}
        </ul>
      </section>
    </article>
  )
}

export default ProjectPage
