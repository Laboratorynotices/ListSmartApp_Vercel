import { defineEventHandler, getCookie } from "h3";
// Импорт Firebase Admin SDK для управления аутентификацией
import { adminAuth } from "@/server/utils/firebaseAdmin";

/**
 * Middleware для обработки аутентификации пользователя через сессионные куки.
 * Этот middleware извлекает и проверяет сессионные куки, содержащие Firebase токен.
 * Если куки валидны, в контекст события (`event.context.user`) записываются данные пользователя.
 * В противном случае `event.context.user` остается `null`.
 */
export default defineEventHandler(async (event) => {
  try {
    // Получаем значение сессионных куки, в которых хранится Firebase токен
    const sessionCookie = getCookie(event, "__session");

    // Если куки отсутствуют, пользователь считается неавторизованным
    if (!sessionCookie) {
      event.context.user = null;
      return;
    }

    // Декодируем и проверяем сессионные куки через Firebase Admin SDK
    const decodedClaims = await adminAuth.verifySessionCookie(
      sessionCookie,
      true // Принудительная проверка на отзыв токена
    );

    // Если проверка успешна, добавляем информацию о пользователе в контекст события
    event.context.user = {
      uid: decodedClaims.uid, // UID пользователя
      email: decodedClaims.email, // Email пользователя
      name: decodedClaims.name, // Имя пользователя
      picture: decodedClaims.picture, // URL аватара пользователя
    };
  } catch (error) {
    // В случае ошибки (например, недействительный токен) считаем пользователя неавторизованным
    event.context.user = null;
  }
});
