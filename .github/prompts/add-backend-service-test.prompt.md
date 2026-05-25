---
description: Use when adding backend service tests for task behavior
---

# Add Backend Service Test

Add focused tests for `backend-express/services/task-service.js`.

Requirements:
- Use Node's built-in `assert` module.
- Keep each test independent and deterministic.
- Cover success and failure paths.
- Test invalid input, missing task IDs, and expected mutations when relevant.
- Keep test output readable.
- Run `npm test` from `backend-express`.

Input:
- Service function name
- Success behavior
- Failure behavior
- Expected error status code
