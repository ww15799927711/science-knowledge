<template>
  <div>
    <h1 class="section-title">⚛️ 知识点分类</h1>
    <p class="section-subtitle">共 {{ categories.length }} 个学科分类</p>
    <div class="grid">
      <router-link
        v-for="cat in categories"
        :key="cat.id"
        :to="'/knowledge/' + cat.id"
        class="card cat-card"
        :style="{ borderLeftColor: cat.color }"
      >
        <div class="cat-icon">{{ cat.icon }}</div>
        <div class="cat-name">{{ cat.name }}</div>
        <div class="cat-desc" v-if="cat.description">{{ cat.description }}</div>
        <div class="cat-count">{{ getCount(cat.id) }} 条</div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { getCategories, getKnowledgeCountByCategory } from '@/utils/data'

const categories = getCategories()
function getCount(catId) { return getKnowledgeCountByCategory(catId) }
</script>

<style scoped>
.cat-card {
  text-decoration: none;
  color: var(--color-text);
  border-left: 4px solid;
  transition: all 0.25s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 120px;
  text-align: center;
  padding: 16px 12px;
}
.cat-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.25);
}
.cat-icon { font-size: 28px; margin-bottom: 8px; }
.cat-name {
  font-weight: 600;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
}
.cat-count { font-size: 12px; color: var(--color-text-secondary); margin-top: 4px; }
.cat-desc {
  font-size: 12px;
  color: var(--color-text-secondary);
  margin-top: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
}
</style>
