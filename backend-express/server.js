const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env (don't hardcode secrets)

const app = express();

app.use(cors());
app.use(express.json());

// In-memory task store for demo purposes. Replace with a DB in future.
let tasks = [];
const taskController = require('./controllers/task-controller')(() => tasks);

const ALLOWED_PRIORITIES = ['low', 'medium', 'high'];

/**
 * GET /tasks
 * Returns the list of tasks. Delegates to controller.
 */
app.get('/tasks', taskController.getAll);

/**
 * POST /tasks
 * Create a task. Delegates to controller.
 */
app.post('/tasks', taskController.create);

/**
 * PUT /tasks/:id
 * Toggle completed state for the task. Delegates to controller.
 */
app.put('/tasks/:id', taskController.toggleComplete);

/**
 * DELETE /tasks/:id
 * Remove a task by id. Delegates to controller.
 */
app.delete('/tasks/:id', taskController.delete);

/**
 * PATCH /tasks/:id/title
 * Thin route that delegates title update to controller following MVC.
 */
app.patch('/tasks/:id/title', taskController.updateTitle);


/**
 * PATCH /tasks/:id/category
 * Update the category for a task. Delegates to controller.
 */
app.patch('/tasks/:id/category', taskController.updateCategory);


/**
 * PATCH /tasks/:id
 * Partial update. Delegates to controller.
 */
app.patch('/tasks/:id', taskController.patch);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});