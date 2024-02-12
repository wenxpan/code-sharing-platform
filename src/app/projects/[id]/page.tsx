import FeedbackCard from "@/components/FeedbackCard"
import { ScreenshotsCarousel } from "@/components/ScreenshotsCarousel"
import SkillTagList from "@/components/SkillTagList"
import { Button } from "@nextui-org/button"
import { User } from "@nextui-org/user"
import { notFound } from "next/navigation"
import React from "react"

interface ProjectPageProps {
  params: { id: string }
}

const ProjectPage: React.FC<ProjectPageProps> = ({ params }) => {
  const id = params.id
  const project = {
    name: "Tailwind Color Contrast Checker",
    openIssues: 4,
    techStack: ["html", "css", "tailwind css", "javascript"]
  }
  return (
    <article className="max-w-lg mx-auto py-8 flex flex-col gap-4 items-start">
      <h1 className="font-bold text-2xl">{project.name}</h1>
      <User
        name="Jane Doe"
        description="github name"
        avatarProps={{
          src: "https://i.pravatar.cc/150?u=a04258114e29026702d"
        }}
      />
      <section className="grid grid-cols-2">
        <h2>Repository</h2>
        <p>github.com</p>
        <h2>Website</h2>
        <p>www.example.com</p>
      </section>
      <Button>Leave feedback</Button>
      <ScreenshotsCarousel />
      <section>
        <h2 className="font-semibold text-lg">Tech Stack:</h2>
        <SkillTagList skills={project.techStack} />
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
