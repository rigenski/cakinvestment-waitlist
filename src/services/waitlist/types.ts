import { z } from "zod";

export const schemaCreateWaitlistRequest = z.object({
  name: z.string().trim().min(1),
  email: z.string().trim().email(),
  phone: z.string().trim().min(5),
});

export type TCreateWaitlistRequest = z.infer<typeof schemaCreateWaitlistRequest>;

export const schemaCreateWaitlistResponse = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  created_at: z.string(),
});

export type TWaitlistEntry = z.infer<typeof schemaCreateWaitlistResponse>;
export type TCreateWaitlistResponse = TWaitlistEntry;

