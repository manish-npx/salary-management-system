import AddIcon from "@mui/icons-material/Add";
import { Alert, Button, Dialog, DialogContent, DialogTitle, Stack } from "@mui/material";
import { useMemo, useState } from "react";
import { EmployeeForm } from "../components/employees/EmployeeForm";
import { EmployeeTable } from "../components/employees/EmployeeTable";
import { useEmployeeMutations, useEmployees } from "../hooks/useEmployees";
import type { Employee, EmployeeFilters, EmployeeSort } from "../types/employee";
import type { EmployeeFormValues } from "../utils/employeeSchema";

export const EmployeesPage = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [filters, setFilters] = useState<EmployeeFilters>({ search: "", country: "", jobTitle: "" });
  const [sort, setSort] = useState<EmployeeSort>({ sortBy: "createdAt", order: "desc" });
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [isFormOpen, setFormOpen] = useState(false);
  const params = useMemo(() => ({ page, limit, ...filters, ...sort }), [filters, limit, page, sort]);
  const { data, isError } = useEmployees(params);
  const mutations = useEmployeeMutations();

  const closeForm = (): void => {
    setEditingEmployee(null);
    setFormOpen(false);
  };

  const submitEmployee = async (values: EmployeeFormValues): Promise<void> => {
    if (editingEmployee) {
      await mutations.update.mutateAsync({ id: editingEmployee.id, values });
    } else {
      await mutations.create.mutateAsync(values);
    }
    closeForm();
  };

  return (
    <Stack spacing={2}>
      <Button startIcon={<AddIcon />} sx={{ alignSelf: "flex-start" }} variant="contained" onClick={() => setFormOpen(true)}>
        Add employee
      </Button>
      {isError ? <Alert severity="error">Unable to load employees.</Alert> : null}
      <EmployeeTable
        employees={data?.data ?? []}
        filters={filters}
        limit={limit}
        page={page}
        sort={sort}
        total={data?.meta.total ?? 0}
        onDelete={(employee) => mutations.remove.mutate(employee.id)}
        onEdit={(employee) => {
          setEditingEmployee(employee);
          setFormOpen(true);
        }}
        onFiltersChange={(nextFilters) => {
          setFilters(nextFilters);
          setPage(1);
        }}
        onPageChange={(nextPage, nextLimit) => {
          setPage(nextPage);
          setLimit(nextLimit);
        }}
        onSortChange={setSort}
      />
      <Dialog fullWidth maxWidth="sm" open={isFormOpen} onClose={closeForm}>
        <DialogTitle>{editingEmployee ? "Edit employee" : "Add employee"}</DialogTitle>
        <DialogContent>
          <EmployeeForm
            defaultValues={
              editingEmployee
                ? { ...editingEmployee, dateOfJoining: editingEmployee.dateOfJoining.slice(0, 10) }
                : undefined
            }
            onSubmit={(values) => {
              void submitEmployee(values);
            }}
          />
        </DialogContent>
      </Dialog>
    </Stack>
  );
};
