import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { AppLayout } from "./layouts/AppLayout";
import type { AppView } from "./layouts/AppLayout";
import { DashboardPage } from "./pages/DashboardPage";
import { EmployeesPage } from "./pages/EmployeesPage";
import { InsightsPage } from "./pages/InsightsPage";

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

const queryClient = new QueryClient();

export const App = () => {
  const [activeView, setActiveView] = useState<AppView>("dashboard");

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppLayout activeView={activeView} onViewChange={setActiveView}>
          {activeView === "dashboard" ? <DashboardPage /> : null}
          {activeView === "employees" ? <EmployeesPage /> : null}
          {activeView === "insights" ? <InsightsPage /> : null}
        </AppLayout>
      </ThemeProvider>
    </QueryClientProvider>
  );
};
