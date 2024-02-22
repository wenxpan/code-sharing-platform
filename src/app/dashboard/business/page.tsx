"use client"

import { useAppUser } from "@/lib/useAppUser"
import { api } from "@convex/_generated/api"
import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Link } from "@nextui-org/react"
import { useMutation, useQuery } from "convex/react"
import { redirect } from "next/navigation"
import React, { use } from "react"

interface BusinessDashboardProps { }

const BusinessDashboard: React.FC<BusinessDashboardProps> = () => {

  const { status, user } = useAppUser()

  if (status === "unauthenticated") {
    redirect("/")
  }

  if (user && user.role === 'coder') redirect('/jobs')

  const company = user?.company
  // const company = 'Google'


  if (company) {

    const jobs = useQuery(api.jobs.getJobsByCompany, { companyName: company })

    const deleteJob = useMutation(api.jobs.deleteJobById)

    const handleSubmit = (id: string) => {
      deleteJob({ storageId: id })
    }

    return (<>
      <h1 className="font-bold text-2xl p-5">Jobs at {company}</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {jobs && jobs.map((job) => (
          <Card className='h-full' key={job._id}>
            <CardHeader className="flex justify-between items-center gap-3">

              <div className="flex flex-col">
                <p className="text-md">{job.position}</p>
                <p className="text-small text-default-500">{company}</p>


              </div>
              <Button className="place-self-end" color="danger" onSubmit={() => handleSubmit(job._id)}>Delete</Button>
            </CardHeader>
            <Divider />
            <CardBody className="h-full">
              <p>{job.jobDescription}</p>
            </CardBody>
            <Divider />
            <CardFooter className="my-2">
              <p>Tech Stack Required: {job.techStack.join(', ')}</p>
            </CardFooter>
          </Card>

        ))}
      </div>
    </>)
  } else return (
    <div>
      <h1 className="font-bold text-2xl p-5">Oops, it seems like no jobs currently</h1>

    </div>
  )
}

export default BusinessDashboard
