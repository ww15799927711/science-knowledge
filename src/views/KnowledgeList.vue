<template>
  <div class="page-enter">
    <Breadcrumb
      sectionName="知识点分类"
      sectionLink="/knowledge"
      :title="categoryName"
    />
    <p class="section-subtitle">共 {{ items.length }} 个知识点</p>
    <div class="list">
      <router-link
        v-for="item in visibleItems"
        :key="item.kpId"
        :to="'/knowledge/' + category + '/' + item.kpId"
        class="list-item"
      >
        <span class="list-item-id">#{{ item.kpId }}</span>
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
import { getKnowledgeByCategory, getCategories } from '@/utils/data'
import Breadcrumb from '@/components/Breadcrumb.vue'

const route = useRoute()
const category = computed(() => route.params.category)
const categoryName = computed(() => {
  const cat = getCategories().find(c => c.id === category.value)
  return cat ? cat.name : '全部知识点'
})
const items = computed(() => getKnowledgeByCategory(category.value))
const visibleCount = ref(10)
const visibleItems = computed(() => items.value.slice(0, visibleCount.value))
</script>

<style scoped>
.list { display: flex; flex-direction: column; gap: 1px; background: var(--color-divider); border-radius: var(--radius-card); overflow: hidden; }
.list-item {
  text-decoration: none;
  color: var(--color-text);
  border-bottom: none;
  background: var(--color-card-glass);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}
.load-more-wrap { display: flex; justify-content: center; margin-top: 16px; }
</style>
