import { PrismaClient } from "@prisma/client";
import { buildSeedEmployees, chunkEmployees } from "./seedEmployeeFactory";

const prisma = new PrismaClient();
const employeeCount = 10000;
const batchSize = 500;

const ensureSqliteSchema = async (): Promise<void> => {
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "Employee" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "employeeCode" TEXT NOT NULL,
      "fullName" TEXT NOT NULL,
      "email" TEXT NOT NULL,
      "jobTitle" TEXT NOT NULL,
      "department" TEXT NOT NULL,
      "country" TEXT NOT NULL,
      "salary" INTEGER NOT NULL,
      "currency" TEXT NOT NULL,
      "employmentType" TEXT NOT NULL,
      "dateOfJoining" DATETIME NOT NULL,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" DATETIME NOT NULL
    );
  `);
  await prisma.$executeRawUnsafe(`CREATE UNIQUE INDEX IF NOT EXISTS "Employee_employeeCode_key" ON "Employee"("employeeCode");`);
  await prisma.$executeRawUnsafe(`CREATE UNIQUE INDEX IF NOT EXISTS "Employee_email_key" ON "Employee"("email");`);
  await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "Employee_country_idx" ON "Employee"("country");`);
  await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "Employee_jobTitle_idx" ON "Employee"("jobTitle");`);
  await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "Employee_salary_idx" ON "Employee"("salary");`);
};

const main = async (): Promise<void> => {
  const employees = buildSeedEmployees(employeeCount);
  await ensureSqliteSchema();

  await prisma.$transaction(async (transaction) => {
    await transaction.employee.deleteMany();

    for (const chunk of chunkEmployees(employees, batchSize)) {
      await transaction.employee.createMany({ data: chunk });
    }
  });

  console.log(`Seeded ${employeeCount} employees in ${Math.ceil(employeeCount / batchSize)} batches.`);
};

main()
  .catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
