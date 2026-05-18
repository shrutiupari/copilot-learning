const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

let tasks = [];

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const { title, priority } = req.body;
  const allowedPriorities = ['low', 'medium', 'high'];

  if (typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({ error: 'Title is required' });
  }

  if (priority !== undefined && !allowedPriorities.includes(priority)) {
    return res.status(400).json({ error: 'Priority must be one of: low, medium, high' });
  }

  const task = {
    id: Date.now(),
    title: title.trim(),
    completed: false,
    priority: priority && allowedPriorities.includes(priority) ? priority : 'medium'
  };

  tasks.push(task);

  res.status(201).json(task);
});

app.put('/tasks/:id', (req, res) => {
  tasks = tasks.map(task =>
    task.id == req.params.id
      ? { ...task, completed: !task.completed }
      : task
  );

  res.json({ success: true });
});

app.delete('/tasks/:id', (req, res) => {
  tasks = tasks.filter(task => task.id != req.params.id);

  res.json({ success: true });
});

// API route: update a task's title
// Expects { title: string } in request body
app.patch('/tasks/:id/title', async (req, res) => {
  const id = Number(req.params.id);
  const { title } = req.body;

  if (typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const task = tasks.find(t => t.id === id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  task.title = title.trim();

  res.json(task);
});

// API route: partial update a task
// Expects any of { title?: string, completed?: boolean, priority?: 'low'|'medium'|'high' } in request body
app.patch('/tasks/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid task id' });
    const { title, completed, priority } = req.body;
    const allowedPriorities = ['low', 'medium', 'high'];

    if (title !== undefined && (typeof title !== 'string' || !title.trim())) {
      return res.status(400).json({ error: 'Title, if provided, must be a non-empty string' });
    }
    if (completed !== undefined && typeof completed !== 'boolean') {
      return res.status(400).json({ error: 'Completed, if provided, must be boolean' });
    }
    if (priority !== undefined && !allowedPriorities.includes(priority)) {
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

app.listen(5000, () => {
  console.log('Server running on port 5000');
});