<template>
  <nav class="breadcrumb">
    <router-link to="/" class="bc-link">首页</router-link>
    <span class="bc-sep">/</span>
    <router-link :to="sectionLink" class="bc-link">{{ sectionName }}</router-link>
    <template v-if="subName">
      <span class="bc-sep">/</span>
      <router-link :to="subLink" class="bc-link">{{ subName }}</router-link>
    </template>
    <span class="bc-sep">/</span>
    <span class="bc-current">{{ title }}</span>
  </nav>
</template>

<script setup>
defineProps({
  sectionName: String,
  sectionLink: { type: String, default: '/' },
  subName: { type: String, default: '' },
  subLink: { type: String, default: '' },
  title: { type: String, required: true }
})
</script>

<style scoped>
.breadcrumb {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
  margin-bottom: 16px;
  padding: 8px 14px;
  font-size: 13px;
  color: var(--color-text-hint);
  background: var(--color-card-glass);
  backdrop-filter: blur(12px) saturate(1.2);
  -webkit-backdrop-filter: blur(12px) saturate(1.2);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: var(--radius-pill);
  box-shadow: var(--shadow-sm);
}
.bc-link {
  color: var(--color-primary);
  text-decoration: none;
  transition: color var(--transition-fast);
  font-weight: 500;
}
.bc-link:hover { color: var(--color-primary-dark, #2563EB); }
.bc-sep { margin: 0 2px; color: var(--color-text-hint); }
.bc-current {
  color: var(--color-text);
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 200px;
}
</style>
