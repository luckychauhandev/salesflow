import { prisma } from "../../src/infrastructure/database/prisma-client.js";

const permissions = [
  "organization.manage",

  "user.create",
  "user.view",
  "user.update",
  "user.delete",

  "role.create",
  "role.view",
  "role.update",
  "role.delete",

  "permission.assign",

  "lead.create",
  "lead.view",
  "lead.update",
  "lead.delete",

  "contact.create",
  "contact.view",
  "contact.update",
  "contact.delete",

  "company.create",
  "company.view",
  "company.update",
  "company.delete",

  "deal.create",
  "deal.view",
  "deal.update",
  "deal.delete",
];

async function main() {
  for (const permission of permissions) {
    await prisma.permission.upsert({
      where: {
        name: permission,
      },
      update: {},
      create: {
        name: permission,
      },
    });
  }

  console.log("Permissions seeded");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });