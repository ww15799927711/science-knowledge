<template>
  <div class="page-enter">
    <Breadcrumb
      sectionName="科学简史"
      sectionLink="/history"
      :title="periodName"
    />
    <p class="section-subtitle">共 {{ items.length }} 个事件</p>
    <div class="timeline">
      <div v-for="item in visibleItems" :key="item.entryId" class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <router-link
            :to="'/history/' + period + '/' + item.entryId"
            class="timeline-card"
          >
            <div class="timeline-meta">{{ item.year }} · {{ item.figures }}</div>
            <div class="list-item-title">{{ item.title }}</div>
            <div class="list-item-desc">{{ item.summary }}</div>
          </router-link>
        </div>
      </div>
    </div>
    <div v-if="visibleCount < items.length" class="load-more-wrap">
      <button class="btn btn-outline" @click="visibleCount += 10">
        加载更多 (还有 {{ items.length - visibleCount }} 条)
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getHistoryByPeriod, getHistoryPeriods } from '@/utils/data'
import Breadcrumb from '@/components/Breadcrumb.vue'

const route = useRoute()
const period = computed(() => route.params.period)
const periodName = computed(() => {
  const p = getHistoryPeriods().find(p => p.id === period.value)
  return p ? p.name : '全部时期'
})
const items = ref([])
const visibleCount = ref(10)
const visibleItems = computed(() => items.value.slice(0, visibleCount.value))

async function loadData() {
  const data = await getHistoryByPeriod(period.value)
  items.value = data.sort((a, b) => a.yearSort - b.yearSort)
}

onMounted(() => {
  loadData()
})
</script>

<style scoped>
.timeline { position: relative; padding-left: 24px; }
.timeline::before {
  content: '';
  position: absolute;
  left: 6px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--color-border);
}
.timeline-item { position: relative; margin-bottom: 12px; }
.timeline-dot {
  position: absolute;
  left: -21px;
  top: 18px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-light);
}
.timeline-content { margin-left: 8px; }
.timeline-card {
  text-decoration: none;
  color: var(--color-text);
  background: var(--color-card);
  background: var(--color-card-glass);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: var(--radius-card);
  box-shadow: var(--shadow-sm);
  padding: 14px 16px;
  display: block;
  transition: all var(--transition-base);
}
.timeline-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}
.timeline-meta {
  font-size: calc(0.75rem * var(--font-scale));
  color: var(--color-text-hint);
  margin-bottom: 4px;
}
.load-more-wrap { display: flex; justify-content: center; margin-top: 16px; }
</style>