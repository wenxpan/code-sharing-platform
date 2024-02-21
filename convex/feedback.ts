// import { Doc } from "./_generated/dataModel"
import { Id } from "./_generated/dataModel"
import { mutation, query } from "./_generated/server"
import { v } from "convex/values"

export interface FeedbackOverview {
  _id: Id<"feedback">
  overallFeedback: string
  project: { name: string | undefined; _id: Id<"projects"> | undefined }
  postedBy: { name: string | undefined; _id: Id<"users"> | undefined }
}

export type FeedbackOverviewResult = FeedbackOverview[] | undefined | null

export const getFeedback = query({
  handler: async (ctx, args) => {
    const feedback = await ctx.db.query("feedback").collect()
    return feedback
  },
})

export const getFeedbackById = query({
  args: { id: v.id("feedback") },
  handler: async (ctx, args) => {
    const feedback = await ctx.db.get(args.id)
    const user = feedback && (await ctx.db.get(feedback.postedBy))
    return {
      ...feedback,
      postedBy: {
        picture: user?.picture,
        name: user?.name,
        _id: user?._id,
      },
    }
  },
})

export const getFeedbackByProject = query({
  // TODO: with index
  args: { projectId: v.id("projects") },
  handler: async (ctx, args) => {
    const feedback = await ctx.db
      .query("feedback")
      .filter((q) => q.eq(q.field("projectId"), args.projectId))
      .collect()
    const feedbackWithUser = await Promise.all(
      feedback.map(async (fb) => {
        const user = await ctx.db.get(fb.postedBy)
        return {
          ...fb,
          postedBy: {
            picture: user?.picture,
            name: user?.name,
            _id: user?._id,
          },
        }
      })
    )

    return feedbackWithUser
  },
})

export const getPostedFeedbackByUser = query({
  // TODO: with index
  args: { userId: v.optional(v.id("users")) },
  handler: async (ctx, args) => {
    // TODO: check if this step is necesssary
    if (!args.userId) {
      return null
    }
    const feedback = await ctx.db
      .query("feedback")
      .filter((q) => q.eq(q.field("postedBy"), args.userId))
      .collect()
    const feedbackWithProject = await Promise.all(
      feedback.map(async (fb) => {
        const project = await ctx.db.get(fb.projectId)
        const user = await ctx.db.get(fb.postedBy)
        return {
          _id: fb._id,
          overallFeedback: fb.overallFeedback,
          project: {
            name: project?.displayName,
            _id: project?._id,
          },
          postedBy: {
            name: user?.name,
            _id: user?._id,
          },
        }
      })
    )
    return feedbackWithProject
  },
})

export const getReceivedFeedbackByUser = query({
  // TODO: with index
  args: { userId: v.optional(v.id("users")) },
  handler: async (ctx, args): Promise<FeedbackOverviewResult> => {
    // TODO: check if this step is necesssary
    if (!args.userId) {
      return null
    }

    // get all projects owned by the user
    const projectsOwnedByUser = await ctx.db
      .query("projects")
      .filter((q) => q.eq(q.field("owner"), args.userId))
      .collect()

    const projectIds = projectsOwnedByUser.map((project) => project._id)

    const allFeedback = await ctx.db.query("feedback").order("desc").collect()

    // get 5 recent feedback
    const filteredFeedback = allFeedback
      .filter((feedback) => projectIds.includes(feedback.projectId))
      .slice(0, 5)

    const feedbackOverview = await Promise.all(
      filteredFeedback.map(async (fb) => {
        const project = await ctx.db.get(fb.projectId)
        const user = await ctx.db.get(fb.postedBy)
        return {
          _id: fb._id,
          overallFeedback: fb.overallFeedback,
          project: { name: project?.displayName, _id: project?._id },
          postedBy: { name: user?.name, _id: user?._id },
        }
      })
    )
    return feedbackOverview
  },
})

export const createFeedback = mutation({
  args: {
    data: v.object({
      projectId: v.id("projects"),
      postedBy: v.id("users"),
      overallFeedback: v.string(),
      specificFeedback: v.optional(
        v.array(v.object({ area: v.string(), feedback: v.string() }))
      ),
      positiveFeedback: v.string(),
    }),
  },
  handler: async (ctx, args) => {
    const newFeedbackId = await ctx.db.insert("feedback", args.data)
    return newFeedbackId
  },
})
