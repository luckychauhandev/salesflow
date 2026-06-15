import { Router } from "express";

import { validate } from "../../../middleware/validation.middleware.js";

import { AuthController } from "../controllers/auth.controller.js";

import {
  loginSchema,
} from "../validators/login.validator.js";

import {
  registerSchema,
} from "../validators/register.validator.js";

const router = Router();

const authController =
  new AuthController();

router.post(
  "/register",
  validate(registerSchema),
  authController.register,
);

router.post(
  "/login",
  validate(loginSchema),
  authController.login,
);

export default router;