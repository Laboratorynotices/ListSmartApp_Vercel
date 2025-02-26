import { useCurrentUser } from "vuefire";

export default defineEventHandler(async (event) => {
  // Получаем текущего пользователя (асинхронный запрос)
  // Получаем текущего пользователя
  const user: ReturnType<typeof useCurrentUser> = await useCurrentUser();

  const cookies = parseCookies(event);
  const sessionCookie = cookies.__session;

  return {
    statusCode: 200,
    data: {
      hello: "world",
    },
    event: event,
    user: user,
    сookies: cookies,
    sessionCookie: sessionCookie,
  };
});
