import { Router } from "express";

import { validate } from "../../../middleware/validation.middleware.js";

import { RolePermissionController } from "../controllers/role-permission.controller.js";

import {
    assignPermissionSchema,
} from "../validators/role-permission.validator.js";

const router = Router();

const rolePermissionController =
    new RolePermissionController();

router.post(
    "/assign",
    validate(assignPermissionSchema),
    rolePermissionController.assignPermission,
);

router.get(
    "/role/:roleId",
    rolePermissionController.getRolePermissions,
);

export default router;