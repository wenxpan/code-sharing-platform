import FeedbackCard from "@/components/FeedbackCard"
import { ScreenshotsCarousel } from "@/components/ScreenshotsCarousel"
import SkillTagList from "@/components/SkillTagList"
import { Button } from "@nextui-org/button"
import { User } from "@nextui-org/user"
import { notFound } from "next/navigation"
import { Textarea } from "@nextui-org/input"
import React from "react"

interface FeedbackPageProps {
  params: { id: string }
}

const FeedbackPage: React.FC<FeedbackPageProps> = ({ params }) => {
  const id = params.id
  const feedbackInfo = {
    name: ""
  }

  return (
    <>
      <h1>New feedback</h1>
      <form>
        <Textarea
          label="Description"
          placeholder="Enter your description"
          className="max-w-xs"
        />
      </form>
    </>
  )
}

export default FeedbackPage
