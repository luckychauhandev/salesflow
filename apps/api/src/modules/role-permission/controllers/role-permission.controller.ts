import { asyncHandler } from "../../../shared/utils/async-handler.js";

import {
    createdResponse,
    successResponse,
} from "../../../shared/utils/api-response.js";

import { RolePermissionService } from "../services/role-permission.service.js";

export class RolePermissionController {
    constructor(
        private readonly rolePermissionService =
            new RolePermissionService(),
    ) { }

    assignPermission =
        asyncHandler(
            async (req, res) => {
                const assignment =
                    await this.rolePermissionService.assignPermission(
                        req.body.roleId,
                        req.body.permissionId,
                    );

                return createdResponse(
                    res,
                    assignment,
                    "Permission assigned successfully",
                );
            },
        );

    getRolePermissions =
        asyncHandler(
            async (req, res) => {
                const permissions =
                    await this.rolePermissionService.getRolePermissions(
                        String(req.params.roleId),
                    );

                return successResponse(
                    res,
                    permissions,
                    "Role permissions fetched successfully",
                );
            },
        );
}