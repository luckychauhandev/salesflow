import jwt from "jsonwebtoken";

import { env } from "../../../config/env.js";

import type { JwtPayload } from "../types/jwt-payload.js";

export class JwtService {
  static generateAccessToken(
    payload: JwtPayload,
  ) {
    return jwt.sign(
      payload,
      env.JWT_ACCESS_SECRET,
      {
        expiresIn:
          env.JWT_ACCESS_EXPIRES_IN as any,
      },
    );
  }

  static generateRefreshToken(
    payload: JwtPayload,
  ) {
    return jwt.sign(
      payload,
      env.JWT_REFRESH_SECRET,
      {
        expiresIn:
          env.JWT_REFRESH_EXPIRES_IN as any,
      },
    );
  }

  static verifyAccessToken(
    token: string,
  ) {
    return jwt.verify(
      token,
      env.JWT_ACCESS_SECRET,
    ) as JwtPayload;
  }

  static verifyRefreshToken(
    token: string,
  ) {
    return jwt.verify(
      token,
      env.JWT_REFRESH_SECRET,
    ) as JwtPayload;
  }
}