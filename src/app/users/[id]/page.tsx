import { User } from "@nextui-org/user"
import { notFound } from "next/navigation"
import React from "react"
import ProjectCard from "@/components/ProjectCard"
import FeedbackCard from "@/components/FeedbackCard"
import { Avatar } from "@nextui-org/react"
import { TrophyIcon } from "@heroicons/react/24/outline"
import { HeartIcon } from "@heroicons/react/24/outline"

interface UserPageProps {
  params: { id: string }
}

const UserPage: React.FC<UserPageProps> = ({ params }) => {
  const id = params.id

  return (
    <div className="flex flex-col max-w-5xl mx-auto sm:px-10 py-5">
      <div className="flex gap-2 items-center">
        <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
        <h1 className="font-bold text-xl">Jane Doe</h1>
      </div>
      <div className="mt-4">
        <p>github account</p>
        <div className="flex gap-2 items-center">
          <TrophyIcon className="h-4 w-4" />
          <p>20 feedback posted</p>
        </div>
        <div className="flex gap-2 items-center">
          <HeartIcon className="h-4 w-4" />
          <p>20 feedback received</p>
        </div>
      </div>
      <section>
        <h2 className="text-lg font-semibold py-5">Projects</h2>
        <div className="grid place-items-center gap-2 md:grid-cols-2 lg:grid-cols-3">
          {/* TODO: customise profile project card, remove name */}
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
        </div>
      </section>
      <section>
        <h2 className="text-lg font-semibold py-5">Feedback posted</h2>
        <div className="flex-col max-w-xl">
          <FeedbackCard />
          <FeedbackCard />
          <FeedbackCard />
        </div>
      </section>
    </div>
  )
}

export default UserPage
