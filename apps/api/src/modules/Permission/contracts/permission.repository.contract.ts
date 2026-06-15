import { prisma } from "../../../infrastructure/database/prisma-client.js";

type PermissionRecord = Awaited<
    ReturnType<
        typeof prisma.permission.findUnique
    >
>;

export interface IPermissionRepository {
    create(data: {
        name: string;
        description?: string;
    }): Promise<PermissionRecord>;

    findById(
        id: string,
    ): Promise<PermissionRecord>;

    findByName(
        name: string,
    ): Promise<PermissionRecord>;
}