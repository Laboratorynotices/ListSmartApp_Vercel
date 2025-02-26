import { useCurrentUser } from "vuefire";

export default defineEventHandler(async (event) => {
  /*
  const user: ReturnType<typeof useCurrentUser> = await (useCurrentUser() ||
    event.context.user ||
    null);
    */
  const user = await useCurrentUser();
  console.log("🔍 Проверка пользователя:", user);
  return { user: user };
});
