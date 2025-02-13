export default defineEventHandler(() => {
  console.log("Hello, world!");

  return { message: "Hello from SSR!" };
});
