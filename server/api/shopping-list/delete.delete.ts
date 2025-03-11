import { deleteDoc, doc } from "firebase/firestore";
import getUserUid from "@/server/utils/getUserUid";
import { getDb } from "@/server/utils/firebase";

export default defineEventHandler(async (event) => {
  try {
    const uid = await getUserUid(event);
    const query = getQuery(event);
    // Получаем ID элемента из query
    const id: string = query.id as string;

    // Проверяем, что ID передан
    if (!id) {
      return { status: 400, message: "ID обязателен" };
    }

    const db = getDb();
    const docRef = doc(db, `users/${uid}/shoppingItems`, id);

    // @TODO добавить проверку на существование элемента в базе данных

    await deleteDoc(docRef);

    return { status: 200, message: "Элемент удален" };
  } catch (error) {
    console.error("Ошибка удаления:", error);
    return { status: 500, message: "Ошибка сервера" };
  }
});
