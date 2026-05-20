import { prisma } from "../config/prisma";

beforeEach(async () => {
  await prisma.employee.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});
