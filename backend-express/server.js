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
  const task = {
    id: Date.now(),
    title: req.body.title,
    completed: false
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

app.listen(5000, () => {
  console.log('Server running on port 5000');
});