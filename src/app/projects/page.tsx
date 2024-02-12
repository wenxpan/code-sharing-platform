import { ProjectCardList } from "@/components/ProjectCard"
import React from "react"

interface ProjectsPageProps {}

const ProjectsPage: React.FC<ProjectsPageProps> = () => {
  return (
    <>
      <h1 className="font-bold text-2xl">All projects</h1>
      <div className="flex justify-center">
        <ProjectCardList />
      </div>
    </>
  )
}

export default ProjectsPage
