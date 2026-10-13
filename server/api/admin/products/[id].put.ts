export default defineEventHandler(async (event) => {
  await requireAdmin(event);
  const id = Number(getRouterParam(event, "id"));
  const b = await readValidatedBody(event, ProductInput.parse);
  const slug = slugify(b.slug || b.name);
  const clash = await q("SELECT 1 FROM products WHERE slug=$1 AND id<>$2", [slug, id]);
  if (clash.length) throw createError({ statusCode: 409, statusMessage: "Another product already uses this slug" });
  const [row] = await q(`UPDATE products SET slug=$1,name=$2,category=$3,description=$4,price=$5,moq=$6,lead_time_days=$7,stock=$8,
    status=$9,featured=$10,images=$11,sizes=$12,colors=$13,updated_at=now() WHERE id=$14 RETURNING *`,
    [slug, b.name, b.category, b.description, b.price, b.moq, b.lead_time_days, b.stock, b.status, b.featured,
      JSON.stringify(b.images), JSON.stringify(b.sizes), JSON.stringify(b.colors), id]);
  if (!row) throw createError({ statusCode: 404, statusMessage: "Product not found" });
  return row;
});
