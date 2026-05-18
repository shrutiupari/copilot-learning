<script setup>
import { ref, onMounted } from 'vue'

const tasks = ref([])
const title = ref('')

const loadTasks = async () => {
  const res = await fetch('http://localhost:5000/tasks')
  tasks.value = await res.json()
}

const addTask = async () => {
  await fetch('http://localhost:5000/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: title.value
    })
  })

  title.value = ''
  loadTasks()
}

onMounted(loadTasks)
</script>

<template>
  <div style="padding:20px">
    <h1>Vue Task App</h1>

    <input v-model="title" />

    <button @click="addTask">
      Add
    </button>

    <ul>
      <li v-for="task in tasks" :key="task.id">
        {{ task.title }}
      </li>
    </ul>
  </div>
</template>