import { Router } from "express";

import { validate } from "../../../middleware/validation.middleware.js";

import { UserRoleController } from "../controllers/user-role.controller.js";

import {
    assignRoleSchema,
} from "../validators/user-role.validator.js";

const router = Router();

const userRoleController =
    new UserRoleController();

router.post(
    "/assign",
    validate(assignRoleSchema),
    userRoleController.assignRole,
);

router.get(
    "/user/:userId",
    userRoleController.getUserRoles,
);

export default router;