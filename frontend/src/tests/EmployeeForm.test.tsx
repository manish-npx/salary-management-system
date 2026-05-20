import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { EmployeeForm } from "../components/employees/EmployeeForm";

describe("EmployeeForm", () => {
  it("shows validation errors for required fields", async () => {
    const user = userEvent.setup();

    render(<EmployeeForm onSubmit={() => undefined} />);
    await user.click(screen.getByRole("button", { name: "Save employee" }));

    expect(await screen.findByText("Full name is required")).toBeInTheDocument();
    expect(screen.getByText("Valid email is required")).toBeInTheDocument();
    expect(screen.getByText("Salary must be greater than zero")).toBeInTheDocument();
  });

  it("submits a valid employee payload", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(<EmployeeForm onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText("Employee code"), "EMP-1001");
    await user.type(screen.getByLabelText("Full name"), "Priya Menon");
    await user.type(screen.getByLabelText("Email"), "priya@example.com");
    await user.type(screen.getByLabelText("Job title"), "Backend Engineer");
    await user.type(screen.getByLabelText("Department"), "Engineering");
    await user.type(screen.getByLabelText("Country"), "India");
    await user.type(screen.getByLabelText("Salary"), "4200000");
    await user.type(screen.getByLabelText("Currency"), "INR");
    await user.type(screen.getByLabelText("Employment type"), "Full-time");
    await user.type(screen.getByLabelText("Date of joining"), "2022-06-01");
    await user.click(screen.getByRole("button", { name: "Save employee" }));

    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        employeeCode: "EMP-1001",
        fullName: "Priya Menon",
        email: "priya@example.com",
        salary: 4200000
      })
    );
  });
});
