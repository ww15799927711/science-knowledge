<template>
  <div class="page-enter">
    <h1 class="section-title">⚛️ 智慧结晶分类</h1>
    <p class="section-subtitle">共 {{ categories.length }} 个学科分类</p>
    <div class="grid">
      <router-link
        v-for="cat in categories"
        :key="cat.id"
        :to="'/knowledge/' + cat.id"
        class="cat-card"
      >
        <div class="cat-img-wrap">
          <img v-if="cat.image" :src="cat.image" :alt="cat.name" class="cat-img" loading="lazy" />
          <div class="cat-icon-wrap" :style="{ '--icon-color': cat.color }">
            <span class="cat-icon">{{ cat.icon }}</span>
          </div>
        </div>
        <div class="cat-name">{{ cat.name }}</div>
        <div class="cat-desc" v-if="cat.description">{{ cat.description }}</div>
        <div class="cat-count">{{ getCount(cat.id) }} 条</div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getCategories, getKnowledgeCountByCategory } from '@/utils/data'

const categories = getCategories()
const counts = ref({})

onMounted(async () => {
  const results = await Promise.all(
    categories.map(async cat => {
      const count = await getKnowledgeCountByCategory(cat.id)
      return [cat.id, count]
    })
  )
  counts.value = Object.fromEntries(results)
})

function getCount(catId) { return counts.value[catId] ?? '...' }
</script>

<style scoped>
.cat-card {
  text-decoration: none;
  color: var(--color-text);
  display: flex;
  flex-direction: column;
  text-align: center;
  background: var(--color-card);
  background: var(--color-card-glass);
  backdrop-filter: blur(16px) saturate(1.2);
  -webkit-backdrop-filter: blur(16px) saturate(1.2);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: var(--radius-card);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-base);
  overflow: hidden;
}
.cat-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: rgba(59, 130, 246, 0.3);
}
.cat-img-wrap {
  position: relative;
  width: 100%;
  height: 110px;
  overflow: hidden;
}
.cat-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform var(--transition-base);
}
.cat-card:hover .cat-img {
  transform: scale(1.05);
}
.cat-icon-wrap {
  position: absolute;
  bottom: 8px;
  left: 10px;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: color-mix(in srgb, var(--icon-color) 13%, transparent);
  border: 2px solid rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background var(--transition-fast), transform var(--transition-base);
  z-index: 1;
}
.cat-card:hover .cat-icon-wrap {
  background: color-mix(in srgb, var(--icon-color) 50%, transparent);
  transform: scale(1.1);
}
.cat-icon { font-size: calc(1.125rem * var(--font-scale)); }
.cat-name {
  font-weight: 600;
  font-size: calc(0.875rem * var(--font-scale));
  padding: 20px 12px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
}
.cat-count {
  font-size: calc(0.75rem * var(--font-scale));
  color: var(--color-text-hint);
  padding: 0 12px 14px;
}
.cat-desc {
  font-size: calc(0.6875rem * var(--font-scale));
  color: var(--color-text-secondary);
  padding: 4px 12px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
}
</style>
