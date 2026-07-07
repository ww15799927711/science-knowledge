<template>
  <div class="content-body" v-html="processedContent"></div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  content: String
})

const processedContent = computed(() => {
  if (!props.content) return ''
  return props.content.replace(/\n/g, '<br>')
})
</script>
