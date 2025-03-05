import { defineEventHandler } from "h3";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useRuntimeConfig } from "#imports";

export default defineEventHandler(async () => {
  try {
    // Получаем конфиг Firebase из nuxt.config.ts
    const config = useRuntimeConfig();

    // Инициализируем Firebase вручную
    const firebaseApp = initializeApp(config.public.vuefire.config);

    // Получаем Firestore
    const db = getFirestore(firebaseApp);

    // Получаем коллекцию пользователей
    const usersCollection = collection(
      db,
      "users/B1rXCvfUcSWwp9YlR07XcboQEHj2/shoppingItems"
    );

    // Читаем данные из Firestore
    const snapshot = await getDocs(usersCollection);

    // Формируем массив пользователей
    const users = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return {
      success: true,
      data: users,
    };
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
});
