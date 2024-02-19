"use client"
import { User } from "@nextui-org/user"
import { notFound } from "next/navigation"
import React from "react"
import ProjectCard from "@/components/ProjectCard"
import { useQuery } from "convex/react"
import { api } from "@convex/_generated/api"
import { useAppUser } from "@/lib/useAppUser"

interface FeedbackPageProps {
  params: { projectId: string; feedbackId: string }
}

const FeedbackPage: React.FC<FeedbackPageProps> = ({ params }) => {
  const user = useAppUser()
  const feedbackId = params.feedbackId
  const projectId = params.projectId
  const project = useQuery(api.projects.getProjectById, { id: projectId })
  const feedback = useQuery(api.feedback.getFeedbackById, { id: feedbackId })
  if (!project || !feedback) {
    return <p>Loading...</p>
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
            <User
              name="Jane Doe"
              description="github name"
              avatarProps={{
                src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
              }}
            />
          </div>
          <dl>
            <dt className="font-semibold">Overall Feedback</dt>
            <dd>{feedback.overallFeedback}</dd>
          </dl>
          <dl>
            <dt className="font-semibold">Positive Feedback</dt>
            <dd>{feedback.positiveFeedback}</dd>
          </dl>
          <p>Rooms for improvement:</p>
          {feedback.specificFeedback &&
            feedback.specificFeedback.length > 0 &&
            feedback.specificFeedback?.map((item, index) => (
              <dl key={index}>
                <dt className="font-semibold">{item.area}</dt>
                <dd>{item.feedback}</dd>
              </dl>
            ))}
        </div>
      </div>
    </>
  )
}

export default FeedbackPage
