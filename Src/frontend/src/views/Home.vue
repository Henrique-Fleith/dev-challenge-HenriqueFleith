<template>
  <div>
    <input
      v-model="query"
      @keyup.enter="handleSearch"
      placeholder="Digite para buscar"
    />
    <button @click="handleSearch">Buscar</button>

    <div v-if="Object.keys(groupedResults).length">
      <div v-for="(items, type) in groupedResults" :key="type">
        <h2>{{ type }} ({{ items.length }})</h2>

        <ul>
          <li v-for="(item, index) in items" :key="index">
            <pre>{{ item }}</pre>
          </li>
        </ul>

        <hr />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import axios from 'axios'

const query = ref('')
const results = ref([])

const groupedResults = computed(() => {
  const groups = {}

  results.value.forEach(item => {
    if (!groups[item.type]) {
      groups[item.type] = []
    }
    groups[item.type].push(item.data)
  })

  return groups
})

async function handleSearch() {
  if (!query.value) return

  try {
    const response = await axios.get('http://localhost:3000/search', {
      params: { q: query.value }
    })

    results.value = response.data.results
  } catch (error) {
    console.error(error)
  }
}
</script>