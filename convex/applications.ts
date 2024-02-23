import { Doc, Id } from "./_generated/dataModel"
import { mutation, query } from "./_generated/server"
import { v } from "convex/values"

export interface ApplicationWithInfo extends Doc<"applications"> {
  job: Doc<"jobs">
  applicant: Doc<"users">
  project: Doc<"projects">
}

export interface ApplicationsTableCellValue {
  key: Id<"applications">
  jobName: string
  companyName: string
  projectName: string
}
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
  args: { id: v.optional(v.id("users")) },
  handler: async (ctx, args) => {
    const applications = await ctx.db
      .query("applications")
      .filter((q) => q.eq(q.field("applicantId"), args.id))
      .collect()

    const applicationsWithInfo = await Promise.all(
      applications.map(async (a) => {
        const job = await ctx.db.get(a.jobId)
        const applicant = await ctx.db.get(a.applicantId)
        const project = await ctx.db.get(a.projectId)
        return {
          ...a,
          job,
          applicant,
          project,
        } as ApplicationWithInfo
      })
    )
    return applicationsWithInfo
  },
})

export const getApplicationTableByUser = query({
  args: { id: v.optional(v.id("users")) },
  handler: async (ctx, args) => {
    const applications = await ctx.db
      .query("applications")
      .filter((q) => q.eq(q.field("applicantId"), args.id))
      .collect()

    const applicationsTableValue = await Promise.all(
      applications.map(async (a) => {
        const job = await ctx.db.get(a.jobId)
        const project = await ctx.db.get(a.projectId)
        return {
          key: a._id,
          jobName: job?.position,
          companyName: job?.companyName,
          projectName: project?.full_name,
        } as ApplicationsTableCellValue
      })
    )
    return applicationsTableValue
  },
})

export const checkApplyStatus = query({
  args: { applicantId: v.id("users"), jobId: v.id("jobs") },
  handler: async (ctx, args) => {
    const application = await ctx.db
      .query("applications")
      .filter((q) => q.eq(q.field("jobId"), args.jobId))
      .filter((q) => q.eq(q.field("applicantId"), args.applicantId))
      .unique()

    const project = application && (await ctx.db.get(application.projectId))
    return { application, project }
  },
})
