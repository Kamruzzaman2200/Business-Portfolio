import { z } from "zod";
/** Public: track an order with order number + email */
export default defineEventHandler(async (event) => {
  const { orderNo, email } = await readValidatedBody(event, z.object({ orderNo: z.string().min(1), email: z.string().email() }).parse);
  const o = await getOrderFull("upper(order_no)=upper($1) AND lower(customer_email)=lower($2)", [orderNo.trim(), email.trim()]);
  if (!o) throw createError({ statusCode: 404, statusMessage: "No order found with that number and email" });
  const { customer_email, phone, address, notes, ...safe } = o as Record<string, unknown>;
  void customer_email; void phone; void address; void notes;
  return safe;
});
