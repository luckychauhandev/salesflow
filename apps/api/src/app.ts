import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import { prisma } from "./infrastructure/database/prisma-client.js";
import organizationRoutes from "./modules/organization/routes/organization.routes.js";
import authRoutes from "./modules/auth/routes/auth.routes.js";
import roleRoutes from "./modules/role/routes/role.routes.js";
import permissionRoutes from "./modules/Permission/routes/permission.routes.js";
import userRoleRoutes from "./modules/user-role/routes/user-role.routes.js";
import rolePermissionRoutes from "./modules/role-permission/routes/role-permission.routes.js";
import auditLogRoutes from "./modules/audit-log/routes/audit-log.routes.js";
import userRoutes from "./modules/user/routes/user.routes.js";

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

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/organizations", organizationRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/roles", roleRoutes);
app.use("/api/v1/permissions", permissionRoutes);
app.use("/api/v1/user-roles", userRoleRoutes);
app.use("/api/v1/role-permissions", rolePermissionRoutes);
app.use("/api/v1/audit-logs", auditLogRoutes);

app.get("/health", (_, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
  });
});

app.get("/db-test", async (_, res) => {
  const count = await prisma.organization.count();

  res.status(200).json({
    success: true,
    count,
  });
});

export default app;