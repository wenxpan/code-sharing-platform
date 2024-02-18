import { Doc } from "./_generated/dataModel"
import { mutation, query } from "./_generated/server"
import { v } from "convex/values"

export const getProjects = query({
  handler: async (ctx, args) => {
    const projects = await ctx.db.query("projects").collect()
    return projects
  },
})

export const getProjectById = query({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    const project = await ctx.db
      .query("projects")
      .filter((q) => q.eq(q.field("_id"), args.id))
      .unique()
    return project
  },
})

export const createProject = mutation({
  args: {
    data: v.object({
      allow_forking: v.boolean(),
      collaborators: v.array(
        v.object({
          avatar_url: v.string(),
          html_url: v.string(),
          id: v.float64(),
          login: v.string(),
          role_name: v.string(),
        })
      ),
      displayName: v.string(),
      full_name: v.string(),
      homepage: v.string(),
      html_url: v.string(),
      id: v.float64(),
      open_issues: v.float64(),
      screenshots: v.array(v.object({ alt: v.string(), url: v.string() })),
      techStack: v.array(v.object({ name: v.string() })),
      owner: v.optional(v.id("users")),
    }),
  },
  handler: async (ctx, args) => {
    const newProjectId = await ctx.db.insert("projects", args.data)
    return newProjectId
  },
})
