"use client"

import React from "react"
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table"
import { User } from "@nextui-org/user"
import SkillTagList from "./SkillTagList"
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

  // TODO: add pagination

  return (
    <ul>
      {coders.map((coder: Doc<"users">) => (
        <li key={coder._id}>
          <ProfileCard coder={coder} />
        </li>
      ))}
    </ul>
  )
}

export default CoderList
