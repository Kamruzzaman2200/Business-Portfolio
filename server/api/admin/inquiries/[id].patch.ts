import { z } from "zod";
export default defineEventHandler(async (event) => {
  await requireAdmin(event);
  const { status } = await readValidatedBody(event, z.object({ status: z.enum(["new", "read", "archived"]) }).parse);
  await q("UPDATE inquiries SET status=$1 WHERE id=$2", [status, Number(getRouterParam(event, "id"))]);
  return { ok: true };
});
