import { asyncHandler } from "../../../shared/utils/async-handler.js";

import {
    createdResponse,
    successResponse,
} from "../../../shared/utils/api-response.js";

import { UserRoleService } from "../services/user-role.service.js";

export class UserRoleController {
    constructor(
        private readonly userRoleService =
            new UserRoleService(),
    ) { }

    assignRole = asyncHandler(
        async (req, res) => {
            const assignment =
                await this.userRoleService.assignRole(
                    req.body.userId,
                    req.body.roleId,
                );

            return createdResponse(
                res,
                assignment,
                "Role assigned successfully",
            );
        },
    );

    getUserRoles = asyncHandler(
        async (req, res) => {
            const roles =
                await this.userRoleService.getUserRoles(
                    String(req.params.userId),
                );

            return successResponse(
                res,
                roles,
                "User roles fetched successfully",
            );
        },
    );
}