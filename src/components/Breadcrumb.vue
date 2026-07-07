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
  font-size: 13px;
  color: var(--color-text-hint);
}
.bc-link {
  color: var(--color-primary);
  text-decoration: none;
  transition: opacity 0.2s;
}
.bc-link:hover { opacity: 0.7; }
.bc-sep { margin: 0 2px; color: var(--color-text-hint); }
.bc-current {
  color: var(--color-text-secondary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 200px;
}
</style>
