"use client"
import SkillTagList from "@/components/SkillTagList"
import { useAppUser } from "@/lib/useAppUser"
import { api } from "@convex/_generated/api"
import { Id } from "@convex/_generated/dataModel"
import { Button } from "@nextui-org/button"
import { Spinner } from "@nextui-org/react"
import { useQuery } from "convex/react"
import { useRouter } from "next/navigation"
import React from "react"

interface JobPageProps {
  params: { id: Id<"jobs"> }
}

const JobPage: React.FC<JobPageProps> = ({ params }) => {
  const { user } = useAppUser()
  const id = params
  const router = useRouter()

  const job = useQuery(api.jobs.getJobById, id)

  // TODO: add project cards

  if (user === null) {
    router.push("/")
    return
  }

  if (job === null) {
    return <h1>Couldn&apsot find page</h1>
  }

  if (job === undefined || user === undefined) {
    return <Spinner />
  }

  const {
    companyName,
    email,
    jobDescription,
    position,
    techStack,
    externalPostUrl,
  } = job

  return (
    <article className="mx-auto py-8 flex flex-col gap-4 items-start">
      <h1 className="font-bold text-2xl">{position}</h1>

      <section className="grid grid-cols-2">
        <h2>Company</h2>
        {companyName} ({email})
      </section>
      <section className="grid grid-cols-2">
        <h2>External Job Post</h2>
        {externalPostUrl ? (
          <>
            <p>{externalPostUrl}</p>
          </>
        ) : (
          <p>N/A (just apply here!)</p>
        )}
      </section>
      <section>
        <h2 className="font-semibold text-lg mb-4 mt-8">Desired Tech Stack:</h2>
        <SkillTagList
          skills={techStack.map((skill) => ({
            name: skill,
          }))}
          showFull={true}
        />
      </section>
      <section>
        <h2 className="font-semibold text-lg mb-4 mt-8">Job Description:</h2>
        <p>{jobDescription}</p>
      </section>
      <div className="mt-4">
        {user.role === "coder" ? (
          <Button color="primary">Apply</Button>
        ) : (
          <section>
            <h2 className="font-semibold text-lg mt-4">Review Applications</h2>
            {/* <ProjectCardList /> */}
          </section>
        )}
      </div>
    </article>
  )
}

export default JobPage
