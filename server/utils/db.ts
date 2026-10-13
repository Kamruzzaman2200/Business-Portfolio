import pg from "pg";

let pool: pg.Pool | undefined;

/** Shared PostgreSQL pool (DATABASE_URL from .env) */
export function db() {
  if (!pool) {
    const { databaseUrl } = useRuntimeConfig();
    pool = new pg.Pool({
      connectionString: databaseUrl,
      ssl: /sslmode=require|neon\.tech|supabase\.co|render\.com/.test(databaseUrl) ? { rejectUnauthorized: false } : undefined,
    });
  }
  return pool;
}

export async function q<T = Record<string, unknown>>(text: string, params: unknown[] = []) {
  const res = await db().query(text, params);
  return res.rows as T[];
}

export const ORDER_STATUSES = ["pending", "confirmed", "sampling", "in_production", "quality_check", "shipped", "delivered", "cancelled"] as const;
export const PRODUCT_STATUSES = ["draft", "published", "archived"] as const;

export function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80);
}
