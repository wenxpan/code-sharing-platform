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
import { coders } from "@/template_data/Coders"
import { User } from "@nextui-org/user"
import SkillTagList from "./SkillTagList"

type Coder = (typeof coders)[0]

interface CoderTableProps {}

const CoderTable: React.FC<CoderTableProps> = () => {
  const columns = [
    { name: "Name", uid: "name" },
    { name: "Feedback posted", uid: "feedbackPosted" },
    { name: "Feedback received", uid: "feedbackReceived" },
    { name: "Skills", uid: "skills" },
  ]

  // TODO: add pagination
  const renderCell = React.useCallback((coder: Coder, columnKey: React.Key) => {
    const cellValue = coder[columnKey as keyof Coder]

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: coder.avatar }}
            description={coder.github}
            name={cellValue}
          >
            {coder.github}
          </User>
        )
      case "feedbackPosted":
        return <p className="text-bold text-sm capitalize">{cellValue}</p>
      case "feedbackReceived":
        return <p className="text-bold text-sm capitalize">{cellValue}</p>
      case "skills":
        return <SkillTagList skills={coder.skills} />

      default:
        return cellValue
    }
  }, [])

  return (
    <Table aria-label="Example table with custom cells">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} className="uppercase">
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={coders}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

export default CoderTable
