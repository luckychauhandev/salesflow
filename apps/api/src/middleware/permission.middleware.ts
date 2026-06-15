import { Request, Response, NextFunction } from "express";

export const authorize =
  (...permissions: string[]) =>
  async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const userPermissions =
      (req as Request & {
        permissions?: string[];
      }).permissions ?? [];

    const allowed = permissions.some((permission) =>
      userPermissions.includes(permission),
    );

    if (!allowed) {
      return res.status(403).json({
        success: false,
        message: "Forbidden",
      });
    }

    next();
  };