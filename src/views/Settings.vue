<template>
  <div class="settings-page">
    <h1 class="page-title">
      <span class="title-icon">⚙️</span>
      <span>设置</span>
    </h1>

    <!-- 外观 -->
    <div class="settings-section">
      <div class="section-header">
        <span class="section-icon">🎨</span>
        <span class="section-label">外观</span>
      </div>

      <!-- 主题 -->
      <div class="setting-item">
        <div class="setting-info">
          <div class="setting-name">主题模式</div>
          <div class="setting-desc">切换网站的整体配色风格</div>
        </div>
        <div class="theme-options">
          <button
            v-for="t in themes"
            :key="t.value"
            class="theme-btn"
            :class="{ active: currentTheme === t.value }"
            @click="setTheme(t.value)"
          >
            <span class="theme-preview" :style="{ background: t.preview }"></span>
            <span class="theme-label">{{ t.label }}</span>
          </button>
        </div>
      </div>

      <!-- 字号 -->
      <div class="setting-item">
        <div class="setting-info">
          <div class="setting-name">阅读字号</div>
          <div class="setting-desc">调整正文内容的字体大小</div>
        </div>
        <div class="font-options">
          <button
            v-for="f in fonts"
            :key="f.value"
            class="font-btn"
            :class="{ active: currentFont === f.value }"
            @click="setFontSize(f.value)"
          >
            <span class="font-preview" :style="{ fontSize: f.previewSize }">Aa</span>
            <span class="font-label">{{ f.label }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- 数据 -->
    <div class="settings-section">
      <div class="section-header">
        <span class="section-icon">🗄️</span>
        <span class="section-label">数据</span>
      </div>

      <div class="setting-item">
        <div class="setting-info">
          <div class="setting-name">清除浏览数据</div>
          <div class="setting-desc">重置主题、字号等个人偏好设置</div>
        </div>
        <button class="action-btn danger" @click="clearData">
          清除
        </button>
      </div>
    </div>

    <!-- 关于 -->
    <div class="settings-section">
      <div class="section-header">
        <span class="section-icon">ℹ️</span>
        <span class="section-label">关于</span>
      </div>

      <div class="about-card">
        <div class="about-title">人与自然</div>
        <div class="about-version">科学常识网站 v1.0.1</div>
        <p class="about-desc">基于微信小程序"科学常识"内容构建，涵盖物理、化学、生物、天文等多个学科领域的科普知识。</p>
        <div class="stats-row">
          <div class="stat-item">
            <span class="stat-num">{{ stats.knowledge }}</span>
            <span class="stat-label">智慧结晶</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-num">{{ stats.topics }}</span>
            <span class="stat-label">轻松话题</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-num">{{ stats.history }}</span>
            <span class="stat-label">科学简史</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useTheme } from '@/utils/theme'
import config from '@/data/config.json'

const { currentTheme, currentFont, setTheme, setFontSize } = useTheme()

const themes = [
  { label: '浅色', value: 'light', preview: 'linear-gradient(135deg, #f5f7fa 50%, #e4e8ec 50%)' },
  { label: '深色', value: 'dark', preview: 'linear-gradient(135deg, #1a1a2e 50%, #16213e 50%)' },
  { label: '护眼', value: 'green', preview: 'linear-gradient(135deg, #f0f7e6 50%, #dce8c8 50%)' }
]

const fonts = [
  { label: '小', value: 'small', previewSize: '13px' },
  { label: '中', value: 'medium', previewSize: '16px' },
  { label: '大', value: 'large', previewSize: '20px' }
]

const stats = computed(() => ({
  knowledge: config.knowledgeCount,
  topics: config.topicCount,
  history: config.historyCount
}))

function clearData() {
  if (confirm('确定要清除所有浏览偏好设置吗？')) {
    localStorage.removeItem('theme')
    localStorage.removeItem('fontSize')
    setTheme('light')
    setFontSize('medium')
  }
}
</script>

<style scoped>
.settings-page {
  max-width: 680px;
  margin: 0 auto;
  padding-bottom: 40px;
}

.page-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: calc(1.375rem * var(--font-scale));
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 24px;
}
.title-icon {
  font-size: calc(1.5rem * var(--font-scale));
}

/* --- Section --- */
.settings-section {
  background: var(--color-card);
  border-radius: var(--radius-card);
  padding: 20px;
  margin-bottom: 16px;
  box-shadow: var(--shadow-sm);
}

.section-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--color-border);
}
.section-icon {
  font-size: calc(1.125rem * var(--font-scale));
}
.section-label {
  font-size: calc(0.9375rem * var(--font-scale));
  font-weight: 600;
  color: var(--color-text);
}

/* --- Setting Item --- */
.setting-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  gap: 16px;
}
.setting-item + .setting-item {
  border-top: 1px solid var(--color-border-light, rgba(128,128,128,0.1));
}

.setting-info {
  flex: 1;
  min-width: 0;
}
.setting-name {
  font-size: calc(0.9375rem * var(--font-scale));
  font-weight: 500;
  color: var(--color-text);
  margin-bottom: 2px;
}
.setting-desc {
  font-size: calc(0.75rem * var(--font-scale));
  color: var(--color-text-secondary);
}

/* --- Theme Options --- */
.theme-options {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
}
.theme-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border: 2px solid var(--color-border);
  border-radius: 10px;
  background: var(--color-bg);
  cursor: pointer;
  transition: all 0.2s;
  min-width: 64px;
}
.theme-btn:hover {
  border-color: var(--color-primary);
}
.theme-btn.active {
  border-color: var(--color-primary);
  background: color-mix(in srgb, var(--color-primary) 8%, var(--color-bg));
}
.theme-preview {
  width: 36px;
  height: 24px;
  border-radius: 6px;
  border: 1px solid rgba(128,128,128,0.2);
}
.theme-label {
  font-size: calc(0.75rem * var(--font-scale));
  color: var(--color-text);
  font-weight: 500;
}

/* --- Font Options --- */
.font-options {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
}
.font-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 8px 16px;
  border: 2px solid var(--color-border);
  border-radius: 10px;
  background: var(--color-bg);
  cursor: pointer;
  transition: all 0.2s;
  min-width: 56px;
}
.font-btn:hover {
  border-color: var(--color-primary);
}
.font-btn.active {
  border-color: var(--color-primary);
  background: color-mix(in srgb, var(--color-primary) 8%, var(--color-bg));
}
.font-preview {
  font-weight: 700;
  color: var(--color-text);
  line-height: 1;
}
.font-label {
  font-size: calc(0.75rem * var(--font-scale));
  color: var(--color-text-secondary);
}

/* --- Action Button --- */
.action-btn {
  padding: 8px 20px;
  border-radius: 8px;
  border: none;
  font-size: calc(0.875rem * var(--font-scale));
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;
}
.action-btn.danger {
  background: #fee2e2;
  color: #dc2626;
}
.action-btn.danger:hover {
  background: #fecaca;
}

/* --- About Card --- */
.about-card {
  text-align: center;
  padding: 8px 0;
}
.about-title {
  font-size: calc(1.25rem * var(--font-scale));
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 4px;
}
.about-version {
  font-size: calc(0.8125rem * var(--font-scale));
  color: var(--color-text-secondary);
  margin-bottom: 12px;
}
.about-desc {
  font-size: calc(0.8125rem * var(--font-scale));
  color: var(--color-text-secondary);
  line-height: 1.7;
  margin: 0 0 20px;
  padding: 0 12px;
}

.stats-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  background: var(--color-bg);
  border-radius: 12px;
  padding: 16px 8px;
}
.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  gap: 4px;
}
.stat-num {
  font-size: calc(1.375rem * var(--font-scale));
  font-weight: 700;
  color: var(--color-primary);
  line-height: 1;
}
.stat-label {
  font-size: calc(0.75rem * var(--font-scale));
  color: var(--color-text-secondary);
}
.stat-divider {
  width: 1px;
  height: 32px;
  background: var(--color-border);
}

/* --- Responsive --- */
@media (max-width: 600px) {
  .setting-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  .theme-options,
  .font-options {
    width: 100%;
  }
  .theme-btn,
  .font-btn {
    flex: 1;
  }
  .action-btn {
    width: 100%;
  }
}
</style>
