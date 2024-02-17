import { ProjectCard } from "@/components/ProjectCard"
import React from "react"

interface ProjectsPageProps {}

const ProjectsPage: React.FC<ProjectsPageProps> = () => {
  // TODO: change back to card list
  return (
    <>
      <h1 className="font-bold text-2xl">All projects</h1>
      <div className="flex justify-center">
        <div className="py-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 place-items-center">
          <ProjectCard id={1} />
        </div>
      </div>
    </>
  )
}

export default ProjectsPage
