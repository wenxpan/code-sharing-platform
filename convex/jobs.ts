import { mutation, query } from "./_generated/server";
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

export const getJobs = query({
    handler: async (ctx) => {
        const jobs = await ctx.db.query("jobs").collect();
        return jobs;
    },
});

export const getJobById = query({
    args: { id: v.string() },
    handler: async (ctx, args) => {
        const job = await ctx.db.query("jobs").filter((q) => q.eq(q.field("_id"), args.id)).collect();
        return job;
    },
});

export const getJobsByCompany = query({
    args: { companyName: v.string() },
    handler: async (ctx, args) => {
        const jobs = await ctx.db.query("jobs").filter((q) => q.eq(q.field("companyName"), args.companyName)).collect();
        return jobs;
    }
});

// Doesn't work
export const deleteJobById = mutation({
    args: { storageId: v.string() },
    handler: async (ctx, args) => {
        await ctx.storage.delete(args.storageId);
    }
});