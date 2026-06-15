import { NotFoundError } from "../../../shared/errors/not-found-error.js";

import { AuditLogRepository } from "../repositories/audit-log.repository.js";

export class AuditLogService {
    constructor(
        private readonly auditLogRepository =
            new AuditLogRepository(),
    ) { }

    async create(data: {
        organizationId: string;
        actorId?: string;
        action: string;
        resourceType: string;
        resourceId: string;
        metadata?: unknown;
    }) {
        return this.auditLogRepository.create(
            data,
        );
    }

    async findById(id: string) {
        const log =
            await this.auditLogRepository.findById(
                id,
            );

        if (!log) {
            throw new NotFoundError(
                "Audit log not found",
            );
        }

        return log;
    }

    async findByOrganizationId(
        organizationId: string,
    ) {
        return this.auditLogRepository.findByOrganizationId(
            organizationId,
        );
    }
}