import { asyncHandler } from "../../../shared/utils/async-handler.js";
import {
  createdResponse,
  successResponse,
} from "../../../shared/utils/api-response.js";

import { OrganizationService } from "../services/organization.service.js";

export class OrganizationController {
  constructor(
    private readonly organizationService =
      new OrganizationService(),
  ) {}

  create = asyncHandler(
    async (req, res) => {
      const organization =
        await this.organizationService.create(
          String(req.body.name),
        );

      return createdResponse(
        res,
        organization,
        "Organization created successfully",
      );
    },
  );

  findById = asyncHandler(
    async (req, res) => {
      const organization =
        await this.organizationService.findById(
          String(req.params.id),
        );

      return successResponse(
        res,
        organization,
        "Organization fetched successfully",
      );
    },
  );
}