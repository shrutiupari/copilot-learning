# Task API Skill

## Backend API

GET /tasks
Returns all tasks

POST /tasks
Creates a task

PUT /tasks/:id
Legacy route. Prefer PATCH /tasks/:id/complete.

PATCH /tasks/:id/complete
Toggles completion

DELETE /tasks/:id
Deletes task

## Frontend Behavior

After every mutation:
- Reload tasks
- Reset form input
