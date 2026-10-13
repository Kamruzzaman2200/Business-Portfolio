export default defineEventHandler(async (event) => {
  await requireAdmin(event);
  const [counts] = await q(`SELECT
    (SELECT count(*)::int FROM products) AS products,
    (SELECT count(*)::int FROM products WHERE status='published') AS published,
    (SELECT count(*)::int FROM orders) AS orders,
    (SELECT count(*)::int FROM orders WHERE status NOT IN ('delivered','cancelled')) AS open_orders,
    (SELECT coalesce(sum(total),0)::float FROM orders WHERE status<>'cancelled') AS revenue,
    (SELECT count(*)::int FROM inquiries WHERE status='new') AS new_inquiries,
    (SELECT count(*)::int FROM products WHERE stock < 200) AS low_stock`);
  const byStatus = await q("SELECT status, count(*)::int AS n FROM orders GROUP BY status");
  const monthly = await q(`SELECT to_char(date_trunc('month', created_at),'Mon') AS month, coalesce(sum(total),0)::float AS total
    FROM orders WHERE created_at > now() - interval '6 months' AND status<>'cancelled' GROUP BY date_trunc('month', created_at) ORDER BY date_trunc('month', created_at)`);
  const recent = await q("SELECT id,order_no,customer_name,company,status,total,created_at FROM orders ORDER BY created_at DESC LIMIT 6");
  return { counts, byStatus, monthly, recent };
});
