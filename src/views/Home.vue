<template>
  <div class="home page-enter">
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
        <input v-model="keyword" placeholder="搜索知识点、话题、历史事件..." @input="doSearch" />
      </div>
      <div v-if="searched" class="search-results">
        <div v-if="results.knowledge.length > 0">
          <div class="section-subtitle" style="margin-top: 12px;">知识点 ({{ results.knowledge.length }})</div>
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

    <!-- Tab 切换区域 -->
    <div class="tab-section">
      <div class="tab-bar">
        <button :class="['tab-btn', activeTab === 'explore' ? 'active' : '']" @click="activeTab = 'explore'">
          <span class="tab-icon"></span>
          <span>探索板块</span>
        </button>
        <button :class="['tab-btn', activeTab === 'categories' ? 'active' : '']" @click="activeTab = 'categories'">
          <span class="tab-icon">🏷️</span>
          <span>热门分类</span>
        </button>
        <div class="tab-indicator" :style="indicatorStyle"></div>
      </div>
      <div class="tab-content">
        <!-- 探索板块 -->
        <div v-if="activeTab === 'explore'" class="board-grid">
          <router-link to="/knowledge" class="board-card board-knowledge">
            <div class="board-icon-wrap">
              <span class="board-icon">⚛️</span>
            </div>
            <div class="board-name">知识点</div>
            <div class="board-count">{{ knowledgeCount }} 条知识</div>
          </router-link>
          <router-link to="/topics" class="board-card board-topics">
            <div class="board-icon-wrap">
              <span class="board-icon">💡</span>
            </div>
            <div class="board-name">轻松话题</div>
            <div class="board-count">{{ topicCount }} 条话题</div>
          </router-link>
          <router-link to="/history" class="board-card board-history">
            <div class="board-icon-wrap">
              <span class="board-icon">📜</span>
            </div>
            <div class="board-name">科学简史</div>
            <div class="board-count">{{ historyCount }} 条事件</div>
          </router-link>
        </div>
        <!-- 热门分类 -->
        <div v-if="activeTab === 'categories'" class="category-tags">
          <router-link
            v-for="cat in categories"
            :key="cat.id"
            :to="'/knowledge/' + cat.id"
            class="cat-tag"
            :style="{ '--tag-color': cat.color }"
          >
            <span class="cat-tag-icon">{{ cat.icon }}</span>
            <span class="cat-tag-name">{{ cat.name }}</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, nextTick, watch } from 'vue'
import { getDailyPick } from '@/utils/recommendation'
import { getAllKnowledge, getAllTopics, getAllHistory, getCategories, getCarousel } from '@/utils/data'
import { searchAll } from '@/utils/search'
import ImageCarousel from '@/components/ImageCarousel.vue'

const carouselSlides = getCarousel()
const dailyPick = getDailyPick()
const knowledgeCount = getAllKnowledge().length
const topicCount = getAllTopics().length
const historyCount = getAllHistory().length
const totalCount = knowledgeCount + topicCount + historyCount
const categories = getCategories()
const activeTab = ref('explore')

// Tab 滑动指示器
const indicatorStyle = ref({ left: '0px', width: '0px' })
function updateIndicator() {
  nextTick(() => {
    const btns = document.querySelectorAll('.tab-btn')
    const active = btns[activeTab.value === 'explore' ? 0 : 1]
    if (active) {
      indicatorStyle.value = {
        left: active.offsetLeft + 'px',
        width: active.offsetWidth + 'px'
      }
    }
  })
}
watch(activeTab, updateIndicator)
// 初始化
setTimeout(updateIndicator, 100)

// 搜索
const keyword = ref('')
const searched = ref(false)
const results = reactive({ knowledge: [], topics: [], history: [] })

function doSearch() {
  if (!keyword.value.trim()) {
    searched.value = false
    return
  }
  searched.value = true
  const r = searchAll(keyword.value)
  results.knowledge = r.knowledge
  results.topics = r.topics
  results.history = r.history
}

function getPickRoute() {
  if (!dailyPick) return '/'
  const type = dailyPick.type
  const id = dailyPick.id
  if (type === 'knowledge') {
    const kp = getAllKnowledge().find(k => k.kpId === id)
    return '/knowledge/' + (kp ? kp.category : 'all') + '/' + id
  }
  if (type === 'topics') {
    const t = getAllTopics().find(t => t.topicId === id)
    return '/topics/' + (t ? t.subcategory : 'all') + '/' + id
  }
  if (type === 'history') {
    const h = getAllHistory().find(h => h.entryId === id)
    return '/history/' + (h ? h.period : 'all') + '/' + id
  }
  return '/'
}
</script>

<style scoped>
.home { padding: 8px 0; }

/* --- Hero --- */
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
  font-size: 12px;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 16px;
  backdrop-filter: blur(8px);
}
.hero-title {
  font-size: 32px;
  font-weight: 800;
  margin-bottom: 10px;
  color: #fff;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.5);
  letter-spacing: 2px;
  position: relative;
}
.hero-sub {
  color: rgba(255, 255, 255, 0.8);
  font-size: 15px;
  text-shadow: 0 1px 6px rgba(0, 0, 0, 0.4);
  position: relative;
}

/* 搜索区域 */
.search-section { padding: 0 16px; margin-bottom: 20px; }
.search-section .search-bar {
  background: var(--color-card-glass);
  backdrop-filter: blur(16px) saturate(1.2);
  -webkit-backdrop-filter: blur(16px) saturate(1.2);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
.search-results { margin-top: 8px; }
.search-results .list { display: flex; flex-direction: column; gap: 1px; background: var(--color-divider); border-radius: var(--radius-card); overflow: hidden; }
.search-results .list-item { text-decoration: none; color: var(--color-text); background: var(--color-card); padding: 14px 16px; }
.search-results .list-item:hover { background: var(--color-bg); }

/* 轮播区域 */
.carousel-section { padding: 0 16px; margin-bottom: 20px; }

/* 每日精选 */
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
  position: absolute;
  top: 0;
  left: 0;
  width: 5px;
  height: 100%;
  background: linear-gradient(180deg, #3B82F6, #10B981);
  border-radius: 0 3px 3px 0;
}
.pick-header { margin-bottom: 10px; }
.pick-title {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 8px;
  color: var(--color-text);
}
.pick-summary {
  color: var(--color-text-secondary);
  margin-bottom: 14px;
  line-height: 1.7;
  font-size: 14px;
}
.pick-link {
  color: var(--color-primary);
  font-weight: 600;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  transition: gap var(--transition-base);
}
.pick-link:hover { gap: 8px; }
.pick-arrow { transition: transform var(--transition-base); }
.pick-link:hover .pick-arrow { transform: translateX(2px); }

/* Tab 切换 */
.tab-section {
  margin: 0 16px;
}
.tab-bar {
  display: flex;
  position: relative;
  background: var(--color-card);
  border-radius: 12px;
  padding: 4px;
  box-shadow: var(--shadow-sm);
  margin-bottom: 16px;
}
.tab-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 10px 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-secondary);
  background: none;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all var(--transition-base);
  position: relative;
  z-index: 1;
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
.tab-icon { font-size: 16px; }
.tab-indicator {
  position: absolute;
  bottom: 4px;
  height: 3px;
  background: var(--color-primary);
  border-radius: 3px;
  transition: all var(--transition-base);
  z-index: 0;
}
.tab-content {
  min-height: 140px;
}

/* 板块卡片 */
.board-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}
.board-card {
  border-radius: 14px;
  padding: 24px 16px 20px;
  text-align: center;
  text-decoration: none;
  color: #fff;
  transition: all var(--transition-base);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 130px;
}
.board-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  transition: opacity var(--transition-base);
}
.board-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}
.board-card:hover::before { opacity: 1; }

.board-knowledge {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
.board-topics {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}
.board-history {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.board-icon-wrap {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  transition: transform var(--transition-base);
}
.board-card:hover .board-icon-wrap {
  transform: scale(1.1);
}
.board-icon { font-size: 24px; }
.board-name { font-weight: 700; font-size: 15px; margin-bottom: 4px; }
.board-count { font-size: 12px; opacity: 0.85; }

/* 分类标签 */
.category-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.cat-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: var(--radius-pill);
  font-size: 13px;
  font-weight: 500;
  text-decoration: none;
  color: var(--color-text);
  background: var(--color-card-glass);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1.5px solid rgba(255, 255, 255, 0.3);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-base);
}
.cat-tag:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
  border-color: var(--tag-color, var(--color-primary));
}
.cat-tag-icon { font-size: 16px; }
.cat-tag-name { white-space: nowrap; }

@media (max-width: 600px) {
  .board-grid { grid-template-columns: 1fr; }
  .hero { padding: 32px 20px 28px; }
  .hero-title { font-size: 26px; }
}
</style>
