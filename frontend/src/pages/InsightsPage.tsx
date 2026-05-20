import { Box, CircularProgress, FormControl, InputLabel, MenuItem, Paper, Select, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useCountryInsights, useJobTitleInsights } from "../hooks/useInsights";
import { formatCurrency } from "../utils/formatters";

export const InsightsPage = () => {
  const [country, setCountry] = useState("");
  const countryQuery = useCountryInsights();
  const jobTitleQuery = useJobTitleInsights(country);
  const countries = countryQuery.data?.data.map((item) => item.country) ?? [];

  if (countryQuery.isLoading || jobTitleQuery.isLoading) {
    return <CircularProgress aria-label="Loading insights" />;
  }

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h4">Salary Insights</Typography>
        <Typography color="text.secondary">Country and role-level salary benchmarks</Typography>
      </Box>
      <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, height: 360 }}>
        <Typography sx={{ mb: 2 }} variant="h6">Average salary by country</Typography>
        <ResponsiveContainer height="85%" width="100%">
          <BarChart data={countryQuery.data?.data ?? []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="country" />
            <YAxis tickFormatter={formatCurrency} />
            <Tooltip formatter={(value) => formatCurrency(Number(value))} />
            <Bar dataKey="averageSalary" fill="#2f7d62" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
      <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, height: 360 }}>
        <FormControl size="small" sx={{ mb: 2, minWidth: 220 }}>
          <InputLabel id="insight-country-label">Country</InputLabel>
          <Select labelId="insight-country-label" label="Country" value={country} onChange={(event) => setCountry(event.target.value)}>
            <MenuItem value="">All countries</MenuItem>
            {countries.map((item) => (
              <MenuItem key={item} value={item}>{item}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <ResponsiveContainer height="78%" width="100%">
          <BarChart data={jobTitleQuery.data?.data ?? []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="jobTitle" />
            <YAxis tickFormatter={formatCurrency} />
            <Tooltip formatter={(value) => formatCurrency(Number(value))} />
            <Bar dataKey="averageSalary" fill="#7b5e2e" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    </Stack>
  );
};
