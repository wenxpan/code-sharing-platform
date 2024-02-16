import { notFound } from "next/navigation"
import React from "react"
import { coders } from "@/template_data/Coders"
import { Image } from "@nextui-org/image"
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card"
import { Divider, Link } from "@nextui-org/react"

// Profile card from here
interface ProfileCardProps {
  coder: {
    id: string
    name: string
    skills: string[]
    feedbackPosted: number
    feedbackReceived: number
    avatar: string
    github: string
  }
}

const ProfileCard: React.FC<ProfileCardProps> = (props) => {
  const { id, name, skills, feedbackPosted, feedbackReceived, avatar, github } =
    props.coder
  return (
    <div>
      <Card>
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <p className="text-lg uppercase font-bold">{name}</p>
          <small className="text-default-500">Placeholder....</small>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Image
            alt="Card background"
            className="object-cover rounded-xl"
            src={avatar}
            width={270}
          />
          <div className="flex flex-col items-center">
            <h4 className="font-bold text-large">Skills</h4>
            <ul>
              {skills.map((skill) => (
                <li key={skill} className="mb-2">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

// feedback received from here
const comments = [
  {
    projectName: "111",
    postedTime: "2024-02-13",
    content: "Such a good project",
    postUrl: ".../...",
  },
  {
    projectName: "222",
    postedTime: "2024-02-13",
    content: "Such a lame project",
    postUrl: ".../...",
  },
]

interface feedbackPostedComments {
  // comments: object[]
}

const FeedbackReceivedCard: React.FC<feedbackPostedComments> = (props) => {
  // comments.map(comment => (
  return (
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

      <Card>
        <CardHeader className="flex gap-3">
          <div className="flex flex-col">
            <p className="text-md">Project Name</p>
            <p className="text-small text-default-500">Feedback</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
            eveniet ducimus quaerat ex excepturi dicta perspiciatis architecto
            dolor. Tempora commodi cumque, reprehenderit maxime in deleniti
            repellat vero. Impedit, repellat eius. Lorem ipsum dolor sit amet
            consectetur, adipisicing elit. Voluptatum sapiente quam explicabo,
            veritatis autem mollitia magnam ea dolorum beatae! Velit nobis fuga
            itaque iure voluptas, officiis laborum possimus ipsa sunt.
          </p>
        </CardBody>
        <Divider />
        <CardFooter>
          <Link
            // isExternal
            showAnchorIcon
            href="https://github.com/nextui-org/nextui"
          >
            View complete project
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
  // )
  // )
}

// feedback posted from here

interface feedbackPostedComments {
  // comments: object[]
}

const FeedbackPostedCard: React.FC<feedbackPostedComments> = (props) => {
  // comments.map(comment => (
  return (
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

      <Card>
        <CardHeader className="flex gap-3">
          <div className="flex flex-col">
            <p className="text-md">Project Name</p>
            <p className="text-small text-default-500">Comment</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
            eveniet ducimus quaerat ex excepturi dicta perspiciatis architecto
            dolor. Tempora commodi cumque, reprehenderit maxime in deleniti
            repellat vero. Impedit, repellat eius. Lorem ipsum dolor sit amet
            consectetur, adipisicing elit. Voluptatum sapiente quam explicabo,
            veritatis autem mollitia magnam ea dolorum beatae! Velit nobis fuga
            itaque iure voluptas, officiis laborum possimus ipsa sunt.
          </p>
        </CardBody>
        <Divider />
        <CardFooter>
          <Link
            // isExternal
            showAnchorIcon
            href="https://github.com/nextui-org/nextui"
          >
            View complete project
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
  // )
  // )
}

interface CoderDashboardProps {
  params: { id: string }
}

const CoderDashboard: React.FC<CoderDashboardProps> = ({ params }) => {
  const id = params.id

  const coder = coders.find((c) => `${c.id}` === id)
  // const name = coder?.name;
  // const skills = coder?.skills;
  // const feedback = coder?.feedbackPosted;
  // const feebackReceived = coder?.feedbackReceived;
  // const avatar = coder?.avatar;
  // const github = coder?.github;

  if (!coder) {
    return notFound()
  }

  return (
    <article className="grid grid-cols-10 gap-4 pt-10">
      <div className="flex col-start-3 col-span-2">
        <ProfileCard coder={coder} />
      </div>
      <div className="flex flex-wrap col-start-5 col-span-4">
        <FeedbackReceivedCard />
        <br className="py-10" />
        <FeedbackPostedCard />
      </div>
      {/* <h2 className="font-bold">{name}</h2>
        <h2 className="font-bold">{skills}</h2>
        <h2 className="font-bold">{feedback}</h2> */}
    </article>
  )
}

export default CoderDashboard
