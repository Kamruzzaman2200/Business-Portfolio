export default defineEventHandler(async () =>
  (await q<{ category: string }>("SELECT DISTINCT category FROM products WHERE status='published' ORDER BY category")).map((r) => r.category));
