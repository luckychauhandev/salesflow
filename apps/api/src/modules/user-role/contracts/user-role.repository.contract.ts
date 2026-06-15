import { prisma } from "../../../infrastructure/database/prisma-client.js";

type UserRoleRecord = Awaited<
    ReturnType<
        typeof prisma.userRole.findUnique
    >
>;

export interface IUserRoleRepository {
    create(data: {
        userId: string;
        roleId: string;
    }): Promise<UserRoleRecord>;

    findByUserAndRole(
        userId: string,
        roleId: string,
    ): Promise<UserRoleRecord>;

    findByUserId(
        userId: string,
    ): Promise<UserRoleRecord[]>;
}