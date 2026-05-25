import { useEffect, useState } from 'react';
import { createTask, deleteTask, getTasks, toggleTaskComplete } from './services/tasksApi';

const priorityClasses = {
  low: 'bg-emerald-100 text-emerald-700 ring-emerald-200',
  medium: 'bg-amber-100 text-amber-700 ring-amber-200',
  high: 'bg-rose-100 text-rose-700 ring-rose-200'
};

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('medium');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const loadTasks = async () => {
    try {
      setError('');
      setIsLoading(true);
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!title.trim()) return;

    try {
      setError('');
      setIsSaving(true);
      await createTask({ title, priority });
      setTitle('');
      setPriority('medium');
      await loadTasks();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggle = async (id) => {
    try {
      setError('');
      await toggleTaskComplete(id);
      await loadTasks();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      setError('');
      await deleteTask(id);
      await loadTasks();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900">
      <main className="mx-auto max-w-3xl">
        <header className="mb-8">
          <p className="text-sm font-medium uppercase tracking-wide text-sky-700">React + Express</p>
          <h1 className="mt-2 text-3xl font-semibold">Task Tracker</h1>
        </header>

        <form className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm" onSubmit={handleSubmit}>
          <div className="grid gap-3 sm:grid-cols-[1fr_150px_auto]">
            <input
              className="h-11 rounded-md border border-slate-300 px-3 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task title"
            />

            <select
              className="h-11 rounded-md border border-slate-300 px-3 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            <button
              className="h-11 rounded-md bg-sky-700 px-5 text-sm font-medium text-white transition hover:bg-sky-800 disabled:cursor-not-allowed disabled:bg-slate-300"
              disabled={!title.trim() || isSaving}
              type="submit"
            >
              {isSaving ? 'Adding...' : 'Add'}
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-4 rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        )}

        <section className="mt-6 rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-4 py-3 text-sm font-medium text-slate-600">
            {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
          </div>

          {isLoading ? (
            <p className="px-4 py-6 text-sm text-slate-500">Loading tasks...</p>
          ) : tasks.length === 0 ? (
            <p className="px-4 py-6 text-sm text-slate-500">No tasks yet.</p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {tasks.map((task) => (
                <li key={task.id} className="flex items-center gap-3 px-4 py-3">
                  <button
                    className="h-5 w-5 rounded border border-slate-300 text-xs font-bold text-sky-700"
                    onClick={() => handleToggle(task.id)}
                    type="button"
                    aria-label={task.completed ? 'Mark task incomplete' : 'Mark task complete'}
                  >
                    {task.completed ? 'x' : ''}
                  </button>
                  <span className={`flex-1 text-sm ${task.completed ? 'text-slate-400 line-through' : ''}`}>
                    {task.title}
                  </span>
                  <span className={`rounded-full px-2 py-1 text-xs font-medium ring-1 ${priorityClasses[task.priority]}`}>
                    {task.priority}
                  </span>
                  <button
                    className="rounded-md px-2 py-1 text-sm text-slate-500 transition hover:bg-slate-100 hover:text-rose-700"
                    onClick={() => handleDelete(task.id)}
                    type="button"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
