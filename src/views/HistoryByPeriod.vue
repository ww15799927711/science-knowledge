<template>
  <div>
    <div style="margin-bottom: 16px;">
      <router-link to="/history" class="back-link">← 返回时期</router-link>
    </div>
    <h1 class="section-title">{{ periodName }}</h1>
    <p class="section-subtitle">共 {{ items.length }} 个事件</p>
    <div class="timeline">
      <div v-for="item in visibleItems" :key="item.entryId" class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <router-link
            :to="'/history/' + period + '/' + item.entryId"
            class="list-item"
            style="border-radius: var(--radius-card);"
          >
            <div class="list-item-content">
              <div style="font-size: 12px; color: var(--color-text-hint); margin-bottom: 4px;">{{ item.year }} · {{ item.figures }}</div>
              <div class="list-item-title">{{ item.title }}</div>
              <div class="list-item-desc">{{ item.summary }}</div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <div v-if="visibleItems.length < items.length" class="load-more-wrap">
      <button class="btn btn-outline load-more-btn" @click="visibleCount += 10">加载更多 ({{ items.length - visibleItems.length }} 条)</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { getHistoryByPeriod, getHistoryPeriods } from '@/utils/data'

const route = useRoute()
const period = computed(() => route.params.period)
const periodName = computed(() => {
  const p = getHistoryPeriods().find(p => p.id === period.value)
  return p ? p.name : '全部时期'
})
const items = computed(() => getHistoryByPeriod(period.value).sort((a, b) => a.yearSort - b.yearSort))
const visibleCount = ref(10)
const visibleItems = computed(() => items.value.slice(0, visibleCount.value))
</script>

<style scoped>
.back-link { color: var(--color-primary); font-size: 14px; text-decoration: none; }
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
}
.timeline-content { margin-left: 8px; }
.list-item { text-decoration: none; color: var(--color-text); background: var(--color-card); box-shadow: var(--shadow-card); padding: 14px 16px; }
.load-more-wrap { text-align: center; margin-top: 16px; }
.load-more-btn { min-width: 180px; }
</style>
