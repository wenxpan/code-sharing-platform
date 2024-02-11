import ProjectCard from "@/components/ProjectCard"
import React from "react"

interface ProjectsPageProps {}

const ProjectsPage: React.FC<ProjectsPageProps> = () => {
  return (
    <>
      <h1>project page</h1>
      <div className="flex">
        <ProjectCard />
      </div>
    </>
  )
}

export default ProjectsPage
