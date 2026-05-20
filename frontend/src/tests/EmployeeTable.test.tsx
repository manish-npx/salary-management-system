import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { EmployeeTable } from "../components/employees/EmployeeTable";
import type { Employee } from "../types/employee";

const employees: Employee[] = [
  {
    id: "1",
    employeeCode: "EMP-0001",
    fullName: "Asha Rao",
    email: "asha@example.com",
    jobTitle: "Frontend Engineer",
    department: "Engineering",
    country: "India",
    salary: 3000000,
    currency: "INR",
    employmentType: "Full-time",
    dateOfJoining: "2022-04-15T00:00:00.000Z",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z"
  },
  {
    id: "2",
    employeeCode: "EMP-0002",
    fullName: "Ben Cole",
    email: "ben@example.com",
    jobTitle: "Product Manager",
    department: "Product",
    country: "United States",
    salary: 150000,
    currency: "USD",
    employmentType: "Full-time",
    dateOfJoining: "2021-02-10T00:00:00.000Z",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z"
  }
];

describe("EmployeeTable", () => {
  it("renders employee rows and pagination metadata", () => {
    render(
      <EmployeeTable
        employees={employees}
        total={10000}
        page={1}
        limit={20}
        filters={{ search: "", country: "", jobTitle: "" }}
        sort={{ sortBy: "createdAt", order: "desc" }}
        onFiltersChange={() => undefined}
        onPageChange={() => undefined}
        onSortChange={() => undefined}
        onEdit={() => undefined}
        onDelete={() => undefined}
      />
    );

    expect(screen.getByText("Asha Rao")).toBeInTheDocument();
    expect(screen.getByText("Ben Cole")).toBeInTheDocument();
    expect(screen.getByText("10,000 employees")).toBeInTheDocument();
  });

  it("emits filter changes for server-side queries", async () => {
    const user = userEvent.setup();
    const onFiltersChange = vi.fn();

    render(
      <EmployeeTable
        employees={employees}
        total={2}
        page={1}
        limit={20}
        filters={{ search: "", country: "", jobTitle: "" }}
        sort={{ sortBy: "createdAt", order: "desc" }}
        onFiltersChange={onFiltersChange}
        onPageChange={() => undefined}
        onSortChange={() => undefined}
        onEdit={() => undefined}
        onDelete={() => undefined}
      />
    );

    await user.type(screen.getByLabelText("Search employees"), "asha");
    await user.selectOptions(screen.getByLabelText("Country"), "India");

    expect(onFiltersChange).toHaveBeenCalledWith(expect.objectContaining({ search: "asha" }));
    expect(onFiltersChange).toHaveBeenCalledWith(expect.objectContaining({ country: "India" }));
  });
});
