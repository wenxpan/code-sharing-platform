import { Doc } from "./_generated/dataModel"
import { mutation, query } from "./_generated/server"
import { v } from "convex/values"

export const createUser = mutation({
  args: {
    data: v.object({
      descopeId: v.string(),
      name: v.string(),
      role: v.union(
        v.literal("coder"),
        v.literal("businessEmployee"),
        v.literal("businessAdmin")
      ),
      email: v.string(),
      picture: v.optional(v.string()),
      position: v.optional(v.string()),
      github: v.optional(
        v.object({
          avatar_url: v.string(),
          html_url: v.string(),
          login: v.string(),
          id: v.float64(),
          name: v.string(),
        })
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
  args: { id: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      // todo: change to index
      .filter((q) => q.eq(q.field("_id"), args.id))
      .unique()
    return user
  },
})

export const getCoders = query({
  args: {},
  handler: async (ctx, args) => {
    const coders = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("role"), "coder"))
      .collect()
    return coders
  },
})
