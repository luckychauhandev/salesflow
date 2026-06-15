import { prisma } from "../../../infrastructure/database/prisma-client.js";

type RoleRecord = Awaited<
    ReturnType<typeof prisma.role.findUnique>
>;

export interface IRoleRepository {
    create(data: {
        organizationId: string;
        name: string;
        description?: string;
    }): Promise<RoleRecord>;

    findById(
        id: string,
    ): Promise<RoleRecord>;

    findByName(
        organizationId: string,
        name: string,
    ): Promise<RoleRecord>;
}