import { Doc } from "@convex/_generated/dataModel"
import React from "react"
import SkillTagList from "./SkillTagList"

interface JobInfoProps {
  job: Doc<"jobs">
}

const JobInfo: React.FC<JobInfoProps> = ({ job }) => {
  const {
    companyName,
    email,
    jobDescription,
    position,
    techStack,
    externalPostUrl,
  } = job

  return (
    <>
      <article className="mx-auto py-8 flex flex-col gap-4 items-start">
        <h1 className="font-bold text-2xl">{position}</h1>
        <section className="grid grid-cols-2">
          <h2>Company</h2>
          {companyName} ({email})<h2>External Job Post</h2>
          {externalPostUrl ? (
            <>
              <p>{externalPostUrl}</p>
            </>
          ) : (
            <p>N/A (just apply here!)</p>
          )}
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
        <section>
          <h2 className="font-semibold text-lg mb-4 mt-8">Job Description:</h2>
          <p>{jobDescription}</p>
        </section>
      </article>
    </>
  )
}

export default JobInfo
