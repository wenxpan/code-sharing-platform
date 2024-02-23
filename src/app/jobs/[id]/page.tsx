"use client"
import { useAppUser } from "@/lib/useAppUser"
import { Id } from "@convex/_generated/dataModel"
import { Button } from "@nextui-org/button"
import Link from "next/link"
import React from "react"

interface JobPageProps {
  params: { id: Id<"jobs"> }
}

const JobPage: React.FC<JobPageProps> = ({ params }) => {
  const { user } = useAppUser()
  return (
    <>
      <div className="mt-4">
        {user!.role === "coder" ? (
          <Button color="primary" as={Link} href={`/jobs/${params.id}/apply`}>
            Apply
          </Button>
        ) : (
          <section>
            <h2 className="font-semibold text-lg mt-4">Review Applications</h2>
            {/* <ProjectCardList /> */}
          </section>
        )}
      </div>
    </>
  )
}

export default JobPage
