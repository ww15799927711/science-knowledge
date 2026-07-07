<template>
  <div v-if="item" class="page-enter">
    <Breadcrumb
      sectionName="科学简史"
      sectionLink="/history"
      :subName="item.period"
      :subLink="'/history/' + item.period"
      :title="item.title"
    />
    <div class="detail-card">
      <div class="detail-badges">
        <span class="badge badge-warning">{{ item.period }}</span>
        <span class="badge badge-outline">{{ item.year }}</span>
      </div>
      <h1 class="detail-title">{{ item.title }}</h1>
      <p class="detail-meta"><strong>人物：</strong>{{ item.figures }}</p>
      <p class="detail-summary">{{ item.summary }}</p>
      <ContentBody :content="item.content" />
      <div v-if="item.background" class="info-box">
        <strong>📖 背景</strong>
        <p>{{ item.background }}</p>
      </div>
      <div v-if="item.impact" class="info-box">
        <strong>💥 影响</strong>
        <p>{{ item.impact }}</p>
      </div>
      <div v-if="item.quote" class="quote-box">
        "{{ item.quote }}"
      </div>
      <div v-if="item.tags && item.tags.length" class="detail-section">
        <div class="tag-list">
          <span v-for="t in item.tags" :key="t" class="tag">#{{ t }}</span>
        </div>
      </div>
    </div>
    <RefList title="相关知识" type="knowledge" :items="relatedKnowledge" />
    <RefList title="相关话题" type="topics" :items="relatedTopics" />
  </div>
  <div v-else class="empty-state">
    <div class="empty-icon">🔍</div>
    <div class="empty-tip">未找到该历史事件</div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getHistoryById } from '@/utils/data'
import { getRelatedItems } from '@/utils/cross-ref'
import ContentBody from '@/components/ContentBody.vue'
import RefList from '@/components/RefList.vue'
import Breadcrumb from '@/components/Breadcrumb.vue'

const route = useRoute()
const item = computed(() => getHistoryById(route.params.id))

const relatedKnowledge = computed(() => item.value ? getRelatedItems(item.value.relatedKnowledge, 'knowledge') : [])
const relatedTopics = computed(() => item.value ? getRelatedItems(item.value.relatedTopics, 'topics') : [])
</script>

<style scoped>
.detail-card {
  background: var(--color-card);
  background: var(--color-card-glass);
  backdrop-filter: blur(16px) saturate(1.2);
  -webkit-backdrop-filter: blur(16px) saturate(1.2);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: var(--radius-card);
  box-shadow: var(--shadow-md);
  padding: 20px;
}
.detail-badges { display: flex; gap: 8px; margin-bottom: 10px; flex-wrap: wrap; }
.detail-title {
  font-size: 22px;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 8px;
  line-height: 1.4;
}
.detail-meta {
  color: var(--color-text-secondary);
  margin-bottom: 4px;
  font-size: 14px;
}
.detail-summary {
  color: var(--color-text-secondary);
  margin-bottom: 16px;
  line-height: 1.7;
  font-size: 14px;
}
.detail-section { margin-top: 16px; }
.info-box {
  background: var(--color-bg);
  border-radius: var(--radius-sm);
  padding: 12px;
  margin-top: 12px;
  font-size: 14px;
  line-height: 1.8;
  color: var(--color-text-secondary);
}
.info-box strong { display: block; margin-bottom: 4px; color: var(--color-text); }
.quote-box {
  background: var(--color-primary-light);
  border-left: 3px solid var(--color-primary);
  padding: 12px;
  margin-top: 12px;
  font-style: italic;
  font-size: 15px;
  color: var(--color-text-secondary);
  border-radius: 0 var(--radius-badge) var(--radius-badge) 0;
}
</style>
