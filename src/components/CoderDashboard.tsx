"use client"
import React from "react"
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card"
import { Button, Divider, Link, Spinner } from "@nextui-org/react"
import { useAppUser } from "@/lib/useAppUser"
import ProfileCard from "./ProfileCard"
import { useQuery } from "convex/react"
import { api } from "@convex/_generated/api"
import { FeedbackOverview } from "@convex/feedback"
import {
  FeedbackOverviewCard,
  FeedbackOverviewSection,
} from "./FeedbackOverviewCard"

interface CoderDashboardProps {}

export const CoderDashboard: React.FC<CoderDashboardProps> = () => {
  const { user } = useAppUser()
  const feedbackPosted: FeedbackOverview[] = useQuery(
    api.feedback.getPostedFeedbackByUser,
    {
      userId: user?._id,
    }
  )
  const feedbackReceived: FeedbackOverview[] = useQuery(
    api.feedback.getReceivedFeedbackByUser,
    {
      userId: user?._id,
    }
  )

  if (!user || feedbackPosted === undefined || feedbackReceived === undefined)
    return <Spinner />

  return (
    <article className="flex flex-col sm:flex-row gap-8 sm:gap-4 pt-10">
      <div className="flex flex-col gap-4">
        <ProfileCard coder={user} />
        <div className="flex flex-col gap-2">
          <Button as={Link} href="/projects/new">
            New Project
          </Button>
          <Button as={Link} href="/profile">
            Profile
          </Button>
          <Button as={Link} href="/dashboard/coder/projects">
            My Projects
          </Button>
          <Button as={Link} href="/dashboard/coder/jobs">
            Applied Jobs
          </Button>
        </div>
      </div>
      <div className="flex flex-col w-full gap-8 sm:gap-20">
        <FeedbackOverviewSection
          heading="Recently Received Feedback"
          subHeading="See how others think of your projects"
          feedback={feedbackReceived}
        />
        <FeedbackOverviewSection
          heading="Recently Posted Feedback"
          subHeading="Thanks for giving out ideas"
          feedback={feedbackPosted}
        />
      </div>
    </article>
  )
}

export default CoderDashboard
