<template>
  <nav class="navbar">
    <div class="navbar-inner">
      <router-link to="/" class="navbar-brand">
        <span class="brand-icon">🔬</span>
        <span class="brand-text">人与自然</span>
      </router-link>
      <div class="navbar-links" :class="{ open: menuOpen }">
        <router-link to="/" class="nav-link" @click="menuOpen = false">首页</router-link>
        <router-link to="/knowledge" class="nav-link" @click="menuOpen = false">智慧结晶</router-link>
        <router-link to="/topics" class="nav-link" @click="menuOpen = false">轻松话题</router-link>
        <router-link to="/history" class="nav-link" @click="menuOpen = false">科学简史</router-link>
        <router-link to="/settings" class="nav-link" @click="menuOpen = false">设置</router-link>
      </div>
      <button class="menu-toggle" @click="menuOpen = !menuOpen">
        <span>{{ menuOpen ? '✕' : '☰' }}</span>
      </button>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
const menuOpen = ref(false)
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: var(--color-card);
  box-shadow: var(--shadow-card);
  z-index: 1000;
}
.navbar-inner {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  padding: 12px 16px;
}
.navbar-brand {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: var(--color-text);
  font-weight: 700;
  font-size: calc(1.125rem * var(--font-scale));
}
.brand-icon { font-size: calc(1.5rem * var(--font-scale)); }
.navbar-links {
  display: flex;
  gap: 4px;
  margin-left: auto;
}
.nav-link {
  padding: 6px 12px;
  border-radius: 6px;
  color: var(--color-text-secondary);
  text-decoration: none;
  font-size: calc(0.875rem * var(--font-scale));
  transition: all 0.2s;
}
.nav-link:hover, .nav-link.router-link-active {
  background: var(--color-primary-light);
  color: var(--color-primary);
}
.menu-toggle {
  display: none;
  background: none;
  border: none;
  font-size: calc(1.5rem * var(--font-scale));
  color: var(--color-text);
  cursor: pointer;
  margin-left: auto;
}
@media (max-width: 700px) {
  .navbar-links {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--color-card);
    flex-direction: column;
    padding: 8px 16px;
    box-shadow: var(--shadow-card);
  }
  .navbar-links.open { display: flex; }
  .menu-toggle { display: block; }
}
</style>
