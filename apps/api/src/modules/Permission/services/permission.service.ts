import { ConflictError } from "../../../shared/errors/conflict-error.js";
import { NotFoundError } from "../../../shared/errors/not-found-error.js";

import { PermissionRepository } from "../repositories/permission.repository.js";

export class PermissionService {
    constructor(
        private readonly permissionRepository =
            new PermissionRepository(),
    ) { }

    async create(data: {
        name: string;
        description?: string;
    }) {
        const existing =
            await this.permissionRepository.findByName(
                data.name,
            );

        if (existing) {
            throw new ConflictError(
                "Permission already exists",
            );
        }

        return this.permissionRepository.create(
            data,
        );
    }

    async findById(id: string) {
        const permission =
            await this.permissionRepository.findById(
                id,
            );

        if (!permission) {
            throw new NotFoundError(
                "Permission not found",
            );
        }

        return permission;
    }
}