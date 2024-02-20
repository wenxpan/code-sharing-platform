import CoderTable from "@/components/CoderList"
import React from "react"

interface UsersPageProps {}

const UsersPage: React.FC<UsersPageProps> = () => {
  return (
    <div className="p-8">
      <CoderTable />
    </div>
  )
}

export default UsersPage
