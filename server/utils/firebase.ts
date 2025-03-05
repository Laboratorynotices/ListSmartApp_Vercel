import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { useRuntimeConfig } from "#imports";

// Создаём единственный экземпляр Firebase App
const getFirebaseApp = () => {
  // Проверяем, есть ли уже инициализированные приложения
  if (!getApps().length) {
    const config = useRuntimeConfig();

    return initializeApp(config.public.vuefire.config);
  }

  // Если уже инициализировано, используем существующее
  return getApps()[0];
};

// Получаем Firestore только один раз
export const getDb = () => getFirestore(getFirebaseApp());
