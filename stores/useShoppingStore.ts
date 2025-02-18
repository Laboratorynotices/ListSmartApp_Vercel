import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  type DocumentData,
} from "firebase/firestore";
import { useFirestore } from "vuefire";
import { defineStore } from "pinia";

// Определяем интерфейс для отдельного элемента списка покупок
interface ShoppingItem {
  id: string;
  name: string;
  quantity: number;
  completed: boolean;
  createdAt: Date;
  category?: string;
  notes?: string;
}

// Определяем интерфейс для состояния хранилища
interface ShoppingState {
  items: ShoppingItem[];
  categories: string[];
  isLoading: boolean;
  error: string | null;
}

/**
 * Данный код выполняется при инициализации хранилища,
 * когда пользователь ещё не авторизован.
 * Вот имя и было разделено на префикс и суффикс.
 * А ID пользователя будет добавлен внутри метода.
 */

// Префикс имени коллекции в Firebase
const COLLECTION_NAME_PREFIX: string = "users/";

// Префикс имени коллекции в Firebase
const COLLECTION_NAME_SUFIX: string = "/shoppingItems";

/**
 * Вспомогательные (приватные) методы для работы с Firebase
 */
const storeHelpers = {
  // Функция для получения доступа к базе данных и текущего пользователя
  _getDbAndUser() {
    // Получаем доступ к базе данных через VueFire
    const db: ReturnType<typeof useFirestore> = useFirestore();

    // Получаем текущего пользователя
    const user: ReturnType<typeof useCurrentUser> = useCurrentUser();

    return { db, user };
  },

  /**
   * Получение полного имени коллекции в Firebase.
   * @param user текущий пользователь
   * @returns string полное имя коллекции
   */
  _getFullCollectionName(user: ReturnType<typeof useCurrentUser>) {
    return COLLECTION_NAME_PREFIX + user.value?.uid + COLLECTION_NAME_SUFIX;
  },

  // Сохранение данных в Firebase
  async addDocToFirebase(
    item: Omit<ShoppingItem, "id">
  ): Promise<DocumentData> {
    // Доступ к базе данных и текущего пользователя
    const { db, user } = this._getDbAndUser();

    try {
      // Добавляем элемент в базу данных
      // В первый раз ещё и создаст "коллекцию"
      return await addDoc(
        // авторизация и указание на "коллекцию"
        // Указывая ID пользователя в пути позволит нам разделить данные между пользователями
        // Путь к коллекции должен состоять из нечётного количества частей. (users/{uid}/shoppingItems)
        collection(db, this._getFullCollectionName(user)),
        // данные для добавления
        item
      );
    } catch (e) {
      console.error("Ошибка при добавлении shoppingItem: ", e);
      return { id: undefined };
    }
  },

  // Загрузка данных из Firebase
  async loadDocsFromFirebase(store: ReturnType<typeof useShoppingStore>) {
    // Доступ к базе данных и текущего пользователя
    const { db, user } = this._getDbAndUser();

    try {
      // Делаем из полученных данных массив и приводим к формату списка ShoppingItem
      // В пути указываем ID пользователя, чтобы получить данные только этого пользователя
      store.items = (
        await getDocs(collection(db, this._getFullCollectionName(user)))
      ).docs.map((doc) => ({
        ...(doc.data() as ShoppingItem),
        id: doc.id,
      }));
    } catch (e) {
      store.error = "Ошибка при загрузке данных";
      console.error("Ошибка при загрузке из Firebase:", e);
    }
  },

  /**
   * Удаление элемента из Firebase.
   * @param store контекст хранилища
   * @param id идентификатор элемента для удаления
   */
  async deleteDocFromFirebase(
    store: ReturnType<typeof useShoppingStore>,
    id: string
  ): Promise<void> {
    // Доступ к базе данных и текущего пользователя
    const { db, user } = this._getDbAndUser();

    try {
      // Получаем указатель на элемент, который нужно удалить
      const docRef = doc(db, this._getFullCollectionName(user), id);

      // Удаляем элемент из базы данных
      await deleteDoc(docRef);
    } catch (e) {
      store.error = "Ошибка при удалении элемента";
      console.error(
        `Ошибка при удалении ${this._getFullCollectionName(user)}:`,
        e
      );
    }
  },
};

// Создаём store с использованием Composition API стиля
export const useShoppingStore = defineStore("shopping", {
  // Начальное состояние
  state: (): ShoppingState => ({
    items: [],
    categories: ["Продукты", "Бытовая химия", "Другое"],
    isLoading: false,
    error: null,
  }),

  // Геттеры - вычисляемые свойства store
  getters: {
    // @TODO Получаем количество элементов в списке
    // @TODO Получаем только невыполненные элементы
    // Получаем элементы по категории
    getItemsByCategory: (state) => {
      return (category: string) =>
        state.items.filter((item) => item.category === category);
    },
    // @TODO Проверяем, есть ли незавершённые элементы
  },

  // Actions - методы для изменения состояния
  actions: {
    // Добавление нового элемента в список
    async addItem(item: Omit<ShoppingItem, "id" | "createdAt">) {
      // @TODO проверить есть ли элемент с таким именем
      // Создаём новый элемент
      const newItem: Omit<ShoppingItem, "id"> = {
        createdAt: new Date(),
        ...item,
      };

      // Добавляем элемент в базу данных, получаем ID
      // В первый раз ещё и создаст "коллекцию"
      const docRef = await storeHelpers.addDocToFirebase(newItem);

      // Добавляем элемент в список, добавляя ему ID
      this.items.push({ id: docRef.id, ...newItem });
    },
    // Удаление элемента из списка
    async removeItem(itemId: string) {
      // Используем метод findIndex для поиска индекса элемента в массиве по его id
      const index = this.items.findIndex((item) => item.id === itemId);
      if (index > -1) {
        // Если элемент найден (индекс больше -1),
        // используем метод splice для удаления одного элемента начиная с найденного индекса
        this.items.splice(index, 1);

        // Удаляем элемент из базы данных
        await storeHelpers.deleteDocFromFirebase(this, itemId);
      } else {
        // Если элемент не найден, выводим сообщение об ошибке
        console.log("Элемент не найден");
        this.error = "Элемент не найден";
      }
    },
    // @TODO Обновление существующего элемента
    // @TODO Переключение статуса выполнения
    // @TODO Добавление новой категории
    // Загрузка данных из Firebase
    async loadFromFirebase() {
      await storeHelpers.loadDocsFromFirebase(this);
    },
    // @TODO Очистка списка
  },
});
