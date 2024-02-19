"use client"
import SkillTagList from "@/components/SkillTagList"
import { api } from "@convex/_generated/api"
import { Button } from "@nextui-org/button"
import { User } from "@nextui-org/user"
import { useQuery } from "convex/react"
import React from "react"

interface JobPageProps {
  params: { id: string }
}

const JobPage: React.FC<JobPageProps> = ({ params }) => {
  const id = params

  // console.log("job id is ", id)
  const job = useQuery(api.jobs.getJobById, id)
  // console.log(job)

  if (job === undefined) {
    return <h1>Couldn&apsot find page</h1>
  } else {
    const { companyName, email, jobDescription, position, techStack } = job[0]

    return (
      <article className="mx-auto py-8 flex flex-col gap-4 items-start">
        <h1 className="font-bold text-2xl">{position}</h1>
        <User
          name="Jane Doe"
          description={companyName}
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
          <h2 className="font-semibold text-lg mb-4 mt-8">
            Desired Tech Stack:
          </h2>
          <SkillTagList
            skills={techStack.map((skill) => ({
              name: skill,
            }))}
            showFull={true}
          />
        </section>
        <Button color="primary">Apply</Button>
        <section>
          <h2 className="font-semibold text-lg mt-4">Applications</h2>
          {/* <ProjectCardList /> */}
        </section>
      </article>
    )
  }
}

export default JobPage
