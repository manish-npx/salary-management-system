import GroupsIcon from "@mui/icons-material/Groups";
import InsightsIcon from "@mui/icons-material/Insights";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import { AppBar, Box, Button, Container, Stack, Toolbar, Typography } from "@mui/material";
import type { ReactNode } from "react";

export type AppView = "dashboard" | "employees" | "insights";

type AppLayoutProps = {
  activeView: AppView;
  onViewChange: (view: AppView) => void;
  children: ReactNode;
};

const navItems: Array<{ view: AppView; label: string; icon: ReactNode }> = [
  { view: "dashboard", label: "Dashboard", icon: <SpaceDashboardIcon fontSize="small" /> },
  { view: "employees", label: "Employees", icon: <GroupsIcon fontSize="small" /> },
  { view: "insights", label: "Salary Insights", icon: <InsightsIcon fontSize="small" /> }
];

export const AppLayout = ({ activeView, onViewChange, children }: AppLayoutProps) => (
  <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
    <AppBar color="inherit" elevation={0} position="sticky" sx={{ borderBottom: "1px solid", borderColor: "divider" }}>
      <Toolbar sx={{ gap: 3 }}>
        <Typography component="h1" sx={{ flexGrow: 1, fontWeight: 700 }} variant="h6">
          Salary Management
        </Typography>
        <Stack direction="row" spacing={1}>
          {navItems.map((item) => (
            <Button
              key={item.view}
              color={activeView === item.view ? "primary" : "inherit"}
              onClick={() => onViewChange(item.view)}
              startIcon={item.icon}
              variant={activeView === item.view ? "contained" : "text"}
            >
              {item.label}
            </Button>
          ))}
        </Stack>
      </Toolbar>
    </AppBar>
    <Container maxWidth="xl" sx={{ py: 3 }}>
      {children}
    </Container>
  </Box>
);
