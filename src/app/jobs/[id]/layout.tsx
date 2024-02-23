"use client"
import JobInfo from "@/components/JobInfo"
import { useAppUser } from "@/lib/useAppUser"
import { api } from "@convex/_generated/api"
import { Id } from "@convex/_generated/dataModel"
import { Spinner } from "@nextui-org/react"
import { useQuery } from "convex/react"
import { useRouter } from "next/navigation"
import React from "react"

const JobsPageLayout = ({
  children,
  params,
}: {
  children: React.ReactNode
  params: { id: Id<"jobs"> }
}) => {
  const { user } = useAppUser()
  const id = params
  const router = useRouter()

  const job = useQuery(api.jobs.getJobById, id)

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
  return (
    <>
      <JobInfo job={job} />
      {children}
    </>
  )
}

export default JobsPageLayout
