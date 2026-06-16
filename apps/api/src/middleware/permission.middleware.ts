import type {
  NextFunction,
  Request,
  Response,
} from "express";

import { ForbiddenError } from "../shared/errors/forbidden-error.js";
import { UnauthorizedError } from "../shared/errors/unauthorized-error.js";

import { UserRoleRepository } from "../modules/user-role/repositories/user-role.repository.js";

const userRoleRepository =
  new UserRoleRepository();

export function requirePermission(
  permissionName: string,
) {
  return async (
    req: Request,
    _res: Response,
    next: NextFunction,
  ) => {
    try {
      if (!req.user) {
        return next(
          new UnauthorizedError(
            "Unauthorized",
          ),
        );
      }

      const userRoles =
        await userRoleRepository.findUserPermissions(
          req.user.id,
        );

      const permissions =
        userRoles.flatMap(
          (userRole) =>
            userRole.role.rolePermissions.map(
              (rolePermission) =>
                rolePermission.permission.name,
            ),
        );

      const hasPermission =
        permissions.includes(
          permissionName,
        );

      if (!hasPermission) {
        return next(
          new ForbiddenError(
            "Insufficient permissions",
          ),
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}