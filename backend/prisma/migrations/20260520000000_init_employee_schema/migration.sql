-- CreateTable
CREATE TABLE "Employee" (
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

-- CreateIndex
CREATE UNIQUE INDEX "Employee_employeeCode_key" ON "Employee"("employeeCode");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_email_key" ON "Employee"("email");

-- CreateIndex
CREATE INDEX "Employee_country_idx" ON "Employee"("country");

-- CreateIndex
CREATE INDEX "Employee_jobTitle_idx" ON "Employee"("jobTitle");

-- CreateIndex
CREATE INDEX "Employee_salary_idx" ON "Employee"("salary");
