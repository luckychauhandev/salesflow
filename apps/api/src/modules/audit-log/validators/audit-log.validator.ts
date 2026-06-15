import { z } from "zod";

export const getAuditLogsSchema =
    z.object({
        organizationId: z.uuid(),
    });