"use client"

import { JobCardList } from "@/components/JobCard"
import { api } from "@convex/_generated/api"
import { Doc } from "@convex/_generated/dataModel"
import { Spinner } from "@nextui-org/react"
import { useQuery } from "convex/react"
import React from "react"

interface JobsPageProps {}

const JobsPage: React.FC<JobsPageProps> = () => {
  const jobs: Doc<"jobs">[] | undefined | null = useQuery(api.jobs.getJobs)
  if (jobs === undefined) {
    return <Spinner />
  }
  return (
    <>
      <h1 className="font-bold text-2xl">Available Jobs</h1>
      {jobs ? (
        jobs.map((job) => <JobCardList key={job._id} job={job} />)
      ) : (
        <p>No jobs yet</p>
      )}
    </>
  )
}

export default JobsPage
