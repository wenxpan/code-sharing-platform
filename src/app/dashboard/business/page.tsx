"use client"

import { useAppUser } from "@/lib/useAppUser"
import { api } from "@convex/_generated/api"
import { Id } from "@convex/_generated/dataModel"
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Link,
  Spinner,
} from "@nextui-org/react"
import { useMutation, useQuery } from "convex/react"
import { redirect } from "next/navigation"
import React from "react"

interface BusinessDashboardProps {}

const BusinessDashboard: React.FC<BusinessDashboardProps> = () => {
  const { status, user } = useAppUser()

  if (status === "unauthenticated") {
    redirect("/")
  }

  if (user && user.role === "coder") redirect("/jobs")

  const company = user?.company
  // const company = 'Google'

  const jobs = useQuery(api.jobs.getJobsByCompany, {
    companyName: company || "",
  })
  const deleteJob = useMutation(api.jobs.deleteJobById)

  const handleDelete = (id: Id<"jobs">) => {
    deleteJob({ id })
  }

  if (company === undefined || user === undefined || jobs === undefined) {
    return <Spinner />
  }

  if (company === null) {
    return (
      <div>
        <h1 className="font-bold text-2xl p-5">
          Unable to fetch company information. Please check with your admin.
        </h1>
      </div>
    )
  }

  if (jobs === null) {
    return (
      <div>
        <h1 className="font-bold text-2xl p-5">
          Oops, it seems like no jobs currently
        </h1>
      </div>
    )
  }

  return (
    <>
      <h1 className="font-bold text-2xl p-5">Jobs at {company}</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {jobs &&
          jobs.map((job) => (
            <Card className="h-full" key={job._id}>
              <CardHeader className="flex justify-between items-center gap-3">
                <Link
                  className="text-md text-default-900"
                  href={`/jobs/${job._id}`}
                >
                  {job.position}
                </Link>
                <Button
                  className="place-self-end"
                  color="danger"
                  onClick={() => handleDelete(job._id)}
                >
                  Delete
                </Button>
              </CardHeader>
              <Divider />
              <CardBody className="h-full">
                <p>{job.jobDescription}</p>
              </CardBody>
              <Divider />
              <CardFooter className="my-2">
                <p>Tech Stack Required: {job.techStack.join(", ")}</p>
              </CardFooter>
            </Card>
          ))}
      </div>
    </>
  )
}

export default BusinessDashboard
