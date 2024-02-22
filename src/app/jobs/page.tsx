"use client"

import { JobCardList } from "@/components/JobCard"
import { api } from "@convex/_generated/api"
import { Doc } from "@convex/_generated/dataModel"
import { useQuery } from "convex/react"
import React from "react"

interface JobsPageProps {}

const JobsPage: React.FC<JobsPageProps> = () => {
  const jobs: Doc<"jobs">[] = useQuery(api.jobs.getJobs)
  return (
    <>
      <h1 className="font-bold text-2xl">Available Jobs</h1>
      {jobs.map((job) => (
        <JobCardList key={job._id} job={job} />
      ))}
    </>
  )
}

export default JobsPage
