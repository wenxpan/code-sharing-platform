"use client"
import { ProjectCardList } from "@/components/ProjectCard"
import SkillTagList from "@/components/SkillTagList"
import { api } from "@convex/_generated/api"
import { Button } from "@nextui-org/button"
import { User } from "@nextui-org/user"
import { useQuery } from "convex/react"
import { notFound } from "next/navigation"
import React from "react"

interface JobPageProps {
  params: { id: string }
}

const JobPage: React.FC<JobPageProps> = ({ params }) => {
  const id = params.id
  const job = {
    name: "Frontend Developer",
    techStack: [
      { name: "html" },
      { name: "css" },
      { name: "aws" },
      { name: "javascript" },
    ],
  }
  const projects = useQuery(api.projects.getProjects, {})
  return (
    <article className="mx-auto py-8 flex flex-col gap-4 items-start">
      <h1 className="font-bold text-2xl">{job.name}</h1>
      <User
        name="Jane Doe"
        description="company name"
        avatarProps={{
          src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
        }}
      />
      <section className="grid grid-cols-2">
        <h2>Company website</h2>
        <p>www.example.com</p>
        <h2>Job Post</h2>
        <p>www.example-seek.com</p>
      </section>
      <section>
        <h2 className="font-semibold text-lg mb-4 mt-8">Desired Tech Stack:</h2>
        <SkillTagList skills={job.techStack} showFull={true} />
      </section>
      <Button color="primary">Apply</Button>
      <section>
        <h2 className="font-semibold text-lg mt-4">Applications</h2>
        {projects && <ProjectCardList projects={projects} />}
      </section>
    </article>
  )
}

export default JobPage
