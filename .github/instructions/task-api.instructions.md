---
applyTo: "backend-express/**/*.js"
---

# Task API Instructions

- Keep task data access behind `services/task-service.js` until a real persistence layer is requested.
- Use `crypto.randomUUID()` for new task IDs.
- Keep allowed task priorities centralized in `constants/task.js`.
- Validate request payloads at the route boundary when possible, and validate service inputs again when the service can be called directly.
- Use `PATCH /tasks/:id/complete` for toggling completion.
- Return `400` for invalid input, `404` for missing tasks, and `500` only for unexpected failures.
- Preserve the in-memory store behavior unless the user asks for a database.
