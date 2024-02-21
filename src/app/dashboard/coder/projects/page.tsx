"use client"
import { ProjectCardList } from "@/components/ProjectCard"
import { useAppUser } from "@/lib/useAppUser"
import { api } from "@convex/_generated/api"
import { Doc } from "@convex/_generated/dataModel"
import { Spinner } from "@nextui-org/react"
import { useQuery } from "convex/react"
import { redirect } from "next/navigation"
import React from "react"

interface CoderProjectsPageProps {}

const CoderProjectsPage: React.FC<CoderProjectsPageProps> = () => {
  const { status, user } = useAppUser()
  const projects: Doc<"projects">[] | undefined = useQuery(
    api.projects.getProjectByOwner,
    {
      owner: user?._id,
    }
  )

  if (status === "unauthenticated") {
    redirect("/dashboard")
  }

  if (!user) {
    return <Spinner />
  }

  return (
    <>
      <h1 className="font-bold text-2xl">Projects by {user.name}</h1>
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

export default CoderProjectsPage
