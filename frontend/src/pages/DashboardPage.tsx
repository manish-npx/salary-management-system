import { Box, CircularProgress, Grid, Paper, Stack, Typography } from "@mui/material";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useDashboardInsights } from "../hooks/useInsights";
import { formatCompactNumber, formatCurrency } from "../utils/formatters";

export const DashboardPage = () => {
  const { data, isLoading } = useDashboardInsights();
  const dashboard = data?.data;

  if (isLoading) {
    return <CircularProgress aria-label="Loading dashboard" />;
  }

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h4">Dashboard</Typography>
        <Typography color="text.secondary">Organization-wide compensation overview</Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
            <Typography color="text.secondary" variant="body2">Total employees</Typography>
            <Typography variant="h4">{formatCompactNumber(dashboard?.totalEmployeeCount ?? 0)}</Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
            <Typography color="text.secondary" variant="body2">Median salary</Typography>
            <Typography variant="h4">{formatCurrency(dashboard?.medianSalary ?? 0)}</Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
            <Typography color="text.secondary" variant="body2">Countries</Typography>
            <Typography variant="h4">{dashboard?.countryInsights.length ?? 0}</Typography>
          </Paper>
        </Grid>
      </Grid>
      <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, height: 340 }}>
        <Typography sx={{ mb: 2 }} variant="h6">Salary distribution</Typography>
        <ResponsiveContainer height="85%" width="100%">
          <BarChart data={dashboard?.salaryDistribution ?? []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#2457a6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    </Stack>
  );
};
