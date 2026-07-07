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
  transition: transform 0.2s;
}
.sub-card:hover { transform: translateY(-2px); }
.sub-icon { font-size: 28px; margin-bottom: 8px; }
.sub-name { font-weight: 600; font-size: 15px; }
.sub-desc { font-size: 12px; color: var(--color-text-secondary); margin-top: 4px; }
.sub-count { font-size: 12px; color: var(--color-text-hint); margin-top: 4px; }
</style>
