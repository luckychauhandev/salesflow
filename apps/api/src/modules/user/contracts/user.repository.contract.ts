import { prisma } from "../../../infrastructure/database/prisma-client.js";

type UserRecord = Awaited<
  ReturnType<typeof prisma.user.findUnique>
>;

export interface IUserRepository {
  create(data: {
    organizationId: string;
    email: string;
    passwordHash: string;
    firstName: string;
    lastName: string;
  }): Promise<UserRecord>;

  findById(
    id: string,
  ): Promise<UserRecord>;

  findByEmail(
    organizationId: string,
    email: string,
  ): Promise<UserRecord>;

  findAuthUser(
    id: string,
  ): Promise<Awaited<ReturnType<typeof prisma.user.findFirst>>>;
}