import { z } from "zod";

export const assignRoleSchema =
    z.object({
        userId: z.uuid(),
        roleId: z.uuid(),
    });

export type AssignRoleInput =
    z.infer<typeof assignRoleSchema>;