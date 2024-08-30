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


