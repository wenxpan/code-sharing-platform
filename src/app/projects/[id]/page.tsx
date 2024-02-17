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

const fetchTechStack = async (name: string) => {
  const res = await fetch(`https://api.github.com/repos/${name}/languages`)
  const data = await res.json()
  const langs = Object.keys(data)
  return langs
}

const ProjectPage: React.FC<ProjectPageProps> = ({ params }) => {
  // const id = params.id
  const id = 718520545
  const project = useQuery(api.projects.getProjectById, { id })
  // const techStack = (async () => await fetchTechStack("wenxpan/task-hatch-frontend"))(),

  if (!project) {
    return <p>Loading...</p>
  }

  const userData = {
    login: "wenxpan",
    id: 28617120,
    name: "WP",
    avatar_url: "https://avatars.githubusercontent.com/u/28617120?v=4",
    html_url: "https://github.com/wenxpan",
  }

  return (
    <article className="max-w-xl mx-auto py-8 flex flex-col gap-4 items-start">
      <h1 className="font-bold text-2xl">{project.displayName}</h1>
      <User
        name={userData.name}
        description={userData.login}
        avatarProps={{
          src: userData.avatar_url,
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
      <ScreenshotsCarousel screenshots={project.screenshots} />
      <section>
        <h2 className="font-semibold text-lg">Tech Stack:</h2>
        {/* <SkillTagList skills={project.techStack} /> */}
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
