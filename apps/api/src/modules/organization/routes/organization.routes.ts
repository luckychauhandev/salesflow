import { Router } from "express";

import { validate } from "../../../middleware/validation.middleware.js";

import { OrganizationController } from "../controllers/organization.controller.js";

import {
  createOrganizationSchema,
} from "../validators/organization.validator.js";
import { auth } from "../../../middleware/auth.middleware.js";
import { requirePermission } from "../../../middleware/permission.middleware.js";

const router = Router();

const organizationController = new OrganizationController();

router.post("/", auth, requirePermission("organization.manage"), validate(createOrganizationSchema), organizationController.create);
router.get("/:id", auth, requirePermission("organization.manage"), organizationController.findById);

export default router;