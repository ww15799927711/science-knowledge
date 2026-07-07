<template>
  <div>
    <h1 class="section-title">💡 轻松话题</h1>
    <p class="section-subtitle">生活中的科学谜题</p>
    <div class="grid">
      <router-link
        v-for="sub in subcategories"
        :key="sub.id"
        :to="'/topics/' + sub.id"
        class="card sub-card"
      >
        <div class="sub-icon">{{ sub.icon }}</div>
        <div class="sub-name">{{ sub.name }}</div>
        <div class="sub-desc">{{ sub.description }}</div>
        <div class="sub-count">{{ getCount(sub.name) }} 条</div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { getTopicSubcategories, getAllTopics } from '@/utils/data'

const subcategories = getTopicSubcategories()
function getCount(name) {
  return getAllTopics().filter(t => t.subcategory === name).length
}
</script>

<style scoped>
.sub-card {
  text-decoration: none;
  color: var(--color-text);
  text-align: center;
  transition: all 0.25s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 140px;
  padding: 16px 12px;
}
.sub-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.25);
}
.sub-icon { font-size: 28px; margin-bottom: 8px; }
.sub-name {
  font-weight: 600;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
}
.sub-desc {
  font-size: 12px;
  color: var(--color-text-secondary);
  margin-top: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
}
.sub-count { font-size: 12px; color: var(--color-text-hint); margin-top: 4px; }
</style>
