---
applyTo: "frontend-react/src/services/**/*.js,frontend-vue/src/services/**/*.js"
---

# Frontend API Service Instructions

- Keep backend requests in service modules, not directly inside UI components.
- Read the base URL from `import.meta.env.VITE_API_URL`, falling back to `http://localhost:5000`.
- Parse JSON responses defensively and surface backend error messages when available.
- Export small functions named around user intent, such as `getTasks`, `createTask`, `toggleTaskComplete`, and `deleteTask`.
- Keep the React and Vue service APIs aligned so UI behavior can stay parallel.
