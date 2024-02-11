import ProjectCard from "@/components/ProjectCard"
import React from "react"

interface ProjectsPageProps {}

const ProjectsPage: React.FC<ProjectsPageProps> = () => {
  return (
    <>
      <div className="flex justify-center">
        <div className="py-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 place-items-center">
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
        </div>
      </div>
    </>
  )
}

export default ProjectsPage
