export default defineEventHandler(async (event) => {
  await requireAdmin(event);
  const o = await getOrderFull("id=$1", [Number(getRouterParam(event, "id"))]);
  if (!o) throw createError({ statusCode: 404, statusMessage: "Order not found" });
  return o;
});
