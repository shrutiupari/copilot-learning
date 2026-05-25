"use strict";

const taskService = require('../services/task-service');

function asyncHandler(handler) {
  return async (req, res) => {
    try {
      return await handler(req, res);
    } catch (err) {
      if (err && err.status) {
        return res.status(err.status).json({ error: err.message });
      }
      console.error(err);
      return res.status(500).json({ error: 'Server error' });
    }
  };
}

/**
 * Factory that returns controller methods.
 * getTasks is a function returning the current tasks array.
 */
module.exports = (getTasks) => {
  return {
    getAll: asyncHandler(async (req, res) => {
      const all = await taskService.getAll(getTasks());
      return res.json(all);
    }),

    create: asyncHandler(async (req, res) => {
      const { title, priority } = req.body;
      const created = await taskService.createTask(getTasks(), title, priority);
      return res.status(201).json(created);
    }),

    toggleComplete: asyncHandler(async (req, res) => {
      const updated = await taskService.toggleComplete(getTasks(), req.params.id);
      return res.json(updated);
    }),

    delete: asyncHandler(async (req, res) => {
      await taskService.deleteTask(getTasks(), req.params.id);
      return res.json({ success: true });
    }),

    patch: asyncHandler(async (req, res) => {
      const updated = await taskService.patchTask(getTasks(), req.params.id, req.body);
      return res.json(updated);
    }),

    updateTitle: asyncHandler(async (req, res) => {
      const { title } = req.body;
      const updated = await taskService.updateTitle(getTasks(), req.params.id, title);
      return res.json(updated);
    }),

    updateCategory: asyncHandler(async (req, res) => {
      const { category } = req.body;
      const updated = await taskService.updateCategory(getTasks(), req.params.id, category);
      return res.json(updated);
    })
  };
};
