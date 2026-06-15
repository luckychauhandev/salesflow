import { prisma } from "../../../infrastructure/database/prisma-client.js";

type OrganizationRecord = Awaited<
  ReturnType<typeof prisma.organization.findUnique>
>;

export interface IOrganizationRepository {
  create(data: {
    name: string;
    slug: string;
  }): Promise<OrganizationRecord>;

  findById(
    id: string,
  ): Promise<OrganizationRecord>;

  findBySlug(
    slug: string,
  ): Promise<OrganizationRecord>;
}