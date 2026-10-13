/** Protects /admin pages — redirects to the login screen when not signed in */
export default defineNuxtRouteMiddleware(() => {
  const { loggedIn } = useUserSession();
  if (!loggedIn.value) return navigateTo("/admin/login");
});
