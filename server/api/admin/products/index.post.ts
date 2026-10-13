export default defineEventHandler(async (event) => {
  await requireAdmin(event);
  const b = await readValidatedBody(event, ProductInput.parse);
  const slug = slugify(b.slug || b.name);
  const exists = await q("SELECT 1 FROM products WHERE slug=$1", [slug]);
  if (exists.length) throw createError({ statusCode: 409, statusMessage: "A product with this slug already exists" });
  const [row] = await q(`INSERT INTO products (slug,name,category,description,price,moq,lead_time_days,stock,status,featured,images,sizes,colors)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING *`,
    [slug, b.name, b.category, b.description, b.price, b.moq, b.lead_time_days, b.stock, b.status, b.featured,
      JSON.stringify(b.images), JSON.stringify(b.sizes), JSON.stringify(b.colors)]);
  return row;
});
