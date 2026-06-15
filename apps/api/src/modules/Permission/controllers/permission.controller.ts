import { asyncHandler } from "../../../shared/utils/async-handler.js";

import {
    createdResponse,
    successResponse,
} from "../../../shared/utils/api-response.js";

import { PermissionService } from "../services/permission.service.js";

export class PermissionController {
    constructor(
        private readonly permissionService =
            new PermissionService(),
    ) { }

    create = asyncHandler(
        async (req, res) => {
            const permission =
                await this.permissionService.create(
                    req.body,
                );

            return createdResponse(
                res,
                permission,
                "Permission created successfully",
            );
        },
    );

    findById = asyncHandler(
        async (req, res) => {
            const permission =
                await this.permissionService.findById(
                    String(req.params.id),
                );

            return successResponse(
                res,
                permission,
                "Permission fetched successfully",
            );
        },
    );
}