import { JobCardList } from "@/components/JobCard"
import React from "react"

interface JobsPageProps {}

const JobsPage: React.FC<JobsPageProps> = () => {
  return (
    <>
      <h1 className="font-bold text-2xl">Available Jobs</h1>
      <JobCardList />
    </>
  )
}

export default JobsPage
