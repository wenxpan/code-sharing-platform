"use client"
import React from "react"
import { Image } from "@nextui-org/image"
import { Card, CardHeader, CardBody } from "@nextui-org/card"
import { Link } from "@nextui-org/react"
import { Doc } from "@convex/_generated/dataModel"

// Profile card from here
interface ProfileCardProps {
  coder: Doc<"users">
}

const ProfileCard: React.FC<ProfileCardProps> = ({ coder }) => {
  const { name, picture, github, _id } = coder
  return (
    <div>
      <Card shadow="sm">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <p className="text-lg uppercase font-bold">{name}</p>
          {github && (
            <Link className="text-default-500" href={github.html_url}>
              Github: {github.login}
            </Link>
          )}
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Link href={`/users/${_id}`}>
            <Image
              className="object-cover rounded-xl"
              src={picture || github?.avatar_url || ""}
              width={135}
            />
          </Link>
          <p className="text-center">Points: xx</p>
          <div className="flex flex-col items-center">
            <h4 className="font-bold text-large">Skills</h4>
            {/* TODO: add skills to user */}
            {/* <ul>
              {skills.map((skill) => (
                <li key={skill} className="mb-2">
                  {skill}
                </li>
              ))}
            </ul> */}
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default ProfileCard
