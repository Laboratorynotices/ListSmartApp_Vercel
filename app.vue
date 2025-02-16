<script setup lang="ts">
// Получаем текущего пользователя
const user = useCurrentUser();

// @TODO перенести в мидлваре
const auth = useFirebaseAuth();

// Функция для выхода из системы
const logoutAuth = () => {
  // Выходим из системы
  auth?.signOut();
  // Альтернатива signOut(auth) из "firebase/auth"

  const router = useRouter();
  // Перенаправляем пользователя на главную страницу
  router.push("/");
};
</script>

<template>
  <div>
    <h1>Check console.log() for test.</h1>
    <div v-if="user">
      <button @click="logoutAuth">Logout</button>
    </div>
  </div>
  <hr />
  <div>
    <nuxtPage />
  </div>
  <hr />
  <div>
    <h1>Страницы:</h1>
    <ul>
      <li>
        <nuxt-link to="/">Главная</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/info">Информация</nuxt-link>
      </li>
      <li v-if="!user">
        <nuxt-link to="/login">Вход</nuxt-link>
      </li>
      <li>
        <nuxt-link :to="{ name: 'ShoppingListCSR' }"
          >Список покупок (CSR)</nuxt-link
        >
      </li>
    </ul>
  </div>
</template>
