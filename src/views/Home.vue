<template>
  <div class="home-page page-enter">
    <!-- Hero -->
    <div class="hero">
      <div class="hero-badge">🔬 科普知识平台</div>
      <h1 class="hero-title">人与自然</h1>
      <p class="hero-sub">探索自然与技术的奥秘 · {{ totalCount }} 条知识等你发现</p>
    </div>

    <!-- 搜索 -->
    <div class="search-section">
      <div class="search-bar">
        <span class="search-icon">🔍</span>
        <input v-model="keyword" placeholder="搜索智慧结晶、话题、历史事件..." @input="debouncedSearch" />
      </div>
      <div v-if="searched" class="search-results">
        <div v-if="results.knowledge.length > 0">
          <div class="section-subtitle" style="margin-top: 12px;">智慧结晶 ({{ results.knowledge.length }})</div>
          <div class="list">
            <router-link
              v-for="r in results.knowledge"
              :key="'k' + r.item.kpId"
              :to="'/knowledge/' + r.item.category + '/' + r.item.kpId"
              class="list-item"
            >
              <div class="list-item-content">
                <div class="list-item-title">{{ r.item.title }}</div>
                <div class="list-item-desc">{{ r.item.summary }}</div>
              </div>
            </router-link>
          </div>
        </div>
        <div v-if="results.topics.length > 0">
          <div class="section-subtitle" style="margin-top: 12px;">话题 ({{ results.topics.length }})</div>
          <div class="list">
            <router-link
              v-for="r in results.topics"
              :key="'t' + r.item.topicId"
              :to="'/topics/' + r.item.subcategory + '/' + r.item.topicId"
              class="list-item"
            >
              <div class="list-item-content">
                <div class="list-item-title">{{ r.item.title }}</div>
                <div class="list-item-desc">{{ r.item.summary }}</div>
              </div>
            </router-link>
          </div>
        </div>
        <div v-if="results.history.length > 0">
          <div class="section-subtitle" style="margin-top: 12px;">科学简史 ({{ results.history.length }})</div>
          <div class="list">
            <router-link
              v-for="r in results.history"
              :key="'h' + r.item.entryId"
              :to="'/history/' + r.item.period + '/' + r.item.entryId"
              class="list-item"
            >
              <div class="list-item-content">
                <div class="list-item-title">{{ r.item.title }}</div>
                <div class="list-item-desc">{{ r.item.summary }}</div>
              </div>
            </router-link>
          </div>
        </div>
        <div v-if="results.knowledge.length === 0 && results.topics.length === 0 && results.history.length === 0" class="empty-state">
          <div class="empty-icon">🔍</div>
          <div class="empty-tip">没有找到相关内容</div>
        </div>
      </div>
    </div>

    <!-- 图片轮播 -->
    <div class="carousel-section" v-if="carouselSlides.length > 0">
      <ImageCarousel :slides="carouselSlides" />
    </div>

    <!-- 每日精选 -->
    <div class="daily-pick card" v-if="dailyPick">
      <div class="pick-accent"></div>
      <div class="pick-header">
        <span class="badge badge-primary">📅 {{ dailyPick.reason }}</span>
      </div>
      <h2 class="pick-title">{{ dailyPick.title }}</h2>
      <p class="pick-summary">{{ dailyPick.summary }}</p>
      <router-link :to="getPickRoute()" class="pick-link">阅读全文 <span class="pick-arrow">→</span></router-link>
    </div>

    <!-- 三栏 Tab 切换：知识点 / 轻松话题 / 科学简史 -->
    <div class="tab-section">
      <div class="tab-bar">
        <button :class="['tab-btn', activeTab === 'knowledge' ? 'active' : '']" @click="activeTab = 'knowledge'">
          <span class="tab-icon">⚛️</span>
          <span>智慧结晶</span>
        </button>
        <button :class="['tab-btn', activeTab === 'topics' ? 'active' : '']" @click="activeTab = 'topics'">
          <span class="tab-icon">💡</span>
          <span>轻松话题</span>
        </button>
        <button :class="['tab-btn', activeTab === 'history' ? 'active' : '']" @click="activeTab = 'history'">
          <span class="tab-icon">📜</span>
          <span>科学简史</span>
        </button>
      </div>

      <div class="tab-content">
        <!-- 知识点：4列网格 -->
        <div v-if="activeTab === 'knowledge'" class="knowledge-grid">
          <router-link
            v-for="kp in knowledgePreview"
            :key="'kp' + kp.kpId"
            :to="'/knowledge/' + kp.category + '/' + kp.kpId"
            class="kp-card"
          >
            <div class="kp-card-accent" :style="{ background: getCategoryColor(kp.category) }"></div>
            <div class="kp-card-body">
              <div class="kp-card-tag" :style="{ color: getCategoryColor(kp.category) }">
                <span>{{ getCategoryIcon(kp.category) }}</span>
                <span>{{ kp.category }}</span>
              </div>
              <div class="kp-card-title">{{ kp.title }}</div>
              <div class="kp-card-summary">{{ kp.summary }}</div>
            </div>
          </router-link>
        </div>

        <!-- 轻松话题：3列网格 -->
        <div v-if="activeTab === 'topics'" class="topics-grid">
          <router-link
            v-for="topic in topicsPreview"
            :key="'tp' + topic.topicId"
            :to="'/topics/' + topic.subcategory + '/' + topic.topicId"
            class="topic-card"
          >
            <div class="topic-card-accent" :style="{ background: getSubcategoryColor(topic.subcategory) }"></div>
            <div class="topic-card-body">
              <div class="topic-card-tag" :style="{ color: getSubcategoryColor(topic.subcategory) }">
                <span>{{ getSubcategoryIcon(topic.subcategory) }}</span>
                <span>{{ topic.subcategory }}</span>
              </div>
              <div class="topic-card-title">{{ topic.title }}</div>
              <div class="topic-card-summary">{{ topic.summary }}</div>
            </div>
          </router-link>
        </div>

        <!-- 科学简史：水平滚动时间线 -->
        <div v-if="activeTab === 'history'" class="history-scroll">
          <div class="history-track">
            <router-link
              v-for="h in historyPreview"
              :key="'ht' + h.entryId"
              :to="'/history/' + h.period + '/' + h.entryId"
              class="history-card"
            >
              <div class="history-year">{{ h.year }}</div>
              <div class="history-accent" :style="{ background: getPeriodColor(h.period) }"></div>
              <div class="history-title">{{ h.title }}</div>
              <div class="history-summary">{{ h.summary }}</div>
            </router-link>
          </div>
        </div>
      </div>

      <!-- 查看更多 -->
      <div class="tab-footer">
        <router-link :to="tabTargetRoute" class="view-more">查看更多 →</router-link>
      </div>
    </div>

    <!-- 全站热门 -->
    <div class="featured-section">
      <div class="section-header">
        <h2 class="section-title"><span>🔥</span> 全站热门</h2>
      </div>
      <div class="featured-grid">
        <router-link
          v-for="item in featuredItems"
          :key="item.type + item.id"
          :to="getFeaturedRoute(item)"
          class="featured-card"
          :style="{ '--cat-color': item.typeColor }"
        >
          <div class="featured-badge" :style="{ background: item.typeColor }">{{ item.typeLabel }}</div>
          <div class="featured-title">{{ item.title }}</div>
          <div class="featured-summary">{{ item.summary }}</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onUnmounted, onMounted } from 'vue'
import { getDailyPick } from '@/utils/recommendation'
import { getCategories, getTopicSubcategories, getHistoryPeriods, getCarousel, getKnowledgeCount, getTopicCount, getHistoryCount } from '@/utils/data'
import { searchAll } from '@/utils/search'
import ImageCarousel from '@/components/ImageCarousel.vue'

const carouselSlides = getCarousel()
const dailyPick = ref(null)
const allKnowledge = ref([])
const allTopics = ref([])
const allHistory = ref([])
const totalCount = computed(() => getKnowledgeCount() + getTopicCount() + getHistoryCount())
const categories = getCategories()
const topicSubcats = getTopicSubcategories()
const historyPeriods = getHistoryPeriods()

async function loadData() {
  const [pick, knowledge, topics, history] = await Promise.all([
    getDailyPick(),
    import('@/data/knowledge.json'),
    import('@/data/topics.json'),
    import('@/data/history.json')
  ])
  dailyPick.value = pick
  allKnowledge.value = knowledge.default
  allTopics.value = topics.default
  allHistory.value = history.default
}

onMounted(() => {
  loadData()
})

function getCategoryColor(cat) {
  const c = categories.find(x => x.name === cat || x.id === cat)
  return c ? c.color : '#3B82F6'
}
function getCategoryIcon(cat) {
  const c = categories.find(x => x.name === cat || x.id === cat)
  return c ? c.icon : '📖'
}
function getSubcategoryColor(sub) {
  const s = topicSubcats.find(x => x.name === sub || x.id === sub)
  return s ? s.color : '#FF7043'
}
function getSubcategoryIcon(sub) {
  const s = topicSubcats.find(x => x.name === sub || x.id === sub)
  return s ? s.icon : '💡'
}
function getPeriodColor(period) {
  const p = historyPeriods.find(x => x.name === period || x.id === period)
  return p ? p.color : '#5C6BC0'
}
function getFeaturedRoute(item) {
  if (item.type === 'knowledge') return '/knowledge/' + item.category + '/' + item.id
  if (item.type === 'topics') return '/topics/' + item.subcategory + '/' + item.id
  if (item.type === 'history') return '/history/' + item.period + '/' + item.id
  return '/'
}

const knowledgePreview = computed(() => {
  const data = allKnowledge.value
  const step = Math.max(1, Math.floor(data.length / 8))
  const result = []
  for (let i = 0; i < data.length && result.length < 8; i += step) {
    result.push(data[i])
  }
  return result
})

const topicsPreview = computed(() => allTopics.value.slice(0, 6))

const historyPreview = computed(() => {
  const data = allHistory.value
  const step = Math.max(1, Math.floor(data.length / 6))
  const result = []
  for (let i = 0; i < data.length && result.length < 6; i += step) {
    result.push(data[i])
  }
  return result
})

const featuredItems = computed(() => {
  const items = []
  const kStep = Math.max(1, Math.floor(allKnowledge.value.length / 2))
  for (let i = 0; i < 2 && i * kStep < allKnowledge.value.length; i++) {
    const kp = allKnowledge.value[i * kStep]
    items.push({
      type: 'knowledge', id: kp.kpId, title: kp.title, summary: kp.summary,
      category: kp.category, typeLabel: '知识', typeColor: getCategoryColor(kp.category)
    })
  }
  for (let i = 0; i < 2 && i < allTopics.value.length; i++) {
    const t = allTopics.value[i]
    const sub = topicSubcats.find(s => s.name === t.subcategory || s.id === t.subcategory)
    items.push({
      type: 'topics', id: t.topicId, title: t.title, summary: t.summary,
      subcategory: t.subcategory, typeLabel: '话题', typeColor: sub ? sub.color : '#FF7043'
    })
  }
  const hStep = Math.max(1, Math.floor(allHistory.value.length / 2))
  for (let i = 0; i < 2 && i * hStep < allHistory.value.length; i++) {
    const h = allHistory.value[i * hStep]
    items.push({
      type: 'history', id: h.entryId, title: h.title, summary: h.summary,
      period: h.period, typeLabel: '简史', typeColor: getPeriodColor(h.period)
    })
  }
  return items
})

const activeTab = ref('knowledge')
const tabTargetRoute = computed(() => {
  const map = { knowledge: '/knowledge', topics: '/topics', history: '/history' }
  return map[activeTab.value] || '/knowledge'
})

const keyword = ref('')
const searched = ref(false)
const results = reactive({ knowledge: [], topics: [], history: [] })
let searchTimer = null

async function doSearch() {
  if (!keyword.value.trim()) {
    searched.value = false
    results.knowledge = []
    results.topics = []
    results.history = []
    return
  }
  searched.value = true
  const r = await searchAll(keyword.value)
  results.knowledge = r.knowledge
  results.topics = r.topics
  results.history = r.history
}

function debouncedSearch() {
  if (searchTimer) clearTimeout(searchTimer)
  searchTimer = setTimeout(doSearch, 300)
}

onUnmounted(() => {
  if (searchTimer) clearTimeout(searchTimer)
})

function getPickRoute() {
  if (!dailyPick.value) return '/'
  const type = dailyPick.value.type
  const id = dailyPick.value.id
  if (type === 'knowledge') {
    const kp = allKnowledge.value.find(k => k.kpId === id)
    return '/knowledge/' + (kp ? kp.category : 'all') + '/' + id
  }
  if (type === 'topics') {
    const t = allTopics.value.find(t => t.topicId === id)
    return '/topics/' + (t ? t.subcategory : 'all') + '/' + id
  }
  if (type === 'history') {
    const h = allHistory.value.find(h => h.entryId === id)
    return '/history/' + (h ? h.period : 'all') + '/' + id
  }
  return '/'
}
</script>

<style scoped>
.home-page { padding: 8px 0 40px; }

.hero {
  text-align: center;
  padding: 40px 24px 36px;
  margin: 0 16px 20px;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(16, 185, 129, 0.1));
  backdrop-filter: blur(20px) saturate(1.3);
  -webkit-backdrop-filter: blur(20px) saturate(1.3);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
}
.hero::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle at 30% 50%, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
              radial-gradient(circle at 70% 50%, rgba(16, 185, 129, 0.06) 0%, transparent 50%);
  pointer-events: none;
}
.hero-badge {
  display: inline-block;
  padding: 4px 14px;
  background: rgba(59, 130, 246, 0.15);
  border: 1px solid rgba(59, 130, 246, 0.25);
  border-radius: 20px;
  font-size: calc(0.75rem * var(--font-scale));
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 16px;
  backdrop-filter: blur(8px);
}
.hero-title {
  font-size: calc(2rem * var(--font-scale));
  font-weight: 800;
  margin-bottom: 10px;
  color: #fff;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.5);
  letter-spacing: 2px;
  position: relative;
}
.hero-sub {
  color: rgba(255, 255, 255, 0.8);
  font-size: calc(0.9375rem * var(--font-scale));
  text-shadow: 0 1px 6px rgba(0, 0, 0, 0.4);
  position: relative;
}

.search-section { padding: 0 16px; margin-bottom: 20px; }
.search-section .search-bar {
  background: var(--color-card-glass);
  backdrop-filter: blur(16px) saturate(1.2);
  -webkit-backdrop-filter: blur(16px) saturate(1.2);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
.search-results { margin-top: 8px; }
.search-results .list {
  display: flex; flex-direction: column; gap: 1px;
  background: var(--color-divider);
  border-radius: var(--radius-card); overflow: hidden;
}
.search-results .list-item {
  text-decoration: none; color: var(--color-text);
  background: var(--color-card); padding: 14px 16px;
}
.search-results .list-item:hover { background: var(--color-bg); }

.carousel-section { padding: 0 16px; margin-bottom: 20px; }

.daily-pick {
  margin: 0 16px 20px;
  position: relative;
  overflow: hidden;
  border: none;
  box-shadow: var(--shadow-md);
  background: var(--color-card-glass);
  backdrop-filter: blur(16px) saturate(1.2);
  -webkit-backdrop-filter: blur(16px) saturate(1.2);
  border: 1px solid rgba(255, 255, 255, 0.18);
}
.pick-accent {
  position: absolute; top: 0; left: 0;
  width: 5px; height: 100%;
  background: linear-gradient(180deg, #3B82F6, #10B981);
  border-radius: 0 3px 3px 0;
}
.pick-header { margin-bottom: 10px; }
.pick-title { font-size: calc(1.25rem * var(--font-scale)); font-weight: 700; margin-bottom: 8px; color: var(--color-text); }
.pick-summary {
  color: var(--color-text-secondary); margin-bottom: 14px;
  line-height: 1.7; font-size: calc(0.875rem * var(--font-scale));
}
.pick-link {
  color: var(--color-primary); font-weight: 600; font-size: calc(0.875rem * var(--font-scale));
  display: inline-flex; align-items: center; gap: 4px;
  transition: gap var(--transition-base);
}
.pick-link:hover { gap: 8px; }
.pick-arrow { transition: transform var(--transition-base); }
.pick-link:hover .pick-arrow { transform: translateX(2px); }

.tab-section { margin: 0 16px 24px; }
.tab-bar {
  display: flex;
  background: var(--color-card);
  border-radius: 12px;
  padding: 4px;
  box-shadow: var(--shadow-sm);
  margin-bottom: 16px;
}
.tab-btn {
  flex: 1;
  display: flex; align-items: center; justify-content: center;
  gap: 6px;
  padding: 10px 0;
  font-size: calc(0.875rem * var(--font-scale)); font-weight: 600;
  color: var(--color-text-secondary);
  background: none; border: none; border-radius: 10px;
  cursor: pointer;
  transition: all var(--transition-base);
}
.tab-btn.active {
  color: #fff;
  background: var(--color-primary);
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.35);
}
.tab-btn:hover:not(.active) {
  color: var(--color-text);
  background: var(--color-bg);
}
.tab-icon { font-size: calc(1rem * var(--font-scale)); }
.tab-content { min-height: 160px; }
.tab-footer {
  text-align: center;
  margin-top: 16px;
}
.view-more {
  color: var(--color-primary);
  font-size: calc(0.875rem * var(--font-scale)); font-weight: 500;
  text-decoration: none;
  transition: all var(--transition-base);
}
.view-more:hover { opacity: 0.8; }

.knowledge-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}
.kp-card {
  display: flex; flex-direction: column;
  background: var(--color-card);
  border-radius: var(--radius-card);
  overflow: hidden;
  text-decoration: none; color: inherit;
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-base);
}
.kp-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
}
.kp-card-accent { height: 4px; flex-shrink: 0; }
.kp-card-body { padding: 14px; flex: 1; }
.kp-card-tag {
  display: inline-flex; align-items: center; gap: 3px;
  font-size: calc(0.6875rem * var(--font-scale)); font-weight: 600;
  margin-bottom: 8px;
}
.kp-card-title {
  font-size: calc(0.875rem * var(--font-scale)); font-weight: 600;
  color: var(--color-text);
  margin-bottom: 6px;
  line-height: 1.4;
  display: -webkit-box; -webkit-line-clamp: 2;
  -webkit-box-orient: vertical; overflow: hidden;
}
.kp-card-summary {
  font-size: calc(0.75rem * var(--font-scale)); color: var(--color-text-secondary);
  line-height: 1.5;
  display: -webkit-box; -webkit-line-clamp: 2;
  -webkit-box-orient: vertical; overflow: hidden;
}

.topics-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}
.topic-card {
  display: flex; flex-direction: column;
  background: var(--color-card);
  border-radius: var(--radius-card);
  overflow: hidden;
  text-decoration: none; color: inherit;
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-base);
}
.topic-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
}
.topic-card-accent { height: 4px; flex-shrink: 0; }
.topic-card-body { padding: 14px; flex: 1; }
.topic-card-tag {
  display: inline-flex; align-items: center; gap: 3px;
  font-size: calc(0.6875rem * var(--font-scale)); font-weight: 600;
  margin-bottom: 8px;
}
.topic-card-title {
  font-size: calc(0.875rem * var(--font-scale)); font-weight: 600;
  color: var(--color-text);
  margin-bottom: 6px; line-height: 1.4;
  display: -webkit-box; -webkit-line-clamp: 2;
  -webkit-box-orient: vertical; overflow: hidden;
}
.topic-card-summary {
  font-size: calc(0.75rem * var(--font-scale)); color: var(--color-text-secondary);
  line-height: 1.5;
  display: -webkit-box; -webkit-line-clamp: 2;
  -webkit-box-orient: vertical; overflow: hidden;
}

.history-scroll {
  overflow-x: auto;
  margin: 0 -16px;
  padding: 0 16px 8px;
  scrollbar-width: thin;
  scrollbar-color: var(--color-border) transparent;
}
.history-scroll::-webkit-scrollbar { height: 4px; }
.history-scroll::-webkit-scrollbar-track { background: transparent; }
.history-scroll::-webkit-scrollbar-thumb {
  background: var(--color-border); border-radius: 2px;
}
.history-track {
  display: flex; gap: 12px;
  min-width: max-content;
  padding-bottom: 4px;
}
.history-card {
  width: 200px; flex-shrink: 0;
  display: flex; flex-direction: column;
  background: var(--color-card);
  border-radius: var(--radius-card);
  overflow: hidden;
  text-decoration: none; color: inherit;
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-base);
}
.history-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
}
.history-year {
  font-size: calc(0.75rem * var(--font-scale)); font-weight: 700;
  padding: 10px 14px 0;
  color: var(--color-text-secondary);
}
.history-accent { height: 3px; margin: 6px 14px 0; border-radius: 2px; }
.history-title {
  font-size: calc(0.875rem * var(--font-scale)); font-weight: 600;
  padding: 8px 14px 0;
  color: var(--color-text);
  line-height: 1.4;
  display: -webkit-box; -webkit-line-clamp: 2;
  -webkit-box-orient: vertical; overflow: hidden;
}
.history-summary {
  font-size: calc(0.75rem * var(--font-scale)); color: var(--color-text-secondary);
  padding: 6px 14px 14px;
  line-height: 1.5;
  display: -webkit-box; -webkit-line-clamp: 2;
  -webkit-box-orient: vertical; overflow: hidden;
}

.featured-section { margin: 0 16px 24px; }
.section-header { margin-bottom: 16px; }
.section-title {
  font-size: calc(1.125rem * var(--font-scale)); font-weight: 700;
  color: var(--color-text);
  display: flex; align-items: center; gap: 8px;
}
.featured-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}
.featured-card {
  display: flex; flex-direction: column;
  padding: 18px 16px;
  background: color-mix(in srgb, var(--cat-color) 6%, var(--color-card));
  border: 1px solid color-mix(in srgb, var(--cat-color) 15%, var(--color-border));
  border-radius: var(--radius-card);
  text-decoration: none; color: inherit;
  transition: all var(--transition-base);
}
.featured-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
}
.featured-badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: var(--radius-badge);
  font-size: calc(0.6875rem * var(--font-scale)); font-weight: 600; color: #fff;
  margin-bottom: 10px;
  align-self: flex-start;
}
.featured-title {
  font-size: calc(0.9375rem * var(--font-scale)); font-weight: 600;
  color: var(--color-text);
  margin-bottom: 6px; line-height: 1.4;
  display: -webkit-box; -webkit-line-clamp: 2;
  -webkit-box-orient: vertical; overflow: hidden;
}
.featured-summary {
  font-size: calc(0.8125rem * var(--font-scale)); color: var(--color-text-secondary);
  line-height: 1.5;
  display: -webkit-box; -webkit-line-clamp: 2;
  -webkit-box-orient: vertical; overflow: hidden;
}

@media (max-width: 700px) {
  .knowledge-grid { grid-template-columns: repeat(2, 1fr); }
  .topics-grid { grid-template-columns: repeat(2, 1fr); }
  .featured-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 600px) {
  .hero { padding: 32px 20px 28px; }
  .hero-title { font-size: calc(1.625rem * var(--font-scale)); }
  .knowledge-grid { grid-template-columns: 1fr; }
  .topics-grid { grid-template-columns: 1fr; }
  .featured-grid { grid-template-columns: 1fr; }
  .history-card { width: 180px; }
  .tab-btn { font-size: calc(0.8125rem * var(--font-scale)); gap: 4px; }
  .tab-icon { font-size: calc(0.875rem * var(--font-scale)); }
}
</style>