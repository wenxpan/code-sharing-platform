import { mutation, query } from "./_generated/server"
import { v } from "convex/values"

export const createJobs = mutation({
  args: {
    data: v.object({
      position: v.string(),
      companyName: v.string(),
      jobDescription: v.string(),
      email: v.string(),
      techStack: v.array(v.string()),
      externalPostUrl: v.optional(v.string()),
    }),
  },
  handler: async (ctx, args) => {
    const newJobId = await ctx.db.insert("jobs", args.data)
    return newJobId
  },
})

export const getJobs = query({
  handler: async (ctx) => {
    const jobs = await ctx.db.query("jobs").collect()
    return jobs
  },
})

export const getJobById = query({
  args: { id: v.id("jobs") },
  handler: async (ctx, args) => {
    const job = await ctx.db.get(args.id)
    return job
  },
})

export const getJobsByCompany = query({
  args: { companyName: v.string() },
  handler: async (ctx, args) => {
    const jobs = await ctx.db
      .query("jobs")
      .filter((q) => q.eq(q.field("companyName"), args.companyName))
      .collect()
    return jobs
  },
})

export const deleteJobById = mutation({
  args: { id: v.id("jobs") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id)
  },
})
