// global.d.ts
import { PrismaClient } from "@prisma/client";

declare global {
  const prisma: PrismaClient | undefined; // Use var, not let or const here
}

declare global {
  const testVar: string; // Just a simple string variable
}