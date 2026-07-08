<template>
  <div>
    <h1 class="section-title">🔍 搜索</h1>
    <div class="search-bar">
      <span class="search-icon">🔍</span>
      <input v-model="keyword" placeholder="搜索智慧结晶、话题、历史事件..." @input="debouncedSearch" />
    </div>
    <div v-if="searched">
      <div v-if="results.knowledge.length > 0">
        <h2 class="section-subtitle" style="margin-top: 16px;">智慧结晶 ({{ results.knowledge.length }})</h2>
        <div class="list">
          <router-link
            v-for="r in results.knowledge"
            :key="'k' + r.item.kpId"
            :to="'/knowledge/' + r.item.category + '/' + r.item.kpId"
            class="list-item"
          >
            <div class="list-item-content">
              <div class="list-item-title">{{ r.item.title }}</div>
              <div class="list-item-desc">{{ r.item.summary }}</div>
            </div>
          </router-link>
        </div>
      </div>
      <div v-if="results.topics.length > 0">
        <h2 class="section-subtitle" style="margin-top: 16px;">话题 ({{ results.topics.length }})</h2>
        <div class="list">
          <router-link
            v-for="r in results.topics"
            :key="'t' + r.item.topicId"
            :to="'/topics/' + r.item.subcategory + '/' + r.item.topicId"
            class="list-item"
          >
            <div class="list-item-content">
              <div class="list-item-title">{{ r.item.title }}</div>
              <div class="list-item-desc">{{ r.item.summary }}</div>
            </div>
          </router-link>
        </div>
      </div>
      <div v-if="results.history.length > 0">
        <h2 class="section-subtitle" style="margin-top: 16px;">科学简史 ({{ results.history.length }})</h2>
        <div class="list">
          <router-link
            v-for="r in results.history"
            :key="'h' + r.item.entryId"
            :to="'/history/' + r.item.period + '/' + r.item.entryId"
            class="list-item"
          >
            <div class="list-item-content">
              <div class="list-item-title">{{ r.item.title }}</div>
              <div class="list-item-desc">{{ r.item.summary }}</div>
            </div>
          </router-link>
        </div>
      </div>
      <div v-if="results.knowledge.length === 0 && results.topics.length === 0 && results.history.length === 0" class="empty-state">
        <div class="empty-icon">🔍</div>
        <div class="empty-tip">没有找到相关内容</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onUnmounted } from 'vue'
import { searchAll } from '@/utils/search'

const keyword = ref('')
const searched = ref(false)
const results = reactive({ knowledge: [], topics: [], history: [] })
let searchTimer = null

function doSearch() {
  if (!keyword.value.trim()) {
    searched.value = false
    results.knowledge = []
    results.topics = []
    results.history = []
    return
  }
  searched.value = true
  const r = searchAll(keyword.value)
  results.knowledge = r.knowledge
  results.topics = r.topics
  results.history = r.history
}

function debouncedSearch() {
  if (searchTimer) clearTimeout(searchTimer)
  searchTimer = setTimeout(doSearch, 300)
}

onUnmounted(() => {
  if (searchTimer) clearTimeout(searchTimer)
})
</script>

<style scoped>
.list { display: flex; flex-direction: column; gap: 1px; background: var(--color-divider); border-radius: var(--radius-card); overflow: hidden; }
.list-item { text-decoration: none; color: var(--color-text); border-bottom: none; }
</style>
