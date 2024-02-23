"use client"
import { useAppUser } from "@/lib/useAppUser"
import { api } from "@convex/_generated/api"
import { Id } from "@convex/_generated/dataModel"
import {
  Spinner,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react"
import { useMutation, useQuery } from "convex/react"
import { useRouter } from "next/navigation"
import React from "react"

interface CoderJobsPageProps {}

const CoderJobsPage: React.FC<CoderJobsPageProps> = () => {
  const { user } = useAppUser()

  const appliedJobs = useQuery(api.applications.getApplicationTableByUser, {
    id: user?._id as Id<"users">,
  })

  const router = useRouter()

  const columns = [
    {
      key: "jobName",
      label: "Job Position",
    },
    {
      key: "companyName",
      label: "Company Name",
    },
    {
      key: "projectName",
      label: "Submitted Project",
    },
  ]

  if (user === undefined || appliedJobs === undefined) {
    return <Spinner />
  }

  if (user === null) {
    router.push("/dashboard")
  }

  return (
    <>
      <Table aria-label="Applied Jobs Table">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={appliedJobs || []}
          emptyContent={"No applications yet."}
        >
          {(item) => (
            <TableRow key={item.key}>
              {(columnKey) => (
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  )
}

export default CoderJobsPage
