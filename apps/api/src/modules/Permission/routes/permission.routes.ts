import { Router } from "express";

import { validate } from "../../../middleware/validation.middleware.js";

import { PermissionController } from "../controllers/permission.controller.js";

import {
    createPermissionSchema,
} from "../validators/permission.validator.js";
import { auth } from "../../../middleware/auth.middleware.js";
import { requirePermission } from "../../../middleware/permission.middleware.js";

const router = Router();

const permissionController = new PermissionController();

router.post("/", auth, requirePermission("permission.create"), validate(createPermissionSchema), permissionController.create);
router.get("/:id", auth, requirePermission("permission.view"), permissionController.findById);

export default router;