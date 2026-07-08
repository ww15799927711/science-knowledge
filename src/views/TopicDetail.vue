<template>
  <div v-if="item" class="page-enter">
    <ImageHero
      :image="subcategoryImage"
      :title="item.title"
      :badge="item.subcategory"
      :subtitle="item.summary"
    />
    <Breadcrumb
      sectionName="轻松话题"
      sectionLink="/topics"
      :subName="item.subcategory"
      :subLink="'/topics/' + subcategory"
      :title="item.title"
    />
    <div class="detail-card">
      <div class="detail-badges">
        <span class="badge badge-accent">{{ item.subcategory }}</span>
      </div>
      <h1 class="detail-title">{{ item.title }}</h1>
      <p class="detail-summary">{{ item.summary }}</p>
      <ContentBody :content="item.content" />
      <div v-if="item.funFact" class="fun-fact-box">
        <strong>🎉 趣味小知识：</strong>{{ item.funFact }}
      </div>
      <div v-if="item.tags && item.tags.length" class="detail-section">
        <div class="tag-list">
          <span v-for="t in item.tags" :key="t" class="tag">#{{ t }}</span>
        </div>
      </div>
    </div>
    <RefList title="相关知识" type="knowledge" :items="relatedKnowledge" />
    <RefList title="相关历史" type="history" :items="relatedHistory" />
    <TwikooComment />
  </div>
  <div v-else class="empty-state">
    <div class="empty-icon">🔍</div>
    <div class="empty-tip">未找到该话题</div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getTopicById, getTopicSubcategories } from '@/utils/data'
import { getRelatedItems } from '@/utils/cross-ref'
import ContentBody from '@/components/ContentBody.vue'
import RefList from '@/components/RefList.vue'
import Breadcrumb from '@/components/Breadcrumb.vue'
import ImageHero from '@/components/ImageHero.vue'
import TwikooComment from '@/components/TwikooComment.vue'

const route = useRoute()
const subcategory = computed(() => route.params.subcategory)
const item = ref(null)
const relatedKnowledge = ref([])
const relatedHistory = ref([])

const subcategoryImage = computed(() => {
  if (!item.value) return ''
  const sub = getTopicSubcategories().find(s => s.name === item.value.subcategory || s.id === subcategory.value)
  return sub ? sub.image || '' : ''
})

async function loadData() {
  const data = await getTopicById(route.params.id)
  item.value = data
  if (data) {
    relatedKnowledge.value = await getRelatedItems(data.relatedKnowledge, 'knowledge')
    relatedHistory.value = await getRelatedItems(data.relatedHistory, 'history')
  }
}

onMounted(() => {
  loadData()
})
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
  font-size: calc(1.375rem * var(--font-scale));
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 8px;
  line-height: 1.4;
}
.detail-summary {
  color: var(--color-text-secondary);
  margin-bottom: 16px;
  line-height: 1.7;
  font-size: calc(0.875rem * var(--font-scale));
}
.detail-section { margin-top: 16px; }
.fun-fact-box {
  background: var(--color-accent-light);
  border-left: 3px solid var(--color-accent);
  padding: 12px;
  border-radius: 0 var(--radius-badge) var(--radius-badge) 0;
  margin-top: 16px;
  font-size: calc(0.875rem * var(--font-scale));
  line-height: 1.8;
  color: var(--color-text-secondary);
}
</style>