# Architecture

## Backend

The backend uses clean layered architecture:

- Controllers: translate HTTP requests and responses only.
- Services: hold business rules such as not-found behavior and salary insight calculations.
- Repositories: isolate Prisma queries and database access.
- Validators: define Zod schemas for request bodies, query strings, and route params.
- Middleware: centralizes validation, async error handling, and API error responses.

Employee list queries support pagination, filters, search, and sorting. Salary insight queries use Prisma aggregation where practical and service-level helpers for median and distribution calculations.

## Frontend

The frontend separates:

- API helpers: typed fetch boundaries and URL construction.
- Hooks: TanStack Query cache and mutation orchestration.
- Components: reusable table and form controls.
- Pages: product workflows for dashboard, employees, and salary insights.
- Layout: app navigation and shell.

The browser never loads all employees. The Employees page sends page, limit, filter, search, and sorting state to the backend.
