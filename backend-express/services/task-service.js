"use strict";

const ALLOWED_PRIORITIES = ['low', 'medium', 'high'];

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
    id: Date.now(),
    title: title.trim(),
    completed: false,
    priority: priority && ALLOWED_PRIORITIES.includes(priority) ? priority : 'medium'
  };

  tasks.push(task);
  return task;
}

async function toggleComplete(tasks, id) {
  if (Number.isNaN(id)) {
    const e = new Error('Invalid task id');
    e.status = 400;
    throw e;
  }

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
  if (Number.isNaN(id)) {
    const e = new Error('Invalid task id');
    e.status = 400;
    throw e;
  }

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
  if (Number.isNaN(id)) {
    const e = new Error('Invalid task id');
    e.status = 400;
    throw e;
  }

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

module.exports = { getAll, createTask, toggleComplete, deleteTask, patchTask, updateTitle };
