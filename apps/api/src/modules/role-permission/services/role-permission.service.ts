import { ConflictError } from "../../../shared/errors/conflict-error.js";

import { RolePermissionRepository } from "../repositories/role-permission.repository.js";

export class RolePermissionService {
    constructor(
        private readonly rolePermissionRepository =
            new RolePermissionRepository(),
    ) { }

    async assignPermission(
        roleId: string,
        permissionId: string,
    ) {
        const existing =
            await this.rolePermissionRepository.findByRoleAndPermission(
                roleId,
                permissionId,
            );

        if (existing) {
            throw new ConflictError(
                "Permission already assigned",
            );
        }

        return this.rolePermissionRepository.create({
            roleId,
            permissionId,
        });
    }

    async getRolePermissions(
        roleId: string,
    ) {
        return this.rolePermissionRepository.findByRoleId(
            roleId,
        );
    }
}