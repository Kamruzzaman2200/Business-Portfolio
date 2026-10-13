/** Creates tables (if missing) and seeds demo data on first start. */
export default defineNitroPlugin(async () => {
  try {
    const pool = db();
    await pool.query(SCHEMA_SQL);
    const seeded = await seed(pool);
    console.log(`[db] schema ready${seeded ? " · demo data seeded" : ""}`);
  } catch (e) {
    console.error("[db] could not connect — check DATABASE_URL in .env\n", (e as Error).message);
  }
});
