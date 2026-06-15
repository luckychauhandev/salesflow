import { Router } from "express";

import { validate } from "../../../middleware/validation.middleware.js";

import { UserController } from "../controllers/user.controller.js";

import {
  createUserSchema,
} from "../validators/user.validator.js";

const router = Router();

const userController =
  new UserController();

router.post(
  "/",
  validate(createUserSchema),
  userController.create,
);

router.get(
  "/:id",
  userController.findById,
);

export default router;