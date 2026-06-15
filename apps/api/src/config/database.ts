import { prisma } from "../infrastructure/database/prisma-client.js";

export async function connectDatabase() {
  try {
    await prisma.$connect();

    console.log("✓ Database connected");
  } catch (error) {
    console.error("✗ Database connection failed");

    throw error;
  }
}

export async function disconnectDatabase() {
  await prisma.$disconnect();
}