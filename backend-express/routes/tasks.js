"use strict";

/**
 * Register task routes under /tasks using the controller factory.
 * Keeping route registration in a single file improves organization and testability.
 * @param {import('express').Express} app
 * @param {Function} getTasks - function that returns the tasks array
 */
module.exports = (app, getTasks) => {
  const taskController = require('../controllers/task-controller')(getTasks);
  const { ALLOWED_PRIORITIES } = require('../constants/task');

  // Validate incoming create task requests to keep controllers thin and provide fast feedback.
  function validateCreate(req, res, next) {
    const { title, priority } = req.body;
    if (typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({ error: 'Title is required and must be a non-empty string' });
    }
    if (priority !== undefined && !ALLOWED_PRIORITIES.includes(priority)) {
      return res.status(400).json({ error: `Priority must be one of: ${ALLOWED_PRIORITIES.join(', ')}` });
    }
    return next();
  }

  app.get('/tasks', taskController.getAll);
  app.post('/tasks', validateCreate, taskController.create);
  app.patch('/tasks/:id/complete', taskController.toggleComplete);
  app.delete('/tasks/:id', taskController.delete);
  app.patch('/tasks/:id/title', taskController.updateTitle);
  app.patch('/tasks/:id/category', taskController.updateCategory);
  app.patch('/tasks/:id', taskController.patch);
};
