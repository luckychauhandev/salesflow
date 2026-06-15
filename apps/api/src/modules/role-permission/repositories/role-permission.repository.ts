import { prisma } from "../../../infrastructure/database/prisma-client.js";

import type { IRolePermissionRepository } from "../contracts/role-permission.repository.contract.js";

export class RolePermissionRepository
    implements IRolePermissionRepository {
    async create(data: {
        roleId: string;
        permissionId: string;
    }) {
        return prisma.rolePermission.create({
            data,
        });
    }

    async findByRoleAndPermission(
        roleId: string,
        permissionId: string,
    ) {
        return prisma.rolePermission.findFirst({
            where: {
                roleId,
                permissionId,
            },
        });
    }

    async findByRoleId(
        roleId: string,
    ) {
        return prisma.rolePermission.findMany({
            where: {
                roleId,
            },
            include: {
                permission: true,
            },
        });
    }
}