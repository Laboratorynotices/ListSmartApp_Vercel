import { defineEventHandler } from "h3";
import { collection, getDocs } from "firebase/firestore";
import { getDb } from "@/server/utils/firebase";
import getUserUid from "@/server/utils/getUserUid";

export default defineEventHandler(async (event) => {
  try {
    // Получаем ID пользователя
    const uid = await getUserUid(event);

    if (!uid) {
      return { error: "Unauthorized" };
    }

    // Получаем Firestore
    const db = getDb();

    const shoppingItemsCollection = collection(
      db,
      `users/${uid}/shoppingItems`
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
