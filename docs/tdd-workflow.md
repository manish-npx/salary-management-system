# TDD Workflow

This project was developed in small red-green-refactor steps.

Representative sequence:

1. Repository tests described create, read, list, filter, sort, update, and delete behavior.
2. Minimal Prisma repository code made those tests pass.
3. Service tests described salary calculations and dashboard metrics.
4. Service and repository insight code made those tests pass.
5. Supertest API tests drove controllers, routes, validation, and error middleware.
6. Frontend React Testing Library tests drove table rendering, filtering behavior, form validation, and API query construction.

Each completed slice was committed and pushed with a professional commit prefix.
