import { adminAuth } from "@/server/utils/firebaseAdmin";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const cookieName = config.private.sessionCookieName;
  const cookie = getCookie(event, cookieName);

  if (!cookie) return null;

  try {
    const decodedToken = await adminAuth.verifySessionCookie(cookie, true);
    return decodedToken;
  } catch (error) {
    console.error("Session verification failed:", error);
    return null;
  }
});
