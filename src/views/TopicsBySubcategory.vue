<template>
  <div class="page-enter">
    <Breadcrumb
      sectionName="轻松话题"
      sectionLink="/topics"
      :title="subName"
    />
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
    <div v-if="visibleCount < items.length" class="load-more-wrap">
      <button class="btn btn-outline" @click="visibleCount += 10">
        加载更多 (还有 {{ items.length - visibleCount }} 条)
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getTopicsBySubcategory, getTopicSubcategories } from '@/utils/data'
import Breadcrumb from '@/components/Breadcrumb.vue'

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
.list { display: flex; flex-direction: column; gap: 1px; background: var(--color-divider); border-radius: var(--radius-card); overflow: hidden; }
.list-item {
  text-decoration: none;
  color: var(--color-text);
  border-bottom: none;
  background: var(--color-card);
  background: var(--color-card-glass);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}
.load-more-wrap { display: flex; justify-content: center; margin-top: 16px; }
</style>
