import { z } from "zod";

export const registerSchema = z.object({
  organizationName: z
    .string()
    .trim()
    .min(2)
    .max(100),

  firstName: z
    .string()
    .trim()
    .min(2)
    .max(100),

  lastName: z
    .string()
    .trim()
    .min(2)
    .max(100),

  email: z.email(),

  password: z
    .string()
    .min(8)
    .max(100),
});

export type RegisterInput =
  z.infer<typeof registerSchema>;