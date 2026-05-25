---
applyTo: "backend-express/test/**/*.js"
---

# Testing Instructions

- Use Node's built-in `assert` module unless the repo intentionally adds a test framework.
- Keep tests deterministic and independent.
- Test service behavior directly for validation, mutation, and not-found cases.
- Prefer clear test sections with one behavior per assertion group.
- Run backend tests with `npm test` from `backend-express`.
