<template>
  <div class="container">
    <img
      src="/logo_multisearch.png"
      alt="MultiSearch"
      class="logo"
    />

    <div class="search-box">
      <input
        v-model="query"
        @keyup.enter="handleSearch"
        placeholder="Buscar..."
      />
      <button @click="handleSearch">🔍</button>
    </div>

    <p v-if="totalResults">
      Foram encontrados {{ totalResults }} resultados:
    </p>

    <div
      v-for="(items, type) in groupedResults"
      :key="type"
      class="card"
    >
      <div class="card-header">
        <strong>{{ typeLabels[type] }}</strong>
        <span>({{ items.length }} itens encontrados)</span>
      </div>

      <div v-if="items.length">
        <div
          v-for="(item, index) in items"
          :key="`${type}-${index}`"
          class="item-wrapper"
        >
          <div
            class="item-row"
            :class="{ expandable: hasDetails(item, type) }"
          >
            <div class="left">
              <span class="item-id">
                #{{ getId(item) }}
              </span>

              <span class="item-name">
                {{ getName(item) }}
              </span>
            </div>

            <div class="right">
              <span v-if="item.Quantity">
                Qtd: {{ item.Quantity }} pç
              </span>
            </div>
          </div>

          <!-- detalhes que expandem -->
          <div
            class="details"
            v-if="hasDetails(item, type)"
          >
            <!-- venda -->
            <div v-if="type === 'salesOrder'" class="details-grid">
              <div><strong>Entrega:</strong> {{ item.DeliveryDate }}</div>
              <div><strong>Cliente:</strong> {{ item.Customer }}</div>
              <div><strong>Material:</strong> {{ item.MaterialName }} ({{ item.MaterialID }})</div>
              <div><strong>Quantidade:</strong> {{ item.Quantity }}</div>
              <div><strong>Valor total:</strong> R$ {{ item.TotalValue }}</div>
            </div>

            <!-- compra -->
            <div v-else-if="type === 'purchaseOrder'" class="details-grid">
              <div><strong>Entrega:</strong> {{ item.DeliveryDate }}</div>
              <div><strong>Fornecedor:</strong> {{ item.Supplier }}</div>
              <div><strong>Material:</strong> {{ item.MaterialName }} ({{ item.MaterialID }})</div>
              <div><strong>Quantidade:</strong> {{ item.Quantity }}</div>
              <div><strong>Custo total:</strong> R$ {{ item.TotalCost }}</div>
            </div>

            <!-- mão de obra -->
            <div v-else-if="type === 'workforce'" class="details-grid">
              <div><strong>Turno:</strong> {{ item.Shift }}</div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="empty">
        nenhum item encontrado
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import axios from 'axios'

const query = ref('')
const results = ref<Array<any>>([])

const typeLabels: Record<string, string> = {
  salesOrder: 'Pedidos de Venda',
  purchaseOrder: 'Pedidos de Compra',
  material: 'Produtos',
  equipment: 'Equipamentos',
  workforce: 'Mão de obra'
}

// campos mínimos por tipo
const minimalKeys: Record<string, string[]> = {
  salesOrder: ['SalesOrderID'],
  purchaseOrder: ['PurchaseOrderID'],
  material: ['MaterialID', 'MaterialName'],
  equipment: ['EquipmentID', 'EquipmentName'],
  workforce: ['WorkforceID', 'Name']
}

// agrupa os resultados
const groupedResults = computed(() => {
  const groups: Record<string, any[]> = {}
  Object.keys(typeLabels).forEach(type => groups[type] = [])
  results.value.forEach(item => {
    if (groups[item.type]) groups[item.type].push(item.data)
  })
  return groups
})

const totalResults = computed(() => results.value.length)

// pega id dinâmico
function getId(item: any) {
  return item.SalesOrderID ??
         item.PurchaseOrderID ??
         item.MaterialID ??
         item.EquipmentID ??
         item.WorkforceID ?? ''
}

// pega nome dinâmico
function getName(item: any) {
  return item.MaterialName ??
         item.EquipmentName ??
         item.Name ??
         ''
}

function hasDetails(item: any, type: string) {
  const keys = Object.keys(item)
  const minimal = minimalKeys[type] ?? []
  return keys.some(k => !minimal.includes(k))
}

// faz a busca
async function handleSearch() {
  if (!query.value.trim()) return
  const response = await axios.get('http://localhost:3000/search', {
    params: { q: query.value }
  })
  results.value = response.data.results
}
</script>

<style scoped>
.container {
  max-width: 700px;
  margin: 60px auto;
  font-family: Arial, sans-serif;
}

.logo {
  display: block;
  margin: 0 auto 20px auto;
  max-width: 220px;
}

.search-box {
  display: flex;
  margin-bottom: 20px;
}

.search-box input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
}

.search-box button {
  padding: 10px 14px;
  border: 1px solid #ccc;
  background: white;
  cursor: pointer;
}

.card {
  border: 1px solid #ddd;
  border-radius: 6px;
  margin-bottom: 20px;
  background: #f9f9f9;
}

.card-header {
  display: flex;
  justify-content: space-between;
  padding: 12px;
  background: #fff;
  border-bottom: 1px solid #eee;
}

.item-wrapper {
  padding: 8px 12px;
}

.item-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: white;
  border: 1px solid #eee;
  border-radius: 4px;
  transition: background 180ms ease;
}

/* hover só muda cor */
.item-row:hover {
  background: #f2f6ff;
}

.left {
  display: flex;
  gap: 12px;
  align-items: center;
}

.item-id {
  color: #c62828;
  font-weight: 600;
  min-width: 80px;
}

.details {
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transition: max-height 220ms ease, opacity 220ms ease, margin-top 220ms ease;
  margin-top: 0;
}

.item-wrapper:hover .details {
  max-height: 300px;
  opacity: 1;
  margin-top: 8px;
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 6px 12px;
  padding: 10px;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 4px;
}

.empty {
  padding: 12px;
  color: #888;
}
</style>