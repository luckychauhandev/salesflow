import { asyncHandler } from "../../../shared/utils/async-handler.js";

import {
  successResponse,
} from "../../../shared/utils/api-response.js";

import {
  clearAuthCookies,
  setAuthCookies,
} from "../../../shared/utils/auth-cookie.js";

import { AuthService } from "../services/auth.service.js";

export class AuthController {
  constructor(
    private readonly authService =
      new AuthService(),
  ) { }

  register = asyncHandler(
    async (req, res) => {
      const result =
        await this.authService.register(
          req.body,
        );

      return successResponse(
        res,
        result,
        "Registration successful",
        201,
      );
    },
  );

  login = asyncHandler(
    async (req, res) => {
      const result =
        await this.authService.login(
          req.body,
        );

      if (
        result.accessToken &&
        result.refreshToken
      ) {
        setAuthCookies(
          res,
          result.accessToken,
          result.refreshToken,
        );
      }

      return successResponse(
        res,
        result,
        "Login successful",
      );
    },
  );

  refresh = asyncHandler(
    async (req, res) => {
      const tokens =
        await this.authService.refresh(
          req.cookies?.refreshToken,
        );

      setAuthCookies(
        res,
        tokens.accessToken,
        tokens.refreshToken,
      );

      return successResponse(
        res,
        null,
        "Token refreshed successfully",
      );
    },
  );

  logout = asyncHandler(
    async (req, res) => {
      await this.authService.logout(
        req.cookies?.refreshToken,
      );

      clearAuthCookies(res);

      return successResponse(
        res,
        null,
        "Logged out successfully",
      );
    },
  );
}