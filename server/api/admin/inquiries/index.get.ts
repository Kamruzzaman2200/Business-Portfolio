export default defineEventHandler(async (event) => {
  await requireAdmin(event);
  return q("SELECT * FROM inquiries ORDER BY created_at DESC");
});
