import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createJobs = mutation({
    args: {
        position: v.string(),
        companyName: v.string(),
        jobDescription: v.string(),
        email: v.string(),
        techStack: v.array(v.string()),
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("jobs", args);
    },
});