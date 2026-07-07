<template>
  <div class="image-hero" v-if="image">
    <img :src="image" :alt="title" class="hero-img" />
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <span class="hero-badge" v-if="badge">{{ badge }}</span>
      <h1 class="hero-title">{{ title }}</h1>
      <p class="hero-sub" v-if="subtitle">{{ subtitle }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  image: { type: String, default: '' },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  badge: { type: String, default: '' }
})
</script>

<style scoped>
.image-hero {
  position: relative;
  width: 100%;
  border-radius: var(--radius-card);
  overflow: hidden;
  margin-bottom: 20px;
  box-shadow: var(--shadow-md);
}
.hero-img {
  width: 100%;
  height: 240px;
  object-fit: cover;
  display: block;
}
.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.75) 0%,
    rgba(0, 0, 0, 0.25) 50%,
    rgba(0, 0, 0, 0.05) 100%
  );
}
.hero-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px 22px;
  color: #fff;
}
.hero-badge {
  display: inline-block;
  padding: 3px 10px;
  border-radius: var(--radius-badge);
  font-size: 12px;
  font-weight: 500;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  margin-bottom: 8px;
}
.hero-title {
  font-size: 20px;
  font-weight: 700;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
  line-height: 1.4;
}
.hero-sub {
  font-size: 14px;
  opacity: 0.9;
  margin-top: 4px;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  line-height: 1.6;
}

@media (max-width: 600px) {
  .hero-img { height: 180px; }
  .hero-title { font-size: 17px; }
  .hero-content { padding: 14px 16px; }
}
</style>
