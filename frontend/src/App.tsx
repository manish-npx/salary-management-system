import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { EmployeeTable } from "./components/employees/EmployeeTable";
import type { Employee } from "./types/employee";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#2457a6" },
    background: { default: "#f7f8fa" }
  },
  shape: { borderRadius: 8 },
  typography: {
    fontFamily: "Inter, Roboto, Arial, sans-serif"
  }
});

const sampleEmployees: Employee[] = [];

export const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <EmployeeTable
      employees={sampleEmployees}
      total={0}
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
  </ThemeProvider>
);
