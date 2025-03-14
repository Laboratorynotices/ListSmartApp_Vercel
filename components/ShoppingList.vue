<template>
  <div class="shopping-list">
    <!-- Форма добавления нового элемента -->
    <ShoppingItemForm />

    <!-- Фильтры и статистика -->
    <div class="flex justify-between items-center mb-4">
      <!-- статистика -->
      <div class="text-sm text-gray-600">
        Всего: {{ store.totalItems }}, Активных: {{ store.activeItems.length }}
      </div>

      <CategoryFilter ref="categoryFilter" />
    </div>

    <!-- Список покупок -->
    <div class="space-y-2">
      <div
        v-for="item in filteredItems"
        :key="item.id"
        class="flex items-center p-3 border rounded hover:bg-gray-50"
        :class="{ 'bg-gray-100': item.completed }"
      >
        <div class="flex-grow">
          <input
            type="checkbox"
            :checked="item.completed"
            @change="store.toggleComplete(item.id)"
            class="mr-3"
          />
          <div :class="{ 'line-through text-gray-500': item.completed }">
            {{ item.name }}
          </div>
          <div class="text-sm text-gray-600">
            {{ item.category || "Без категории" }} • {{ item.quantity }} шт.
          </div>
        </div>
        <button
          @click="store.removeItem(item.id)"
          class="px-2 text-red-500 hover:text-red-700"
        >
          Удалить
        </button>
      </div>
    </div>

    <!-- Сообщение, если список пуст -->
    <div
      v-if="filteredItems.length === 0"
      class="text-center py-8 text-gray-500"
    >
      {{
        currentCategory ? "В этой категории нет покупок" : "Список покупок пуст"
      }}
    </div>
    <!-- Кнопка очистки завершённых -->
    <div v-if="store.hasCompletedItems" class="mt-4 text-right">
      <button
        @click="store.clearCompleted()"
        class="text-sm text-gray-600 hover:text-gray-800"
      >
        Очистить завершённые
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useShoppingStore } from "@/stores/useShoppingStore";

// Инициализируем store
const store = useShoppingStore();

/********************************************
 * Получение данных из дочернего компонента *
 *************  CategoryFilter  *************
 ********************************************/
/**
 * Объявляем свойство, которое будет принимать данные из дочернего компонента
 * Выбранную категорию
 */
const categoryFilter = ref();

/**
 * Обработчик события, когда данные из дочернего компонента изменяются
 * Вычисляемый список с учётом фильтра по категории
 */
const filteredItems = computed(
  () => categoryFilter.value?.filteredItems || store.items
);

// Текущая выбранная категория для фильтрации
const currentCategory = computed(
  () => categoryFilter.value?.selectedCategory || ""
);
</script>
