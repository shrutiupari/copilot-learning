"use strict";

const { randomUUID } = require('crypto');
const { ALLOWED_PRIORITIES } = require('../constants/task');

function validateId(id) {
  if (typeof id !== 'string' || !id.trim()) {
    const e = new Error('Invalid task id');
    e.status = 400;
    throw e;
  }
}

async function getAll(tasks) {
  return tasks;
}

async function createTask(tasks, title, priority) {
  if (typeof title !== 'string' || !title.trim()) {
    const e = new Error('Title is required');
    e.status = 400;
    throw e;
  }
  if (priority !== undefined && !ALLOWED_PRIORITIES.includes(priority)) {
    const e = new Error('Priority must be one of: low, medium, high');
    e.status = 400;
    throw e;
  }

  const task = {
    id: randomUUID(),
    title: title.trim(),
    completed: false,
    priority: priority && ALLOWED_PRIORITIES.includes(priority) ? priority : 'medium'
  };

  tasks.push(task);
  return task;
}

async function toggleComplete(tasks, id) {
  validateId(id);

  const task = tasks.find(t => t.id === id);
  if (!task) {
    const e = new Error('Task not found');
    e.status = 404;
    throw e;
  }

  task.completed = !task.completed;
  return task;
}

async function deleteTask(tasks, id) {
  validateId(id);

  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) {
    const e = new Error('Task not found');
    e.status = 404;
    throw e;
  }

  tasks.splice(index, 1);
  return true;
}

async function patchTask(tasks, id, fields) {
  validateId(id);

  const { title, completed, priority } = fields;

  if (title !== undefined && (typeof title !== 'string' || !title.trim())) {
    const e = new Error('Title, if provided, must be a non-empty string');
    e.status = 400;
    throw e;
  }
  if (completed !== undefined && typeof completed !== 'boolean') {
    const e = new Error('Completed, if provided, must be boolean');
    e.status = 400;
    throw e;
  }
  if (priority !== undefined && !ALLOWED_PRIORITIES.includes(priority)) {
    const e = new Error('Priority, if provided, must be one of low, medium, high');
    e.status = 400;
    throw e;
  }

  const task = tasks.find(t => t.id === id);
  if (!task) {
    const e = new Error('Task not found');
    e.status = 404;
    throw e;
  }

  if (title !== undefined) task.title = title.trim();
  if (completed !== undefined) task.completed = completed;
  if (priority !== undefined) task.priority = priority;

  return task;
}

async function updateTitle(tasks, id, title) {
  // Reuse validation from patchTask for the title field
  return patchTask(tasks, id, { title });
}

async function updateCategory(tasks, id, category) {
  validateId(id);
  if (typeof category !== 'string' || !category.trim()) {
    const e = new Error('Category must be a non-empty string');
    e.status = 400;
    throw e;
  }
  const task = tasks.find(t => t.id === id);
  if (!task) {
    const e = new Error('Task not found');
    e.status = 404;
    throw e;
  }
  task.category = category.trim();
  return task;
}

module.exports = { getAll, createTask, toggleComplete, deleteTask, patchTask, updateTitle, updateCategory };
