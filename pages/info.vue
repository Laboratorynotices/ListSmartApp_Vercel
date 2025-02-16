<template>
  <h1>Информация о пользователе {{ user?.displayName }}</h1>
  <p>Эту информацию о вас мы узнали:</p>
  <div>{{ user }}</div>
</template>

<script setup lang="ts">
// Закрыт доступ неавторизованным пользователям
definePageMeta({
  middleware: ["auth"],
});

const user = useCurrentUser();
</script>
