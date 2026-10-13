import { z } from "zod";
export default defineEventHandler(async (event) => {
  const { email, password } = await readValidatedBody(event, z.object({ email: z.string().email(), password: z.string().min(1) }).parse);
  const cfg = useRuntimeConfig();
  if (email.toLowerCase() !== cfg.adminEmail.toLowerCase() || password !== cfg.adminPassword) {
    throw createError({ statusCode: 401, statusMessage: "Invalid email or password" });
  }
  await setUserSession(event, { user: { email, role: "admin" }, loggedInAt: Date.now() });
  return { ok: true };
});
