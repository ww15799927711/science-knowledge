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
        <div class="period-icon-wrap" :style="{ '--icon-color': period.color }">
          <span class="period-icon">{{ period.name.charAt(0) }}</span>
        </div>
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 130px;
  padding: 18px 14px;
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
}
.period-icon-wrap {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: color-mix(in srgb, var(--icon-color) 13%, transparent);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 6px;
  margin-bottom: 4px;
  transition: background var(--transition-fast), transform var(--transition-base);
}
.period-icon {
  font-size: 16px;
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
  font-size: 15px;
  margin-top: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
}
.period-theme {
  font-size: 12px;
  color: var(--color-text-secondary);
  margin-top: 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
}
.period-count {
  font-size: 12px;
  color: var(--color-text-hint);
  margin-top: 6px;
}
</style>
