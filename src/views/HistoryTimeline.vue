<template>
  <div>
    <h1 class="section-title">📜 科学简史</h1>
    <p class="section-subtitle">人类探索自然的伟大历程</p>
    <div class="grid">
      <router-link
        v-for="period in periods"
        :key="period.id"
        :to="'/history/' + period.id"
        class="card period-card"
        :style="{ borderTopColor: period.color }"
      >
        <div class="period-name">{{ period.name }}</div>
        <div class="period-theme">{{ period.theme }}</div>
        <div class="period-count">{{ getCount(period.name) }} 条</div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { getHistoryPeriods, getAllHistory } from '@/utils/data'

const periods = getHistoryPeriods()
function getCount(name) {
  return getAllHistory().filter(h => h.period === name).length
}
</script>

<style scoped>
.period-card {
  text-decoration: none;
  color: var(--color-text);
  border-top: 4px solid;
  transition: transform 0.2s;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 120px;
  padding: 16px 12px;
}
.period-card:hover { transform: translateY(-2px); }
.period-name {
  font-weight: 600;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
}
.period-theme {
  font-size: 12px;
  color: var(--color-text-secondary);
  margin-top: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
}
.period-count { font-size: 12px; color: var(--color-text-hint); margin-top: 4px; }
</style>
