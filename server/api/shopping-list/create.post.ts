import { collection, addDoc } from "firebase/firestore";
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

    // Читаем тело запроса (ожидаем объект с item)
    const body = await readBody(event);

    //@TODO: добавить валидацию body

    // Добавляем новый элемент в Firestore
    const docRef = await addDoc(shoppingItemsCollection, body.item);

    // Возвращаем успешный ответ с ID нового документа
    // @TODO: Создать интерфейс для ответа (для его валидации), ...
    // подойдёт ли ShoppingItemResponse?
    return {
      success: true,
      message: "Item added successfully",
      item: { id: docRef.id, ...body.item },
    };
  } catch (error) {
    // В случае ошибки возвращаем её сообщение
    return { success: false, error: error };
  }
});
