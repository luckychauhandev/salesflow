import { asyncHandler } from "../../../shared/utils/async-handler.js";

import {
    successResponse,
} from "../../../shared/utils/api-response.js";

import { AuditLogService } from "../services/audit-log.service.js";

export class AuditLogController {
    constructor(
        private readonly auditLogService =
            new AuditLogService(),
    ) { }

    findById = asyncHandler(
        async (req, res) => {
            const log =
                await this.auditLogService.findById(
                    String(req.params.id),
                );

            return successResponse(
                res,
                log,
                "Audit log fetched successfully",
            );
        },
    );

    findByOrganizationId =
        asyncHandler(
            async (req, res) => {
                const logs =
                    await this.auditLogService.findByOrganizationId(
                        String(
                            req.params.organizationId,
                        ),
                    );

                return successResponse(
                    res,
                    logs,
                    "Audit logs fetched successfully",
                );
            },
        );
}