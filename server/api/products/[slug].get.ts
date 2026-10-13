export default defineEventHandler(async (event) => {
  const [p] = await q("SELECT * FROM products WHERE slug=$1 AND status='published'", [getRouterParam(event, "slug")]);
  if (!p) throw createError({ statusCode: 404, statusMessage: "Product not found" });
  return p;
});
