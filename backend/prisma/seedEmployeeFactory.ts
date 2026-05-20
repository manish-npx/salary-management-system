import type { Prisma } from "@prisma/client";

type SeedProfile = {
  country: string;
  currency: string;
  minSalary: number;
  maxSalary: number;
};

const firstNames = ["Aarav", "Maya", "Noah", "Olivia", "Liam", "Sophia", "Ravi", "Emma", "Kenji", "Amara"];
const lastNames = ["Sharma", "Rao", "Smith", "Johnson", "Kumar", "Brown", "Tanaka", "Ndlovu", "Garcia", "Patel"];
const departments = ["Engineering", "Product", "Finance", "People", "Sales", "Support", "Marketing", "Operations"];
const jobTitles = [
  "Frontend Engineer",
  "Backend Engineer",
  "Product Manager",
  "Data Analyst",
  "HR Business Partner",
  "Finance Manager",
  "Sales Executive",
  "Support Specialist"
];
const employmentTypes = ["Full-time", "Part-time", "Contract"];
const profiles: SeedProfile[] = [
  { country: "India", currency: "INR", minSalary: 900000, maxSalary: 6500000 },
  { country: "United States", currency: "USD", minSalary: 65000, maxSalary: 230000 },
  { country: "United Kingdom", currency: "GBP", minSalary: 45000, maxSalary: 160000 },
  { country: "Germany", currency: "EUR", minSalary: 55000, maxSalary: 170000 },
  { country: "Singapore", currency: "SGD", minSalary: 70000, maxSalary: 210000 }
];

const padded = (value: number): string => value.toString().padStart(5, "0");

const salaryFor = (index: number, profile: SeedProfile): number => {
  const span = profile.maxSalary - profile.minSalary;
  return profile.minSalary + ((index * 7919) % span);
};

export const buildSeedEmployees = (count: number): Prisma.EmployeeCreateManyInput[] =>
  Array.from({ length: count }, (_, index) => {
    const profile = profiles[index % profiles.length];
    const firstName = firstNames[index % firstNames.length];
    const lastName = lastNames[Math.floor(index / firstNames.length) % lastNames.length];
    const employeeNumber = index + 1;

    return {
      employeeCode: `EMP-${padded(employeeNumber)}`,
      fullName: `${firstName} ${lastName}`,
      email: `${firstName}.${lastName}.${employeeNumber}@example.com`.toLowerCase(),
      jobTitle: jobTitles[index % jobTitles.length],
      department: departments[index % departments.length],
      country: profile.country,
      salary: salaryFor(index, profile),
      currency: profile.currency,
      employmentType: employmentTypes[index % employmentTypes.length],
      dateOfJoining: new Date(2015 + (index % 10), index % 12, (index % 27) + 1)
    };
  });

export const chunkEmployees = <T>(employees: T[], batchSize: number): T[][] => {
  const chunks: T[][] = [];

  for (let index = 0; index < employees.length; index += batchSize) {
    chunks.push(employees.slice(index, index + batchSize));
  }

  return chunks;
};
