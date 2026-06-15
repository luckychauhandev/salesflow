import { prisma } from "../../../infrastructure/database/prisma-client.js";

import type { IOrganizationRepository } from "../contracts/organization.repository.contract.js";

export class OrganizationRepository
  implements IOrganizationRepository
{
  async create(data: {
    name: string;
    slug: string;
  }) {
    return prisma.organization.create({
      data,
    });
  }

  async findById(id: string) {
    return prisma.organization.findFirst({
      where: {
        id,
        isDeleted: false,
      },
    });
  }

  async findBySlug(slug: string) {
    return prisma.organization.findFirst({
      where: {
        slug,
        isDeleted: false,
      },
    });
  }
}