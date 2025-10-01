import { PrismaClient } from "@prisma/client";

declare global {
  // Avoid multiple instances in development (Next.js hot reload)
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query"] : [], // logs only in dev
  });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
