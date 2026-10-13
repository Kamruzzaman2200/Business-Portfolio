import { z } from "zod";
/** Public: place an order request from the collection page */
const Body = z.object({
  name: z.string().min(1), email: z.string().email(), company: z.string().default(""), phone: z.string().default(""),
  address: z.string().default(""), country: z.string().default(""), notes: z.string().default(""),
  items: z.array(z.object({ productId: z.number().int(), quantity: z.number().int().positive(), size: z.string().default(""), color: z.string().default("") })).min(1),
});
export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, Body.parse);
  const client = await db().connect();
  try {
    await client.query("BEGIN");
    let total = 0;
    const lines: { id: number; name: string; price: number; qty: number; size: string; color: string }[] = [];
    for (const it of body.items) {
      const { rows } = await client.query("SELECT id,name,price,moq FROM products WHERE id=$1 AND status='published'", [it.productId]);
      const p = rows[0];
      if (!p) throw createError({ statusCode: 400, statusMessage: "Product unavailable" });
      if (it.quantity < p.moq) throw createError({ statusCode: 400, statusMessage: `Minimum order for ${p.name} is ${p.moq}` });
      total += Number(p.price) * it.quantity;
      lines.push({ id: p.id, name: p.name, price: Number(p.price), qty: it.quantity, size: it.size, color: it.color });
    }
    const orderNo = "BR-" + Math.floor(100000 + Math.random() * 900000);
    const { rows } = await client.query(
      `INSERT INTO orders (order_no,customer_name,customer_email,company,phone,address,country,notes,total)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING id`,
      [orderNo, body.name, body.email, body.company, body.phone, body.address, body.country, body.notes, total]);
    const oid = rows[0].id;
    for (const l of lines) {
      await client.query("INSERT INTO order_items (order_id,product_id,product_name,unit_price,quantity,size,color) VALUES ($1,$2,$3,$4,$5,$6,$7)",
        [oid, l.id, l.name, l.price, l.qty, l.size, l.color]);
    }
    await client.query("INSERT INTO order_events (order_id,status,note) VALUES ($1,'pending','Order received')", [oid]);
    await client.query("COMMIT");
    return { orderNo, total };
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
});
