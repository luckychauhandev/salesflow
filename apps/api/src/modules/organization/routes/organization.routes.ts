import { Router } from "express";

import { validate } from "../../../middleware/validation.middleware.js";

import { OrganizationController } from "../controllers/organization.controller.js";

import {
  createOrganizationSchema,
} from "../validators/organization.validator.js";

const router = Router();

const organizationController =
  new OrganizationController();

router.post(
  "/",
  validate(createOrganizationSchema),
  organizationController.create,
);

router.get(
  "/:id",
  organizationController.findById,
);

export default router;