import { mutation, query } from "./_generated/server"
import { v } from "convex/values"

export const createApplication = mutation({
  args: {
    data: v.object({
      jobId: v.id("jobs"),
      applicantId: v.id("users"),
      projectId: v.id("projects"),
      text: v.optional(v.string()),
    }),
  },
  handler: async (ctx, args) => {
    const newApplicationId = await ctx.db.insert("applications", args.data)
    return newApplicationId
  },
})

export const getApplicationsByJob = query({
  args: { id: v.id("jobs") },
  handler: async (ctx, args) => {
    const applications = await ctx.db
      .query("applications")
      .filter((q) => q.eq(q.field("jobId"), args.id))
      .collect()
    return applications
  },
})

export const getApplicationsByUser = query({
  args: { id: v.id("users") },
  handler: async (ctx, args) => {
    const applications = await ctx.db
      .query("applications")
      .filter((q) => q.eq(q.field("applicantId"), args.id))
      .collect()
    return applications
  },
})

export const checkApplyStatus = query({
  args: { applicantId: v.id("users"), jobId: v.id("jobs") },
  handler: async (ctx, args) => {
    const application = await ctx.db
      .query("applications")
      .filter((q) => q.eq(q.field("jobId"), args.jobId))
      .filter((q) => q.eq(q.field("applicantId"), args.applicantId))
      .collect()
    return application
  },
})
