<template>
  <h1>Shopping List</h1>
  <a href="/api/shopping-lists">API</a>
  <div>
    <pre>{{ dataSSR.text }}</pre>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  // Закрыт доступ неавторизованным пользователям
  middleware: ["auth"],
  // Задаем имя страницы, для маршрутизации
  name: "ShoppingListSSR",
});

const dataSSR = await fetch("/api/shopping-lists");

console.log(dataSSR);
console.log(dataSSR.text);
</script>
