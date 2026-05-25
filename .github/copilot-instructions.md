# Copilot Repository Instructions

This repository is a learning sandbox for GitHub Copilot customization. Keep changes small, readable, and easy to explain.

## Project Shape

- `backend-express` is a Node.js + Express API.
- `frontend-react` is a React + Vite task tracker UI.
- `frontend-vue` is a Vue 3 + Vite task tracker UI.
- `.github/instructions`, `.github/prompts`, and `.github/skills` are part of the learning goal and should stay useful, current, and concise.

## General Rules

- Prefer small, focused changes over broad refactors.
- Keep React and Vue behavior aligned when adding user-facing task features.
- Keep backend route handlers thin. Put business logic in services.
- Keep API responses JSON-based and errors shaped as `{ "error": "message" }`.
- Do not add a database unless the task explicitly asks for persistence.
- Do not hardcode secrets or environment-specific values.
- Update tests or add focused tests when changing backend service behavior.

## Commands

Run these from the matching project folder:

- Backend tests: `npm test`
- Backend dev server: `npm run dev`
- React dev server: `npm run dev`
- React build: `npm run build`
- Vue dev server: `npm run dev`
- Vue build: `npm run build`

## UI Guidance

- Tailwind CSS is the shared styling approach for both frontend apps.
- Use compact, accessible form controls and clear loading/error/empty states.
- Avoid returning to Vite starter UI patterns or unused demo components.
- Prefer service modules for API calls instead of inline `fetch` logic in components.
