import { Router } from "express";
import { validate } from "../../../middleware/validation.middleware.js";
import { UserRoleController } from "../controllers/user-role.controller.js";

import {
    assignRoleSchema,
} from "../validators/user-role.validator.js";
import { auth } from "../../../middleware/auth.middleware.js";
import { requirePermission } from "../../../middleware/permission.middleware.js";

const router = Router();

const userRoleController =
    new UserRoleController();

router.post(
    "/assign",
    auth,
    requirePermission("user-role.assign"),
    validate(assignRoleSchema),
    userRoleController.assignRole,
);

router.get(
    "/user/:userId",
    auth,
    requirePermission("user-role.view"),
    userRoleController.getUserRoles,
);

export default router;