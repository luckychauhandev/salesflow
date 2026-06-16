import { prisma } from "../../../infrastructure/database/prisma-client.js";

type RefreshTokenRecord = Awaited<
    ReturnType<
        typeof prisma.refreshToken.findFirst
    >
>;

export interface IRefreshTokenRepository {
    create(data: {
        userId: string;
        tokenHash: string;
        expiresAt: Date;
    }): Promise<RefreshTokenRecord>;

    findActiveByUserId(
        userId: string,
    ): Promise<RefreshTokenRecord>;

    revoke(id: string): Promise<void>;
}