import pg from "pg";
import { readFileSync, existsSync } from "node:fs";

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

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("❌ DATABASE_URL is not defined in .env");
  process.exit(1);
}

console.log("🔍 Checking connection to Neon PostgreSQL...");
console.log("   Host:", url.replace(/:[^:@/]+@/, ":****@"));

const ssl = /sslmode=require|neon\.tech|supabase\.co|render\.com/.test(url) ? { rejectUnauthorized: false } : undefined;
const client = new pg.Client({ connectionString: url, ssl });

try {
  await client.connect();
  console.log("✅ 1. Connection established successfully!");

  // 1. Check PostgreSQL version & current database
  const info = await client.query("SELECT current_database() as db, current_user as user, version()");
  console.log(`✅ 2. Connected to database: '${info.rows[0].db}' as user: '${info.rows[0].user}'`);

  // 2. Check all required tables
  const expectedTables = ["products", "orders", "order_items", "order_events", "inquiries"];
  const tablesRes = await client.query(
    "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name"
  );
  const foundTables = tablesRes.rows.map((r) => r.table_name);
  console.log("✅ 3. Public tables found:", foundTables.join(", "));
  
  for (const table of expectedTables) {
    if (!foundTables.includes(table)) {
      throw new Error(`Missing expected table: ${table}`);
    }
  }

  // 3. Check row counts for all tables
  console.log("✅ 4. Table Row Counts:");
  for (const table of expectedTables) {
    const countRes = await client.query(`SELECT count(*)::int as count FROM ${table}`);
    console.log(`   - ${table}: ${countRes.rows[0].count} records`);
  }

  // 4. Test CRUD (Create, Read, Update, Delete) operation
  console.log("✅ 5. Testing CRUD operations (write / read / update / delete)...");
  
  // INSERT
  const insertRes = await client.query(
    `INSERT INTO inquiries (name, email, message, status) 
     VALUES ('DB Test User', 'test@example.com', 'Test verification message', 'new') 
     RETURNING id`
  );
  const testId = insertRes.rows[0].id;
  console.log(`   - INSERT successful (id: ${testId})`);

  // SELECT
  const selectRes = await client.query("SELECT * FROM inquiries WHERE id = $1", [testId]);
  if (selectRes.rows.length !== 1 || selectRes.rows[0].email !== "test@example.com") {
    throw new Error("SELECT verification failed!");
  }
  console.log("   - SELECT read-back successful");

  // UPDATE
  await client.query("UPDATE inquiries SET status = 'in_review' WHERE id = $1", [testId]);
  const updateRes = await client.query("SELECT status FROM inquiries WHERE id = $1", [testId]);
  if (updateRes.rows[0].status !== "in_review") {
    throw new Error("UPDATE verification failed!");
  }
  console.log("   - UPDATE successful (status updated to 'in_review')");

  // DELETE
  await client.query("DELETE FROM inquiries WHERE id = $1", [testId]);
  const deleteCheck = await client.query("SELECT * FROM inquiries WHERE id = $1", [testId]);
  if (deleteCheck.rows.length !== 0) {
    throw new Error("DELETE cleanup failed!");
  }
  console.log("   - DELETE cleanup successful");

  console.log("\n🎉 ALL DATABASE CHECKS PASSED: The database is healthy and functioning properly!");
} catch (err) {
  console.error("❌ Database check failed:", err);
  process.exit(1);
} finally {
  await client.end();
}
