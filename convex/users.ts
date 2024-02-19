import { mutation, query } from "./_generated/server"
import { v } from "convex/values"

// export const storeCoder = mutation({
//   args: { email: v.string(), name: v.string(), image: v.optional(v.string()) },
//   handler: async (ctx, args) => {
//     const { email, name, image } = args
//     // Check if we've already stored this identity before.
//     const user = await ctx.db
//       .query("users")
//       // @ts-ignore
//       .withIndex("by_email", (q) =>
//         // @ts-ignore
//         q.eq("email", email),
//       )
//       .unique()
//     if (user !== null) {
//       // If we've seen this identity before but the name has changed, patch the value.
//       if (user.email !== email || user.name !== name || user.image !== image) {
//         await ctx.db.patch(user._id, {
//           name,
//           email,
//           image,
//         })
//       }
//       return user._id
//     }
//     // If it's a new identity, create a new `User`.
//     return await ctx.db.insert("users", {
//       name,
//       email,
//       image,
//       role: "coder",
//     })
//   },
// })
//
// export const getCoder = query({
//   args: { userId: v.optional(v.id("users")) },
//   handler: async (ctx, args) => {
//     if (!args.userId) {
//       return null
//     }
//
//     const coder = await ctx.db
//       .query("users")
//       .filter((q) => q.eq(q.field("_id"), args.userId))
//       .unique()
//     return coder
//   },
// })

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
