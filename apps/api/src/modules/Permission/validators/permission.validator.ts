import { z } from "zod";

export const createPermissionSchema =
    z.object({
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

export type CreatePermissionInput =
    z.infer<
        typeof createPermissionSchema
    >;