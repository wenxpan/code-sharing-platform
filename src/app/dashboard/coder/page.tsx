"use client"
import React from "react"
import { Button, Link, Spinner } from "@nextui-org/react"
import { useAppUser } from "@/lib/useAppUser"
import ProfileCard from "@/components/ProfileCard"
import { useQuery } from "convex/react"
import { api } from "@convex/_generated/api"
import { FeedbackOverviewResult } from "@convex/feedback"
import { FeedbackOverviewSection } from "@/components/FeedbackOverviewCard"

interface CoderDashboardProps {}

const CoderDashboardPage: React.FC<CoderDashboardProps> = () => {
  const { user } = useAppUser()
  const feedbackPosted: FeedbackOverviewResult = useQuery(
    api.feedback.getPostedFeedbackByUser,
    {
      userId: user?._id,
    }
  )
  console.log({ feedbackPosted })
  const feedbackReceived: FeedbackOverviewResult = useQuery(
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
          <Button as={Link} href="/dashboard/coder/profile">
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

export default CoderDashboardPage
