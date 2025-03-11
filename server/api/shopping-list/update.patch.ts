import { doc, updateDoc } from "firebase/firestore";
import { getDb } from "@/server/utils/firebase";
import getUserUid from "@/server/utils/getUserUid";

export default defineEventHandler(async (event) => {
  try {
    // Получаем ID пользователя (если данные привязаны к пользователям)
    const uid = await getUserUid(event);

    // Получаем данные из тела запроса
    const { id, item } = await readBody(event);

    // Проверяем, что переданы id и item
    // @TODO Улучшить валидацию данных, интерфейс для item
    if (!id || !item || typeof id !== "string" || typeof item !== "object") {
      return { success: false, error: "Неверные входящие данные" };
    }

    // Получаем ссылку на документ в Firestore
    const db = getDb();
    const itemRef = doc(db, `users/${uid}/shoppingItems`, id);

    // @TODO Проверить, что документ существует

    // Обновляем документ в Firestore (частичное обновление)
    await updateDoc(itemRef, item);

    return { success: true, message: "Элемент обновлён" };
  } catch (error) {
    console.error("Error updating item:", error);
    return { success: false, error: "Internal server error" };
  }
});
