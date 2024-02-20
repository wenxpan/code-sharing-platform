import { Doc, Id } from "@convex/_generated/dataModel"
import { Avatar } from "@nextui-org/avatar"
import Link from "next/link"
import { Button } from "@nextui-org/react"
import React from "react"

export interface FeedbackWithUser {
  projectId: Id<"projects">
  overallFeedback: string
  positiveFeedback: string
  postedBy: {
    picture: string | undefined
    name: string | undefined
    _id: Id<"users"> | undefined
  }
  _id: Id<"feedback">
  _creationTime: number
  specificFeedback?:
    | {
        feedback: string
        area: string
      }[]
    | undefined
}

interface FeedbackCardProps {
  feedback: FeedbackWithUser
}

const FeedbackCard: React.FC<FeedbackCardProps> = ({ feedback }) => {
  return (
    <>
      <div className="flex gap-2 py-2 w-full items-center">
        <div className="self-start">
          <Avatar
            showFallback
            name={feedback.postedBy.name}
            src={feedback.postedBy.picture}
          />
        </div>
        <div className="grow">
          <p className="font-semibold">{feedback.postedBy.name}</p>
          <p className="line-clamp-2">{feedback.overallFeedback}</p>
        </div>
        <div>
          <Button
            as={Link}
            className="self-center py-1 rounded-lg"
            href={`/projects/${feedback.projectId}/feedback/${feedback._id}`}
          >
            &#8594;
          </Button>
        </div>
      </div>
    </>
  )
}

export default FeedbackCard
