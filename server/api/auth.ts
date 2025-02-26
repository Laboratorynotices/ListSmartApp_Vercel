import { adminAuth } from "~/server/utils/firebaseAdmin";

export default defineEventHandler(async (event) => {
  const cookie = getCookie(event, "__session");

  if (!cookie) return null;

  try {
    const decodedToken = await adminAuth.verifySessionCookie(cookie, true);
    return decodedToken;
  } catch (error) {
    console.error("Session verification failed:", error);
    return null;
  }
});
