// import { Doc } from "./_generated/dataModel"
import { mutation, query } from "./_generated/server"
import { v } from "convex/values"

export const getFeedback = query({
  handler: async (ctx, args) => {
    const feedback = await ctx.db.query("feedback").collect()
    return feedback
  },
})

export const getFeedbackById = query({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    const feedback = await ctx.db
      .query("feedback")
      .filter((q) => q.eq(q.field("_id"), args.id))
      .unique()
    return feedback
  },
})

export const createFeedback = mutation({
  args: {
    data: v.object({
      projectId: v.id("projects"),
      postedBy: v.string(),
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
