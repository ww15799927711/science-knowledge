<template>
  <div class="not-found page-enter">
    <div class="not-found-icon">🔍</div>
    <h1 class="not-found-title">页面未找到</h1>
    <p class="not-found-desc">抱歉，您访问的页面不存在或已被移动</p>
    <div class="not-found-actions">
      <router-link to="/" class="btn btn-primary">返回首页</router-link>
      <router-link to="/knowledge" class="btn btn-outline">浏览知识</router-link>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.not-found {
  text-align: center;
  padding: 80px 30px;
  background: var(--color-card-glass);
  backdrop-filter: blur(16px) saturate(1.2);
  -webkit-backdrop-filter: blur(16px) saturate(1.2);
  border-radius: var(--radius-card);
  border: 1px solid rgba(255, 255, 255, 0.18);
}
.not-found-icon {
  font-size: calc(4rem * var(--font-scale));
  margin-bottom: 20px;
  animation: float 3s ease-in-out infinite;
}
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
.not-found-title {
  font-size: calc(1.5rem * var(--font-scale));
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 12px;
}
.not-found-desc {
  font-size: calc(0.9375rem * var(--font-scale));
  color: var(--color-text-secondary);
  margin-bottom: 30px;
}
.not-found-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
}
</style>