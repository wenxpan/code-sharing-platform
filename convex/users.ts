import { mutation, query } from "./_generated/server"
import { v } from "convex/values"

export const storeCoder = mutation({
  args: { email: v.string(), name: v.string(), image: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const { email, name, image } = args
    // Check if we've already stored this identity before.
    const user = await ctx.db
      .query("users")
      // @ts-ignore
      .withIndex("by_email", (q) =>
        // @ts-ignore
        q.eq("email", email)
      )
      .unique()
    if (user !== null) {
      // If we've seen this identity before but the name has changed, patch the value.
      if (user.email !== email || user.name !== name || user.image !== image) {
        await ctx.db.patch(user._id, {
          name,
          email,
          image
        })
      }
      return user._id
    }
    // If it's a new identity, create a new `User`.
    return await ctx.db.insert("users", {
      name,
      email,
      image,
      role: "coder"
    })
  }
})

export const getCoder = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const coder = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("_id"), args.userId))
      .unique()
    return coder
  }
})
