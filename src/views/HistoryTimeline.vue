<template>
  <div class="page-enter">
    <h1 class="section-title">📜 科学简史</h1>
    <p class="section-subtitle">人类探索自然的伟大历程</p>
    <div class="grid">
      <router-link
        v-for="period in periods"
        :key="period.id"
        :to="'/history/' + period.id"
        class="period-card"
      >
        <div class="period-accent" :style="{ background: period.color }"></div>
        <div class="period-img-wrap">
          <img v-if="period.image" :src="period.image" :alt="period.name" class="period-img" loading="lazy" />
          <div class="period-icon-wrap" :style="{ '--icon-color': period.color }">
            <span class="period-icon">{{ period.name.charAt(0) }}</span>
          </div>
        </div>
        <div class="period-name">{{ period.name }}</div>
        <div class="period-theme">{{ period.theme }}</div>
        <div class="period-count">{{ getCount(period.id) }} 条</div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getHistoryPeriods, getAllHistory } from '@/utils/data'

const periods = getHistoryPeriods()
const allHistory = ref([])

function getCount(periodId) {
  const period = periods.find(p => p.id === periodId)
  if (!period) return 0
  // Match by both period ID and period name for compatibility
  return allHistory.value.filter(h => h.period === period.name || h.period === periodId).length
}

async function loadData() {
  allHistory.value = await getAllHistory()
}

onMounted(() => {
  loadData()
})
</script>

<style scoped>
.period-card {
  text-decoration: none;
  color: var(--color-text);
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
  position: relative;
  overflow: hidden;
}
.period-accent {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  border-radius: var(--radius-card) var(--radius-card) 0 0;
  z-index: 2;
}
.period-img-wrap {
  position: relative;
  width: 100%;
  height: 110px;
  overflow: hidden;
}
.period-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform var(--transition-base);
}
.period-card:hover .period-img {
  transform: scale(1.05);
}
.period-icon-wrap {
  position: absolute;
  bottom: 8px;
  left: 10px;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: color-mix(in srgb, var(--icon-color) 13%, transparent);
  border: 2px solid rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background var(--transition-fast), transform var(--transition-base);
  z-index: 1;
}
.period-icon {
  font-size: calc(0.875rem * var(--font-scale));
  font-weight: 700;
  color: var(--icon-color);
  opacity: 0.7;
  transition: opacity var(--transition-fast);
}
.period-card:hover .period-icon-wrap {
  background: color-mix(in srgb, var(--icon-color) 50%, transparent);
  transform: scale(1.1);
}
.period-card:hover .period-icon {
  opacity: 1;
}
.period-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}
.period-name {
  font-weight: 700;
  font-size: calc(0.9375rem * var(--font-scale));
  padding: 18px 14px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
}
.period-theme {
  font-size: calc(0.75rem * var(--font-scale));
  color: var(--color-text-secondary);
  padding: 6px 14px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
}
.period-count {
  font-size: calc(0.75rem * var(--font-scale));
  color: var(--color-text-hint);
  padding: 6px 14px 14px;
}
</style>