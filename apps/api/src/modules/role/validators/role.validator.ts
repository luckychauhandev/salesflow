import { z } from "zod";

export const createRoleSchema = z.object({
    organizationId: z.uuid(),

    name: z
        .string()
        .trim()
        .min(2)
        .max(100),

    description: z
        .string()
        .trim()
        .max(255)
        .optional(),
});

export type CreateRoleInput =
    z.infer<typeof createRoleSchema>;