import { z } from "zod";
export default defineEventHandler(async (event) => {
  const b = await readValidatedBody(event, z.object({
    intent: z.string().default(""), role: z.string().default(""), name: z.string().min(1), email: z.string().email(),
    phone: z.string().default(""), company: z.string().default(""), country: z.string().default(""), message: z.string().min(1),
  }).parse);
  await q("INSERT INTO inquiries (intent,role,name,email,phone,company,country,message) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)",
    [b.intent, b.role, b.name, b.email, b.phone, b.company, b.country, b.message]);
  return { ok: true };
});
