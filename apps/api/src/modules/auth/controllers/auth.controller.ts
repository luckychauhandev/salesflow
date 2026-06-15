import { asyncHandler } from "../../../shared/utils/async-handler.js";

import {
  successResponse,
} from "../../../shared/utils/api-response.js";

import { AuthService } from "../services/auth.service.js";

export class AuthController {
  constructor(
    private readonly authService =
      new AuthService(),
  ) {}

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

      return successResponse(
        res,
        result,
        "Login successful",
      );
    },
  );
}