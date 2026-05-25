<script setup>
import { ref, onMounted } from 'vue'
import { createTask, deleteTask, getTasks, toggleTaskComplete } from './services/tasksApi'

const tasks = ref([])
const title = ref('')
const priority = ref('medium')
const isLoading = ref(true)
const isSaving = ref(false)
const error = ref('')

const loadTasks = async () => {
  try {
    error.value = ''
    isLoading.value = true
    tasks.value = await getTasks()
  } catch (err) {
    error.value = err.message
  } finally {
    isLoading.value = false
  }
}

const addTask = async () => {
  if (!title.value.trim()) return

  try {
    error.value = ''
    isSaving.value = true
    await createTask({
      title: title.value,
      priority: priority.value
    })
    title.value = ''
    priority.value = 'medium'
    await loadTasks()
  } catch (err) {
    error.value = err.message
  } finally {
    isSaving.value = false
  }
}

const toggleTask = async (id) => {
  try {
    error.value = ''
    await toggleTaskComplete(id)
    await loadTasks()
  } catch (err) {
    error.value = err.message
  }
}

const removeTask = async (id) => {
  try {
    error.value = ''
    await deleteTask(id)
    await loadTasks()
  } catch (err) {
    error.value = err.message
  }
}

const priorityClass = (value) => {
  const classes = {
    low: 'bg-emerald-100 text-emerald-700 ring-emerald-200',
    medium: 'bg-amber-100 text-amber-700 ring-amber-200',
    high: 'bg-rose-100 text-rose-700 ring-rose-200'
  }

  return classes[value] || classes.medium
}

onMounted(loadTasks)
</script>

<template>
  <div class="min-h-screen bg-slate-50 px-4 py-8 text-slate-900">
    <main class="mx-auto max-w-3xl">
      <header class="mb-8">
        <p class="text-sm font-medium uppercase tracking-wide text-emerald-700">Vue + Express</p>
        <h1 class="mt-2 text-3xl font-semibold">Task Tracker</h1>
      </header>

      <form class="rounded-lg border border-slate-200 bg-white p-4 shadow-sm" @submit.prevent="addTask">
        <div class="grid gap-3 sm:grid-cols-[1fr_150px_auto]">
          <input
            v-model="title"
            class="h-11 rounded-md border border-slate-300 px-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            placeholder="Task title"
          />

          <select
            v-model="priority"
            class="h-11 rounded-md border border-slate-300 px-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <button
            class="h-11 rounded-md bg-emerald-700 px-5 text-sm font-medium text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-slate-300"
            :disabled="!title.trim() || isSaving"
            type="submit"
          >
            {{ isSaving ? 'Adding...' : 'Add' }}
          </button>
        </div>
      </form>

      <div v-if="error" class="mt-4 rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
        {{ error }}
      </div>

      <section class="mt-6 rounded-lg border border-slate-200 bg-white shadow-sm">
        <div class="border-b border-slate-200 px-4 py-3 text-sm font-medium text-slate-600">
          {{ tasks.length }} {{ tasks.length === 1 ? 'task' : 'tasks' }}
        </div>

        <p v-if="isLoading" class="px-4 py-6 text-sm text-slate-500">Loading tasks...</p>
        <p v-else-if="tasks.length === 0" class="px-4 py-6 text-sm text-slate-500">No tasks yet.</p>

        <ul v-else class="divide-y divide-slate-100">
          <li v-for="task in tasks" :key="task.id" class="flex items-center gap-3 px-4 py-3">
            <button
              class="h-5 w-5 rounded border border-slate-300 text-xs font-bold text-emerald-700"
              type="button"
              :aria-label="task.completed ? 'Mark task incomplete' : 'Mark task complete'"
              @click="toggleTask(task.id)"
            >
              {{ task.completed ? 'x' : '' }}
            </button>

            <span class="flex-1 text-sm" :class="{ 'text-slate-400 line-through': task.completed }">
              {{ task.title }}
            </span>

            <span class="rounded-full px-2 py-1 text-xs font-medium ring-1" :class="priorityClass(task.priority)">
              {{ task.priority }}
            </span>

            <button
              class="rounded-md px-2 py-1 text-sm text-slate-500 transition hover:bg-slate-100 hover:text-rose-700"
              type="button"
              @click="removeTask(task.id)"
            >
              Delete
            </button>
          </li>
        </ul>
      </section>
    </main>
  </div>
</template>
