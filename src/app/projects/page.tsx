"use client"
import { ProjectCardList } from "@/components/ProjectCard"
import { api } from "@convex/_generated/api"
import { Spinner } from "@nextui-org/react"
import { useQuery } from "convex/react"
import React from "react"

interface ProjectsPageProps {}

const ProjectsPage: React.FC<ProjectsPageProps> = () => {
  const projects = useQuery(api.projects.getProjects, {})

  return (
    <>
      <h1 className="font-bold text-2xl">All projects</h1>
      {projects === undefined ? (
        <Spinner />
      ) : (
        <div className="flex justify-center">
          <ProjectCardList projects={projects} />
        </div>
      )}
    </>
  )
}

export default ProjectsPage
