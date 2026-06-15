import { z } from "zod";

export const createUserSchema = z.object({
  organizationId: z.uuid(),

  email: z.email(),

  passwordHash: z.string().min(1),

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
});

export type CreateUserInput =
  z.infer<typeof createUserSchema>;