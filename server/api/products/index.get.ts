/** Public: published products (optional ?category=) */
export default defineEventHandler(async (event) => {
  const { category } = getQuery(event);
  const params: unknown[] = [];
  let sql = "SELECT id,slug,name,category,price,moq,lead_time_days,images,featured FROM products WHERE status='published'";
  if (category && category !== "All") { params.push(category); sql += ` AND category=$${params.length}`; }
  return q(sql + " ORDER BY featured DESC, created_at DESC", params);
});
