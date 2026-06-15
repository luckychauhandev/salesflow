import { prisma } from "../../src/infrastructure/database/prisma-client.js";

async function main() {
  await prisma.organization.create({
    data: {
      name: "SalesFlow",
      slug: "salesflow",
    },
  });

  console.log("Organization seeded");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });