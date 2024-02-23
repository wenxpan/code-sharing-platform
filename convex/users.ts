import { Doc } from "./_generated/dataModel"
import { mutation, query } from "./_generated/server"
import { v } from "convex/values"

// TODO: extract validators
export const createUser = mutation({
  args: {
    data: v.object({
      descopeId: v.string(),
      name: v.string(),
      role: v.union(
        v.literal("coder"),
        v.literal("businessEmployee"),
        v.literal("businessAdmin"),
      ),
      company: v.optional(v.string()),
      email: v.string(),
      picture: v.optional(v.string()),
      position: v.optional(v.string()),
      github: v.optional(
        v.object({
          avatar_url: v.string(),
          html_url: v.string(),
          login: v.string(),
          id: v.float64(),
          name: v.string() || v.null(),
        }),
      ),
    }),
  },
  handler: async (ctx, args) => {
    const newUserId = await ctx.db.insert("users", args.data)
    return newUserId
  },
})

export const getUserByDescopeId = query({
  args: { descopeId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      // todo: change to index
      .filter((q) => q.eq(q.field("descopeId"), args.descopeId))
      .unique()
    return user
  },
})

export const getUserById = query({
  args: { id: v.id("users") },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.id)
    return user
  },
})

export const getCoders = query({
  args: {},
  handler: async (ctx, args) => {
    const coders = await ctx.db
      .query("users")
      .withIndex("by_score")
      .order("desc")
      .filter((q) => q.eq(q.field("role"), "coder"))
      .collect()
    return coders
  },
})

export const getEmployees = query({
  args: {
    company: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    if (!args.company) {
      return null
    }
    const employees = await ctx.db
      .query("users")
      .filter((q) =>
        q.and(
          q.eq(q.field("role"), "businessEmployee"),
          q.eq(q.field("company"), args.company),
        ),
      )
      .collect()
    return employees
  },
})

export const deleteEmployee = mutation({
  args: {
    _id: v.optional(v.id("users")),
  },
  handler: async (ctx, args) => {
    if (!args._id) {
      return null
    }
    await ctx.db.delete(args._id)
  },
})

export const updateCoder = mutation({
  args: {
    data: v.object({
      _id: v.id("users"),
      name: v.string(),
      email: v.string(),
      skillSet: v.array(v.object({ name: v.string() })),
      github: v.optional(
        v.object({
          avatar_url: v.optional(v.string()),
          html_url: v.optional(v.string()),
          login: v.optional(v.string()),
          id: v.optional(v.float64()),
          name: v.optional(v.string()),
        }),
      ),
    }),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.data._id, args.data)
  },
})

export const incrementScoreToCoder = mutation({
  args: {
    data: v.object({
      _id: v.optional(v.id("users")),
      increment: v.number(),
    }),
  },
  handler: async (ctx, args) => {
    if (!args.data._id) {
      return
    }
    const currentScore = (await ctx.db.get(args.data._id))?.score || 0
    await ctx.db.patch(args.data._id, {
      score: currentScore + args.data.increment,
    })
  },
})
