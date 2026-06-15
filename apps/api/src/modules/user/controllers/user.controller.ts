import { asyncHandler } from "../../../shared/utils/async-handler.js";

import {
  createdResponse,
  successResponse,
} from "../../../shared/utils/api-response.js";

import { UserService } from "../services/user.service.js";

export class UserController {
  constructor(
    private readonly userService =
      new UserService(),
  ) {}

  create = asyncHandler(
    async (req, res) => {
      const user =
        await this.userService.create(
          req.body,
        );

      return createdResponse(
        res,
        user,
        "User created successfully",
      );
    },
  );

  findById = asyncHandler(
    async (req, res) => {
      const user =
        await this.userService.findById(
          String(req.params.id),
        );

      return successResponse(
        res,
        user,
        "User fetched successfully",
      );
    },
  );
}