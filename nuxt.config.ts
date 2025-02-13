// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  ssr: true,
  modules: ["nuxt-vuefire"],
  // Настройки модуля VueFire
  vuefire: {
    // Включение аутентификации
    auth: {
      enabled: true,
      sessionCookie: true,
    },
    config: {
      // Настройки для Firebase
      apiKey: process.env.GOOGLE_FIREBASE_API_KEY,
      authDomain: process.env.GOOGLE_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.GOOGLE_FIREBASE_PROJECT_ID,
      appId: process.env.GOOGLE_FIREBASE_CONFIG_APP_ID,
    },
  },
});
