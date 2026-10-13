export default defineEventHandler(async (event) => {
  await requireAdmin(event);
  const { search, status, category } = getQuery(event) as Record<string, string | undefined>;
  const where: string[] = []; const p: unknown[] = [];
  if (search) { p.push(`%${search}%`); where.push(`(name ILIKE $${p.length} OR slug ILIKE $${p.length})`); }
  if (status) { p.push(status); where.push(`status=$${p.length}`); }
  if (category) { p.push(category); where.push(`category=$${p.length}`); }
  return q(`SELECT p.*, (SELECT coalesce(sum(quantity),0)::int FROM order_items oi WHERE oi.product_id=p.id) AS units_ordered
    FROM products p ${where.length ? "WHERE " + where.join(" AND ") : ""} ORDER BY updated_at DESC`, p);
});
