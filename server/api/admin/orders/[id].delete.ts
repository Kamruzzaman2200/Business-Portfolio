export default defineEventHandler(async (event) => {
  await requireAdmin(event);
  await q("DELETE FROM orders WHERE id=$1", [Number(getRouterParam(event, "id"))]);
  return { ok: true };
});
