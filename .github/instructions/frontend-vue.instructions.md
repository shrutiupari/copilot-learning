# Frontend (frontend-vue) instructions

- Scope: frontend-vue — Vue 3 + Vite.
- Use the Composition API and script setup. Prefer composables for shared logic.
- Keep single-file components (.vue) small and focused; separate template, script, and style concerns.
- Async logic: use async/await in setup functions or composables; keep side-effects out of templates.
- File naming: files lowercase-hyphens; component names PascalCase when registered/imported.
- Reusability: extract reusable UI/logic into composables and base components.
- Tests: recommend unit tests for components and composables; tests should be isolated.
- Accessibility & responsive design should be applied by default.
- Comments: explain the reason for complex logic; provide JSDoc for composables and public functions.
- When generating components: prefer prop-driven components and emit events (defineEmits) rather than global state.
