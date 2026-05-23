const assert = require('assert');
const service = require('../services/task-service');

(async () => {
  console.log('Running task-service tests...');

  // create
  let tasks = [];
  const t = await service.createTask(tasks, 'Test title', 'high');
  assert.strictEqual(t.title, 'Test title');
  assert.strictEqual(tasks.length, 1);

  // getAll
  const all = await service.getAll(tasks);
  assert.strictEqual(all.length, 1);

  // toggleComplete
  const toggled = await service.toggleComplete(tasks, t.id);
  assert.strictEqual(toggled.completed, true);

  // patchTask
  const patched = await service.patchTask(tasks, t.id, { title: 'New', completed: false });
  assert.strictEqual(patched.title, 'New');
  assert.strictEqual(patched.completed, false);

  // updateTitle
  const updated = await service.updateTitle(tasks, t.id, 'Updated Title');
  assert.strictEqual(updated.title, 'Updated Title');

  // delete
  await service.deleteTask(tasks, t.id);
  assert.strictEqual(tasks.length, 0);

  console.log('task-service tests passed.');
})().catch(err => {
  console.error('task-service tests failed:', err);
  process.exit(1);
});
