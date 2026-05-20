import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Toolbar,
  Tooltip,
  Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import type { Employee, EmployeeFilters, EmployeeSort } from "../../types/employee";

type EmployeeTableProps = {
  employees: Employee[];
  total: number;
  page: number;
  limit: number;
  filters: EmployeeFilters;
  sort: EmployeeSort;
  onFiltersChange: (filters: EmployeeFilters) => void;
  onPageChange: (page: number, limit: number) => void;
  onSortChange: (sort: EmployeeSort) => void;
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
};

const countries = ["", "India", "United States", "United Kingdom", "Germany", "Singapore"];
const jobTitles = ["", "Frontend Engineer", "Backend Engineer", "Product Manager", "Data Analyst"];

const formatSalary = (employee: Employee): string =>
  new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: employee.currency,
    maximumFractionDigits: 0
  }).format(employee.salary);

export const EmployeeTable = ({
  employees,
  total,
  page,
  limit,
  filters,
  sort,
  onFiltersChange,
  onPageChange,
  onSortChange,
  onEdit,
  onDelete
}: EmployeeTableProps) => {
  const [draftFilters, setDraftFilters] = useState(filters);

  useEffect(() => {
    setDraftFilters(filters);
  }, [filters]);

  const updateFilters = (patch: Partial<EmployeeFilters>): void => {
    const nextFilters = { ...draftFilters, ...patch };
    setDraftFilters(nextFilters);
    onFiltersChange(nextFilters);
  };

  const handleSort = (sortBy: EmployeeSort["sortBy"]): void => {
    onSortChange({
      sortBy,
      order: sort.sortBy === sortBy && sort.order === "asc" ? "desc" : "asc"
    });
  };

  return (
    <Paper variant="outlined" sx={{ borderRadius: 2, overflow: "hidden" }}>
      <Toolbar sx={{ gap: 2, flexWrap: "wrap", alignItems: "center" }}>
        <Box sx={{ flexGrow: 1, minWidth: 220 }}>
          <Typography variant="h6">Employees</Typography>
          <Typography color="text.secondary" variant="body2">
            {total.toLocaleString()} employees
          </Typography>
        </Box>
        <TextField
          label="Search employees"
          size="small"
          value={draftFilters.search}
          onChange={(event) => updateFilters({ search: event.target.value })}
          sx={{ minWidth: 240 }}
        />
        <FormControl size="small" sx={{ minWidth: 170 }}>
          <InputLabel id="country-filter-label">Country</InputLabel>
          <Select
            native
            labelId="country-filter-label"
            label="Country"
            inputProps={{ "aria-label": "Country" }}
            value={draftFilters.country}
            onChange={(event) => updateFilters({ country: event.target.value })}
          >
            {countries.map((country) => (
              <option key={country || "all"} value={country}>
                {country || "All countries"}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 190 }}>
          <InputLabel id="job-title-filter-label">Job title</InputLabel>
          <Select
            labelId="job-title-filter-label"
            label="Job title"
            value={draftFilters.jobTitle}
            onChange={(event) => updateFilters({ jobTitle: event.target.value })}
          >
            {jobTitles.map((jobTitle) => (
              <MenuItem key={jobTitle || "all"} value={jobTitle}>
                {jobTitle || "All job titles"}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Toolbar>
      <TableContainer>
        <Table size="small" aria-label="Employees">
          <TableHead>
            <TableRow>
              <TableCell>Code</TableCell>
              <TableCell>
                <TableSortLabel active={sort.sortBy === "fullName"} direction={sort.order} onClick={() => handleSort("fullName")}>
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>
                <TableSortLabel active={sort.sortBy === "country"} direction={sort.order} onClick={() => handleSort("country")}>
                  Country
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">
                <TableSortLabel active={sort.sortBy === "salary"} direction={sort.order} onClick={() => handleSort("salary")}>
                  Salary
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow hover key={employee.id}>
                <TableCell>{employee.employeeCode}</TableCell>
                <TableCell>
                  <Typography variant="body2">{employee.fullName}</Typography>
                  <Typography color="text.secondary" variant="caption">
                    {employee.email}
                  </Typography>
                </TableCell>
                <TableCell>{employee.jobTitle}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>{employee.country}</TableCell>
                <TableCell align="right">{formatSalary(employee)}</TableCell>
                <TableCell align="right">
                  <Tooltip title="Edit employee">
                    <IconButton aria-label={`Edit ${employee.fullName}`} size="small" onClick={() => onEdit(employee)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete employee">
                    <IconButton aria-label={`Delete ${employee.fullName}`} size="small" onClick={() => onDelete(employee)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={total}
        page={page - 1}
        rowsPerPage={limit}
        rowsPerPageOptions={[10, 20, 50, 100]}
        onPageChange={(_event, nextPage) => onPageChange(nextPage + 1, limit)}
        onRowsPerPageChange={(event) => onPageChange(1, Number(event.target.value))}
      />
    </Paper>
  );
};
