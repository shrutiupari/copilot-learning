---
applyTo: "frontend-react/src/**/*.{js,jsx,css}"
---

# Frontend (frontend-react) instructions

- Scope: frontend-react — React 18 + Vite.
- Use functional components and hooks. Prefer composition over inheritance.
- Use Tailwind CSS for UI styling.
- Keep components small and reusable; separate presentational and container logic.
- Async logic: use async/await and keep network code in a service layer (api/ services).
- File & component naming: files lowercase-hyphens, component filenames PascalCase and default-exported.
- ESLint: follow the existing ESLint configuration in package.json and plugins.
- Accessibility & responsiveness: add accessible attributes and responsive CSS by default.
- Tests: recommend unit tests for components and services. Each test must be independent.
- Comments: comment "why" for non-obvious decisions; add PropTypes or TypeScript types when practical.
- When scaffolding UI: prefer small focused components and reuse existing components across React and Vue apps where possible.
