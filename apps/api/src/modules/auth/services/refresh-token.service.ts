import argon2 from "argon2";

import { RefreshTokenRepository } from "../repositories/refresh-token.repository.js";

export class RefreshTokenService {
    constructor(
        private readonly repository =
            new RefreshTokenRepository(),
    ) { }

    async store(
        userId: string,
        refreshToken: string,
        expiresAt: Date,
    ) {
        const tokenHash =
            await argon2.hash(
                refreshToken,
            );

        return this.repository.create({
            userId,
            tokenHash,
            expiresAt,
        });
    }

    async validate(
        userId: string,
        refreshToken: string,
    ) {
        const token =
            await this.repository.findActiveByUserId(
                userId,
            );

        if (!token) {
            return false;
        }

        return argon2.verify(
            token.tokenHash,
            refreshToken,
        );
    }

    async revoke(
        userId: string,
    ) {
        const token =
            await this.repository.findActiveByUserId(
                userId,
            );

        if (!token) {
            return;
        }

        await this.repository.revoke(
            token.id,
        );
    }
}