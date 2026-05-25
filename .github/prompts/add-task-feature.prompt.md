---
description: Use when adding or changing a task tracker feature across backend, React, and Vue
---

# Add Task Feature

Implement the requested task feature across the full stack.

Checklist:
- Update the Express route only if the API surface changes.
- Keep controller methods thin and put business rules in `services/task-service.js`.
- Add or update service tests in `backend-express/test`.
- Update `frontend-react/src/services/tasksApi.js` and `frontend-vue/src/services/tasksApi.js` when the API changes.
- Keep React and Vue user-facing behavior aligned.
- Preserve loading, error, and empty states.
- Run `npm test` in `backend-express`.
- Run `npm run build` in both frontend folders when UI code changes.

Input:
- Feature description
- Expected API behavior
- Expected UI behavior
- Validation or error cases
