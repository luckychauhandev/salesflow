import { prisma } from "../../../infrastructure/database/prisma-client.js";

import type { IUserRoleRepository } from "../contracts/user-role.repository.contract.js";

export class UserRoleRepository
    implements IUserRoleRepository {
    async create(data: {
        userId: string;
        roleId: string;
    }) {
        return prisma.userRole.create({
            data,
        });
    }

    async findByUserAndRole(
        userId: string,
        roleId: string,
    ) {
        return prisma.userRole.findFirst({
            where: {
                userId,
                roleId,
            },
        });
    }

    async findUserPermissions(userId: string) {
        return prisma.userRole.findMany({
            where: {
                userId,
            },
            include: {
                role: {
                    include: {
                        rolePermissions: {
                            include: {
                                permission: true,
                            },
                        },
                    },
                },
            },
        });
    }

    async findByUserId(
        userId: string,
    ) {
        return prisma.userRole.findMany({
            where: {
                userId,
            },
            include: {
                role: true,
            },
        });
    }
}