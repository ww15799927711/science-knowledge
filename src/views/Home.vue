<template>
  <div class="home">
    <div class="hero">
      <h1>🔬 人与自然</h1>
      <p class="hero-sub">探索自然与技术的奥秘</p>
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

    <div class="daily-pick card" v-if="dailyPick">
      <div class="pick-header">
        <span class="badge badge-primary">📅 {{ dailyPick.reason }}</span>
      </div>
      <h2 class="pick-title">{{ dailyPick.title }}</h2>
      <p class="pick-summary">{{ dailyPick.summary }}</p>
      <router-link :to="getPickRoute()" class="pick-link">阅读全文 →</router-link>
    </div>

    <div class="section-title" style="margin-top: 24px;">探索板块</div>
    <div class="board-grid">
      <router-link to="/knowledge" class="board-card">
        <div class="board-icon">⚛️</div>
        <div class="board-name">知识点</div>
        <div class="board-count">{{ knowledgeCount }} 条</div>
      </router-link>
      <router-link to="/topics" class="board-card">
        <div class="board-icon">💡</div>
        <div class="board-name">轻松话题</div>
        <div class="board-count">{{ topicCount }} 条</div>
      </router-link>
      <router-link to="/history" class="board-card">
        <div class="board-icon">📜</div>
        <div class="board-name">科学简史</div>
        <div class="board-count">{{ historyCount }} 条</div>
      </router-link>
    </div>

    <div class="section-title" style="margin-top: 24px;">热门分类</div>
    <div class="category-tags">
      <router-link
        v-for="cat in categories"
        :key="cat.id"
        :to="'/knowledge/' + cat.id"
        class="cat-tag"
        :style="{ borderColor: cat.color }"
      >
        {{ cat.icon }} {{ cat.name }}
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { getDailyPick } from '@/utils/recommendation'
import { getAllKnowledge, getAllTopics, getAllHistory, getCategories } from '@/utils/data'
import { searchAll } from '@/utils/search'

const dailyPick = getDailyPick()
const knowledgeCount = getAllKnowledge().length
const topicCount = getAllTopics().length
const historyCount = getAllHistory().length
const categories = getCategories()

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
.hero {
  text-align: center;
  padding: 32px 24px;
  margin: 0 16px 16px;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: var(--radius-card);
  border: 1px solid rgba(255, 255, 255, 0.15);
}
.hero h1 {
  font-size: 28px;
  margin-bottom: 8px;
  color: #fff;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
}
.hero-sub {
  color: rgba(255, 255, 255, 0.85);
  font-size: 16px;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
}

/* 搜索区域 */
.search-section { padding: 0 16px; margin-bottom: 16px; }
.search-results { margin-top: 8px; }
.search-results .list { display: flex; flex-direction: column; gap: 1px; background: var(--color-divider); border-radius: var(--radius-card); overflow: hidden; }
.search-results .list-item { text-decoration: none; color: var(--color-text); background: var(--color-card); padding: 14px 16px; }
.search-results .list-item:hover { background: var(--color-bg); }

.daily-pick { margin-top: 16px; }
.pick-header { margin-bottom: 8px; }
.pick-title { font-size: 20px; margin-bottom: 8px; }
.pick-summary { color: var(--color-text-secondary); margin-bottom: 12px; line-height: 1.6; }
.pick-link { color: var(--color-primary); font-weight: 600; }

.board-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}
.board-card {
  background: var(--color-card);
  border-radius: var(--radius-card);
  box-shadow: var(--shadow-card);
  padding: 20px;
  text-align: center;
  text-decoration: none;
  color: var(--color-text);
  transition: transform 0.2s;
}
.board-card:hover { transform: translateY(-2px); }
.board-icon { font-size: 32px; margin-bottom: 8px; }
.board-name { font-weight: 600; font-size: 15px; }
.board-count { font-size: 13px; color: var(--color-text-secondary); margin-top: 4px; }

.category-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.cat-tag {
  padding: 6px 14px;
  border: 2px solid;
  border-radius: 20px;
  font-size: 13px;
  text-decoration: none;
  color: var(--color-text);
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  transition: all 0.2s;
}
.cat-tag:hover { opacity: 0.8; }

@media (max-width: 600px) {
  .board-grid { grid-template-columns: 1fr; }
}
</style>
