import { ConflictError } from "../../../shared/errors/conflict-error.js";

import { UserRoleRepository } from "../repositories/user-role.repository.js";

export class UserRoleService {
    constructor(
        private readonly userRoleRepository =
            new UserRoleRepository(),
    ) { }

    async assignRole(
        userId: string,
        roleId: string,
    ) {
        const existing =
            await this.userRoleRepository.findByUserAndRole(
                userId,
                roleId,
            );

        if (existing) {
            throw new ConflictError(
                "Role already assigned",
            );
        }

        return this.userRoleRepository.create({
            userId,
            roleId,
        });
    }

    async getUserRoles(
        userId: string,
    ) {
        return this.userRoleRepository.findByUserId(
            userId,
        );
    }
}