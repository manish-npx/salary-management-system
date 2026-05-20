import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import type { EmployeeFormInput, EmployeeFormValues } from "../../utils/employeeSchema";
import { employeeFormSchema } from "../../utils/employeeSchema";

type EmployeeFormProps = {
  defaultValues?: Partial<EmployeeFormValues>;
  onSubmit: (values: EmployeeFormValues) => void;
};

const emptyValues: EmployeeFormInput = {
  employeeCode: "",
  fullName: "",
  email: "",
  jobTitle: "",
  department: "",
  country: "",
  salary: 0,
  currency: "",
  employmentType: "",
  dateOfJoining: ""
};

const fields: Array<{
  name: keyof EmployeeFormValues;
  label: string;
  type?: string;
}> = [
  { name: "employeeCode", label: "Employee code" },
  { name: "fullName", label: "Full name" },
  { name: "email", label: "Email", type: "email" },
  { name: "jobTitle", label: "Job title" },
  { name: "department", label: "Department" },
  { name: "country", label: "Country" },
  { name: "salary", label: "Salary", type: "number" },
  { name: "currency", label: "Currency" },
  { name: "employmentType", label: "Employment type" },
  { name: "dateOfJoining", label: "Date of joining", type: "date" }
];

export const EmployeeForm = ({ defaultValues, onSubmit }: EmployeeFormProps) => {
  const { control, handleSubmit } = useForm<EmployeeFormInput, unknown, EmployeeFormValues>({
    resolver: zodResolver(employeeFormSchema),
    defaultValues: { ...emptyValues, ...defaultValues }
  });

  return (
    <Box component="form" onSubmit={handleSubmit((values) => onSubmit(values))} sx={{ display: "grid", gap: 2, pt: 1 }}>
      {fields.map((field) => (
        <Controller
          key={field.name}
          control={control}
          name={field.name}
          render={({ field: controllerField, fieldState }) => (
            <TextField
              {...controllerField}
              error={Boolean(fieldState.error)}
              fullWidth
              helperText={fieldState.error?.message}
              label={field.label}
              size="small"
              slotProps={field.type === "date" ? { inputLabel: { shrink: true } } : undefined}
              type={field.type}
            />
          )}
        />
      ))}
      <Button type="submit" variant="contained">
        Save employee
      </Button>
    </Box>
  );
};
