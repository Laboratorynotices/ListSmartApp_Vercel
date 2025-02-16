// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  ssr: true,
  modules: ["nuxt-vuefire", "@pinia/nuxt", "@nuxtjs/tailwindcss"],
  // Настройки модуля VueFire
  vuefire: {
    // Включение аутентификации
    auth: {
      enabled: true,
      sessionCookie: true,
    },
    config: {
      // Настройки для Firebase
      apiKey: process.env.NUXT_PUBLIC_GOOGLE_FIREBASE_CONFIG_API_KEY,
      authDomain: process.env.NUXT_PUBLIC_GOOGLE_FIREBASE_CONFIG_AUTH_DOMAIN,
      projectId: process.env.NUXT_PUBLIC_GOOGLE_FIREBASE_CONFIG_PROJECT_ID,
      appId: process.env.NUXT_PUBLIC_GOOGLE_FIREBASE_CONFIG_APP_ID,
    },
  },
});
