import { defineEventHandler } from "h3";
import { collection, getDocs } from "firebase/firestore";
import { getDb } from "@/server/utils/firebase";

export default defineEventHandler(async () => {
  try {
    // Получаем Firestore
    const db = getDb();

    const shoppingItemsCollection = collection(
      db,
      "users/B1rXCvfUcSWwp9YlR07XcboQEHj2/shoppingItems"
    );
    // Читаем данные из Firestore
    const snapshot = await getDocs(shoppingItemsCollection);

    // Формируем массив данных
    const shoppingItems = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return { success: true, data: shoppingItems };
  } catch (error) {
    return { success: false, error: error };
  }
});
