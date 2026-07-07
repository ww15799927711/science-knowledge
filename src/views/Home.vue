<template>
  <div class="home">
    <div class="hero">
      <h1>🔬 科学常识</h1>
      <p class="hero-sub">探索自然与技术的奥秘</p>
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
import { getDailyPick } from '@/utils/recommendation'
import { getAllKnowledge, getAllTopics, getAllHistory, getCategories } from '@/utils/data'

const dailyPick = getDailyPick()
const knowledgeCount = getAllKnowledge().length
const topicCount = getAllTopics().length
const historyCount = getAllHistory().length
const categories = getCategories()

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
