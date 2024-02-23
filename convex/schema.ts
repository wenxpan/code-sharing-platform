import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
  users: defineTable({
    descopeId: v.string(),
    name: v.string(),
    role: v.union(
      v.literal("coder"),
      v.literal("businessEmployee"),
      v.literal("businessAdmin")
    ),
    company: v.optional(v.string()),
    email: v.string(),
    picture: v.optional(v.string()),
    position: v.optional(v.string()),
    skillSet: v.optional(v.array(v.object({ name: v.string() }))),
    github: v.optional(
      v.object({
        avatar_url: v.optional(v.string()),
        html_url: v.optional(v.string()),
        login: v.optional(v.string()),
        id: v.optional(v.float64()),
        name: v.optional(v.string() || v.null()),
      })
    ),
  })
    .index("by_descopeId", ["descopeId"])
    .index("by_email", ["email"]),
  jobs: defineTable({
    position: v.string(),
    companyName: v.string(),
    externalPostUrl: v.optional(v.string()),
    jobDescription: v.string(),
    email: v.string(),
    techStack: v.array(v.string()),
  }),
  applications: defineTable({
    jobId: v.id("jobs"),
    applicantId: v.id("users"),
    projectId: v.id("projects"),
    text: v.optional(v.string()),
    status: v.union(
      v.literal("pending"),
      v.literal("accepted"),
      v.literal("rejected")
    ),
  }),
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
  feedback: defineTable({
    projectId: v.id("projects"),
    postedBy: v.id("users"),
    overallFeedback: v.string(),
    specificFeedback: v.optional(
      v.array(v.object({ area: v.string(), feedback: v.string() }))
    ),
    positiveFeedback: v.string(),
  }),
})
