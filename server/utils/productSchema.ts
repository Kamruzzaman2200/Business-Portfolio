import { z } from "zod";
export const ProductInput = z.object({
  name: z.string().min(1),
  slug: z.string().optional().default(""),
  category: z.string().min(1).default("General"),
  description: z.string().default(""),
  price: z.coerce.number().min(0),
  moq: z.coerce.number().int().min(1),
  lead_time_days: z.coerce.number().int().min(0),
  stock: z.coerce.number().int().min(0),
  status: z.enum(["draft", "published", "archived"]),
  featured: z.boolean().default(false),
  images: z.array(z.string().url().or(z.string().startsWith("/"))).default([]),
  sizes: z.array(z.string()).default([]),
  colors: z.array(z.string()).default([]),
});
