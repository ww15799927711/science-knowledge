<template>
  <div v-if="item" class="page-enter">
    <Breadcrumb
      sectionName="知识点分类"
      sectionLink="/knowledge"
      :subName="item.category"
      :subLink="'/knowledge/' + category"
      :title="item.title"
    />
    <div class="detail-card">
      <div class="detail-badges">
        <span class="badge badge-primary">{{ item.category }}</span>
        <span class="badge badge-outline">{{ item.subcategory }}</span>
        <span class="badge badge-warning" v-if="item.difficulty">难度 {{ '★'.repeat(item.difficulty) }}</span>
      </div>
      <h1 class="detail-title">{{ item.title }}</h1>
      <p class="detail-summary">{{ item.summary }}</p>
      <ContentBody :content="item.content" />
      <div v-if="item.keyTerms && item.keyTerms.length" class="detail-section">
        <div class="section-subtitle">关键术语</div>
        <div class="tag-list">
          <span v-for="t in item.keyTerms" :key="t" class="tag">{{ t }}</span>
        </div>
      </div>
      <div v-if="item.tags && item.tags.length" class="detail-section">
        <div class="tag-list">
          <span v-for="t in item.tags" :key="t" class="tag">#{{ t }}</span>
        </div>
      </div>
    </div>
    <RefList title="相关知识" type="knowledge" :items="relatedKnowledge" />
    <RefList title="相关话题" type="topics" :items="relatedTopics" />
    <RefList title="相关历史" type="history" :items="relatedHistory" />
  </div>
  <div v-else class="empty-state">
    <div class="empty-icon">🔍</div>
    <div class="empty-tip">未找到该知识点</div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getKnowledgeById } from '@/utils/data'
import { getRelatedItems } from '@/utils/cross-ref'
import ContentBody from '@/components/ContentBody.vue'
import RefList from '@/components/RefList.vue'
import Breadcrumb from '@/components/Breadcrumb.vue'

const route = useRoute()
const category = computed(() => route.params.category)
const item = computed(() => getKnowledgeById(route.params.id))

const relatedKnowledge = computed(() => item.value ? getRelatedItems(item.value.relatedKnowledge, 'knowledge') : [])
const relatedTopics = computed(() => item.value ? getRelatedItems(item.value.relatedTopics, 'topics') : [])
const relatedHistory = computed(() => item.value ? getRelatedItems(item.value.relatedHistory, 'history') : [])
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
.detail-summary {
  color: var(--color-text-secondary);
  margin-bottom: 16px;
  line-height: 1.7;
  font-size: 14px;
}
.detail-section { margin-top: 16px; }
</style>
