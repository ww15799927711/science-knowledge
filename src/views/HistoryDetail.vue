<template>
  <div v-if="item">
    <div style="margin-bottom: 16px;">
      <router-link :to="'/history/' + item.period" class="back-link">← 返回列表</router-link>
    </div>
    <div class="card">
      <div style="display: flex; gap: 8px; margin-bottom: 8px;">
        <span class="badge badge-warning">{{ item.period }}</span>
        <span class="badge badge-outline">{{ item.year }}</span>
      </div>
      <h1 class="section-title" style="font-size: 22px;">{{ item.title }}</h1>
      <p style="color: var(--color-text-secondary); margin-bottom: 4px;"><strong>人物：</strong>{{ item.figures }}</p>
      <p style="color: var(--color-text-secondary); margin-bottom: 16px;">{{ item.summary }}</p>
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
      <div v-if="item.tags && item.tags.length" style="margin-top: 12px;">
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

const route = useRoute()
const item = computed(() => getHistoryById(route.params.id))

const relatedKnowledge = computed(() => item.value ? getRelatedItems(item.value.relatedKnowledge, 'knowledge') : [])
const relatedTopics = computed(() => item.value ? getRelatedItems(item.value.relatedTopics, 'topics') : [])
</script>

<style scoped>
.back-link { color: var(--color-primary); font-size: 14px; text-decoration: none; }
.info-box {
  background: var(--color-bg);
  border-radius: var(--radius-badge);
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
  border-radius: 0 4px 4px 0;
}
</style>
