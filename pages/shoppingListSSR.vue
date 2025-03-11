<template>
  <ShoppingListSSR />
</template>

<script setup lang="ts">
definePageMeta({
  // Закрыт доступ неавторизованным пользователям
  middleware: ["auth"],
  // Задаем имя страницы, для маршрутизации
  name: "ShoppingListSSR",
});
</script>
