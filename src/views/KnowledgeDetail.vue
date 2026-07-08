<template>
  <div v-if="item" class="page-enter">
    <ImageHero
      :image="categoryImage"
      :title="item.title"
      :badge="item.category"
      :subtitle="item.summary"
    />
    <Breadcrumb
      sectionName="智慧结晶分类"
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
    <TwikooComment />
  </div>
  <div v-else class="empty-state">
    <div class="empty-icon">🔍</div>
    <div class="empty-tip">未找到该智慧结晶</div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getKnowledgeById, getCategories } from '@/utils/data'
import { getRelatedItems } from '@/utils/cross-ref'
import ContentBody from '@/components/ContentBody.vue'
import RefList from '@/components/RefList.vue'
import Breadcrumb from '@/components/Breadcrumb.vue'
import ImageHero from '@/components/ImageHero.vue'
import TwikooComment from '@/components/TwikooComment.vue'

const route = useRoute()
const category = computed(() => route.params.category)
const item = ref(null)
const relatedKnowledge = ref([])
const relatedTopics = ref([])
const relatedHistory = ref([])

const categoryImage = computed(() => {
  if (!item.value) return ''
  const cat = getCategories().find(c => c.name === item.value.category || c.id === category.value)
  return cat ? cat.image || '' : ''
})

async function loadData() {
  const data = await getKnowledgeById(route.params.id)
  item.value = data
  if (data) {
    relatedKnowledge.value = await getRelatedItems(data.relatedKnowledge, 'knowledge')
    relatedTopics.value = await getRelatedItems(data.relatedTopics, 'topics')
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
</style>