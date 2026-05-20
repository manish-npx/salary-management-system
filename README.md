# Salary Management System

A production-minded internal HR compensation tool for managing 10,000 employees with server-side pagination, indexed filtering, salary analytics, and a clean enterprise React UI.

## Stack

- Backend: Node.js, Express, TypeScript, Prisma ORM, SQLite, Jest, Supertest, Zod
- Frontend: React, Vite, TypeScript, TanStack Query, Material UI, React Hook Form, Zod, Vitest, React Testing Library

## Structure

- `backend` - layered API, Prisma schema, migration, seed workflow, backend tests
- `frontend` - React app, API hooks, pages, components, frontend tests
- `docs` - architecture, TDD workflow, tradeoffs, AI usage

## Setup

```bash
npm install
copy backend\.env.example backend\.env
npm run prisma:migrate -w backend
npm run seed -w backend
npm run dev:backend
npm run dev:frontend
```

Set `VITE_API_BASE_URL=http://localhost:4000` for the frontend when the API runs separately.

## Tests

```bash
npm run test:backend
npm run test:frontend
npm run build
```

The backend includes repository, service, and API integration tests. The frontend covers table rendering, filtering/pagination callbacks, form validation, and API query construction.

## Key Decisions

- Controllers handle HTTP only; services own business behavior; repositories own Prisma access.
- Employee listing is server-side paginated and filtered to avoid loading all 10,000 rows in the browser.
- SQLite indexes are added for `country`, `jobTitle`, and `salary`.
- Seed data is generated deterministically and inserted in batches inside a transaction.

See the `docs` folder for details on architecture, TDD workflow, tradeoffs, and AI usage.
