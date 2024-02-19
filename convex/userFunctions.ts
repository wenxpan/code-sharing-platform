import {
  action,
  internalMutation,
  internalQuery,
  mutation,
  query,
} from "./_generated/server"
import { internal } from "./_generated/api"
import { v } from "convex/values"
import { Doc } from "./_generated/dataModel"

// @ts-ignore
export const getUserFromDescope = action({
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
          avatar_url: v.optional(v.string()),
          html_url: v.optional(v.string()),
          login: v.optional(v.string()),
          id: v.optional(v.float64()),
          name: v.optional(v.string()),
        })
      ),
    }),
  },
  handler: async (ctx, args) => {
    if (!args.data.descopeId) return

    let user: Doc<"users"> | null = await ctx.runQuery(
      internal.userFunctions.checkExistingUser,
      {
        descopeId: args.data.descopeId,
      }
    )
    if (!user) {
      // TODO: add github info to convex user
      // https://github.com/get-convex/convex-demos/blob/main/giphy-action/convex/messages.ts
      // const githubLogin = args.data.github?.login
      // const githubData =
      //   githubLogin &&
      //   (await fetch(`https://api.github.com/users/${githubLogin}`))
      // const json = githubData && (await githubData.json())
      // console.log({ githubData: json })
      user = await ctx.runMutation(internal.userFunctions.storeUser, {
        data: args.data,
      })
    }
    return user
  },
})

export const checkExistingUser = internalQuery({
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

export const storeUser = internalMutation({
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
          avatar_url: v.optional(v.string()),
          html_url: v.optional(v.string()),
          login: v.optional(v.string()),
          id: v.optional(v.float64()),
          name: v.optional(v.string()),
        })
      ),
    }),
  },
  handler: async (ctx, args) => {
    const newUserId = await ctx.db.insert("users", args.data)
    const newUser = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("_id"), newUserId))
      .unique()
    return newUser
  },
})
