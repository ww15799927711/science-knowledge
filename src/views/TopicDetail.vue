<template>
  <div v-if="item">
    <Breadcrumb
      sectionName="轻松话题"
      sectionLink="/topics"
      :subName="item.subcategory"
      :subLink="'/topics/' + subcategory"
      :title="item.title"
    />
    <div class="card">
      <div style="display: flex; gap: 8px; margin-bottom: 8px;">
        <span class="badge badge-accent">{{ item.subcategory }}</span>
      </div>
      <h1 class="section-title" style="font-size: 22px;">{{ item.title }}</h1>
      <p style="color: var(--color-text-secondary); margin-bottom: 16px;">{{ item.summary }}</p>
      <ContentBody :content="item.content" />
      <div v-if="item.funFact" class="fun-fact-box">
        <strong>🎉 趣味小知识：</strong>{{ item.funFact }}
      </div>
      <div v-if="item.tags && item.tags.length" style="margin-top: 12px;">
        <div class="tag-list">
          <span v-for="t in item.tags" :key="t" class="tag">#{{ t }}</span>
        </div>
      </div>
    </div>
    <RefList title="相关知识" type="knowledge" :items="relatedKnowledge" />
    <RefList title="相关历史" type="history" :items="relatedHistory" />
  </div>
  <div v-else class="empty-state">
    <div class="empty-icon">🔍</div>
    <div class="empty-tip">未找到该话题</div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getTopicById } from '@/utils/data'
import { getRelatedItems } from '@/utils/cross-ref'
import ContentBody from '@/components/ContentBody.vue'
import RefList from '@/components/RefList.vue'
import Breadcrumb from '@/components/Breadcrumb.vue'

const route = useRoute()
const subcategory = computed(() => route.params.subcategory)
const item = computed(() => getTopicById(route.params.id))

const relatedKnowledge = computed(() => item.value ? getRelatedItems(item.value.relatedKnowledge, 'knowledge') : [])
const relatedHistory = computed(() => item.value ? getRelatedItems(item.value.relatedHistory, 'history') : [])
</script>

<style scoped>
.fun-fact-box {
  background: var(--color-accent-light);
  border-left: 3px solid var(--color-accent);
  padding: 12px;
  border-radius: 0 4px 4px 0;
  margin-top: 16px;
  font-size: 14px;
  line-height: 1.8;
  color: var(--color-text-secondary);
}
</style>
