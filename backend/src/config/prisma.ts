import { PrismaClient } from "@prisma/client";

const defaultDbUrl = "file:./dev.db";
if (!process.env.DATABASE_URL) {
    process.env.DATABASE_URL = defaultDbUrl;
}

export const prisma = new PrismaClient();
