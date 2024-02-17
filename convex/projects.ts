import { mutation, query } from "./_generated/server"
import { v } from "convex/values"

export const getProjects = query({
  handler: async (ctx, args) => {
    const projects = await ctx.db.query("projects").collect()
    return projects
  },
})

export const getProjectById = query({
  args: { id: v.float64() },
  handler: async (ctx, args) => {
    const project = await ctx.db
      .query("projects")
      .filter((q) => q.eq(q.field("id"), args.id))
      .unique()
    return project
  },
})
