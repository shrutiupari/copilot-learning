# Copilot Learning Project

A simple full-stack Task Tracker application built to practically explore and learn GitHub Copilot customization features in a real development workflow.

This project was created mainly for hands-on experimentation with:

- GitHub Copilot Instructions
- Prompt Files
- Skills
- Agents

instead of only reading documentation or watching tutorials.

---

# Tech Stack

## Backend
- Node.js
- Express

## Frontend
- React (Vite)
- Vue (Vite)

---

# Project Structure

```bash
copilot-learning/
│
├── backend-express/
├── frontend-react/
├── frontend-vue/
│
└── .github/
    ├── instructions/
    ├── prompts/
    └── skills/
```

---

# Features

- Add task
- List tasks
- Mark task as completed
- Delete task

The application itself is intentionally small so the focus stays on learning AI-assisted workflows.

---

# Why This Project?

The goal of this repository is not to build a production-grade task manager.

It is mainly to understand how modern AI-assisted development workflows work using GitHub Copilot features inside a real repository.

This helped me experiment with:

- Repository-wide coding standards
- Reusable prompt workflows
- Teaching AI repository context
- Multi-file autonomous changes using agents
- AI-assisted feature generation/refactoring

---

# GitHub Copilot Features Explored

## Instructions

Used for defining global project conventions and coding rules.

Examples:
- Prefer async/await
- Use reusable components
- Follow Express best practices
- Suggest tests where applicable

Location:
```bash
.github/instructions/
```

---

## Prompt Files

Used reusable prompts for generating APIs, routes, and components consistently.

Examples:
- Generate Express routes
- Create frontend components
- Add validation/error handling

Location:
```bash
.github/prompts/
```

---

## Skills

Used to teach Copilot about:
- Existing APIs
- Project structure
- Frontend/backend behavior
- Repository conventions

This improved contextual suggestions significantly.

Location:
```bash
.github/skills/
```

---

## Agents

Used Copilot Agent mode for:
- Feature additions
- Refactoring
- Updating multiple files together
- Maintaining consistency across frontend/backend

Examples tried:
- Adding new task fields
- Updating API flow
- UI modifications
- Refactoring repetitive logic

---

# Running the Project

## Backend

```bash
cd backend-express
npm install
npm run dev
```

Runs on:
```bash
http://localhost:5000
```

---

## React Frontend

```bash
cd frontend-react
npm install
npm run dev
```

---

## Vue Frontend

```bash
cd frontend-vue
npm install
npm run dev
```

---

# What I Learned

- Difference between Instructions vs Prompts vs Skills
- How repository context improves AI suggestions
- How Agents help with multi-step implementation
- Practical AI-assisted development workflow
- Structuring repositories for better Copilot understanding

---

# Future Improvements

Possible extensions:
- MongoDB integration
- Authentication
- TypeScript migration
- Testing setup
- State management
- Docker setup

---

# Purpose of This Repository

This repository is mainly a learning sandbox for experimenting with AI-assisted development workflows using GitHub Copilot features in a practical way.

The focus is on understanding how these tools work together in real projects rather than building a fully featured application.
