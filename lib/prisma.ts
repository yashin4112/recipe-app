import { PrismaClient } from "@prisma/client";

// Extend globalThis to include the prisma instance
declare global {
  var prisma: PrismaClient | undefined;
}

// Use a singleton Prisma instance to prevent multiple connections in development
const prisma = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}

export default prisma;