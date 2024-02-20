// import { Doc } from "./_generated/dataModel"
import { Id } from "./_generated/dataModel"
import { mutation, query } from "./_generated/server"
import { v } from "convex/values"

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
