<script setup lang="ts">
import { useShoppingStore } from "@/stores/useShoppingStore";

// Получаем доступ к хранилищу
const shoppingStore = useShoppingStore();

// Проверим содержимое
console.log(shoppingStore.items);
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
  </div>
</template>
