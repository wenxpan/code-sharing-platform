import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    image: v.optional(v.string()),
    role: v.string(),
  }).index("by_email", ["email"]),
  projects: defineTable({
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
    techStack: v.array(v.string()),
  }),
})
