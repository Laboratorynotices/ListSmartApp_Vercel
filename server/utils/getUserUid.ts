import { adminAuth } from "@/server/utils/firebaseAdmin";

export default async function getUserUid(event: any): Promise<string | null> {
  // Получаем конфигурацию приложения
  const config = useRuntimeConfig();
  // Получаем имя куки
  const cookieName = config.private.sessionCookieName;
  // Получаем куки из запроса
  const cookie = getCookie(event, cookieName);

  if (!cookie) return null;

  try {
    // Проверяем сессию и получаем декодированные данные пользователя
    const decodedToken = await adminAuth.verifySessionCookie(cookie, true);

    // Возвращаем ID пользователя
    return decodedToken.uid;
  } catch (error) {
    console.error("Session verification failed:", error);
    return null;
  }
}

/*
// Альтернативный вариант функции getUserUid, использующий Middleware

export default async function getUserUid(event: any): Promise<string> {
  if (!event.context.user) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }

  return event.context.user.uid;
}
*/
