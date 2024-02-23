"use client"
import { useAppUser } from "@/lib/useAppUser"
import { api } from "@convex/_generated/api"
import { Id } from "@convex/_generated/dataModel"
import { Button } from "@nextui-org/button"
import { Spinner } from "@nextui-org/react"
import { useQuery } from "convex/react"
import Link from "next/link"
import React from "react"

interface JobPageProps {
  params: { id: Id<"jobs"> }
}

const JobPage: React.FC<JobPageProps> = ({ params }) => {
  const { user } = useAppUser()
  const hasCoderApplied = useQuery(api.applications.checkApplyStatus, {
    applicantId: user!._id,
    jobId: params.id,
  })

  console.log({ hasCoderApplied })

  if (hasCoderApplied === undefined) {
    return <Spinner />
  }

  const coderApplyStatus =
    hasCoderApplied === undefined ? (
      <Spinner />
    ) : hasCoderApplied.application ? (
      <p>
        You have already applied with project{" "}
        {hasCoderApplied.project?.full_name}
      </p>
    ) : (
      <Button color="primary" as={Link} href={`/jobs/${params.id}/apply`}>
        Apply
      </Button>
    )

  return (
    <>
      <div className="mt-4">
        {user!.role === "coder" ? (
          coderApplyStatus
        ) : (
          <Button color="primary" as={Link} href={`/jobs/${params.id}/review`}>
            Review Applications
          </Button>
        )}
      </div>
    </>
  )
}

export default JobPage
