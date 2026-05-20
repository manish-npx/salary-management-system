import { PrismaClient } from "@prisma/client";
import { buildSeedEmployees, chunkEmployees } from "./seedEmployeeFactory";

const prisma = new PrismaClient();
const employeeCount = 10000;
const batchSize = 500;

const main = async (): Promise<void> => {
  const employees = buildSeedEmployees(employeeCount);

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
