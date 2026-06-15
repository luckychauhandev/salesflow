import { asyncHandler } from "../../../shared/utils/async-handler.js";

import {
    createdResponse,
    successResponse,
} from "../../../shared/utils/api-response.js";

import { RoleService } from "../services/role.service.js";

export class RoleController {
    constructor(
        private readonly roleService =
            new RoleService(),
    ) { }

    create = asyncHandler(
        async (req, res) => {
            const role =
                await this.roleService.create(
                    req.body,
                );

            return createdResponse(
                res,
                role,
                "Role created successfully",
            );
        },
    );

    findById = asyncHandler(
        async (req, res) => {
            const role =
                await this.roleService.findById(
                    String(req.params.id),
                );

            return successResponse(
                res,
                role,
                "Role fetched successfully",
            );
        },
    );
}