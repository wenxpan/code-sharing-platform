"use client"

import React from "react"
import { Doc } from "@convex/_generated/dataModel"
import { useQuery } from "convex/react"
import { api } from "@convex/_generated/api"
import ProfileCard from "./ProfileCard"

interface CoderListProps {}

const CoderList: React.FC<CoderListProps> = () => {
  const coders = useQuery(api.users.getCoders, {})
  if (!coders) {
    return <p>Loading...</p>
  }

  // TODO: add pagination or infinite scroll

  return (
    <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
      {coders.map((coder: Doc<"users">) => (
        <li key={coder._id}>
          <ProfileCard coder={coder} />
        </li>
      ))}
    </ul>
  )
}

export default CoderList
