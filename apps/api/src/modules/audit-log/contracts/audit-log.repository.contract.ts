import { prisma } from "../../../infrastructure/database/prisma-client.js";

type AuditLogRecord = Awaited<
    ReturnType<typeof prisma.auditLog.findUnique>
>;

export interface IAuditLogRepository {
    create(data: {
        organizationId: string;
        actorId?: string | null;
        action: string;
        resourceType: string;
        resourceId: string;
        metadata?: any;
    }): Promise<AuditLogRecord>;

    findById(
        id: string,
    ): Promise<AuditLogRecord>;

    findByOrganizationId(
        organizationId: string,
    ): Promise<AuditLogRecord[]>;
}