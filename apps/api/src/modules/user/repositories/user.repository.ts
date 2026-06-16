import { prisma } from "../../../infrastructure/database/prisma-client.js";

import type { IUserRepository } from "../contracts/user.repository.contract.js";

export class UserRepository
  implements IUserRepository {

  async create(data: {
    organizationId: string;
    email: string;
    passwordHash: string;
    firstName: string;
    lastName: string;
  }) {
    return prisma.user.create({
      data,
    });
  }

  async findById(id: string) {
    return prisma.user.findFirst({
      where: {
        id,
        isDeleted: false,
      },
    });
  }

  async findByEmail(
    organizationId: string,
    email: string,
  ) {
    return prisma.user.findFirst({
      where: {
        organizationId,
        email,
        isDeleted: false,
      },
    });
  }

  async findAuthUser(id: string) {
    return prisma.user.findFirst({
      where: {
        id,
        isActive: true,
        isDeleted: false,
        organization: {
          isDeleted: false,
        },
      },
      include: {
        organization: true,
      },
    });
  }
}