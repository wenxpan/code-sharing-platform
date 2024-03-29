"use client"
import { notFound } from "next/navigation"
import React from "react"
import ProjectCard, { ProjectCardList } from "@/components/ProjectCard"
import FeedbackCard from "@/components/FeedbackCommentCard"
import { Avatar, Button, Link } from "@nextui-org/react"
import { TrophyIcon } from "@heroicons/react/24/outline"
import { HeartIcon } from "@heroicons/react/24/outline"
import { useQuery } from "convex/react"
import { api } from "@convex/_generated/api"
import { Id } from "@convex/_generated/dataModel"
import { FeedbackOverviewResult } from "@convex/feedback"
import { FeedbackOverviewCard } from "@/components/FeedbackOverviewCard"

interface UserPageProps {
  params: { id: Id<"users"> }
}

const UserPage: React.FC<UserPageProps> = ({ params }) => {
  const id = params.id
  const user = useQuery(api.users.getUserById, { id })
  const projects = useQuery(api.projects.getProjectByOwner, {
    owner: user?._id,
  })
  const displayedProjects = projects?.slice(0, 2)
  const feedbackPosted: FeedbackOverviewResult = useQuery(
    api.feedback.getPostedFeedbackByUser,
    {
      userId: user?._id,
    }
  )

  if (user === undefined) return <p>Loading...</p>
  if (user === null) {
    notFound()
  }

  return (
    <div className="flex flex-col mx-auto sm:px-10 py-5">
      <div className="flex gap-2 items-center">
        <Avatar src={user.picture || user.github?.avatar_url || ""} />
        <h1 className="font-bold text-xl">{user.name}</h1>
      </div>
      <div className="mt-4">
        {user.github && (
          <Link href={user.github.html_url}>Github: {user.github.login}</Link>
        )}
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
        {displayedProjects && displayedProjects.length > 3 && (
          <Button>View all projects</Button>
        )}
        {displayedProjects && displayedProjects.length > 0 ? (
          <ProjectCardList projects={displayedProjects} />
        ) : (
          <p>No projects yet</p>
        )}
      </section>
      <section>
        <h2 className="text-lg font-semibold py-5">Feedback posted</h2>
        <div className="flex-col max-w-xl">
          {feedbackPosted ? (
            feedbackPosted?.map((fb) => (
              <FeedbackOverviewCard key={fb._id} feedback={fb} />
            ))
          ) : (
            <p>No feedback posted</p>
          )}
        </div>
      </section>
    </div>
  )
}

export default UserPage
