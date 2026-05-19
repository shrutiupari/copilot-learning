import { useEffect, useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('medium');

  /**
   * Load tasks from backend.
   * Kept here for simplicity; consider moving to a dedicated service module.
   */
  const loadTasks = async () => {
    try {
      const base = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await fetch(`${base}/tasks`);
      if (!res.ok) throw new Error('Failed to load tasks');
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  /**
   * Create a new task with selected priority.
   */
  const addTask = async () => {
    try {
      const base = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await fetch(`${base}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, priority })
      });

      if (!res.ok) {
        console.error('Failed to create task');
        return;
      }

      setTitle('');
      setPriority('medium');
      await loadTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const badgeStyle = (p) => ({
    display: 'inline-block',
    padding: '2px 8px',
    borderRadius: 12,
    color: '#fff',
    fontSize: 12,
    marginLeft: 8,
    backgroundColor: p === 'high' ? '#e74c3c' : p === 'medium' ? '#f39c12' : '#2ecc71'
  });

  return (
    <div style={{ padding: 20 }}>
      <h1>React Task App</h1>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
      />

      <select value={priority} onChange={(e) => setPriority(e.target.value)} style={{ marginLeft: 8 }}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button onClick={addTask} style={{ marginLeft: 8 }}>
        Add
      </button>

      <ul>
        {tasks.map(task => (
          <li key={task.id} style={{ marginTop: 8 }}>
            {task.title}
            {task.priority && <span style={badgeStyle(task.priority)}>{task.priority}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;