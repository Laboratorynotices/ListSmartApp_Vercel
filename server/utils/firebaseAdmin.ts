import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

// Проверяем, был ли уже инициализирован Firebase Admin
// Это предотвращает повторную инициализацию в средах с горячей перезагрузкой (например, в Nuxt SSR)
if (!getApps().length) {
  initializeApp({
    // Инициализируем Firebase Admin с учетными данными из переменной окружения
    // `GOOGLE_APPLICATION_CREDENTIALS` должна содержать строку в формате JSON
    // или путь к файлу JSON
    credential: cert(JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS!)),
  });
}

// Экспортируем экземпляр Firebase Auth для работы с аутентификацией пользователей
export const adminAuth = getAuth();
