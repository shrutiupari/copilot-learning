# JavaScript Project Instructions

## Coding Standards
- Use async/await
- Use ES6 syntax
- Keep functions small
- Add comments for API routes

## Coding Organization
- Use MVC pattern for backend
- Use component-based architecture for frontend
- Separate concerns in code structure: route handle HTTP requests, service layer for business logic, and data access layer for database interactions, models handle data access and validation, and controllers handle the logic for processing requests and responses.
- Kepp route handlers thin and delegate to services for business logic

## Backend
- Use Express best practices
- Separate routes and services later

## Frontend
- Keep components reusable
- Prefer functional React components
- Use Composition API in Vue

## Testing
- Suggest unit tests when generating code
- Write test cases for all services and routes
- Each test should be independent and test a single functionality
- Name test as question: `it('should return 200 when user is authenticated', () => { ... })`

## Comments and Documentation
- Add comments only for "why" not "what". Code should be self-explanatory for "what"
- Comment complex logic, business rules, and non-obvious decisions
- Add JSDoc comments for all public functions and classes, including parameters and return types 
- Keep comments up to date with code changes

## Dependencies
- Use npm or yarn for package management
- Pin exact versions of dependencies in package.json to avoid unexpected issues from updates without lock files
- Keep dependencies minimal. Avoid bloating the project with unnecessary libraries. Only add dependencies that are essential for the functionality of the project.

## Environment & Secrets
- Store all secrets in .env file and never hardcode them in the codebase
- Load with `reuire('dotenv').config()`
- Add .env to .gitignore to prevent accidental commits of secrets
- Never log secrets or sensitive information in console logs or error messages.

## Naming Conventions
- Use camelCase for variables and functions
- Files: lowercase with hyphens (e.g. user-service.js)
- Constants: UPPER_SNAKE_CASE
- Classes: PascalCase