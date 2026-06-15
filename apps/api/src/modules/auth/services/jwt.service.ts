import jwt from "jsonwebtoken";

import { env } from "../../../config/env.js";

export class JwtService {
  static generateAccessToken(
    payload: object,
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
    payload: object,
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
    );
  }

  static verifyRefreshToken(
    token: string,
  ) {
    return jwt.verify(
      token,
      env.JWT_REFRESH_SECRET,
    );
  }
}