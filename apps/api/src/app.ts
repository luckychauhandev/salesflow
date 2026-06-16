import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";

import { prisma } from "./infrastructure/database/prisma-client.js";

import { errorHandler } from "./middleware/error.middleware.js";
import { notFoundHandler } from "./shared/errors/not-found.middleware.js";

import authRoutes from "./modules/auth/routes/auth.routes.js";
import organizationRoutes from "./modules/organization/routes/organization.routes.js";
import userRoutes from "./modules/user/routes/user.routes.js";
import roleRoutes from "./modules/role/routes/role.routes.js";
import permissionRoutes from "./modules/Permission/routes/permission.routes.js";
import userRoleRoutes from "./modules/user-role/routes/user-role.routes.js";
import rolePermissionRoutes from "./modules/role-permission/routes/role-permission.routes.js";
import auditLogRoutes from "./modules/audit-log/routes/audit-log.routes.js";

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
  });
});

app.get("/db-test", async (_req, res) => {
  const count =
    await prisma.organization.count();

  res.status(200).json({
    success: true,
    count,
  });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/organizations", organizationRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/roles", roleRoutes);
app.use("/api/v1/permissions", permissionRoutes);
app.use("/api/v1/user-roles", userRoleRoutes);
app.use("/api/v1/role-permissions", rolePermissionRoutes);
app.use("/api/v1/audit-logs", auditLogRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;