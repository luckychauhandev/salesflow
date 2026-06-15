import { z } from "zod";

export const assignPermissionSchema =
    z.object({
        roleId: z.uuid(),
        permissionId: z.uuid(),
    });

export type AssignPermissionInput =
    z.infer<
        typeof assignPermissionSchema
    >;