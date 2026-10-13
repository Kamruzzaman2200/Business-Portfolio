import type { H3Event } from "h3";
/** Throws 401 unless the request has an admin session */
export async function requireAdmin(event: H3Event) {
  const session = await requireUserSession(event);
  if ((session.user as { role?: string })?.role !== "admin") throw createError({ statusCode: 403, statusMessage: "Forbidden" });
  return session;
}
