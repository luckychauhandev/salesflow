import { prisma } from "../../../infrastructure/database/prisma-client.js";

import type { IAuditLogRepository } from "../contracts/audit-log.repository.contract.js";

export class AuditLogRepository
    implements IAuditLogRepository {
    async create(data: {
        organizationId: string;
        actorId?: string | null;
        action: string;
        resourceType: string;
        resourceId: string;
        metadata?: any;
    }) {
        return prisma.auditLog.create({
            data: {
                organizationId: data.organizationId,
                actorId: data.actorId ?? null,
                action: data.action,
                resourceType: data.resourceType,
                resourceId: data.resourceId,
                metadata: data.metadata as any,
            },
        });
    }

    async findById(id: string) {
        return prisma.auditLog.findUnique({
            where: {
                id,
            },
        });
    }

    async findByOrganizationId(
        organizationId: string,
    ) {
        return prisma.auditLog.findMany({
            where: {
                organizationId,
            },
            include: {
                actor: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    }
}