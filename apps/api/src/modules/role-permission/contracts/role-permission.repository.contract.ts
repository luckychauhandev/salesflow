import { prisma } from "../../../infrastructure/database/prisma-client.js";

type RolePermissionRecord = Awaited<
    ReturnType<
        typeof prisma.rolePermission.findUnique
    >
>;

export interface IRolePermissionRepository {
    create(data: {
        roleId: string;
        permissionId: string;
    }): Promise<RolePermissionRecord>;

    findByRoleAndPermission(
        roleId: string,
        permissionId: string,
    ): Promise<RolePermissionRecord>;

    findByRoleId(
        roleId: string,
    ): Promise<RolePermissionRecord[]>;
}