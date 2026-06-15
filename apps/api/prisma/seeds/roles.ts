import { prisma } from "../../src/infrastructure/database/prisma-client.js";

async function main() {
  const organization = await prisma.organization.findFirst();

  if (!organization) {
    throw new Error("Organization not found");
  }

  const roles = [
    "Super Admin",
    "Admin",
    "Manager",
    "Agent",
  ];

  for (const role of roles) {
    await prisma.role.upsert({
      where: {
        organizationId_name: {
          organizationId: organization.id,
          name: role,
        },
      },
      update: {},
      create: {
        organizationId: organization.id,
        name: role,
        isSystem: true,
      },
    });
  }

  console.log("Roles seeded");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });