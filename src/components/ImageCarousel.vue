<template>
  <div class="carousel" @mouseenter="pause" @mouseleave="resume">
    <div class="carousel-track" :style="trackStyle">
      <div
        v-for="(slide, index) in slides"
        :key="index"
        class="carousel-slide"
        :class="{ active: index === current }"
      >
        <router-link :to="slide.link" class="slide-link">
          <img :src="slide.image" :alt="slide.title" class="slide-img" />
          <div class="slide-overlay"></div>
          <div class="slide-content">
            <h2 class="slide-title">{{ slide.title }}</h2>
            <p class="slide-subtitle">{{ slide.subtitle }}</p>
          </div>
        </router-link>
      </div>
    </div>
    <!-- Navigation arrows -->
    <button class="carousel-btn carousel-prev" @click="prev" aria-label="上一张">‹</button>
    <button class="carousel-btn carousel-next" @click="next" aria-label="下一张">›</button>
    <!-- Dot indicators -->
    <div class="carousel-dots">
      <button
        v-for="(slide, index) in slides"
        :key="index"
        class="dot"
        :class="{ active: index === current }"
        @click="goTo(index)"
        :aria-label="'第' + (index + 1) + '张'"
      ></button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  slides: { type: Array, default: () => [] },
  interval: { type: Number, default: 5000 }
})

const current = ref(0)
const paused = ref(false)
let timer = null

const trackStyle = computed(() => ({
  transform: `translateX(-${current.value * 100}%)`,
  transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
}))

function next() {
  current.value = (current.value + 1) % props.slides.length
}
function prev() {
  current.value = (current.value - 1 + props.slides.length) % props.slides.length
}
function goTo(index) {
  current.value = index
}
function pause() { paused.value = true }
function resume() { paused.value = false }

function startTimer() {
  timer = setInterval(() => {
    if (!paused.value && props.slides.length > 1) next()
  }, props.interval)
}

onMounted(() => { startTimer() })
onBeforeUnmount(() => { clearInterval(timer) })
</script>

<style scoped>
.carousel {
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: var(--radius-card);
  box-shadow: var(--shadow-md);
  margin-bottom: 24px;
  background: var(--color-card);
}
.carousel-track {
  display: flex;
  will-change: transform;
}
.carousel-slide {
  min-width: 100%;
  position: relative;
}
.slide-link {
  display: block;
  text-decoration: none;
  position: relative;
}
.slide-img {
  width: 100%;
  height: 320px;
  object-fit: cover;
  display: block;
}
.slide-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0.2) 40%,
    rgba(0, 0, 0, 0.05) 100%
  );
}
.slide-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 24px 28px;
  color: #fff;
}
.slide-title {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 6px;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
}
.slide-subtitle {
  font-size: 14px;
  opacity: 0.9;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  line-height: 1.6;
}
.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #fff;
  font-size: 22px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  opacity: 0;
  z-index: 2;
}
.carousel:hover .carousel-btn {
  opacity: 1;
}
.carousel-btn:hover {
  background: rgba(255, 255, 255, 0.35);
  transform: translateY(-50%) scale(1.1);
}
.carousel-prev { left: 12px; }
.carousel-next { right: 12px; }
.carousel-dots {
  position: absolute;
  bottom: 12px;
  right: 20px;
  display: flex;
  gap: 8px;
  z-index: 2;
}
.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.4);
  border: none;
  cursor: pointer;
  transition: all 0.25s ease;
  padding: 0;
}
.dot.active {
  background: #fff;
  transform: scale(1.3);
  box-shadow: 0 0 6px rgba(255, 255, 255, 0.5);
}
.dot:hover {
  background: rgba(255, 255, 255, 0.7);
}

@media (max-width: 600px) {
  .slide-img { height: 200px; }
  .slide-title { font-size: 18px; }
  .slide-subtitle { font-size: 13px; }
  .slide-content { padding: 16px 18px; }
  .carousel-btn { width: 32px; height: 32px; font-size: 18px; }
}
</style>
