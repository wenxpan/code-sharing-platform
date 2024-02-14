import { Avatar } from "@nextui-org/avatar"
import React from "react"

interface FeedbackCardProps {}

const FeedbackCard: React.FC<FeedbackCardProps> = () => {
  return (
    <>
      <div className="flex gap-2 py-2">
        <p>
          <Avatar showFallback name="Jane" src="" />
        </p>
        <div>
          <p className="font-semibold">Jane Doe</p>
          <p className="line-clamp-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi soluta
            consectetur cumque non repellat saepe incidunt necessitatibus at,
            repellendus tempore!
          </p>
        </div>
        <p className="self-center">&#8594;</p>
      </div>
    </>
  )
}

export default FeedbackCard
