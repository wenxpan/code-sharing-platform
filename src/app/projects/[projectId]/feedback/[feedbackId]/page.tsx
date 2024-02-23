"use client"
import { User } from "@nextui-org/user"
import { notFound } from "next/navigation"
import React from "react"
import ProjectCard from "@/components/ProjectCard"
import { useQuery } from "convex/react"
import { api } from "@convex/_generated/api"
import { useAppUser } from "@/lib/useAppUser"
import { Link, Spinner } from "@nextui-org/react"
import { FeedbackWithUser } from "@/components/FeedbackCommentCard"
import { Id } from "@convex/_generated/dataModel"

interface FeedbackPageProps {
  params: { projectId: Id<"projects">; feedbackId: Id<"feedback"> }
}

const FeedbackPage: React.FC<FeedbackPageProps> = ({ params }) => {
  const project = useQuery(api.projects.getProjectById, {
    id: params.projectId,
  })
  const feedback = useQuery(api.feedback.getFeedbackById, {
    id: params.feedbackId,
  }) as FeedbackWithUser

  if (feedback === undefined || project === undefined) {
    return <Spinner />
  }

  if (feedback === null || project === null) {
    notFound()
  }

  return (
    <>
      <div className="flex gap-4 flex-col items-center sm:items-start p-5 sm:flex-row mx-auto md:gap-10">
        <div>
          <ProjectCard project={project} />
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 items-center">
            <p>Feedback by:</p>
            <Link
              href={`/users/${feedback.postedBy._id}`}
              className="text-black"
            >
              <User
                name={feedback.postedBy.name}
                avatarProps={{
                  src: feedback.postedBy.picture,
                }}
              />
            </Link>
          </div>
          <section>
            <h2 className="font-semibold">Overall Feedback</h2>
            <p>{feedback.overallFeedback}</p>
          </section>
          <section>
            <h2 className="font-semibold">Positive Feedback</h2>
            <p>{feedback.positiveFeedback}</p>
          </section>
          <h2 className="mt-6 italic">Rooms for improvement:</h2>
          {feedback.specificFeedback &&
            feedback.specificFeedback.length > 0 &&
            feedback.specificFeedback?.map((item, index) => (
              <section key={index}>
                <h3 className="font-semibold">{item.area}</h3>
                <p>{item.feedback}</p>
              </section>
            ))}
        </div>
      </div>
    </>
  )
}

export default FeedbackPage
