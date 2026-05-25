---
description: Use when creating Express API routes
---

# Create Express API Route

Requirements:
- Use async/await
- Add error handling
- Return proper status codes
- Keep route handlers thin
- Delegate business logic to `services/task-service.js`
- Use the `{ error: "message" }` JSON error shape
- Add comments only when the reason is not obvious

Input:
- Route name
- HTTP method
- Request body
- Expected success status code
- Validation rules
