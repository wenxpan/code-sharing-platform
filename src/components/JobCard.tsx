import React from "react"
import { Card, CardHeader, CardBody } from "@nextui-org/card"
import SkillTagList from "./SkillTagList"

interface JobCardProps {}

const JobCard: React.FC<JobCardProps> = () => {
  return (
    <>
      <Card className="my-2" shadow="none">
        <CardHeader className="flex gap-3">
          <div className="flex flex-col">
            <p className="text-lg">Frontend Developer</p>
            <p className="text-md text-default-500">Company name</p>
          </div>
        </CardHeader>
        <CardBody>
          <SkillTagList
            skills={[
              { name: "html" },
              { name: "css" },
              { name: "aws" },
              { name: "javascript" },
            ]}
            showFull={true}
          />
        </CardBody>
      </Card>
    </>
  )
}

const JobCardList: React.FC<JobCardProps> = () => {
  return (
    <div className="flex flex-col self-start">
      <JobCard />
      <JobCard />
      <JobCard />
    </div>
  )
}

export { JobCard, JobCardList }
