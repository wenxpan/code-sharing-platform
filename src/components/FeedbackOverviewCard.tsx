"use client"
import React from "react"
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card"
import { Divider, Link } from "@nextui-org/react"
import { FeedbackOverview, FeedbackOverviewResult } from "@convex/feedback"

interface FeedbackOverviewCardProps {
  feedback: FeedbackOverview
}
interface FeedbackOverviewSectionProps {
  feedback: FeedbackOverviewResult
  heading: string
  subHeading: string
}

const FeedbackOverviewCard: React.FC<FeedbackOverviewCardProps> = ({
  feedback,
}) => {
  return (
    <Card shadow="sm">
      <CardHeader className="flex gap-3">
        <Link href="#" color="foreground" className="text-md font-medium">
          {feedback.project.name}
        </Link>
      </CardHeader>
      <Divider />
      <CardBody>
        <p className="line-clamp-2">{feedback.overallFeedback}</p>
      </CardBody>
      <Divider />
      <CardFooter>
        <Link
          showAnchorIcon
          href={`/projects/${feedback.project._id}/feedback/${feedback._id}`}
        >
          View complete feedback
        </Link>
      </CardFooter>
    </Card>
  )
}

const FeedbackOverviewSection: React.FC<FeedbackOverviewSectionProps> = ({
  heading,
  subHeading,
  feedback,
}) => {
  return (
    <div>
      <div className="flex flex-col justify-start">
        <h4 className="text-large font-medium">{heading}</h4>
        <p className="text-small text-default-400">{subHeading}</p>
      </div>
      <Divider className="my-4" />
      {feedback && feedback.length > 0 ? (
        <ul className="gap-4 flex flex-col">
          {feedback.map((fb) => (
            <li key={fb._id}>
              <FeedbackOverviewCard feedback={fb} />
            </li>
          ))}
        </ul>
      ) : (
        <p>No feedback yet</p>
      )}
    </div>
  )
}

export { FeedbackOverviewCard, FeedbackOverviewSection }
