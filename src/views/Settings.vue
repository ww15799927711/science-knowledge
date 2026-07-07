<template>
  <div>
    <h1 class="section-title">⚙️ 设置</h1>
    <div class="card">
      <div class="section-subtitle">主题</div>
      <div class="option-group">
        <button
          v-for="t in themes"
          :key="t.value"
          class="option-btn"
          :class="{ active: currentTheme === t.value }"
          @click="setTheme(t.value)"
        >{{ t.label }}</button>
      </div>
    </div>
    <div class="card">
      <div class="section-subtitle">字号</div>
      <div class="option-group">
        <button
          v-for="f in fonts"
          :key="f.value"
          class="option-btn"
          :class="{ active: currentFont === f.value }"
          @click="setFontSize(f.value)"
        >{{ f.label }}</button>
      </div>
    </div>
    <div class="card">
      <div class="section-subtitle">关于</div>
      <p style="font-size: 14px; color: var(--color-text-secondary); line-height: 1.8;">
        科学常识网站 v1.0<br>
        基于微信小程序"科学常识"内容构建<br>
        包含 187 个知识点、43 个话题、119 个历史事件
      </p>
    </div>
  </div>
</template>

<script setup>
import { useTheme } from '@/utils/theme'

const { currentTheme, currentFont, setTheme, setFontSize } = useTheme()

const themes = [
  { label: '☀️ 浅色', value: 'light' },
  { label: '🌙 深色', value: 'dark' },
  { label: '🌿 护眼', value: 'green' }
]

const fonts = [
  { label: '小', value: 'small' },
  { label: '中', value: 'medium' },
  { label: '大', value: 'large' }
]
</script>

<style scoped>
.option-group {
  display: flex;
  gap: 8px;
  margin-top: 8px;
}
.option-btn {
  padding: 8px 16px;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  background: var(--color-bg);
  color: var(--color-text);
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}
.option-btn.active {
  background: var(--color-primary);
  color: #fff;
  border-color: var(--color-primary);
}
</style>
