// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  ssr: true,
  modules: ["nuxt-vuefire", "@pinia/nuxt"],
  // Настройки модуля VueFire
  vuefire: {
    // Включение аутентификации
    auth: {
      enabled: true,
      sessionCookie: true,
    },
    config: {
      // Настройки для Firebase
      apiKey: String(process.env.GOOGLE_FIREBASE_API_KEY),
      authDomain: String(process.env.GOOGLE_FIREBASE_AUTH_DOMAIN),
      projectId: String(process.env.GOOGLE_FIREBASE_PROJECT_ID),
      appId: String(process.env.GOOGLE_FIREBASE_CONFIG_APP_ID),
    },
  },
});
