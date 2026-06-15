import { Router } from "express";

import { AuditLogController } from "../controllers/audit-log.controller.js";

const router = Router();

const auditLogController =
    new AuditLogController();

router.get(
    "/:id",
    auditLogController.findById,
);

router.get(
    "/organization/:organizationId",
    auditLogController.findByOrganizationId,
);

export default router;