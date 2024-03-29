import { action, internalMutation, internalQuery } from "./_generated/server"
import { internal } from "./_generated/api"
import { v } from "convex/values"
import { Doc } from "./_generated/dataModel"

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
      company: v.optional(v.string()),
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
  handler: async (ctx, args): Promise<Doc<"users"> | null> => {
    if (!args.data.descopeId) return null

    const existedUser: Doc<"users"> | null = await ctx.runQuery(
      internal.userFunctions.checkExistingUser,
      {
        descopeId: args.data.descopeId,
      }
    )

    if (args.data.descopeId && existedUser === null) {
      console.log("creating user...")
      const githubLogin = args.data.github?.login

      if (githubLogin && args.data.role === "coder") {
        const { Octokit } = require("@octokit/core")
        const octokit = new Octokit({})
        const { data } = await octokit.request("GET /users/{username}", {
          username: githubLogin,
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        })
        const { login, name, html_url, avatar_url, id } = data
        // if github info is retreived, create user with github
        if (login === githubLogin) {
          const user = await ctx.runMutation(internal.userFunctions.storeUser, {
            data: {
              ...args.data,
              picture: args.data.picture || avatar_url,
              github: {
                login,
                name: name ?? undefined,
                html_url,
                avatar_url,
                id,
              },
            },
          })
          return user
        }
      } else {
        const user = await ctx.runMutation(internal.userFunctions.storeUser, {
          data: args.data,
        })
        return user
      }
    }
    // TODO: error handling: unable to create new user should redirect to error page
    return existedUser
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
      company: v.optional(v.string()),
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
    const existedUser = await ctx.db
      .query("users")
      // todo: change to index
      .filter((q) => q.eq(q.field("descopeId"), args.data.descopeId))
      .unique()
    if (existedUser) {
      return existedUser
    }

    const newUserId = await ctx.db.insert("users", args.data)
    const newUser = await ctx.db.get(newUserId)
    return newUser
  },
})
