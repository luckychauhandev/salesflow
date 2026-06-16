import { Router } from "express";

import { validate } from "../../../middleware/validation.middleware.js";

import { RoleController } from "../controllers/role.controller.js";

import {
    createRoleSchema,
} from "../validators/role.validator.js";
import { requirePermission } from "../../../middleware/permission.middleware.js";
import { auth } from "../../../middleware/auth.middleware.js";

const router = Router();

const roleController = new RoleController();

router.post("/", auth, requirePermission("role.create"), validate(createRoleSchema), roleController.create);
router.get("/:id", auth, requirePermission("role.view"), roleController.findById);

export default router;