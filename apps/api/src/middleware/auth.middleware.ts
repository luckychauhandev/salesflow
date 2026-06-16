import type {
    NextFunction,
    Request,
    Response,
} from "express";

import { JwtService } from "../modules/auth/services/jwt.service.js";
import { UserRepository } from "../modules/user/repositories/user.repository.js";

import { UnauthorizedError } from "../shared/errors/unauthorized-error.js";

const userRepository =
    new UserRepository();

export async function auth(
    req: Request,
    _res: Response,
    next: NextFunction,
) {
    try {
        const accessToken =
            req.cookies?.accessToken ??
            req.headers.authorization
                ?.replace("Bearer ", "");

        if (!accessToken) {
            return next(
                new UnauthorizedError(
                    "Authentication required",
                ),
            );
        }

        const payload = JwtService.verifyAccessToken(
            accessToken,
        );

        const user = await userRepository.findAuthUser(
            payload.sub,
        );

        if (!user) {
            return next(
                new UnauthorizedError(
                    "User not found",
                ),
            );
        }

        if (!user.isActive) {
            return next(
                new UnauthorizedError(
                    "Account is inactive",
                ),
            );
        }

        if (user.isDeleted) {
            return next(
                new UnauthorizedError(
                    "Account is deleted",
                ),
            );
        }

        req.user = {
            id: user.id,
            organizationId:
                user.organizationId,
        };

        return next();
    } catch {
        return next(
            new UnauthorizedError(
                "Invalid or expired token",
            ),
        );
    }
}