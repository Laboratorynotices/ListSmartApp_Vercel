import { defineEventHandler } from "h3";

export default defineEventHandler((event) => {
  if (!event.context.user) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }

  return {
    message: `Hello, ${event.context.user.displayName}!`,
    uid: event.context.user.uid,
  };
});
