"use client"
import { Button } from "@nextui-org/button"
import { useRouter } from "next/navigation"
import { Textarea } from "@nextui-org/input"
import React from "react"
import { useForm, Controller, useFieldArray } from "react-hook-form"
import { Doc, Id } from "@convex/_generated/dataModel"
import { useAppUser } from "@/lib/useAppUser"
import { useMutation, useQuery } from "convex/react"
import { api } from "@convex/_generated/api"
import { Input } from "@nextui-org/input"
import ProjectCard from "@/components/ProjectCard"
import { Spinner } from "@nextui-org/react"

interface FeedbackPageProps {
  params: { projectId: Id<"projects"> }
}

const FeedbackPage: React.FC<FeedbackPageProps> = ({ params }) => {
  const router = useRouter()
  const projectId = params.projectId
  const project = useQuery(api.projects.getProjectById, { id: projectId })
  const createFeedback = useMutation(api.feedback.createFeedback)
  const incrementScoreToCoder = useMutation(api.users.incrementScoreToCoder)
  const { user } = useAppUser()
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Doc<"feedback">>({
    defaultValues: {
      projectId,
      postedBy: "",
      overallFeedback: "",
      positiveFeedback: "",
      specificFeedback: [],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "specificFeedback",
  })

  if (!user || !project) {
    return <Spinner />
  }

  const onSubmit = async (data: Doc<"feedback">) => {
    const feedbackId = await createFeedback({
      data: {
        ...data,
        postedBy: user._id,
      },
    })
    await incrementScoreToCoder({
      data: {
        _id: user._id,
        increment: 5,
      },
    })
    // TODO: add redirect & toast
    console.log({ feedbackId })
    router.push(`/projects/${projectId}`)
  }

  return (
    <>
      <ProjectCard project={project} />
      <h1 className="text-xl font-bold my-4">New feedback</h1>
      <form
        className="grid w-full gap-4 max-w-xl place-items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name="overallFeedback"
          control={control}
          render={({ field }) => (
            <Textarea
              label="Overall feedback"
              {...field}
              className="col-span-2 md:col-span-1"
            />
          )}
        />
        <Controller
          name="positiveFeedback"
          control={control}
          render={({ field }) => (
            <Textarea
              label="Positive feedback"
              className="col-span-2 md:col-span-1"
              placeholder="Write about the things you liked or learned from this project"
              {...field}
            />
          )}
        />
        {/* specific areas */}
        <div className="col-span-2 w-full">
          <p className="font-semibold mb-2">Specific areas for improvement</p>
          <ul className="flex flex-col gap-2">
            {fields.map((item, index) => (
              <li key={item.id} className="flex flex-col items-start gap-2">
                <div className="flex gap-2 w-full items-center">
                  <Controller
                    name={`specificFeedback.${index}.area`}
                    control={control}
                    render={({ field }) => (
                      <Input
                        label="Area"
                        placeholder="e.g. UI/UX/Code/Data"
                        {...field}
                      />
                    )}
                  />
                  <Button type="button" onClick={() => remove(index)}>
                    Delete
                  </Button>
                </div>
                <Controller
                  name={`specificFeedback.${index}.feedback`}
                  control={control}
                  render={({ field }) => (
                    <Textarea label="Feedback" {...field} className="mb-2" />
                  )}
                />
              </li>
            ))}
          </ul>
          <Button
            type="button"
            className="mt-2"
            onClick={() => append({ area: "", feedback: "" })}
          >
            Add area
          </Button>
        </div>
        <Button type="submit" color="primary" className="w-full col-span-2">
          Submit
        </Button>
      </form>
    </>
  )
}

export default FeedbackPage
