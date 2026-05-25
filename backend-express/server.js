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

// Register task routes grouped in routes/tasks.js
require('./routes/tasks')(app, () => tasks);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});