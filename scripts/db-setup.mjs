// Optional manual setup: creates tables + demo data. (The server also does this automatically on first start.)
// Usage: npm run db:setup   (reads DATABASE_URL from .env)
import { readFileSync, existsSync } from "node:fs";
import pg from "pg";

if (existsSync(".env")) {
  for (const l of readFileSync(".env", "utf8").split(/\r?\n/)) {
    const trimmed = l.trim();
    const m = trimmed.match(/^([A-Z_]+)=(.*)$/);
    if (m && !process.env[m[1]]) {
      let val = m[2].trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      process.env[m[1]] = val;
    }
  }
}

let url = process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/brand";
if ((url.startsWith('"') && url.endsWith('"')) || (url.startsWith("'") && url.endsWith("'"))) {
  url = url.slice(1, -1);
}

const src = readFileSync("server/utils/schema.sql.ts", "utf8");
const match = src.match(/SCHEMA_SQL\s*=\s*`([\s\S]*?)`;/);
const sql = match ? match[1] : src.slice(src.indexOf("CREATE TABLE"), src.lastIndexOf("`"));
const ssl = /sslmode=require|neon\.tech|supabase\.co|render\.com/.test(url) ? { rejectUnauthorized: false } : undefined;
const client = new pg.Client({ connectionString: url, ssl });
await client.connect();
await client.query(sql);
console.log("✓ Tables created on", url.replace(/:[^:@/]+@/, ":****@"));

const { rows } = await client.query("SELECT count(*)::int AS n FROM products");
if (rows[0].n === 0) {
  const pic = (s) => `https://picsum.photos/seed/${s}/900/1100`;
  const PRODUCTS = [
    ["Relaxed Denim Jacket", "Outerwear", 38, 150, 35],
    ["Heavyweight Hoodie", "Tops", 22, 200, 28],
    ["Pleated Wide Trousers", "Bottoms", 26, 150, 30],
    ["Ribbed Knit Polo", "Tops", 18, 250, 25],
    ["Utility Overshirt", "Outerwear", 30, 120, 32],
    ["Cotton Poplin Shirt", "Tops", 16, 300, 21],
    ["Cargo Shorts", "Bottoms", 15, 200, 24],
    ["Quilted Liner Vest", "Outerwear", 28, 100, 40],
  ];

  const ids = [];
  for (const [i, [name, category, price, moq, lead]] of PRODUCTS.entries()) {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const r = await client.query(
      `INSERT INTO products (slug,name,category,description,price,moq,lead_time_days,stock,status,featured,images,sizes,colors)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING id`,
      [slug, name, category,
        `Placeholder description for the ${name.toLowerCase()}. Replace with fabric, fit and care details.`,
        price, moq, lead, 500 + i * 120, i === 7 ? "draft" : "published", i < 3,
        JSON.stringify([pic(slug + "-1"), pic(slug + "-2"), pic(slug + "-3")]),
        JSON.stringify(["XS", "S", "M", "L", "XL"]),
        JSON.stringify(["Black", "Ecru", "Navy"])],
    );
    ids.push(r.rows[0].id);
  }

  const demoOrders = [
    { name: "Jamie Lee", email: "jamie@example.com", company: "Northwind", status: "in_production", items: [[0, 200], [1, 300]] },
    { name: "Priya Shah", email: "priya@example.com", company: "Lumen Co.", status: "shipped", items: [[2, 150]] },
    { name: "Marco Ruiz", email: "marco@example.com", company: "Atlas Wear", status: "pending", items: [[3, 250], [5, 300]] },
    { name: "Ana Costa", email: "ana@example.com", company: "Kestrel", status: "delivered", items: [[4, 120]] },
  ];
  const flow = ["pending", "confirmed", "sampling", "in_production", "quality_check", "shipped", "delivered"];
  for (const [k, o] of demoOrders.entries()) {
    const orderNo = `BR-${(100231 + k * 17).toString()}`;
    let total = 0;
    for (const [pi, qty] of o.items) total += PRODUCTS[pi][2] * qty;
    const shipped = flow.indexOf(o.status) >= flow.indexOf("shipped");
    const r = await client.query(
      `INSERT INTO orders (order_no,customer_name,customer_email,company,address,country,status,carrier,tracking_number,total,created_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10, now() - ($11 || ' days')::interval) RETURNING id`,
      [orderNo, o.name, o.email, o.company, "00 Example Street", "United Kingdom", o.status,
        shipped ? "DHL" : "", shipped ? `JD0146${k}0099${k}` : "", total, String(30 - k * 6)],
    );
    const oid = r.rows[0].id;
    for (const [pi, qty] of o.items) {
      await client.query(
        `INSERT INTO order_items (order_id,product_id,product_name,unit_price,quantity,size,color) VALUES ($1,$2,$3,$4,$5,'Assorted','Black')`,
        [oid, ids[pi], PRODUCTS[pi][0], PRODUCTS[pi][2], qty],
      );
    }
    for (const s of flow.slice(0, flow.indexOf(o.status) + 1)) {
      await client.query(`INSERT INTO order_events (order_id,status,note,created_at) VALUES ($1,$2,'', now() - ($3 || ' days')::interval)`,
        [oid, s, String(30 - k * 6 - flow.indexOf(s) * 3)]);
    }
  }
  await client.query(
    `INSERT INTO inquiries (intent,role,name,email,company,message) VALUES ('Book a demo','Brand','Taylor Kim','taylor@example.com','Fieldnote','We would like a walkthrough of the platform next week.')`,
  );
  console.log("✓ Demo products and orders seeded successfully.");
} else {
  console.log(`✓ Products already exist (${rows[0].n} products found).`);
}

await client.end();



