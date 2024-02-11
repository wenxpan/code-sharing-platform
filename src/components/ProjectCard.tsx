import React from "react"
import { Image } from "@nextui-org/image"
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card"
import { Button, ButtonGroup } from "@nextui-org/react"
import { User } from "@nextui-org/user"
import NextImage from "next/image"

interface ProjectCardProps {}

const SkillTagList: React.FC<{ skills: string[] }> = ({ skills }) => {
  return (
    <ul className="flex gap-1">
      {skills.map((skill) => (
        <li key={skill} className="bg-gray-200 rounded-full px-3 py-1">
          {skill}
        </li>
      ))}
    </ul>
  )
}

const ProjectCard: React.FC<ProjectCardProps> = () => {
  const skills = ["html", "css", "react", "..."]
  return (
    <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <User
          name="Jane Doe"
          description="Product Designer"
          avatarProps={{
            src: "https://i.pravatar.cc/150?u=a04258114e29026702d"
          }}
        />
        <h4 className="font-bold text-large mt-2">Tailwind color contrast</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2 flex flex-col gap-2">
        <Image
          as={NextImage}
          alt="Website screenshot"
          className="object-cover rounded-xl"
          src="https://picsum.photos/300/200"
          width={300}
          height={200}
          // fallbackSrc="https://via.placeholder.com/300x200"
        />
        <SkillTagList skills={skills} />
      </CardBody>
      <CardFooter>
        <ButtonGroup className="mt-4 *:grow w-full">
          <Button color="secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
              />
            </svg>
            Preview
          </Button>
          <Button color="primary">
            Details
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  )
}

export default ProjectCard
