import { prisma } from "../../../infrastructure/database/prisma-client.js";

import type { IRoleRepository } from "../contracts/role.repository.contract.js";

export class RoleRepository
    implements IRoleRepository {
    async create(data: {
        organizationId: string;
        name: string;
        description?: string;
    }) {
        return prisma.role.create({
            data,
        });
    }

    async findById(id: string) {
        return prisma.role.findFirst({
            where: {
                id,
                isDeleted: false,
            },
        });
    }

    async findByName(
        organizationId: string,
        name: string,
    ) {
        return prisma.role.findFirst({
            where: {
                organizationId,
                name,
                isDeleted: false,
            },
        });
    }
}