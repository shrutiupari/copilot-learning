const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env (don't hardcode secrets)

const app = express();

app.use(cors());
app.use(express.json());

// In-memory task store for demo purposes. Replace with a DB in future.
let tasks = [];

const ALLOWED_PRIORITIES = ['low', 'medium', 'high'];

/**
 * GET /tasks
 * Returns the list of tasks.
 * Kept simple: controllers are thin and can delegate to services later.
 */
app.get('/tasks', async (req, res) => {
  try {
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * POST /tasks
 * Create a task. Body: { title: string, priority?: 'low'|'medium'|'high' }
 */
app.post('/tasks', async (req, res) => {
  try {
    const { title, priority } = req.body;

    if (typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({ error: 'Title is required' });
    }

    if (priority !== undefined && !ALLOWED_PRIORITIES.includes(priority)) {
      return res.status(400).json({ error: 'Priority must be one of: low, medium, high' });
    }

    const task = {
      id: Date.now(),
      title: title.trim(),
      completed: false,
      priority: priority && ALLOWED_PRIORITIES.includes(priority) ? priority : 'medium'
    };

    tasks.push(task);

    res.status(201).json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * PUT /tasks/:id
 * Toggle completed state for the task. Returns updated task or 404.
 */
app.put('/tasks/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid task id' });

    const task = tasks.find(t => t.id === id);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    task.completed = !task.completed;
    return res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * DELETE /tasks/:id
 * Remove a task by id.
 */
app.delete('/tasks/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid task id' });

    const before = tasks.length;
    tasks = tasks.filter(task => task.id !== id);

    if (tasks.length === before) return res.status(404).json({ error: 'Task not found' });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * PATCH /tasks/:id/title
 * Convenience route to update only the title. Prefer using PATCH /tasks/:id for multiple fields.
 */
app.patch('/tasks/:id/title', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { title } = req.body;

    if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid task id' });
    if (typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const task = tasks.find(t => t.id === id);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    task.title = title.trim();
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * PATCH /tasks/:id
 * Partial update. Accepts { title?, completed?, priority? }.
 */
app.patch('/tasks/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid task id' });

    const { title, completed, priority } = req.body;

    if (title !== undefined && (typeof title !== 'string' || !title.trim())) {
      return res.status(400).json({ error: 'Title, if provided, must be a non-empty string' });
    }
    if (completed !== undefined && typeof completed !== 'boolean') {
      return res.status(400).json({ error: 'Completed, if provided, must be boolean' });
    }
    if (priority !== undefined && !ALLOWED_PRIORITIES.includes(priority)) {
      return res.status(400).json({ error: 'Priority, if provided, must be one of low, medium, high' });
    }

    const task = tasks.find(t => t.id === id);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    if (title !== undefined) task.title = title.trim();
    if (completed !== undefined) task.completed = completed;
    if (priority !== undefined) task.priority = priority;

    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});