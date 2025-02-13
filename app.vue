<script setup>
const { data } = await useFetch("/api/hello");
</script>

<template>
  <div>{{ data.message }}</div>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
  </div>
</template>
