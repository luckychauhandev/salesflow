import { Router } from "express";

import { validate } from "../../../middleware/validation.middleware.js";

import { RoleController } from "../controllers/role.controller.js";

import {
    createRoleSchema,
} from "../validators/role.validator.js";

const router = Router();

const roleController =
    new RoleController();

router.post(
    "/",
    validate(createRoleSchema),
    roleController.create,
);

router.get(
    "/:id",
    roleController.findById,
);

export default router;