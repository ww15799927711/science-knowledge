<template>
  <div id="app" :class="fontClass">
    <NavBar />
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import NavBar from './components/NavBar.vue'
import { useTheme } from './utils/theme'

const { fontClass } = useTheme()
</script>

<style>
#app {
  min-height: 100vh;
  background: var(--color-bg);
  color: var(--color-text);
}
.main-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 16px;
  padding-top: 72px;
}
</style>
