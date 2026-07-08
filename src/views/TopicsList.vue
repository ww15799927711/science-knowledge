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
        <div class="sub-img-wrap">
          <img v-if="sub.image" :src="sub.image" :alt="sub.name" class="sub-img" loading="lazy" />
          <div class="sub-icon-wrap" :style="{ '--icon-color': sub.color }">
            <span class="sub-icon">{{ sub.icon }}</span>
          </div>
        </div>
        <div class="sub-name">{{ sub.name }}</div>
        <div class="sub-desc">{{ sub.description }}</div>
        <div class="sub-count">{{ getCount(sub.name) }} 条</div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getTopicSubcategories, getAllTopics } from '@/utils/data'

const subcategories = getTopicSubcategories()
const allTopics = ref([])

function getCount(name) {
  return allTopics.value.filter(t => t.subcategory === name).length
}

async function loadData() {
  allTopics.value = await getAllTopics()
}

onMounted(() => {
  loadData()
})
</script>

<style scoped>
.sub-card {
  text-decoration: none;
  color: var(--color-text);
  text-align: center;
  display: flex;
  flex-direction: column;
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
.sub-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: rgba(16, 185, 129, 0.3);
}
.sub-img-wrap {
  position: relative;
  width: 100%;
  height: 110px;
  overflow: hidden;
}
.sub-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform var(--transition-base);
}
.sub-card:hover .sub-img {
  transform: scale(1.05);
}
.sub-icon-wrap {
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
.sub-card:hover .sub-icon-wrap {
  background: color-mix(in srgb, var(--icon-color) 50%, transparent);
  transform: scale(1.1);
}
.sub-icon { font-size: calc(1.125rem * var(--font-scale)); }
.sub-name {
  font-weight: 600;
  font-size: calc(0.875rem * var(--font-scale));
  padding: 20px 12px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
}
.sub-desc {
  font-size: calc(0.6875rem * var(--font-scale));
  color: var(--color-text-secondary);
  padding: 4px 12px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
}
.sub-count {
  font-size: calc(0.75rem * var(--font-scale));
  color: var(--color-text-hint);
  padding: 0 12px 14px;
}
</style>