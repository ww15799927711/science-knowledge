<template>
  <div class="comment-section card">
    <h3 class="comment-title">💬 评论区</h3>
    <div id="twikoo-container"></div>
    <div v-if="!loaded" class="comment-loading">加载评论中...</div>
    <div v-if="error && loaded" class="comment-retry">
      <button @click="error = false; loaded = false; initTwikoo()">重试</button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, watch, onBeforeUnmount, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const loaded = ref(false)
const error = ref(false)
let twikooInstance = null

const TIKOO_ENV = import.meta.env.VITE_TWIKOO_ENV || ''

async function initTwikoo() {
  if (!TIKOO_ENV) {
    const el = document.getElementById('twikoo-container')
    if (el) {
      el.innerHTML = '<p style="text-align:center;color:var(--color-text-hint);padding:20px 0;">评论系统暂未配置，请联系管理员设置 Twikoo 后端地址。</p>'
      loaded.value = true
    }
    return
  }
  // 延迟1秒加载，不阻塞页面渲染
  await new Promise(resolve => setTimeout(resolve, 1000))
  try {
    // 使用CDN完整URL导入，绕过Vite对CJS模块的interop处理
    const twikooModule = await import('https://cdn.jsdelivr.net/npm/twikoo@1.6.44/dist/twikoo.all.min.js')
    const twikoo = twikooModule.default || twikooModule
    if (typeof twikoo.init !== 'function') {
      throw new Error('twikoo.init 不存在')
    }
    // 30秒超时保护，Cloudflare Pages(海外)连接腾讯云开发(国内)延迟较大
    const initPromise = new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error('Twikoo connection timeout')), 30000)
      twikoo.init({
        envId: TIKOO_ENV,
        el: '#twikoo-container',
        path: route.path,
        lang: 'zh-CN',
        onMounted: () => {
          clearTimeout(timer)
          resolve()
        }
      })
    })
    await initPromise
    loaded.value = true
  } catch (e) {
    console.warn('Twikoo 加载超时或失败，评论功能暂不可用:', e)
    error.value = true
    loaded.value = true
    const el = document.getElementById('twikoo-container')
    if (el) {
      el.innerHTML = '<p style="text-align:center;color:var(--color-text-hint);padding:20px 0;">评论系统暂时无法加载，请稍后刷新页面重试。</p>'
    }
  }
}

onMounted(() => {
  initTwikoo()
})

watch(() => route.path, (newPath) => {
  if (twikooInstance && twikooInstance.update) {
    twikooInstance.update({ path: newPath })
  }
})

onBeforeUnmount(() => {
  const el = document.getElementById('twikoo-container')
  if (el) el.innerHTML = ''
})
</script>

<style scoped>
.comment-section {
  margin-top: 24px;
  padding: 20px;
  background: var(--color-card);
  background: var(--color-card-glass);
  backdrop-filter: blur(16px) saturate(1.2);
  -webkit-backdrop-filter: blur(16px) saturate(1.2);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: var(--radius-card);
}
.comment-title {
  font-size: calc(16px * var(--font-scale));
  font-weight: 600;
  margin-bottom: 16px;
  color: var(--color-text);
}
.comment-loading {
  text-align: center;
  color: var(--color-text-hint);
  padding: 20px 0;
  font-size: calc(14px * var(--font-scale));
}
.comment-retry {
  text-align: center;
  padding: 12px 0;
}
.comment-retry button {
  padding: 6px 20px;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  background: var(--color-card);
  color: var(--color-text);
  cursor: pointer;
  font-size: calc(13px * var(--font-scale));
  transition: all 0.2s;
}
.comment-retry button:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

/* Twikoo 样式覆盖 - 适配本站主题 */
:deep(.tk-comments) {
  font-family: inherit;
}
:deep(.tk-comment-main) {
  background: transparent !important;
}
:deep(.tk-input) {
  background: var(--color-bg) !important;
  border: 1px solid var(--color-border) !important;
  border-radius: 8px !important;
  color: var(--color-text) !important;
}
:deep(.tk-input:focus) {
  border-color: var(--color-primary) !important;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.15) !important;
}
:deep(.tk-btn-primary) {
  background: var(--color-primary) !important;
  border: none !important;
  border-radius: 8px !important;
  color: #fff !important;
  font-weight: 500 !important;
}
:deep(.tk-btn-outline) {
  border-color: var(--color-border) !important;
  color: var(--color-text-secondary) !important;
  border-radius: 8px !important;
}
:deep(.tk-comment) {
  border-bottom: 1px solid var(--color-divider) !important;
}
:deep(.tk-nick) {
  color: var(--color-primary) !important;
}
:deep(.tk-content) {
  color: var(--color-text) !important;
}
:deep(.tk-time) {
  color: var(--color-text-hint) !important;
}
:deep(.tk-tag) {
  color: var(--color-text-secondary) !important;
  background: var(--color-bg) !important;
}
</style>
