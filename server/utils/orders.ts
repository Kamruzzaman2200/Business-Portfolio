export async function getOrderFull(where: string, params: unknown[]) {
  const [order] = await q(`SELECT * FROM orders WHERE ${where}`, params);
  if (!order) return null;
  const items = await q("SELECT * FROM order_items WHERE order_id=$1 ORDER BY id", [order.id]);
  const events = await q("SELECT * FROM order_events WHERE order_id=$1 ORDER BY created_at, id", [order.id]);
  return { ...order, items, events };
}
