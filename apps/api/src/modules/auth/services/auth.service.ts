import ms, { StringValue } from "ms";
import { UnauthorizedError } from "../../../shared/errors/unauthorized-error.js";

import { OrganizationService } from "../../organization/services/organization.service.js";
import { UserRepository } from "../../user/repositories/user.repository.js";
import { UserService } from "../../user/services/user.service.js";

import { JwtService } from "./jwt.service.js";
import { PasswordService } from "./password.service.js";
import { RefreshTokenService } from "./refresh-token.service.js";
import { env } from "../../../config/env.js";

export class AuthService {
  constructor(
    private readonly organizationService = new OrganizationService(),
    private readonly userService = new UserService(),
    private readonly refreshTokenService = new RefreshTokenService(),
    private readonly userRepository =
      new UserRepository(),
  ) { }

  async register(data: {
    organizationName: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) {
    const organization =
      await this.organizationService.create(
        data.organizationName,
      );

    const passwordHash =
      await PasswordService.hash(
        data.password,
      );

    const user =
      await this.userService.create({
        organizationId:
          organization.id,

        email: data.email,

        passwordHash,

        firstName: data.firstName,

        lastName: data.lastName,
      });

    const payload = {
      sub: user.id,
      organizationId:
        organization.id,
    };

    const accessToken =
      JwtService.generateAccessToken(
        payload,
      );

    const refreshToken =
      JwtService.generateRefreshToken(
        payload,
      );

    await this.refreshTokenService.store(
      user.id,
      refreshToken,
      new Date(
        Date.now() +
        1000 *
        60 *
        60 *
        24 *
        30,
      ),
    );

    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  async login(data: {
    email: string;
    password: string;
    organizationId: string;
  }) {
    const user =
      await this.userService.findByEmail(
        data.organizationId,
        data.email,
      );

    if (!user) {
      throw new UnauthorizedError(
        "Invalid credentials",
      );
    }

    if (!user.isActive) {
      throw new UnauthorizedError(
        "User account is inactive",
      );
    }

    if (user.isDeleted) {
      throw new UnauthorizedError(
        "User account is deleted",
      );
    }

    const isValid =
      await PasswordService.verify(
        user.passwordHash,
        data.password,
      );

    if (!isValid) {
      throw new UnauthorizedError(
        "Invalid credentials",
      );
    }

    const payload = {
      sub: user.id,
      organizationId:
        user.organizationId,
    };

    const accessToken =
      JwtService.generateAccessToken(
        payload,
      );

    const refreshToken =
      JwtService.generateRefreshToken(
        payload,
      );

    await this.refreshTokenService.store(
      user.id,
      refreshToken,
      new Date(
        Date.now() +
        ms(
          env.JWT_REFRESH_EXPIRES_IN as StringValue,
        ),
      ),
    );

    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  async refresh(
    refreshToken: string,
  ) {
    if (!refreshToken) {
      throw new UnauthorizedError(
        "Refresh token required",
      );
    }

    const payload =
      JwtService.verifyRefreshToken(
        refreshToken,
      );

    const user =
      await this.userRepository.findById(
        payload.sub,
      );

    if (!user) {
      throw new UnauthorizedError(
        "User not found",
      );
    }

    const isValid =
      await this.refreshTokenService.validate(
        user.id,
        refreshToken,
      );

    if (!isValid) {
      throw new UnauthorizedError(
        "Invalid refresh token",
      );
    }

    await this.refreshTokenService.revoke(
      user.id,
    );

    const newPayload = {
      sub: user.id,
      organizationId:
        user.organizationId,
    };

    const accessToken =
      JwtService.generateAccessToken(
        newPayload,
      );

    const newRefreshToken =
      JwtService.generateRefreshToken(
        newPayload,
      );

    await this.refreshTokenService.store(
      user.id,
      newRefreshToken,
      new Date(
        Date.now() +
        1000 *
        60 *
        60 *
        24 *
        30,
      ),
    );

    return {
      accessToken,
      refreshToken:
        newRefreshToken,
    };
  }

  async logout(
    refreshToken: string,
  ) {
    if (!refreshToken) {
      return;
    }

    const payload =
      JwtService.verifyRefreshToken(
        refreshToken,
      );

    await this.refreshTokenService.revoke(
      payload.sub,
    );
  }
}