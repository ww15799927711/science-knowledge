<template>
  <div>
    <div style="margin-bottom: 16px;">
      <router-link to="/topics" class="back-link">← 返回话题分类</router-link>
    </div>
    <h1 class="section-title">{{ subName }}</h1>
    <p class="section-subtitle">共 {{ items.length }} 个话题</p>
    <div class="list">
      <router-link
        v-for="item in visibleItems"
        :key="item.topicId"
        :to="'/topics/' + subcategory + '/' + item.topicId"
        class="list-item"
      >
        <span class="list-item-id">#{{ item.topicId }}</span>
        <div class="list-item-content">
          <div class="list-item-title">{{ item.title }}</div>
          <div class="list-item-desc">{{ item.summary }}</div>
        </div>
      </router-link>
    </div>
    <div v-if="visibleItems.length < items.length" class="load-more-wrap">
      <button class="btn btn-outline load-more-btn" @click="visibleCount += 10">加载更多 ({{ items.length - visibleItems.length }} 条)</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { getTopicsBySubcategory, getTopicSubcategories } from '@/utils/data'

const route = useRoute()
const subcategory = computed(() => route.params.subcategory)
const subName = computed(() => {
  const sub = getTopicSubcategories().find(s => s.id === subcategory.value)
  return sub ? sub.name : '全部话题'
})
const items = computed(() => getTopicsBySubcategory(subcategory.value))
const visibleCount = ref(10)
const visibleItems = computed(() => items.value.slice(0, visibleCount.value))
</script>

<style scoped>
.back-link { color: var(--color-primary); font-size: 14px; text-decoration: none; }
.list { display: flex; flex-direction: column; gap: 1px; background: var(--color-divider); border-radius: var(--radius-card); overflow: hidden; }
.list-item { text-decoration: none; color: var(--color-text); border-bottom: none; }
.load-more-wrap { text-align: center; margin-top: 16px; }
.load-more-btn { min-width: 180px; }
</style>
