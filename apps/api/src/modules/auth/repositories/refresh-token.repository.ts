import { prisma } from "../../../infrastructure/database/prisma-client.js";

export class RefreshTokenRepository {
    async create(data: {
        userId: string;
        tokenHash: string;
        expiresAt: Date;
    }) {
        return prisma.refreshToken.create({
            data,
        });
    }

    async findActiveByUserId(
        userId: string,
    ) {
        return prisma.refreshToken.findFirst({
            where: {
                userId,
                isRevoked: false,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    }

    async revoke(id: string) {
        await prisma.refreshToken.update({
            where: {
                id,
            },
            data: {
                isRevoked: true,
                revokedAt: new Date(),
            },
        });
    }
}