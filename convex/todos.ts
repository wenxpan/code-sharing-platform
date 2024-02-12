import { mutation, query } from "./_generated/server"
import { v } from "convex/values"

// TODO: delete

// see also internalMutation - private
export const createTodo = mutation({
  args: { text: v.string() },
  handler: async (ctx, args) => {
    const newTodoId = await ctx.db.insert("todos", { text: args.text })
    return newTodoId
  }
})

export const getTodos = query({
  handler: async (ctx, args) => {
    const todos = await ctx.db.query("todos").collect()
    return todos
  }
})
