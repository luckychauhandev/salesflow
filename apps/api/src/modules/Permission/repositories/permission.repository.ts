import { prisma } from "../../../infrastructure/database/prisma-client.js";

import type { IPermissionRepository } from "../contracts/permission.repository.contract.js";

export class PermissionRepository
    implements IPermissionRepository {
    async create(data: {
        name: string;
        description?: string;
    }) {
        return prisma.permission.create({
            data,
        });
    }

    async findById(id: string) {
        return prisma.permission.findUnique({
            where: {
                id,
            },
        });
    }

    async findByName(name: string) {
        return prisma.permission.findUnique({
            where: {
                name,
            },
        });
    }
}