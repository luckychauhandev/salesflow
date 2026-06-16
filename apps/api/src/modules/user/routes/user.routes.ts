import { Router } from "express";
import { auth } from "../../../middleware/auth.middleware.js";
import { requirePermission } from "../../../middleware/permission.middleware.js";
import { validate } from "../../../middleware/validation.middleware.js";
import { UserController } from "../controllers/user.controller.js";

import {
  createUserSchema,
} from "../validators/user.validator.js";

const router = Router();

const userController = new UserController();

router.post("/", auth, requirePermission("user.create"), validate(createUserSchema), userController.create);

router.get("/:id", auth, requirePermission("user.view"), userController.findById);

export default router;