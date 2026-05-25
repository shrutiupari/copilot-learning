"use strict";

const taskService = require('../services/task-service');

/**
 * Factory that returns controller methods.
 * getTasks is a function returning the current tasks array.
 */
module.exports = (getTasks) => {
  return {
    getAll: async (req, res) => {
      try {
        const tasks = getTasks();
        const all = await taskService.getAll(tasks);
        return res.json(all);
      } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
      }
    },

    create: async (req, res) => {
      try {
        const tasks = getTasks();
        const { title, priority } = req.body;
        const created = await taskService.createTask(tasks, title, priority);
        return res.status(201).json(created);
      } catch (err) {
        if (err && err.status) {
          return res.status(err.status).json({ error: err.message });
        }
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
      }
    },

    toggleComplete: async (req, res) => {
      try {
        const tasks = getTasks();
        const id = Number(req.params.id);
        const updated = await taskService.toggleComplete(tasks, id);
        return res.json(updated);
      } catch (err) {
        if (err && err.status) {
          return res.status(err.status).json({ error: err.message });
        }
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
      }
    },

    delete: async (req, res) => {
      try {
        const tasks = getTasks();
        const id = Number(req.params.id);
        await taskService.deleteTask(tasks, id);
        return res.json({ success: true });
      } catch (err) {
        if (err && err.status) {
          return res.status(err.status).json({ error: err.message });
        }
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
      }
    },

    patch: async (req, res) => {
      try {
        const tasks = getTasks();
        const id = Number(req.params.id);
        const fields = req.body;
        const updated = await taskService.patchTask(tasks, id, fields);
        return res.json(updated);
      } catch (err) {
        if (err && err.status) {
          return res.status(err.status).json({ error: err.message });
        }
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
      }
    },

    updateTitle: async (req, res) => {
      try {
        const tasks = getTasks();
        const id = Number(req.params.id);
        const { title } = req.body;
        const updated = await taskService.updateTitle(tasks, id, title);
        return res.json(updated);
      } catch (err) {
        if (err && err.status) {
          return res.status(err.status).json({ error: err.message });
        }
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
      }
    },

    updateCategory: async (req, res) => {
      try {
        const tasks = getTasks();
        const id = Number(req.params.id);
        const { category } = req.body;
        const updated = await taskService.updateCategory(tasks, id, category);
        return res.json(updated);
      } catch (err) {
        if (err && err.status) {
          return res.status(err.status).json({ error: err.message });
        }
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
      }
    }
  };
};
