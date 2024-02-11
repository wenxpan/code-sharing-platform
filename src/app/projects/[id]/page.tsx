import { notFound } from "next/navigation"
import React from "react"

interface ProjectPageProps {
  params: { id: string }
}

const ProjectPage: React.FC<ProjectPageProps> = ({ params }) => {
  const id = params.id
  const project = { name: "Tailwind Color Contrast Checker" }
  return (
    <article>
      <h2 className="font-bold">{project.name}</h2>
    </article>
  )
}

export default ProjectPage
