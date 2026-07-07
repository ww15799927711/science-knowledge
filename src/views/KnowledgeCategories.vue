<template>
  <div class="page-enter">
    <h1 class="section-title">⚛️ 知识点分类</h1>
    <p class="section-subtitle">共 {{ categories.length }} 个学科分类</p>
    <div class="grid">
      <router-link
        v-for="cat in categories"
        :key="cat.id"
        :to="'/knowledge/' + cat.id"
        class="cat-card"
      >
        <div class="cat-icon-wrap" :style="{ '--icon-color': cat.color }">
          <span class="cat-icon">{{ cat.icon }}</span>
        </div>
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 140px;
  text-align: center;
  padding: 20px 12px;
  background: var(--color-card);
  background: var(--color-card-glass);
  backdrop-filter: blur(16px) saturate(1.2);
  -webkit-backdrop-filter: blur(16px) saturate(1.2);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: var(--radius-card);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-base);
}
.cat-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: rgba(59, 130, 246, 0.3);
}
.cat-icon-wrap {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: color-mix(in srgb, var(--icon-color) 13%, transparent);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  transition: background var(--transition-fast), transform var(--transition-base);
}
.cat-card:hover .cat-icon-wrap {
  background: color-mix(in srgb, var(--icon-color) 50%, transparent);
  transform: scale(1.1);
}
.cat-icon { font-size: 22px; }
.cat-name {
  font-weight: 600;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
}
.cat-count {
  font-size: 12px;
  color: var(--color-text-hint);
  margin-top: 4px;
}
.cat-desc {
  font-size: 11px;
  color: var(--color-text-secondary);
  margin-top: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
}
</style>
