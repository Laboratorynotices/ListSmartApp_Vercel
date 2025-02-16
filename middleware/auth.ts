/**
 * Файл middleware для проверки авторизации пользователя.
 * Поскольку это не глобальный middleware, его нужно подключить в каждой странице, где он нужен.
 */
export default defineNuxtRouteMiddleware(async (to, from) => {
  // Определяем пути для страниц входа и главной страницы
  const LOGIN_PATH: string = "/login";
  const HOME_PATH: string = "/";

  try {
    // Получаем текущего пользователя (асинхронный запрос)
    const user = await getCurrentUser();

    // Если пользователь авторизован и пытается зайти на страницу входа,
    // перенаправляем его на главную страницу
    if (user) {
      if (to.path === LOGIN_PATH) {
        return navigateTo(HOME_PATH);
      }
    } else {
      // Если пользователь не авторизован и хочет зайти не на страницу входа,
      // отправляем его на страницу логина с параметром `redirect`
      if (to.path !== LOGIN_PATH) {
        return navigateTo({
          path: LOGIN_PATH,
          query: { redirect: to.fullPath },
        });
      }
    }
  } catch (error) {
    // Логируем ошибку, если не удалось получить пользователя
    console.error("Ошибка проверки авторизации:", error);
  }
});
