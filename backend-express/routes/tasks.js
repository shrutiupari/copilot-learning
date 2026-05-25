"use strict";

/**
 * Register task routes under /tasks using the controller factory.
 * Keeping route registration in a single file improves organization and testability.
 * @param {import('express').Express} app
 * @param {Function} getTasks - function that returns the tasks array
 */
module.exports = (app, getTasks) => {
  const taskController = require('../controllers/task-controller')(getTasks);

  app.get('/tasks', taskController.getAll);
  app.post('/tasks', taskController.create);
  app.put('/tasks/:id', taskController.toggleComplete);
  app.delete('/tasks/:id', taskController.delete);
  app.patch('/tasks/:id/title', taskController.updateTitle);
  app.patch('/tasks/:id/category', taskController.updateCategory);
  app.patch('/tasks/:id', taskController.patch);
};
