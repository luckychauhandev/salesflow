import { Router } from "express";

import { AuditLogController } from "../controllers/audit-log.controller.js";
import { requirePermission } from "../../../middleware/permission.middleware.js";
import { auth } from "../../../middleware/auth.middleware.js";

const router = Router();

const auditLogController = new AuditLogController();

router.get("/:id", auth, requirePermission("audit-log.view"), auditLogController.findById);

router.get("/organization/:organizationId", auth, requirePermission("audit-log.view"), auditLogController.findByOrganizationId);

export default router;