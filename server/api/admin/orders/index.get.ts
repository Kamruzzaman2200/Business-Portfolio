export default defineEventHandler(async (event) => {
  await requireAdmin(event);
  const { search, status } = getQuery(event) as Record<string, string | undefined>;
  const where: string[] = []; const p: unknown[] = [];
  if (search) { p.push(`%${search}%`); where.push(`(order_no ILIKE $${p.length} OR customer_name ILIKE $${p.length} OR customer_email ILIKE $${p.length} OR company ILIKE $${p.length})`); }
  if (status) { p.push(status); where.push(`status=$${p.length}`); }
  return q(`SELECT o.*, (SELECT coalesce(sum(quantity),0)::int FROM order_items WHERE order_id=o.id) AS units
    FROM orders o ${where.length ? "WHERE " + where.join(" AND ") : ""} ORDER BY created_at DESC`, p);
});
