<script setup lang="ts">
import { useShoppingStore } from "@/stores/useShoppingStore";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Получаем текущего пользователя
const user = useCurrentUser();

// @TODO удалить
//console.log(user);

// @TODO перенести в мидлваре
const auth = useFirebaseAuth();

// @TODO удалить
//console.log(auth);

// Получаем доступ к хранилищу
const shoppingStore = useShoppingStore();

// Проверим содержимое
console.log(shoppingStore.items);

const loginWithGoogle = () => {
  // auth может быть null, что нам не подходит
  if (auth) {
    signInWithPopup(auth, new GoogleAuthProvider());
  }
};

const logoutWithGoogle = () => {
  auth?.signOut();
};
</script>

<template>
  <div>
    <h1>Check console.log() for test.</h1>
    <button v-if="!user" @click="loginWithGoogle">Login with Google</button>
    <button v-else @click="logoutWithGoogle">Logout with Google</button>
  </div>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
  </div>
</template>
