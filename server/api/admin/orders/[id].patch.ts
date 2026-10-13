import { z } from "zod";
/** Update status / tracking info. A status change is logged to the order timeline. */
export default defineEventHandler(async (event) => {
  await requireAdmin(event);
  const id = Number(getRouterParam(event, "id"));
  const b = await readValidatedBody(event, z.object({
    status: z.enum(ORDER_STATUSES).optional(), carrier: z.string().optional(), tracking_number: z.string().optional(), note: z.string().optional(),
  }).parse);
  const [cur] = await q<{ status: string }>("SELECT status FROM orders WHERE id=$1", [id]);
  if (!cur) throw createError({ statusCode: 404, statusMessage: "Order not found" });
  await q(`UPDATE orders SET status=coalesce($1,status), carrier=coalesce($2,carrier), tracking_number=coalesce($3,tracking_number), updated_at=now() WHERE id=$4`,
    [b.status ?? null, b.carrier ?? null, b.tracking_number ?? null, id]);
  if ((b.status && b.status !== cur.status) || b.note) {
    await q("INSERT INTO order_events (order_id,status,note) VALUES ($1,$2,$3)", [id, b.status ?? cur.status, b.note ?? ""]);
  }
  return getOrderFull("id=$1", [id]);
});
