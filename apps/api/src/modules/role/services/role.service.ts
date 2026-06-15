import { ConflictError } from "../../../shared/errors/conflict-error.js";
import { NotFoundError } from "../../../shared/errors/not-found-error.js";

import { RoleRepository } from "../repositories/role.repository.js";

export class RoleService {
    constructor(
        private readonly roleRepository =
            new RoleRepository(),
    ) { }

    async create(data: {
        organizationId: string;
        name: string;
        description?: string;
    }) {
        const existingRole =
            await this.roleRepository.findByName(
                data.organizationId,
                data.name,
            );

        if (existingRole) {
            throw new ConflictError(
                "Role already exists",
            );
        }

        return this.roleRepository.create(data);
    }

    async findById(id: string) {
        const role =
            await this.roleRepository.findById(id);

        if (!role) {
            throw new NotFoundError(
                "Role not found",
            );
        }

        return role;
    }
}