import { Router } from "express";

import { validate } from "../../../middleware/validation.middleware.js";

import { PermissionController } from "../controllers/permission.controller.js";

import {
    createPermissionSchema,
} from "../validators/permission.validator.js";

const router = Router();

const permissionController =
    new PermissionController();

router.post(
    "/",
    validate(createPermissionSchema),
    permissionController.create,
);

router.get(
    "/:id",
    permissionController.findById,
);

export default router;