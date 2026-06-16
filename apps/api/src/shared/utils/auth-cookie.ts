import type { Response } from "express";

import { env } from "../../config/env.js";

const cookieOptions = {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "strict" as const,
};

export function setAuthCookies(
    res: Response,
    accessToken: string,
    refreshToken: string,
) {
    res.cookie(
        "accessToken",
        accessToken,
        cookieOptions,
    );

    res.cookie(
        "refreshToken",
        refreshToken,
        cookieOptions,
    );
}

export function clearAuthCookies(
    res: Response,
) {
    res.clearCookie(
        "accessToken",
        cookieOptions,
    );

    res.clearCookie(
        "refreshToken",
        cookieOptions,
    );
}