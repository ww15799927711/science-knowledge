<template>
  <div class="ref-section" v-if="items.length > 0">
    <h3 class="section-title">{{ title }}</h3>
    <router-link
      v-for="item in items"
      :key="item.id"
      :to="getRoute(item.id)"
      class="ref-item"
    >
      <span class="ref-type">{{ getTypeLabel(type) }}</span>
      <span class="ref-title">{{ item.title }}</span>
      <span class="ref-arrow">→</span>
    </router-link>
  </div>
</template>

<script setup>
import { getRouteForItem, getTypeLabel } from '@/utils/cross-ref'

const props = defineProps({
  title: String,
  type: String,
  items: { type: Array, default: () => [] }
})

function getRoute(id) {
  return getRouteForItem(props.type, id)
}
</script>
