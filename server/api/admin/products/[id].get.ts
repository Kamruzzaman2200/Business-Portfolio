export default defineEventHandler(async (event) => {
  await requireAdmin(event);
  const id = Number(getRouterParam(event, "id"));
  const [p] = await q("SELECT * FROM products WHERE id=$1", [id]);
  if (!p) throw createError({ statusCode: 404, statusMessage: "Product not found" });
  const orders = await q(`SELECT o.id,o.order_no,o.customer_name,o.status,oi.quantity,o.created_at FROM order_items oi
    JOIN orders o ON o.id=oi.order_id WHERE oi.product_id=$1 ORDER BY o.created_at DESC LIMIT 20`, [id]);
  return { ...p, orders };
});
