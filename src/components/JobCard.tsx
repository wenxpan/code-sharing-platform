import React from "react"
import { Card, CardHeader, CardBody } from "@nextui-org/card"
import SkillTagList from "./SkillTagList"
import { Link } from "@nextui-org/react"
import { Doc } from "@convex/_generated/dataModel"

interface JobCardProps {
  job: Doc<"jobs">
}

const JobCard: React.FC<JobCardProps> = (props) => {
  return (
    <>
      <Card className="my-2" shadow="none">
        <CardHeader className="flex gap-3">
          <div className="flex flex-col">
            <p className="text-lg">
              <Link href={`jobs/${props.job._id}`}> {props.job.position}</Link>
            </p>
            <p className="text-md text-default-500">{props.job.companyName}</p>
          </div>
        </CardHeader>
        <CardBody>
          <SkillTagList
            skills={props.job.techStack.map((skill) => ({ name: skill }))}
            showFull={false}
          />
        </CardBody>
      </Card>
    </>
  )
}

const JobCardList: React.FC<JobCardProps> = (props) => {
  return (
    <div className="flex flex-col self-start">
      <JobCard job={props.job} />
    </div>
  )
}

export { JobCard, JobCardList }
