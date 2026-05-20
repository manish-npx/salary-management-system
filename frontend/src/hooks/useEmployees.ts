import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createEmployee, deleteEmployee, listEmployees, updateEmployee } from "../api/employees";
import type { EmployeeListParams } from "../api/employees";
import type { EmployeeFormValues } from "../utils/employeeSchema";

export const employeeKeys = {
  all: ["employees"] as const,
  list: (params: EmployeeListParams) => [...employeeKeys.all, params] as const
};

export const useEmployees = (params: EmployeeListParams) =>
  useQuery({
    queryKey: employeeKeys.list(params),
    queryFn: () => listEmployees(params)
  });

export const useEmployeeMutations = () => {
  const queryClient = useQueryClient();
  const invalidate = async (): Promise<void> => {
    await queryClient.invalidateQueries({ queryKey: employeeKeys.all });
  };

  return {
    create: useMutation({ mutationFn: createEmployee, onSuccess: invalidate }),
    update: useMutation({
      mutationFn: ({ id, values }: { id: string; values: EmployeeFormValues }) => updateEmployee(id, values),
      onSuccess: invalidate
    }),
    remove: useMutation({ mutationFn: deleteEmployee, onSuccess: invalidate })
  };
};
