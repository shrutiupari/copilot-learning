const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

async function request(path, options) {
  const res = await fetch(`${API_BASE_URL}${path}`, options);
  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.error || 'Request failed');
  }

  return data;
}

export function getTasks() {
  return request('/tasks');
}

export function createTask(task) {
  return request('/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(task)
  });
}

export function toggleTaskComplete(id) {
  return request(`/tasks/${id}/complete`, {
    method: 'PATCH'
  });
}

export function deleteTask(id) {
  return request(`/tasks/${id}`, {
    method: 'DELETE'
  });
}
