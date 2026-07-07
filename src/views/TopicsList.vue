<template>
  <div class="page-enter">
    <h1 class="section-title">💡 轻松话题</h1>
    <p class="section-subtitle">生活中的科学谜题</p>
    <div class="grid">
      <router-link
        v-for="sub in subcategories"
        :key="sub.id"
        :to="'/topics/' + sub.id"
        class="sub-card"
      >
        <div class="sub-icon-wrap" :style="{ '--icon-color': sub.color }">
          <span class="sub-icon">{{ sub.icon }}</span>
        </div>
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 150px;
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
.sub-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: rgba(16, 185, 129, 0.3);
}
.sub-icon-wrap {
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
.sub-card:hover .sub-icon-wrap {
  background: color-mix(in srgb, var(--icon-color) 50%, transparent);
  transform: scale(1.1);
}
.sub-icon { font-size: 22px; }
.sub-name {
  font-weight: 600;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
}
.sub-desc {
  font-size: 11px;
  color: var(--color-text-secondary);
  margin-top: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
}
.sub-count {
  font-size: 12px;
  color: var(--color-text-hint);
  margin-top: 4px;
}
</style>
