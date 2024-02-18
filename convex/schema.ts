import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    image: v.optional(v.string()),
    role: v.string(),
    avatar_url: v.optional(v.string()),
    html_url: v.optional(v.string()),
    githubLogin: v.optional(v.string()),
    githubId: v.optional(v.float64()),
  }).index("by_email", ["email"]),
  jobs: defineTable({
    position: v.string(),
    companyName: v.string(),
    jobDescription: v.string(),
    email: v.string(),
    techStack: v.array(v.string()),
  })
  projects: defineTable({
    owner: v.optional(v.id("users")),
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
  }),
})
