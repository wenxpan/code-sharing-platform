"use client"
import { useAppUser } from "@/lib/useAppUser"
import { api } from "@convex/_generated/api"
import { useMutation, useQuery } from "convex/react"
import React from "react"
import {
  Table,
  TableColumn,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
} from "@nextui-org/table"
import { Button } from "@nextui-org/button"
import { toast } from "react-toastify"
import { Id } from "@convex/_generated/dataModel"
import { useRouter } from "next/navigation"

const UserManagement: React.FC = () => {
  const { user } = useAppUser()
  const employees = useQuery(api.users.getEmployees, {
    company: user?.company,
  })
  const router = useRouter()

  const deleteEmployee = useMutation(api.users.deleteEmployee)

  const handleDeleteUser = (id: Id<"users">) => {
    toast.promise(deleteEmployee({ _id: id }), {
      pending: "Deleting...",
      success: "Successfully deleted",
      error: "Deletion failed. Please  try again",
    })
  }

  if (user && user.role !== "businessAdmin") {
    router.push("/dashboard")
  }

  if (!employees) {
    return null
  }

  return (
    <>
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>Email</TableColumn>
          <TableColumn>Role</TableColumn>
          <TableColumn>POSITION</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {employees?.map((employee) => (
            <TableRow key={employee._id}>
              <TableCell>{employee.name}</TableCell>
              <TableCell>{employee.email}</TableCell>
              <TableCell>{employee.position}</TableCell>
              <TableCell>{employee.role}</TableCell>
              <TableCell>
                <Button
                  color="danger"
                  onClick={() => handleDeleteUser(employee._id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

export default UserManagement
