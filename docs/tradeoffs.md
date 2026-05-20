# Tradeoffs

## SQLite

SQLite keeps setup simple and is appropriate for this assignment. For a larger multi-user production deployment, PostgreSQL would be a natural upgrade for concurrency, richer analytics, and operational tooling.

## Salary Distribution

Distribution buckets are intentionally simple and global. A future version could use currency-normalized ranges or country-specific salary bands.

## Median Salary

Median calculation reads sorted salaries. This is acceptable for 10,000 rows. For larger datasets, a database-specific percentile query or materialized summary table would be preferable.

## Frontend Bundle

Material UI and Recharts produce a larger initial bundle. The current build is pragmatic; future work should code-split Dashboard and Insights chart pages.

## Authentication

Authentication and authorization are intentionally out of scope per requirements. A real HR product would require role-based access control and audit trails.
