import { v } from "convex/values";
import { query, mutation, action } from "./_generated/server";
import { api } from "./_generated/api";

// Write your Convex functions in any file inside this directory (`convex`).
// See https://docs.convex.dev/functions for more.

// You can read data from the database via a query:
export const listSightings = query({

  // Query implementation.
  handler: async (ctx) => {
    const sightings = await ctx.db
      .query("sightings")
      // Ordered by _creationTime, return most recent
      .order("desc").take(100)
    return sightings
  },
});

export const createSighting = mutation({
  args: {
    name: v.string(),
    location: v.object({
      city: v.string(),
      country: v.string(),
      state: v.optional(v.string()),
    }),
    description: v.string(),
    closestMatch: v.string(),
  },
  // Mutation implementation.
  handler: async (ctx, { name, location, description, closestMatch }) => {
    const identity = await ctx.auth.getUserIdentity();
    const { tokenIdentifier, name: userName, } = identity!
    if (identity === null) {
      throw new Error("Unauthenticated call to mutation");
    }
    const sighting = await ctx.db.insert("sightings", {
      name,
      location,
      description,
      user: {
        id: tokenIdentifier,
        name: userName || "Anonymous",
      },
      confirmed: false,
      closestMatch,

    });
    return sighting;
  },
})

export const getIndividualSighting = query({
  args: {
    id: v.string(),
  },
  // Query implementation.
  handler: async (ctx, { id }) => {

    const sightings = await ctx.db
      .query("sightings")
      // Ordered by _creationTime, return most recent
      .order("desc").filter((q) => q.eq(q.field("_id"), id)).first();
    return sightings
  },
});