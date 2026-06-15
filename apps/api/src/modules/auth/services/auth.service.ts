import { UnauthorizedError } from "../../../shared/errors/unauthorized-error.js";

import { OrganizationService } from "../../organization/services/organization.service.js";
import { UserService } from "../../user/services/user.service.js";

import { JwtService } from "./jwt.service.js";
import { PasswordService } from "./password.service.js";

export class AuthService {
  constructor(
    private readonly organizationService =
      new OrganizationService(),

    private readonly userService =
      new UserService(),
  ) {}

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

    return {
      user,
      accessToken,
      refreshToken,
    };
  }
}