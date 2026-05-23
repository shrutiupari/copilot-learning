# Backend (backend-express) instructions

- Scope: backend-express — Node.js + Express API.
- Architecture: follow MVC. Controllers must be thin; delegate business logic to services and data access to models.
- Use async/await and ES6 syntax. Keep functions small and single-purpose.
- Validation & errors: validate inputs, return appropriate HTTP status codes and consistent JSON error shapes.
- Environment: load secrets via require('dotenv').config(); never hardcode secrets or log them.
- Persistence: currently in-memory; when asked, prefer adding a DB layer (e.g., MongoDB) via models.
- Testing: suggest unit tests for services and controllers. Tests should be independent and deterministic.
- Naming: camelCase for variables/functions, lowercase-hyphens for file names, PascalCase for classes.
- Comments: explain "why", not "what". Add JSDoc for public functions and exported module APIs.
- When generating routes: keep handlers thin and call into services; validate inputs at the edges.
