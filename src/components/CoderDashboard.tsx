"use client"
import React from "react"
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card"
import { Divider, Link, Spinner } from "@nextui-org/react"
import { useAppUser } from "@/lib/useAppUser"
import ProfileCard from "./ProfileCard"
import { Id } from "@convex/_generated/dataModel"
import { useQuery } from "convex/react"
import { api } from "@convex/_generated/api"

interface FeedbackOverviewCardProps {
  feedback: feedbackWithProject
}

interface feedbackWithProject {
  _id: Id<"feedback">
  overallFeedback: string
  project: {
    name: string
    _id: Id<"projects">
  }
}
const FeedbackOverviewCard: React.FC<FeedbackOverviewCardProps> = ({
  feedback,
}) => {
  console.log({ feedback })
  return (
    <Card>
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <p className="text-md">{feedback.project.name}</p>
          <p className="text-small text-default-500">Feedback</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>{feedback.overallFeedback}</p>
      </CardBody>
      <Divider />
      <CardFooter>
        <Link showAnchorIcon href={`/projects/${feedback.project._id}`}>
          View complete project
        </Link>
      </CardFooter>
    </Card>
  )
}

interface CoderDashboardProps {}

export const CoderDashboard: React.FC<CoderDashboardProps> = () => {
  const { user } = useAppUser()
  const feedback: feedbackWithProject[] = useQuery(
    api.feedback.getFeedbackByUser,
    {
      userId: user?._id,
    }
  )
  if (!user || feedback === undefined) return <Spinner />

  return (
    <article className="grid grid-cols-10 gap-4 pt-10">
      <div className="flex col-start-3 col-span-2">
        <ProfileCard coder={user} />
      </div>
      <div className="flex flex-wrap col-start-5 col-span-4 w-full">
        <div>
          <div className="space-y-1 flex justify-between">
            <div className="flex flex-col justify-start">
              <h4 className="text-large font-medium">Received Feedback</h4>
              <p className="text-small text-default-400">
                See how others think of your projects
              </p>
            </div>
            <Link className="flex justify-end" href="#">
              View All
            </Link>
          </div>
          <Divider className="my-4" />
          <ul>
            {feedback.map((fb) => (
              <li key={fb._id}>
                <FeedbackOverviewCard feedback={fb} />
              </li>
            ))}
          </ul>
        </div>
        <br className="py-10" />
        <div>
          <div className="space-y-1 flex justify-between">
            <div className="flex flex-col justify-start">
              <h4 className="text-large font-medium">Posted Feedback</h4>
              <p className="text-small text-default-400">
                Thanks for giving out ideas
              </p>
            </div>
            <Link className="flex justify-end" href="#">
              View All
            </Link>
          </div>
          <Divider className="my-4" />
          <ul className="gap-2 flex flex-col">
            {feedback.map((fb) => (
              <li key={fb._id}>
                <FeedbackOverviewCard feedback={fb} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* <h2 className="font-bold">{name}</h2>
        <h2 className="font-bold">{skills}</h2>
        <h2 className="font-bold">{feedback}</h2> */}
    </article>
  )
}

export default CoderDashboard
