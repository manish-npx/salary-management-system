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
- SQLite indexes are added for `country`, `jobTitle`, and `salary`; the SQL migration is checked into `backend/prisma/migrations`.
- Seed data is generated deterministically and inserted in batches inside a transaction.

## AI CMD

```bash
You are a senior software craftsperson and TDD-focused engineer.

Your job is to build a COMPLETE production-quality Salary Management System using:

BACKEND:
- Node.js
- Express.js
- TypeScript
- Prisma ORM
- SQLite
- Jest
- Supertest
- Zod validation

FRONTEND:
- React
- Vite
- TypeScript
- React Query (TanStack Query)
- Material UI
- React Hook Form
- Zod
- Vitest
- React Testing Library

====================================================
CORE REQUIREMENTS
====================================================

Build a fully functional salary management tool for an organization with 10,000 employees.

The application must support:

EMPLOYEE MANAGEMENT
- Add employee
- Edit employee
- Delete employee
- View employee
- List employees
- Search employees
- Filter employees
- Pagination
- Sorting

EMPLOYEE FIELDS
Required:
- id
- employeeCode
- fullName
- email
- jobTitle
- department
- country
- salary
- currency
- employmentType
- dateOfJoining
- createdAt
- updatedAt

SALARY INSIGHTS
- Min salary by country
- Max salary by country
- Average salary by country
- Average salary by job title in a country

ADDITIONAL PRODUCT THINKING FEATURES
Also include:
- Median salary
- Total employee count
- Top paid departments
- Salary distribution metrics
- Dashboard summary cards

====================================================
VERY IMPORTANT ENGINEERING RULES
====================================================

This project MUST follow strict TDD and software craftsmanship principles.

FOLLOW REAL RED-GREEN-REFACTOR.

For EVERY feature:
1. Write failing tests first
2. Implement minimal code
3. Refactor cleanly
4. Keep all tests passing

NEVER implement large features in one step.

ALWAYS evolve the code incrementally.

====================================================
GIT + COMMIT + FILE TRACKING RULES
====================================================

IMPORTANT:
Every meaningful step MUST:
1. Add files incrementally
2. Stage files properly
3. Commit immediately
4. Push commits to GitHub

DO NOT wait until the end to commit.

AFTER EVERY FEATURE:
- show all created/updated files
- generate clean git commit message
- run:
  git add .
  git commit -m "<message>"
  git push

Commit history MUST clearly show:
- TDD evolution
- incremental development
- refactors
- architecture improvements

GOOD EXAMPLES:
- test: add employee repository creation tests
- feat: implement employee repository create logic
- refactor: extract salary aggregation helpers
- test: add employee pagination API tests
- feat: implement employee search filters

BAD EXAMPLES:
- fix
- updates
- final changes
- completed task

====================================================
STRICT DEVELOPMENT WORKFLOW
====================================================

For EVERY feature follow EXACTLY:

STEP 1:
Explain briefly what will be built.

STEP 2:
Create tests FIRST.

STEP 3:
Show created test files.

STEP 4:
Implement minimal production code.

STEP 5:
Show created/updated implementation files.

STEP 6:
Refactor cleanly.

STEP 7:
Run tests.

STEP 8:
Generate commit message.

STEP 9:
Commit code.

STEP 10:
Push to GitHub.

Then continue next feature.

====================================================
ARCHITECTURE REQUIREMENTS
====================================================

Use CLEAN LAYERED ARCHITECTURE.

STRICT SEPARATION:

CONTROLLER LAYER
- request/response only
- no business logic

SERVICE LAYER
- business logic only

REPOSITORY LAYER
- prisma/db access only

VALIDATION LAYER
- zod schemas

DO NOT place business logic in controllers.

====================================================
BACKEND REQUIREMENTS
====================================================

Backend folder structure:

backend/
  src/
    config/
    controllers/
    services/
    repositories/
    routes/
    middleware/
    validators/
    utils/
    types/
    tests/
    app.ts
  prisma/
    schema.prisma
    seed.ts

====================================================
FRONTEND REQUIREMENTS
====================================================

Frontend folder structure:

frontend/
  src/
    api/
    components/
    hooks/
    pages/
    layouts/
    utils/
    types/
    tests/
    App.tsx

====================================================
API REQUIREMENTS
====================================================

EMPLOYEE APIs

GET    /api/employees
GET    /api/employees/:id
POST   /api/employees
PUT    /api/employees/:id
DELETE /api/employees/:id

INSIGHT APIs

GET /api/insights/dashboard
GET /api/insights/country
GET /api/insights/job-title

====================================================
QUERY FEATURES
====================================================

Support:
- pagination
- filtering
- search
- sorting

Examples:

/api/employees?page=1&limit=20
/api/employees?country=India
/api/employees?jobTitle=Frontend Engineer
/api/employees?search=john
/api/employees?sortBy=salary&order=desc

====================================================
DATABASE REQUIREMENTS
====================================================

Use SQLite with Prisma.

Add indexes:
- country
- jobTitle
- salary

Use Prisma migrations.

====================================================
SEEDING REQUIREMENTS
====================================================

Create a performant seed script for 10,000 employees.

Requirements:
- batch inserts
- transactions
- realistic salary ranges
- realistic countries
- realistic departments
- combine first_names + last_names

Optimize performance.

DO NOT insert one row at a time.

====================================================
TESTING REQUIREMENTS
====================================================

BACKEND TESTS
Use:
- Jest
- Supertest

Write:
- repository tests
- service tests
- API integration tests

Focus on:
- salary calculations
- filtering
- pagination
- validation
- edge cases

FRONTEND TESTS
Use:
- Vitest
- React Testing Library

Test:
- employee table rendering
- form validation
- filtering behavior
- pagination behavior

====================================================
FRONTEND UI REQUIREMENTS
====================================================

Pages:
1. Dashboard
2. Employees
3. Salary Insights

Dashboard:
- cards
- charts
- metrics

Employees Page:
- searchable table
- filters
- pagination
- sorting
- add/edit modal

Insights Page:
- country salary insights
- job title salary insights
- median salary
- charts

====================================================
IMPORTANT PRODUCT THINKING
====================================================

Build like a real internal HR product.

Focus on:
- usability
- maintainability
- performance
- realistic workflows

Avoid flashy UI.

Prefer clean enterprise UX.

====================================================
PERFORMANCE REQUIREMENTS
====================================================

Must implement:
- server-side pagination
- indexed filtering
- optimized aggregation queries
- batched seed inserts
- debounced search

Avoid loading all 10k rows into browser.

====================================================
ERROR HANDLING
====================================================

Implement centralized error handling.

Consistent API responses:

{
  "success": false,
  "message": "Employee not found"
}

====================================================
README REQUIREMENTS
====================================================

Generate a professional README including:

- architecture decisions
- TDD workflow
- setup instructions
- tradeoffs
- performance considerations
- testing strategy
- AI usage explanation
- future improvements

====================================================
AI USAGE REQUIREMENT
====================================================

Document AI usage professionally.

Mention:
- AI used for scaffolding
- test generation ideas
- refactoring assistance
- architecture brainstorming

But emphasize:
- manual review
- manual validation
- TDD-driven correctness

====================================================
IMPORTANT CODING RULES
====================================================

- Use strict TypeScript
- Avoid any
- Avoid overengineering
- Keep functions small
- Prefer composition
- Keep code readable
- Add meaningful naming
- Add meaningful tests
- Refactor continuously

====================================================
IMPORTANT ANTI-PATTERNS TO AVOID
====================================================

DO NOT:
- use microservices
- add authentication
- use GraphQL
- use Redux unnecessarily
- use Docker orchestration
- overcomplicate architecture

Keep it pragmatic and production quality.

====================================================
FINAL IMPORTANT RULE
====================================================

DO NOT generate the entire application at once.

Work incrementally exactly like a disciplined senior engineer following TDD and clean git practices.

Every feature must:
- start with tests
- include incremental file creation
- include visible git commits
- include git push
- keep the repository history clean and reviewable
```
##GITHUB

```bash 
====================================================
GITHUB REPOSITORY CONFIGURATION
====================================================

Repository Name:
salary-management-system

GitHub Repository URL:
https://github.com/manish-npx/salary-management-system.git

IMPORTANT GIT RULES:
- Initialize git if not initialized
- Connect repository remote correctly
- Always use branch: main
- Push code after every meaningful commit
- Never keep large uncommitted changes
- Keep commit history clean and incremental

INITIAL SETUP COMMANDS:

git init
git branch -M main
git remote add origin https://github.com/manish-npx/salary-management-system.git

IF REMOTE ALREADY EXISTS:
git remote set-url origin https://github.com/manish-npx/salary-management-system.git

FIRST PUSH:
git push -u origin main

====================================================
MANDATORY GIT WORKFLOW
====================================================

After EVERY completed TDD step:

1. Show changed files
2. Run tests
3. Stage files:
   git add .

4. Commit with meaningful message:
   git commit -m "<meaningful-message>"

5. Push immediately:
   git push origin main

====================================================
COMMIT MESSAGE FORMAT
====================================================

Use ONLY professional commit prefixes:

- chore:
- test:
- feat:
- fix:
- refactor:
- docs:

Examples:
- chore: initialize express typescript backend
- test: add employee repository create tests
- feat: implement employee CRUD APIs
- refactor: extract salary insight utilities
- docs: add architecture decisions

====================================================
IMPORTANT
====================================================

The repository history is part of the evaluation.

The git timeline MUST clearly demonstrate:
- TDD evolution
- incremental feature development
- clean refactoring
- engineering discipline
- readable software craftsmanship

Avoid giant commits.

Prefer many small meaningful commits.

====================================================
REPOSITORY STRUCTURE
====================================================

Root Structure:

salary-management-system/
  backend/
  frontend/
  docs/
  README.md

====================================================
DOCUMENTATION REQUIREMENTS
====================================================

Also create:
- docs/architecture.md
- docs/tdd-workflow.md
- docs/tradeoffs.md
- docs/ai-usage.md

Commit documentation incrementally too.
```
See the `docs` folder for details on architecture, TDD workflow, tradeoffs, and AI usage.
