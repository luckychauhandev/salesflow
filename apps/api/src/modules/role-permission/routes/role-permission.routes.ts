import { Router } from "express";

import { validate } from "../../../middleware/validation.middleware.js";

import { RolePermissionController } from "../controllers/role-permission.controller.js";

import {
    assignPermissionSchema,
} from "../validators/role-permission.validator.js";
import { auth } from "../../../middleware/auth.middleware.js";
import { requirePermission } from "../../../middleware/permission.middleware.js";

const router = Router();

const rolePermissionController =
    new RolePermissionController();

router.post(
    "/assign",
    auth,
    requirePermission("role-permission.assign"),
    validate(assignPermissionSchema),
    rolePermissionController.assignPermission,
);

router.get(
    "/role/:roleId",
    auth,
    requirePermission("role-permission.view"),
    rolePermissionController.getRolePermissions,
);

export default router;